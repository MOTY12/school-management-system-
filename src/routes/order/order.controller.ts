import { Body, Controller, Delete, Get, Param, Post, Query, Request } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Roles } from "src/decorators/roles.decorator";
import { CreateOrderDto, GetAllOrderItemsDto, GetAllOrdersDto, GetOrderDto } from "./dto/order.dto";
import { OrderService } from "./order.service";

@ApiTags('orders')
@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    // Create an order
    @Post()
    @Roles('Tuckshop')
    createOrder(@Request() request, @Body() createOrderDto: CreateOrderDto) {
        return this.orderService.createOrder(request.decoded, createOrderDto);
    }

    // Get all orders
    @Get('')
    @Roles('Admin', 'Tuckshop')
    getAllOrders(@Request() request, @Query() queryString: GetAllOrdersDto) {
        return this.orderService.getAllOrders(request.decoded, queryString);
    }

    // Get one order
    @Get(':orderId')
    @Roles('Admin', 'Tuckshop')
    getOneOrder(@Request() request, @Param() params: GetOrderDto) {
        return this.orderService.getOneOrder(request.decoded, params.orderId);
    }

    // Get all items in an order
    @Get(':orderId')
    @Roles('Admin', 'Tuckshop')
    getOrderItems(@Request() request, @Param() params: GetAllOrderItemsDto) {
        return this.orderService.getOneOrder(request.decoded, params.orderId);
    }
}
