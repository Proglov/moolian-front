import { IComment, ICreateComment, IGetCommentsOfAProductReq } from '@/types/comment.type'
import { baseApi } from './baseApi'
import { IGetResponse, IPagination } from '@/types/api.types'


export const commentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        addNewComment: build.mutation<void, ICreateComment>({
            query: newComment => ({
                url: '/comment',
                method: 'POST',
                body: newComment
            })
        }),
        getAllComments: build.query<IGetResponse<IComment>, IPagination>({
            query: (pagination) => ({
                url: 'comment',
                method: "GET",
                params: pagination
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.items.map(({ _id }) => ({ type: 'comment' as const, _id })),
                        { type: 'comment', id: 'LIST' },
                    ]
                    : [{ type: 'comment', id: 'LIST' }],
        }),
        getAllCommentsOfAProduct: build.query<IGetResponse<IComment>, IGetCommentsOfAProductReq>({
            query: ({ _id, ...pagination }) => ({
                url: `comment/product/${_id}`,
                method: "GET",
                params: pagination
            }),
            providesTags: (result, _error, arg) =>
                result
                    ? [
                        ...result.items.map(({ _id }) => ({ type: 'comment' as const, _id })),
                        { type: 'comment', id: 'LIST' },
                        { type: 'comment', id: `PRODUCT_${arg._id}` },
                        { type: 'comment', id: `PRODUCT_${arg._id}_PAGE_${arg.page}` },
                    ]
                    : [
                        { type: 'comment', id: 'LIST' },
                        { type: 'comment', id: `PRODUCT_${arg._id}` },
                        { type: 'comment', id: `PRODUCT_${arg._id}_PAGE_${arg.page}` },
                    ],
        }),
        deleteComment: build.mutation<void, string>({
            query: (_id) => ({
                url: `/comment/${_id}`,
                method: 'Delete'
            }),
            invalidatesTags: [{ type: 'comment', id: 'LIST' }],
        }),
        toggleComment: build.mutation<void, string>({
            query: (_id) => ({
                url: `/comment/${_id}/toggleValidation`,
                method: 'PATCH'
            }),
            invalidatesTags: [{ type: 'comment', id: 'LIST' }],
        }),
        likeComment: build.mutation<void, { _id: string, productId: string, page: number, userId: string, limit: number }>({
            query: ({ _id }) => ({
                url: `/comment/${_id}/like`,
                method: 'PATCH'
            }),
            // Optimistic update logic here!
            async onQueryStarted({ _id, productId, page, userId, limit }, { dispatch, queryFulfilled }) {
                // Patch the cache for the relevant page
                const patchResult = dispatch(
                    commentApi.util.updateQueryData(
                        'getAllCommentsOfAProduct',
                        { _id: productId, page, limit },
                        (draft) => {
                            const comment = draft.items.find(c => c._id === _id);
                            if (comment) {
                                // Remove from disLikeIds if present
                                comment.disLikeIds = comment.disLikeIds.filter(id => id !== userId);
                                // Add to likeIds if not already present
                                if (!comment.likeIds.includes(userId)) {
                                    comment.likeIds.push(userId);
                                }
                            }
                        }
                    )
                );
                try {
                    await queryFulfilled;
                } catch {
                    // Rollback if the mutation fails
                    patchResult.undo();
                }
            },
            invalidatesTags: (_result, _error, arg) => [
                { type: 'comment', id: `PRODUCT_${arg.productId}_PAGE_${arg.page}` }
            ],
        }),
        disLikeComment: build.mutation<void, { _id: string, productId: string, page: number, userId: string, limit: number }>({
            query: ({ _id }) => ({
                url: `/comment/${_id}/disLike`,
                method: 'PATCH'
            }),
            async onQueryStarted({ _id, productId, page, userId, limit }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    commentApi.util.updateQueryData(
                        'getAllCommentsOfAProduct',
                        { _id: productId, page, limit },
                        (draft) => {
                            const comment = draft.items.find(c => c._id === _id);
                            if (comment) {
                                comment.likeIds = comment.likeIds.filter(id => id !== userId);
                                if (!comment.disLikeIds.includes(userId)) {
                                    comment.disLikeIds.push(userId);
                                }
                            }
                        }
                    )
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
            invalidatesTags: (_result, _error, arg) => [
                { type: 'comment', id: `PRODUCT_${arg.productId}_PAGE_${arg.page}` }
            ],
        }),

    }),
    overrideExisting: false,
})



export const { useAddNewCommentMutation, useGetAllCommentsQuery, useGetAllCommentsOfAProductQuery, useDeleteCommentMutation, useToggleCommentMutation, useLikeCommentMutation, useDisLikeCommentMutation } = commentApi