import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema, OrderItemSchema } from './schemas/order.schema';
import { ProductSchema } from '../products/schemas/product.schemas';
import { AssignedCardsSchema } from '../cards/schemas/cards.schemas';
import { CardsModule } from '../cards/cards.module';
import { CardsService } from '../cards/cards.service';
import { StudentsSchema } from '../students/schemas/students.schema';

@Module({
  imports: [
    CardsModule,
    MongooseModule.forFeature([
      { name: 'Order', schema: OrderSchema },
      { name: 'OrderItem', schema: OrderItemSchema },
      { name: 'Product', schema: ProductSchema },
      { name: 'Students', schema: StudentsSchema },
      { name: 'AssignedCards', schema: AssignedCardsSchema},
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService, CardsService]
})
export class OrderModule { }
