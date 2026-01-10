"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
    // Base styles
    "flex w-full rounded-xl border bg-white text-sm transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-secondary-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
    {
        variants: {
            variant: {
                default:
                    "border-secondary-200 focus-visible:border-accent-500 focus-visible:ring-2 focus-visible:ring-accent-500/20",
                filled:
                    "border-transparent bg-secondary-100 focus-visible:bg-white focus-visible:border-accent-500 focus-visible:ring-2 focus-visible:ring-accent-500/20",
                ghost:
                    "border-transparent hover:bg-secondary-50 focus-visible:bg-white focus-visible:border-secondary-200",
                error:
                    "border-error-DEFAULT focus-visible:border-error-DEFAULT focus-visible:ring-2 focus-visible:ring-error-DEFAULT/20",
                success:
                    "border-success-DEFAULT focus-visible:border-success-DEFAULT focus-visible:ring-2 focus-visible:ring-success-DEFAULT/20",
            },
            inputSize: {
                sm: "h-9 px-3 text-xs",
                default: "h-11 px-4",
                lg: "h-12 px-5 text-base",
                xl: "h-14 px-6 text-lg rounded-2xl",
            },
        },
        defaultVariants: {
            variant: "default",
            inputSize: "default",
        },
    }
);

export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        { className, variant, inputSize, type, leftIcon, rightIcon, error, ...props },
        ref
    ) => {
        const hasIcon = leftIcon || rightIcon;

        if (hasIcon) {
            return (
                <div className="relative">
                    {leftIcon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-400">
                            {leftIcon}
                        </div>
                    )}
                    <input
                        type={type}
                        className={cn(
                            inputVariants({
                                variant: error ? "error" : variant,
                                inputSize,
                                className,
                            }),
                            leftIcon && "pl-10",
                            rightIcon && "pr-10"
                        )}
                        ref={ref}
                        {...props}
                    />
                    {rightIcon && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-400">
                            {rightIcon}
                        </div>
                    )}
                </div>
            );
        }

        return (
            <input
                type={type}
                className={cn(
                    inputVariants({
                        variant: error ? "error" : variant,
                        inputSize,
                        className,
                    })
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

// Textarea component
const textareaVariants = cva(
    "flex min-h-[120px] w-full rounded-xl border bg-white px-4 py-3 text-sm transition-all duration-200 placeholder:text-secondary-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-none",
    {
        variants: {
            variant: {
                default:
                    "border-secondary-200 focus-visible:border-accent-500 focus-visible:ring-2 focus-visible:ring-accent-500/20",
                filled:
                    "border-transparent bg-secondary-100 focus-visible:bg-white focus-visible:border-accent-500",
                error:
                    "border-error-DEFAULT focus-visible:ring-2 focus-visible:ring-error-DEFAULT/20",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
    error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, variant, error, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    textareaVariants({ variant: error ? "error" : variant, className })
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Textarea.displayName = "Textarea";

// Form Field wrapper with label and error
interface FormFieldProps {
    label?: string;
    error?: string;
    hint?: string;
    required?: boolean;
    children: React.ReactNode;
    className?: string;
}

const FormField = ({
    label,
    error,
    hint,
    required,
    children,
    className,
}: FormFieldProps) => {
    return (
        <div className={cn("space-y-2", className)}>
            {label && (
                <label className="text-sm font-medium text-primary-500">
                    {label}
                    {required && <span className="text-error-DEFAULT ml-1">*</span>}
                </label>
            )}
            {children}
            {error && <p className="text-xs text-error-DEFAULT">{error}</p>}
            {hint && !error && (
                <p className="text-xs text-secondary-400">{hint}</p>
            )}
        </div>
    );
};
FormField.displayName = "FormField";

export { Input, Textarea, FormField, inputVariants, textareaVariants };
