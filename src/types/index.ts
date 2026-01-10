// ============================================================
// VORA - TypeScript Type Definitions
// ============================================================

import type { UserRole, SubscriptionStatus, AppointmentStatus, GiraStatus, VerificationStatus, PaymentStatus, FileType } from "@prisma/client";

// Re-export Prisma enums for convenience
export type {
    UserRole,
    SubscriptionStatus,
    AppointmentStatus,
    GiraStatus,
    VerificationStatus,
    PaymentStatus,
    FileType,
};

// ============================================================
// USER TYPES
// ============================================================

export interface User {
    id: string;
    email: string;
    role: UserRole;
    firstName?: string | null;
    lastName?: string | null;
    phone?: string | null;
    avatarUrl?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface SessionUser {
    id: string;
    email: string;
    role: UserRole;
    name?: string | null;
    image?: string | null;
}

// ============================================================
// PROFESSIONAL TYPES
// ============================================================

export interface ProfessionalProfile {
    id: string;
    userId: string;
    specialty: string;
    licenseNumber: string;
    licenseProvince?: string | null;
    verificationStatus: VerificationStatus;
    bio?: string | null;
    publicEmail?: string | null;
    publicPhone?: string | null;
    whatsappNumber?: string | null;
    instagramHandle?: string | null;
    consultationPrice?: number | null;
    consultationDuration: number;
    depositRequired: boolean;
    depositAmount?: number | null;
    averageRating: number;
    totalReviews: number;
    slug: string;
    isPublic: boolean;
}

export interface ProfessionalCard {
    id: string;
    slug: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string | null;
    specialty: string;
    verificationStatus: VerificationStatus;
    averageRating: number;
    totalReviews: number;
    city?: string;
    nextAvailableGira?: {
        arrivalDate: Date;
        destination: string;
    };
    tier: "start" | "grow" | "elite";
}

// ============================================================
// GIRA (TRAVEL) TYPES
// ============================================================

export interface TravelGira {
    id: string;
    professionalId: string;
    title: string;
    description?: string | null;
    destination: string;
    arrivalDate: Date;
    departureDate: Date;
    status: GiraStatus;
    maxAppointmentsPerDay: number;
    consultationAddress?: string | null;
    consultationCity: string;
    flightNumber?: string | null;
    flightStatus?: string | null;
}

export interface GiraWithSlots extends TravelGira {
    timeSlots: TimeSlot[];
    availableSlots: number;
    totalSlots: number;
}

// ============================================================
// TIME SLOT TYPES
// ============================================================

export interface TimeSlot {
    id: string;
    giraId: string;
    date: Date;
    startTime: Date;
    endTime: Date;
    isAvailable: boolean;
    isBlocked: boolean;
}

// ============================================================
// APPOINTMENT TYPES
// ============================================================

export interface Appointment {
    id: string;
    professionalId: string;
    patientId: string;
    giraId?: string | null;
    timeSlotId?: string | null;
    scheduledDate: Date;
    scheduledTime: Date;
    duration: number;
    status: AppointmentStatus;
    reason?: string | null;
    patientNotes?: string | null;
    professionalNotes?: string | null;
    depositAmount?: number | null;
    depositStatus?: PaymentStatus | null;
}

export interface AppointmentWithDetails extends Appointment {
    professional: {
        firstName: string;
        lastName: string;
        specialty: string;
        avatarUrl?: string | null;
    };
    patient: {
        firstName: string;
        lastName: string;
        avatarUrl?: string | null;
    };
    gira?: {
        destination: string;
        consultationAddress?: string | null;
    };
}

// ============================================================
// SUBSCRIPTION TYPES
// ============================================================

export interface SubscriptionPlan {
    id: string;
    name: string;
    displayName: string;
    description?: string | null;
    price: number;
    currency: string;
    interval: string;
    features: FeatureFlag[];
    maxGirasPerMonth?: number | null;
    maxAppointmentsPerGira?: number | null;
    isActive: boolean;
}

export interface FeatureFlag {
    key: string;
    name: string;
    enabled: boolean;
}

// Tier feature keys
export type FeatureKey =
    | "public_profile"
    | "static_contact"
    | "whatsapp_button"
    | "instagram_embed"
    | "gira_calendar"
    | "appointment_engine"
    | "reviews"
    | "payment_gateway"
    | "medical_vault"
    | "smart_reminders"
    | "priority_support";

// ============================================================
// REVIEW TYPES
// ============================================================

export interface Review {
    id: string;
    professionalId: string;
    patientId: string;
    rating: number;
    title?: string | null;
    comment?: string | null;
    response?: string | null;
    respondedAt?: Date | null;
    isPublic: boolean;
    isVerified: boolean;
    createdAt: Date;
}

export interface ReviewWithAuthor extends Review {
    patient: {
        firstName: string;
        lastName: string;
        avatarUrl?: string | null;
    };
}

// ============================================================
// MEDICAL FILE TYPES
// ============================================================

export interface MedicalFile {
    id: string;
    professionalId: string;
    patientId: string;
    appointmentId?: string | null;
    fileName: string;
    fileType: FileType;
    mimeType: string;
    fileSize: number;
    isSharedWithPatient: boolean;
    createdAt: Date;
    expiresAt?: Date | null;
}

// ============================================================
// API RESPONSE TYPES
// ============================================================

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

// ============================================================
// FILTER TYPES
// ============================================================

export interface ProfessionalFilters {
    specialty?: string;
    city?: string;
    arrivalDateFrom?: Date;
    arrivalDateTo?: Date;
    minRating?: number;
    isVerified?: boolean;
}

export interface AppointmentFilters {
    status?: AppointmentStatus;
    dateFrom?: Date;
    dateTo?: Date;
    professionalId?: string;
    patientId?: string;
}
