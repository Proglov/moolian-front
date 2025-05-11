import { useEffect, useRef, useState } from "react"
import { toast } from "@/components/ui/sonner"
import { useUploadImageMutation } from "@/services/image"
import { isFetchBaseQueryError } from "@/lib/utils"

type TProgress = 'PENDING' | 'COMPLETE' | 'ERROR' | number

type FileWithMeta = {
    file: File
    key: string
    progress: TProgress
}

export function useAddImages() {
    const [uploadImage] = useUploadImageMutation()
    const [fileStates, setFileStates] = useState<FileWithMeta[]>([])
    const [uploadRes, setUploadRes] = useState<string[]>([])
    const intervalRefs = useRef<Record<string, NodeJS.Timeout>>({})

    // Cleanup intervals on unmount
    useEffect(() => {
        const intervals = intervalRefs.current;
        return () => {
            Object.values(intervals).forEach(clearInterval);
        }
    }, []);


    const updateFileProgress = (key: string, progress: TProgress) => {
        setFileStates(prev => prev.map(file =>
            file.key === key ? { ...file, progress } : file
        ))
    }

    const startProgressAnimation = (key: string) => {
        let temp = 0
        intervalRefs.current[key] = setInterval(() => {
            temp = Math.min(temp + 1, 50)
            updateFileProgress(key, temp)
        }, 10)
    }

    const stopProgressAnimation = (key: string) => {
        if (intervalRefs.current[key]) {
            clearInterval(intervalRefs.current[key])
            delete intervalRefs.current[key]
        }
    }

    const onFilesAdded = async (addedFiles: FileWithMeta[]) => {
        setFileStates(prev => [...prev, ...addedFiles])

        await Promise.allSettled(
            addedFiles.map(async (addedFile) => {
                try {
                    startProgressAnimation(addedFile.key)

                    const result = await uploadImage(addedFile.file).unwrap()

                    stopProgressAnimation(addedFile.key)
                    updateFileProgress(addedFile.key, 'COMPLETE')
                    setUploadRes(prev => [...prev, result])
                } catch (err) {
                    stopProgressAnimation(addedFile.key)
                    updateFileProgress(addedFile.key, 'ERROR')

                    if (isFetchBaseQueryError(err)) {
                        const messages = (err.data as { message: string[] })?.message || ['Upload failed']
                        messages.forEach(message => toast.error(message))
                    }
                }
            })
        )
    }

    const onImageDelete = (id: string) => setUploadRes(prev => prev.filter(key => key !== id))

    const onFinished = () => {
        setFileStates([])
        setUploadRes([])
    }

    return {
        onFilesAdded,
        fileStates,
        setFileStates,
        uploadRes,
        onImageDelete,
        onFinished
    }
}
