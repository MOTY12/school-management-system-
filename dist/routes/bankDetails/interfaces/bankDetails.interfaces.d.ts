import { Document } from "mongoose";
export interface BankDetails extends Document {
    accountName: String;
    accountNumber: String;
    bankCode: String;
    status: String;
    isDeleted: Boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
