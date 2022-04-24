import { Controller, Get, Post, Body, Param, Delete, Put, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { CreateOrganizationDto, GetOrganizationDto, UpdateOrganizationDto } from './dto/organizations-dto';
import { OrganizationsService } from './organizations.service';

@ApiTags('organizations')
@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  async create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return await this.organizationsService.create(createOrganizationDto);
  }

  @Get('me')
  async findOne(@Request() request) {
    return await this.organizationsService.findOne(request.decoded);
  }

  @Put('update')
  @Roles('Admin')
  async update(@Request() request, @Body() updateOrganizationDto: UpdateOrganizationDto) {
    return await this.organizationsService.update(request.decoded, updateOrganizationDto);
  }

  // @Delete(':organizationId')
  // @Roles('Super-Admin')
  // async remove(@Param() param: GetOrganizationDto) {
  //   return await this.organizationsService.remove(param.organizationId);
  // }
}
