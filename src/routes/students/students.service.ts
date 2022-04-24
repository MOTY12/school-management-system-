import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/interfaces/user.interface';
import { CreateStudentDto, GetAllStudentsDto, UpdateStudentDto } from './dto/student.dto';
import { Student } from './interfaces/student.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StudentsService {

  constructor(
    @InjectModel('User') private readonly UserModel: Model<User>,
    @InjectModel('Students') private readonly StudentModel: Model<Student>
  ) {

  }

  async create(userInfo: any, createStudentDto: CreateStudentDto) {
    // Check if student already exists
    let checkUser = await this.StudentModel.findOne({
      firstName: createStudentDto.firstName,
      lastName: createStudentDto.lastName,
      status: 'active',
      isDeleted: false
    }).exec()

    // Return error if student already exists
    if (checkUser) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Student already exists."
      }
    }

    let guardian;

    // Check if guardian already exists
    guardian = await this.UserModel.findOne({
      emailAddress: createStudentDto.guardianEmailAddress,
      status: 'active',
      isDeleted: false
    }).exec()

    if (!guardian) {
      // Create guardian if guardian does not exist

      guardian = await this.createGuardian(userInfo, {
        firstName: createStudentDto.guardianFirstName,
        lastName: createStudentDto.guardianLastName,
        emailAddress: createStudentDto.guardianEmailAddress,
      });
    }

    // Create student
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
      statusCode: HttpStatus.OK,
      message: "Student created successfully.",
      data: createStudent
    }

  }

  async findAll(userInfo: any, queryString: GetAllStudentsDto) {
    let pageOptions = {
      page: queryString.page || 0,
      limit: (queryString.limit ? (queryString.limit > 100 ? 100 : queryString.limit) : 25),
      guardian: queryString.guardian || '',
      class: queryString.class || '',
    }

    let modelParameter: any = {
      organization: userInfo.organization._id,
      guardian: pageOptions.guardian,
      isDeleted: false
    };

    if (modelParameter.guardian == '') delete modelParameter.guardian;
    if (modelParameter.class == '') delete modelParameter.class;

    const studentsCount = await this.StudentModel.countDocuments(modelParameter)
      .exec();

    const students = await this.StudentModel.find(modelParameter)
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit * 1)
      .exec();

    return {
      statusCode: HttpStatus.OK,
      message: "Students fetched successfully.",
      data: students,
      pagination: {
        total: studentsCount,
        pages: Math.ceil(studentsCount / pageOptions.limit),
        page: pageOptions.page,
        limit: pageOptions.limit
      }
    }
  }

  async findOne(userInfo: any, id: string) {
    // Check if student already exists
    let student = await this.StudentModel.findOne({
      _id: id,
      organization: userInfo.organization._id,
      isDeleted: false
    }).populate('guardian').exec()

    // Return error if student already exists
    if (!student) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Student does not exist."
      }
    }

    return {
      statusCode: HttpStatus.OK,
      message: "Student fetched successfully.",
      data: student
    }

  }

  async update(userInfo: any, updateStudentDto: UpdateStudentDto, id: string) {
    // Check if student already exists
    let student = await this.StudentModel.findOne({
      _id: id,
      organization: userInfo.organization._id,
      isDeleted: false
    }).populate('guardian').exec()

    // Return error if student already exists
    if (!student) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Student does not exist."
      }
    }

    if (updateStudentDto.firstName) student.firstName = updateStudentDto.firstName;
    if (updateStudentDto.lastName) student.lastName = updateStudentDto.lastName;
    if (updateStudentDto.class) student.class = updateStudentDto.class;
    if (updateStudentDto.dateOfBirth) student.dateOfBirth = updateStudentDto.dateOfBirth;
    if (updateStudentDto.studentID) student.studentID = updateStudentDto.studentID;
    if (updateStudentDto.imageUrl) student.imageUrl = updateStudentDto.imageUrl;
    if (updateStudentDto.status) student.status = updateStudentDto.status;

    let guardian: any = { ...student.guardian }

    if (updateStudentDto.guardianEmailAddress && updateStudentDto.guardianEmailAddress != guardian.emailAddress) {
      // Check if guardian already exists
      guardian = await this.UserModel.findOne({
        emailAddress: updateStudentDto.guardianEmailAddress,
        status: 'active',
        isDeleted: false
      }).exec()

      if (!guardian) {
        // Create guardian if guardian does not exist

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
      statusCode: HttpStatus.OK,
      message: "Student updated successfully.",
      data: student
    }


  }

  async remove(userInfo: any, id: string) {
    // Check if student already exists
    let student = await this.StudentModel.findOne({
      _id: id,
      organization: userInfo.organization._id,
      isDeleted: false
    }).populate('guardian').exec()

    // Return error if student already exists
    if (!student) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Student does not exist."
      }
    }

    student.isDeleted = true;
    student.deletedAt = student.updatedAt = new Date();
    await student.save();

    return {
      statusCode: HttpStatus.OK,
      message: "Student deleted successfully.",
    }

  }

  async createGuardian(userInfo: any, guardian: any) {
    // Create guardian 
    let adminHashedPassword = await bcrypt.hash("0000", 10);

    let newGuardian = new this.UserModel({
      organization: userInfo.organization._id,
      firstName: guardian.firstName,
      lastName: guardian.lastName,
      emailAddress: guardian.emailAddress,
      phoneNumber: "",
      role: "Guardian",
      password: adminHashedPassword
    })

    return await newGuardian.save();
  }
}
