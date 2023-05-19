import { Schema, model } from "mongoose";

const ClientSchema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        phoneNumber: { type: String, required: true },
    },
    { timestamps: true }
);

export default model("Clients", ClientSchema);
