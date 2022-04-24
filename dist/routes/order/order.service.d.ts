import { HttpStatus } from "@nestjs/common";
import { Model } from "mongoose";
import { CreateOrderDto, GetAllOrderItemDto } from "./dto/order.dto";
import { Order, OrderItem } from "./interfaces/order.interfaces";
export declare class OrderService {
    private readonly OrderModel;
    private readonly ProductModel;
    private readonly OrderItemModel;
    constructor(OrderModel: Model<Order>, ProductModel: Model<Order>, OrderItemModel: Model<OrderItem>);
    createOrder(userInfo: any, createOrderDto: CreateOrderDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: Order & {
            _id: any;
        };
    }>;
    getAllOrder(userInfo: any, queryString: GetAllOrderItemDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: (Order & {
            _id: any;
        })[];
        pagination: {
            total: number;
            pages: number;
            page: number;
            limit: number;
        };
    }>;
    getOrder(userInfo: any, orderId: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        data: Order & {
            _id: any;
        };
    }>;
    removeOrder(userInfo: any, orderId: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    createOrderItem(userInfo: any, createOrderItemDto: CreateOrderDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: OrderItem & {
            _id: any;
        };
    }>;
    getAllOrderItem(userInfo: any, queryString: GetAllOrderItemDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: (OrderItem & {
            _id: any;
        })[];
        pagination: {
            total: number;
            pages: number;
            page: number;
            limit: number;
        };
    }>;
    getOrderItem(userInfo: any, orderItemId: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: OrderItem & {
            _id: any;
        };
    }>;
}
