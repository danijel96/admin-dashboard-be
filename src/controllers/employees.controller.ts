import { Request, Response } from "express";
import * as EmployeeService from "../services/employess.service";

// Controller is for handling responses & requests (cookies, body validation, send response to FE..., what FE sends to BE and vice versa)
export const create = async (req: Request, res: Response) => {
    try {
        const employeeData = req.body;
        // Check if the email already exists
        const createdEmployee = await EmployeeService.create(employeeData);

        res.status(201).json({
            data: createdEmployee,
            message: "Successfully created Employee!",
        });
    } catch (error: any) {
        if (error.message == "Entity Already Exists") {
            return res.status(409).json({
                message: "Email already exists",
            });
        }

        res.status(500).json({
            message: "Internal server error",
        });
    }
};
