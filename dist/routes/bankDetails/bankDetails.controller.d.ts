import { BankDetailsService } from "./bankDetails.service";
import { CreateBankDetailDto, GetAllBankDetailsDto, GetBankDetailDto, UpdateBankDetailDto } from "./dto/bankDetails.dto";
export declare class BankDetailsController {
    private readonly bankDetailsService;
    constructor(bankDetailsService: BankDetailsService);
    create(request: any, createBankDetailsDto: CreateBankDetailDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: import("./interfaces/bankDetails.interfaces").BankDetails & {
            _id: any;
        };
    }>;
    findAll(request: any, queryString: GetAllBankDetailsDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: (import("./interfaces/bankDetails.interfaces").BankDetails & {
            _id: any;
        })[];
        pagination: {
            total: number;
            pages: number;
            page: number;
            limit: number;
        };
    }>;
    findOne(request: any, params: GetBankDetailDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: import("./interfaces/bankDetails.interfaces").BankDetails & {
            _id: any;
        };
    }>;
    update(request: any, params: GetBankDetailDto, updateBankDetailDto: UpdateBankDetailDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: import("./interfaces/bankDetails.interfaces").BankDetails & {
            _id: any;
        };
    }>;
    remove(request: any, params: GetBankDetailDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
}
