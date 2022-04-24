"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationSchema = void 0;
const mongoose = require("mongoose");
const AddressSchema = new mongoose.Schema({
    street: String,
    city: String,
    state: String,
    country: String
});
exports.OrganizationSchema = new mongoose.Schema({
    name: String,
    emailAddress: { type: String, lowercase: true },
    phoneNumber: String,
    logoUrl: { type: String, default: '' },
    address: AddressSchema,
    status: { type: String, default: 'active' },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    deletedAt: Date
});
//# sourceMappingURL=organization.schema.js.map