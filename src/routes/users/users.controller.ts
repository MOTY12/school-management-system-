import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { Roles } from 'src/decorators/roles.decorator';
import { ChangePasswordDto, CreateUserDto, GetAllUsersDto, GetUserDto, LoginDto, ResetPasswordDto, UpdateUserDto, VerifyEmailDto } from './dto/user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @Roles('Admin')
  async create(@Request() request, @Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(request.decoded, createUserDto);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    return await this.usersService.login(loginDto);
  }

  @Get('me')
  async me(@Request() request) {
    return await this.usersService.me(request.decoded)
  }

  @Get()
  @Roles('Admin')
  async findAll(@Request() request, @Query() queryString: GetAllUsersDto) {
    return await this.usersService.findAll(request.decoded, queryString);
  }

  @Get(':userId')
  @Roles('Admin')
  async findOne(@Request() request, @Param() params: GetUserDto) {
    return await this.usersService.findOne(request.decoded, params.userId);
  }

  @Put(':userId')
  async updateUser(@Request() request, @Param() params: GetUserDto, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.updateUser(request.decoded, params.userId, updateUserDto);
  }

  @Put('change-password')
  async changePassword(@Request() request, @Body() changePasswordDto: ChangePasswordDto) {
    return await this.usersService.changePassword(request.decoded, changePasswordDto);
  }

  // @Get('resend-verification-email')
  // async resendVerificationEmail(@Request() request) {
  // 	return await this.usersService.resendVerificationEmail(request.decoded);
  // }

  // @Post('verify-email')
  // async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto): Promise<any> {
  // 	return await this.usersService.emailVerification(verifyEmailDto);
  // }

  // @Post('resetpassword')
  // async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<any> {
  // 	return await this.usersService.resetPassword(resetPasswordDto);
  // }

  // @Delete(':id')
  // @Roles('Admin')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }

}
