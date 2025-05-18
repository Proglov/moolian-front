'use client'
import Button from "@/components/shared/Button";
import Spinner from "@/components/shared/Spinner";
import useComment from "@/hooks/use-comment";
import { cn } from "@/lib/utils";
import { IArrangedComment } from "@/types/comment.type";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { MessageCircle, ThumbsUp, ThumbsDown, CircleFadingPlus } from "lucide-react";
import { FaUserCircle } from "react-icons/fa";
import AddCommentDialog from "./AddCommentDialog";

export default function Comments({ productId }: { productId: string }) {
    const { comments, ref, isFinished, handleLike, dialogIsOpen, form, isAddCommentLoading, setDialogIsOpen, parentReplyingComment, submit, onDialogOpen } = useComment(productId);

    const CommonComponent = (
        <>
            <AddCommentDialog dialogIsOpen={dialogIsOpen} form={form} isLoading={isAddCommentLoading} setDialogIsOpen={setDialogIsOpen} submit={submit} parentName={parentReplyingComment?.name} />

            <Button variant='outline' size='lg' onClick={() => onDialogOpen()} className="flex items-center gap-2 cursor-pointer text-base my-4 border-success text-success hover:text-success">
                <CircleFadingPlus />
                <span>افزودن دیدگاه</span>
            </Button>
        </>
    )

    if (!comments) return null


    if (!comments.length) return (
        <div>
            هنوز دیدگاهی ثبت نشده است. نظر خود را با ما در میان بگذارید!
            {CommonComponent}
        </div>
    )

    return (
        <div>
            {CommonComponent}
            {
                comments.map(comment => (
                    <CommentComponent key={comment._id} comment={comment} handleLike={handleLike} onDialogOpen={onDialogOpen} />
                ))
            }
            {!isFinished && <div className="w-full flex justify-center" ref={ref}><Spinner /></div>}
        </div>
    )
}

const CommentComponent = (
    {
        comment,
        handleLike,
        onDialogOpen
    }: {
        comment: IArrangedComment,
        onDialogOpen: (parentCommentId?: string, replyingName?: string) => void
        handleLike: (commentId: string, isLike: boolean, page: number) => void
    }) => (
    <div className="mb-4">
        <div className="flex items-start gap-3 rounded-lg border border-muted/40 bg-card px-4 py-3 shadow-sm">

            {/* User avatar or icon */}
            <div className="flex-shrink-0">
                <FaUserCircle className="w-8 h-8 text-muted-foreground" />
            </div>

            <div className="flex-1">
                {/* User name */}
                <div className="text-sm text-purple-700 mb-1">
                    {comment.userId.name}
                </div>

                {/* Comment body */}
                <div className="text-base text-foreground mb-2">
                    {comment.body}
                </div>

                {/* Actions: Like, Dislike, Reply */}
                <div className="flex items-center gap-4 text-sm">
                    {/* Like */}
                    <Button className="flex items-center gap-1" variant='ghost' onClick={() => handleLike(comment._id, true, comment.page)}>
                        <ThumbsUp
                            size={18}
                            className={cn(
                                "cursor-pointer transition-colors",
                                comment.status === 1 ? "text-green-600" : "text-muted-foreground"
                            )}
                        />
                        <span>{digitsEnToFa(comment.likes)}</span>
                    </Button>
                    {/* Dislike */}
                    <Button className="flex items-center gap-1" variant='ghost' onClick={() => handleLike(comment._id, false, comment.page)}>
                        <ThumbsDown
                            size={18}
                            className={cn(
                                "cursor-pointer transition-colors",
                                comment.status === -1 ? "text-red-600" : "text-muted-foreground"
                            )}
                        />
                        <span>{digitsEnToFa(comment.disLikes)}</span>
                    </Button>
                    {/* Reply  */}
                    <Button variant='ghost' onClick={() => onDialogOpen(comment.parentCommentId || comment._id, comment.userId.name)} className="flex items-center gap-1 text-muted-foreground cursor-pointer pr-0">
                        <MessageCircle size={18} />
                        <span>پاسخ</span>
                    </Button>
                </div>
            </div>
        </div>

        {/* Render children comments (if any) */}
        {(Array.isArray(comment.childrenComments) && comment.childrenComments.length > 0) && (
            <div className="mr-6 mt-2 border-r-10 rounded-2xl rounded-t-none border-success/40 pr-4">
                {comment.childrenComments.map((child: any) => (
                    <CommentComponent key={child._id} comment={child} handleLike={handleLike} onDialogOpen={onDialogOpen} />
                ))}
            </div>
        )}
    </div>
);