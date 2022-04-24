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
exports.TuckshopServices = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let TuckshopServices = class TuckshopServices {
    constructor(TuckshopModel) {
        this.TuckshopModel = TuckshopModel;
    }
    async create(userInfo, createTuckshopDto) {
        var _a, _b;
        const user = await this.TuckshopModel.findOne({
            user: createTuckshopDto.user,
            organization: userInfo.organization._id,
            status: 'active',
            isDeleted: false
        }).exec();
        if (user) {
            return {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: "Tuckshop already exist.",
            };
        }
        let tuckshop = new this.TuckshopModel({
            organization: userInfo.organization._id,
            user: createTuckshopDto.user,
            name: createTuckshopDto.name,
            location: createTuckshopDto.location,
            category: createTuckshopDto.category,
            tuckshopID: (_a = createTuckshopDto.tuckshopID) !== null && _a !== void 0 ? _a : '',
            imageUrl: (_b = createTuckshopDto.imageUrl) !== null && _b !== void 0 ? _b : '',
        });
        const tuckshopSave = await tuckshop.save();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Tuckshop created successfully.",
            data: tuckshopSave
        };
    }
    async findAll(userInfo, queryString) {
        let pageOptions = {
            page: queryString.page || 0,
            limit: (queryString.limit ? (queryString.limit > 100 ? 100 : queryString.limit) : 25),
            status: (queryString.status && ['active', 'inactive'].includes(queryString.status) ? queryString.status : 'active'),
        };
        let modelParameter = {
            organization: userInfo.organization._id,
            status: pageOptions.status,
            isDeleted: false
        };
        const tuckshopsCount = await this.TuckshopModel.countDocuments(modelParameter)
            .exec();
        const tuckshops = await this.TuckshopModel.find(modelParameter).populate("user")
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit * 1)
            .exec();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Tuckshops fetched successfully.",
            data: tuckshops,
            pagination: {
                total: tuckshopsCount,
                pages: Math.ceil(tuckshopsCount / pageOptions.limit),
                page: pageOptions.page,
                limit: pageOptions.limit
            }
        };
    }
    async findOne(userInfo, tuckshopId) {
        let modelParameter = {
            organization: userInfo.organization._id,
            _id: tuckshopId,
            isDeleted: false
        };
        const result = await this.TuckshopModel.findOne({ modelParameter }).populate("user");
        if (!result) {
            return {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: "Tuckshop does not exist.",
            };
        }
        return {
            statusCode: common_1.HttpStatus.BAD_REQUEST,
            message: "Tuckshop fetched successfully.",
            data: result
        };
    }
    async update(userInfo, tuckshopId, updateTuckshopsDto) {
        const updateTuckshop = await this.TuckshopModel.findOne({
            _id: tuckshopId,
            organization: userInfo.organization._id,
            isDeleted: false
        }).populate("user").exec();
        if (!updateTuckshop) {
            return {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: "Tuckshop does not exist.",
            };
        }
        if (updateTuckshopsDto.user)
            updateTuckshop.user = updateTuckshopsDto.user;
        if (updateTuckshopsDto.name)
            updateTuckshop.name = updateTuckshopsDto.name;
        if (updateTuckshopsDto.location)
            updateTuckshop.location = updateTuckshopsDto.location;
        if (updateTuckshopsDto.category)
            updateTuckshop.category = updateTuckshopsDto.category;
        if (updateTuckshopsDto.tuckshopID)
            updateTuckshop.tuckshopID = updateTuckshopsDto.tuckshopID;
        if (updateTuckshopsDto.imageUrl)
            updateTuckshop.imageUrl = updateTuckshopsDto.imageUrl;
        updateTuckshop.updatedAt = new Date();
        await updateTuckshop.save();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Tuckshop updated successfully.",
            data: updateTuckshop
        };
    }
    async remove(userInfo, tuckshopId) {
        const removeTuckshop = await this.TuckshopModel.findOne({
            _id: tuckshopId,
            organization: userInfo.organization._id,
            isDeleted: false
        }).exec();
        if (!removeTuckshop) {
            return {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: "Tuckshop does not exist.",
            };
        }
        removeTuckshop.isDeleted = true;
        removeTuckshop.deletedAt = new Date();
        removeTuckshop.updatedAt = new Date();
        await removeTuckshop.save();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Tuckshop deleted successfully.",
        };
    }
};
TuckshopServices = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Tuckshops')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TuckshopServices);
exports.TuckshopServices = TuckshopServices;
//# sourceMappingURL=tuckshop.service.js.map