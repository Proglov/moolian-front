import { useUpdateNoteMutation } from "@/services/notes"
import { useEffect, useState } from "react"
import { toast } from "@/components/ui/sonner"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { getChangedFields } from "@/lib/utils"
import { FormSchema } from "./use-addNote"
import { INote } from "@/types/note.type"
import _ from "lodash"
import useError from "./useError"
import { useAddImage } from "./use-addImage"

const EditFormSchema = FormSchema
type TForm = z.infer<typeof EditFormSchema>;
const resolver = zodResolver(EditFormSchema)


export function useEditNote(note: INote) {
    const form = useForm<TForm>({ resolver, defaultValues: note })
    const [updateNote, { isError, error, isLoading, isSuccess }] = useUpdateNoteMutation()
    const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
    const { data, uploadImage, fileState, setFileState } = useAddImage()

    useError(error, isError)

    useEffect(() => {
        if (isSuccess) {
            setDialogIsOpen(false);
            toast.success('نوت با موفقیت ویرایش شد')
        }
    }, [isSuccess, setDialogIsOpen])

    const updateNoteHandler = (newImageKey?: string) => {
        const values = form.getValues()
        const valuesWithImage = { ...values, imageKey: newImageKey ?? note.imageKey }
        const newObj = {
            _id: note._id,
            ...getChangedFields(note, valuesWithImage)
        }
        updateNote(newObj)
    }

    useEffect(() => {
        if (data) updateNoteHandler(data)
    }, [data, updateNote, form])

    //? if there is new image added, upload it and update the note in its useEffect, else wise, update the note here
    const submit = () => {
        if (fileState) uploadImage(fileState);
        else updateNoteHandler()
    }

    const handleOpenChange = (open: boolean) => {
        setDialogIsOpen(open);
        if (!open) {
            form.reset();
            setFileState(undefined);
        }
    };

    return {
        isLoading,
        dialogIsOpen,
        handleOpenChange,
        form,
        submit,
        fileState,
        setFileState,
    }
}