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
exports.AuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const jwt = require("jsonwebtoken");
const mongoose_2 = require("mongoose");
let AuthMiddleware = class AuthMiddleware {
    constructor(userModel, configService) {
        this.userModel = userModel;
        this.configService = configService;
    }
    async use(req, res, next) {
        const token = req.headers['Authorization'] || req.headers['authorization'];
        if (!token) {
            throw new common_1.HttpException('Authorization header not found - Access Restricted!', common_1.HttpStatus.FORBIDDEN);
        }
        if (token.substr(0, 7) != "Bearer ") {
            throw new common_1.HttpException('Invalid authorization header - Access Restricted!', common_1.HttpStatus.FORBIDDEN);
        }
        let decodedToken;
        try {
            decodedToken = await jwt.verify(token.substr(7), this.configService.get('APPLICATION_KEY'));
        }
        catch (err) {
            throw new common_1.HttpException('Expired token - Access Restricted!', common_1.HttpStatus.FORBIDDEN);
        }
        const user = await this.userModel.findOne({
            _id: decodedToken._id,
            status: "active",
            isDeleted: false
        }).populate('organization').exec();
        if (!user) {
            throw new common_1.HttpException('Invalid user - Access Restricted!', common_1.HttpStatus.FORBIDDEN);
        }
        req.decoded = decodedToken;
        next();
    }
};
AuthMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        config_1.ConfigService])
], AuthMiddleware);
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map