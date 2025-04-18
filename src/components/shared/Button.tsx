import { Loader2 } from "lucide-react"

import { Button as ShadCnButton } from "@/components/ui/button"
import { ComponentProps } from "react";

interface ButtonLoadingProps extends ComponentProps<typeof ShadCnButton> {
    loading?: boolean;
    children?: React.ReactNode;
}

function Button(props: ButtonLoadingProps) {
    if (props?.loading)
        return (
            <ShadCnButton {...props} disabled >
                <Loader2 className="animate-spin" />
                لطفا صبر کنید
            </ShadCnButton>
        )
    return (
        <ShadCnButton {...props}>
            {props.children}
        </ShadCnButton>
    )
}

export default Button