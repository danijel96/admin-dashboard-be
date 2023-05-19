export interface Pagination {
    page: number;
    limit: number;
}

export interface PaginationResponse {
    currentPage: number
    totalPages: number
    totalResults: number
}