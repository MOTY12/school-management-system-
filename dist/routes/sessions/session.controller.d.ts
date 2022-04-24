import { CreateSessionDto, GetAllSessionDto, GetSessionDto, UpdateSessionDto } from "./dto/session.dto";
import { SessionsService } from "./session.service";
export declare class SessionsController {
    private readonly sessionsService;
    constructor(sessionsService: SessionsService);
    create(request: any, createSessionDto: CreateSessionDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: import("./interfaces/session.interfaces").Session & {
            _id: any;
        };
    }>;
    findAll(request: any, queryString: GetAllSessionDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: (import("./interfaces/session.interfaces").Session & {
            _id: any;
        })[];
        pagination: {
            total: number;
            pages: number;
            page: number;
            limit: number;
        };
    }>;
    findOne(request: any, params: GetSessionDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: import("./interfaces/session.interfaces").Session & {
            _id: any;
        };
    }>;
    update(request: any, params: GetSessionDto, updateSessionDto: UpdateSessionDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: import("./interfaces/session.interfaces").Session & {
            _id: any;
        };
    }>;
    remove(request: any, params: GetSessionDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
}
