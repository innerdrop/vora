"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

const cardVariants = cva(
    // Base styles
    "rounded-2xl transition-all duration-300",
    {
        variants: {
            variant: {
                default: "bg-white border border-secondary-200 shadow-sm",
                elevated: "bg-white shadow-lg hover:shadow-xl",
                flat: "bg-secondary-50 border border-secondary-100",
                glass:
                    "bg-white/70 backdrop-blur-xl border border-white/20 shadow-glass",
                gradient:
                    "bg-gradient-to-br from-white to-secondary-50 border border-secondary-100 shadow-md",
                dark: "bg-primary-500 text-white border border-primary-400",
                accent:
                    "bg-gradient-to-br from-accent-500 to-accent-600 text-primary-500",
                outlined: "bg-transparent border-2 border-secondary-200",
                bento:
                    "bg-white border border-secondary-100 shadow-sm hover:shadow-md hover:border-accent-200 group",
            },
            padding: {
                none: "p-0",
                sm: "p-4",
                default: "p-6",
                lg: "p-8",
                xl: "p-10",
            },
            hover: {
                none: "",
                lift: "hover:-translate-y-1 hover:shadow-lg",
                scale: "hover:scale-[1.02]",
                glow: "hover:shadow-glow hover:border-accent-300",
                border: "hover:border-accent-500",
            },
        },
        defaultVariants: {
            variant: "default",
            padding: "default",
            hover: "none",
        },
    }
);

export interface CardProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> { }

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant, padding, hover, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(cardVariants({ variant, padding, hover, className }))}
                {...props}
            />
        );
    }
);
Card.displayName = "Card";

// Animated Card with Framer Motion
const MotionCard = React.forwardRef<
    HTMLDivElement,
    CardProps & HTMLMotionProps<"div">
>(({ className, variant, padding, hover, children, ...props }, ref) => {
    return (
        <motion.div
            ref={ref}
            className={cn(cardVariants({ variant, padding, hover, className }))}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            {...props}
        >
            {children}
        </motion.div>
    );
});
MotionCard.displayName = "MotionCard";

// Card sub-components
const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5", className)}
        {...props}
    />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            "text-xl font-semibold leading-none tracking-tight text-primary-500",
            className
        )}
        {...props}
    />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-secondary-500", className)}
        {...props}
    />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("pt-4", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center pt-4", className)}
        {...props}
    />
));
CardFooter.displayName = "CardFooter";

// Bento Grid Card (Special layout)
const BentoCard = React.forwardRef<
    HTMLDivElement,
    CardProps & { span?: "1" | "2" | "3" | "full" }
>(({ className, span = "1", children, ...props }, ref) => {
    const spanClasses = {
        "1": "col-span-1",
        "2": "col-span-2",
        "3": "col-span-3",
        full: "col-span-full",
    };

    return (
        <Card
            ref={ref}
            variant="bento"
            hover="lift"
            className={cn(spanClasses[span], className)}
            {...props}
        >
            {children}
        </Card>
    );
});
BentoCard.displayName = "BentoCard";

export {
    Card,
    MotionCard,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    BentoCard,
    cardVariants,
};
