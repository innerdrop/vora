"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// ============================================================
// PROFESIONALES
// ============================================================

export async function getProfessionals(params?: {
    specialty?: string;
    verified?: boolean;
    limit?: number;
}) {
    const { specialty, verified, limit = 20 } = params || {};

    const professionals = await prisma.professionalProfile.findMany({
        where: {
            isPublic: true,
            ...(specialty && specialty !== "Todas las especialidades"
                ? { specialty }
                : {}),
            ...(verified ? { verificationStatus: "APPROVED" } : {}),
        },
        include: {
            user: {
                select: {
                    firstName: true,
                    lastName: true,
                    avatarUrl: true,
                },
            },
            giras: {
                where: {
                    status: "PUBLISHED",
                    arrivalDate: { gte: new Date() },
                },
                orderBy: { arrivalDate: "asc" },
                take: 1,
            },
        },
        orderBy: [
            { verificationStatus: "asc" },
            { averageRating: "desc" },
        ],
        take: limit,
    });

    return professionals.map((pro) => ({
        id: pro.id,
        slug: pro.slug,
        firstName: pro.user.firstName || "",
        lastName: pro.user.lastName || "",
        specialty: pro.specialty,
        rating: Number(pro.averageRating),
        reviews: pro.totalReviews,
        verified: pro.verificationStatus === "APPROVED",
        avatarUrl: pro.user.avatarUrl,
        consultationPrice: Number(pro.consultationPrice) || 0,
        nextGira: pro.giras[0] ? {
            destination: pro.giras[0].destination,
            arrivalDate: pro.giras[0].arrivalDate.toISOString(),
            departureDate: pro.giras[0].departureDate.toISOString(),
        } : null,
    }));
}

export async function getProfessionalBySlug(slug: string) {
    const professional = await prisma.professionalProfile.findUnique({
        where: { slug },
        include: {
            user: {
                select: {
                    firstName: true,
                    lastName: true,
                    avatarUrl: true,
                    email: true,
                },
            },
            giras: {
                where: {
                    status: "PUBLISHED",
                    departureDate: { gte: new Date() },
                },
                orderBy: { arrivalDate: "asc" },
            },
            reviews: {
                where: { isPublic: true },
                include: {
                    patient: {
                        include: {
                            user: {
                                select: { firstName: true, lastName: true },
                            },
                        },
                    },
                },
                orderBy: { createdAt: "desc" },
                take: 10,
            },
        },
    });

    if (!professional) return null;

    return {
        id: professional.id,
        slug: professional.slug,
        firstName: professional.user.firstName || "",
        lastName: professional.user.lastName || "",
        specialty: professional.specialty,
        rating: Number(professional.averageRating),
        reviews: professional.totalReviews,
        verified: professional.verificationStatus === "APPROVED",
        verifiedAt: professional.verifiedAt?.toISOString(),
        avatarUrl: professional.user.avatarUrl,
        bio: professional.bio,
        education: professional.education,
        experience: professional.experience,
        languages: professional.languages,
        whatsappNumber: professional.whatsappNumber,
        instagramHandle: professional.instagramHandle,
        websiteUrl: professional.websiteUrl,
        consultationPrice: Number(professional.consultationPrice) || 0,
        consultationDuration: professional.consultationDuration,
        depositRequired: professional.depositRequired,
        depositAmount: Number(professional.depositAmount) || 0,
        giras: professional.giras.map((g) => ({
            id: g.id,
            title: g.title,
            destination: g.destination,
            arrivalDate: g.arrivalDate.toISOString(),
            departureDate: g.departureDate.toISOString(),
            address: g.consultationAddress,
        })),
        reviewsList: professional.reviews.map((r) => ({
            id: r.id,
            patientName: `${r.patient.user.firstName || ""} ${(r.patient.user.lastName || "")[0] || ""}.`,
            rating: r.rating,
            comment: r.comment,
            date: r.createdAt.toISOString(),
            verified: r.isVerified,
        })),
    };
}

