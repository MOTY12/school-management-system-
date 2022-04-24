"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TuckshopSchema = void 0;
const mongoose = require("mongoose");
exports.TuckshopSchema = new mongoose.Schema({
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    location: String,
    category: String,
    tuckshopID: String,
    imageUrl: String,
    status: { type: String, default: 'active' },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    deletedAt: Date
});
//# sourceMappingURL=tuckshop.schemas.js.map