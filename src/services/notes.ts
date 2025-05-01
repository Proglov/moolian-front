import { INote, ICreateNote } from '@/types/note.type'
import { baseApi } from './baseApi'
import { IGetResponse, IPagination } from '@/types/api.types'


export const noteApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllNotes: build.query<IGetResponse<INote>, IPagination>({
            query: (pagination) => ({
                url: 'note',
                method: "GET",
                params: pagination
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.items.map(({ _id }) => ({ type: 'note' as const, _id })),
                        { type: 'note', id: 'LIST' },
                    ]
                    : [{ type: 'note', id: 'LIST' }],
        }),
        addNewNote: build.mutation<INote, ICreateNote>({
            query: newNote => ({
                url: '/note',
                method: 'POST',
                body: newNote
            }),
            invalidatesTags: [{ type: 'note', id: 'LIST' }],
        }),
    }),
    overrideExisting: false,
})



export const { useGetAllNotesQuery, useAddNewNoteMutation } = noteApi