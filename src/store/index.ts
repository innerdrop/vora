import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { SessionUser, FeatureKey } from "@/types";

// ============================================================
// AUTH STORE
// ============================================================

interface AuthState {
    user: SessionUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    setUser: (user: SessionUser | null) => void;
    setLoading: (loading: boolean) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    setUser: (user) =>
        set({
            user,
            isAuthenticated: !!user,
            isLoading: false,
        }),
    setLoading: (isLoading) => set({ isLoading }),
    logout: () =>
        set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
        }),
}));

// ============================================================
// FEATURE FLAGS STORE (Based on subscription tier)
// ============================================================

interface FeatureFlagsState {
    features: Record<FeatureKey, boolean>;
    tier: "start" | "grow" | "elite" | null;
    setTier: (tier: "start" | "grow" | "elite") => void;
    hasFeature: (feature: FeatureKey) => boolean;
    reset: () => void;
}

const tierFeatures: Record<"start" | "grow" | "elite", FeatureKey[]> = {
    start: ["public_profile", "static_contact"],
    grow: [
        "public_profile",
        "static_contact",
        "whatsapp_button",
        "instagram_embed",
        "gira_calendar",
        "appointment_engine",
        "reviews",
    ],
    elite: [
        "public_profile",
        "static_contact",
        "whatsapp_button",
        "instagram_embed",
        "gira_calendar",
        "appointment_engine",
        "reviews",
        "payment_gateway",
        "medical_vault",
        "smart_reminders",
        "priority_support",
    ],
};

const getDefaultFeatures = (): Record<FeatureKey, boolean> => ({
    public_profile: false,
    static_contact: false,
    whatsapp_button: false,
    instagram_embed: false,
    gira_calendar: false,
    appointment_engine: false,
    reviews: false,
    payment_gateway: false,
    medical_vault: false,
    smart_reminders: false,
    priority_support: false,
});

export const useFeatureFlagsStore = create<FeatureFlagsState>()((set, get) => ({
    features: getDefaultFeatures(),
    tier: null,
    setTier: (tier) => {
        const enabledFeatures = tierFeatures[tier];
        const features = getDefaultFeatures();
        enabledFeatures.forEach((feature) => {
            features[feature] = true;
        });
        set({ tier, features });
    },
    hasFeature: (feature) => get().features[feature],
    reset: () => set({ features: getDefaultFeatures(), tier: null }),
}));

// ============================================================
// UI STORE (Global UI state)
// ============================================================

interface UIState {
    sidebarOpen: boolean;
    mobileMenuOpen: boolean;
    modalStack: string[];
    toggleSidebar: () => void;
    setSidebarOpen: (open: boolean) => void;
    toggleMobileMenu: () => void;
    setMobileMenuOpen: (open: boolean) => void;
    openModal: (modalId: string) => void;
    closeModal: (modalId: string) => void;
    closeAllModals: () => void;
}

export const useUIStore = create<UIState>()(
    persist(
        (set, get) => ({
            sidebarOpen: true,
            mobileMenuOpen: false,
            modalStack: [],
            toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
            setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
            toggleMobileMenu: () =>
                set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
            setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),
            openModal: (modalId) =>
                set((state) => ({
                    modalStack: [...state.modalStack, modalId],
                })),
            closeModal: (modalId) =>
                set((state) => ({
                    modalStack: state.modalStack.filter((id) => id !== modalId),
                })),
            closeAllModals: () => set({ modalStack: [] }),
        }),
        {
            name: "vora-ui-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ sidebarOpen: state.sidebarOpen }),
        }
    )
);

// ============================================================
// SEARCH & FILTER STORE (For professional discovery)
// ============================================================

interface SearchFilters {
    specialty: string | null;
    city: string | null;
    arrivalDateFrom: Date | null;
    arrivalDateTo: Date | null;
    minRating: number | null;
    isVerified: boolean | null;
}

interface SearchState {
    query: string;
    filters: SearchFilters;
    isSearching: boolean;
    setQuery: (query: string) => void;
    setFilter: <K extends keyof SearchFilters>(
        key: K,
        value: SearchFilters[K]
    ) => void;
    clearFilters: () => void;
    setSearching: (isSearching: boolean) => void;
}

const defaultFilters: SearchFilters = {
    specialty: null,
    city: null,
    arrivalDateFrom: null,
    arrivalDateTo: null,
    minRating: null,
    isVerified: null,
};

export const useSearchStore = create<SearchState>()((set) => ({
    query: "",
    filters: defaultFilters,
    isSearching: false,
    setQuery: (query) => set({ query }),
    setFilter: (key, value) =>
        set((state) => ({
            filters: { ...state.filters, [key]: value },
        })),
    clearFilters: () => set({ filters: defaultFilters, query: "" }),
    setSearching: (isSearching) => set({ isSearching }),
}));

// ============================================================
// NOTIFICATION TOAST STORE
// ============================================================

interface Toast {
    id: string;
    type: "success" | "error" | "warning" | "info";
    title: string;
    message?: string;
    duration?: number;
}

interface ToastState {
    toasts: Toast[];
    addToast: (toast: Omit<Toast, "id">) => void;
    removeToast: (id: string) => void;
    clearToasts: () => void;
}

export const useToastStore = create<ToastState>()((set, get) => ({
    toasts: [],
    addToast: (toast) => {
        const id = Math.random().toString(36).substring(2, 9);
        const newToast = { ...toast, id };
        set((state) => ({ toasts: [...state.toasts, newToast] }));

        // Auto remove after duration
        const duration = toast.duration ?? 5000;
        if (duration > 0) {
            setTimeout(() => {
                get().removeToast(id);
            }, duration);
        }
    },
    removeToast: (id) =>
        set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== id),
        })),
    clearToasts: () => set({ toasts: [] }),
}));
