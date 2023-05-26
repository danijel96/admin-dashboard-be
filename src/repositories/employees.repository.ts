import { IEmployee } from "../common/contracts/Employee";
import Employee from "../models/Employee";

// Repository is for communication with DB
export const getOne = async (employeeData: Partial<IEmployee>) => {
    return await Employee.findOne(employeeData);
};

export const create = async (employeeData: IEmployee) => {
    const employee = new Employee({
        ...employeeData,
        isDeleted: false,
        deletedAt: null,
    });
    return await employee.save();
};
