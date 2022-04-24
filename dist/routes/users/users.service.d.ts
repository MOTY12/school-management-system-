import { HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto, GetAllUsersDto, LoginDto, UpdateUserDto } from './dto/user.dto';
import { User } from './interfaces/user.interface';
import { ConfigService } from '@nestjs/config';
export declare class UsersService {
    private readonly UserModel;
    private configService;
    constructor(UserModel: Model<User>, configService: ConfigService);
    create(userInfo: any, createUserDto: CreateUserDto): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    me(userInfo: any): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: any;
    }>;
    findAll(userInfo: any, queryString: GetAllUsersDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: (User & {
            _id: any;
        })[];
        pagination: {
            total: number;
            pages: number;
            page: number;
            limit: number;
        };
    }>;
    findAllTuckshop(userInfo: any, queryString: GetAllUsersDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: (User & {
            _id: any;
        })[];
        pagination: {
            total: number;
            pages: number;
            page: number;
            limit: number;
        };
    }>;
    findOne(userInfo: any, id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        data: User & {
            _id: any;
        };
    }>;
    updateUser(userInfo: any, id: string, updateUserDto: UpdateUserDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        data: User & {
            _id: any;
        };
    }>;
    sendVerificationEmail(user: User): Promise<void>;
    remove(id: number): string;
}
