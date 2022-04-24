import * as mongoose from 'mongoose';

export const ClassSchema = new mongoose.Schema({
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
    name: String,
    level: String,
    type: { type: String, enum: ['class', 'alumni'] },
    classHead: String,
    imageUrl: { type: String, default: '' },
    status: { type: String, default: 'active' },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    deletedAt: Date
});