import { Document } from 'mongoose';
interface Guest extends Document {
    name: String;
    customerType: String;
}
export interface Order extends Document {
    tuckshop: String;
    assignedCard: String;
    orderMode: String;
    guest: Guest;
}
export interface OrderItem extends Document {
    order: String;
    product: String;
    amount: Number;
    quantity: Number;
    status: String;
    isDeleted: Boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
export {};
