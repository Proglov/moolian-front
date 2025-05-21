import { isFetchBaseQueryError } from "@/lib/utils";
import { useAddTransactionMutation } from "@/services/transaction";
import { useGetMeQuery, useUpdateUserMutation } from "@/services/users";
import { ICartProductItem } from "@/store/CartProductsSlice";
import { useAppSelector } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";


export function useCheckout() {
    const { isLoggedIn, isAuthLoaded } = useAppSelector(state => state.auth)
    const cart = useAppSelector(state => state.CartProducts)
    const router = useRouter()
    const [tab, setTab] = useState("address");
    const [step, setStep] = useState(1);
    const [addresses, setAddresses] = useState<string[]>([]);
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
    const { data, isSuccess } = useGetMeQuery()
    const { addressDialogIsOpen, addressForm, setAddressDialogIsOpen, addressSubmit, isAddressLoading, onAddressDelete } = useAddAddress(addresses, setAddresses)
    const { transactionSubmit, isTransactionLoading } = useAddTransaction(addresses[selectedAddressIndex], cart, setStep)

    useEffect(() => {
        if (isSuccess) {
            setAddresses(data.address)
        }
    }, [data, isSuccess])

    const confirmAddress = () => {
        if (addresses[selectedAddressIndex] === undefined) {
            toast.error('لطفا یک آدرس انتخاب کنید')
            return
        }
        setStep(2);
        setTab("transport");
    }

    useEffect(() => {
        if (!isAuthLoaded) return;
        if (!isLoggedIn) {
            router.push('/auth/signin');
        }
    }, [isLoggedIn, isAuthLoaded, router]);


    return {
        tab,
        setTab,
        step,
        setStep,
        addresses,
        addressDialogIsOpen,
        addressForm,
        setAddressDialogIsOpen,
        addressSubmit,
        isAddressLoading,
        selectedAddressIndex,
        setSelectedAddressIndex,
        onAddressDelete,
        confirmAddress,
        transactionSubmit,
        isTransactionLoading
    }
}


const addressFormSchema = z.object({
    address: z.string().nonempty({ message: 'آدرس الزامیست' }),
})
export type TAddressForm = z.infer<typeof addressFormSchema>;
const addressDefaultValues: TAddressForm = { address: '' }
const addressResolver = zodResolver(addressFormSchema)

const useAddAddress = (previousAddresses: string[], setAddresses: Dispatch<SetStateAction<string[]>>) => {
    const form = useForm<TAddressForm>({ resolver: addressResolver, defaultValues: addressDefaultValues })
    const [addNewAddresses, { isError, error, isSuccess, isLoading, data }] = useUpdateUserMutation()
    const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);

    useEffect(() => {
        if (isSuccess) {
            setAddresses(data.address)
            setTimeout(() => {
                form.reset()
            }, 100);
            setDialogIsOpen(false);
            toast.success('با موفقیت انجام شد')
        }
    }, [isSuccess, data])

    useEffect(() => {
        if (isFetchBaseQueryError(error)) {
            const messages = (error.data as { message: string[] }).message;
            messages.map(message => toast.error(message))
        }
    }, [isError, error])


    const submit = (data: TAddressForm) => {
        const address = [data.address, ...previousAddresses]
        addNewAddresses({ address })
    }

    const onAddressDelete = (index: number) => {
        const newAddresses = [...previousAddresses]
        newAddresses.splice(index, 1)
        addNewAddresses({ address: newAddresses })
    }

    return { addressDialogIsOpen: dialogIsOpen, addressForm: form, setAddressDialogIsOpen: setDialogIsOpen, addressSubmit: submit, isAddressLoading: isLoading, onAddressDelete }
}

const useAddTransaction = (address: string, cart: ICartProductItem[], setStep: Dispatch<SetStateAction<number>>) => {
    const [addNewTransaction, { isError, error, isSuccess, isLoading, data }] = useAddTransactionMutation()

    useEffect(() => {
        if (isSuccess) {
            setStep(4);
        }
    }, [isSuccess, data])

    useEffect(() => {
        if (isFetchBaseQueryError(error)) {
            const messages = (error.data as { message: string[] }).message;
            messages.map(message => toast.error(message))
        }
    }, [isError, error])


    const submit = () => {
        const boughtProducts = cart.map(item => ({ productId: item._id, quantity: item.number, volume: item.volume }))
        addNewTransaction({ address, boughtProducts })
    }

    return { transactionSubmit: submit, isTransactionLoading: isLoading }
}