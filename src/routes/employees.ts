//const createProduct = require("../controlers/employee");
import express, { Request, Response } from "express";

// internal imports
import { SUCCESS_MESSAGE } from "../common/constants/global.constants";
import { IEmployee } from "../common/contracts/Employee";
import { Pagination } from "../common/contracts/Pagination";
import {
    APIError,
    APIResponse,
    BaseParams,
} from "../common/contracts/global.contracts";
import Employee from "../models/Employee";

const router = express.Router();

//CREATE EMPLOYEE - DONE
router.post(
    "/",
    async (
        req: Request<Record<string, never>, APIResponse<IEmployee>, IEmployee>,
        res: Response<APIResponse<IEmployee> | APIError>
    ) => {
        try {
            const employeeData: IEmployee = req.body;
            // Check if the email already exists
            const existingEmployee = await Employee.findOne({
                email: employeeData.email,
            });
            if (existingEmployee) {
                return res.status(409).json({
                    message: "Email already exists",
                });
            }

            const employee = new Employee({
                ...employeeData,
                isDeleted: false,
                deletedAt: null,
            });
            const createdEmployee = await employee.save();

            res.status(201).json({
                data: createdEmployee,
                message: "Successfully created Employee!",
            });
        } catch (error) {
            res.status(500).json({
                message: "Internal server error",
            });
        }
    }
);

// UPDATE EMPLOYEE - DONE
router.put(
    "/:id",
    async (
        req: Request<BaseParams, Record<never, never>, IEmployee>,
        res: Response<APIResponse<IEmployee> | APIError>
    ) => {
        try {
            const employeeId: string = req.params.id;
            const employeeData: IEmployee = req.body;

            // Check if the email already exists for another employee
            const existingEmployee = await Employee.findOne({
                email: employeeData.email,
                _id: { $ne: employeeId },
            });
            if (existingEmployee) {
                return res
                    .status(409)
                    .json({ message: "Email already exists" });
            }

            const updatedEmployee = await Employee.findByIdAndUpdate(
                employeeId,
                employeeData,
                { new: true }
            );

            if (!updatedEmployee) {
                return res.status(404).json({ message: "Employee not found" });
            }

            res.status(200).json({
                data: updatedEmployee,
                message: "Successfully updated employee!",
                messageCode: "updatedEmployee",
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
);

// SOFT DELETE EMPLOYEE - DONE
router.put(
    "/soft-delete/:id",
    async (
        req: Request<BaseParams>,
        res: Response<APIResponse<IEmployee> | APIError>
    ) => {
        try {
            const employeeId: string = req.params.id;

            const employee = await Employee.findByIdAndUpdate(
                employeeId,
                {
                    isDeleted: true,
                    deletedAt: new Date().toISOString(),
                },
                { new: true }
            );

            if (!employee) {
                return res.status(404).json({ message: "Employee not found" });
            }

            res.status(200).json({
                data: employee,
                message: "Successfully deleted employee!",
                messageCode: "softDelete",
            });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
);

// PERMANENT DELETE - DONE
router.delete(
    "/permanent-delete/:id",
    async (
        req: Request<BaseParams>,
        res: Response<Partial<APIResponse<IEmployee>>>
    ) => {
        try {
            const { id } = req.params;
            // Find the employee by ID
            if (!id) {
                return res.status(404).json({
                    message: "You need to provide employee ID",
                });
            }
            const employee = await Employee.findById(id);

            if (!employee) {
                return res.status(404).json({ message: "Employee not found" });
            }

            // Permanently delete the employee from the database
            await employee.deleteOne();

            res.json({
                message: "Employee permanently deleted",
                messageCode: "fullDeleted",
            });
        } catch (error) {
            res.status(500).json({
                message: "Internal server error",
            });
        }
    }
);

// GET EMPLOYEE BY ID - DONE
router.get(
    "/id/:id",
    async (
        req: Request<BaseParams>,
        res: Response<APIResponse<IEmployee> | APIError>
    ) => {
        try {
            const employeeId: string = req.params.id;

            const employee = await Employee.findById(employeeId);

            if (!employee) {
                return res.status(404).json({ message: "Employee not found" });
            }

            res.status(200).json({ data: employee, message: "Success" });
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
);

// GET ALL EMPLOYEES - DONE
router.get(
    "/",
    async (
        req: Request<
            Record<string, never>,
            APIResponse<IEmployee[]>,
            Record<string, never>,
            Pagination
        >,
        res: Response<APIResponse<IEmployee[]> | APIError>
    ) => {
        try {
            const { page = 1, limit = 10 } = req.query;
            const filters = { isDeleted: false };
            // Calculate skip and limit based on page and limit
            const skip = (page - 1) * limit;

            // Query the database with filters and pagination
            const [employees, count] = await Promise.all([
                Employee.find(filters).skip(skip).limit(+limit),
                Employee.countDocuments(filters),
            ]);

            const totalPages = Math.ceil(count / limit);

            res.json({
                data: employees,
                currentPage: +page,
                totalPages,
                totalResults: count,
                message: SUCCESS_MESSAGE,
            });
        } catch (error) {
            res.status(500).json({
                message: "Internal server error",
            });
        }
    }
);

// GET ALL DELETED EMPLOYEES - DONE
router.get(
    "/deleted",
    async (
        req: Request<
            Record<string, never>,
            APIResponse<IEmployee[]>,
            Record<string, never>,
            Pagination
        >,
        res: Response<APIResponse<IEmployee[]> | APIError>
    ) => {
        try {
            const { page = 1, limit = 10 } = req.query;
            const skip = (page - 1) * limit;

            const [deletedEmployees, count] = await Promise.all([
                Employee.find({ isDeleted: true }).skip(skip).limit(+limit),
                Employee.countDocuments({ isDeleted: true }),
            ]);

            const totalPages = Math.ceil(count / limit);

            res.json({
                data: deletedEmployees,
                currentPage: +page,
                totalPages,
                totalResults: count,
                message: "Success",
            });
        } catch (error) {
            res.status(500).json({
                message: "Internal server error",
            });
        }
    }
);

export default router;
