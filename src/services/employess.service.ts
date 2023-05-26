import { IEmployee } from "../common/contracts/Employee";
import * as EmployeeRepository from "../repositories/employees.repository";

// Services is for all logic
export const create = async (employeeData: IEmployee) => {
    try {
        const existingEmployee = await EmployeeRepository.getOne({
            email: employeeData.email,
        });

        if (existingEmployee) {
            throw new Error("Entity Already Exists");
        }
        return await EmployeeRepository.create(employeeData);
    } catch (error: any) {
        throw error;
    }
};
