import { Document } from "mongoose";
export interface Product extends Document {
    name: String;
    category: String;
    price: number;
    quantity: number;
    sku: String;
    description: String;
    imageUrl: String;
    status: String;
    isDeleted: Boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
