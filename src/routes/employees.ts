import express from "express";

// internal imports
import { ROUTES } from "../common/constants/routes";
import * as EmployeeController from "../controllers/employees.controller";

const router = express.Router();

// GET ALL DELETED EMPLOYEES
router.get(ROUTES.EMPLOYEES.DELETED, EmployeeController.deletedEmployees);

//CREATE EMPLOYEE
router.post(ROUTES.EMPLOYEES.INDEX, EmployeeController.create);

// UPDATE EMPLOYEE
router.put(ROUTES.EMPLOYEES.BY_ID, EmployeeController.update);

// SOFT DELETE EMPLOYEE
router.put(ROUTES.EMPLOYEES.SOFT_DELETE, EmployeeController.softDelete);

// PERMANENT DELETE
router.delete(
    ROUTES.EMPLOYEES.PERMANENT_DELETE,
    EmployeeController.permanentDelete
);

// GET EMPLOYEE BY ID
router.get(ROUTES.EMPLOYEES.BY_ID, EmployeeController.employeeByID);

// GET ALL EMPLOYEES
router.get(ROUTES.EMPLOYEES.INDEX, EmployeeController.allEmployees);

export default router;
