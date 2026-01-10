"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { LogOut, User, Settings, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function UserMenu() {
    const { data: session, status } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (status === "loading") {
        return (
            <div className="w-10 h-10 rounded-xl bg-[#F1F5F9] animate-pulse" />
        );
    }

    if (!session) {
        return (
            <div className="flex items-center gap-3">
                <Link
                    href="/auth/login"
                    className="text-sm font-semibold text-[#64748B] hover:text-[#0A192F] transition-colors"
                >
                    Iniciar Sesión
                </Link>
                <Link
                    href="/auth/register"
                    className="px-4 py-2 bg-[#0A192F] text-white text-sm font-semibold rounded-xl hover:bg-[#091527] transition-colors"
                >
                    Registrarse
                </Link>
            </div>
        );
    }

    const initials = session.user.name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "U";

    const dashboardUrl =
        session.user.role === "SUPER_ADMIN" ? "/admin" :
            session.user.role === "PATIENT" ? "/paciente" : "/dashboard";

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-[#F8FAFC] transition-colors"
            >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00F5D4] to-[#00C4AA] flex items-center justify-center text-[#0A192F] font-semibold text-sm">
                    {initials}
                </div>
                <ChevronDown className={`w-4 h-4 text-[#64748B] transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-[#E2E8F0] overflow-hidden z-50">
                    {/* User Info */}
                    <div className="p-4 border-b border-[#E2E8F0]">
                        <p className="font-semibold text-[#0A192F] truncate">{session.user.name}</p>
                        <p className="text-sm text-[#64748B] truncate">{session.user.email}</p>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                        <Link
                            href={dashboardUrl}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#F8FAFC] transition-colors"
                        >
                            <User className="w-4 h-4 text-[#64748B]" />
                            <span className="text-sm text-[#0A192F]">Mi Panel</span>
                        </Link>
                        <Link
                            href={`${dashboardUrl}/configuracion`}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#F8FAFC] transition-colors"
                        >
                            <Settings className="w-4 h-4 text-[#64748B]" />
                            <span className="text-sm text-[#0A192F]">Configuración</span>
                        </Link>
                    </div>

                    {/* Logout */}
                    <div className="p-2 border-t border-[#E2E8F0]">
                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-red-50 transition-colors text-left"
                        >
                            <LogOut className="w-4 h-4 text-red-500" />
                            <span className="text-sm text-red-600">Cerrar Sesión</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
