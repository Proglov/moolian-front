import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from '../ui/label'


export default function Transport() {
    return (
        <RadioGroup dir='rtl' defaultValue="0">
            <div className="min-h-20 border border-success rounded-lg p-2 flex items-center justify-start space-x-2 bg-success/10 hover:bg-success/20 transition-all duration-200 ease-in-out">
                <RadioGroupItem value='0' id='r0' />
                <Label htmlFor='r0'>
                    تیپاکس ( رایگان ) ۱ الی ۴ روز
                </Label>
            </div>
        </RadioGroup>
    )
}
