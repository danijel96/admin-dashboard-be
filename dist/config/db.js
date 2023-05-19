"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const connectDB = async () => {
    //@ts-ignore
    const conn = await (0, mongoose_1.connect)(process.env.MONGO_URL);
    /* eslint-disable no-console*/
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};
exports.default = connectDB;
//# sourceMappingURL=db.js.map