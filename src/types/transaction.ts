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

export interface IUnPopulatedBoughtProduct {
    productId: string;
    quantity: number;
    volume: Volume;
}

export interface IBoughtProduct extends Omit<IUnPopulatedBoughtProduct, 'productId'> {
    productId: { _id: string, nameFA: string };
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
    createdAt: string;
    shouldBeSentAt: string;
    totalPrice: number;
    totalDiscount?: number;
    shippingCost: number;
    status: TXStatus;
    boughtProducts: IBoughtProduct[];
    canceled?: ICanceled;
    opinion?: IOpinion;
}

export interface ITransactionWithPage extends ITransaction {
    page: number
}

export interface ICreateTransaction {
    address: string;
    boughtProducts: IUnPopulatedBoughtProduct[];
}

export interface IToggleStatus {
    _id: string;
    status: TXStatus
}

export interface ICancelTX {
    _id: string;
    reason: string;
}

export interface ICancelTXUser extends ICancelTX {
    limit: number;
    page: number;
}

export interface IAddOpinion {
    _id: string;
    rate: number;
    comment: string;
    limit: number;
    page: number;
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