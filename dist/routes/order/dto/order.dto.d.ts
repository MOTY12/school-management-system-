declare class GuestDto {
    name: string;
    customerType: String;
    status: string;
}
export declare class CreateOrderDto {
    tuckshop: String;
    assignedCard: String;
    orderMode: String;
    readonly guest: GuestDto;
    order: String;
    amount: Number;
    unitPrice: Number;
    product: String;
    quantity: Number;
}
export declare class GetAllOrderDto {
    readonly page: number;
    readonly limit: number;
    readonly status: string;
}
export declare class GetOrderDto {
    readonly orderId: string;
}
export declare class GetAllOrderItemDto {
    readonly page: number;
    readonly limit: number;
    readonly orderId: string;
    readonly status: string;
}
export declare class GetOrderItemDto {
    readonly orderItemId: string;
}
export {};
