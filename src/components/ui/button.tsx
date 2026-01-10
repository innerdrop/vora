"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    // Base styles
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default:
                    "bg-primary-500 text-white hover:bg-primary-600 shadow-md hover:shadow-lg active:scale-[0.98]",
                accent:
                    "bg-accent-500 text-primary-500 hover:bg-accent-400 shadow-md shadow-accent-500/20 hover:shadow-lg hover:shadow-accent-500/30 active:scale-[0.98]",
                secondary:
                    "bg-secondary-100 text-secondary-700 hover:bg-secondary-200 active:scale-[0.98]",
                outline:
                    "border-2 border-secondary-200 bg-transparent hover:bg-secondary-50 hover:border-secondary-300 active:scale-[0.98]",
                ghost:
                    "hover:bg-secondary-100 hover:text-secondary-900 active:scale-[0.98]",
                link: "text-accent-500 underline-offset-4 hover:underline",
                destructive:
                    "bg-error-DEFAULT text-white hover:bg-error-dark shadow-md active:scale-[0.98]",
                success:
                    "bg-success-DEFAULT text-white hover:bg-success-dark shadow-md active:scale-[0.98]",
                glass:
                    "bg-white/70 backdrop-blur-md border border-white/20 shadow-glass hover:bg-white/80 active:scale-[0.98]",
            },
            size: {
                xs: "h-7 px-2 text-xs rounded-lg",
                sm: "h-9 px-3",
                default: "h-11 px-5",
                lg: "h-12 px-6 text-base",
                xl: "h-14 px-8 text-lg rounded-2xl",
                icon: "h-10 w-10",
                "icon-sm": "h-8 w-8",
                "icon-lg": "h-12 w-12",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            size,
            asChild = false,
            isLoading = false,
            leftIcon,
            rightIcon,
            children,
            disabled,
            ...props
        },
        ref
    ) => {
        const Comp = asChild ? Slot : "button";

        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading && <Loader2 className="animate-spin" />}
                {!isLoading && leftIcon}
                {children}
                {!isLoading && rightIcon}
            </Comp>
        );
    }
);
Button.displayName = "Button";

// Animated Button for premium interactions
const MotionButton = React.forwardRef<
    HTMLButtonElement,
    ButtonProps & HTMLMotionProps<"button">
>(({ className, variant, size, children, ...props }, ref) => {
    return (
        <motion.button
            ref={ref}
            className={cn(buttonVariants({ variant, size, className }))}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
            {...props}
        >
            {children}
        </motion.button>
    );
});
MotionButton.displayName = "MotionButton";

export { Button, MotionButton, buttonVariants };
