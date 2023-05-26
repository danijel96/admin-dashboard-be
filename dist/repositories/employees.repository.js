"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.getOne = void 0;
const Employee_1 = __importDefault(require("../models/Employee"));
// Repository is for communication with DB
const getOne = async (employeeData) => {
    return await Employee_1.default.findOne(employeeData);
};
exports.getOne = getOne;
const create = async (employeeData) => {
    const employee = new Employee_1.default({
        ...employeeData,
        isDeleted: false,
        deletedAt: null,
    });
    return await employee.save();
};
exports.create = create;
//# sourceMappingURL=employees.repository.js.map