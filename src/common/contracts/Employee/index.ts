export interface IEmployee {
    dateOfBirth: string;
    dateOfEmployment: string;
    deletedAt?: string;
    email: string;
    homeAddress?: EmployeeHomeAddress;
    isDeleted?: boolean;
    name: string;
    phoneNumber: string;
    //_id: string;
}

export interface EmployeeHomeAddress {
    ZIPCode: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    //_id?: string;
}
