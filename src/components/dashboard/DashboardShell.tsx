"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    Calendar,
    Users,
    FileText,
    Settings,
    LogOut,
    Bell,
    Menu,
    X,
    Stethoscope,
    Plus
} from "lucide-react";

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Calendar, label: "Mis Giras", href: "/dashboard/giras" },
    { icon: Users, label: "Pacientes", href: "/dashboard/pacientes" },
    { icon: FileText, label: "Vault Médico", href: "/dashboard/vault" },
    { icon: Settings, label: "Configuración", href: "/dashboard/configuracion" },
];

const notifications = [
    { id: "1", type: "appointment", message: "Nueva solicitud de turno de María González", time: "Hace 5 min" },
    { id: "2", type: "review", message: "Juan Pérez dejó una reseña de 5 estrellas", time: "Hace 1 hora" },
    { id: "3", type: "payment", message: "Pago de seña recibido: $5.000", time: "Hace 2 horas" },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === "/dashboard") return pathname === "/dashboard";
        return pathname.startsWith(href);
    };

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
                        {menuItems.map((item) => {
                            const active = isActive(item.href);
                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${active
                                        ? "bg-white/10 text-white"
                                        : "text-white/60 hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span className="font-medium">{item.label}</span>
                                    {active && <div className="w-1.5 h-1.5 ml-auto rounded-full bg-[#00F5D4]" />}
                                </Link>
                            );
                        })}
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

                            {/* Only show "New Gira" button if on Giras page or generic */}
                            {pathname.includes("/dashboard/giras") && !pathname.includes("/nueva") && (
                                <Link
                                    href="/dashboard/giras/nueva"
                                    className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#0A192F] text-white font-semibold rounded-xl hover:bg-[#091527] transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                    Nueva Gira
                                </Link>
                            )}
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
