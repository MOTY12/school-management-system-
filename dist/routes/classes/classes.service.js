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
exports.ClassesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ClassesService = class ClassesService {
    constructor(ClassModel) {
        this.ClassModel = ClassModel;
    }
    async create(userInfo, createClassDto) {
        let createClass = new this.ClassModel({
            organization: userInfo.organization._id,
            name: createClassDto.name,
            level: createClassDto.level,
            type: createClassDto.type,
            classHead: createClassDto.classHead,
            imageUrl: createClassDto.imageUrl,
        });
        const classCreated = await createClass.save();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Class created successfully.",
            data: classCreated
        };
    }
    async findAll(userInfo, queryString) {
        let pageOptions = {
            page: queryString.page || 0,
            limit: (queryString.limit ? (queryString.limit > 100 ? 100 : queryString.limit) : 25),
            type: (queryString.type && ['class', 'alumni'].includes(queryString.type) ? queryString.type : "class"),
        };
        let modelParameter = {
            organization: userInfo.organization._id,
            type: pageOptions.type,
            isDeleted: false
        };
        const classesCount = await this.ClassModel.countDocuments(modelParameter)
            .exec();
        const classes = await this.ClassModel.find(modelParameter)
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit * 1)
            .exec();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Classes fetched successfully.",
            data: classes,
            pagination: {
                total: classesCount,
                pages: Math.ceil(classesCount / pageOptions.limit),
                page: pageOptions.page,
                limit: pageOptions.limit
            }
        };
    }
    async findOne(userInfo, classId) {
        let modelParameter = {
            organization: userInfo.organization._id,
            _id: classId,
            isDeleted: false
        };
        const result = await this.ClassModel.findOne({ modelParameter });
        if (!result) {
            return {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: "Class does not exist.",
            };
        }
        else {
            return {
                statusCode: common_1.HttpStatus.OK,
                message: "Class fetched successfully.",
                data: result
            };
        }
    }
    async update(userInfo, classId, updateClassDto) {
        const updateClass = await this.ClassModel.findOne({
            _id: classId,
            organization: userInfo.organization._id,
            isDeleted: false
        });
        if (!updateClass) {
            return {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: "Class does not exist.",
            };
        }
        if (updateClassDto.name)
            updateClass.name = updateClassDto.name;
        if (updateClassDto.level)
            updateClass.level = updateClassDto.level;
        if (updateClassDto.type)
            updateClass.type = updateClassDto.type;
        if (updateClassDto.classHead)
            updateClass.classHead = updateClassDto.classHead;
        if (updateClassDto.imageUrl)
            updateClass.imageUrl = updateClassDto.imageUrl;
        updateClass.updatedAt = new Date();
        await updateClass.save();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Class updated successfully.",
            data: updateClass
        };
    }
    async remove(userInfo, classId) {
        const removeClass = await this.ClassModel.findOne({
            _id: classId,
            organization: userInfo.organization._id,
            isDeleted: false
        }).exec();
        if (!removeClass) {
            return {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: "Class does not exist.",
            };
        }
        removeClass.isDeleted = true;
        removeClass.deletedAt = new Date();
        removeClass.updatedAt = new Date();
        await removeClass.save();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Class deleted successfully.",
        };
    }
};
ClassesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Class')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ClassesService);
exports.ClassesService = ClassesService;
//# sourceMappingURL=classes.service.js.map