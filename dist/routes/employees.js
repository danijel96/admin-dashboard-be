"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//const createProduct = require("../controlers/employee");
const express_1 = __importDefault(require("express"));
// internal imports
const global_constants_1 = require("../common/constants/global.constants");
const Employee_1 = __importDefault(require("../models/Employee"));
const router = express_1.default.Router();
//CREATE EMPLOYEE - DONE
router.post("/", async (req, res) => {
    try {
        const employeeData = req.body;
        // Check if the email already exists
        const existingEmployee = await Employee_1.default.findOne({
            email: employeeData.email,
        });
        if (existingEmployee) {
            return res.status(409).json({
                message: "Email already exists",
            });
        }
        const employee = new Employee_1.default({
            ...employeeData,
            isDeleted: false,
            deletedAt: null,
        });
        const createdEmployee = await employee.save();
        res.status(201).json({
            data: createdEmployee,
            message: "Successfully created Employee!",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
        });
    }
});
// UPDATE EMPLOYEE - DONE
router.put("/:id", async (req, res) => {
    try {
        const employeeId = req.params.id;
        const employeeData = req.body;
        // Check if the email already exists for another employee
        const existingEmployee = await Employee_1.default.findOne({
            email: employeeData.email,
            _id: { $ne: employeeId },
        });
        if (existingEmployee) {
            return res
                .status(409)
                .json({ message: "Email already exists" });
        }
        const updatedEmployee = await Employee_1.default.findByIdAndUpdate(employeeId, employeeData, { new: true });
        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json({
            data: updatedEmployee,
            message: "Successfully updated employee!",
            messageCode: "updatedEmployee",
        });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
// SOFT DELETE EMPLOYEE - DONE
router.put("/soft-delete/:id", async (req, res) => {
    try {
        const employeeId = req.params.id;
        const employee = await Employee_1.default.findByIdAndUpdate(employeeId, {
            isDeleted: true,
            deletedAt: new Date().toISOString(),
        }, { new: true });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json({
            data: employee,
            message: "Successfully deleted employee!",
            messageCode: "softDelete",
        });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
// PERMANENT DELETE - DONE
router.delete("/permanent-delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        // Find the employee by ID
        if (!id) {
            return res.status(404).json({
                message: "You need to provide employee ID",
            });
        }
        const employee = await Employee_1.default.findById(id);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        // Permanently delete the employee from the database
        await employee.deleteOne();
        res.json({
            message: "Employee permanently deleted",
            messageCode: "fullDeleted",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
        });
    }
});
// GET EMPLOYEE BY ID - DONE
router.get("/id/:id", async (req, res) => {
    try {
        const employeeId = req.params.id;
        const employee = await Employee_1.default.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json({ data: employee, message: "Success" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
// GET ALL EMPLOYEES - DONE
router.get("/", async (req, res) => {
    try {
        const { page = 1, limit = 10, search } = req.query;
        const filters = { isDeleted: false };
        if (search) {
            // Apply search filters using $regex and $options
            filters.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { "homeAddress.city": { $regex: search, $options: "i" } },
                { phoneNumber: { $regex: search, $options: "i" } },
            ];
        }
        // Calculate skip and limit based on page and limit
        const skip = (page - 1) * limit;
        // Query the database with filters and pagination
        const [employees, count] = await Promise.all([
            Employee_1.default.find(filters).skip(skip).limit(+limit),
            Employee_1.default.countDocuments(filters),
        ]);
        const totalPages = Math.ceil(count / limit);
        res.json({
            data: employees,
            currentPage: +page,
            totalPages,
            totalResults: count,
            message: global_constants_1.SUCCESS_MESSAGE,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
        });
    }
});
// GET ALL DELETED EMPLOYEES - DONE
router.get("/deleted", async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;
        const [deletedEmployees, count] = await Promise.all([
            Employee_1.default.find({ isDeleted: true }).skip(skip).limit(+limit),
            Employee_1.default.countDocuments({ isDeleted: true }),
        ]);
        const totalPages = Math.ceil(count / limit);
        res.json({
            data: deletedEmployees,
            currentPage: +page,
            totalPages,
            totalResults: count,
            message: "Success",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
        });
    }
});
exports.default = router;
//# sourceMappingURL=employees.js.map