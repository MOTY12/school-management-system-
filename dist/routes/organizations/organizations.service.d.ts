import { HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../users/interfaces/user.interface';
import { CreateOrganizationDto, UpdateOrganizationDto } from './dto/organizations-dto';
import { Organization } from './interfaces/organization.interface';
export declare class OrganizationsService {
    private readonly OrganizationModel;
    private readonly UserModel;
    constructor(OrganizationModel: Model<Organization>, UserModel: Model<User>);
    create(createOrganizationDto: CreateOrganizationDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        data: Organization & {
            _id: any;
        };
    }>;
    findOne(userInfo: any): Promise<{
        statusCode: HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        data: Organization & {
            _id: any;
        };
    }>;
    update(userInfo: any, updateOrganizationDto: UpdateOrganizationDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        data: Organization & {
            _id: any;
        };
    }>;
}
