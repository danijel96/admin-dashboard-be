import colors from "colors";
import cors from "cors";
import { config } from "dotenv";
import express, { json } from "express";

// internal imports
import connectDB from "./config/db";
import employeeRoute from "./routes/employees";

const app = express();
config();

colors.enable();
connectDB();

app.use(cors());
app.use(json());
app.use("/employees", employeeRoute);

app.listen(process.env.PORT || 5000, () => {
    /* eslint-disable no-console*/
    console.log("Backend server is running on port!", process.env.PORT);
});
