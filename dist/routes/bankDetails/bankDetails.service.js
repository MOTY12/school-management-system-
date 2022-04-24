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
exports.BankDetailsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let BankDetailsService = class BankDetailsService {
    constructor(BankDetailModel) {
        this.BankDetailModel = BankDetailModel;
    }
    async create(userInfo, createBankDetailsDto) {
        let checkBankDetails = await this.BankDetailModel.findOne({
            accountNumber: createBankDetailsDto.accountNumber,
            status: 'active',
            isDeleted: false
        });
        if (checkBankDetails) {
            return {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: "Account number already exists."
            };
        }
        let bankDetail = new this.BankDetailModel({
            organization: userInfo.organization._id,
            accountName: createBankDetailsDto.accountName,
            accountNumber: createBankDetailsDto.accountNumber,
            bankCode: createBankDetailsDto.bankCode,
        });
        const bankDetailsave = await bankDetail.save();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Bank details saved successfully.",
            data: bankDetailsave
        };
    }
    async findAll(userInfo, queryString) {
        let pageOptions = {
            page: queryString.page || 0,
            limit: (queryString.limit ? (queryString.limit > 100 ? 100 : queryString.limit) : 25),
            status: (queryString.status && ['active', 'inactive'].includes(queryString.status) ? queryString.status : "active"),
        };
        let modelParameter = {
            organization: userInfo.organization._id,
            isDeleted: false,
            status: pageOptions.status
        };
        const bankDetailsCount = await this.BankDetailModel.countDocuments(modelParameter).exec();
        const bankDetails = await this.BankDetailModel.find(modelParameter)
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit * 1)
            .exec();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Bank details fetched successfully.",
            data: bankDetails,
            pagination: {
                total: bankDetailsCount,
                pages: Math.ceil(bankDetailsCount / pageOptions.limit),
                page: pageOptions.page,
                limit: pageOptions.limit
            }
        };
    }
    async findOne(userInfo, bankDetailId) {
        let modelParameter = {
            organization: userInfo.organization._id,
            _id: bankDetailId,
            isDeleted: false
        };
        const result = await this.BankDetailModel.findOne(modelParameter).exec();
        if (!result) {
            return {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: "Bank details does not exist.",
            };
        }
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Bank details fetched successfully.",
            data: result
        };
    }
    async update(userInfo, bankDetailId, updateBankDetailDto) {
        const updateBankDetail = await this.BankDetailModel.findOne({
            _id: bankDetailId,
            organization: userInfo.organization._id,
            isDeleted: false
        }).exec();
        if (!updateBankDetail) {
            return {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: "Bank details does not exist.",
            };
        }
        if (updateBankDetailDto.accountName)
            updateBankDetail.accountName = updateBankDetailDto.accountName;
        if (updateBankDetailDto.accountNumber)
            updateBankDetail.accountNumber = updateBankDetailDto.accountNumber;
        if (updateBankDetailDto.bankCode)
            updateBankDetail.bankCode = updateBankDetailDto.bankCode;
        updateBankDetail.updatedAt = new Date();
        updateBankDetail.save();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Bank details updated successfully.",
            data: updateBankDetail
        };
    }
    async remove(userInfo, bankDetailId) {
        const removeBankDetails = await this.BankDetailModel.findOne({
            _id: bankDetailId,
            organization: userInfo.organization._id,
            isDeleted: false
        }).exec();
        if (!removeBankDetails) {
            return {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: "Bank details does not exist.",
            };
        }
        removeBankDetails.isDeleted = true;
        removeBankDetails.deletedAt = new Date();
        removeBankDetails.updatedAt = new Date();
        await removeBankDetails.save();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Bank details deleted successfully.",
        };
    }
};
BankDetailsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('BankDetails')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BankDetailsService);
exports.BankDetailsService = BankDetailsService;
//# sourceMappingURL=bankDetails.service.js.map