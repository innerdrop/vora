"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    Calendar,
    Users,
    FileText,
    Settings,
    LogOut,
    Bell,
    ChevronRight,
    Plus,
    MapPin,
    Clock,
    TrendingUp,
    Star,
    DollarSign,
    Stethoscope,
    Menu,
    X,
    CheckCircle2,
    AlertCircle,
    Eye
} from "lucide-react";

// Datos de ejemplo
const stats = [
    { label: "Turnos este mes", value: "24", change: "+12%", icon: Calendar, color: "from-[#00F5D4] to-[#00C4AA]" },
    { label: "Pacientes totales", value: "127", change: "+8%", icon: Users, color: "from-[#6366F1] to-[#8B5CF6]" },
    { label: "Valoración", value: "4.8", change: "+0.2", icon: Star, color: "from-amber-400 to-orange-500" },
    { label: "Ingresos del mes", value: "$425.000", change: "+22%", icon: DollarSign, color: "from-emerald-400 to-green-500" },
];

const upcomingAppointments = [
    { id: "1", patient: "María González", time: "10:00", date: "2026-01-15", status: "confirmed", reason: "Control cardiológico" },
    { id: "2", patient: "Juan Pérez", time: "11:00", date: "2026-01-15", status: "pending", reason: "Primera consulta" },
    { id: "3", patient: "Laura Sánchez", time: "14:30", date: "2026-01-15", status: "confirmed", reason: "Seguimiento" },
];

const notifications = [
    { id: "1", type: "appointment", message: "Nueva solicitud de turno de María González", time: "Hace 5 min" },
    { id: "2", type: "review", message: "Juan Pérez dejó una reseña de 5 estrellas", time: "Hace 1 hora" },
    { id: "3", type: "payment", message: "Pago de seña recibido: $5.000", time: "Hace 2 horas" },
];

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", active: true },
    { icon: Calendar, label: "Mis Giras", href: "/dashboard/giras" },
    { icon: Users, label: "Pacientes", href: "/dashboard/pacientes" },
    { icon: FileText, label: "Vault Médico", href: "/dashboard/vault" },
    { icon: Settings, label: "Configuración", href: "/dashboard/configuracion" },
];

