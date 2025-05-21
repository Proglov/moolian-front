import { ICancelTX, ICreateTransaction, IGetTransactionsQuery, IToggleStatus, ITransaction } from '@/types/transaction'
import { baseApi } from './baseApi'
import { IGetResponse } from '@/types/api.types'


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
        addTransaction: build.mutation<void, ICreateTransaction>({
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



export const { useGetAllTransactionsQuery, useToggleTransactionStatusMutation, useCancelTransactionBySellerMutation, useAddTransactionMutation } = transactionApi