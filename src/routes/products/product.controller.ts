import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Roles } from "src/decorators/roles.decorator";
import { CreateProductDto, GetAllProductDto, GetProductDto, UpdateProductDto } from "./dto/product.dto";
import { ProductsService } from "./product.service";

@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post()
    @Roles('Admin', 'Tuckshop')
    create(@Request() request, @Body() createProductDto: CreateProductDto) {
        return this.productsService.create(request.decoded, createProductDto)
    }
 
    @Get()
    @Roles('Admin', 'Tuckshop')
    findAll(@Request() request, @Query() queryString: GetAllProductDto) {
        return this.productsService.findAll(request.decoded, queryString);
    }

    @Get(':productId')
    @Roles('Admin', 'Tuckshop')
    findOne(@Request() request, @Param() params: GetProductDto) {
        return this.productsService.findOne(request.decoded, params.productId)
    }

    @Put(':productId')
    @Roles('Admin', 'Tuckshop')
    update(@Request() request, @Param() params: GetProductDto, @Body() updateProductDto: UpdateProductDto) {
        return this.productsService.update(request.decoded, params.productId, updateProductDto)
    }
    @Delete(':productId')
    @Roles('Admin', 'Tuckshop')
    remove(@Request() request, @Param() params: GetProductDto) {
        return this.productsService.remove(request.decoded, params.productId);
    }
}