import { Schema, model } from "mongoose";

const EmployeeHomeAddressSchema = new Schema({
    ZIPCode: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
});

const EmployeeSchema = new Schema(
    {
        //_id: { type: String, required: true, unique: true  },
        dateOfBirth: { type: String, required: true },
        dateOfEmployment: { type: String, required: true },
        deletedAt: { type: String },
        email: { type: String, required: true, unique: true },
        homeAddress: { type: EmployeeHomeAddressSchema },
        isDeleted: { type: Boolean },
        name: { type: String, required: true },
        phoneNumber: { type: String, required: true },
    },
    { timestamps: true }
);

export default model("Employee", EmployeeSchema);
