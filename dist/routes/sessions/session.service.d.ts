import { HttpStatus } from "@nestjs/common";
import { Model } from "mongoose";
import { CreateSessionDto, GetAllSessionDto, UpdateSessionDto } from "./dto/session.dto";
import { Session } from './interfaces/session.interfaces';
export declare class SessionsService {
    private readonly SessionModel;
    constructor(SessionModel: Model<Session>);
    create(userInfo: any, createSessionDto: CreateSessionDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: Session & {
            _id: any;
        };
    }>;
    findAll(userInfo: any, queryString: GetAllSessionDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: (Session & {
            _id: any;
        })[];
        pagination: {
            total: number;
            pages: number;
            page: number;
            limit: number;
        };
    }>;
    findOne(userInfo: any, sessionId: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        data: Session & {
            _id: any;
        };
    }>;
    update(userInfo: any, sessionId: string, updateSessionDto: UpdateSessionDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        data: Session & {
            _id: any;
        };
    }>;
    remove(userInfo: any, sessionId: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
