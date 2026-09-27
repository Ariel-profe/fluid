"use client";

import {
    useState,
    useRef,
    useEffect,
    useMemo,
    useCallback,
    type ChangeEvent,
} from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

function SearchIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            className="size-4 shrink-0"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    );
}

const transition = {
    duration: 0.4,
    type: "spring" as const,
    bounce: 0.25,
};

export interface GooeyInputClassNames {
    root?: string;
    filterWrap?: string;
    buttonRow?: string;
    trigger?: string;
    input?: string;
    /** Replaces the default surface colors (bg/text/ring) entirely. */
    surface?: string;
    /** Overrides `surface` only while collapsed (idle icon state). */
    surfaceCollapsed?: string;
    /** Overrides `surface` only while expanded (typing state). */
    surfaceExpanded?: string;
}

export interface GooeyInputProps {
    placeholder?: string;
    className?: string;
    classNames?: GooeyInputClassNames;
    /** Collapsed control width in px */
    collapsedWidth?: number;
    /** Expanded control width in px */
    expandedWidth?: number;
    /** Horizontal offset when expanded (px), aligns detached bubble */
    expandedOffset?: number;
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    onOpenChange?: (open: boolean) => void;
    disabled?: boolean;
}

export function SearchBar({
    placeholder = "Buscar...",
    className,
    classNames,
    collapsedWidth = 115,
    expandedWidth = 200,
    expandedOffset = 50,
    value: valueProp,
    defaultValue = "",
    onValueChange,
    onOpenChange,
    disabled = false,
}: GooeyInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const prevExpandedRef = useRef(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

    const isControlled = valueProp !== undefined;
    const searchText = isControlled ? valueProp : uncontrolledValue;

    const setSearchText = useCallback(
        (next: string) => {
            if (!isControlled) {
                setUncontrolledValue(next);
            }
            onValueChange?.(next);
        },
        [isControlled, onValueChange],
    );

    const setExpanded = useCallback(
        (next: boolean) => {
            setIsExpanded(next);
            onOpenChange?.(next);
        },
        [onOpenChange],
    );

    useEffect(() => {
        if (isExpanded) {
            inputRef.current?.focus();
        } else if (prevExpandedRef.current) {
            setSearchText("");
        }
        prevExpandedRef.current = isExpanded;
    }, [isExpanded, setSearchText]);

    const buttonVariants = useMemo(
        () => ({
            collapsed: { width: collapsedWidth, marginLeft: 0 },
            expanded: { width: expandedWidth, marginLeft: expandedOffset },
        }),
        [collapsedWidth, expandedWidth, expandedOffset],
    );

    const handleExpand = useCallback(() => {
        if (!disabled) setExpanded(true);
    }, [disabled, setExpanded]);

    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setSearchText(e.target.value);
        },
        [setSearchText],
    );

    const handleBlur = useCallback(() => {
        if (!searchText) setExpanded(false);
    }, [searchText, setExpanded]);

    const surfaceClass = isExpanded
        ? (classNames?.surfaceExpanded ?? classNames?.surface ?? "bg-slate-200 text-slate-900")
        : (classNames?.surfaceCollapsed ?? classNames?.surface ?? "bg-transparent text-slate-900");

    return (
        <div
            className={cn(
                "relative flex items-center justify-end",
                className,
                classNames?.root,
            )}
        >
            <div
                className={cn(
                    "relative flex items-center justify-end",
                    classNames?.filterWrap,
                )}
            >
                <motion.div
                    className={cn("flex items-center justify-end", classNames?.buttonRow)}
                    variants={buttonVariants}
                    initial="collapsed"
                    animate={isExpanded ? "expanded" : "collapsed"}
                    transition={transition}
                >
                    <Button
                        type="button"
                        variant={"ghost"}
                        disabled={disabled}
                        onClick={handleExpand}
                        className={cn(
                            "",
                            isExpanded && "gap-2",
                            surfaceClass,
                            classNames?.trigger,
                        )}
                    >
                        {!isExpanded ? <SearchIcon /> : null}
                        <motion.input
                            ref={inputRef}
                            type="search"
                            enterKeyHint="search"
                            autoComplete="off"
                            value={searchText}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={disabled || !isExpanded}
                            placeholder={placeholder}
                            className={cn(
                                "h-full bg-transparent text-sm outline-none transition-opacity",
                                isExpanded ? "min-w-0 flex-1" : "w-0 flex-none opacity-0 pointer-events-none",
                                classNames?.input ??
                                (isExpanded
                                    ? "text-black placeholder:text-black/50 dark:placeholder:text-black/45"
                                    : "text-black"),
                            )}
                        />
                    </Button>
                </motion.div>
            </div>
        </div>
    );
}
