import { Pagination } from "../Pagination";

export interface IEmployee {
    dateOfBirth: string;
    dateOfEmployment: string;
    deletedAt?: string;
    email: string;
    homeAddress?: EmployeeHomeAddress;
    isDeleted?: boolean;
    name: string;
    phoneNumber: string;
}

export interface EmployeeHomeAddress {
    ZIPCode: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
}

export interface EmployeeParamsWithPagination extends Pagination {
    search: string;
}
