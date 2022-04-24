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
exports.TuckshopsController = void 0;
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("../../decorators/roles.decorator");
const tuckshop_dto_1 = require("./dto/tuckshop.dto");
const tuckshop_service_1 = require("./tuckshop.service");
let TuckshopsController = class TuckshopsController {
    constructor(tuckshopServices) {
        this.tuckshopServices = tuckshopServices;
    }
    async create(request, createTuckshopDto) {
        return await this.tuckshopServices.create(request.decoded, createTuckshopDto);
    }
    async findAll(request, queryString) {
        return await this.tuckshopServices.findAll(request.decoded, queryString);
    }
    async findOne(request, params) {
        return await this.tuckshopServices.findOne(request.decoded, params.tuckshopId);
    }
    async update(request, params, updateTuckshopDto) {
        return await this.tuckshopServices.update(request.decoded, params.tuckshopId, updateTuckshopDto);
    }
    async remove(request, params) {
        return await this.tuckshopServices.remove(request.decoded, params.tuckshopId);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('Admin'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, tuckshop_dto_1.CreateTuckshopDto]),
    __metadata("design:returntype", Promise)
], TuckshopsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('Admin'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, tuckshop_dto_1.GetAllTuckshopssDto]),
    __metadata("design:returntype", Promise)
], TuckshopsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':tuckshopId'),
    (0, roles_decorator_1.Roles)('Admin', 'Tuckshop'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, tuckshop_dto_1.GetTuckshopDto]),
    __metadata("design:returntype", Promise)
], TuckshopsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':tuckshopId'),
    (0, roles_decorator_1.Roles)('Admin', 'Tuckshop'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, tuckshop_dto_1.GetTuckshopDto, tuckshop_dto_1.UpdateTuckshopDto]),
    __metadata("design:returntype", Promise)
], TuckshopsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':tuckshopId'),
    (0, roles_decorator_1.Roles)('Admin'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, tuckshop_dto_1.GetTuckshopDto]),
    __metadata("design:returntype", Promise)
], TuckshopsController.prototype, "remove", null);
TuckshopsController = __decorate([
    (0, common_1.Controller)('tuckshop'),
    __metadata("design:paramtypes", [tuckshop_service_1.TuckshopServices])
], TuckshopsController);
exports.TuckshopsController = TuckshopsController;
//# sourceMappingURL=tuckshop.controller.js.map