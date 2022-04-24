import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { OrganizationsController } from './organizations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizationSchema } from './schemas/organization.schema';
import { UsersModule } from '../users/users.module';
import { UserSchema } from '../users/schemas/users.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'Organization', schema: OrganizationSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    UsersModule
  ],
  controllers: [OrganizationsController],
  providers: [OrganizationsService]
})
export class OrganizationsModule {}
