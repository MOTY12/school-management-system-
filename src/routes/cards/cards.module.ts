import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsSchema } from '../students/schemas/students.schema';
import { AssignedCardsSchema, CardTransactionsSchema } from './schemas/cards.schemas';

@Module({
  controllers: [CardsController],
  providers: [CardsService],
  imports: [
    MongooseModule.forFeature([
      { name: 'Students', schema: StudentsSchema },
      { name: 'AssignedCards', schema: AssignedCardsSchema },
      { name: 'CardTransactions', schema: CardTransactionsSchema },
    ]),
  ],
  exports: [
    CardsService,
    MongooseModule.forFeature([
      { name: 'AssignedCards', schema: AssignedCardsSchema },
      { name: 'CardTransactions', schema: CardTransactionsSchema },
    ]),
  ]
})
export class CardsModule {}
