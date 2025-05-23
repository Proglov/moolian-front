import { isFetchBaseQueryError } from "@/lib/utils";
import { useAddNewCommentMutation, useDisLikeCommentMutation, useGetAllCommentsOfAProductQuery, useLikeCommentMutation } from "@/services/comments";
import { useAppSelector } from "@/store/store";
import { IArrangedComment, IComment } from "@/types/comment.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useInView } from "react-intersection-observer";
import { toast } from "sonner";
import { z } from "zod";



type TCommentStatus = 1 | -1 | 0 //? 1: liked by the user, -1: disliked, 0: no interaction
function getStatus(comment: IComment, userId: string): TCommentStatus {
    if (comment.likeIds.includes(userId)) return 1;
    if (comment.disLikeIds.includes(userId)) return -1;
    return 0;
}

function arrangeComments(oldComments: IArrangedComment[], newComments: IComment[], userId: string, page: number): IArrangedComment[] {
    const oldCommentsParentsMap = new Map<string, IArrangedComment>();
    const oldCommentsChildrenMap = new Map<string, IArrangedComment>();
    const newCommentsMap = new Map<string, IArrangedComment>();
    const roots: IArrangedComment[] = [];

    oldComments.forEach(comment => {
        oldCommentsParentsMap.set(comment._id, comment)
        comment.childrenComments?.map(child => oldCommentsChildrenMap.set(child._id, child))
        roots.push(comment);
    })
    newComments.forEach(comment => newCommentsMap.set(comment._id, {
        _id: comment._id,
        body: comment.body,
        userId: comment.userId,
        productId: comment.productId,
        parentCommentId: comment.parentCommentId,
        status: getStatus(comment, userId),
        likes: comment.likeIds.length,
        disLikes: comment.disLikeIds.length,
        page
    }));

    newComments.forEach(newComment => {
        const sameNode = oldCommentsParentsMap.get(newComment._id) || oldCommentsChildrenMap.get(newComment._id)

        // we already have the comment in the old array
        if (sameNode) {
            sameNode.status = getStatus(newComment, userId);
            sameNode.likes = newComment.likeIds.length;
            sameNode.disLikes = newComment.disLikeIds.length;
        } else {
            const parent = newComment.parentCommentId ? oldCommentsParentsMap.get(newComment.parentCommentId) || newCommentsMap.get(newComment.parentCommentId) : undefined;

            if (parent) {
                if (!parent.childrenComments) parent.childrenComments = [];
                parent.childrenComments.push(newCommentsMap.get(newComment._id) as IArrangedComment);
            } else {
                roots.push(newCommentsMap.get(newComment._id) as IArrangedComment)
            }
        }
    })


    return roots;
}


export default function useComment(productId: string) {
    const limit = 20;
    const { ref, inView } = useInView();
    const [page, setPage] = useState(1)
    const [refetchPage, setRefetchPage] = useState(0)
    const [comments, setComments] = useState<IArrangedComment[]>([])
    const [isFinished, setIsFinished] = useState(false)
    const userId = useAppSelector(state => state.auth._id)
    const { data, isSuccess, isFetching } = useGetAllCommentsOfAProductQuery({ _id: productId, page: refetchPage || page, limit })
    const [likeComment, { isError: isLikingError, error: likingError }] = useLikeCommentMutation()
    const [disLikeComment, { isError: isDisLikingError, error: disLikingError }] = useDisLikeCommentMutation()
    const { dialogIsOpen, form, isLoading: isAddCommentLoading, setDialogIsOpen, parentReplyingComment, submit, onDialogOpen } = useAddComment(productId, userId)

    const handleLike = async (commentId: string, isLike: boolean, page: number) => {
        if (!userId) {
            toast.error('ابتدا وارد شوید')
            return
        }
        try {
            if (isLike) await likeComment({ _id: commentId, page, productId, userId, limit })
            else await disLikeComment({ _id: commentId, page, productId, userId, limit })
            setRefetchPage(page)
        } catch (error) {
            return
        }
    };


    useEffect(() => {
        if (isSuccess) {
            setComments(arrangeComments(comments, data.items, userId, refetchPage || page));
            setIsFinished(data.count <= page * limit);
            setRefetchPage(0);
        }
    }, [data, isSuccess, setIsFinished]);

    useEffect(() => {
        if (inView && !isFinished && comments.length && !isFetching) {
            setPage(prev => prev + 1)
        }
    }, [inView, isFinished, comments.length, isFetching, setPage]);

    useEffect(() => {
        if (isFetchBaseQueryError(likingError)) {
            const messages = (likingError.data as { message: string[] }).message;
            messages.map(message => toast.error(message))
        }
    }, [isLikingError, likingError])

    useEffect(() => {
        if (isFetchBaseQueryError(disLikingError)) {
            const messages = (disLikingError.data as { message: string[] }).message;
            messages.map(message => toast.error(message))
        }
    }, [isDisLikingError, disLikingError])

    return {
        comments,
        ref,
        isFinished,
        handleLike,
        dialogIsOpen,
        form,
        isAddCommentLoading,
        setDialogIsOpen,
        parentReplyingComment,
        submit,
        onDialogOpen
    }
}


const FormSchema = z.object({
    body: z.string().nonempty({ message: 'متن دیدگاه الزامیست' }),
})
export type TAddCommentForm = z.infer<typeof FormSchema>;
const defaultValues: TAddCommentForm = { body: '' }
const resolver = zodResolver(FormSchema)

const useAddComment = (productId: string, userId: string) => {
    const form = useForm<TAddCommentForm>({ resolver, defaultValues })
    const [addNewComment, { isError, error, isLoading, isSuccess }] = useAddNewCommentMutation()
    const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
    const [parentReplyingComment, setParentReplyingComment] = useState<{ _id: string; name: string } | null>(null);

    useEffect(() => {
        if (isSuccess) {
            setDialogIsOpen(false);
            toast.success('دیدگاه شما با موفقیت افزوده شد. پس از بررسی به سایت اضافه خواهد شد')
        }
    }, [isSuccess])

    useEffect(() => {
        if (isFetchBaseQueryError(error)) {
            const messages = (error.data as { message: string[] }).message;
            messages.map(message => toast.error(message))
        }
    }, [isError, error])


    const submit = ({ body }: TAddCommentForm) => {
        addNewComment({ productId, body, parentCommentId: parentReplyingComment?._id || undefined });
        setParentReplyingComment(null)
    }

    const onDialogOpen = (parentCommentId?: string, replyingName?: string) => {
        if (!userId) {
            toast.error('لطفا وارد حساب خود شوید')
            return
        }
        setDialogIsOpen(true);
        form.reset();
        if (parentCommentId && replyingName) setParentReplyingComment({ _id: parentCommentId, name: replyingName })
        else setParentReplyingComment(null)
    }

    return {
        isLoading,
        dialogIsOpen,
        setDialogIsOpen,
        form,
        submit,
        parentReplyingComment,
        onDialogOpen
    }
}