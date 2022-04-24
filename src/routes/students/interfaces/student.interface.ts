import { ObjectId } from "mongoose";


export interface Student extends Document {
    organization: ObjectId,
    class: ObjectId,
    guardian: ObjectId,
    firstName: String,
    middleName: String,
    lastName: String,
    dateOfBirth: Date,
    studentID: String,
    availableBalance: Number,
    imageUrl: String,
    status: String,
    isDeleted: Boolean,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
}
