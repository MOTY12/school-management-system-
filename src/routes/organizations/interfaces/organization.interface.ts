
import { Document } from 'mongoose';

interface Address extends Document {
    street: String;
    city: String;
    state: String;
    country: String;
}

export interface Organization extends Document {
    name: String;
    emailAddress: String;
    phoneNumber: String;
    logoUrl: String;
    address: Address;
    status: String;
    isDeleted: Boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
