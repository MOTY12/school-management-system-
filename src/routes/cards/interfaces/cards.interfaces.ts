import { ObjectId } from "mongoose";

interface Guest extends Document {
    name: String,
    emailAddress: String,
    phoneNumber: String,
    amount: Number,
    availableBalance: Number
}

export interface AssignedCards extends Document {
    organization: ObjectId,
    student: ObjectId,
    cardType: String,
    cardNumber: String,
    assignmentType: String,
    guest: Guest,
    status: String,
    isDeleted: Boolean,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
}

export interface CardTransactions extends Document {
    organization: ObjectId,
    assignedCard: ObjectId,
    order: ObjectId,
    student: ObjectId,
    guest: Guest,
    cardType: String,
    transactionType: String,
    amount: Number,
    runningBalance: Number,
    narration: String,
    paymentReference: String,
    transactionMode: String,
    imageUrl: String,
    transactionDate: Date,
    status: String,
    isDeleted: Date,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
}