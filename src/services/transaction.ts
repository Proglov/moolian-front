import { IAddOpinion, ICancelTX, ICancelTXUser, ICreateTransaction, IGetTransactionsQuery, IToggleStatus, ITransaction, TXStatus } from '@/types/transaction'
import { baseApi } from './baseApi'
import { IGetResponse, IPagination } from '@/types/api.types'


export const transactionApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllTransactions: build.query<IGetResponse<ITransaction>, IGetTransactionsQuery>({
            query: (query) => ({
                url: 'transaction',
                method: "GET",
                params: query
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.items.map(({ _id }) => ({ type: 'transaction' as const, _id })),
                        { type: 'transaction', id: 'LIST' },
                    ]
                    : [{ type: 'transaction', id: 'LIST' }],
        }),
        getMyTransactions: build.query<IGetResponse<ITransaction>, IPagination>({
            query: (query) => ({
                url: 'transaction/mine',
                method: "GET",
                params: query
            }),
            providesTags: (result, _error, arg) =>
                result
                    ? [
                        ...result.items.map(({ _id }) => ({ type: 'transaction' as const, _id })),
                        { type: 'transaction', id: 'LIST' },
                        { type: 'transaction', id: `TRANSACTION` },
                        { type: 'transaction', id: `TRANSACTION_PAGE_${arg.page}` },
                    ]
                    : [
                        { type: 'transaction', id: 'LIST' },
                        { type: 'transaction', id: `TRANSACTION` },
                        { type: 'transaction', id: `TRANSACTION_PAGE_${arg.page}` },
                    ],
        }),
        getTransactionsOfAUser: build.query<IGetResponse<ITransaction>, IPagination & { id: string }>({
            query: ({ id, ...pagination }) => ({
                url: `transaction/user/${id}`,
                method: "GET",
                params: pagination
            }),
            providesTags: (result, _error, arg) =>
                result
                    ? [
                        ...result.items.map(({ _id }) => ({ type: 'transaction' as const, _id })),
                        { type: 'transaction', id: 'LIST' },
                        { type: 'transaction', id: `TRANSACTION_USER${arg.id}` },
                        { type: 'transaction', id: `TRANSACTION_USER${arg.id}_PAGE_${arg.page}` },
                    ]
                    : [
                        { type: 'transaction', id: 'LIST' },
                        { type: 'transaction', id: `TRANSACTION_USER${arg.id}` },
                        { type: 'transaction', id: `TRANSACTION_USER${arg.id}_PAGE_${arg.page}` },
                    ],
        }),
        getTransactionsOfAProduct: build.query<IGetResponse<ITransaction>, IPagination & { id: string }>({
            query: ({ id, ...pagination }) => ({
                url: `transaction/product/${id}`,
                method: "GET",
                params: pagination
            }),
            providesTags: (result, _error, arg) =>
                result
                    ? [
                        ...result.items.map(({ _id }) => ({ type: 'transaction' as const, _id })),
                        { type: 'transaction', id: 'LIST' },
                        { type: 'transaction', id: `TRANSACTION_PRODUCT${arg.id}` },
                        { type: 'transaction', id: `TRANSACTION_PRODUCT${arg.id}_PAGE_${arg.page}` },
                    ]
                    : [
                        { type: 'transaction', id: 'LIST' },
                        { type: 'transaction', id: `TRANSACTION_PRODUCT${arg.id}` },
                        { type: 'transaction', id: `TRANSACTION_PRODUCT${arg.id}_PAGE_${arg.page}` },
                    ],
        }),
        toggleTransactionStatus: build.mutation<void, IToggleStatus>({
            query: (input) => ({
                url: `/transaction/${input._id}/status`,
                method: 'PATCH',
                params: {
                    status: input.status
                }
            }),
            invalidatesTags: [{ type: 'transaction', id: 'LIST' }],
        }),
        cancelTransactionBySeller: build.mutation<void, ICancelTX>({
            query: ({ _id, reason }) => ({
                url: `/transaction/${_id}/cancel`,
                method: 'PATCH',
                body: { reason }
            }),
            invalidatesTags: [{ type: 'transaction', id: 'LIST' }],
        }),
        cancelTransactionByUser: build.mutation<void, ICancelTXUser>({
            query: ({ _id, reason }) => ({
                url: `/transaction/${_id}/cancel/user`,
                method: 'PATCH',
                body: { reason }
            }),
            // Optimistic update logic here!
            async onQueryStarted({ _id, page, limit, reason }, { dispatch, queryFulfilled }) {
                // Patch the cache for the relevant page
                const patchResult = dispatch(
                    transactionApi.util.updateQueryData(
                        'getMyTransactions',
                        { page, limit },
                        (draft) => {
                            const transaction = draft.items.find(t => t._id === _id);
                            if (transaction) {
                                transaction.status = TXStatus.Canceled;
                                transaction.canceled = {
                                    didSellerCanceled: false,
                                    reason
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
        }),
        addOpinionTransaction: build.mutation<void, IAddOpinion>({
            query: ({ _id, comment, rate }) => ({
                url: `/transaction/${_id}/opinion`,
                method: 'PATCH',
                body: { comment, rate }
            }),
            // Optimistic update logic here!
            async onQueryStarted({ _id, page, limit, comment, rate }, { dispatch, queryFulfilled }) {
                // Patch the cache for the relevant page
                const patchResult = dispatch(
                    transactionApi.util.updateQueryData(
                        'getMyTransactions',
                        { page, limit },
                        (draft) => {
                            const transaction = draft.items.find(t => t._id === _id);
                            if (transaction) {
                                transaction.opinion = {
                                    comment,
                                    rate
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
        }),
        addTransaction: build.mutation<{ paymentUrl: string }, ICreateTransaction>({
            query: (body) => ({
                url: '/transaction',
                method: 'POST',
                body
            }),
            invalidatesTags: [{ type: 'transaction', id: 'LIST' }],
        }),
    }),
    overrideExisting: false,
})



export const { useGetAllTransactionsQuery, useGetMyTransactionsQuery, useGetTransactionsOfAUserQuery, useToggleTransactionStatusMutation, useCancelTransactionBySellerMutation, useCancelTransactionByUserMutation, useAddOpinionTransactionMutation, useAddTransactionMutation, useGetTransactionsOfAProductQuery } = transactionApi