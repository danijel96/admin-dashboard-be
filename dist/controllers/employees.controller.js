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
exports.create = void 0;
const EmployeeService = __importStar(require("../services/employess.service"));
// Controller is for handling responses & requests (cookies, body validation, send response to FE..., what FE sends to BE and vice versa)
const create = async (req, res) => {
    try {
        const employeeData = req.body;
        // Check if the email already exists
        const createdEmployee = await EmployeeService.create(employeeData);
        res.status(201).json({
            data: createdEmployee,
            message: "Successfully created Employee!",
        });
    }
    catch (error) {
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
exports.create = create;
//# sourceMappingURL=employees.controller.js.map