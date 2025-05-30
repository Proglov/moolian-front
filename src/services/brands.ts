import { IBrand, ICreateBrand, IUpdateBrand } from '@/types/brand.type'
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
        updateBrand: build.mutation<IBrand, IUpdateBrand>({
            query: ({ _id, ...body }) => ({
                url: `/brand/${_id}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: [{ type: 'brand', id: 'LIST' }],
        }),
        deleteBrand: build.mutation<IBrand, string>({
            query: (id) => ({
                url: `/brand/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result) =>
                result
                    ? [
                        { type: 'brand' as const, _id: result._id },
                        { type: 'brand', id: 'LIST' },
                    ]
                    : [{ type: 'brand', id: 'LIST' }],
        }),
    }),
    overrideExisting: false,
})



export const { useGetAllBrandsQuery, useAddNewBrandMutation, useDeleteBrandMutation, useUpdateBrandMutation } = brandApi