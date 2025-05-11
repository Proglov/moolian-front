

export interface IPagination {
    limit?: number;
    page?: number;
}


/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface IRequiredPagination extends Required<IPagination> { }

export interface IGetResponse<T> {
    count: number;
    items: T[]
}