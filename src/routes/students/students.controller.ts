import { Controller, Get, Post, Body, Put, Param, Delete, Request, Query } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto, GetAllStudentsDto, GetStudentDto, UpdateStudentDto } from './dto/student.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @Roles('Admin')
  async create(@Request() request, @Body() createStudentDto: CreateStudentDto) {
    return await this.studentsService.create(request.decoded, createStudentDto);
  }

  @Get()
  @Roles('Admin', 'Guardian')
  findAll(@Request() request, @Query() queryString:GetAllStudentsDto) {
    return this.studentsService.findAll(request.decoded, queryString);
  }

  @Get(':studentId')
  @Roles('Admin', 'Guardian')
  findOne(@Request() request, @Param() params: GetStudentDto) {
    return this.studentsService.findOne(request.decoded, params.studentId);
  }

  @Put(':studentId')
  @Roles('Admin')
  update(@Request() request, @Body() updateStudentDto: UpdateStudentDto, @Param() params: GetStudentDto) {
    return this.studentsService.update(request.decoded, updateStudentDto, params.studentId);
  }

  @Delete(':studentId')
  @Roles('Admin')
  remove(@Request() request, @Param() params: GetStudentDto) {
    return this.studentsService.remove(request.decoded, params.studentId);
  }
}
