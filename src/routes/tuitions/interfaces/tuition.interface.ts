

import { ObjectId } from "mongoose";


export interface Tuition extends Document {
    organization: ObjectId,
    class: ObjectId,
    bankDetails: ObjectId,
    session: ObjectId,
    term: String,
    className: String,
    tuitionName: String,
    amount: Number,
    currency: String,
    description: String,
    status: String,
    isDeleted: Boolean,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
}

export interface AssignedTuitions extends Document {
    organization: ObjectId,
    tuition: ObjectId,
    student: ObjectId,
    outstandingBalance: Number,
    status: String,
    isDeleted: Boolean,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
}

export interface TuitionTransactions extends Document {
    organization: ObjectId,
    session: ObjectId,
    term: String,
    tuition: ObjectId,
    assignedTuition:  ObjectId,
    student: ObjectId,
    amount: Number,
    outstandingBalance: Number,
    narration: String,
    paymentReference: String,
    paymentMode: String,
    imageUrl: String,
    transactionDate: Date,
    status: String,
    isDeleted: Boolean,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
}

