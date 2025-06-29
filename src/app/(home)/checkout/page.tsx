'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Address from "@/components/checkout/Address"
import Button from "@/components/shared/Button"
import Info from "@/components/checkout/Info"
import { useCheckout } from "@/hooks/use-checkout"
import Payment from "@/components/checkout/Payment"
import Transport from "@/components/checkout/Transport"


export default function Page() {
    const { setStep, setTab, step, tab, addresses, addressDialogIsOpen, addressForm, addressSubmit, setAddressDialogIsOpen, isAddressLoading, selectedAddressIndex, setSelectedAddressIndex, onAddressDelete, confirmAddress, isTransactionLoading, transactionSubmit } = useCheckout()

    if (step === 4) {
        <div className='w-full max-w-xl mx-auto mt-5'>
            در حال انتقال ...
        </div>
    }

    return (
        <div className='w-full max-w-xl mx-auto mt-5'>
            <Tabs value={tab} onValueChange={setTab} className="w-full" dir="rtl">
                <TabsList>
                    <TabsTrigger value="address">آدرس</TabsTrigger>
                    <TabsTrigger value="transport" disabled={step < 2}>زمان ارسال</TabsTrigger>
                    <TabsTrigger value="payment" disabled={step < 3}>نحوه پرداخت</TabsTrigger>
                </TabsList>

                <Info address={addresses[selectedAddressIndex]} />

                <div className="border border-muted-foreground/50 rounded-lg p-5 w-full">

                    <TabsContent value="address">
                        <Address addresses={addresses} dialogIsOpen={addressDialogIsOpen} form={addressForm} isLoading={isAddressLoading} setDialogIsOpen={setAddressDialogIsOpen} submit={addressSubmit} selectedAddressIndex={selectedAddressIndex} setSelectedAddressIndex={setSelectedAddressIndex} onAddressDelete={onAddressDelete} />

                        {
                            step === 1 && (
                                <div className="w-full flex justify-center">
                                    <Button
                                        className="mt-5"
                                        onClick={confirmAddress}
                                        disabled={!addresses || addresses.length === 0}
                                    >
                                        تایید آدرس و ادامه
                                    </Button>
                                </div>
                            )
                        }
                    </TabsContent>

                    <TabsContent value="transport">
                        <Transport />

                        {
                            step === 2 && (
                                <div className="w-full flex justify-center">
                                    <Button
                                        className="mt-5"
                                        onClick={() => {
                                            setStep(3);
                                            setTab("payment");
                                        }}
                                    >
                                        تایید و ادامه
                                    </Button>
                                </div>
                            )}
                    </TabsContent>

                    <TabsContent value="payment">
                        <Payment submit={transactionSubmit} loading={isTransactionLoading} />
                    </TabsContent>

                </div>
            </Tabs>

        </div>
    )
}
