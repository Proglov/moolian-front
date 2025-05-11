import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
    CheckIcon,
    XCircle,
    ChevronDown,
    XIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

const multiSelectVariants = cva(
    "m-1",
    {
        variants: {
            variant: {
                default:
                    "border-foreground/10 text-foreground bg-card hover:bg-card/80",
                secondary:
                    "border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
                destructive:
                    "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
                inverted: "inverted",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

type Option = { label: string; value: string };
type SelectedOption = { value: string; cent: number };

interface MultiSelectWithCentProps extends VariantProps<typeof multiSelectVariants> {
    options: Option[];
    value: SelectedOption[];
    onValueChange: (value: SelectedOption[]) => void;
    placeholder?: string;
    maxCount?: number;
    modalPopover?: boolean;
    className?: string;
}

export const MultiSelectWithCent = React.forwardRef<HTMLButtonElement, MultiSelectWithCentProps>(
    (
        {
            options,
            value,
            onValueChange,
            variant,
            placeholder = "گزینه ها",
            maxCount = 3,
            modalPopover = false,
            className,
            ...props
        },
        ref
    ) => {
        const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

        // Find cent for a given value
        const getCent = (val: string) =>
            value.find((s) => s.value === val)?.cent ?? 1;

        const handleInputKeyDown = (
            event: React.KeyboardEvent<HTMLInputElement>
        ) => {
            if (event.key === "Enter") {
                setIsPopoverOpen(true);
            } else if (event.key === "Backspace" && !event.currentTarget.value) {
                const newSelected = [...value];
                newSelected.pop();
                onValueChange(newSelected);
            }
        };

        const toggleOption = (optionValue: string) => {
            const exists = value.find((o) => o.value === optionValue);
            let newSelected: SelectedOption[];
            if (exists) {
                newSelected = value.filter((o) => o.value !== optionValue);
            } else {
                newSelected = [
                    ...value,
                    { value: optionValue, cent: 1 },
                ];
            }
            onValueChange(newSelected);
        };

        const handleCentChange = (optionValue: string, cent: number) => {
            const newSelected = value.map((o) =>
                o.value === optionValue ? { ...o, cent } : o
            );
            onValueChange(newSelected);
        };

        const handleClear = () => {
            onValueChange([]);
        };

        const handleTogglePopover = () => {
            setIsPopoverOpen((prev) => !prev);
        };

        const clearExtraOptions = () => {
            const newSelected = value.slice(0, maxCount);
            onValueChange(newSelected);
        };

        const toggleAll = () => {
            if (value.length === options.length) {
                handleClear();
            } else {
                const allValues = options.map((option) => ({
                    value: option.value,
                    cent: 1,
                }));
                onValueChange(allValues);
            }
        };

        return (
            <Popover
                open={isPopoverOpen}
                onOpenChange={setIsPopoverOpen}
                modal={modalPopover}
            >
                <PopoverTrigger asChild>
                    <Button
                        ref={ref}
                        {...props}
                        onClick={handleTogglePopover}
                        className={cn(
                            "flex w-full p-1 rounded-md border min-h-10 h-auto items-center justify-between bg-inherit hover:bg-inherit [&_svg]:pointer-events-auto",
                            className
                        )}
                    >
                        {value.length > 0 ? (
                            <div className="flex justify-between items-center w-full">
                                <div className="flex flex-wrap items-center">
                                    {value.slice(0, maxCount).map((selected) => {
                                        const option = options.find((o) => o.value === selected.value);
                                        return (
                                            <Badge
                                                key={selected.value}
                                                className={multiSelectVariants({ variant }) + ' hover:text-destructive'}
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    toggleOption(selected.value);
                                                }}
                                            >
                                                {option?.label}
                                                <XCircle
                                                    className="ml-2 h-4 w-4 cursor-pointer"
                                                />
                                            </Badge>
                                        );
                                    })}
                                    {value.length > maxCount && (
                                        <Badge
                                            className={cn(
                                                "bg-transparent text-foreground border-foreground/1 hover:bg-transparent hover:text-destructive",
                                                multiSelectVariants({ variant })
                                            )}
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                clearExtraOptions();
                                            }}
                                        >
                                            {`+ ${value.length - maxCount} more`}
                                            <XCircle className="ml-2 h-4 w-4 cursor-pointer" />
                                        </Badge>
                                    )}
                                </div>
                                <div className="flex items-center justify-between">
                                    <XIcon
                                        className="h-4 mx-2 cursor-pointer text-muted-foreground"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            handleClear();
                                        }}
                                    />
                                    <Separator
                                        orientation="vertical"
                                        className="flex min-h-6 h-full"
                                    />
                                    <ChevronDown className="h-4 mx-2 cursor-pointer text-muted-foreground" />
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between w-full mx-auto">
                                <span className="text-sm text-muted-foreground mx-3">
                                    {placeholder}
                                </span>
                                <ChevronDown className="h-4 cursor-pointer text-muted-foreground mx-2" />
                            </div>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-auto p-0 z-50"
                    align="start"
                    onEscapeKeyDown={() => setIsPopoverOpen(false)}
                >
                    <Command>
                        <CommandInput
                            placeholder="جست و جو ..."
                            onKeyDown={handleInputKeyDown}
                        />
                        <CommandList>
                            <CommandEmpty>بدون نتیجه</CommandEmpty>
                            <CommandGroup>
                                <CommandItem
                                    key="all"
                                    onSelect={toggleAll}
                                    className="cursor-pointer"
                                >
                                    <div
                                        className={cn(
                                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                            value.length === options.length
                                                ? "bg-primary text-primary-foreground"
                                                : "opacity-50 [&_svg]:invisible"
                                        )}
                                    >
                                        <CheckIcon className="h-4 w-4" />
                                    </div>
                                    <span>(انتخاب همه)</span>
                                </CommandItem>
                                {options.map((option) => {
                                    const isSelected = value.some((o) => o.value === option.value);
                                    const cent = getCent(option.value);
                                    return (
                                        <CommandItem
                                            key={option.value}
                                            onSelect={() => toggleOption(option.value)}
                                            className="cursor-pointer"
                                        >
                                            <div
                                                className={cn(
                                                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                    isSelected
                                                        ? "bg-primary text-primary-foreground"
                                                        : "opacity-50 [&_svg]:invisible"
                                                )}
                                            >
                                                <CheckIcon className="h-4 w-4" />
                                            </div>
                                            <span>{option.label}</span>
                                            {isSelected && (
                                                <div className="flex items-center ml-2">
                                                    <input
                                                        type="number"
                                                        min={1}
                                                        max={99}
                                                        value={cent}
                                                        onClick={e => e.stopPropagation()}
                                                        onChange={e =>
                                                            handleCentChange(
                                                                option.value,
                                                                Number(e.target.value)
                                                            )
                                                        }
                                                        className="mx-2 w-16 border rounded px-1 text-xs"
                                                        style={{ direction: "ltr" }}
                                                    />
                                                    <span className="text-xs">%</span>
                                                </div>
                                            )}
                                        </CommandItem>
                                    );
                                })}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        );
    }
);

MultiSelectWithCent.displayName = "MultiSelectWithCent";
