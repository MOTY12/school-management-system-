import * as mongoose from 'mongoose';

const GuestSchema = new mongoose.Schema({
    name: String,
    customerType: String
});

export const OrderSchema = new mongoose.Schema({
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    tuckshop: String,
    assignedCard: String,
    orderMode: String,
    guest: GuestSchema,
    totalAmount: {type: Number, default: 0},
    status: { type: String, default: 'Successful' },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    deletedAt: Date
});

export const OrderItemSchema = new mongoose.Schema({
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
    order: {type: mongoose.Schema.Types.ObjectId,ref: 'Order'},
    product: {type: mongoose.Schema.Types.ObjectId,ref: 'Product'},
    unitPrice: {type: Number, default: 0},
    quantity: Number,
    totalAmount: {type: Number, default: 0},
    status: { type: String, default: 'active' },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    deletedAt: Date
})