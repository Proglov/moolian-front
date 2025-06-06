import { IChangePAssword, IFullUser, IUpdateUser, IUser } from '@/types/user.type'
import { baseApi } from './baseApi'
import { IGetResponse, IPagination } from '@/types/api.types'


export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getMe: build.query<IUser, void>({
            query: () => ({
                url: '/users/get-me',
                method: 'GET'
            }),
            providesTags: [{ type: 'user', id: 'LIST' }],
        }),
        isAdmin: build.query<boolean, void>({
            query: () => ({
                url: '/users/admin',
                method: 'GET'
            }),
        }),
        getAllUsers: build.query<IGetResponse<IUser>, IPagination>({
            query: (pagination) => ({
                url: 'users',
                method: "GET",
                params: pagination
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.items.map(({ _id }) => ({ type: 'user' as const, _id })),
                        { type: 'user', id: 'LIST' },
                    ]
                    : [{ type: 'user', id: 'LIST' }],
        }),
        getAUser: build.query<IFullUser, { id: string }>({
            query: ({ id }) => ({
                url: `users/${id}`,
                method: "GET"
            }),
            providesTags: (result) =>
                result
                    ? [
                        { type: 'user' as const, _id: result._id },
                        { type: 'user', id: 'LIST' },
                    ]
                    : [{ type: 'user', id: 'LIST' }],
        }),
        updateUser: build.mutation<IUser, IUpdateUser>({
            query: (body) => ({
                url: `/users`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: [{ type: 'user', id: 'LIST' }],
        }),
        changePassword: build.mutation<void, IChangePAssword>({
            query: (body) => ({
                url: `/users/password`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: [{ type: 'user', id: 'LIST' }],
        }),
    }),
    overrideExisting: false,
})



export const { useGetMeQuery, useGetAllUsersQuery, useGetAUserQuery, useUpdateUserMutation, useIsAdminQuery, useChangePasswordMutation } = userApi