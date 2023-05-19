import { PaginationResponse } from "./Pagination";

export interface APIResponse<Data> extends Partial<PaginationResponse> {
    data: Data;
    message: string;
    messageCode?: string;
}
export interface APIError {
    message: string;
    statusCode?: number;
    errorCode?: string;
    errors?: Record<string, string>;
}

export interface BaseParams {
    id: string;
}
