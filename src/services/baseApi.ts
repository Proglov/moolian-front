import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'


const baseUrl = process.env.NEXT_PUBLIC_BackEnd_API;


// create a new mutex
const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
    baseUrl,
    credentials: 'include',
})
const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock()
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
        // checking whether the mutex is locked
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()
            try {
                const refreshResult = await baseQuery(
                    { url: '/auth/user/refresh', method: 'POST' },
                    { ...api, forced: true },
                    extraOptions,
                )

                // if the request is ok
                if (!refreshResult?.error) {
                    // api.dispatch(tokenReceived(refreshResult.data))
                    // retry the initial query
                    result = await baseQuery(args, api, extraOptions)
                }
            } finally {
                // release must be called once the mutex should be released again.
                release()
            }
        } else {
            // wait until the mutex is available without locking it
            await mutex.waitForUnlock()
            result = await baseQuery(args, api, extraOptions)
        }
    }
    return result
}

// initialize an empty api service that we'll inject endpoints into later as needed
export const baseApi = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({})
}).enhanceEndpoints({
    addTagTypes: ['product', 'user', 'brand', 'note', 'comment', 'transaction', 'festival', 'emailOTP']
})