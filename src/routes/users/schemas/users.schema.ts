import * as mongoose from 'mongoose';


const AddressSchema = new mongoose.Schema({
    street: String,
    city: String,
    state: String,
    country: String
});

export const UserSchema = new mongoose.Schema({
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
    firstName: String,
    middleName: { type: String, default: '' },
    lastName: String,
    emailAddress: { type: String, lowercase: true },
    emailAddressVerified: { type: Boolean, default: false },
    phoneNumber: String,
    role: { type: String, enum: ['Super-Admin', 'Admin', 'Tuckshop', 'Guardian'] },
    address: AddressSchema,
    password: { type: String, select: false },
    imageUrl: { type: String, default: '' },
    status: { type: String, default: 'active' },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    passwordUpdatedAt: { type: Date, default: new Date() },
    deletedAt: Date
});
