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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletedEmployees = exports.allEmployees = exports.employeeByID = exports.permanentDelete = exports.softDelete = exports.update = exports.create = void 0;
// internal imports
const global_constants_1 = require("../common/constants/global.constants");
const EmployeeService = __importStar(require("../services/employess.service"));
// Controller is for handling responses & requests (cookies, body validation, send response to FE..., what FE sends to BE and vice versa)
const create = async (req, res) => {
    try {
        const employeeData = req.body;
        // Check if the email already exists
        const createdEmployee = await EmployeeService.create(employeeData);
        res.status(201).json({
            data: createdEmployee,
            message: global_constants_1.SUCCESS.EMPLOYEES.CREATE,
        });
    }
    catch (error) {
        if (error.message == global_constants_1.ERRORS.EMPLOYEES.ALREADY_EXISTS) {
            return res.status(409).json({
                message: global_constants_1.ERRORS.EMPLOYEES.ALREADY_EXISTS,
            });
        }
        res.status(500).json({
            message: global_constants_1.ERRORS.SERVER_ERROR,
        });
    }
};
exports.create = create;
const update = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const employeeData = req.body;
        const updatedEmployee = await EmployeeService.update(employeeData, employeeId);
        res.status(200).json({
            data: updatedEmployee,
            message: global_constants_1.SUCCESS.EMPLOYEES.UPDATE,
            messageCode: "updatedEmployee",
        });
    }
    catch (error) {
        if (error.message == global_constants_1.ERRORS.EMPLOYEES.ALREADY_EXISTS) {
            return res.status(409).json({
                message: global_constants_1.ERRORS.EMPLOYEES.ALREADY_EXISTS,
            });
        }
        if (error.message == global_constants_1.ERRORS.EMPLOYEES.NOT_FOUND) {
            return res
                .status(404)
                .json({ message: global_constants_1.ERRORS.EMPLOYEES.NOT_FOUND });
        }
        res.status(500).json({ message: global_constants_1.ERRORS.SERVER_ERROR });
    }
};
exports.update = update;
const softDelete = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const employee = await EmployeeService.softDelete(employeeId);
        res.status(200).json({
            data: employee,
            message: global_constants_1.SUCCESS.EMPLOYEES.SOFT_DELETE,
            messageCode: "softDelete",
        });
    }
    catch (error) {
        if (error.message == global_constants_1.ERRORS.EMPLOYEES.NOT_FOUND) {
            return res
                .status(404)
                .json({ message: global_constants_1.ERRORS.EMPLOYEES.NOT_FOUND });
        }
        res.status(500).json({ message: global_constants_1.ERRORS.SERVER_ERROR });
    }
};
exports.softDelete = softDelete;
const permanentDelete = async (req, res) => {
    try {
        const employeeId = req.params.id;
        await EmployeeService.permanentDelete(employeeId);
        res.json({
            message: global_constants_1.SUCCESS.EMPLOYEES.PERMANENT_DELETE,
            messageCode: "fullDeleted",
        });
    }
    catch (error) {
        if (error.message == global_constants_1.ERRORS.EMPLOYEES.NOT_FOUND) {
            return res
                .status(404)
                .json({ message: global_constants_1.ERRORS.EMPLOYEES.NOT_FOUND });
        }
        if (error.message == global_constants_1.ERRORS.EMPLOYEES.PROVIDE_EMPLOYEE_ID) {
            return res
                .status(404)
                .json({ message: global_constants_1.ERRORS.EMPLOYEES.PROVIDE_EMPLOYEE_ID });
        }
        res.status(500).json({
            message: global_constants_1.ERRORS.SERVER_ERROR,
        });
    }
};
exports.permanentDelete = permanentDelete;
const employeeByID = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const employee = await EmployeeService.employeeByID(employeeId);
        res.status(200).json({ data: employee, message: global_constants_1.SUCCESS.MESSAGE });
    }
    catch (error) {
        if (error.message == global_constants_1.ERRORS.EMPLOYEES.NOT_FOUND) {
            return res
                .status(404)
                .json({ message: global_constants_1.ERRORS.EMPLOYEES.NOT_FOUND });
        }
        res.status(500).json({ message: global_constants_1.ERRORS.SERVER_ERROR });
    }
};
exports.employeeByID = employeeByID;
const allEmployees = async (req, res) => {
    try {
        const { employees, count, totalPages, page } = await EmployeeService.allEmployees(req.query);
        res.json({
            data: employees,
            currentPage: +page,
            totalPages,
            totalResults: count,
            message: global_constants_1.SUCCESS.MESSAGE,
        });
    }
    catch (error) {
        res.status(500).json({
            message: global_constants_1.ERRORS.SERVER_ERROR,
        });
    }
};
exports.allEmployees = allEmployees;
const deletedEmployees = async (req, res) => {
    try {
        const { deletedEmployees, count, totalPages, page } = await EmployeeService.deletedEmployees(req.query);
        res.json({
            data: deletedEmployees,
            currentPage: +page,
            totalPages,
            totalResults: count,
            message: global_constants_1.SUCCESS.MESSAGE,
        });
    }
    catch (error) {
        res.status(500).json({
            message: global_constants_1.ERRORS.SERVER_ERROR,
        });
    }
};
exports.deletedEmployees = deletedEmployees;
//# sourceMappingURL=employees.controller.js.map