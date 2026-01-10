"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Skeleton loader for async content
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "text" | "circular" | "rectangular" | "card";
    width?: string | number;
    height?: string | number;
    lines?: number;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
    (
        {
            className,
            variant = "rectangular",
            width,
            height,
            lines = 1,
            ...props
        },
        ref
    ) => {
        const baseClasses =
            "animate-pulse bg-gradient-to-r from-secondary-200 via-secondary-100 to-secondary-200 bg-[length:200%_100%]";

        if (variant === "text" && lines > 1) {
            return (
                <div ref={ref} className={cn("space-y-2", className)} {...props}>
                    {Array.from({ length: lines }).map((_, i) => (
                        <div
                            key={i}
                            className={cn(
                                baseClasses,
                                "h-4 rounded",
                                i === lines - 1 && "w-3/4"
                            )}
                        />
                    ))}
                </div>
            );
        }

        const variantClasses = {
            text: "h-4 rounded",
            circular: "rounded-full aspect-square",
            rectangular: "rounded-lg",
            card: "rounded-2xl",
        };

        return (
            <div
                ref={ref}
                className={cn(baseClasses, variantClasses[variant], className)}
                style={{ width, height }}
                {...props}
            />
        );
    }
);
Skeleton.displayName = "Skeleton";

// Skeleton Card for loading states
const SkeletonCard = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "rounded-2xl border border-secondary-100 bg-white p-6 space-y-4",
            className
        )}
        {...props}
    >
        <div className="flex items-center gap-4">
            <Skeleton variant="circular" className="h-12 w-12" />
            <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-1/4" />
            </div>
        </div>
        <Skeleton variant="text" lines={3} />
        <Skeleton className="h-10 w-full" />
    </div>
));
SkeletonCard.displayName = "SkeletonCard";

// Loading Spinner
interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: "sm" | "default" | "lg" | "xl";
}

const spinnerSizes = {
    sm: "h-4 w-4 border-2",
    default: "h-6 w-6 border-2",
    lg: "h-8 w-8 border-3",
    xl: "h-12 w-12 border-4",
};

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
    ({ className, size = "default", ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "animate-spin rounded-full border-accent-500 border-t-transparent",
                spinnerSizes[size],
                className
            )}
            {...props}
        />
    )
);
Spinner.displayName = "Spinner";

// Loading Screen with VORA branding
interface LoadingScreenProps {
    message?: string;
}

const LoadingScreen = ({ message = "Cargando..." }: LoadingScreenProps) => (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
        >
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="mx-auto h-16 w-16 rounded-full border-4 border-secondary-200 border-t-accent-500"
            />
            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-2xl font-bold text-primary-500"
            >
                VORA
            </motion.h2>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-2 text-secondary-500"
            >
                {message}
            </motion.p>
        </motion.div>
    </div>
);

// Page Transition wrapper
interface PageTransitionProps {
    children: React.ReactNode;
    className?: string;
}

const PageTransition = ({ children, className }: PageTransitionProps) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={className}
    >
        {children}
    </motion.div>
);

// Fade In animation wrapper
interface FadeInProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
}

const FadeIn = ({
    children,
    delay = 0,
    duration = 0.4,
    className,
}: FadeInProps) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration, ease: "easeOut" }}
        className={className}
    >
        {children}
    </motion.div>
);

// Stagger children animation
interface StaggerContainerProps {
    children: React.ReactNode;
    className?: string;
    staggerDelay?: number;
}

const StaggerContainer = ({
    children,
    className,
    staggerDelay = 0.1,
}: StaggerContainerProps) => (
    <motion.div
        initial="hidden"
        animate="visible"
        variants={{
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    staggerChildren: staggerDelay,
                },
            },
        }}
        className={className}
    >
        {children}
    </motion.div>
);

const StaggerItem = motion.div;
StaggerItem.defaultProps = {
    variants: {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    },
};

export {
    Skeleton,
    SkeletonCard,
    Spinner,
    LoadingScreen,
    PageTransition,
    FadeIn,
    StaggerContainer,
    StaggerItem,
};
