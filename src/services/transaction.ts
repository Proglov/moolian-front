import { IToggleStatus, ITransaction } from '@/types/transaction'
import { baseApi } from './baseApi'
import { IGetResponse, IPagination } from '@/types/api.types'


export const transactionApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllTransactions: build.query<IGetResponse<ITransaction>, IPagination>({
            query: (pagination) => ({
                url: 'transaction',
                method: "GET",
                params: pagination
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
        cancelTransactionBySeller: build.mutation<void, string>({
            query: (_id) => ({
                url: `/transaction/${_id}/cancel`,
                method: 'PATCH'
            }),
            invalidatesTags: [{ type: 'transaction', id: 'LIST' }],
        }),
    }),
    overrideExisting: false,
})



export const { useGetAllTransactionsQuery, useToggleTransactionStatusMutation, useCancelTransactionBySellerMutation } = transactionApi