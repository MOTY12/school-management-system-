"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankDetailsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const bankDetails_controller_1 = require("./bankDetails.controller");
const bankDetails_service_1 = require("./bankDetails.service");
const bankDetails_schemas_1 = require("./schemas/bankDetails.schemas");
let BankDetailsModule = class BankDetailsModule {
};
BankDetailsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'BankDetails', schema: bankDetails_schemas_1.BankDetailsSchema }]),
        ],
        controllers: [bankDetails_controller_1.BankDetailsController],
        providers: [bankDetails_service_1.BankDetailsService],
        exports: [bankDetails_service_1.BankDetailsService]
    })
], BankDetailsModule);
exports.BankDetailsModule = BankDetailsModule;
//# sourceMappingURL=bankDetails.module.js.map