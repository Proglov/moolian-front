import { useState } from "react"
import { useUploadImageMutation } from "@/services/image"
import useError from "./useError"



export function useAddImage() {
    const [uploadImage, { data, isError: isErrorUpload, error: errorUpload }] = useUploadImageMutation()
    const [fileState, setFileState] = useState<File | undefined>(undefined);

    useError(errorUpload, isErrorUpload)


    return {
        fileState,
        setFileState,
        data,
        uploadImage,
        isErrorUpload
    }
}