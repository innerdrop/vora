"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    Users,
    UserCheck,
    CreditCard,
    FileEdit,
    Settings,
    LogOut,
    Search,
    ChevronRight,
    MoreVertical,
    Shield,
    AlertCircle,
    CheckCircle2,
    XCircle,
    Eye,
    TrendingUp,
    Stethoscope,
    Menu,
    X,
    Filter,
    Download
} from "lucide-react";

// Datos de ejemplo
const stats = [
    { label: "Total Profesionales", value: "52", change: "+8", color: "from-[#6366F1] to-[#8B5CF6]" },
    { label: "Pacientes", value: "1,247", change: "+145", color: "from-[#00F5D4] to-[#00C4AA]" },
    { label: "Verificaciones Pendientes", value: "7", color: "from-amber-400 to-orange-500" },
    { label: "MRR", value: "$485.000", change: "+22%", color: "from-emerald-400 to-green-500" },
];

const pendingVerifications = [
    { id: "1", name: "Dr. Pablo Fernández", specialty: "Neurología", license: "MN-34567", submittedAt: "2026-01-08", status: "pending" },
    { id: "2", name: "Dra. Lucía Martínez", specialty: "Ginecología", license: "MP-45678", submittedAt: "2026-01-09", status: "pending" },
    { id: "3", name: "Dr. Roberto Díaz", specialty: "Oftalmología", license: "MN-56789", submittedAt: "2026-01-10", status: "pending" },
];

const recentProfessionals = [
    { id: "1", name: "Dr. Carlos Méndez", email: "carlos@email.com", tier: "elite", verified: true, status: "active" },
    { id: "2", name: "Dra. María Rodríguez", email: "maria@email.com", tier: "grow", verified: true, status: "active" },
    { id: "3", name: "Dr. Juan López", email: "juan@email.com", tier: "start", verified: false, status: "pending" },
    { id: "4", name: "Dra. Ana García", email: "ana@email.com", tier: "elite", verified: true, status: "active" },
];

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin", active: true },
    { icon: Users, label: "Profesionales", href: "/admin/profesionales" },
    { icon: UserCheck, label: "Verificaciones", href: "/admin/verificaciones", badge: 7 },
    { icon: CreditCard, label: "Suscripciones", href: "/admin/suscripciones" },
    { icon: FileEdit, label: "CMS", href: "/admin/cms" },
    { icon: Settings, label: "Configuración", href: "/admin/configuracion" },
];

