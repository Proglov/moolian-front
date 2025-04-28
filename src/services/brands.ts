import { IBrand, ICreateBrand } from '@/types/brand.type'
import { baseApi } from './baseApi'
import { IGetResponse, IPagination } from '@/types/api.types'


export const brandApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllBrands: build.query<IGetResponse<IBrand>, IPagination>({
            query: (pagination) => ({
                url: 'brand',
                method: "GET",
                params: pagination
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.items.map(({ _id }) => ({ type: 'brand' as const, _id })),
                        { type: 'brand', id: 'LIST' },
                    ]
                    : [{ type: 'brand', id: 'LIST' }],
        }),
        addNewBrand: build.mutation<IBrand, ICreateBrand>({
            query: newBrand => ({
                url: '/brand',
                method: 'POST',
                body: newBrand
            }),
            invalidatesTags: [{ type: 'brand', id: 'LIST' }],
        }),
    }),
    overrideExisting: false,
})



export const { useGetAllBrandsQuery, useAddNewBrandMutation } = brandApi