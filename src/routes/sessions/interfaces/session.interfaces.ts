import { Document } from "mongoose";

export interface Session extends Document {
    name: String,
    term: String,
    status: String,
    isDeleted: Boolean,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
}