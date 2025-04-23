
export interface IBrand {
    _id: string;
    imageKey: string;
    nameEN: string;
    nameFA: string;
}

export interface ICreateBrand extends Omit<IBrand, '_id'> { }