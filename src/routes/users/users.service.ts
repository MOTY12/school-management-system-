import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { ChangePasswordDto, CreateUserDto, GetAllUsersDto, LoginDto, UpdateUserDto } from './dto/user.dto';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly UserModel: Model<User>,
    private configService: ConfigService
  ) {

  }
  async create(userInfo: any, createUserDto: CreateUserDto) {
    // Check if User already exists
    let checkUser = await this.UserModel.findOne({
      emailAddress: createUserDto.emailAddress,
      status: 'active',
      isDeleted: false
    }).exec()

    // Return error if User already exists
    if (checkUser) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "User already exists."
      }
    }

    let hashedPassword = await bcrypt.hash("" + createUserDto.password, 10);

    let user = new this.UserModel({
      organization: userInfo.organization._id,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      emailAddress: createUserDto.emailAddress,
      phoneNumber: createUserDto.phoneNumber ?? "",
      role: createUserDto.role,
      password: hashedPassword
    })

    await user.save();

    this.sendVerificationEmail(user);

    return {
      statusCode: HttpStatus.OK,
      message: "User Registration Successful."
    }
  }

  async login(loginDto: LoginDto) {
    // Check if User exists
    let checkUser = await this.UserModel.findOne({
      emailAddress: loginDto.emailAddress,
      status: 'active',
      isDeleted: false
    }).select('password').exec()

    // Return error if User already exists
    if (!checkUser) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Your Email/Password is incorrect. Please try again."
      }
    }

    // Compare password
    let match = await bcrypt.compare("" + loginDto.password, "" + checkUser.password);

    // Return error if passwords don't match
    if (!match) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Your Email/Password is incorrect. Please try again."
      }
    }

    let user = await this.UserModel.findOne({
      emailAddress: loginDto.emailAddress,
      status: 'active',
      isDeleted: false
    }).populate('organization').exec()

    let jwtObject: any = JSON.parse(JSON.stringify(user));

    delete jwtObject.passwordUpdatedAt;

    let apiToken = await jwt.sign(jwtObject, this.configService.get('APPLICATION_KEY'), {
      expiresIn: "1d"
    });

    jwtObject.apiToken = apiToken;

    return {
      statusCode: HttpStatus.OK,
      message: "User login successful.",
      data: jwtObject
    }

  }

  async me(userInfo: any) {
    let user = await this.UserModel.findOne({
      emailAddress: userInfo.emailAddress,
      status: "active",
      isDeleted: false
    }).exec();

    let jwtObject: any = JSON.parse(JSON.stringify(user));

    let apiToken = await jwt.sign(jwtObject, this.configService.get('APPLICATION_KEY'), {
      expiresIn: "1d"
    });

    jwtObject.apiToken = apiToken;

    return {
      statusCode: HttpStatus.OK,
      message: "User authentication successful.",
      data: jwtObject
    }
  }

  async findAll(userInfo: any, queryString: GetAllUsersDto) {
    let pageOptions = {
      page: queryString.page || 0,
      limit: (queryString.limit ? (queryString.limit > 100 ? 100 : queryString.limit) : 25),
      role: (queryString.role && ['Admin', 'Tuckshop', 'Guardian'].includes(queryString.role) ? queryString.role : ""),
    }

    let modelParameter: any = {
      organization: userInfo.organization._id,
      role: pageOptions.role,
      isDeleted: false
    };

    if(pageOptions.role == '') delete modelParameter.role;

    const usersCount = await this.UserModel.countDocuments(modelParameter)
      .exec();

    const users = await this.UserModel.find(modelParameter)
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit * 1)
      .exec();

    return {
      statusCode: HttpStatus.OK,
      message: "Users fetched successfully.",
      data: users,
      pagination: {
        total: usersCount,
        pages: Math.ceil(usersCount / pageOptions.limit),
        page: pageOptions.page,
        limit: pageOptions.limit
      }
    }
  }

  async findOne(userInfo: any, id: string) {

    const user = await this.UserModel.findOne({
      _id: id,
      organization: userInfo.organization._id,
      isDeleted: false
    }).exec();

    if (!user) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "User does not exist.",
      }
    }

    return {
      statusCode: HttpStatus.OK,
      message: "User fetched successfully.",
      data: user
    }
  }

  async updateUser(userInfo: any, id: string, updateUserDto: UpdateUserDto) {
    if(userInfo.role != "Admin" && userInfo._id != id) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "User does not exist.",
      }
    }

    const user = await this.UserModel.findOne({
      _id: id,
      organization: userInfo.organization._id,
      isDeleted: false
    }).exec();

    if (!user) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "User does not exist.",
      }
    }

    if(updateUserDto.firstName) user.firstName = updateUserDto.firstName;
    if(updateUserDto.lastName) user.lastName = updateUserDto.lastName;
    if(updateUserDto.emailAddress) user.emailAddress = updateUserDto.emailAddress;
    if(updateUserDto.phoneNumber) user.phoneNumber = updateUserDto.phoneNumber;
    if(updateUserDto.imageUrl) user.imageUrl = updateUserDto.imageUrl;
    if(updateUserDto.address) user.address = JSON.parse(JSON.stringify(updateUserDto.address));

    user.updatedAt = new Date();
    await user.save();

    return {
      statusCode: HttpStatus.OK,
      message: "User updated successfully.",
      data: user
    }
  }

  async sendVerificationEmail(user: User) {
    // Client Activation Email
    let jwtToken = await jwt.sign(
      {
        action: "EMAIL_VERIFICATION",
        emailAddress: user.emailAddress
      },
      this.configService.get('APPLICATION_KEY'),
      {
        expiresIn: "7d"
      }
    );

    // ------------------------------------------------------------- //
    // -------------- Send Email Verification Mail ----------------- //
    // ------------------------------------------------------------- //

  }

  async changePassword(userInfo: any, changePasswordDto: ChangePasswordDto) {
    // Check if user exists
    const user = await this.UserModel.findOne({
     emailAddress: userInfo.emailAddress,
      organization: userInfo.organization._id,
      isDeleted: false
    }).exec();

    if (!user) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "User does not exist.",
      }
    }

    // Check if old password is correct
    let match = await bcrypt.compare("" + user.password, "" + changePasswordDto.oldPassword);

    // Return error if passwords don't match
    if (!match) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Old password is incorrect."
      }
    }

    let hashedPassword = await bcrypt.hash("" + changePasswordDto.newPassword, 10);

    user.password = hashedPassword;
    user.updatedAt = new Date();
    await user.save();

    return {
      statusCode: HttpStatus.OK,
      message: "User password updated successfully.",
      data: user
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

}
