export class paginationList<T>{
    pageOfItems: T[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
}