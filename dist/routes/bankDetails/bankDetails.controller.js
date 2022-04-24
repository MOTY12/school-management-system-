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
exports.BankDetailsController = void 0;
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("../../decorators/roles.decorator");
const bankDetails_service_1 = require("./bankDetails.service");
const bankDetails_dto_1 = require("./dto/bankDetails.dto");
let BankDetailsController = class BankDetailsController {
    constructor(bankDetailsService) {
        this.bankDetailsService = bankDetailsService;
    }
    async create(request, createBankDetailsDto) {
        return await this.bankDetailsService.create(request.decoded, createBankDetailsDto);
    }
    async findAll(request, queryString) {
        return await this.bankDetailsService.findAll(request.decoded, queryString);
    }
    findOne(request, params) {
        return this.bankDetailsService.findOne(request.decoded, params.bankDetailId);
    }
    update(request, params, updateBankDetailDto) {
        return this.bankDetailsService.update(request.decoded, params.bankDetailId, updateBankDetailDto);
    }
    remove(request, params) {
        return this.bankDetailsService.remove(request.decoded, params.bankDetailId);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('Admin'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, bankDetails_dto_1.CreateBankDetailDto]),
    __metadata("design:returntype", Promise)
], BankDetailsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('Admin'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, bankDetails_dto_1.GetAllBankDetailsDto]),
    __metadata("design:returntype", Promise)
], BankDetailsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':bankDetailId'),
    (0, roles_decorator_1.Roles)('Admin'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, bankDetails_dto_1.GetBankDetailDto]),
    __metadata("design:returntype", void 0)
], BankDetailsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':bankDetailId'),
    (0, roles_decorator_1.Roles)('Admin'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, bankDetails_dto_1.GetBankDetailDto, bankDetails_dto_1.UpdateBankDetailDto]),
    __metadata("design:returntype", void 0)
], BankDetailsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':bankDetailId'),
    (0, roles_decorator_1.Roles)('Admin'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, bankDetails_dto_1.GetBankDetailDto]),
    __metadata("design:returntype", void 0)
], BankDetailsController.prototype, "remove", null);
BankDetailsController = __decorate([
    (0, common_1.Controller)('bankdetails'),
    __metadata("design:paramtypes", [bankDetails_service_1.BankDetailsService])
], BankDetailsController);
exports.BankDetailsController = BankDetailsController;
//# sourceMappingURL=bankDetails.controller.js.map