export default function AdminDashboardPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const tierColors = {
        start: "bg-secondary-100 text-secondary-600",
        grow: "bg-blue-100 text-blue-700",
        elite: "bg-gradient-to-r from-amber-400 to-orange-500 text-white",
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0A192F] transform transition-transform duration-300 lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 border-b border-white/10">
                        <div className="flex items-center justify-between">
                            <Link href="/admin" className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00F5D4] to-[#00C4AA] flex items-center justify-center">
                                    <Stethoscope className="w-5 h-5 text-[#0A192F]" />
                                </div>
                                <div>
                                    <span className="text-xl font-bold text-white">VORA</span>
                                    <p className="text-xs text-white/50">Admin Panel</p>
                                </div>
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
                                {item.badge && (
                                    <span className="ml-auto px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                                        {item.badge}
                                    </span>
                                )}
                                {item.active && !item.badge && <div className="w-1.5 h-1.5 ml-auto rounded-full bg-[#00F5D4]" />}
                            </Link>
                        ))}
                    </nav>

                    {/* User */}
                    <div className="p-4 border-t border-white/10">
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-white font-bold">
                                SA
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">Super Admin</p>
                                <p className="text-xs text-white/60">admin@vora.health</p>
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
                                <h1 className="text-xl font-bold text-[#0A192F]">Panel de Administración</h1>
                                <p className="text-sm text-[#64748B]">Gestión de la plataforma VORA</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Search */}
                            <div className="hidden md:flex relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                                <input
                                    type="text"
                                    placeholder="Buscar..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-64 h-10 pl-10 pr-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#0A192F] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#00F5D4]/20"
                                />
                            </div>

                            <button className="flex items-center gap-2 px-4 py-2 border border-[#E2E8F0] rounded-xl hover:bg-[#F8FAFC] transition-colors">
                                <Download className="w-4 h-4 text-[#64748B]" />
                                <span className="text-sm font-medium text-[#64748B]">Exportar</span>
                            </button>
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
                                        <Users className="w-6 h-6 text-white" />
                                    </div>
                                    {stat.change && (
                                        <span className="flex items-center gap-1 text-sm text-emerald-500 font-medium">
                                            <TrendingUp className="w-4 h-4" />
                                            {stat.change}
                                        </span>
                                    )}
                                </div>
                                <p className="text-2xl font-bold text-[#0A192F]">{stat.value}</p>
                                <p className="text-sm text-[#64748B]">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Pending Verifications */}
                        <div className="lg:col-span-1 bg-white rounded-2xl border border-[#E2E8F0] p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 text-amber-500" />
                                    <h2 className="text-lg font-bold text-[#0A192F]">Verificaciones Pendientes</h2>
                                </div>
                                <Link href="/admin/verificaciones" className="text-sm text-[#00F5D4] font-semibold hover:underline">
                                    Ver todas
                                </Link>
                            </div>

                            <div className="space-y-4">
                                {pendingVerifications.map((ver) => (
                                    <div key={ver.id} className="p-4 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] transition-colors">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <p className="font-semibold text-[#0A192F]">{ver.name}</p>
                                                <p className="text-sm text-[#64748B]">{ver.specialty}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-[#94A3B8]">Mat: {ver.license}</span>
                                            <div className="flex gap-2">
                                                <button className="p-1.5 rounded-lg bg-emerald-100 text-emerald-600 hover:bg-emerald-200 transition-colors">
                                                    <CheckCircle2 className="w-4 h-4" />
                                                </button>
                                                <button className="p-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors">
                                                    <XCircle className="w-4 h-4" />
                                                </button>
                                                <button className="p-1.5 rounded-lg bg-[#E2E8F0] text-[#64748B] hover:bg-[#CBD5E1] transition-colors">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Professionals */}
                        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2E8F0] p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-bold text-[#0A192F]">Profesionales Recientes</h2>
                                <div className="flex items-center gap-3">
                                    <button className="flex items-center gap-2 px-3 py-1.5 border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] transition-colors">
                                        <Filter className="w-4 h-4 text-[#64748B]" />
                                        <span className="text-sm text-[#64748B]">Filtrar</span>
                                    </button>
                                    <Link href="/admin/profesionales" className="text-sm text-[#00F5D4] font-semibold hover:underline">
                                        Ver todos
                                    </Link>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-[#E2E8F0]">
                                            <th className="text-left py-3 text-sm font-semibold text-[#64748B]">Profesional</th>
                                            <th className="text-left py-3 text-sm font-semibold text-[#64748B]">Plan</th>
                                            <th className="text-left py-3 text-sm font-semibold text-[#64748B]">Estado</th>
                                            <th className="text-left py-3 text-sm font-semibold text-[#64748B]">Verificado</th>
                                            <th className="text-right py-3 text-sm font-semibold text-[#64748B]">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentProfessionals.map((pro) => (
                                            <tr key={pro.id} className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC]">
                                                <td className="py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00F5D4] to-[#00C4AA] flex items-center justify-center text-[#0A192F] font-bold text-sm">
                                                            {pro.name.split(" ").slice(1).map(n => n[0]).join("")}
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-[#0A192F]">{pro.name}</p>
                                                            <p className="text-sm text-[#64748B]">{pro.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${tierColors[pro.tier as keyof typeof tierColors]}`}>
                                                        {pro.tier.charAt(0).toUpperCase() + pro.tier.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${pro.status === "active"
                                                            ? "bg-emerald-100 text-emerald-700"
                                                            : "bg-amber-100 text-amber-700"
                                                        }`}>
                                                        {pro.status === "active" ? "Activo" : "Pendiente"}
                                                    </span>
                                                </td>
                                                <td className="py-4">
                                                    {pro.verified ? (
                                                        <Shield className="w-5 h-5 text-[#00F5D4]" />
                                                    ) : (
                                                        <AlertCircle className="w-5 h-5 text-amber-500" />
                                                    )}
                                                </td>
                                                <td className="py-4 text-right">
                                                    <button className="p-2 rounded-lg hover:bg-[#E2E8F0] transition-colors">
                                                        <MoreVertical className="w-5 h-5 text-[#64748B]" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Subscription Plans Overview */}
                    <div className="mt-8 bg-white rounded-2xl border border-[#E2E8F0] p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-[#0A192F]">Distribución de Planes</h2>
                            <Link href="/admin/suscripciones" className="text-sm text-[#00F5D4] font-semibold hover:underline">
                                Gestionar planes
                            </Link>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {/* Start Plan */}
                            <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-[#0A192F]">Start (Gratis)</h3>
                                    <span className="text-2xl font-bold text-[#64748B]">18</span>
                                </div>
                                <div className="h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
                                    <div className="h-full w-[35%] bg-[#64748B] rounded-full" />
                                </div>
                                <p className="text-sm text-[#94A3B8] mt-2">35% del total</p>
                            </div>

                            {/* Grow Plan */}
                            <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-blue-700">Grow</h3>
                                    <span className="text-2xl font-bold text-blue-700">22</span>
                                </div>
                                <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                                    <div className="h-full w-[42%] bg-blue-500 rounded-full" />
                                </div>
                                <p className="text-sm text-blue-400 mt-2">42% del total • $330.000 MRR</p>
                            </div>

                            {/* Elite Plan */}
                            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-amber-700">Elite ⭐</h3>
                                    <span className="text-2xl font-bold text-amber-700">12</span>
                                </div>
                                <div className="h-2 bg-amber-100 rounded-full overflow-hidden">
                                    <div className="h-full w-[23%] bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" />
                                </div>
                                <p className="text-sm text-amber-500 mt-2">23% del total • $420.000 MRR</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
