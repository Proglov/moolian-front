
export interface IBrand {
    _id: string;
    imageKey: string;
    nameEN: string;
    nameFA: string;
}


/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface ICreateBrand extends Omit<IBrand, '_id'> { }