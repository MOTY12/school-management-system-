import { CreateOrderDto, GetAllOrderItemDto, GetOrderItemDto } from "./dto/order.dto";
import { OrderService } from "./order.service";
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    createOrder(request: any, createOrderDto: CreateOrderDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: import("./interfaces/order.interfaces").Order & {
            _id: any;
        };
    }>;
    createOrderItem(request: any, createOrderDto: CreateOrderDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: import("./interfaces/order.interfaces").OrderItem & {
            _id: any;
        };
    }>;
    getAllOrderItem(request: any, queryString: GetAllOrderItemDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: (import("./interfaces/order.interfaces").OrderItem & {
            _id: any;
        })[];
        pagination: {
            total: number;
            pages: number;
            page: number;
            limit: number;
        };
    }>;
    getOneOrderItem(request: any, params: GetOrderItemDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: import("./interfaces/order.interfaces").OrderItem & {
            _id: any;
        };
    }>;
}
