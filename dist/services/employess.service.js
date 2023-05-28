"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletedEmployees = exports.allEmployees = exports.employeeByID = exports.permanentDelete = exports.softDelete = exports.update = exports.create = void 0;
const global_constants_1 = require("../common/constants/global.constants");
const Employee_1 = __importDefault(require("../models/Employee"));
const EmployeeRepository = __importStar(require("../repositories/employees.repository"));
// Services is for logic
const create = async (employeeData) => {
    try {
        const existingEmployee = await EmployeeRepository.getOne({
            email: employeeData.email,
        });
        if (existingEmployee) {
            throw new Error(global_constants_1.ERRORS.EMPLOYEES.ALREADY_EXISTS);
        }
        return await EmployeeRepository.create(employeeData);
    }
    catch (error) {
        throw error;
    }
};
exports.create = create;
const update = async (employeeData, employeeId) => {
    try {
        const existingEmployee = await Employee_1.default.findOne({
            email: employeeData.email,
            _id: { $ne: employeeId },
        });
        if (existingEmployee) {
            throw new Error(global_constants_1.ERRORS.EMPLOYEES.ALREADY_EXISTS);
        }
        const updatedEmployee = await Employee_1.default.findByIdAndUpdate(employeeId, employeeData, { new: true });
        if (!updatedEmployee) {
            throw new Error(global_constants_1.ERRORS.EMPLOYEES.NOT_FOUND);
        }
        return updatedEmployee;
    }
    catch (error) {
        throw error;
    }
};
exports.update = update;
const softDelete = async (employeeId) => {
    const employee = await Employee_1.default.findByIdAndUpdate(employeeId, {
        isDeleted: true,
        deletedAt: new Date().toISOString(),
    }, { new: true });
    if (!employee) {
        throw new Error(global_constants_1.ERRORS.EMPLOYEES.NOT_FOUND);
    }
    return employee;
};
exports.softDelete = softDelete;
const permanentDelete = async (employeeId) => {
    if (!employeeId) {
        throw new Error(global_constants_1.ERRORS.EMPLOYEES.PROVIDE_EMPLOYEE_ID);
    }
    const employee = await Employee_1.default.findById(employeeId);
    if (!employee) {
        throw new Error(global_constants_1.ERRORS.EMPLOYEES.NOT_FOUND);
    }
    // Permanently delete the employee from the database
    await employee.deleteOne();
};
exports.permanentDelete = permanentDelete;
const employeeByID = async (employeeId) => {
    const employee = await Employee_1.default.findById(employeeId);
    if (!employee) {
        throw new Error(global_constants_1.ERRORS.EMPLOYEES.NOT_FOUND);
    }
    return employee;
};
exports.employeeByID = employeeByID;
const allEmployees = async (queryParams) => {
    const { page = 1, limit = 10, search } = queryParams;
    const filters = { isDeleted: false };
    if (search) {
        // Apply search filters using $regex and $options
        filters.$or = [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            {
                "homeAddress.city": {
                    $regex: search,
                    $options: "i",
                },
            },
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
    return { employees, count, totalPages, page };
};
exports.allEmployees = allEmployees;
const deletedEmployees = async (queryParams) => {
    const { page = 1, limit = 10 } = queryParams;
    const skip = (page - 1) * limit;
    const [deletedEmployees, count] = await Promise.all([
        Employee_1.default.find({ isDeleted: true }).skip(skip).limit(+limit),
        Employee_1.default.countDocuments({ isDeleted: true }),
    ]);
    const totalPages = Math.ceil(count / limit);
    return { deletedEmployees, count, totalPages, page };
};
exports.deletedEmployees = deletedEmployees;
//# sourceMappingURL=employess.service.js.map