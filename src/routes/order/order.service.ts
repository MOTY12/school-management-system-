import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CardsService } from "../cards/cards.service";
import { CreateCardTransactionDto } from "../cards/dto/cards.dto";
import { AssignedCards } from "../cards/interfaces/cards.interfaces";
import { Student } from "../students/interfaces/student.interface";
import { CreateOrderDto, GetAllOrderItemsDto, GetAllOrdersDto, ProductDto } from "./dto/order.dto";
import { Order, OrderItem } from "./interfaces/order.interfaces";

@Injectable()
export class OrderService {
    constructor(
        @InjectModel('Product') private readonly ProductModel: Model<Order>,
        @InjectModel('Students') private readonly StudentModel: Model<Student>,
        @InjectModel('Order') private readonly OrderModel: Model<Order>,
        @InjectModel('OrderItem') private readonly OrderItemModel: Model<OrderItem>,
        @InjectModel('AssignedCards') private readonly AssignedCardModel: Model<AssignedCards>,
        private cardsService: CardsService
    ) { }

    // Create a new order
    async createOrder(userInfo: any, createOrderDto: CreateOrderDto) {

        //check if card exists for online orders
        let checkCard;
        if (createOrderDto.orderMode == 'online') {
            checkCard = await this.AssignedCardModel.findOne({
                assignedCard: createOrderDto.assignedCard,
                status: 'active',
                isDeleted: false
            }).populate('student').exec()

            if (!checkCard) {
                return {
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: "Card not found."
                }
            }
        }

        // Check if there is sufficient balance for online order
        let totalOrderAmount = 0;
        for(let i = 0; i < createOrderDto.products.length; i++) {
            let product: any = await this.ProductModel.findOne({
                _id: createOrderDto.products[i].product
            }).exec();
            let subAmount = +(product.price) * +(createOrderDto.products[i].quantity);
            totalOrderAmount += subAmount;
        }

        if (
            checkCard.cardType == 'student' && (checkCard.student.availableBalance < totalOrderAmount) ||
            checkCard.cardType == 'special' && (checkCard.guest.availableBalance < totalOrderAmount)
        ) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: "Insufficient Balance."
            }
        }

        // Create Order
        let createOrder = new this.OrderModel({
            organization: userInfo.organization._id,
            tuckshop: createOrderDto.tuckshop,
            assignedCard: createOrderDto.assignedCard ?? undefined,
            student: createOrderDto.orderMode == 'online' ? checkCard.student._id : undefined,
            orderMode: createOrderDto.orderMode,
            guest: createOrderDto.guest ?? undefined,
            totalAmount: totalOrderAmount
        })

        const orderCreated = await createOrder.save();

        // Debit Student / Guest
        let createCardTransactionDto: CreateCardTransactionDto = {
            transactionType: 'purchase',
            order: orderCreated._id,
            transactionMode: createOrderDto.orderMode,
            amount: totalOrderAmount,
            narration: 'Tuckshop Purchase.',
            status: 'successful',
            paymentReference: '',
            imageUrl: ''
        }
        let res: any = await this.cardsService.createCardTransaction(userInfo, checkCard.Id, createCardTransactionDto);

        // Check if debit is successfull
        if (res.statusCode != 200) {
            // Delete order
            createOrder.isDeleted = true;
            createOrder.updatedAt = createOrder.deletedAt = new Date();
            createOrder.save();

            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: "An error occured while debitting card."
            }

        }

        for(let i = 0; i < createOrderDto.products.length; i++) {
            let item = createOrderDto.products[i];
            let product: any = await this.ProductModel.findOne({
                _id: item.product
            }).exec();

            // Add order items
            let newProductItem = new this.OrderItemModel({
                organization: userInfo.organization._id,
                order: orderCreated._id,
                product: item.product,
                unitPrice: product.price,
                quantity: item.quantity,
                totalAmount: +(product.price) * +(item.quantity),
            })

            await newProductItem.save();

            // Update product quantities
            product.quantity = product.quantity - +(item.quantity) >= 0 ? product.quantity - +(item.quantity) : 0;
            await product.save();
        }

        return {
            statusCode: HttpStatus.OK,
            message: "Order created successfully.",
            data: orderCreated
        }
    }

    // get all orders
    async getAllOrders(userInfo: any, queryString: GetAllOrdersDto) {
        let pageOptions = {
            page: queryString.page || 0,
            limit: (queryString.limit ? (queryString.limit > 100 ? 100 : queryString.limit) : 25),
            status: (queryString.status && ['active', 'inactive'].includes(queryString.status) ? queryString.status : "active"),
            student: (queryString.student && !['all'].includes(queryString.student) ? queryString.student : ""),
            tuckshop: (queryString.tuckshop && !['all'].includes(queryString.tuckshop) ? queryString.tuckshop : ""),
        }
        let modelParameter: any = {
            organization: userInfo.organization._id,
            status: pageOptions.status ?? 'active',
            student: queryString.student,
            tuckshop: queryString.tuckshop,
            isDeleted: false
        };

        if(pageOptions.student == '') delete modelParameter.student;
        if(pageOptions.tuckshop == '') delete modelParameter.tuckshop;

        const ordersCount = await this.OrderModel.countDocuments(modelParameter).exec();
        const Orders = await this.OrderModel.find(modelParameter)
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit * 1).populate('guest')
            .exec();
        return {
            statusCode: HttpStatus.OK,
            message: "Orders fetched successfully.",
            data: Orders,
            pagination: {
                total: ordersCount,
                pages: Math.ceil(ordersCount / pageOptions.limit),
                page: pageOptions.page,
                limit: pageOptions.limit
            }
        }
    }


    // get only one item
    async getOneOrder(userInfo: any, orderId: string) {
        let modelParameter: any = {
            _id: orderId,
            organization: userInfo.organization._id,
            isDeleted: false
        };
        const order = await this.OrderModel.findOne(modelParameter).populate('guest');
        if (!order) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: "Order does not exist.",
            }
        } else {
            return {
                statusCode: HttpStatus.OK,
                message: "Order fetched successfully.",
                data: order
            }
        }
    }

    //get all orders
    async getAllOrderItems(userInfo: any, orderId: string) {
        let modelParameter: any = {
            _id: orderId,
            organization: userInfo.organization._id,
            isDeleted: false
        };

        const Orders = await this.OrderItemModel.find(modelParameter).populate('product').exec();

        return {
            statusCode: HttpStatus.OK,
            message: "Order Items fetched successfully.",
            data: Orders
        }
    }
}