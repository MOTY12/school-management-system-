import { HttpStatus } from "@nestjs/common";
import { Model } from "mongoose";
import { CreateBankDetailDto, GetAllBankDetailsDto, UpdateBankDetailDto } from "./dto/bankDetails.dto";
import { BankDetails } from './interfaces/bankDetails.interfaces';
export declare class BankDetailsService {
    private readonly BankDetailModel;
    constructor(BankDetailModel: Model<BankDetails>);
    create(userInfo: any, createBankDetailsDto: CreateBankDetailDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        data: BankDetails & {
            _id: any;
        };
    }>;
    findAll(userInfo: any, queryString: GetAllBankDetailsDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: (BankDetails & {
            _id: any;
        })[];
        pagination: {
            total: number;
            pages: number;
            page: number;
            limit: number;
        };
    }>;
    findOne(userInfo: any, bankDetailId: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        data: BankDetails & {
            _id: any;
        };
    }>;
    update(userInfo: any, bankDetailId: string, updateBankDetailDto: UpdateBankDetailDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        data: BankDetails & {
            _id: any;
        };
    }>;
    remove(userInfo: any, bankDetailId: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
