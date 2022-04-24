import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Roles } from "src/decorators/roles.decorator";
import { CreateSessionDto, GetAllSessionDto, GetSessionDto, UpdateSessionDto } from "./dto/session.dto";
import { SessionsService } from "./session.service";

@ApiTags('sessions')
@Controller('sessions')
export class SessionsController{
    constructor( private readonly sessionsService: SessionsService){}

    @Post()
    @Roles('Admin')
    async create(@Request() request, @Body() createSessionDto: CreateSessionDto){
      return await this.sessionsService.create(request.decoded, createSessionDto)
    }

    @Get()
    @Roles('Admin')
    async findAll(@Request() request, @Query() queryString: GetAllSessionDto){
        return await this.sessionsService.findAll(request.decoded, queryString)
    }

    @Get(':sessionId')
    @Roles('Admin')
    async findOne(@Request() request, @Param() params:GetSessionDto){
        return await this.sessionsService.findOne(request.decoded, params.sessionId)
    } 

    @Put(':sessionId')
    @Roles('Admin')
    async update(@Request() request, @Param() params: GetSessionDto, @Body() updateSessionDto: UpdateSessionDto){
        return await this.sessionsService.update(request.decoded, params.sessionId, updateSessionDto)
    }

    @Delete(':sessionId')
    @Roles('Admin')
    async remove(@Request() request, @Param() params: GetSessionDto){
        return await this.sessionsService.remove(request.decoded, params.sessionId)
    }
}