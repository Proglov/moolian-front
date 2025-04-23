

export interface IPagination {
    limit?: number;
    page?: number;
}


export interface IRequiredPagination extends Required<IPagination> { }

export interface IGetResponse<T> {
    count: number;
    items: T[]
}