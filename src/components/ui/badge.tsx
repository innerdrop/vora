"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

const badgeVariants = cva(
    "inline-flex items-center gap-1 rounded-full font-medium transition-all",
    {
        variants: {
            variant: {
                default: "bg-secondary-100 text-secondary-700",
                primary: "bg-primary-500 text-white",
                accent: "bg-accent-500 text-primary-500",
                success: "bg-success-light/20 text-success-dark",
                warning: "bg-warning-light/20 text-warning-dark",
                error: "bg-error-light/20 text-error-dark",
                info: "bg-blue-100 text-blue-700",
                outline: "border border-secondary-200 text-secondary-600",
                ghost: "bg-transparent text-secondary-600",
            },
            size: {
                xs: "px-1.5 py-0.5 text-[10px]",
                sm: "px-2 py-0.5 text-xs",
                default: "px-2.5 py-1 text-xs",
                lg: "px-3 py-1.5 text-sm",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
    dot?: boolean;
    icon?: React.ReactNode;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
    ({ className, variant, size, dot, icon, children, ...props }, ref) => {
        return (
            <span
                ref={ref}
                className={cn(badgeVariants({ variant, size }), className)}
                {...props}
            >
                {dot && (
                    <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                )}
                {icon}
                {children}
            </span>
        );
    }
);
Badge.displayName = "Badge";

// Status Badge with specific icons
interface StatusBadgeProps extends Omit<BadgeProps, "variant" | "icon"> {
    status: "verified" | "pending" | "rejected" | "expired";
}

const statusConfig = {
    verified: {
        variant: "success" as const,
        icon: <CheckCircle2 className="h-3 w-3" />,
        label: "Verificado",
    },
    pending: {
        variant: "warning" as const,
        icon: <AlertCircle className="h-3 w-3" />,
        label: "Pendiente",
    },
    rejected: {
        variant: "error" as const,
        icon: <X className="h-3 w-3" />,
        label: "Rechazado",
    },
    expired: {
        variant: "default" as const,
        icon: <AlertTriangle className="h-3 w-3" />,
        label: "Expirado",
    },
};

const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
    ({ className, status, children, ...props }, ref) => {
        const config = statusConfig[status];

        return (
            <Badge
                ref={ref}
                variant={config.variant}
                icon={config.icon}
                className={className}
                {...props}
            >
                {children || config.label}
            </Badge>
        );
    }
);
StatusBadge.displayName = "StatusBadge";

// Subscription Tier Badge
interface TierBadgeProps extends Omit<BadgeProps, "variant"> {
    tier: "start" | "grow" | "elite";
}

const tierConfig = {
    start: {
        className: "bg-secondary-100 text-secondary-600",
        label: "Start",
    },
    grow: {
        className: "bg-blue-100 text-blue-700",
        label: "Grow",
    },
    elite: {
        className: "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-sm",
        label: "Elite",
    },
};

const TierBadge = React.forwardRef<HTMLSpanElement, TierBadgeProps>(
    ({ className, tier, children, size, ...props }, ref) => {
        const config = tierConfig[tier];

        return (
            <span
                ref={ref}
                className={cn(
                    "inline-flex items-center gap-1 rounded-full font-semibold",
                    size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-xs",
                    config.className,
                    className
                )}
                {...props}
            >
                {tier === "elite" && <span>⭐</span>}
                {children || config.label}
            </span>
        );
    }
);
TierBadge.displayName = "TierBadge";

export { Badge, StatusBadge, TierBadge, badgeVariants };
