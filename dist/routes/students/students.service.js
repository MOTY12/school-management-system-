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
exports.StudentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
let StudentsService = class StudentsService {
    constructor(UserModel, StudentModel) {
        this.UserModel = UserModel;
        this.StudentModel = StudentModel;
    }
    async create(userInfo, createStudentDto) {
        let checkUser = await this.StudentModel.findOne({
            firstName: createStudentDto.firstName,
            lastName: createStudentDto.lastName,
            status: 'active',
            isDeleted: false
        }).exec();
        if (checkUser) {
            return {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: "Student already exists."
            };
        }
        let guardian;
        guardian = await this.UserModel.findOne({
            emailAddress: createStudentDto.guardianEmailAddress,
            status: 'active',
            isDeleted: false
        }).exec();
        if (!guardian) {
            guardian = await this.createGuardian(userInfo, {
                firstName: createStudentDto.guardianFirstName,
                lastName: createStudentDto.guardianLastName,
                emailAddress: createStudentDto.guardianEmailAddress,
            });
        }
        let createStudent = new this.StudentModel({
            organization: userInfo.organization._id,
            class: createStudentDto.class,
            guardian: guardian._id,
            firstName: createStudentDto.firstName,
            middleName: createStudentDto.middleName,
            lastName: createStudentDto.lastName,
            dateOfBirth: createStudentDto.dateOfBirth,
            imageUrl: createStudentDto.imageUrl || ''
        });
        await createStudent.save();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Student created successfully.",
            data: createStudent
        };
    }
    async findAll(userInfo, queryString) {
        let pageOptions = {
            page: queryString.page || 0,
            limit: (queryString.limit ? (queryString.limit > 100 ? 100 : queryString.limit) : 25),
            guardian: queryString.guardian || '',
            class: queryString.class || '',
        };
        let modelParameter = {
            organization: userInfo.organization._id,
            guardian: pageOptions.guardian,
            isDeleted: false
        };
        if (modelParameter.guardian == '')
            delete modelParameter.guardian;
        if (modelParameter.class == '')
            delete modelParameter.class;
        const studentsCount = await this.StudentModel.countDocuments(modelParameter)
            .exec();
        const students = await this.StudentModel.find(modelParameter)
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit * 1)
            .exec();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Students fetched successfully.",
            data: students,
            pagination: {
                total: studentsCount,
                pages: Math.ceil(studentsCount / pageOptions.limit),
                page: pageOptions.page,
                limit: pageOptions.limit
            }
        };
    }
    async findOne(userInfo, id) {
        let student = await this.StudentModel.findOne({
            _id: id,
            organization: userInfo.organization._id,
            isDeleted: false
        }).populate('guardian').exec();
        if (!student) {
            return {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: "Student does not exist."
            };
        }
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Student fetched successfully.",
            data: student
        };
    }
    async update(userInfo, updateStudentDto, id) {
        let student = await this.StudentModel.findOne({
            _id: id,
            organization: userInfo.organization._id,
            isDeleted: false
        }).populate('guardian').exec();
        if (!student) {
            return {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: "Student does not exist."
            };
        }
        if (updateStudentDto.firstName)
            student.firstName = updateStudentDto.firstName;
        if (updateStudentDto.lastName)
            student.lastName = updateStudentDto.lastName;
        if (updateStudentDto.class)
            student.class = updateStudentDto.class;
        if (updateStudentDto.dateOfBirth)
            student.dateOfBirth = updateStudentDto.dateOfBirth;
        if (updateStudentDto.studentID)
            student.studentID = updateStudentDto.studentID;
        if (updateStudentDto.imageUrl)
            student.imageUrl = updateStudentDto.imageUrl;
        if (updateStudentDto.status)
            student.status = updateStudentDto.status;
        let guardian = Object.assign({}, student.guardian);
        if (updateStudentDto.guardianEmailAddress && updateStudentDto.guardianEmailAddress != guardian.emailAddress) {
            guardian = await this.UserModel.findOne({
                emailAddress: updateStudentDto.guardianEmailAddress,
                status: 'active',
                isDeleted: false
            }).exec();
            if (!guardian) {
                guardian = await this.createGuardian(userInfo, {
                    firstName: updateStudentDto.guardianFirstName,
                    lastName: updateStudentDto.guardianLastName,
                    emailAddress: updateStudentDto.guardianEmailAddress,
                });
            }
            student.guardian = guardian._id;
        }
        student.updatedAt = new Date();
        await student.save();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Student updated successfully.",
            data: student
        };
    }
    async remove(userInfo, id) {
        let student = await this.StudentModel.findOne({
            _id: id,
            organization: userInfo.organization._id,
            isDeleted: false
        }).populate('guardian').exec();
        if (!student) {
            return {
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: "Student does not exist."
            };
        }
        student.isDeleted = true;
        student.deletedAt = student.updatedAt = new Date();
        await student.save();
        return {
            statusCode: common_1.HttpStatus.OK,
            message: "Student deleted successfully.",
        };
    }
    async createGuardian(userInfo, guardian) {
        let adminHashedPassword = await bcrypt.hash("0000", 10);
        let newGuardian = new this.UserModel({
            organization: userInfo.organization._id,
            firstName: guardian.firstName,
            lastName: guardian.lastName,
            emailAddress: guardian.emailAddress,
            phoneNumber: "",
            role: "Guardian",
            password: adminHashedPassword
        });
        return await newGuardian.save();
    }
};
StudentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __param(1, (0, mongoose_1.InjectModel)('Student')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], StudentsService);
exports.StudentsService = StudentsService;
//# sourceMappingURL=students.service.js.map