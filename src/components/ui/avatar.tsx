"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn, getInitials } from "@/lib/utils";

const avatarVariants = cva(
    "relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-accent-400 to-accent-600 font-semibold text-primary-500 select-none flex-shrink-0",
    {
        variants: {
            size: {
                xs: "h-6 w-6 text-[10px]",
                sm: "h-8 w-8 text-xs",
                default: "h-10 w-10 text-sm",
                lg: "h-12 w-12 text-base",
                xl: "h-16 w-16 text-lg",
                "2xl": "h-20 w-20 text-xl",
                "3xl": "h-24 w-24 text-2xl",
            },
            status: {
                none: "",
                online:
                    "after:absolute after:bottom-0 after:right-0 after:h-3 after:w-3 after:rounded-full after:bg-success-DEFAULT after:border-2 after:border-white",
                offline:
                    "after:absolute after:bottom-0 after:right-0 after:h-3 after:w-3 after:rounded-full after:bg-secondary-400 after:border-2 after:border-white",
                busy:
                    "after:absolute after:bottom-0 after:right-0 after:h-3 after:w-3 after:rounded-full after:bg-error-DEFAULT after:border-2 after:border-white",
                away:
                    "after:absolute after:bottom-0 after:right-0 after:h-3 after:w-3 after:rounded-full after:bg-warning-DEFAULT after:border-2 after:border-white",
            },
            ring: {
                none: "",
                default: "ring-2 ring-white",
                accent: "ring-2 ring-accent-500",
                primary: "ring-2 ring-primary-500",
            },
        },
        defaultVariants: {
            size: "default",
            status: "none",
            ring: "none",
        },
    }
);

export interface AvatarProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
    src?: string | null;
    alt?: string;
    fallback?: string;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
    ({ className, size, status, ring, src, alt, fallback, ...props }, ref) => {
        const [hasError, setHasError] = React.useState(false);
        const initials = fallback ? getInitials(fallback) : "?";

        return (
            <div
                ref={ref}
                className={cn(avatarVariants({ size, status, ring, className }))}
                {...props}
            >
                {src && !hasError ? (
                    <img
                        src={src}
                        alt={alt || "Avatar"}
                        className="h-full w-full object-cover"
                        onError={() => setHasError(true)}
                    />
                ) : (
                    <span>{initials}</span>
                )}
            </div>
        );
    }
);
Avatar.displayName = "Avatar";

// Avatar Group for displaying multiple avatars
interface AvatarGroupProps {
    children: React.ReactNode;
    max?: number;
    size?: VariantProps<typeof avatarVariants>["size"];
    className?: string;
}

const AvatarGroup = ({
    children,
    max = 5,
    size = "default",
    className,
}: AvatarGroupProps) => {
    const childArray = React.Children.toArray(children);
    const visibleAvatars = childArray.slice(0, max);
    const remainingCount = childArray.length - max;

    return (
        <div className={cn("flex -space-x-3", className)}>
            {visibleAvatars.map((child, index) => (
                <div
                    key={index}
                    className="relative ring-2 ring-white rounded-full"
                    style={{ zIndex: visibleAvatars.length - index }}
                >
                    {child}
                </div>
            ))}
            {remainingCount > 0 && (
                <div
                    className={cn(
                        avatarVariants({ size }),
                        "bg-secondary-200 text-secondary-600 ring-2 ring-white"
                    )}
                >
                    +{remainingCount}
                </div>
            )}
        </div>
    );
};
AvatarGroup.displayName = "AvatarGroup";

export { Avatar, AvatarGroup, avatarVariants };
