import { CreateOrganizationDto, UpdateOrganizationDto } from './dto/organizations-dto';
import { OrganizationsService } from './organizations.service';
export declare class OrganizationsController {
    private readonly organizationsService;
    constructor(organizationsService: OrganizationsService);
    create(createOrganizationDto: CreateOrganizationDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: import("./interfaces/organization.interface").Organization & {
            _id: any;
        };
    }>;
    findOne(request: any): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: import("./interfaces/organization.interface").Organization & {
            _id: any;
        };
    }>;
    update(request: any, updateOrganizationDto: UpdateOrganizationDto): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        data: import("./interfaces/organization.interface").Organization & {
            _id: any;
        };
    }>;
}
