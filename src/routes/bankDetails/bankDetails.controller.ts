import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Roles } from "src/decorators/roles.decorator";
import { BankDetailsService } from "./bankDetails.service"
import { CreateBankDetailDto, GetAllBankDetailsDto, GetBankDetailDto, UpdateBankDetailDto } from "./dto/bankDetails.dto";

@ApiTags('bankDetails')
@Controller('bankDetails')
export class BankDetailsController{
    constructor(private readonly bankDetailsService: BankDetailsService){}

    @Post()
    @Roles('Admin')
    async create(@Request() request, @Body() createBankDetailsDto: CreateBankDetailDto){
        return await this.bankDetailsService.create(request.decoded, createBankDetailsDto);
    }

    @Get()
    @Roles('Admin')
    async findAll(@Request() request, @Query() queryString: GetAllBankDetailsDto){
        return await this.bankDetailsService.findAll(request.decoded, queryString) 
    }

    @Get(':bankDetailId')
    @Roles('Admin')
    findOne(@Request() request, @Param() params: GetBankDetailDto){
        return this.bankDetailsService.findOne(request.decoded, params.bankDetailId)
    }

    @Put(':bankDetailId')
    @Roles('Admin')
    update(@Request() request, @Param() params: GetBankDetailDto,  @Body() updateBankDetailDto: UpdateBankDetailDto){
        return this.bankDetailsService.update(request.decoded, params.bankDetailId, updateBankDetailDto)
    }

    @Delete(':bankDetailId')
    @Roles('Admin')
    remove(@Request() request, @Param() params: GetBankDetailDto){
        return this.bankDetailsService.remove(request.decoded, params.bankDetailId);
  
    }
}