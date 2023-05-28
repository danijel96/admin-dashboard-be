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
const express_1 = __importDefault(require("express"));
// internal imports
const routes_1 = require("../common/constants/routes");
const EmployeeController = __importStar(require("../controllers/employees.controller"));
const router = express_1.default.Router();
// GET ALL DELETED EMPLOYEES
router.get(routes_1.ROUTES.EMPLOYEES.DELETED, EmployeeController.deletedEmployees);
//CREATE EMPLOYEE
router.post(routes_1.ROUTES.EMPLOYEES.INDEX, EmployeeController.create);
// UPDATE EMPLOYEE
router.put(routes_1.ROUTES.EMPLOYEES.BY_ID, EmployeeController.update);
// SOFT DELETE EMPLOYEE
router.put(routes_1.ROUTES.EMPLOYEES.SOFT_DELETE, EmployeeController.softDelete);
// PERMANENT DELETE
router.delete(routes_1.ROUTES.EMPLOYEES.PERMANENT_DELETE, EmployeeController.permanentDelete);
// GET EMPLOYEE BY ID
router.get(routes_1.ROUTES.EMPLOYEES.BY_ID, EmployeeController.employeeByID);
// GET ALL EMPLOYEES
router.get(routes_1.ROUTES.EMPLOYEES.INDEX, EmployeeController.allEmployees);
exports.default = router;
//# sourceMappingURL=employees.js.map