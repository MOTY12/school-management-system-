import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionSchema } from './schemas/session.schema';
import { SessionsController } from './session.controller';
import { SessionsService } from './session.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Session', schema: SessionSchema }]),
  ],
  controllers: [SessionsController],
  providers: [SessionsService]
})
export class SessionsModule { }
