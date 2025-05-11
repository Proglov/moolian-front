import { useEffect, useState } from "react"
import { toast } from "@/components/ui/sonner"
import { useUploadImageMutation } from "@/services/image"
import { isFetchBaseQueryError } from "@/lib/utils"



export function useAddImage() {
    const [uploadImage, { data, isError: isErrorUpload, error: errorUpload }] = useUploadImageMutation()
    const [fileState, setFileState] = useState<File | undefined>(undefined);

    useEffect(() => {
        if (isFetchBaseQueryError(errorUpload)) {
            const messages = (errorUpload.data as { message: string[] }).message;
            messages.map(message => toast.error(message))
        }
    }, [isErrorUpload, errorUpload])


    return {
        fileState,
        setFileState,
        data,
        uploadImage,
        isErrorUpload
    }
}