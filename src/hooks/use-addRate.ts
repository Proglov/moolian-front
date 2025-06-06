import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useError from "./useError";
import { toast } from "sonner";
import { useAddRateProductMutation } from "@/services/products";
import { useAppSelector } from "@/store/store";



const AddRateFormSchema = z.object({
    count: z.number().min(1, { message: 'حداقل امتیاز 1 است' }).max(5, { message: 'حداکثر امتیاز 5 است' })
})
export type TAddRateForm = z.infer<typeof AddRateFormSchema>;
const addRateDefaultValues: TAddRateForm = { count: 0 }
const addRateResolver = zodResolver(AddRateFormSchema)

export const useAddRate = () => {
    const form = useForm<TAddRateForm>({ resolver: addRateResolver, defaultValues: addRateDefaultValues })
    const [addRate, { isError, error, isSuccess, isLoading, data }] = useAddRateProductMutation()
    const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
    const userId = useAppSelector(state => state.auth._id)

    useError(error, isError)

    useEffect(() => {
        if (isSuccess) {
            setDialogIsOpen(false);
            toast.success('سپاس از امتیاز شما')
        }
    }, [isSuccess, data])

    const addRateSubmit = async ({ count }: TAddRateForm, _id: string) => {
        try {
            addRate({ _id, count })
        } catch (error) {
            return
        }
    }

    const onDialogOpen = () => {
        if (!userId) {
            toast.error('لطفا وارد حساب خود شوید')
            return
        }
        setDialogIsOpen(true);
        form.reset();
    }

    return { dialogIsOpen, form, setDialogIsOpen, isLoading, submit: addRateSubmit, onDialogOpen }
}
