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
exports.SessionsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let SessionsService = class SessionsService {
    constructor(SessionModel) {
        this.SessionModel = SessionModel;
    }
    async create(userInfo, createSessionDto) {
        let session = new this.SessionModel({
            organization: userInfo.organization._id,
            name: createSessionDto.name,
            term: createSessionDto.term,
            status: createSessionDto.status
        });
        const sessionSave = await session.save();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Session created successfully.",
            data: sessionSave
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
            isDeleted: false
        };
        const sessionCount = await this.SessionModel.countDocuments(modelParameter).exec();
        const Sessiones = await this.SessionModel.find(modelParameter)
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit * 1).exec();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Sessions fetched successfully.",
            data: Sessiones,
            pagination: {
                total: sessionCount,
                pages: Math.ceil(sessionCount / pageOptions.limit),
                page: pageOptions.page,
                limit: pageOptions.limit
            }
        };
    }
    async findOne(userInfo, sessionId) {
        let modelParameter = {
            organization: userInfo.organization._id,
            _id: sessionId,
            isDeleted: false
        };
        const result = await this.SessionModel.findOne({ modelParameter }).exec();
        if (!result) {
            return {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: "Session does not exist.",
            };
        }
        else {
            return {
                statusCode: common_1.HttpStatus.OK,
                message: "Session fetched successfully.",
                data: result
            };
        }
    }
    async update(userInfo, sessionId, updateSessionDto) {
        const updateSession = await this.SessionModel.findOne({
            _id: sessionId,
            organization: userInfo.organization._id,
            isDeleted: false
        }).exec();
        if (!updateSession) {
            return {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: "Session does not exist.",
            };
        }
        if (updateSessionDto.name)
            updateSession.name = updateSessionDto.name;
        if (updateSessionDto.term)
            updateSession.term = updateSessionDto.term;
        if (updateSessionDto.status)
            updateSession.status = updateSessionDto.status;
        updateSession.updatedAt = new Date();
        updateSession.save();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Session updated successfully.",
            data: updateSession
        };
    }
    async remove(userInfo, sessionId) {
        const removeSession = await this.SessionModel.findOne({
            _id: sessionId,
            organization: userInfo.organization._id,
            isDeleted: false
        }).exec();
        if (!removeSession) {
            return {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: "Session does not exist.",
            };
        }
        removeSession.isDeleted = true;
        removeSession.deletedAt = new Date();
        removeSession.updatedAt = new Date();
        await removeSession.save();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Session deleted successfully.",
        };
    }
};
SessionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Session')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SessionsService);
exports.SessionsService = SessionsService;
//# sourceMappingURL=session.service.js.map