"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const mongoose_1 = require("@nestjs/mongoose");
const throttler_1 = require("@nestjs/throttler");
const app_config_1 = require("./app.config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const roles_guard_1 = require("./guards/roles.guard");
const auth_middleware_1 = require("./middlewares/auth.middleware");
const organizations_controller_1 = require("./routes/organizations/organizations.controller");
const organizations_module_1 = require("./routes/organizations/organizations.module");
const users_schema_1 = require("./routes/users/schemas/users.schema");
const users_controller_1 = require("./routes/users/users.controller");
const users_module_1 = require("./routes/users/users.module");
const classes_module_1 = require("./routes/classes/classes.module");
const classes_controller_1 = require("./routes/classes/classes.controller");
const bankDetails_controller_1 = require("./routes/bankDetails/bankDetails.controller");
const bankDetails_module_1 = require("./routes/bankDetails/bankDetails.module");
const tuckshop_module_1 = require("./routes/tuckshops/tuckshop.module");
const tuckshop_controller_1 = require("./routes/tuckshops/tuckshop.controller");
const product_module_1 = require("./routes/products/product.module");
const product_controller_1 = require("./routes/products/product.controller");
const session_module_1 = require("./routes/sessions/session.module");
const session_controller_1 = require("./routes/sessions/session.controller");
const students_module_1 = require("./routes/students/students.module");
const students_controller_1 = require("./routes/students/students.controller");
const order_module_1 = require("./routes/order/order.module");
const order_controller_1 = require("./routes/order/order.controller");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .exclude({ path: 'organizations', method: common_1.RequestMethod.POST }, { path: 'users/login', method: common_1.RequestMethod.POST }, { path: 'users/resetpassword', method: common_1.RequestMethod.POST }, { path: 'users/verify-email', method: common_1.RequestMethod.POST }, 'users/invite/(.*)')
            .forRoutes(organizations_controller_1.OrganizationsController, users_controller_1.UsersController, classes_controller_1.ClassesController, bankDetails_controller_1.BankDetailsController, session_controller_1.SessionsController, tuckshop_controller_1.TuckshopsController, product_controller_1.ProductsController, session_controller_1.SessionsController, students_controller_1.StudentsController, order_controller_1.OrderController);
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: app_config_1.AppConfigValidationSchema
            }),
            mongoose_1.MongooseModule.forRoot(app_config_1.AppConfig.DATABASE_URI),
            mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: users_schema_1.UserSchema }]),
            organizations_module_1.OrganizationsModule,
            users_module_1.UsersModule,
            throttler_1.ThrottlerModule.forRoot({
                ttl: 60,
                limit: 1000,
            }),
            classes_module_1.ClassesModule,
            bankDetails_module_1.BankDetailsModule,
            session_module_1.SessionsModule,
            bankDetails_module_1.BankDetailsModule,
            tuckshop_module_1.TuckshopModule,
            product_module_1.ProductsModule,
            session_module_1.SessionsModule,
            students_module_1.StudentsModule,
            order_module_1.OrderModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard
            },
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard
            }
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map