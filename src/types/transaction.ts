import { IProduct } from "./product.type";
import { IUser } from "./user.type";

export enum TXStatus {
    Requested = "Requested",
    Accepted = "Accepted",
    Sent = "Sent",
    Received = "Received",
    Canceled = "Canceled"
}

export interface IBoughtProduct {
    productId: { _id: string, nameFA: string };
    quantity: number
}

export interface ITransaction {
    _id: string;
    address: string;
    userId: Pick<IUser, '_id' | 'name' | 'phone'>;
    productId: Pick<IProduct, '_id' | 'nameFA'>;
    createdAt: string;
    shouldBeSentAt: string;
    totalPrice: number;
    shippingCost: number;
    status: TXStatus;
    boughtProducts: IBoughtProduct[];
}

export interface IToggleStatus {
    _id: string;
    status: TXStatus
}

export type TStatusValues = {
    color: string;
    fa: string;
    next?: TXStatus;
    nextFA?: string;
    nextColor?: string;
}
export type TStatusObject = Record<TXStatus, TStatusValues>