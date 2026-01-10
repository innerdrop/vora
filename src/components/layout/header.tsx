"use client";

import Link from "next/link";
import { Stethoscope } from "lucide-react";
import { UserMenu } from "./user-menu";

interface HeaderProps {
    variant?: "default" | "transparent";
}

export function Header({ variant = "default" }: HeaderProps) {
    const bgClass = variant === "transparent"
        ? "bg-transparent"
        : "bg-white border-b border-[#E2E8F0]";

    return (
        <header className={`${bgClass} sticky top-0 z-40`}>
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00F5D4] to-[#00C4AA] flex items-center justify-center">
                            <Stethoscope className="w-5 h-5 text-[#0A192F]" />
                        </div>
                        <span className="text-xl font-bold text-[#0A192F]">VORA</span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link
                            href="/buscar"
                            className="text-sm font-medium text-[#64748B] hover:text-[#0A192F] transition-colors"
                        >
                            Buscar Profesionales
                        </Link>
                        <Link
                            href="/precios"
                            className="text-sm font-medium text-[#64748B] hover:text-[#0A192F] transition-colors"
                        >
                            Precios
                        </Link>
                    </nav>

                    {/* User Menu */}
                    <UserMenu />
                </div>
            </div>
        </header>
    );
}
