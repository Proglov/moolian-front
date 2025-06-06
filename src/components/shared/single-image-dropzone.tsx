'use client';
import { UploadCloudIcon, X } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';
import { useDropzone, DropzoneOptions } from 'react-dropzone';
import { twMerge } from 'tailwind-merge';
import Button from './Button';

const variants = {
    base: 'relative rounded-md flex justify-center items-center flex-col cursor-pointer min-h-[150px] min-w-[200px] border border-dashed border-gray-400 transition-colors duration-200 ease-in-out',
    image: 'border-0 p-0 min-h-0 min-w-0 relative shadow-md bg-slate-200 rounded-md',
    active: 'border-2',
    disabled: 'bg-gray-200 border-gray-300 cursor-default pointer-events-none bg-opacity-30',
    accept: 'border border-blue-500 bg-blue-500 bg-opacity-10',
    reject: 'border border-red-700 bg-red-700 bg-opacity-10',
};

const ERROR_MESSAGES = {
    fileTooLarge(maxSize: number) {
        return `اندازه این فایل بیش از حد مجاز است. حد مجاز ${formatFileSize(maxSize)} است.`;
    },
    fileInvalidType() {
        return 'فقط ارسال تصویر امکان پذیر است';
    },
    tooManyFiles(maxFiles: number) {
        return `شما فقط مجاز به ارسال ${maxFiles} فایل هستید`;
    },
    fileNotSupported() {
        return 'فرمت این فایل پشتیبانی نمیشود';
    },
};

interface SingleImageDropzoneProps {
    dropzoneOptions?: DropzoneOptions;
    width?: string | number;
    height?: string | number;
    value?: string | File | null;
    className?: string;
    disabled?: boolean;
    onChange?: (file?: File) => void;
}

const SingleImageDropzone = React.forwardRef<HTMLInputElement, SingleImageDropzoneProps>(
    (
        { dropzoneOptions, width, height, value, className, disabled, onChange },
        ref,
    ) => {
        const imageUrl = React.useMemo(() => {
            if (typeof value === 'string') {
                return value; // Use URL if it's passed as a string
            } else if (value) {
                return URL.createObjectURL(value); // Create a preview URL for the file
            }
            return null;
        }, [value]);

        // dropzone configuration
        const {
            getRootProps,
            getInputProps,
            acceptedFiles,
            fileRejections,
            isFocused,
            isDragAccept,
            isDragReject,
        } = useDropzone({
            accept: { 'image/*': [] },
            multiple: false,
            disabled,
            onDrop: (acceptedFiles: File[]) => {
                const file = acceptedFiles[0];
                if (file) {
                    void onChange?.(file);
                }
            },
            ...dropzoneOptions,
        });

        // styling
        const dropZoneClassName = React.useMemo(
            () =>
                twMerge(
                    variants.base,
                    isFocused && variants.active,
                    disabled && variants.disabled,
                    imageUrl && variants.image,
                    (isDragReject ?? fileRejections[0]) && variants.reject,
                    isDragAccept && variants.accept,
                    className,
                ).trim(),
            [
                isFocused,
                imageUrl,
                fileRejections,
                isDragAccept,
                isDragReject,
                disabled,
                className,
            ],
        );

        // error validation messages
        const errorMessage = React.useMemo(() => {
            if (fileRejections[0]) {
                const { errors } = fileRejections[0];
                if (errors[0]?.code === 'file-too-large') {
                    return ERROR_MESSAGES.fileTooLarge(dropzoneOptions?.maxSize ?? 0);
                } else if (errors[0]?.code === 'file-invalid-type') {
                    return ERROR_MESSAGES.fileInvalidType();
                } else if (errors[0]?.code === 'too-many-files') {
                    return ERROR_MESSAGES.tooManyFiles(dropzoneOptions?.maxFiles ?? 0);
                } else {
                    return ERROR_MESSAGES.fileNotSupported();
                }
            }
            return undefined;
        }, [fileRejections, dropzoneOptions]);

        return (
            <div>
                <div
                    {...getRootProps({
                        className: dropZoneClassName,
                        style: {
                            width,
                            height,
                        },
                    })}
                >
                    {/* Main File Input */}
                    <input ref={ref} {...getInputProps()} />

                    {imageUrl ? (
                        // Image Preview
                        <Image
                            className="h-full w-full rounded-md object-cover"
                            src={imageUrl}
                            alt={acceptedFiles[0]?.name}
                            width={200}
                            height={150}
                        />
                    ) : (
                        // Upload Icon
                        <div className="flex flex-col items-center justify-center text-xs text-gray-400 pt-5">
                            <UploadCloudIcon className="mb-2 h-7 w-7" />
                            <div className="text-gray-400">تصاویر را در اینجا رها کنید</div>
                            <div className="mt-3">
                                <Button disabled={disabled} type='button' className='text-white'>انتخاب تصویر</Button>
                            </div>
                        </div>
                    )}

                    {/* Remove Image Icon */}
                    {imageUrl && !disabled && (
                        <div
                            className="group absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 transform"
                            onClick={(e) => {
                                e.stopPropagation();
                                void onChange?.(undefined);
                            }}
                        >
                            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-red-600 transition-all duration-300 hover:h-6 hover:w-6">
                                <X className="text-slate-50" width={16} height={16} />
                            </div>
                        </div>
                    )}
                </div>

                {/* Error Text */}
                <div className="mt-1 text-xs text-red-500">{errorMessage}</div>
            </div>
        );
    },
);
SingleImageDropzone.displayName = 'SingleImageDropzone';

function formatFileSize(bytes: number): string {
    if (!bytes) {
        return '0 Bytes';
    }
    bytes = Number(bytes);
    if (bytes === 0) {
        return '0 Bytes';
    }
    const k = 1024;
    const dm = 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export { SingleImageDropzone };
