"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Calendar,
    FileText,
    Heart,
    Settings,
    LogOut,
    Stethoscope,
    X,
    Menu,
    Bell,
    Search
} from "lucide-react";
import { signOut } from "next-auth/react";

const menuItems = [
    { icon: LayoutDashboard, label: "Mi Salud", href: "/paciente" },
    { icon: Calendar, label: "Mis Turnos", href: "/paciente/turnos" },
    { icon: FileText, label: "Documentos", href: "/paciente/documentos" },
    { icon: Heart, label: "Favoritos", href: "/paciente/favoritos" },
    { icon: Settings, label: "Configuración", href: "/paciente/configuracion" },
];

export function PatientShell({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

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
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive
                                        ? "bg-[#00F5D4]/10 text-[#0A192F]"
                                        : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0A192F]"
                                        }`}
                                >
                                    <item.icon className={`w-5 h-5 ${isActive ? "text-[#00F5D4]" : ""}`} />
                                    <span className="font-medium">{item.label}</span>
                                    {isActive && <div className="w-1.5 h-1.5 ml-auto rounded-full bg-[#00F5D4]" />}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User */}
                    <div className="p-4 border-t border-[#E2E8F0]">
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F8FAFC]">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00F5D4] to-[#00C4AA] flex items-center justify-center text-[#0A192F] font-bold">
                                P
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-[#0A192F] truncate">Paciente</p>
                                <p className="text-xs text-[#64748B]">Ver perfil</p>
                            </div>
                            <button
                                onClick={() => signOut({ callbackUrl: "/" })}
                                className="text-[#64748B] hover:text-[#0A192F]"
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
                                <h1 className="text-xl font-bold text-[#0A192F]">Mi Salud</h1>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="relative p-2 rounded-xl hover:bg-[#F8FAFC] transition-colors">
                                <Bell className="w-6 h-6 text-[#64748B]" />
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
                    {children}
                </main>
            </div>
        </div>
    );
}
