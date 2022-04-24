"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TuckshopModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const tuckshop_schemas_1 = require("./schemas/tuckshop.schemas");
const tuckshop_controller_1 = require("./tuckshop.controller");
const tuckshop_service_1 = require("./tuckshop.service");
let TuckshopModule = class TuckshopModule {
};
TuckshopModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Tuckshops', schema: tuckshop_schemas_1.TuckshopSchema }]),
        ],
        controllers: [tuckshop_controller_1.TuckshopsController],
        providers: [tuckshop_service_1.TuckshopServices]
    })
], TuckshopModule);
exports.TuckshopModule = TuckshopModule;
//# sourceMappingURL=tuckshop.module.js.map