"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERRORS = exports.SUCCESS = exports.SUCCESS_MESSAGE = void 0;
exports.SUCCESS_MESSAGE = "OK";
exports.SUCCESS = {
    EMPLOYEES: {
        CREATE: "Successfully created Employee!",
        UPDATE: "Successfully updated employee!",
        SOFT_DELETE: "Successfully deleted employee!",
        PERMANENT_DELETE: "Successfully permanently deleted employee!",
    },
    MESSAGE: "OK",
};
exports.ERRORS = {
    EMPLOYEES: {
        ALREADY_EXISTS: "Employee Already Exists",
        NOT_FOUND: "Employee not found",
        PROVIDE_EMPLOYEE_ID: "You need to provide employee ID",
    },
    SERVER_ERROR: "Internal server error",
};
//# sourceMappingURL=global.constants.js.map