import { CreateProductDto, GetAllProductDto, GetProductDto, UpdateProductDto } from "./dto/product.dto";
import { ProductsService } from "./product.service";
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(request: any, createProductDto: CreateProductDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: import("./interfaces/product.interface").Product & {
            _id: any;
        };
    }>;
    findAll(request: any, queryString: GetAllProductDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: (import("./interfaces/product.interface").Product & {
            _id: any;
        })[];
        pagination: {
            total: number;
            pages: number;
            page: number;
            limit: number;
        };
    }>;
    findOne(request: any, params: GetProductDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: import("./interfaces/product.interface").Product & {
            _id: any;
        };
    }>;
    update(request: any, params: GetProductDto, updateProductDto: UpdateProductDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: import("./interfaces/product.interface").Product & {
            _id: any;
        };
    }>;
    remove(request: any, params: GetProductDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
}
