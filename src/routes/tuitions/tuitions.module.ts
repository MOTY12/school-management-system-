import { Module } from '@nestjs/common';
import { TuitionsService } from './tuitions.service';
import { TuitionsController } from './tuitions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AssignedTuitionsSchema, TuitionSchema, TuitionTransactionsSchema } from './schemas/tuition.schema';
import { ClassSchema } from '../classes/schemas/class.schema';
import { SessionSchema } from '../sessions/schemas/session.schema';
import { StudentsSchema } from '../students/schemas/students.schema';
import { BankDetailsSchema } from '../bankDetails/schemas/bankDetails.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'BankDetails', schema: BankDetailsSchema },
      { name: 'Students', schema: StudentsSchema },
      { name: 'Class', schema: ClassSchema },
      { name: 'Session', schema: SessionSchema },
      { name: 'Tuition', schema: TuitionSchema },
      { name: 'AssignedTuitions', schema: AssignedTuitionsSchema },
      { name: 'TuitionTransactions', schema: TuitionTransactionsSchema },
    ]),
  ],
  controllers: [TuitionsController],
  providers: [TuitionsService]
})
export class TuitionsModule { }
