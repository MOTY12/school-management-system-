"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const session_schema_1 = require("./schemas/session.schema");
const session_controller_1 = require("./session.controller");
const session_service_1 = require("./session.service");
let SessionsModule = class SessionsModule {
};
SessionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Session', schema: session_schema_1.SessionSchema }]),
        ],
        controllers: [session_controller_1.SessionsController],
        providers: [session_service_1.SessionsService]
    })
], SessionsModule);
exports.SessionsModule = SessionsModule;
//# sourceMappingURL=session.module.js.map