import { HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateClassDto, GetAllClassesDto, UpdateClassDto } from './dto/class.dto';
import { Class } from './interfaces/class.interface';
export declare class ClassesService {
    private readonly ClassModel;
    constructor(ClassModel: Model<Class>);
    create(userInfo: any, createClassDto: CreateClassDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: Class & {
            _id: any;
        };
    }>;
    findAll(userInfo: any, queryString: GetAllClassesDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: (Class & {
            _id: any;
        })[];
        pagination: {
            total: number;
            pages: number;
            page: number;
            limit: number;
        };
    }>;
    findOne(userInfo: any, classId: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        data: Class & {
            _id: any;
        };
    }>;
    update(userInfo: any, classId: string, updateClassDto: UpdateClassDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        data: Class & {
            _id: any;
        };
    }>;
    remove(userInfo: any, classId: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}
