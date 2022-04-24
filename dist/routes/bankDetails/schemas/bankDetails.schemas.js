"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankDetailsSchema = void 0;
const mongoose = require("mongoose");
exports.BankDetailsSchema = new mongoose.Schema({
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
    accountName: String,
    accountNumber: String,
    bankCode: String,
    status: { type: String, default: 'active' },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: new Date() },
    updatedAt: { type: Date, default: new Date() },
    deletedAt: Date
});
//# sourceMappingURL=bankDetails.schemas.js.map