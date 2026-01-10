import { PrismaClient, UserRole, VerificationStatus, GiraStatus } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding database...");

    // ============================================================
    // SUBSCRIPTION PLANS
    // ============================================================
    console.log("📦 Creating subscription plans...");

    const startPlan = await prisma.subscriptionPlan.upsert({
        where: { id: "plan_start" },
        update: {},
        create: {
            id: "plan_start",
            name: "START",
            displayName: "Start",
            description: "Plan gratuito para comenzar. Perfil público con información de contacto básica.",
            price: 0,
            currency: "ARS",
            interval: "month",
            features: [
                { key: "public_profile", name: "Perfil Público", enabled: true },
                { key: "static_contact", name: "Contacto Estático", enabled: true },
            ],
            maxGirasPerMonth: 1,
            maxAppointmentsPerGira: 5,
            isActive: true,
        },
    });

    const growPlan = await prisma.subscriptionPlan.upsert({
        where: { id: "plan_grow" },
        update: {},
        create: {
            id: "plan_grow",
            name: "GROW",
            displayName: "Grow",
            description: "Conectividad social, gestión de giras y sistema de turnos automatizado.",
            price: 15000,
            currency: "ARS",
            interval: "month",
            features: [
                { key: "public_profile", name: "Perfil Público", enabled: true },
                { key: "static_contact", name: "Contacto Estático", enabled: true },
                { key: "whatsapp_button", name: "Botón de WhatsApp", enabled: true },
                { key: "instagram_embed", name: "Instagram Embed", enabled: true },
                { key: "gira_calendar", name: "Calendario de Giras", enabled: true },
                { key: "appointment_engine", name: "Motor de Turnos", enabled: true },
                { key: "reviews", name: "Reseñas", enabled: true },
            ],
            maxGirasPerMonth: 4,
            maxAppointmentsPerGira: 20,
            isActive: true,
        },
    });

    const elitePlan = await prisma.subscriptionPlan.upsert({
        where: { id: "plan_elite" },
        update: {},
        create: {
            id: "plan_elite",
            name: "ELITE",
            displayName: "Elite",
            description: "Todas las funciones premium: cobro de señas, vault médico y recordatorios automáticos.",
            price: 35000,
            currency: "ARS",
            interval: "month",
            features: [
                { key: "public_profile", name: "Perfil Público", enabled: true },
                { key: "static_contact", name: "Contacto Estático", enabled: true },
                { key: "whatsapp_button", name: "Botón de WhatsApp", enabled: true },
                { key: "instagram_embed", name: "Instagram Embed", enabled: true },
                { key: "gira_calendar", name: "Calendario de Giras", enabled: true },
                { key: "appointment_engine", name: "Motor de Turnos", enabled: true },
                { key: "reviews", name: "Reseñas", enabled: true },
                { key: "payment_gateway", name: "Cobro de Señas", enabled: true },
                { key: "medical_vault", name: "Vault Médico", enabled: true },
                { key: "smart_reminders", name: "Recordatorios Automáticos", enabled: true },
                { key: "priority_support", name: "Soporte Prioritario", enabled: true },
            ],
            maxGirasPerMonth: null, // Unlimited
            maxAppointmentsPerGira: null, // Unlimited
            isActive: true,
        },
    });

    console.log("✅ Subscription plans created");

    // ============================================================
    // SPECIALTIES
    // ============================================================
    console.log("🏥 Creating medical specialties...");

    const specialties = [
        { name: "cardiologia", displayName: "Cardiología", icon: "❤️" },
        { name: "dermatologia", displayName: "Dermatología", icon: "🔬" },
        { name: "endocrinologia", displayName: "Endocrinología", icon: "🧪" },
        { name: "gastroenterologia", displayName: "Gastroenterología", icon: "🫁" },
        { name: "ginecologia", displayName: "Ginecología", icon: "👩‍⚕️" },
        { name: "neurologia", displayName: "Neurología", icon: "🧠" },
        { name: "oftalmologia", displayName: "Oftalmología", icon: "👁️" },
        { name: "oncologia", displayName: "Oncología", icon: "🎗️" },
        { name: "otorrinolaringologia", displayName: "Otorrinolaringología", icon: "👂" },
        { name: "pediatria", displayName: "Pediatría", icon: "👶" },
        { name: "psiquiatria", displayName: "Psiquiatría", icon: "🧘" },
        { name: "traumatologia", displayName: "Traumatología", icon: "🦴" },
        { name: "urologia", displayName: "Urología", icon: "🩺" },
        { name: "clinica_medica", displayName: "Clínica Médica", icon: "⚕️" },
        { name: "nutricion", displayName: "Nutrición", icon: "🥗" },
    ];

    for (const spec of specialties) {
        await prisma.specialty.upsert({
            where: { name: spec.name },
            update: {},
            create: spec,
        });
    }

    console.log("✅ Specialties created");

    // ============================================================
    // ADMIN USER
    // ============================================================
    console.log("👤 Creating admin user...");

    const adminPassword = await hash("admin123", 12);

    const adminUser = await prisma.user.upsert({
        where: { email: "admin@vora.health" },
        update: {},
        create: {
            email: "admin@vora.health",
            hashedPassword: adminPassword,
            role: UserRole.SUPER_ADMIN,
            firstName: "Admin",
            lastName: "VORA",
            emailVerified: new Date(),
        },
    });

    console.log("✅ Admin user created:", adminUser.email);

    // ============================================================
    // DEMO PROFESSIONAL (Elite tier)
    // ============================================================
    console.log("👨‍⚕️ Creating demo professional...");

    const proPassword = await hash("demo123", 12);

    const demoProUser = await prisma.user.upsert({
        where: { email: "demo.doctor@vora.health" },
        update: {},
        create: {
            email: "demo.doctor@vora.health",
            hashedPassword: proPassword,
            role: UserRole.PRO_ELITE,
            firstName: "Carlos",
            lastName: "Méndez",
            phone: "+54 11 1234-5678",
            emailVerified: new Date(),
        },
    });

    const demoProfessionalProfile = await prisma.professionalProfile.upsert({
        where: { userId: demoProUser.id },
        update: {},
        create: {
            userId: demoProUser.id,
            specialty: "Cardiología",
            licenseNumber: "MN-12345",
            licenseProvince: "CABA",
            verificationStatus: VerificationStatus.APPROVED,
            verifiedAt: new Date(),
            bio: "Cardiólogo con más de 15 años de experiencia. Especializado en cardiología preventiva y rehabilitación cardíaca. Viajo regularmente a Ushuaia para atender pacientes de la región.",
            education: [
                { institution: "Universidad de Buenos Aires", degree: "Médico", year: 2008 },
                { institution: "Hospital Italiano", degree: "Especialista en Cardiología", year: 2012 },
            ],
            experience: [
                { position: "Jefe de Cardiología", institution: "Hospital Austral", years: "2015-presente" },
            ],
            languages: ["Español", "Inglés", "Portugués"],
            publicEmail: "dr.mendez@cardio.com",
            whatsappNumber: "+5491112345678",
            instagramHandle: "dr.mendez.cardio",
            consultationPrice: 25000,
            consultationDuration: 45,
            depositRequired: true,
            depositAmount: 5000,
            averageRating: 4.8,
            totalReviews: 127,
            slug: "carlos-mendez-cardiologia",
            isPublic: true,
        },
    });

    // Create subscription for demo pro
    await prisma.subscription.upsert({
        where: { userId: demoProUser.id },
        update: {},
        create: {
            userId: demoProUser.id,
            planId: elitePlan.id,
            status: "ACTIVE",
            startDate: new Date(),
        },
    });

    // Create a sample Gira
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const endGira = new Date(nextMonth);
    endGira.setDate(endGira.getDate() + 5);

    await prisma.travelGira.upsert({
        where: { id: "demo_gira_1" },
        update: {},
        create: {
            id: "demo_gira_1",
            professionalId: demoProfessionalProfile.id,
            title: "Gira Cardiológica Febrero 2026",
            description: "Atención en consultorio privado para controles, estudios y consultas de cardiología general.",
            destination: "Ushuaia",
            arrivalDate: nextMonth,
            departureDate: endGira,
            status: GiraStatus.PUBLISHED,
            maxAppointmentsPerDay: 6,
            consultationAddress: "Av. San Martín 456, Consultorio 3",
            consultationCity: "Ushuaia",
            flightNumber: "AR1234",
            publishedAt: new Date(),
        },
    });

    console.log("✅ Demo professional created:", demoProUser.email);

    // ============================================================
    // DEMO PATIENT
    // ============================================================
    console.log("🧑 Creating demo patient...");

    const patientPassword = await hash("demo123", 12);

    const demoPatientUser = await prisma.user.upsert({
        where: { email: "paciente@demo.com" },
        update: {},
        create: {
            email: "paciente@demo.com",
            hashedPassword: patientPassword,
            role: UserRole.PATIENT,
            firstName: "María",
            lastName: "González",
            phone: "+54 2901 12-3456",
            emailVerified: new Date(),
        },
    });

    await prisma.patientProfile.upsert({
        where: { userId: demoPatientUser.id },
        update: {},
        create: {
            userId: demoPatientUser.id,
            dateOfBirth: new Date("1985-06-15"),
            gender: "Femenino",
            dni: "28.456.789",
            city: "Ushuaia",
            province: "Tierra del Fuego",
            emergencyContactName: "Juan González",
            emergencyContactPhone: "+54 2901 65-4321",
        },
    });

    console.log("✅ Demo patient created:", demoPatientUser.email);

    // ============================================================
    // SITE CONTENT (CMS)
    // ============================================================
    console.log("📝 Creating site content...");

    await prisma.siteContent.upsert({
        where: { key: "hero_banner" },
        update: {},
        create: {
            key: "hero_banner",
            content: {
                title: "Medicina sin distancia",
                subtitle: "Conectamos profesionales de la salud con pacientes en Ushuaia y Tierra del Fuego",
                ctaPrimary: { text: "Buscar Profesionales", href: "/buscar" },
                ctaSecondary: { text: "Soy Profesional", href: "/profesionales" },
            },
        },
    });

    await prisma.siteContent.upsert({
        where: { key: "footer" },
        update: {},
        create: {
            key: "footer",
            content: {
                company: "VORA Health",
                tagline: "Medicine Beyond Distance",
                email: "contacto@vora.health",
                phone: "+54 11 1234-5678",
                socialLinks: {
                    instagram: "https://instagram.com/vora.health",
                    linkedin: "https://linkedin.com/company/vora-health",
                },
            },
        },
    });

    console.log("✅ Site content created");

    console.log("\n🎉 Database seeded successfully!");
    console.log("\n📋 Demo Accounts:");
    console.log("   Admin: admin@vora.health / admin123");
    console.log("   Doctor: demo.doctor@vora.health / demo123");
    console.log("   Paciente: paciente@demo.com / demo123");
}

main()
    .catch((e) => {
        console.error("❌ Error seeding database:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
