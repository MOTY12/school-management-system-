import * as mongoose from 'mongoose';

export const TuitionSchema = new mongoose.Schema({
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    bankDetails: { type: mongoose.Schema.Types.ObjectId, ref: 'BankDetails' },
    session: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
    term: String,
    className: String,
    tuitionName: String,
    amount: Number,
    currency: String,
    description: String,
    status: { type: String, default: 'active' },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    deletedAt: Date
})

export const AssignedTuitionsSchema = new mongoose.Schema({
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
    tuition: { type: mongoose.Schema.Types.ObjectId, ref: 'Tuition' },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    outstandingBalance: Number,
    status: { type: String, default: 'active' },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    deletedAt: Date
})

export const TuitionTransactionsSchema = new mongoose.Schema({
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
    session: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
    term: String,
    tuition: { type: mongoose.Schema.Types.ObjectId, ref: 'Tuition' },
    assignedTuition: { type: mongoose.Schema.Types.ObjectId, ref: 'AssignedTuitions' },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    amount: Number,
    outstandingBalance: Number,
    narration: String,
    paymentReference: String,
    paymentMode: String,
    imageUrl: { type: String, default: '' },
    transactionDate: { type: Date, default: new Date() },
    status: { type: String, default: 'successful' },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    deletedAt: Date
})
