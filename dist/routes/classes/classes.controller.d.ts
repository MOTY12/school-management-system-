import { ClassesService } from './classes.service';
import { CreateClassDto, GetAllClassesDto, GetClassDto, UpdateClassDto } from './dto/class.dto';
export declare class ClassesController {
    private readonly classesService;
    constructor(classesService: ClassesService);
    create(request: any, createClassDto: CreateClassDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: import("./interfaces/class.interface").Class & {
            _id: any;
        };
    }>;
    findAll(request: any, queryString: GetAllClassesDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: (import("./interfaces/class.interface").Class & {
            _id: any;
        })[];
        pagination: {
            total: number;
            pages: number;
            page: number;
            limit: number;
        };
    }>;
    findOne(request: any, params: GetClassDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: import("./interfaces/class.interface").Class & {
            _id: any;
        };
    }>;
    update(request: any, params: GetClassDto, updateClassDto: UpdateClassDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: import("./interfaces/class.interface").Class & {
            _id: any;
        };
    }>;
    remove(request: any, params: GetClassDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
    }>;
}
