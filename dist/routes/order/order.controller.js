"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("../../decorators/roles.decorator");
const order_dto_1 = require("./dto/order.dto");
const order_service_1 = require("./order.service");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    createOrder(request, createOrderDto) {
        return this.orderService.createOrder(request.decoded, createOrderDto);
    }
    createOrderItem(request, createOrderDto) {
        return this.orderService.createOrderItem(request.decoded, createOrderDto);
    }
    getAllOrderItem(request, queryString) {
        return this.orderService.getAllOrderItem(request.decoded, queryString);
    }
    getOneOrderItem(request, params) {
        return this.orderService.getOrderItem(request.decoded, params.orderItemId);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('Admin', 'Tuckshop'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Post)('orderItem'),
    (0, roles_decorator_1.Roles)('Admin', 'Tuckshop'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "createOrderItem", null);
__decorate([
    (0, common_1.Get)('orderItem'),
    (0, roles_decorator_1.Roles)('Admin', 'Tuckshop'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, order_dto_1.GetAllOrderItemDto]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "getAllOrderItem", null);
__decorate([
    (0, common_1.Get)('orderItem/:orderItemId'),
    (0, roles_decorator_1.Roles)('Admin', 'Tuckshop'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, order_dto_1.GetOrderItemDto]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "getOneOrderItem", null);
OrderController = __decorate([
    (0, common_1.Controller)('Order'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map