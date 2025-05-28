import { baseApi } from './baseApi'


export const emailOTPApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        isEmailOTPSent: build.query<boolean, void>({
            query: () => ({
                url: 'emailOTP/isSent',
                method: "GET",
            }),
            providesTags: ['emailOTP'],
            keepUnusedDataFor: 10,
        }),
        addNewEmailOTP: build.mutation<void, void>({
            query: newEmailOTP => ({
                url: '/emailOTP',
                method: 'POST',
                body: newEmailOTP
            }),
            invalidatesTags: ['emailOTP', { type: 'user', id: 'LIST' }],
        }),
    }),
    overrideExisting: false,
})



export const { useIsEmailOTPSentQuery, useAddNewEmailOTPMutation } = emailOTPApi