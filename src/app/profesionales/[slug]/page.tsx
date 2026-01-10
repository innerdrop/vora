"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    MapPin,
    Calendar,
    Star,
    Shield,
    Clock,
    MessageCircle,
    Phone,
    Instagram,
    Globe,
    CheckCircle2,
    ChevronRight,
    Stethoscope,
    GraduationCap,
    Briefcase,
    Languages
} from "lucide-react";

// Datos de ejemplo del profesional
const professional = {
    id: "1",
    slug: "carlos-mendez-cardiologia",
    firstName: "Carlos",
    lastName: "Méndez",
    specialty: "Cardiología",
    rating: 4.8,
    reviews: 127,
    verified: true,
    verifiedAt: "2025-06-15",
    tier: "elite" as const,
    bio: "Cardiólogo con más de 15 años de experiencia. Especializado en cardiología preventiva y rehabilitación cardíaca. Viajo regularmente a Ushuaia para atender pacientes de la región, entendiendo las necesidades únicas de quienes viven en el fin del mundo.",
    education: [
        { institution: "Universidad de Buenos Aires", degree: "Médico", year: 2008 },
        { institution: "Hospital Italiano de Buenos Aires", degree: "Especialista en Cardiología", year: 2012 },
        { institution: "Cleveland Clinic", degree: "Fellowship en Cardiología Preventiva", year: 2014 },
    ],
    experience: [
        { position: "Jefe de Cardiología", institution: "Hospital Austral", years: "2018-presente" },
        { position: "Médico de Planta", institution: "Hospital Argerich", years: "2012-2018" },
    ],
    languages: ["Español", "Inglés", "Portugués"],
    whatsappNumber: "+5491112345678",
    instagramHandle: "dr.mendez.cardio",
    websiteUrl: "https://drmendez.com",
    consultationPrice: 25000,
    consultationDuration: 45,
    depositRequired: true,
    depositAmount: 5000,
    giras: [
        {
            id: "g1",
            title: "Gira Cardiológica Febrero 2026",
            destination: "Ushuaia",
            arrivalDate: "2026-02-15",
            departureDate: "2026-02-20",
            address: "Av. San Martín 456, Consultorio 3",
            availableSlots: 12,
            totalSlots: 30,
        },
        {
            id: "g2",
            title: "Gira Cardiológica Abril 2026",
            destination: "Ushuaia",
            arrivalDate: "2026-04-10",
            departureDate: "2026-04-15",
            address: "Av. San Martín 456, Consultorio 3",
            availableSlots: 28,
            totalSlots: 30,
        },
    ],
    reviewsList: [
        {
            id: "r1",
            patientName: "María G.",
            rating: 5,
            comment: "Excelente profesional. Me atendió con mucha paciencia y dedicación. Muy recomendable para cualquiera que necesite un cardiólogo de confianza.",
            date: "2025-12-15",
            verified: true,
        },
        {
            id: "r2",
            patientName: "Juan P.",
            rating: 5,
            comment: "El Dr. Méndez es muy profesional y humano. Me explicó todo con claridad y me dio tranquilidad. Viajó especialmente a Ushuaia y fue muy puntual.",
            date: "2025-11-28",
            verified: true,
        },
        {
            id: "r3",
            patientName: "Laura S.",
            rating: 4,
            comment: "Muy buena atención. El turno fue un poco corto pero resolvió todas mis dudas. Lo recomiendo.",
            date: "2025-10-20",
            verified: true,
        },
    ],
};

