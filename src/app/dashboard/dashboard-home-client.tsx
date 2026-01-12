"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    Calendar,
    Users,
    ChevronRight,
    MapPin,
    TrendingUp,
    Star,
    DollarSign,
    Settings,
    Eye,
    CheckCircle2,
    AlertCircle
} from "lucide-react";

interface DashboardData {
    professional: {
        firstName: string;
        lastName: string;
        specialty: string;
        rating: number;
        reviews: number;
    };
    stats: {
        appointmentsThisMonth: number;
        totalPatients: number;
        rating: number;
    };
    nextGira: {
        destination: string;
        arrivalDate: string;
        departureDate: string;
    } | null;
    upcomingAppointments: {
        id: string;
        patient: string;
        date: string;
        time: string;
        status: string;
        reason: string | null;
    }[];
}

export function DashboardHomeClient({ data }: { data: DashboardData | null }) {
    if (!data) {
        return <div className="p-6">Cargando información del perfil...</div>;
    }

    const stats = [
        {
            label: "Turnos este mes",
            value: data.stats.appointmentsThisMonth.toString(),
            change: "vs mes pasado",
            icon: Calendar,
            color: "from-[#00F5D4] to-[#00C4AA]"
        },
        {
            label: "Pacientes totales",
            value: data.stats.totalPatients.toString(),
            change: "histórico",
            icon: Users,
            color: "from-[#6366F1] to-[#8B5CF6]"
        },
        {
            label: "Valoración",
            value: data.stats.rating.toFixed(1),
            change: `(${data.professional.reviews} reseñas)`,
            icon: Star,
            color: "from-amber-400 to-orange-500"
        },
        // Placeholder for revenue as we don't have it in backend yet
        {
            label: "Ingresos estimados",
            value: "$0",
            change: "Proximamente",
            icon: DollarSign,
            color: "from-emerald-400 to-green-500"
        },
    ];

    return (
        <>
            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-2xl border border-[#E2E8F0] p-6"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                            <span className="flex items-center gap-1 text-sm text-emerald-500 font-medium">
                                <TrendingUp className="w-4 h-4" />
                                {stat.change}
                            </span>
                        </div>
                        <p className="text-2xl font-bold text-[#0A192F]">{stat.value}</p>
                        <p className="text-sm text-[#64748B]">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Upcoming Appointments */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2E8F0] p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-[#0A192F]">Próximos Turnos</h2>
                        <Link href="/dashboard/turnos" className="text-sm text-[#00F5D4] font-semibold hover:underline">
                            Ver todos
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {data.upcomingAppointments.length > 0 ? (
                            data.upcomingAppointments.map((apt) => (
                                <div key={apt.id} className="flex items-center gap-4 p-4 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] transition-colors">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00F5D4] to-[#00C4AA] flex items-center justify-center text-[#0A192F] font-bold">
                                        {apt.patient.split(" ").map(n => n[0]).join("")}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="font-semibold text-[#0A192F]">{apt.patient}</p>
                                            {apt.status === "CONFIRMED" ? (
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                            ) : (
                                                <AlertCircle className="w-4 h-4 text-amber-500" />
                                            )}
                                        </div>
                                        <p className="text-sm text-[#64748B] truncate">{apt.reason || "Sin motivo especificado"}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-[#0A192F]">{apt.time}</p>
                                        <p className="text-sm text-[#64748B]">{new Date(apt.date).toLocaleDateString("es-AR", { day: "numeric", month: "short" })}</p>
                                    </div>
                                    <button className="p-2 rounded-lg hover:bg-white transition-colors">
                                        <ChevronRight className="w-5 h-5 text-[#94A3B8]" />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-[#64748B] py-4">No hay turnos próximos agendados.</p>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-6">
                    {/* Next Gira */}
                    <div className="bg-gradient-to-br from-[#0A192F] to-[#1E293B] rounded-2xl p-6 text-white">
                        <div className="flex items-center gap-2 mb-4">
                            <MapPin className="w-5 h-5 text-[#00F5D4]" />
                            <span className="text-sm font-medium text-white/70">Próxima Gira</span>
                        </div>
                        {data.nextGira ? (
                            <>
                                <h3 className="text-xl font-bold mb-2">{data.nextGira.destination}</h3>
                                <p className="text-white/70 mb-4">
                                    {new Date(data.nextGira.arrivalDate).toLocaleDateString("es-AR", { day: "numeric", month: "short" })} - {new Date(data.nextGira.departureDate).toLocaleDateString("es-AR", { day: "numeric", month: "short", year: "numeric" })}
                                </p>
                                <div className="flex items-center justify-between p-3 rounded-xl bg-white/10">
                                    <Link href="/dashboard/giras" className="w-full text-center px-4 py-2 bg-white text-[#0A192F] font-semibold rounded-xl text-sm hover:bg-white/90 transition-colors">
                                        Gestionar Giras
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <>
                                <h3 className="text-xl font-bold mb-2">Sin giras programadas</h3>
                                <p className="text-white/70 mb-4">Creá tu próxima gira para recibir pacientes.</p>
                                <Link href="/dashboard/giras/nueva" className="block w-full text-center px-4 py-2 bg-[#00F5D4] text-[#0A192F] font-semibold rounded-xl text-sm hover:bg-[#00E0C2] transition-colors">
                                    Crear Gira
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Profile & Quick Links */}
                    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
                        <h3 className="font-semibold text-[#0A192F] mb-4">Acciones rápidas</h3>
                        <div className="space-y-3">
                            <Link href="/dashboard/perfil" className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F8FAFC] transition-colors group">
                                <Settings className="w-5 h-5 text-[#64748B] group-hover:text-[#00F5D4]" />
                                <span className="text-[#64748B] group-hover:text-[#0A192F]">Editar perfil</span>
                            </Link>
                            <Link href={`/profesionales/perfil`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F8FAFC] transition-colors group">
                                <Eye className="w-5 h-5 text-[#64748B] group-hover:text-[#00F5D4]" />
                                <span className="text-[#64748B] group-hover:text-[#0A192F]">Ver perfil público</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
