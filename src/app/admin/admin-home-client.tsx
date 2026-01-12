"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    Users,
    CreditCard,
    AlertCircle,
    CheckCircle2,
    XCircle,
    Eye,
    TrendingUp,
    Shield,
    MoreVertical,
    Filter
} from "lucide-react";
import { verifyProfessional } from "@/lib/actions";

interface AdminDashboardData {
    stats: {
        totalProfessionals: number;
        totalPatients: number;
        pendingVerifications: number;
    };
    pendingVerifications: {
        id: string;
        name: string;
        email: string;
        specialty: string;
        license: string;
        submittedAt: string;
    }[];
    recentProfessionals: {
        id: string;
        name: string;
        email: string;
        tier: string;
        verified: boolean;
        status: string;
    }[];
}

export function AdminHomeClient({ data }: { data: AdminDashboardData }) {
    const router = useRouter();
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    const handleVerification = async (id: string, status: "APPROVED" | "REJECTED") => {
        if (!confirm(`¿Estás seguro que deseás ${status === "APPROVED" ? "aprobar" : "rechazar"} a este profesional?`)) return;

        setActionLoading(id);
        try {
            await verifyProfessional(id, status);
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Error al actualizar estado");
        } finally {
            setActionLoading(null);
        }
    };

    const stats = [
        { label: "Total Profesionales", value: data.stats.totalProfessionals, color: "from-[#6366F1] to-[#8B5CF6]" },
        { label: "Pacientes", value: data.stats.totalPatients, color: "from-[#00F5D4] to-[#00C4AA]" },
        { label: "Verificaciones Pendientes", value: data.stats.pendingVerifications, color: "from-amber-400 to-orange-500" },
        // { label: "MRR", value: "$485.000", change: "+22%", color: "from-emerald-400 to-green-500" },
    ];

    const tierColors: Record<string, string> = {
        start: "bg-secondary-100 text-secondary-600",
        grow: "bg-blue-100 text-blue-700",
        elite: "bg-gradient-to-r from-amber-400 to-orange-500 text-white",
    };

    return (
        <>
            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
                        {data.pendingVerifications.length > 0 ? (
                            data.pendingVerifications.map((ver) => (
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
                                            <button
                                                disabled={actionLoading === ver.id}
                                                onClick={() => handleVerification(ver.id, "APPROVED")}
                                                className="p-1.5 rounded-lg bg-emerald-100 text-emerald-600 hover:bg-emerald-200 transition-colors disabled:opacity-50"
                                                title="Aprobar"
                                            >
                                                <CheckCircle2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                disabled={actionLoading === ver.id}
                                                onClick={() => handleVerification(ver.id, "REJECTED")}
                                                className="p-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors disabled:opacity-50"
                                                title="Rechazar"
                                            >
                                                <XCircle className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-[#64748B] text-center py-4">No hay verificaciones pendientes.</p>
                        )}
                    </div>
                </div>

                {/* Recent Professionals */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2E8F0] p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-[#0A192F]">Profesionales Recientes</h2>
                        <div className="flex items-center gap-3">
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
                                </tr>
                            </thead>
                            <tbody>
                                {data.recentProfessionals.map((pro) => (
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
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${tierColors[pro.tier] || "bg-gray-100 text-gray-700"}`}>
                                                {(pro.tier || "start").charAt(0).toUpperCase() + (pro.tier || "start").slice(1)}
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
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
