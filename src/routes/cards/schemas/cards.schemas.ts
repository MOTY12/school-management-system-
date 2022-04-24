import * as mongoose from 'mongoose';


const GuestSchema = new mongoose.Schema({
    name: String,
    emailAddress: String,
    phoneNumber: String,
    amount: Number,
    availableBalance: Number
});

export const AssignedCardsSchema = new mongoose.Schema({
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    cardType: String,
    cardNumber: String,
    guest: GuestSchema,
    status: { type: String, default: 'active' },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    deletedAt: Date
})

export const CardTransactionsSchema = new mongoose.Schema({
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
    assignedCard: { type: mongoose.Schema.Types.ObjectId, ref: 'AssignedCards' },
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Orders' },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    guest: GuestSchema,
    cardType: String,
    transactionType: String,
    amount: Number,
    runningBalance: Number,
    narration: String,
    paymentReference: String,
    transactionMode: String,
    imageUrl: { type: String, default: '' },
    transactionDate: { type: Date, default: new Date() },
    status: { type: String, default: 'successful' },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    deletedAt: Date
})