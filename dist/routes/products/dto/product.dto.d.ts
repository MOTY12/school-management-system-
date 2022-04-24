export declare class CreateProductDto {
    tuckshop: String;
    name: String;
    category: String;
    price: number;
    quantity: number;
    sku: String;
    description: String;
    imageUrl: String;
}
export declare class GetProductDto {
    readonly productId: string;
}
export declare class GetAllProductDto {
    readonly page: number;
    readonly limit: number;
    readonly status: string;
    tuckshop: string;
}
export declare class UpdateProductDto {
    tuckshop: String;
    name: String;
    category: String;
    price: number;
    quantity: number;
    sku: String;
    description: String;
    imageUrl: String;
    status: String;
}
