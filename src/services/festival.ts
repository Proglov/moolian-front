import { ICreateFestival, IFestival } from '@/types/festival'
import { baseApi } from './baseApi'
import { IGetResponse, IPagination } from '@/types/api.types'


export const festivalApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllFestivals: build.query<IGetResponse<IFestival>, IPagination>({
            query: (pagination) => ({
                url: 'festival',
                method: "GET",
                params: pagination
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.items.map(({ _id }) => ({ type: 'festival' as const, _id })),
                        { type: 'festival', id: 'LIST' },
                    ]
                    : [{ type: 'festival', id: 'LIST' }],
        }),
        addNewFestival: build.mutation<IFestival, ICreateFestival>({
            query: newFestival => ({
                url: '/festival',
                method: 'POST',
                body: newFestival
            }),
            invalidatesTags: [{ type: 'festival', id: 'LIST' }],
        }),
        deleteFestival: build.mutation<void, string>({
            query: (_id) => ({
                url: `/festival/${_id}`,
                method: 'Delete'
            }),
            invalidatesTags: [{ type: 'festival', id: 'LIST' }],
        }),
    }),
    overrideExisting: false,
})



export const { useGetAllFestivalsQuery, useDeleteFestivalMutation, useAddNewFestivalMutation } = festivalApi