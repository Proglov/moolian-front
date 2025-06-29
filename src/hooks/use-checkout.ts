import { useAddTransactionMutation } from "@/services/transaction";
import { useGetMeQuery, useUpdateUserMutation } from "@/services/users";
import { ICartProductItem, ResetCartProducts } from "@/store/CartProductsSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import useError from "./useError";


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
        if (!isLoggedIn)
            router.push('/auth/signin');
        if (!cart.length)
            router.push('/');
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

    useError(error, isError)

    useEffect(() => {
        if (isSuccess) {
            setAddresses(data.address)
            setTimeout(() => {
                form.reset()
            }, 100);
            setDialogIsOpen(false);
            toast.success('با موفقیت انجام شد')
        }
    }, [isSuccess, data, form, setAddresses])


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
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [addNewTransaction, { isError, error, isSuccess, isLoading, data }] = useAddTransactionMutation()

    useError(error, isError)

    useEffect(() => {
        if (isSuccess) {
            setStep(4);
            dispatch(ResetCartProducts());
            router.push(data.paymentUrl);
            // window.open(data.paymentUrl, '_blank');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, data, setStep])

    const submit = () => {
        const boughtProducts = cart.map(item => ({ productId: item._id, quantity: item.number, volume: item.volume }))
        addNewTransaction({ address, boughtProducts })
    }

    return { transactionSubmit: submit, isTransactionLoading: isLoading }
}