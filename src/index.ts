import express, { json } from "express";
import colors from "colors";
const app = express();
import { config } from "dotenv";
config();
import cors from "cors";

import employeeRoute from "./routes/employees";

import connectDB from "./config/db";

colors.enable();
connectDB();

app.use(cors());
app.use(json());
app.use("/employees", employeeRoute);

app.listen(process.env.PORT || 5000, () => {
    /* eslint-disable no-console*/
    console.log("Backend server is running on port!", process.env.PORT);
});
