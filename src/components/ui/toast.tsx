"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from "lucide-react";
import { useToastStore } from "@/store";

const toastIcons = {
    success: CheckCircle2,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
};

const toastStyles = {
    success: "bg-emerald-50 border-emerald-200 text-emerald-800",
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
};

const iconStyles = {
    success: "text-emerald-500",
    error: "text-red-500",
    warning: "text-amber-500",
    info: "text-blue-500",
};

export function ToastContainer() {
    const { toasts, removeToast } = useToastStore();

    return (
        <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-3 max-w-md">
            <AnimatePresence>
                {toasts.map((toast) => {
                    const Icon = toastIcons[toast.type];

                    return (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 100, scale: 0.9 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className={`flex items-start gap-3 p-4 rounded-xl border shadow-lg ${toastStyles[toast.type]}`}
                        >
                            <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconStyles[toast.type]}`} />
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold">{toast.title}</p>
                                {toast.message && (
                                    <p className="text-sm opacity-80 mt-1">{toast.message}</p>
                                )}
                            </div>
                            <button
                                onClick={() => removeToast(toast.id)}
                                className="flex-shrink-0 p-1 rounded-lg hover:bg-black/5 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}

// Hook helper for easy toast usage
export function useToast() {
    const { addToast } = useToastStore();

    return {
        success: (title: string, message?: string) =>
            addToast({ type: "success", title, message }),
        error: (title: string, message?: string) =>
            addToast({ type: "error", title, message }),
        warning: (title: string, message?: string) =>
            addToast({ type: "warning", title, message }),
        info: (title: string, message?: string) =>
            addToast({ type: "info", title, message }),
    };
}
