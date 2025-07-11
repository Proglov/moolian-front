import { INote, ICreateNote, IUpdateNote } from '@/types/note.type'
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
        updateNote: build.mutation<INote, IUpdateNote>({
            query: ({ _id, ...body }) => ({
                url: `/note/${_id}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: [{ type: 'note', id: 'LIST' }],
        }),
        deleteNote: build.mutation<INote, string>({
            query: (id) => ({
                url: `/note/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result) =>
                result
                    ? [
                        { type: 'note' as const, _id: result._id },
                        { type: 'note', id: 'LIST' },
                    ]
                    : [{ type: 'note', id: 'LIST' }],
        })
    }),
    overrideExisting: false,
})



export const { useGetAllNotesQuery, useAddNewNoteMutation, useUpdateNoteMutation, useDeleteNoteMutation } = noteApi