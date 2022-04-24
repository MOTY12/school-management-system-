import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BankDetailsController } from './bankDetails.controller';
import { BankDetailsService } from './bankDetails.service';
import { BankDetailsSchema } from './schemas/bankDetails.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'BankDetails', schema: BankDetailsSchema }]),
  ],
  controllers: [BankDetailsController],
  providers: [BankDetailsService],
  exports:[BankDetailsService]
})
export class BankDetailsModule {}
