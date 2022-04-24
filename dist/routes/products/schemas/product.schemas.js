"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = void 0;
const mongoose = require("mongoose");
exports.ProductSchema = new mongoose.Schema({
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
    tuckshop: { type: mongoose.Schema.Types.ObjectId, ref: 'Tuckshop' },
    name: String,
    category: String,
    price: Number,
    quantity: Number,
    sku: String,
    description: String,
    imageUrl: String,
    status: { type: String, default: 'active' },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    deletedAt: Date
});
//# sourceMappingURL=product.schemas.js.map