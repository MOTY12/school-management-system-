/// <reference types="mongoose" />
import { StudentsService } from './students.service';
import { CreateStudentDto, GetAllStudentsDto, GetStudentDto, UpdateStudentDto } from './dto/student.dto';
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    create(request: any, createStudentDto: CreateStudentDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: import("mongoose").Document<any, any, import("./interfaces/student.interface").Student> & import("./interfaces/student.interface").Student & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    findAll(request: any, queryString: GetAllStudentsDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: (import("mongoose").Document<any, any, import("./interfaces/student.interface").Student> & import("./interfaces/student.interface").Student & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        pagination: {
            total: number;
            pages: number;
            page: number;
            limit: number;
        };
    }>;
    findOne(request: any, params: GetStudentDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: import("mongoose").Document<any, any, import("./interfaces/student.interface").Student> & import("./interfaces/student.interface").Student & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    update(request: any, updateStudentDto: UpdateStudentDto, params: GetStudentDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: import("mongoose").Document<any, any, import("./interfaces/student.interface").Student> & import("./interfaces/student.interface").Student & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    remove(request: any, params: GetStudentDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
}
