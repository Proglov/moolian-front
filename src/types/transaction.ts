import { IPagination } from "./api.types";
import { IProduct } from "./product.type";
import { IUser } from "./user.type";

export enum TXStatus {
    Requested = "Requested",
    Accepted = "Accepted",
    Sent = "Sent",
    Received = "Received",
    Canceled = "Canceled"
}


export enum Volume {
    V30 = 30,
    V50 = 50,
    V100 = 100
}

export const volumeMultipliers: Record<number, number> = {
    30: 1,
    50: 1.4,
    100: 2.1,
};

export interface IBoughtProduct {
    productId: { _id: string, nameFA: string };
    quantity: number;
    volume: Volume;
}

export interface ICanceled {
    didSellerCanceled: boolean;
    reason: string;
}

export interface IOpinion {
    rate: number;
    comment?: string;
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
    canceled?: ICanceled;
    opinion?: IOpinion;
}

export interface IToggleStatus {
    _id: string;
    status: TXStatus
}

export interface ICancelTX {
    _id: string;
    reason: string;
}

export interface IGetTransactionsQuery extends IPagination {
    onlyRequested?: boolean
}

export type TStatusValues = {
    color: string;
    fa: string;
    next?: TXStatus;
    nextFA?: string;
    nextColor?: string;
}

export type TStatusObject = Record<TXStatus, TStatusValues>