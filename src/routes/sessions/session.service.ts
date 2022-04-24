import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateSessionDto, GetAllSessionDto, UpdateSessionDto } from "./dto/session.dto";
import { Session } from './interfaces/session.interfaces'

@Injectable()
export class SessionsService{
    constructor(@InjectModel('Session') private readonly SessionModel: Model<Session>){}
    async create(userInfo: any, createSessionDto: CreateSessionDto){
        let session = new this.SessionModel({
            organization: userInfo.organization._id,
            name: createSessionDto.name,
            term: createSessionDto.term,
            status: createSessionDto.status
        })
        const sessionSave = await session.save();
        return {
            statusCode: HttpStatus.OK,
            message: "Session created successfully.",
            data: sessionSave
          }
    }


    async findAll(userInfo: any, queryString: GetAllSessionDto){
        let pageOptions = {
            page: queryString.page || 0,
            limit: (queryString.limit ? (queryString.limit > 100 ? 100 : queryString.limit) : 25),
            status: (queryString.status && ['active', 'inactive'].includes(queryString.status) ? queryString.status : "active"),
    
        }
          let modelParameter: any = {
            organization: userInfo.organization._id,
            isDeleted: false
          };
          const sessionCount = await this.SessionModel.countDocuments(modelParameter).exec();

          const Sessiones = await this.SessionModel.find(modelParameter)
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit * 1).exec();
      
            return {
                statusCode: HttpStatus.OK,
                message: "Sessions fetched successfully.",
                data: Sessiones,
                pagination: {
                total: sessionCount,
                pages: Math.ceil(sessionCount / pageOptions.limit),
                page: pageOptions.page,
                limit: pageOptions.limit
                }

            }

    }

    async findOne(userInfo: any, sessionId: string){
        let modelParameter: any = {
            organization: userInfo.organization._id,
            _id: sessionId,
            isDeleted: false
          };
          const result = await this.SessionModel.findOne({modelParameter}).exec()
            if(!result){
                return {
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: "Session does not exist.",
                }
            }else{
                return {
                    statusCode: HttpStatus.OK,
                    message: "Session fetched successfully.",
                    data: result
                }
            }
        }

async update(userInfo: any, sessionId: string, updateSessionDto: UpdateSessionDto ){
const updateSession = await this.SessionModel.findOne({
    _id: sessionId,
    organization: userInfo.organization._id,
    isDeleted: false
  }).exec()
  if(!updateSession){
    return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Session does not exist.",
    }
}
    if(updateSessionDto.name)updateSession.name = updateSessionDto.name;
    if(updateSessionDto.term)updateSession.term = updateSessionDto.term;
    if(updateSessionDto.status)updateSession.status = updateSessionDto.status;

    updateSession.updatedAt = new Date(); 
    updateSession.save();

    return {
        statusCode: HttpStatus.OK,
        message: "Session updated successfully.",
        data: updateSession
      }
  
}


async remove(userInfo: any, sessionId: string,){
    const removeSession = await this.SessionModel.findOne({
        _id: sessionId,
        organization: userInfo.organization._id,
        isDeleted: false
      }).exec();
      if(!removeSession){
    return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Session does not exist.",
        }
    }
    removeSession.isDeleted = true;
    removeSession.deletedAt = new Date();
    removeSession.updatedAt = new Date();
    await removeSession.save();
    return {
        statusCode: HttpStatus.OK,
        message: "Session deleted successfully.",
      }
}



}