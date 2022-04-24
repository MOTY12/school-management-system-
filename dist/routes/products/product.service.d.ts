import { HttpStatus } from "@nestjs/common";
import { Model } from "mongoose";
import { CreateProductDto, GetAllProductDto, UpdateProductDto } from "./dto/product.dto";
import { Product } from "./interfaces/product.interface";
export declare class ProductsService {
    private readonly ProductModel;
    constructor(ProductModel: Model<Product>);
    create(userInfo: any, createProductDto: CreateProductDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: Product & {
            _id: any;
        };
    }>;
    findAll(userInfo: any, queryString: GetAllProductDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: (Product & {
            _id: any;
        })[];
        pagination: {
            total: number;
            pages: number;
            page: number;
            limit: number;
        };
    }>;
    findOne(userInfo: any, productId: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        data: Product & {
            _id: any;
        };
    }>;
    update(userInfo: any, classId: string, updateProductDto: UpdateProductDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        data: Product & {
            _id: any;
        };
    }>;
    remove(userInfo: any, productId: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
