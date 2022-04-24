"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let OrderService = class OrderService {
    constructor(OrderModel, ProductModel, OrderItemModel) {
        this.OrderModel = OrderModel;
        this.ProductModel = ProductModel;
        this.OrderItemModel = OrderItemModel;
    }
    async createOrder(userInfo, createOrderDto) {
        let createOrder = new this.OrderModel({
            organization: userInfo.organization._id,
            tuckshop: createOrderDto.tuckshop,
            assignedCard: createOrderDto.assignedCard,
            orderMode: createOrderDto.orderMode,
            guest: createOrderDto.guest,
            isDeleted: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null
        });
        const orderCreated = await createOrder.save();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Order created successfully.",
            data: orderCreated
        };
    }
    async getAllOrder(userInfo, queryString) {
        var _a;
        let pageOptions = {
            page: queryString.page || 0,
            limit: (queryString.limit ? (queryString.limit > 100 ? 100 : queryString.limit) : 25),
            status: (queryString.status && ['active', 'inactive'].includes(queryString.status) ? queryString.status : "active"),
        };
        let modelParameter = {
            organization: userInfo.organization._id,
            status: (_a = pageOptions.status) !== null && _a !== void 0 ? _a : 'active',
            isDeleted: false
        };
        const ordersCount = await this.OrderModel.countDocuments(modelParameter).exec();
        const Orders = await this.OrderModel.find(modelParameter)
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit * 1).populate('guest')
            .exec();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Orders fetched successfully.",
            data: Orders,
            pagination: {
                total: ordersCount,
                pages: Math.ceil(ordersCount / pageOptions.limit),
                page: pageOptions.page,
                limit: pageOptions.limit
            }
        };
    }
    async getOrder(userInfo, orderId) {
        let modelParameter = {
            _id: orderId,
            organization: userInfo.organization._id,
            isDeleted: false
        };
        const order = await this.OrderModel.findOne(modelParameter).populate('guest');
        if (!order) {
            return {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: "Order does not exist.",
            };
        }
        else {
            return {
                statusCode: common_1.HttpStatus.OK,
                message: "Order fetched successfully.",
                data: order
            };
        }
    }
    async removeOrder(userInfo, orderId) {
        const removeOrder = await this.OrderItemModel.findOne({
            _id: orderId,
            organization: userInfo.organization._id,
            isDeleted: false
        }).exec();
        if (!removeOrder) {
            return {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: "Order does not exist.",
            };
        }
        removeOrder.isDeleted = true;
        removeOrder.deletedAt = new Date();
        removeOrder.updatedAt = new Date();
        await removeOrder.save();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Order deleted successfully.",
        };
    }
    async createOrderItem(userInfo, createOrderItemDto) {
        const gettUnitPrice = await this.ProductModel.findOne({
            _id: createOrderItemDto.product, isDeleted: false
        }).exec();
        const unitPrice = gettUnitPrice.price;
        let createOrderItem = new this.OrderItemModel({
            organization: userInfo.organization._id,
            order: createOrderItemDto.order,
            product: createOrderItemDto.product,
            quantity: createOrderItemDto.quantity,
            unitPrice: unitPrice,
        });
        const { _id } = await createOrderItem.save();
        const orderSave = await this.OrderItemModel.findById(_id).populate('product').exec();
        const Amount = orderSave.unitPrice * orderSave.quantity;
        const orderItem = await this.OrderItemModel.findByIdAndUpdate(_id, { $set: {
                totalAmount: Amount
            } }, { new: true }).populate('product');
        const findOrder = await this.OrderModel.findByIdAndUpdate({
            _id: createOrderItemDto.order,
            isDeleted: false
        }, { $set: { totalAmount: Amount } }, { new: true });
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Order Item created successfully.",
            data: orderItem
        };
    }
    async getAllOrderItem(userInfo, queryString) {
        var _a;
        let pageOptions = {
            page: queryString.page || 0,
            limit: (queryString.limit ? (queryString.limit > 100 ? 100 : queryString.limit) : 25),
            status: (queryString.status && ['active', 'inactive'].includes(queryString.status) ? queryString.status : "active"),
        };
        let modelParameter = {
            organization: userInfo.organization._id,
            status: (_a = pageOptions.status) !== null && _a !== void 0 ? _a : 'active',
            isDeleted: false
        };
        const ordersCount = await this.OrderItemModel.countDocuments(modelParameter).exec();
        const Orders = await this.OrderItemModel.find(modelParameter)
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit * 1).populate('products')
            .exec();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Order Items fetched successfully.",
            data: Orders,
            pagination: {
                total: ordersCount,
                pages: Math.ceil(ordersCount / pageOptions.limit),
                page: pageOptions.page,
                limit: pageOptions.limit
            }
        };
    }
    async getOrderItem(userInfo, orderItemId) {
        let modelParameter = {
            organization: userInfo.organization._id,
            _id: orderItemId,
            isDeleted: false
        };
        const orderItem = await this.OrderItemModel.findOne(modelParameter).populate('products');
        if (!orderItem) {
            return {
                statusCode: common_1.HttpStatus.OK,
                message: "Order Items does not exist.",
                data: orderItem
            };
        }
        else {
            return {
                statusCode: common_1.HttpStatus.OK,
                message: "Order Items fetched successfully.",
                data: orderItem
            };
        }
    }
};
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Order')),
    __param(1, (0, mongoose_1.InjectModel)('Product')),
    __param(2, (0, mongoose_1.InjectModel)('OrderItem')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map