import { HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../users/interfaces/user.interface';
import { CreateStudentDto, GetAllStudentsDto, UpdateStudentDto } from './dto/student.dto';
import { Student } from './interfaces/student.interface';
export declare class StudentsService {
    private readonly UserModel;
    private readonly StudentModel;
    constructor(UserModel: Model<User>, StudentModel: Model<Student>);
    create(userInfo: any, createStudentDto: CreateStudentDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        data: import("mongoose").Document<any, any, Student> & Student & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    findAll(userInfo: any, queryString: GetAllStudentsDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: (import("mongoose").Document<any, any, Student> & Student & {
            _id: import("mongoose").Types.ObjectId;
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
        data: import("mongoose").Document<any, any, Student> & Student & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    update(userInfo: any, updateStudentDto: UpdateStudentDto, id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        data: import("mongoose").Document<any, any, Student> & Student & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    remove(userInfo: any, id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    createGuardian(userInfo: any, guardian: any): Promise<User & {
        _id: any;
    }>;
}
