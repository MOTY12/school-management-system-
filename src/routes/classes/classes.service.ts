import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClassDto, GetAllClassesDto, GetClassDto, UpdateClassDto } from './dto/class.dto';
import { Class } from './interfaces/class.interface';

@Injectable()
export class ClassesService {
  constructor(
    @InjectModel('Class') private readonly ClassModel: Model<Class>
  ) { }

  // Create a new class
 async create(userInfo: any, createClassDto: CreateClassDto) {
    //check if class already exists
    let createClass = new this.ClassModel({
      organization: userInfo.organization._id,
      name: createClassDto.name,
      level: createClassDto.level,
      type: createClassDto.type,
      classHead: createClassDto.classHead,
      imageUrl: createClassDto.imageUrl,
      
    })
    const classCreated = await createClass.save()
    return {
      statusCode: HttpStatus.OK,
      message: "Class created successfully.",
      data: classCreated

    }
  }

  // Get all classes
  async findAll(userInfo: any, queryString: GetAllClassesDto) {
    let pageOptions = {
      page: queryString.page || 0,
      limit: (queryString.limit ? (queryString.limit > 100 ? 100 : queryString.limit) : 25),
      type: (queryString.type && ['class', 'alumni'].includes(queryString.type) ? queryString.type : "class"),
    }
    let modelParameter: any = {
      organization: userInfo.organization._id,
      type: pageOptions.type,
      isDeleted: false
    };
    const classesCount = await this.ClassModel.countDocuments(modelParameter)
      .exec();
      const classes = await this.ClassModel.find(modelParameter)
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit * 1)
      .exec();
      
      return {
        statusCode: HttpStatus.OK,
        message: "Classes fetched successfully.",
        data: classes,
        pagination: {
          total: classesCount,
          pages: Math.ceil(classesCount / pageOptions.limit),
          page: pageOptions.page,
          limit: pageOptions.limit
        }

      }

  }

  // Get one class by Id
  async findOne(userInfo: any, classId: string) {
    let modelParameter: any = {
      organization: userInfo.organization._id,
      _id: classId,
      isDeleted: false
    };
    const result = await this.ClassModel.findOne({modelParameter})
    if(!result){
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Class does not exist.",
    }  
    }else{
    return {
        statusCode: HttpStatus.OK,
        message: "Class fetched successfully.",
        data: result
    }}
  }

  // update one class
  async update(userInfo: any, classId: string, updateClassDto: UpdateClassDto) {

    const updateClass = await this.ClassModel.findOne({
      _id: classId,
      organization: userInfo.organization._id,
      isDeleted: false
    })
    if(!updateClass){
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Class does not exist.",
    }}
    if(updateClassDto.name)updateClass.name = updateClassDto.name;
    if(updateClassDto.level)updateClass.level = updateClassDto.level;
    if(updateClassDto.type)updateClass.type = updateClassDto.type;
    if(updateClassDto.classHead)updateClass.classHead = updateClassDto.classHead;
    if(updateClassDto.imageUrl)updateClass.imageUrl = updateClassDto.imageUrl
   
    updateClass.updatedAt = new Date();
    await updateClass.save();
    return {
      statusCode: HttpStatus.OK,
      message: "Class updated successfully.",
      data: updateClass
    }
  }

  // delete class
  async remove(userInfo: any, classId: string) {
    const removeClass = await this.ClassModel.findOne({
      _id: classId,
      organization: userInfo.organization._id,
      isDeleted: false
    }).exec();

    if(!removeClass){
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Class does not exist.",
    }}
    
    removeClass.isDeleted = true;
    removeClass.deletedAt = new Date();
    removeClass.updatedAt = new Date();
    await removeClass.save();
    return {
          statusCode: HttpStatus.OK,
          message: "Class deleted successfully.",
        }
  }
}