// ============================================================
// GIRAS MANAGEMENT
// ============================================================

export async function getDoctorGiras() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return [];

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: { professionalProfile: true },
    });

    if (!user?.professionalProfile) return [];

    const giras = await prisma.travelGira.findMany({
        where: { professionalId: user.professionalProfile.id },
        orderBy: { arrivalDate: "asc" },
        include: { _count: { select: { appointments: true } } },
    });

    return giras.map(g => ({
        id: g.id,
        title: g.title,
        destination: g.destination,
        arrivalDate: g.arrivalDate.toISOString(),
        departureDate: g.departureDate.toISOString(),
        status: g.status,
        appointmentsCount: g._count.appointments,
        address: g.consultationAddress,
    }));
}

export async function getDoctorAppointments() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return [];

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: { professionalProfile: true },
    });

    if (!user?.professionalProfile) return [];

    const appointments = await prisma.appointment.findMany({
        where: { professionalId: user.professionalProfile.id },
        include: {
            patient: { include: { user: true } },
            gira: true,
        },
        orderBy: { scheduledDate: "asc" },
    });

    return appointments.map(apt => ({
        id: apt.id,
        patientName: `${apt.patient.user.firstName || ""} ${apt.patient.user.lastName || ""}`,
        date: apt.scheduledDate.toISOString(),
        time: apt.scheduledTime.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }),
        status: apt.status,
        reason: apt.reason,
        giraDestination: apt.gira?.destination,
    }));
}

export async function createGira(data: {
    title: string;
    destination: string;
    arrivalDate: string;
    departureDate: string;
    address: string;
    maxAppointments: number;
}) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) throw new Error("Unauthorized");

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: { professionalProfile: true },
    });

    if (!user?.professionalProfile) throw new Error("Profile not found");

    return await prisma.travelGira.create({
        data: {
            professionalId: user.professionalProfile.id,
            title: data.title,
            destination: data.destination,
            arrivalDate: new Date(data.arrivalDate),
            departureDate: new Date(data.departureDate),
            consultationAddress: data.address,
            maxAppointmentsPerDay: data.maxAppointments,
            status: "PUBLISHED", // Auto-publish for simplicity
        },
    });
}

export async function updateGira(id: string, data: Partial<{
    title: string;
    destination: string;
    arrivalDate: string;
    departureDate: string;
    address: string;
    maxAppointments: number;
    status: "DRAFT" | "PUBLISHED" | "CANCELED";
}>) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) throw new Error("Unauthorized");

    // Verify ownership
    const gira = await prisma.travelGira.findUnique({
        where: { id },
        include: { professional: { include: { user: true } } },
    });

    if (!gira || gira.professional.user.id !== session.user.id) {
        throw new Error("Unauthorized");
    }

    return await prisma.travelGira.update({
        where: { id },
        data: {
            ...(data.title && { title: data.title }),
            ...(data.destination && { destination: data.destination }),
            ...(data.arrivalDate && { arrivalDate: new Date(data.arrivalDate) }),
            ...(data.departureDate && { departureDate: new Date(data.departureDate) }),
            ...(data.address && { consultationAddress: data.address }),
            ...(data.maxAppointments && { maxAppointmentsPerDay: data.maxAppointments }),
            ...(data.status && { status: data.status }),
        },
    });
}

export async function deleteGira(id: string) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) throw new Error("Unauthorized");

    // Verify ownership
    const gira = await prisma.travelGira.findUnique({
        where: { id },
        include: { professional: { include: { user: true } } },
    });

    if (!gira || gira.professional.user.id !== session.user.id) {
        throw new Error("Unauthorized");
    }

    await prisma.travelGira.delete({ where: { id } });
    return { success: true };
}

// ============================================================
// DASHBOARD PROFESIONAL
// ============================================================

