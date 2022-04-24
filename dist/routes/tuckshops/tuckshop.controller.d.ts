import { CreateTuckshopDto, GetAllTuckshopssDto, GetTuckshopDto, UpdateTuckshopDto } from "./dto/tuckshop.dto";
import { TuckshopServices } from "./tuckshop.service";
export declare class TuckshopsController {
    private readonly tuckshopServices;
    constructor(tuckshopServices: TuckshopServices);
    create(request: any, createTuckshopDto: CreateTuckshopDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: import("./interfaces/tuckshop.interfaces").Tuckshops & {
            _id: any;
        };
    }>;
    findAll(request: any, queryString: GetAllTuckshopssDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: (import("./interfaces/tuckshop.interfaces").Tuckshops & {
            _id: any;
        })[];
        pagination: {
            total: number;
            pages: number;
            page: number;
            limit: number;
        };
    }>;
    findOne(request: any, params: GetTuckshopDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: import("./interfaces/tuckshop.interfaces").Tuckshops & {
            _id: any;
        };
    }>;
    update(request: any, params: GetTuckshopDto, updateTuckshopDto: UpdateTuckshopDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: import("./interfaces/tuckshop.interfaces").Tuckshops & {
            _id: any;
        };
    }>;
    remove(request: any, params: GetTuckshopDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
}
