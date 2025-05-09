import { IProduct } from "./product.type";

export interface IFestival {
    _id: string;
    offPercentage: number;
    productId: Pick<IProduct, '_id' | 'nameFA'>;
    until: string;
}

export interface ICreateFestival extends Omit<IFestival, '_id' | 'productId'> {
    productId: string
}