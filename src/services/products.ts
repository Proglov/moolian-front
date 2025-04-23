import { IGetResponse, IPagination } from '@/types/api.types'
import { baseApi } from './baseApi'
import { ICreateProduct, IProduct, IUpdateProduct } from '@/types/product.type'


export const productApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        addNewProduct: build.mutation<IProduct, ICreateProduct>({
            query: newProduct => ({
                url: '/product',
                method: 'POST',
                body: newProduct
            }),
            invalidatesTags: [{ type: 'product', id: 'LIST' }],
        }),
        getAllProducts: build.query<IGetResponse<IProduct>, IPagination>({
            query: (pagination) => ({
                url: 'product',
                method: "GET",
                params: pagination
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.items.map(({ _id }) => ({ type: 'product' as const, _id })),
                        { type: 'product', id: 'LIST' },
                    ]
                    : [{ type: 'product', id: 'LIST' }],
        }),
        getSingleProduct: build.query<IProduct, string>({
            query: (id) => ({
                url: `product/${id}`,
                method: "GET"
            }),
            providesTags: (_result, _error, id) => [{ type: 'product', id }]
        }),
        getInfiniteProducts: build.infiniteQuery<IGetResponse<IProduct>, void, IPagination>({
            infiniteQueryOptions: {
                // Must provide a default initial page param value
                initialPageParam: { page: 1, limit: 10 },
                // Optionally limit the number of cached pages
                maxPages: 20,
                // Must provide a `getNextPageParam` function
                getNextPageParam: (lastPage, _allPages, lastPageParam, _allPageParams) => {
                    if (!lastPageParam.page || !lastPageParam.limit) return { ...lastPageParam, page: 2 }
                    const nextPage = lastPageParam.page + 1

                    //should return undefined if the next page doesn't exists 
                    if (lastPage?.count <= (lastPageParam.page * lastPageParam.limit)) {
                        return undefined
                    }

                    return {
                        ...lastPageParam,
                        page: nextPage,
                    }
                },
                getPreviousPageParam: (
                    _firstPage,
                    _allPages,
                    firstPageParam,
                    _allPageParams,
                ) => {
                    if (!firstPageParam.page) return undefined
                    const prevPage = firstPageParam.page - 1
                    if (prevPage < 0) return undefined

                    return {
                        ...firstPageParam,
                        page: prevPage,
                    }
                },
            },
            query: ({ pageParam: pagination }) => ({
                url: `product`,
                method: "GET",
                params: pagination
            }),
            providesTags: ['product']
        }),
        updateProduct: build.mutation<IProduct, IUpdateProduct>({
            query: ({ _id, ...body }) => ({
                url: `/product/${_id}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: [{ type: 'product', id: 'LIST' }],
        }),
    }),
    overrideExisting: false,
})



export const { useGetAllProductsQuery, useAddNewProductMutation, useGetSingleProductQuery, useGetInfiniteProductsInfiniteQuery, useUpdateProductMutation } = productApi