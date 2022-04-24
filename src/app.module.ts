import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppConfig, AppConfigValidationSchema } from './app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolesGuard } from './guards/roles.guard';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { OrganizationsController } from './routes/organizations/organizations.controller';
import { OrganizationsModule } from './routes/organizations/organizations.module';
import { UserSchema } from './routes/users/schemas/users.schema';
import { UsersController } from './routes/users/users.controller';
import { UsersModule } from './routes/users/users.module';
import { ClassesModule } from './routes/classes/classes.module';
import { ClassesController } from './routes/classes/classes.controller';
import { BankDetailsController } from './routes/bankDetails/bankDetails.controller';
import { BankDetailsModule } from './routes/bankDetails/bankDetails.module';
import { TuckshopModule } from './routes/tuckshops/tuckshop.module';
import { TuckshopsController } from './routes/tuckshops/tuckshop.controller';
import { ProductsModule } from './routes/products/product.module';
import { ProductsController } from './routes/products/product.controller';
import { SessionsModule } from './routes/sessions/session.module';
import { SessionsController } from './routes/sessions/session.controller';
import { StudentsModule } from './routes/students/students.module';
import { StudentsController } from './routes/students/students.controller';
import { OrderModule } from './routes/order/order.module';
import { OrderController } from './routes/order/order.controller';
import { TuitionsModule } from './routes/tuitions/tuitions.module';
import { TuitionsController } from './routes/tuitions/tuitions.controller';
import { CardsModule } from './routes/cards/cards.module';
import { CardsController } from './routes/cards/cards.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: AppConfigValidationSchema
    }),
    MongooseModule.forRoot(AppConfig.DATABASE_URI),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    OrganizationsModule,
    UsersModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 1000,
    }),
    ClassesModule,
    BankDetailsModule,
    SessionsModule,
    BankDetailsModule,
    TuckshopModule,
    ProductsModule,
    SessionsModule,
    StudentsModule,
    OrderModule,
    TuitionsModule,
    CardsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'organizations', method: RequestMethod.POST },
        { path: 'users/login', method: RequestMethod.POST },
        { path: 'users/resetpassword', method: RequestMethod.POST },
        { path: 'users/verify-email', method: RequestMethod.POST },
      )
      .forRoutes(
        OrganizationsController,
        UsersController,
        ClassesController,
        BankDetailsController,
        SessionsController,
        TuckshopsController,
        ProductsController,
        SessionsController,
        StudentsController,
        OrderController,
        TuitionsController,
        CardsController
      )
  }
}
