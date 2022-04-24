import { Document, ObjectId } from 'mongoose';

interface Guest extends Document {
    name: String;
    customerType: String;

}

export interface Order extends Document {
    organization: ObjectId,
    tuckshop: String,
    assignedCard: String,
    orderMode: String,
    guest: Guest,
    totalAmount: Number,
    status: Boolean,
    isDeleted: Boolean,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
}

export interface OrderItem extends Document{
    organization: ObjectId,
    order: ObjectId,
    product: ObjectId,
    unitPrice: Number,
    quantity: Number,
    totalAmount: Number,
    status: String,
    isDeleted: Boolean,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
}