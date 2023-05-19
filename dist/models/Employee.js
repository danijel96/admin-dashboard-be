"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const EmployeeHomeAddressSchema = new mongoose_1.Schema({
    ZIPCode: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
});
const EmployeeSchema = new mongoose_1.Schema({
    //_id: { type: String, required: true, unique: true  },
    dateOfBirth: { type: String, required: true },
    dateOfEmployment: { type: String, required: true },
    deletedAt: { type: String },
    email: { type: String, required: true, unique: true },
    homeAddress: { type: EmployeeHomeAddressSchema },
    isDeleted: { type: Boolean },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Employee", EmployeeSchema);
//# sourceMappingURL=Employee.js.map