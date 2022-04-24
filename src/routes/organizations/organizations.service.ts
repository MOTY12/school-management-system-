import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose, Types } from 'mongoose';
import { User } from '../users/interfaces/user.interface';
import { CreateOrganizationDto, UpdateOrganizationDto } from './dto/organizations-dto';
import { Organization } from './interfaces/organization.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class OrganizationsService {

  constructor(
    @InjectModel('Organization') private readonly OrganizationModel: Model<Organization>,
    @InjectModel('User') private readonly UserModel: Model<User>,
  ) {

  }

  async create(createOrganizationDto: CreateOrganizationDto) {
    // Check if organization already exists
    let checkOrganization = await this.OrganizationModel.findOne({
      emailAddress: createOrganizationDto.emailAddress,
      isDeleted: false
    }).exec()

    // Return error if Organization already exists
    if (checkOrganization) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "This organization already exists."
      }
    }

    // Create Organization
    let createOrganization = new this.OrganizationModel({
      name: createOrganizationDto.name,
      emailAddress: createOrganizationDto.emailAddress,
      phoneNumber: createOrganizationDto.phoneNumber ?? '',
      logoUrl: createOrganizationDto.logoUrl ?? '',
      address: createOrganizationDto.address,
    });

    await createOrganization.save();

    let adminHashedPassword = await bcrypt.hash("0000", 10);

    let user = new this.UserModel({
      organization: createOrganization._id,
      firstName: createOrganizationDto.adminFirstName,
      lastName: createOrganizationDto.adminLastName,
      emailAddress: createOrganizationDto.adminEmailAddress,
      phoneNumber: "",
      role: "Admin",
      password: adminHashedPassword
    })

    await user.save();

    return {
      statusCode: HttpStatus.OK,
      message: "Organization created successfully.",
      data: createOrganization
    }
  }

  async findOne(userInfo: any) {
    // Check for organization
    let checkOrganization = await this.OrganizationModel.findOne({
      _id: userInfo.organization._id,
      status: "active",
      isDeleted: false
    }).exec();

    if (!checkOrganization) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "This organization does not exist."
      }
    }

    return {
      statusCode: HttpStatus.OK,
      message: "Organization fetched successfully.",
      data: checkOrganization
    }
  }

  async update(userInfo: any, updateOrganizationDto: UpdateOrganizationDto) {
    // Check for organization
    let organization = await this.OrganizationModel.findOne({
      _id: userInfo.organization._id,
      status: "active",
      isDeleted: false
    }).exec();

    if (!organization) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "This organization does not exist."
      }
    }

    if(updateOrganizationDto.name) organization.name = updateOrganizationDto.name;
    if(updateOrganizationDto.emailAddress) organization.emailAddress = updateOrganizationDto.emailAddress;
    if(updateOrganizationDto.phoneNumber) organization.phoneNumber = updateOrganizationDto.phoneNumber;
    if(updateOrganizationDto.logoUrl) organization.logoUrl = updateOrganizationDto.logoUrl;
    if(updateOrganizationDto.address) organization.address = JSON.parse(JSON.stringify(updateOrganizationDto.address));

    organization.updatedAt = new Date();
    await organization.save();

    return {
      statusCode: HttpStatus.OK,
      message: "Organization updated successfully.",
      data: organization
    }
  }

  // async remove(organizationId: string) {
  //   // Check for organization
  //   let organization = await this.OrganizationModel.findOne({
  //     _id: organizationId,
  //     status: "active",
  //     isDeleted: false
  //   }).exec();

  //   if (!organization) {
  //     return {
  //       statusCode: HttpStatus.BAD_REQUEST,
  //       message: "This organization does not exist."
  //     }
  //   }
  //   organization.isDeleted = true;
  //   organization.deletedAt = new Date();
  //   organization.updatedAt = new Date();
  //   await organization.save();

  //   return {
  //     statusCode: HttpStatus.OK,
  //     message: "Organization deleted successfully."
  //   }
  // }
}
