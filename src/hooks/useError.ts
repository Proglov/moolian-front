import { isFetchBaseQueryError } from "@/lib/utils";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useEffect } from "react";
import { toast } from "sonner";


export default function useError(error: FetchBaseQueryError | SerializedError | undefined, isError: boolean) {
    useEffect(() => {
        if (isFetchBaseQueryError(error)) {
            const messages = (error.data as { message: string[] }).message;
            messages.map(message => toast.error(message))
        }
    }, [isError, error])
}