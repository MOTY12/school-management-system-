import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Roles } from "src/decorators/roles.decorator";
import { CreateTuckshopDto, GetAllTuckshopssDto, GetTuckshopDto, UpdateTuckshopDto } from "./dto/tuckshop.dto";
import { TuckshopServices } from "./tuckshop.service";

@ApiTags('tuckshops')
@Controller('tuckshops')
export class TuckshopsController{
    constructor(private readonly tuckshopServices: TuckshopServices){}

    @Post()
    @Roles('Admin')
    async create(@Request() request, @Body() createTuckshopDto: CreateTuckshopDto){
        return await this.tuckshopServices.create(request.decoded, createTuckshopDto)
    }
    @Get()
    @Roles('Admin')
    async findAll(@Request() request, @Query() queryString: GetAllTuckshopssDto){
        return await this.tuckshopServices.findAll(request.decoded, queryString)
    }

    @Get(':tuckshopId')
    @Roles('Admin', 'Tuckshop')
    async findOne(@Request() request, @Param() params: GetTuckshopDto){
        return await this.tuckshopServices.findOne(request.decoded, params.tuckshopId)
    } 

    @Put(':tuckshopId')
    @Roles('Admin', 'Tuckshop')
    async update(@Request() request, @Param() params: GetTuckshopDto, @Body() updateTuckshopDto: UpdateTuckshopDto){
        return await this.tuckshopServices.update(request.decoded, params.tuckshopId, updateTuckshopDto)
    }

    @Delete(':tuckshopId')
    @Roles('Admin')
    async remove(@Request() request, @Param() params: GetTuckshopDto){
        return await this.tuckshopServices.remove(request.decoded, params.tuckshopId)
    }
}