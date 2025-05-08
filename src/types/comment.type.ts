import { IProduct } from "./product.type";
import { IUser } from "./user.type";

export interface IComment {
    _id: string;
    body: string;
    userId: Pick<IUser, '_id' | 'name'>;
    productId: Pick<IProduct, '_id' | 'nameFA'>;
    parentCommentId: string;
    disLikeIds: string[];
    likeIds: string[];
    validated: boolean;
}