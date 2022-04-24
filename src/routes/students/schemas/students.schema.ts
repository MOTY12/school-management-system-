import * as mongoose from 'mongoose';


export const StudentsSchema = new mongoose.Schema({
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    guardian: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    firstName: String,
    middleName: { type: String, default: '' },
    lastName: String,
    dateOfBirth: Date,
    studentID: String,
    availableBalance: Number,
    imageUrl: { type: String, default: '' },
    status: { type: String, default: 'active' },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    deletedAt: Date
})
