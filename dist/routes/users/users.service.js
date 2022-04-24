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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config_1 = require("@nestjs/config");
let UsersService = class UsersService {
    constructor(UserModel, configService) {
        this.UserModel = UserModel;
        this.configService = configService;
    }
    async create(userInfo, createUserDto) {
        var _a;
        let checkUser = await this.UserModel.findOne({
            emailAddress: createUserDto.emailAddress,
            status: 'active',
            isDeleted: false
        }).exec();
        if (checkUser) {
            return {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: "User already exists."
            };
        }
        let hashedPassword = await bcrypt.hash("" + createUserDto.password, 10);
        let user = new this.UserModel({
            organization: userInfo.organization._id,
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
            emailAddress: createUserDto.emailAddress,
            phoneNumber: (_a = createUserDto.phoneNumber) !== null && _a !== void 0 ? _a : "",
            role: createUserDto.role,
            password: hashedPassword
        });
        await user.save();
        this.sendVerificationEmail(user);
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "User Registration Successful."
        };
    }
    async login(loginDto) {
        let checkUser = await this.UserModel.findOne({
            emailAddress: loginDto.emailAddress,
            status: 'active',
            isDeleted: false
        }).select('password').exec();
        if (!checkUser) {
            return {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: "Your Email/Password is incorrect. Please try again."
            };
        }
        let match = await bcrypt.compare("" + loginDto.password, "" + checkUser.password);
        if (!match) {
            return {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: "Your Email/Password is incorrect. Please try again."
            };
        }
        let user = await this.UserModel.findOne({
            emailAddress: loginDto.emailAddress,
            status: 'active',
            isDeleted: false
        }).populate('organization').exec();
        let jwtObject = JSON.parse(JSON.stringify(user));
        delete jwtObject.passwordUpdatedAt;
        let apiToken = await jwt.sign(jwtObject, this.configService.get('APPLICATION_KEY'), {
            expiresIn: "1d"
        });
        jwtObject.apiToken = apiToken;
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "User login successful.",
            data: jwtObject
        };
    }
    async me(userInfo) {
        let user = await this.UserModel.findOne({
            emailAddress: userInfo.emailAddress,
            status: "active",
            isDeleted: false
        }).exec();
        let jwtObject = JSON.parse(JSON.stringify(user));
        let apiToken = await jwt.sign(jwtObject, this.configService.get('APPLICATION_KEY'), {
            expiresIn: "1d"
        });
        jwtObject.apiToken = apiToken;
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "User authentication successful.",
            data: jwtObject
        };
    }
    async findAll(userInfo, queryString) {
        let pageOptions = {
            page: queryString.page || 0,
            limit: (queryString.limit ? (queryString.limit > 100 ? 100 : queryString.limit) : 25),
            role: (queryString.role && ['Admin', 'Tuckshop', 'Guardian'].includes(queryString.role) ? queryString.role : "Admin"),
        };
        let modelParameter = {
            organization: userInfo.organization._id,
            role: pageOptions.role,
            isDeleted: false
        };
        const usersCount = await this.UserModel.countDocuments(modelParameter)
            .exec();
        const users = await this.UserModel.find(modelParameter)
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit * 1)
            .exec();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Users fetched successfully.",
            data: users,
            pagination: {
                total: usersCount,
                pages: Math.ceil(usersCount / pageOptions.limit),
                page: pageOptions.page,
                limit: pageOptions.limit
            }
        };
    }
    async findAllTuckshop(userInfo, queryString) {
        let pageOptions = {
            page: queryString.page || 0,
            limit: (queryString.limit ? (queryString.limit > 100 ? 100 : queryString.limit) : 25),
            role: (queryString.role && ['Admin', 'Tuckshop', 'Guardian'].includes(queryString.role) ? queryString.role : "Tuckshop"),
        };
        let modelParameter = {
            organization: userInfo.organization._id,
            role: pageOptions.role,
            isDeleted: false
        };
        const usersCount = await this.UserModel.countDocuments(modelParameter)
            .exec();
        const users = await this.UserModel.find(modelParameter)
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit * 1)
            .exec();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Users fetched successfully.",
            data: users,
            pagination: {
                total: usersCount,
                pages: Math.ceil(usersCount / pageOptions.limit),
                page: pageOptions.page,
                limit: pageOptions.limit
            }
        };
    }
    async findOne(userInfo, id) {
        const user = await this.UserModel.findOne({
            _id: id,
            organization: userInfo.organization._id,
            isDeleted: false
        }).exec();
        if (!user) {
            return {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: "User does not exist.",
            };
        }
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "User fetched successfully.",
            data: user
        };
    }
    async updateUser(userInfo, id, updateUserDto) {
        if (userInfo.role != "Admin" && userInfo._id != id) {
            return {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: "User does not exist.",
            };
        }
        const user = await this.UserModel.findOne({
            _id: id,
            organization: userInfo.organization._id,
            isDeleted: false
        }).exec();
        if (!user) {
            return {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: "User does not exist.",
            };
        }
        if (updateUserDto.firstName)
            user.firstName = updateUserDto.firstName;
        if (updateUserDto.lastName)
            user.lastName = updateUserDto.lastName;
        if (updateUserDto.emailAddress)
            user.emailAddress = updateUserDto.emailAddress;
        if (updateUserDto.phoneNumber)
            user.phoneNumber = updateUserDto.phoneNumber;
        if (updateUserDto.imageUrl)
            user.imageUrl = updateUserDto.imageUrl;
        if (updateUserDto.address)
            user.address = JSON.parse(JSON.stringify(updateUserDto.address));
        user.updatedAt = new Date();
        await user.save();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "User updated successfully.",
            data: user
        };
    }
    async sendVerificationEmail(user) {
        let jwtToken = await jwt.sign({
            action: "EMAIL_VERIFICATION",
            emailAddress: user.emailAddress
        }, this.configService.get('APPLICATION_KEY'), {
            expiresIn: "7d"
        });
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        config_1.ConfigService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map