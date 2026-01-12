"use client";

import { useState } from "react";
import {
    Calendar,
    Clock,
    MapPin,
    AlertCircle,
    CheckCircle2,
    XCircle,
    RotateCcw,
    Search
} from "lucide-react";
import { cancelAppointment } from "@/lib/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Appointment {
    id: string;
    professional: string;
    specialty: string;
    date: string;
    time: string;
    location: string;
    status: string;
    depositPaid: boolean;
}

export function MisTurnosClient({ initialAppointments }: { initialAppointments: Appointment[] }) {
    const router = useRouter();
    const [filter, setFilter] = useState<"upcoming" | "past">("upcoming");
    const [isCancelling, setIsCancelling] = useState<string | null>(null);

    const now = new Date();

    // Filter appointments logic
    const filteredAppointments = initialAppointments.filter(apt => {
        const aptDate = new Date(`${apt.date}T${apt.time}`);
        const isUpcoming = aptDate >= now;

        if (filter === "upcoming") {
            return isUpcoming && apt.status !== "CANCELED" && apt.status !== "COMPLETED";
        } else {
            return !isUpcoming || apt.status === "CANCELED" || apt.status === "COMPLETED";
        }
    });

    const handleCancel = async (id: string) => {
        if (!confirm("¿Estás seguro que deseás cancelar este turno?")) return;

        setIsCancelling(id);
        try {
            await cancelAppointment(id);
            router.refresh(); // Refresh data
        } catch (error) {
            console.error("Error cancelling appointment:", error);
            alert("Error al cancelar el turno.");
        } finally {
            setIsCancelling(null);
        }
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("es-AR", {
            weekday: "long",
            day: "numeric",
            month: "long",
        });
    };

    const getStatusBadge = (status: string, depositPaid: boolean) => {
        if (status === "CANCELED") {
            return (
                <span className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-lg">
                    <XCircle className="w-3 h-3" /> Cancelado
                </span>
            );
        }
        if (status === "COMPLETED") {
            return (
                <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg">
                    <CheckCircle2 className="w-3 h-3" /> Completado
                </span>
            );
        }
        if (status === "CONFIRMED") {
            return (
                <span className="flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-lg">
                    <CheckCircle2 className="w-3 h-3" /> Confirmado
                </span>
            );
        }
        // PENDING
        return (
            <span className="flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-lg">
                <AlertCircle className="w-3 h-3" /> Pendiente
            </span>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-[#0A192F]">Mis Turnos</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => setFilter("upcoming")}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filter === "upcoming"
                                ? "bg-[#00F5D4] text-[#0A192F]"
                                : "bg-white text-[#64748B] hover:bg-[#F8FAFC]"
                            }`}
                    >
                        Próximos
                    </button>
                    <button
                        onClick={() => setFilter("past")}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filter === "past"
                                ? "bg-[#00F5D4] text-[#0A192F]"
                                : "bg-white text-[#64748B] hover:bg-[#F8FAFC]"
                            }`}
                    >
                        Historial
                    </button>
                </div>
            </div>

            {filteredAppointments.length > 0 ? (
                <div className="space-y-4">
                    {filteredAppointments.map((apt) => (
                        <div key={apt.id} className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00F5D4] to-[#00C4AA] flex items-center justify-center text-[#0A192F] font-bold">
                                            {apt.professional.split(" ").slice(1).map(n => n[0]).join("")}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-[#0A192F]">{apt.professional}</h3>
                                            <p className="text-sm text-[#64748B]">{apt.specialty}</p>
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2 mt-4 text-sm text-[#64748B]">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-[#94A3B8]" />
                                            <span>{formatDate(apt.date)}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-[#94A3B8]" />
                                            <span>{apt.time} hs</span>
                                        </div>
                                        {apt.location && (
                                            <div className="flex items-center gap-2 sm:col-span-2">
                                                <MapPin className="w-4 h-4 text-[#94A3B8]" />
                                                <span>{apt.location}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-3 min-w-[140px]">
                                    {getStatusBadge(apt.status, apt.depositPaid)}

                                    {filter === "upcoming" && (
                                        <button
                                            onClick={() => handleCancel(apt.id)}
                                            disabled={isCancelling === apt.id}
                                            className="text-sm text-red-500 hover:text-red-700 font-medium disabled:opacity-50"
                                        >
                                            {isCancelling === apt.id ? "Cancelando..." : "Cancelar turno"}
                                        </button>
                                    )}
                                </div>
                            </div>

                            {!apt.depositPaid && apt.status === "PENDING" && filter === "upcoming" && (
                                <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-2 text-sm text-amber-800">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>Falta el pago de la seña para confirmar.</span>
                                    </div>
                                    <button className="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-lg hover:bg-amber-600 transition-colors">
                                        Pagar Seña
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-white rounded-2xl border border-[#E2E8F0]">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#F8FAFC] flex items-center justify-center">
                        <Calendar className="w-8 h-8 text-[#94A3B8]" />
                    </div>
                    <h3 className="font-semibold text-[#0A192F] mb-2">
                        {filter === "upcoming" ? "No tenés turnos próximos" : "No tenés historial de turnos"}
                    </h3>
                    {filter === "upcoming" && (
                        <div className="mt-4">
                            <Link href="/buscar" className="inline-flex items-center gap-2 px-6 py-2 bg-[#0A192F] text-white font-semibold rounded-xl hover:bg-[#091527] transition-colors">
                                <Search className="w-4 h-4" />
                                Buscar Profesional
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
