"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    UserCheck,
    CreditCard,
    FileEdit,
    Settings,
    LogOut,
    Stethoscope,
    X,
    Menu,
    Search,
    Download
} from "lucide-react";
import { signOut } from "next-auth/react";

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: Users, label: "Profesionales", href: "/admin/profesionales" },
    { icon: UserCheck, label: "Verificaciones", href: "/admin/verificaciones" },
    { icon: CreditCard, label: "Suscripciones", href: "/admin/suscripciones" },
    { icon: FileEdit, label: "CMS", href: "/admin/cms" },
    { icon: Settings, label: "Configuración", href: "/admin/configuracion" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

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
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive
                                        ? "bg-white/10 text-white"
                                        : "text-white/60 hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span className="font-medium">{item.label}</span>
                                    {isActive && <div className="w-1.5 h-1.5 ml-auto rounded-full bg-[#00F5D4]" />}
                                </Link>
                            );
                        })}
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
                            <button
                                onClick={() => signOut({ callbackUrl: "/" })}
                                className="text-white/60 hover:text-white"
                            >
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
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                                <input
                                    type="text"
                                    placeholder="Buscar..."
                                    className="w-64 h-10 pl-10 pr-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#0A192F] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#00F5D4]/20"
                                />
                            </div>
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
