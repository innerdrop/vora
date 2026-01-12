"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    Calendar,
    FileText,
    Heart,
    Search,
    CheckCircle2,
    AlertCircle,
    MapPin,
    Clock,
    Download,
    Eye
} from "lucide-react";

interface PatientDashboardData {
    patient: {
        firstName: string;
        lastName: string;
    };
    upcomingAppointments: {
        id: string;
        professional: string;
        specialty: string;
        date: string;
        time: string;
        location: string;
        status: string;
        depositPaid: boolean;
    }[];
    medicalFiles: {
        id: string;
        name: string;
        type: string;
        date: string;
        professional: string;
        size: string;
    }[];
}

export function PatientHomeClient({ data }: { data: PatientDashboardData | null }) {
    if (!data) return <div className="p-6">Cargando perfil...</div>;

    const getFileIcon = (type: string) => {
        switch (type) {
            case "PRESCRIPTION": return "📋";
            case "LAB_RESULT": return "🔬";
            case "IMAGING": return "🩻";
            default: return "📄";
        }
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("es-AR", {
            weekday: "long",
            day: "numeric",
            month: "long",
        });
    };

    return (
        <>
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#0A192F]">Hola, {data.patient.firstName}</h2>
                <p className="text-[#64748B]">Este es tu resumen de salud de hoy.</p>
            </div>

            {/* Quick Stats */}
            <div className="grid sm:grid-cols-3 gap-6 mb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl border border-[#E2E8F0] p-6"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#00F5D4]/10 flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-[#00F5D4]" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-[#0A192F]">{data.upcomingAppointments.length}</p>
                            <p className="text-sm text-[#64748B]">Turnos próximos</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl border border-[#E2E8F0] p-6"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                            <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-[#0A192F]">{data.medicalFiles.length}</p>
                            <p className="text-sm text-[#64748B]">Documentos</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl border border-[#E2E8F0] p-6"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center">
                            <Heart className="w-6 h-6 text-pink-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-[#0A192F]">0</p>
                            <p className="text-sm text-[#64748B]">Favoritos</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Upcoming Appointments */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2E8F0] p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-[#0A192F]">Próximos Turnos</h2>
                        <Link href="/paciente/turnos" className="text-sm text-[#00F5D4] font-semibold hover:underline">
                            Ver todos
                        </Link>
                    </div>

                    {data.upcomingAppointments.length > 0 ? (
                        <div className="space-y-4">
                            {data.upcomingAppointments.map((apt) => (
                                <div key={apt.id} className="p-4 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] transition-colors">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00F5D4] to-[#00C4AA] flex items-center justify-center text-[#0A192F] font-bold">
                                                {apt.professional.split(" ").slice(1).map(n => n[0]).join("")}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-[#0A192F]">{apt.professional}</p>
                                                <p className="text-sm text-[#64748B]">{apt.specialty}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {apt.status === "CONFIRMED" ? (
                                                <span className="flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-lg">
                                                    <CheckCircle2 className="w-3 h-3" />
                                                    Confirmado
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-lg">
                                                    <AlertCircle className="w-3 h-3" />
                                                    Pendiente
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-4 text-sm text-[#64748B]">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>{formatDate(apt.date)}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            <span>{apt.time} hs</span>
                                        </div>
                                        {apt.location && (
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4" />
                                                <span>{apt.location}</span>
                                            </div>
                                        )}
                                    </div>

                                    {!apt.depositPaid && apt.status === "PENDING" && (
                                        <div className="mt-3 p-3 bg-amber-50 border border-amber-100 rounded-lg">
                                            <p className="text-sm text-amber-700">
                                                ⚠️ Pendiente de pago de seña para confirmar turno
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#F8FAFC] flex items-center justify-center">
                                <Calendar className="w-8 h-8 text-[#94A3B8]" />
                            </div>
                            <h3 className="font-semibold text-[#0A192F] mb-2">No tenés turnos próximos</h3>
                            <p className="text-sm text-[#64748B] mb-4">Buscá un profesional y reservá tu próximo turno</p>
                            <Link href="/buscar" className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A192F] text-white font-semibold rounded-xl hover:bg-[#091527]">
                                <Search className="w-4 h-4" />
                                Buscar Profesional
                            </Link>
                        </div>
                    )}
                </div>

                {/* Medical Files */}
                <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-[#0A192F]">Documentos Recientes</h2>
                        <Link href="/paciente/documentos" className="text-sm text-[#00F5D4] font-semibold hover:underline">
                            Ver todos
                        </Link>
                    </div>

                    <div className="space-y-3">
                        {data.medicalFiles.length > 0 ? (
                            data.medicalFiles.map((file) => (
                                <div key={file.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F8FAFC] transition-colors group">
                                    <div className="text-2xl">{getFileIcon(file.type)}</div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-[#0A192F] truncate">{file.name}</p>
                                        <p className="text-xs text-[#94A3B8]">{new Date(file.date).toLocaleDateString("es-AR")} • {file.size}</p>
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 rounded-lg hover:bg-[#E2E8F0]">
                                            <Eye className="w-4 h-4 text-[#64748B]" />
                                        </button>
                                        <button className="p-2 rounded-lg hover:bg-[#E2E8F0]">
                                            <Download className="w-4 h-4 text-[#64748B]" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-[#64748B] text-center py-4">No tenés documentos guardados.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Find a Doctor CTA */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 bg-gradient-to-br from-[#0A192F] to-[#1E293B] rounded-2xl p-8 text-white"
            >
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-2xl font-bold mb-2">¿Necesitás un especialista?</h3>
                        <p className="text-white/70">Encontrá profesionales verificados que viajan a Ushuaia</p>
                    </div>
                    <Link
                        href="/buscar"
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00F5D4] to-[#00C4AA] text-[#0A192F] font-bold rounded-xl hover:opacity-90 transition-opacity"
                    >
                        <Search className="w-5 h-5" />
                        Buscar Profesionales
                    </Link>
                </div>
            </motion.div>
        </>
    );
}