export default function DashboardPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0A192F] transform transition-transform duration-300 lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 border-b border-white/10">
                        <div className="flex items-center justify-between">
                            <Link href="/" className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00F5D4] to-[#00C4AA] flex items-center justify-center">
                                    <Stethoscope className="w-5 h-5 text-[#0A192F]" />
                                </div>
                                <span className="text-xl font-bold text-white">VORA</span>
                            </Link>
                            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/60">
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
                                        ? "bg-white/10 text-white"
                                        : "text-white/60 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                                {item.active && <div className="w-1.5 h-1.5 ml-auto rounded-full bg-[#00F5D4]" />}
                            </Link>
                        ))}
                    </nav>

                    {/* User */}
                    <div className="p-4 border-t border-white/10">
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00F5D4] to-[#00C4AA] flex items-center justify-center text-[#0A192F] font-bold">
                                CM
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">Dr. Carlos Méndez</p>
                                <p className="text-xs text-white/60">Plan Elite</p>
                            </div>
                            <button className="text-white/60 hover:text-white">
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
                                <h1 className="text-xl font-bold text-[#0A192F]">Dashboard</h1>
                                <p className="text-sm text-[#64748B]">Bienvenido, Dr. Méndez</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Notifications */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowNotifications(!showNotifications)}
                                    className="relative p-2 rounded-xl hover:bg-[#F8FAFC] transition-colors"
                                >
                                    <Bell className="w-6 h-6 text-[#64748B]" />
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                                </button>

                                {showNotifications && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-[#E2E8F0] overflow-hidden"
                                    >
                                        <div className="p-4 border-b border-[#E2E8F0]">
                                            <h3 className="font-semibold text-[#0A192F]">Notificaciones</h3>
                                        </div>
                                        <div className="max-h-80 overflow-y-auto">
                                            {notifications.map((notif) => (
                                                <div key={notif.id} className="p-4 hover:bg-[#F8FAFC] transition-colors border-b border-[#E2E8F0] last:border-0">
                                                    <p className="text-sm text-[#0A192F]">{notif.message}</p>
                                                    <p className="text-xs text-[#94A3B8] mt-1">{notif.time}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            <Link
                                href="/dashboard/giras/nueva"
                                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#0A192F] text-white font-semibold rounded-xl hover:bg-[#091527] transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                Nueva Gira
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-6">
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
                                {upcomingAppointments.map((apt) => (
                                    <div key={apt.id} className="flex items-center gap-4 p-4 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] transition-colors">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00F5D4] to-[#00C4AA] flex items-center justify-center text-[#0A192F] font-bold">
                                            {apt.patient.split(" ").map(n => n[0]).join("")}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <p className="font-semibold text-[#0A192F]">{apt.patient}</p>
                                                {apt.status === "confirmed" ? (
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                ) : (
                                                    <AlertCircle className="w-4 h-4 text-amber-500" />
                                                )}
                                            </div>
                                            <p className="text-sm text-[#64748B] truncate">{apt.reason}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-[#0A192F]">{apt.time}</p>
                                            <p className="text-sm text-[#64748B]">{new Date(apt.date).toLocaleDateString("es-AR", { day: "numeric", month: "short" })}</p>
                                        </div>
                                        <button className="p-2 rounded-lg hover:bg-white transition-colors">
                                            <ChevronRight className="w-5 h-5 text-[#94A3B8]" />
                                        </button>
                                    </div>
                                ))}
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
                                <h3 className="text-xl font-bold mb-2">Ushuaia</h3>
                                <p className="text-white/70 mb-4">15 - 20 de Febrero, 2026</p>
                                <div className="flex items-center justify-between p-3 rounded-xl bg-white/10">
                                    <div>
                                        <p className="text-2xl font-bold text-[#00F5D4]">12</p>
                                        <p className="text-xs text-white/60">turnos disponibles</p>
                                    </div>
                                    <Link href="/dashboard/giras/1" className="px-4 py-2 bg-white text-[#0A192F] font-semibold rounded-xl text-sm hover:bg-white/90 transition-colors">
                                        Gestionar
                                    </Link>
                                </div>
                            </div>

                            {/* Profile Views */}
                            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <Eye className="w-5 h-5 text-[#64748B]" />
                                    <span className="font-semibold text-[#0A192F]">Vistas al perfil</span>
                                </div>
                                <p className="text-3xl font-bold text-[#0A192F] mb-1">342</p>
                                <p className="text-sm text-[#64748B]">Este mes</p>
                                <div className="mt-4 h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                                    <div className="h-full w-3/4 bg-gradient-to-r from-[#00F5D4] to-[#00C4AA] rounded-full" />
                                </div>
                                <p className="text-sm text-[#64748B] mt-2">+18% vs mes anterior</p>
                            </div>

                            {/* Quick Links */}
                            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
                                <h3 className="font-semibold text-[#0A192F] mb-4">Acciones rápidas</h3>
                                <div className="space-y-3">
                                    <Link href="/dashboard/perfil" className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F8FAFC] transition-colors group">
                                        <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] flex items-center justify-center group-hover:bg-[#00F5D4]/10">
                                            <Settings className="w-5 h-5 text-[#64748B] group-hover:text-[#00F5D4]" />
                                        </div>
                                        <span className="text-[#64748B] group-hover:text-[#0A192F]">Editar perfil</span>
                                        <ChevronRight className="w-4 h-4 ml-auto text-[#94A3B8]" />
                                    </Link>
                                    <Link href="/profesionales/carlos-mendez-cardiologia" className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F8FAFC] transition-colors group">
                                        <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] flex items-center justify-center group-hover:bg-[#00F5D4]/10">
                                            <Eye className="w-5 h-5 text-[#64748B] group-hover:text-[#00F5D4]" />
                                        </div>
                                        <span className="text-[#64748B] group-hover:text-[#0A192F]">Ver perfil público</span>
                                        <ChevronRight className="w-4 h-4 ml-auto text-[#94A3B8]" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