export async function getProfessionalDashboardData() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return null;

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: {
            professionalProfile: {
                include: {
                    giras: {
                        where: {
                            departureDate: { gte: new Date() },
                        },
                        orderBy: { arrivalDate: "asc" },
                        take: 1,
                    },
                    appointments: {
                        where: {
                            scheduledDate: { gte: new Date() },
                            status: { in: ["PENDING", "CONFIRMED"] },
                        },
                        include: {
                            patient: {
                                include: {
                                    user: {
                                        select: { firstName: true, lastName: true },
                                    },
                                },
                            },
                        },
                        orderBy: { scheduledDate: "asc" },
                        take: 5,
                    },
                },
            },
        },
    });

    if (!user?.professionalProfile) return null;

    const profile = user.professionalProfile;

    // Count stats
    const thisMonth = new Date();
    thisMonth.setDate(1);
    thisMonth.setHours(0, 0, 0, 0);

    const appointmentsThisMonth = await prisma.appointment.count({
        where: {
            professionalId: profile.id,
            scheduledDate: { gte: thisMonth },
            status: "COMPLETED",
        },
    });

    const totalPatients = await prisma.appointment.groupBy({
        by: ["patientId"],
        where: { professionalId: profile.id },
    });

    return {
        professional: {
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            specialty: profile.specialty,
            rating: Number(profile.averageRating),
            reviews: profile.totalReviews,
        },
        stats: {
            appointmentsThisMonth,
            totalPatients: totalPatients.length,
            rating: Number(profile.averageRating),
        },
        nextGira: profile.giras[0] ? {
            destination: profile.giras[0].destination,
            arrivalDate: profile.giras[0].arrivalDate.toISOString(),
            departureDate: profile.giras[0].departureDate.toISOString(),
        } : null,
        upcomingAppointments: profile.appointments.map((apt) => ({
            id: apt.id,
            patient: `${apt.patient.user.firstName || ""} ${apt.patient.user.lastName || ""}`,
            date: apt.scheduledDate.toISOString(),
            time: apt.scheduledTime.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }),
            status: apt.status,
            reason: apt.reason,
        })),
    };
}

// ============================================================
// DASHBOARD PACIENTE
// ============================================================

export async function getPatientDashboardData() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return null;

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: {
            patientProfile: {
                include: {
                    appointments: {
                        where: {
                            scheduledDate: { gte: new Date() },
                            status: { in: ["PENDING", "CONFIRMED"] },
                        },
                        include: {
                            professional: {
                                include: {
                                    user: {
                                        select: { firstName: true, lastName: true },
                                    },
                                },
                            },
                            gira: true,
                        },
                        orderBy: { scheduledDate: "asc" },
                        take: 5,
                    },
                    medicalFiles: {
                        orderBy: { createdAt: "desc" },
                        take: 5,
                        include: {
                            professional: {
                                include: {
                                    user: {
                                        select: { firstName: true, lastName: true },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    });

    if (!user?.patientProfile) return null;

    const profile = user.patientProfile;

    return {
        patient: {
            firstName: user.firstName || "",
            lastName: user.lastName || "",
        },
        upcomingAppointments: profile.appointments.map((apt) => ({
            id: apt.id,
            professional: `Dr. ${apt.professional.user.firstName || ""} ${apt.professional.user.lastName || ""}`,
            specialty: apt.professional.specialty,
            date: apt.scheduledDate.toISOString(),
            time: apt.scheduledTime.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }),
            location: apt.gira?.consultationAddress || "",
            status: apt.status,
            depositPaid: apt.depositStatus === "COMPLETED",
        })),
        medicalFiles: profile.medicalFiles.map((file) => ({
            id: file.id,
            name: file.fileName,
            type: file.fileType,
            date: file.createdAt.toISOString(),
            professional: `Dr. ${file.professional.user.firstName || ""} ${file.professional.user.lastName || ""}`,
            size: `${Math.round(file.fileSize / 1024)} KB`,
        })),
    };
}

export async function getPatientAppointments() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return [];

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: { patientProfile: true },
    });

    if (!user?.patientProfile) return [];

    const appointments = await prisma.appointment.findMany({
        where: { patientId: user.patientProfile.id },
        include: {
            professional: {
                include: { user: true },
            },
            gira: true,
        },
        orderBy: { scheduledDate: "desc" },
    });

    return appointments.map(apt => ({
        id: apt.id,
        professional: `Dr. ${apt.professional.user.firstName || ""} ${apt.professional.user.lastName || ""}`,
        specialty: apt.professional.specialty,
        date: apt.scheduledDate.toISOString(),
        time: apt.scheduledTime.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }),
        location: apt.gira?.consultationAddress || "",
        status: apt.status,
        depositPaid: apt.depositStatus === "COMPLETED",
    }));
}

