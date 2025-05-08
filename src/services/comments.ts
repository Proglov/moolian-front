import { IComment } from '@/types/comment.type'
import { baseApi } from './baseApi'
import { IGetResponse, IPagination } from '@/types/api.types'


export const commentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
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
    }),
    overrideExisting: false,
})



export const { useGetAllCommentsQuery, useDeleteCommentMutation, useToggleCommentMutation } = commentApi