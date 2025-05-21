import React, { Dispatch, SetStateAction } from 'react'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from '../ui/label'
import AddressDialog from './AddressDialog'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'
import { TAddressForm } from '@/hooks/use-checkout'
import Button from '../shared/Button'
import { Plus } from 'lucide-react'
import { FaTrash } from 'react-icons/fa'
import Spinner from '../shared/Spinner'
import { cn } from '@/lib/utils'

interface IProps {
    addresses: string[],
    dialogIsOpen: boolean,
    setDialogIsOpen: Dispatch<SetStateAction<boolean>>,
    form: UseFormReturn<TAddressForm>,
    submit: SubmitHandler<{ address: string; }>,
    isLoading: boolean,
    selectedAddressIndex: number,
    setSelectedAddressIndex: Dispatch<SetStateAction<number>>
    onAddressDelete: (index: number) => void
}

export default function Address({ addresses, dialogIsOpen, form, isLoading, setDialogIsOpen, submit, selectedAddressIndex, setSelectedAddressIndex, onAddressDelete }: IProps) {

    if (isLoading) return (
        <div className='w-full flex justify-center'>
            <Spinner />
        </div>
    )

    return (
        <div>
            <AddressDialog dialogIsOpen={dialogIsOpen} form={form} isLoading={isLoading} setDialogIsOpen={setDialogIsOpen} submit={submit} />

            <Button
                variant='outline'
                className='mb-5 border-success/50 text-success hover:bg-success/10'
                onClick={() => setDialogIsOpen(true)}
            >
                <Plus />
                افزودن آدرس جدید
            </Button>

            {
                addresses.length === 0 ? (
                    <div className='w-full flex justify-center'>
                        <p className='text-destructive text-center'>لطفا یک آدرس اضافه کنید</p>
                    </div>
                )
                    :
                    (
                        <RadioGroup dir='rtl' value={selectedAddressIndex.toString()}
                            onValueChange={value => setSelectedAddressIndex(Number(value))}>
                            {
                                addresses.map((address, index) => (
                                    <div key={index} className={cn(
                                        "flex items-center justify-between space-x-2 min-h-20 border border-success rounded-lg p-5",
                                        selectedAddressIndex === index ? "bg-success/10" : "bg-transparent",
                                        "hover:bg-success/20 transition-all duration-200 ease-in-out"
                                    )} onClick={() => setSelectedAddressIndex(index)}>
                                        <div className='flex items-center space-x-2 w-[90%] text-justify'>
                                            <RadioGroupItem value={index.toString()} id={`r${index}`} />
                                            <Label htmlFor={`r${index}`}>{address}</Label>
                                        </div>

                                        <FaTrash className='text-destructive hover:cursor-pointer' onClick={() => onAddressDelete(index)} />
                                    </div>
                                ))
                            }
                        </RadioGroup>
                    )
            }


        </div>
    )
}
