import { Request, Response } from "express";

// internal imports
import { ERRORS, SUCCESS } from "../common/constants/global.constants";
import {
    EmployeeParamsWithPagination,
    IEmployee,
} from "../common/contracts/Employee";
import { Pagination } from "../common/contracts/Pagination";
import {
    APIError,
    APIResponse,
    BaseParams,
} from "../common/contracts/global.contracts";
import * as EmployeeService from "../services/employess.service";

// Controller is for handling responses & requests (cookies, body validation, send response to FE..., what FE sends to BE and vice versa)

export const create = async (
    req: Request<Record<string, never>, APIResponse<IEmployee>, IEmployee>,
    res: Response<APIResponse<IEmployee> | APIError>
) => {
    try {
        const employeeData = req.body;

        // Check if the email already exists
        const createdEmployee = await EmployeeService.create(employeeData);

        res.status(201).json({
            data: createdEmployee,
            message: SUCCESS.EMPLOYEES.CREATE,
        });
    } catch (error: any) {
        if (error.message == ERRORS.EMPLOYEES.ALREADY_EXISTS) {
            return res.status(409).json({
                message: ERRORS.EMPLOYEES.ALREADY_EXISTS,
            });
        }

        res.status(500).json({
            message: ERRORS.SERVER_ERROR,
        });
    }
};

export const update = async (
    req: Request<BaseParams, Record<never, never>, IEmployee>,
    res: Response<APIResponse<IEmployee> | APIError>
) => {
    try {
        const employeeId: string = req.params.id;
        const employeeData: IEmployee = req.body;

        const updatedEmployee = await EmployeeService.update(
            employeeData,
            employeeId
        );

        res.status(200).json({
            data: updatedEmployee,
            message: SUCCESS.EMPLOYEES.UPDATE,
            messageCode: "updatedEmployee",
        });
    } catch (error: any) {
        if (error.message == ERRORS.EMPLOYEES.ALREADY_EXISTS) {
            return res.status(409).json({
                message: ERRORS.EMPLOYEES.ALREADY_EXISTS,
            });
        }
        if (error.message == ERRORS.EMPLOYEES.NOT_FOUND) {
            return res
                .status(404)
                .json({ message: ERRORS.EMPLOYEES.NOT_FOUND });
        }
        res.status(500).json({ message: ERRORS.SERVER_ERROR });
    }
};

export const softDelete = async (
    req: Request<BaseParams>,
    res: Response<APIResponse<IEmployee> | APIError>
) => {
    try {
        const employeeId: string = req.params.id;

        const employee = await EmployeeService.softDelete(employeeId);

        res.status(200).json({
            data: employee,
            message: SUCCESS.EMPLOYEES.SOFT_DELETE,
            messageCode: "softDelete",
        });
    } catch (error: any) {
        if (error.message == ERRORS.EMPLOYEES.NOT_FOUND) {
            return res
                .status(404)
                .json({ message: ERRORS.EMPLOYEES.NOT_FOUND });
        }
        res.status(500).json({ message: ERRORS.SERVER_ERROR });
    }
};

export const permanentDelete = async (
    req: Request<BaseParams>,
    res: Response<Partial<APIResponse<IEmployee>>>
) => {
    try {
        const employeeId: string = req.params.id;

        await EmployeeService.permanentDelete(employeeId);

        res.json({
            message: SUCCESS.EMPLOYEES.PERMANENT_DELETE,
            messageCode: "fullDeleted",
        });
    } catch (error: any) {
        if (error.message == ERRORS.EMPLOYEES.NOT_FOUND) {
            return res
                .status(404)
                .json({ message: ERRORS.EMPLOYEES.NOT_FOUND });
        }
        if (error.message == ERRORS.EMPLOYEES.PROVIDE_EMPLOYEE_ID) {
            return res
                .status(404)
                .json({ message: ERRORS.EMPLOYEES.PROVIDE_EMPLOYEE_ID });
        }

        res.status(500).json({
            message: ERRORS.SERVER_ERROR,
        });
    }
};

export const employeeByID = async (
    req: Request<BaseParams>,
    res: Response<APIResponse<IEmployee> | APIError>
) => {
    try {
        const employeeId: string = req.params.id;

        const employee = await EmployeeService.employeeByID(employeeId);

        res.status(200).json({ data: employee, message: SUCCESS.MESSAGE });
    } catch (error: any) {
        if (error.message == ERRORS.EMPLOYEES.NOT_FOUND) {
            return res
                .status(404)
                .json({ message: ERRORS.EMPLOYEES.NOT_FOUND });
        }

        res.status(500).json({ message: ERRORS.SERVER_ERROR });
    }
};

export const allEmployees = async (
    req: Request<
        Record<string, never>,
        APIResponse<IEmployee[]>,
        Record<string, never>,
        EmployeeParamsWithPagination
    >,
    res: Response<APIResponse<IEmployee[]> | APIError>
) => {
    try {
        const { employees, count, totalPages, page } =
            await EmployeeService.allEmployees(req.query);

        res.json({
            data: employees,
            currentPage: +page,
            totalPages,
            totalResults: count,
            message: SUCCESS.MESSAGE,
        });
    } catch (error: any) {
        res.status(500).json({
            message: ERRORS.SERVER_ERROR,
        });
    }
};

export const deletedEmployees = async (
    req: Request<
        Record<string, never>,
        APIResponse<IEmployee[]>,
        Record<string, never>,
        Pagination
    >,
    res: Response<APIResponse<IEmployee[]> | APIError>
) => {
    try {
        const { deletedEmployees, count, totalPages, page } =
            await EmployeeService.deletedEmployees(req.query);

        res.json({
            data: deletedEmployees,
            currentPage: +page,
            totalPages,
            totalResults: count,
            message: SUCCESS.MESSAGE,
        });
    } catch (error: any) {
        res.status(500).json({
            message: ERRORS.SERVER_ERROR,
        });
    }
};
