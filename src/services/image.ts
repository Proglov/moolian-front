import { baseApi } from './baseApi'


export const imageApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        uploadImage: build.mutation<string, File | undefined>({
            query: newImage => {
                const data = new FormData();
                data.append("file", newImage as File)

                return {
                    url: '/image',
                    method: 'POST',
                    body: data,
                    responseHandler: (response) => response.text(),
                }
            },
        }),
    }),
    overrideExisting: false,
})



export const { useUploadImageMutation } = imageApi