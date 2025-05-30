import { Check } from "lucide-react";
import Button from "@/components/shared/Button";
import { useToggleCommentMutation } from "@/services/comments";
import useError from "@/hooks/useError";



export default function ToggleComment({ _id, validated }: { _id: string, validated: boolean }) {
    const [toggleComment, { isLoading, error, isError }] = useToggleCommentMutation()

    useError(error, isError)

    if (validated) return null

    return (
        <Button className="m-3 border-success text-success" variant='outline' size='sm' disabled={isLoading} onClick={() => { toggleComment(_id) }}>
            <Check />
            تایید
        </Button>

    )
}
