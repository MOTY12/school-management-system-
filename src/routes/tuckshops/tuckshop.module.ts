import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TuckshopSchema } from './schemas/tuckshop.schemas';
import { TuckshopsController } from './tuckshop.controller';
import { TuckshopServices } from './tuckshop.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Tuckshops', schema: TuckshopSchema }]),
  ],
  controllers: [TuckshopsController],
  providers: [TuckshopServices]
})
export class TuckshopModule { }
