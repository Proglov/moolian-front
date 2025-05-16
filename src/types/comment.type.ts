import { IPagination } from "./api.types";
import { IProduct } from "./product.type";
import { IUser } from "./user.type";

export interface IComment {
    _id: string;
    body: string;
    userId: Pick<IUser, '_id' | 'name'>;
    productId: Pick<IProduct, '_id' | 'nameFA'>;
    parentCommentId?: string;
    disLikeIds: string[];
    likeIds: string[];
    validated: boolean;
}

export interface IGetCommentsOfAProductReq extends IPagination {
    _id: string;
}

export interface IArrangedComment extends Omit<IComment, 'validated' | 'likeIds' | 'disLikeIds'> {
    childrenComments?: IArrangedComment[];
    status: 1 | -1 | 0;
    likes: number;
    disLikes: number;
    page: number;
}

export interface ICreateComment extends Pick<IComment, 'body' | 'parentCommentId'> {
    productId: string
}