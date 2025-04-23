import { baseApi } from './baseApi'
import { ISigninEmailOrUsername, ISigninPhone, ISignup } from '@/types/auth.type'


export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        signup: build.mutation<void, ISignup>({
            query: body => ({
                url: '/auth/user//sign-up',
                method: 'POST',
                body: body
            }),
        }),
        signinPhone: build.mutation<void, ISigninPhone>({
            query: body => ({
                url: '/auth/user/sign-in/phone',
                method: 'POST',
                body: body
            }),
        }),
        signinEmailOrUsername: build.mutation<void, ISigninEmailOrUsername>({
            query: body => ({
                url: '/auth/user/sign-in/email-username',
                method: 'POST',
                body: body
            }),
        }),
        logout: build.mutation<void, void>({
            query: () => ({
                url: '/auth/user/logout',
                method: 'POST'
            }),
        }),
    }),
    overrideExisting: false,
})



export const { useLogoutMutation, useSigninEmailOrUsernameMutation, useSigninPhoneMutation, useSignupMutation } = authApi