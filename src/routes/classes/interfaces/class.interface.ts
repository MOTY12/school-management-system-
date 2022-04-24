import { Document } from 'mongoose';

export interface Class extends Document {
    name: String,
    level: String,
    type: String,
    classHead: String,
    imageUrl: String,
    status: String;
    isDeleted: Boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}