export async function cancelAppointment(id: string) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) throw new Error("Unauthorized");

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: { patientProfile: true },
    });

    if (!user?.patientProfile) throw new Error("Unauthorized");

    // Verify ownership
    const appointment = await prisma.appointment.findUnique({
        where: { id },
    });

    if (!appointment || appointment.patientId !== user.patientProfile.id) {
        throw new Error("Unauthorized");
    }

    await prisma.appointment.update({
        where: { id },
        data: { status: "CANCELED", canceledAt: new Date() },
    });

    return { success: true };
}


export async function verifyProfessional(id: string, status: "APPROVED" | "REJECTED") {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== "SUPER_ADMIN") {
        throw new Error("Unauthorized");
    }

    await prisma.professionalProfile.update({
        where: { id },
        data: {
            verificationStatus: status,
            verifiedAt: status === "APPROVED" ? new Date() : null,
            verifiedBy: session.user.email,
        },
    });

    return { success: true };
}

// ============================================================
// ADMIN
// ============================================================

export async function getAdminDashboardData() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== "SUPER_ADMIN") return null;

    const [
        totalProfessionals,
        totalPatients,
        pendingVerifications,
        subscriptionsByPlan,
    ] = await Promise.all([
        prisma.professionalProfile.count(),
        prisma.patientProfile.count(),
        prisma.professionalProfile.count({
            where: { verificationStatus: "PENDING" },
        }),
        prisma.subscription.groupBy({
            by: ["planId"],
            _count: true,
        }),
    ]);

    const pendingProfiles = await prisma.professionalProfile.findMany({
        where: { verificationStatus: "PENDING" },
        include: {
            user: {
                select: { firstName: true, lastName: true, email: true },
            },
        },
        orderBy: { createdAt: "desc" },
        take: 5,
    });

    const recentProfessionals = await prisma.professionalProfile.findMany({
        include: {
            user: {
                select: { firstName: true, lastName: true, email: true, role: true },
            },
        },
        orderBy: { createdAt: "desc" },
        take: 10,
    });

    return {
        stats: {
            totalProfessionals,
            totalPatients,
            pendingVerifications,
        },
        pendingVerifications: pendingProfiles.map((p) => ({
            id: p.id,
            name: `${p.user.firstName || ""} ${p.user.lastName || ""}`,
            email: p.user.email,
            specialty: p.specialty,
            license: p.licenseNumber,
            submittedAt: p.createdAt.toISOString(),
        })),
        recentProfessionals: recentProfessionals.map((p) => ({
            id: p.id,
            name: `${p.user.firstName || ""} ${p.user.lastName || ""}`,
            email: p.user.email,
            tier: p.user.role.replace("PRO_", "").toLowerCase(),
            verified: p.verificationStatus === "APPROVED",
            status: p.verificationStatus === "APPROVED" ? "active" : "pending",
        })),
    };
}

// ============================================================
// SPECIALTIES
// ============================================================

export async function getSpecialties() {
    const specialties = await prisma.specialty.findMany({
        where: { isActive: true },
        orderBy: { displayName: "asc" },
    });

    return specialties.map((s) => ({
        id: s.id,
        name: s.name,
        displayName: s.displayName,
        icon: s.icon,
    }));
}
