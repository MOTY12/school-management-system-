import { Document, ObjectId } from 'mongoose';
interface Address extends Document {
    street: String;
    city: String;
    state: String;
    country: String;
}
export interface User extends Document {
    organization: ObjectId;
    firstName: String;
    middleName: String;
    lastName: String;
    emailAddress: String;
    emailAddressVerified: Boolean;
    phoneNumber: String;
    role: String;
    password: String;
    address: Address;
    imageUrl: String;
    status: String;
    isDeleted: Boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
export {};
