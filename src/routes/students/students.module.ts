import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../users/schemas/users.schema';
import { StudentsSchema } from './schemas/students.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Students', schema: StudentsSchema }
    ]),
  ],
  controllers: [StudentsController],
  providers: [StudentsService]
})
export class StudentsModule { }
