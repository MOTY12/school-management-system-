import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query, Put } from '@nestjs/common';
import { TuitionsService } from './tuitions.service';
import { AssignTuitionToStudentDto, CreateTuitionDto, CreateTuitionTransactionDto, GetAllTuitionsDto, GetAssignedTuitionsDto, GetTuitionDto, UpdateTuitionDto } from './dto/tuition.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tuitions')
@Controller('tuitions')
export class TuitionsController {
  constructor(private readonly tuitionsService: TuitionsService) {}

  @Post()
  @Roles('Admin')
  async create(@Request() request, @Body() createTuitionDto: CreateTuitionDto) {
    return await this.tuitionsService.create(request.decoded, createTuitionDto);
  }

  @Get()
  @Roles('Admin')
  async findAllTuitions(@Request() request, @Query() queryString: GetAllTuitionsDto) {
    return await this.tuitionsService.findAllTuitions(request.decoded, queryString);
  }

  @Post('assigned')
  @Roles('Admin')
  async assignTuitionToStudent(@Request() request, @Body() assignTuitionToStudentDto: AssignTuitionToStudentDto) {
    return await this.tuitionsService.assignTuitionToStudent(request.decoded, assignTuitionToStudentDto);
  }

  @Get('assigned')
  @Roles('Admin', 'Guardian')
  async findAssignedTuitions(@Request() request, @Query() queryString: GetAssignedTuitionsDto) {
    return await this.tuitionsService.findAssignedTuitions(request.decoded, queryString);
  }

  @Get('assigned/:tuitionId')
  @Roles('Admin', 'Guardian')
  async findOneAssignedTuition(@Request() request, @Param() params: GetTuitionDto) {
    return await this.tuitionsService.findOneAssignedTuition(request.decoded, params.tuitionId);
  }

  @Delete('assigned/:tuitionId')
  @Roles('Admin')
  async unassignTuitionFromStudent(@Request() request, @Param() params: GetTuitionDto) {
    return await this.tuitionsService.unassignTuitionFromStudent(request.decoded, params.tuitionId);
  }

  @Post('transactions')
  @Roles('Admin', 'Guardian')
  async createTuitionTransaction(@Request() request, @Body() createTuitionTransactionDto: CreateTuitionTransactionDto) {
    return await this.tuitionsService.createTuitionTransaction(request.decoded, createTuitionTransactionDto)
  }

  @Get('transactions')
  @Roles('Admin', 'Guardian')
  async findTuitionTransactions(@Request() request, @Query() queryString: GetAssignedTuitionsDto) {
    return await this.tuitionsService.findTuitionTransactions(request.decoded, queryString);
  }

  @Get('transactions/:tuitionId')
  @Roles('Admin', 'Guardian')
  async findOneTuitionTransaction(@Request() request, @Param() params: GetTuitionDto) {
    return await this.tuitionsService.findOneTuitionTransaction(request.decoded, params.tuitionId);
  }

  @Get(':tuitionId')
  @Roles('Admin', 'Guardian')
  async findOneTuition(@Request() request, @Param() params: GetTuitionDto) {
    return await this.tuitionsService.findOneTuition(request.decoded, params.tuitionId);
  }

  @Put(':tuitionId')
  @Roles('Admin')
  async update(@Request() request, @Body() updateTuitionDto: UpdateTuitionDto, @Param() params: GetTuitionDto) {
    return await this.tuitionsService.updateTuition(request.decoded, updateTuitionDto, params.tuitionId);
  }

  

}
