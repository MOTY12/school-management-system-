import { HttpStatus } from "@nestjs/common";
import { Model } from "mongoose";
import { CreateTuckshopDto, GetAllTuckshopssDto, UpdateTuckshopDto } from "./dto/tuckshop.dto";
import { Tuckshops } from "./interfaces/tuckshop.interfaces";
export declare class TuckshopServices {
    private readonly TuckshopModel;
    constructor(TuckshopModel: Model<Tuckshops>);
    create(userInfo: any, createTuckshopDto: CreateTuckshopDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        data: Tuckshops & {
            _id: any;
        };
    }>;
    findAll(userInfo: any, queryString: GetAllTuckshopssDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: (Tuckshops & {
            _id: any;
        })[];
        pagination: {
            total: number;
            pages: number;
            page: number;
            limit: number;
        };
    }>;
    findOne(userInfo: any, tuckshopId: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        data: Tuckshops & {
            _id: any;
        };
    }>;
    update(userInfo: any, tuckshopId: string, updateTuckshopsDto: UpdateTuckshopDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        data: Tuckshops & {
            _id: any;
        };
    }>;
    remove(userInfo: any, tuckshopId: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
