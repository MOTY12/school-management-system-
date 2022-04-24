"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
let OrganizationsService = class OrganizationsService {
    constructor(OrganizationModel, UserModel) {
        this.OrganizationModel = OrganizationModel;
        this.UserModel = UserModel;
    }
    async create(createOrganizationDto) {
        var _a, _b;
        let checkOrganization = await this.OrganizationModel.findOne({
            emailAddress: createOrganizationDto.emailAddress,
            isDeleted: false
        }).exec();
        if (checkOrganization) {
            return {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: "This organization already exists."
            };
        }
        let createOrganization = new this.OrganizationModel({
            name: createOrganizationDto.name,
            emailAddress: createOrganizationDto.emailAddress,
            phoneNumber: (_a = createOrganizationDto.phoneNumber) !== null && _a !== void 0 ? _a : '',
            logoUrl: (_b = createOrganizationDto.logoUrl) !== null && _b !== void 0 ? _b : '',
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
        });
        await user.save();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Organization created successfully.",
            data: createOrganization
        };
    }
    async findOne(userInfo) {
        let checkOrganization = await this.OrganizationModel.findOne({
            _id: userInfo.organization._id,
            status: "active",
            isDeleted: false
        }).exec();
        if (!checkOrganization) {
            return {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: "This organization does not exist."
            };
        }
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Organization fetched successfully.",
            data: checkOrganization
        };
    }
    async update(userInfo, updateOrganizationDto) {
        let organization = await this.OrganizationModel.findOne({
            _id: userInfo.organization._id,
            status: "active",
            isDeleted: false
        }).exec();
        if (!organization) {
            return {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: "This organization does not exist."
            };
        }
        if (updateOrganizationDto.name)
            organization.name = updateOrganizationDto.name;
        if (updateOrganizationDto.emailAddress)
            organization.emailAddress = updateOrganizationDto.emailAddress;
        if (updateOrganizationDto.phoneNumber)
            organization.phoneNumber = updateOrganizationDto.phoneNumber;
        if (updateOrganizationDto.logoUrl)
            organization.logoUrl = updateOrganizationDto.logoUrl;
        if (updateOrganizationDto.address)
            organization.address = JSON.parse(JSON.stringify(updateOrganizationDto.address));
        organization.updatedAt = new Date();
        await organization.save();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Organization updated successfully.",
            data: organization
        };
    }
};
OrganizationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Organization')),
    __param(1, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], OrganizationsService);
exports.OrganizationsService = OrganizationsService;
//# sourceMappingURL=organizations.service.js.map