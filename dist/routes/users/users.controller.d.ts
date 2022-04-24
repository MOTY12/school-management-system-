import { CreateUserDto, GetAllUsersDto, GetUserDto, LoginDto, UpdateUserDto } from './dto/user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(request: any, createUserDto: CreateUserDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
    login(loginDto: LoginDto): Promise<any>;
    me(request: any): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: any;
    }>;
    findAll(request: any, queryString: GetAllUsersDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: (import("./interfaces/user.interface").User & {
            _id: any;
        })[];
        pagination: {
            total: number;
            pages: number;
            page: number;
            limit: number;
        };
    }>;
    findAllTuckshop(request: any, queryString: GetAllUsersDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: (import("./interfaces/user.interface").User & {
            _id: any;
        })[];
        pagination: {
            total: number;
            pages: number;
            page: number;
            limit: number;
        };
    }>;
    findOne(request: any, params: GetUserDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: import("./interfaces/user.interface").User & {
            _id: any;
        };
    }>;
    updateUser(request: any, params: GetUserDto, updateUserDto: UpdateUserDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: import("./interfaces/user.interface").User & {
            _id: any;
        };
    }>;
    remove(id: string): string;
}
