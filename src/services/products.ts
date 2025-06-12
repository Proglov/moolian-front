import { IGetResponse, IPagination } from '@/types/api.types'
import { baseApi } from './baseApi'
import { IAddRateProduct, ICreateProduct, IGetProductsQuery, IProduct, IProductGetByIds, IUpdateProduct } from '@/types/product.type'


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
        getAllProducts: build.query<IGetResponse<IProduct>, IGetProductsQuery>({
            query: (query) => ({
                url: 'product',
                method: "GET",
                params: query
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.items.map(({ _id }) => ({ type: 'product' as const, _id })),
                        { type: 'product', id: 'LIST' },
                    ]
                    : [{ type: 'product', id: 'LIST' }],
        }),
        getInfiniteProducts: build.infiniteQuery<IGetResponse<IProduct>, IGetProductsQuery, IPagination>({
            query: (query) => ({
                url: `product`,
                method: "GET",
                params: query
            }),
            infiniteQueryOptions: {
                // Must provide a default initial page param value
                initialPageParam: { page: 1, limit: 20 },
                // Optionally limit the number of cached pages
                maxPages: 20,
                // Must provide a `getNextPageParam` function
                getNextPageParam: (lastPage, _allPages, lastPageParam) => {
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
                    firstPageParam
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
            providesTags: ['product']
        }),
        getAllProductsByIds: build.mutation<IProductGetByIds[], { ids: string[] }>({
            query: (query) => ({
                url: 'product/ids',
                method: "POST",
                body: query
            }),
        }),
        getSingleProduct: build.query<IProduct, string>({
            query: (id) => ({
                url: `product/${id}`,
                method: "GET"
            }),
            providesTags: (_result, _error, id) => [{ type: 'product', id }, { type: 'product', id: 'LIST' }]
        }),
        updateProduct: build.mutation<IProduct, IUpdateProduct>({
            query: ({ _id, ...body }) => ({
                url: `/product/${_id}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: [{ type: 'product', id: 'LIST' }],
        }),
        addRateProduct: build.mutation<IProduct, IAddRateProduct>({
            query: ({ _id, count }) => ({
                url: `/product/${_id}/rate`,
                method: 'PATCH',
                body: { count }
            }),
            invalidatesTags: [{ type: 'product', id: 'LIST' }],
        }),
    }),
    overrideExisting: false,
})



export const { useGetAllProductsQuery, useGetAllProductsByIdsMutation, useAddNewProductMutation, useGetSingleProductQuery, useGetInfiniteProductsInfiniteQuery, useUpdateProductMutation, useAddRateProductMutation } = productApi