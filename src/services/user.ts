import { IUserGetMe } from '@/types/user'
import { baseApi } from './baseApi'


export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getMe: build.query<IUserGetMe, void>({
            query: () => ({
                url: '/users/get-me',
                method: 'GET'
            }),
        })
    }),
    overrideExisting: false,
})



export const { useGetMeQuery } = userApi