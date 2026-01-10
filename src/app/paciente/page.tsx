"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    Calendar,
    FileText,
    Heart,
    Settings,
    LogOut,
    Search,
    Bell,
    ChevronRight,
    Clock,
    MapPin,
    Stethoscope,
    Menu,
    X,
    Download,
    Eye,
    Plus,
    Star,
    CheckCircle2,
    AlertCircle
} from "lucide-react";

// Datos de ejemplo
const upcomingAppointments = [
    {
        id: "1",
        professional: "Dr. Carlos Méndez",
        specialty: "Cardiología",
        date: "2026-02-15",
        time: "10:00",
        location: "Av. San Martín 456, Ushuaia",
        status: "confirmed",
        depositPaid: true,
    },
    {
        id: "2",
        professional: "Dra. María Rodríguez",
        specialty: "Dermatología",
        date: "2026-02-22",
        time: "14:30",
        location: "Consultorio Centro Médico",
        status: "pending",
        depositPaid: false,
    },
];

const medicalFiles = [
    {
        id: "1",
        name: "Electrocardiograma",
        type: "LAB_RESULT",
        date: "2025-12-15",
        professional: "Dr. Carlos Méndez",
        size: "2.4 MB",
    },
    {
        id: "2",
        name: "Receta - Medicación Cardíaca",
        type: "PRESCRIPTION",
        date: "2025-12-15",
        professional: "Dr. Carlos Méndez",
        size: "156 KB",
    },
    {
        id: "3",
        name: "Análisis de Sangre Completo",
        type: "LAB_RESULT",
        date: "2025-11-20",
        professional: "Dr. Carlos Méndez",
        size: "1.1 MB",
    },
];

const menuItems = [
    { icon: LayoutDashboard, label: "Mi Salud", href: "/paciente", active: true },
    { icon: Calendar, label: "Mis Turnos", href: "/paciente/turnos" },
    { icon: FileText, label: "Documentos", href: "/paciente/documentos" },
    { icon: Heart, label: "Favoritos", href: "/paciente/favoritos" },
    { icon: Settings, label: "Configuración", href: "/paciente/configuracion" },
];

export default function PatientDashboardPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("es-AR", {
            weekday: "long",
            day: "numeric",
            month: "long",
        });
    };

    const getFileIcon = (type: string) => {
        switch (type) {
            case "PRESCRIPTION":
                return "📋";
            case "LAB_RESULT":
                return "🔬";
            case "IMAGING":
                return "🩻";
            default:
                return "📄";
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#E2E8F0] transform transition-transform duration-300 lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 border-b border-[#E2E8F0]">
                        <div className="flex items-center justify-between">
                            <Link href="/" className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00F5D4] to-[#00C4AA] flex items-center justify-center">
                                    <Stethoscope className="w-5 h-5 text-[#0A192F]" />
                                </div>
                                <span className="text-xl font-bold text-[#0A192F]">VORA</span>
                            </Link>
                            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-[#64748B]">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-2">
                        {menuItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${item.active
                                        ? "bg-[#00F5D4]/10 text-[#0A192F]"
                                        : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0A192F]"
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 ${item.active ? "text-[#00F5D4]" : ""}`} />
                                <span className="font-medium">{item.label}</span>
                                {item.active && <div className="w-1.5 h-1.5 ml-auto rounded-full bg-[#00F5D4]" />}
                            </Link>
                        ))}
                    </nav>

                    {/* User */}
                    <div className="p-4 border-t border-[#E2E8F0]">
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F8FAFC]">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00F5D4] to-[#00C4AA] flex items-center justify-center text-[#0A192F] font-bold">
                                MG
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-[#0A192F] truncate">María González</p>
                                <p className="text-xs text-[#64748B]">Paciente</p>
                            </div>
                            <button className="text-[#64748B] hover:text-[#0A192F]">
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Bar */}
                <header className="bg-white border-b border-[#E2E8F0] px-6 py-4 sticky top-0 z-30">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
                                <Menu className="w-6 h-6 text-[#64748B]" />
                            </button>
                            <div>
                                <h1 className="text-xl font-bold text-[#0A192F]">Mi Salud</h1>
                                <p className="text-sm text-[#64748B]">Bienvenida, María</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="relative p-2 rounded-xl hover:bg-[#F8FAFC] transition-colors">
                                <Bell className="w-6 h-6 text-[#64748B]" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                            </button>
                            <Link
                                href="/buscar"
                                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#0A192F] text-white font-semibold rounded-xl hover:bg-[#091527] transition-colors"
                            >
                                <Search className="w-4 h-4" />
                                Buscar Profesional
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-6">
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
                                    <p className="text-2xl font-bold text-[#0A192F]">{upcomingAppointments.length}</p>
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
                                    <p className="text-2xl font-bold text-[#0A192F]">{medicalFiles.length}</p>
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
                                    <p className="text-2xl font-bold text-[#0A192F]">3</p>
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

                            {upcomingAppointments.length > 0 ? (
                                <div className="space-y-4">
                                    {upcomingAppointments.map((apt) => (
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
                                                    {apt.status === "confirmed" ? (
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
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>{apt.location}</span>
                                                </div>
                                            </div>

                                            {!apt.depositPaid && apt.status === "pending" && (
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
                                {medicalFiles.map((file) => (
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
                                ))}
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
                </main>
            </div>
        </div>
    );
}
