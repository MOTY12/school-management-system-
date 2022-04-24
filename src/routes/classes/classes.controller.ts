import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Request, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { ClassesService } from './classes.service';
import { CreateClassDto, GetAllClassesDto, GetClassDto, UpdateClassDto } from './dto/class.dto';

@ApiTags('classes')
@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post()
  @Roles('Admin')
  create(@Request() request, @Body() createClassDto: CreateClassDto) {
    return this.classesService.create(request.decoded, createClassDto);
  }

  @Get()
  @Roles('Admin')
  findAll(@Request() request, @Query() queryString: GetAllClassesDto) {
    return this.classesService.findAll(request.decoded, queryString);
  }

  @Get(':classId')
  @Roles('Admin')
  findOne(@Request() request, @Param() params: GetClassDto) {
    return this.classesService.findOne(request.decoded, params.classId);
  }

  @Put(':classId')
  @Roles('Admin')
  update(@Request() request, @Param() params: GetClassDto, @Body() updateClassDto: UpdateClassDto) {
    return this.classesService.update(request.decoded, params.classId, updateClassDto);
  }

  @Delete(':classId')
  @Roles('Admin')
  remove(@Request() request, @Param() params: GetClassDto) {
    return this.classesService.remove(request.decoded, params.classId);
  }
}
