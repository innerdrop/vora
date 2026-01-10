// ============================================================
// VORA - Design System Tokens
// Colors, Typography, Spacing, Shadows
// ============================================================

export const colors = {
    // Primary - Midnight Navy (Trust)
    primary: {
        50: "#E6EBF2",
        100: "#C2D0E5",
        200: "#9BB1D4",
        300: "#7492C3",
        400: "#4D73B2",
        500: "#0A192F", // Main
        600: "#091527",
        700: "#07111F",
        800: "#050D17",
        900: "#03080F",
    },

    // Accent - Electric Mint (Tech/Freshness)
    accent: {
        50: "#E6FFFA",
        100: "#B3FFF0",
        200: "#80FFE6",
        300: "#4DFFDC",
        400: "#1AFFD2",
        500: "#00F5D4", // Main
        600: "#00C4AA",
        700: "#009380",
        800: "#006255",
        900: "#00312B",
    },

    // Secondary - Slate (Modernity)
    secondary: {
        50: "#F8FAFC",
        100: "#F1F5F9",
        200: "#E2E8F0",
        300: "#CBD5E1",
        400: "#94A3B8",
        500: "#64748B", // Main
        600: "#475569",
        700: "#334155",
        800: "#1E293B",
        900: "#0F172A",
    },

    // Semantic Colors
    success: {
        light: "#22C55E",
        DEFAULT: "#16A34A",
        dark: "#15803D",
    },
    warning: {
        light: "#FBBF24",
        DEFAULT: "#F59E0B",
        dark: "#D97706",
    },
    error: {
        light: "#F87171",
        DEFAULT: "#EF4444",
        dark: "#DC2626",
    },

    // Background Colors
    background: {
        primary: "#FFFFFF",
        secondary: "#F8FAFC",
        tertiary: "#F1F5F9",
        dark: "#0A192F",
        glass: "rgba(255, 255, 255, 0.7)",
    },

    // Text Colors
    text: {
        primary: "#0A192F",
        secondary: "#64748B",
        muted: "#94A3B8",
        inverse: "#FFFFFF",
    },
} as const;

export const typography = {
    fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
    },
} as const;

export const spacing = {
    px: '1px',
    0: '0px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
} as const;

export const borderRadius = {
    none: '0',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
} as const;

export const shadows = {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    glass: '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
    glow: '0 0 20px rgba(0, 245, 212, 0.3)',
} as const;

export const animation = {
    // Durations
    duration: {
        fastest: '50ms',
        faster: '100ms',
        fast: '150ms',
        normal: '200ms',
        slow: '300ms',
        slower: '400ms',
        slowest: '500ms',
    },
    // Easings
    easing: {
        linear: 'linear',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
} as const;

// Breakpoints
export const breakpoints = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
} as const;
