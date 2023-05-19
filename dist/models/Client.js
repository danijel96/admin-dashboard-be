"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ClientSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Clients", ClientSchema);
//# sourceMappingURL=Client.js.map