export default function ProfessionalProfilePage() {
    const [activeTab, setActiveTab] = useState<"about" | "giras" | "reviews">("about");

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("es-AR", {
            weekday: "long",
            day: "numeric",
            month: "long",
        });
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* Header */}
            <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/buscar"
                                className="p-2 rounded-xl hover:bg-[#F8FAFC] transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5 text-[#64748B]" />
                            </Link>
                            <Link href="/" className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00F5D4] to-[#00C4AA] flex items-center justify-center">
                                    <Stethoscope className="w-5 h-5 text-[#0A192F]" />
                                </div>
                                <span className="text-xl font-bold text-[#0A192F]">VORA</span>
                            </Link>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link href="/auth/login" className="text-sm font-semibold text-[#64748B] hover:text-[#0A192F]">
                                Iniciar Sesión
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Profile Header */}
            <section className="bg-gradient-to-b from-[#0A192F] to-[#1E293B] py-12 px-6">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row items-start gap-8"
                    >
                        {/* Avatar */}
                        <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-[#00F5D4] to-[#00C4AA] flex items-center justify-center text-[#0A192F] font-bold text-4xl shadow-2xl">
                            {professional.firstName[0]}{professional.lastName[0]}
                        </div>

                        {/* Info */}
                        <div className="flex-1 text-white">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                <h1 className="text-3xl font-bold">
                                    Dr. {professional.firstName} {professional.lastName}
                                </h1>
                                {professional.verified && (
                                    <div className="flex items-center gap-1 px-3 py-1 bg-[#00F5D4]/20 rounded-full">
                                        <Shield className="w-4 h-4 text-[#00F5D4]" />
                                        <span className="text-sm font-medium text-[#00F5D4]">Verificado</span>
                                    </div>
                                )}
                                {professional.tier === "elite" && (
                                    <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full">
                                        <span className="text-sm font-semibold text-white">⭐ Elite</span>
                                    </div>
                                )}
                            </div>

                            <p className="text-white/70 text-lg mb-4">{professional.specialty}</p>

                            {/* Stats */}
                            <div className="flex flex-wrap items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                                    <span className="font-semibold">{professional.rating}</span>
                                    <span className="text-white/60">({professional.reviews} reseñas)</span>
                                </div>
                                <div className="flex items-center gap-2 text-white/70">
                                    <Clock className="w-5 h-5" />
                                    <span>{professional.consultationDuration} min consulta</span>
                                </div>
                                <div className="flex items-center gap-2 text-white/70">
                                    <MapPin className="w-5 h-5" />
                                    <span>Atiende en Ushuaia</span>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="w-full md:w-auto">
                            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                                <div className="text-center mb-4">
                                    <span className="text-white/60 text-sm">Consulta desde</span>
                                    <p className="text-3xl font-bold text-white">{formatPrice(professional.consultationPrice)}</p>
                                </div>
                                <a
                                    href={`https://wa.me/${professional.whatsappNumber}?text=Hola Dr. ${professional.lastName}, me gustaría consultar sobre un turno.`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-2 h-12 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#1DAF54] transition-colors"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Contactar por WhatsApp
                                </a>
                                {professional.depositRequired && (
                                    <p className="text-center text-white/50 text-xs mt-3">
                                        Seña requerida: {formatPrice(professional.depositAmount || 0)}
                                    </p>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Tabs */}
            <div className="bg-white border-b border-[#E2E8F0] sticky top-[73px] z-30">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="flex gap-8">
                        {[
                            { key: "about", label: "Sobre mí" },
                            { key: "giras", label: "Próximas Giras" },
                            { key: "reviews", label: `Reseñas (${professional.reviews})` },
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                                className={`py-4 text-sm font-semibold border-b-2 transition-colors ${activeTab === tab.key
                                        ? "border-[#00F5D4] text-[#0A192F]"
                                        : "border-transparent text-[#64748B] hover:text-[#0A192F]"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <section className="py-12 px-6">
                <div className="max-w-5xl mx-auto">
                    {/* About Tab */}
                    {activeTab === "about" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="grid lg:grid-cols-3 gap-8"
                        >
                            {/* Bio */}
                            <div className="lg:col-span-2 space-y-8">
                                <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
                                    <h2 className="text-xl font-bold text-[#0A192F] mb-4">Biografía</h2>
                                    <p className="text-[#64748B] leading-relaxed">{professional.bio}</p>
                                </div>

                                {/* Education */}
                                <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <GraduationCap className="w-5 h-5 text-[#00F5D4]" />
                                        <h2 className="text-xl font-bold text-[#0A192F]">Formación</h2>
                                    </div>
                                    <div className="space-y-4">
                                        {professional.education.map((edu, index) => (
                                            <div key={index} className="flex gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] flex items-center justify-center text-[#0A192F] font-bold text-sm">
                                                    {edu.year}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-[#0A192F]">{edu.degree}</p>
                                                    <p className="text-sm text-[#64748B]">{edu.institution}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Experience */}
                                <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Briefcase className="w-5 h-5 text-[#00F5D4]" />
                                        <h2 className="text-xl font-bold text-[#0A192F]">Experiencia</h2>
                                    </div>
                                    <div className="space-y-4">
                                        {professional.experience.map((exp, index) => (
                                            <div key={index} className="flex gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-[#00F5D4]/10 flex items-center justify-center">
                                                    <Briefcase className="w-5 h-5 text-[#00F5D4]" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-[#0A192F]">{exp.position}</p>
                                                    <p className="text-sm text-[#64748B]">{exp.institution} • {exp.years}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                {/* Languages */}
                                <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Languages className="w-5 h-5 text-[#00F5D4]" />
                                        <h3 className="font-bold text-[#0A192F]">Idiomas</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {professional.languages.map((lang) => (
                                            <span key={lang} className="px-3 py-1 bg-[#F8FAFC] rounded-full text-sm text-[#64748B]">
                                                {lang}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
                                    <h3 className="font-bold text-[#0A192F] mb-4">Contacto</h3>
                                    <div className="space-y-3">
                                        <a
                                            href={`https://wa.me/${professional.whatsappNumber}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F8FAFC] transition-colors group"
                                        >
                                            <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 flex items-center justify-center">
                                                <MessageCircle className="w-5 h-5 text-[#25D366]" />
                                            </div>
                                            <span className="text-[#64748B] group-hover:text-[#0A192F]">WhatsApp</span>
                                            <ChevronRight className="w-4 h-4 ml-auto text-[#94A3B8]" />
                                        </a>
                                        {professional.instagramHandle && (
                                            <a
                                                href={`https://instagram.com/${professional.instagramHandle}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F8FAFC] transition-colors group"
                                            >
                                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center">
                                                    <Instagram className="w-5 h-5 text-pink-500" />
                                                </div>
                                                <span className="text-[#64748B] group-hover:text-[#0A192F]">@{professional.instagramHandle}</span>
                                                <ChevronRight className="w-4 h-4 ml-auto text-[#94A3B8]" />
                                            </a>
                                        )}
                                        {professional.websiteUrl && (
                                            <a
                                                href={professional.websiteUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F8FAFC] transition-colors group"
                                            >
                                                <div className="w-10 h-10 rounded-xl bg-[#0A192F]/5 flex items-center justify-center">
                                                    <Globe className="w-5 h-5 text-[#0A192F]" />
                                                </div>
                                                <span className="text-[#64748B] group-hover:text-[#0A192F]">Sitio web</span>
                                                <ChevronRight className="w-4 h-4 ml-auto text-[#94A3B8]" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Giras Tab */}
                    {activeTab === "giras" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-6"
                        >
                            {professional.giras.map((gira) => (
                                <div key={gira.id} className="bg-white rounded-2xl border border-[#E2E8F0] p-6 hover:shadow-lg transition-all">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div>
                                            <h3 className="text-xl font-bold text-[#0A192F] mb-2">{gira.title}</h3>
                                            <div className="flex flex-wrap items-center gap-4 text-[#64748B]">
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4 text-[#00F5D4]" />
                                                    <span>{gira.destination}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>{formatDate(gira.arrivalDate)} al {formatDate(gira.departureDate)}</span>
                                                </div>
                                            </div>
                                            <p className="text-sm text-[#94A3B8] mt-2">📍 {gira.address}</p>
                                        </div>

                                        <div className="flex items-center gap-6">
                                            <div className="text-center">
                                                <p className="text-2xl font-bold text-[#00F5D4]">{gira.availableSlots}</p>
                                                <p className="text-xs text-[#64748B]">turnos disponibles</p>
                                            </div>
                                            <a
                                                href={`https://wa.me/${professional.whatsappNumber}?text=Hola, quiero reservar un turno para la gira "${gira.title}"`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-6 py-3 bg-[#0A192F] text-white font-semibold rounded-xl hover:bg-[#091527] transition-colors"
                                            >
                                                Reservar Turno
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {/* Reviews Tab */}
                    {activeTab === "reviews" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-6"
                        >
                            {/* Rating Summary */}
                            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
                                <div className="flex items-center gap-8">
                                    <div className="text-center">
                                        <p className="text-5xl font-bold text-[#0A192F]">{professional.rating}</p>
                                        <div className="flex items-center justify-center gap-1 my-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className={`w-5 h-5 ${star <= Math.round(professional.rating)
                                                            ? "text-amber-400 fill-amber-400"
                                                            : "text-[#E2E8F0]"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-sm text-[#64748B]">{professional.reviews} reseñas</p>
                                    </div>
                                </div>
                            </div>

                            {/* Reviews List */}
                            {professional.reviewsList.map((review) => (
                                <div key={review.id} className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-[#F8FAFC] flex items-center justify-center text-[#0A192F] font-semibold">
                                                {review.patientName[0]}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <p className="font-semibold text-[#0A192F]">{review.patientName}</p>
                                                    {review.verified && (
                                                        <CheckCircle2 className="w-4 h-4 text-[#00F5D4]" />
                                                    )}
                                                </div>
                                                <p className="text-sm text-[#64748B]">{new Date(review.date).toLocaleDateString("es-AR")}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className={`w-4 h-4 ${star <= review.rating
                                                            ? "text-amber-400 fill-amber-400"
                                                            : "text-[#E2E8F0]"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-[#64748B] leading-relaxed">{review.comment}</p>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>
        </div>
    );
}
