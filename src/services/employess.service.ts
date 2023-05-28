import { FilterQuery } from "mongoose";
import { ERRORS } from "../common/constants/global.constants";
import {
    EmployeeParamsWithPagination,
    IEmployee,
} from "../common/contracts/Employee";
import Employee from "../models/Employee";
import * as EmployeeRepository from "../repositories/employees.repository";
import { Pagination } from "../common/contracts/Pagination";

// Services is for logic

export const create = async (employeeData: IEmployee) => {
    try {
        const existingEmployee = await EmployeeRepository.getOne({
            email: employeeData.email,
        });

        if (existingEmployee) {
            throw new Error(ERRORS.EMPLOYEES.ALREADY_EXISTS);
        }
        return await EmployeeRepository.create(employeeData);
    } catch (error: any) {
        throw error;
    }
};

export const update = async (employeeData: IEmployee, employeeId: string) => {
    try {
        const existingEmployee = await Employee.findOne({
            email: employeeData.email,
            _id: { $ne: employeeId },
        });

        if (existingEmployee) {
            throw new Error(ERRORS.EMPLOYEES.ALREADY_EXISTS);
        }

        const updatedEmployee = await Employee.findByIdAndUpdate(
            employeeId,
            employeeData,
            { new: true }
        );
        if (!updatedEmployee) {
            throw new Error(ERRORS.EMPLOYEES.NOT_FOUND);
        }
        return updatedEmployee;
    } catch (error) {
        throw error;
    }
};

export const softDelete = async (employeeId: string) => {
    const employee = await Employee.findByIdAndUpdate(
        employeeId,
        {
            isDeleted: true,
            deletedAt: new Date().toISOString(),
        },
        { new: true }
    );
    if (!employee) {
        throw new Error(ERRORS.EMPLOYEES.NOT_FOUND);
    }
    return employee;
};

export const permanentDelete = async (employeeId: string) => {
    if (!employeeId) {
        throw new Error(ERRORS.EMPLOYEES.PROVIDE_EMPLOYEE_ID);
    }

    const employee = await Employee.findById(employeeId);

    if (!employee) {
        throw new Error(ERRORS.EMPLOYEES.NOT_FOUND);
    }

    // Permanently delete the employee from the database
    await employee.deleteOne();
};

export const employeeByID = async (employeeId: string) => {
    const employee = await Employee.findById(employeeId);

    if (!employee) {
        throw new Error(ERRORS.EMPLOYEES.NOT_FOUND);
    }
    return employee;
};

export const allEmployees = async (
    queryParams: EmployeeParamsWithPagination
) => {
    const { page = 1, limit = 10, search } = queryParams;
    const filters: FilterQuery<IEmployee> = { isDeleted: false };

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
        Employee.find(filters).skip(skip).limit(+limit),
        Employee.countDocuments(filters),
    ]);

    const totalPages: number = Math.ceil(count / limit);

    return { employees, count, totalPages, page };
};

export const deletedEmployees = async (queryParams: Pagination) => {
    const { page = 1, limit = 10 } = queryParams;
    const skip = (page - 1) * limit;

    const [deletedEmployees, count] = await Promise.all([
        Employee.find({ isDeleted: true }).skip(skip).limit(+limit),
        Employee.countDocuments({ isDeleted: true }),
    ]);

    const totalPages = Math.ceil(count / limit);

    return { deletedEmployees, count, totalPages, page };
};
