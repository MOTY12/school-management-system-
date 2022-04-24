import { Document } from "mongoose";
export interface Tuckshops extends Document {
    user: String;
    name: String;
    location: String;
    category: String;
    tuckshopID: String;
    imageUrl: String;
    status: String;
    isDeleted: Boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
