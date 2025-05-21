import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from '../ui/label'
import Button from "../shared/Button"

interface PaymentProps {
    submit: () => void;
    loading: boolean;
}

export default function Payment({ submit, loading }: PaymentProps) {
    return (
        <>
            <RadioGroup dir='rtl' defaultValue="0">
                <div className="min-h-20 border border-success rounded-lg p-2 flex items-center justify-start space-x-2 bg-success/10 hover:bg-success/20 transition-all duration-200 ease-in-out">
                    <RadioGroupItem value='0' id='r0' />
                    <Label htmlFor='r0'>
                        پرداخت نقدی
                    </Label>
                </div>
                <div className="min-h-20 border border-muted rounded-lg p-2 flex items-center justify-start space-x-2 bg-muted/30 text-muted-foreground/90">
                    <RadioGroupItem value='1' id='r1' disabled />
                    <Label htmlFor='r1'>
                        پرداخت آنلاین (به زودی)
                    </Label>
                </div>
            </RadioGroup>


            <div className="w-full flex justify-center">
                <Button
                    className="mt-5"
                    onClick={submit}
                    loading={loading}
                >
                    نهایی کردن خرید
                </Button>
            </div>
        </>
    )
}
