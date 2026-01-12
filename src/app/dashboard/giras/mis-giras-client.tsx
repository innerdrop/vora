"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
    Plus,
    Calendar,
    MapPin,
    Trash2,
    MoreVertical,
    AlertCircle,
    CheckCircle2,
    Clock
} from "lucide-react";
import { deleteGira } from "@/lib/actions";

interface Gira {
    id: string;
    title: string;
    destination: string;
    arrivalDate: string;
    departureDate: string;
    status: string;
    appointmentsCount: number;
    address: string | null;
}

interface MisGirasClientProps {
    initialGiras: Gira[];
}

export function MisGirasClient({ initialGiras }: MisGirasClientProps) {
    const router = useRouter();
    const [giras, setGiras] = useState(initialGiras);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        if (!confirm("¿Estás seguro de que querés eliminar esta gira? Se perderán los turnos asociados.")) return;

        setIsDeleting(id);
        try {
            await deleteGira(id);
            setGiras(giras.filter(g => g.id !== id));
            router.refresh();
        } catch (error) {
            alert("Error al eliminar la gira");
        } finally {
            setIsDeleting(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#0A192F]">Mis Giras</h1>
                    <p className="text-[#64748B]">Gestioná tus viajes y disponibilidad</p>
                </div>
                <Link
                    href="/dashboard/giras/nueva"
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-[#0A192F] text-white font-semibold rounded-xl hover:bg-[#091527] transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Nueva Gira
                </Link>
            </div>

            {giras.length === 0 ? (
                <div className="bg-white rounded-2xl border border-[#E2E8F0] p-12 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#F8FAFC] flex items-center justify-center">
                        <MapPin className="w-8 h-8 text-[#94A3B8]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#0A192F] mb-2">No tenés giras programadas</h3>
                    <p className="text-[#64748B] mb-6">Creá tu primera gira para empezar a recibir turnos en otros destinos.</p>
                    <Link
                        href="/dashboard/giras/nueva"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#00F5D4] text-[#0A192F] font-bold rounded-xl hover:bg-[#00E0C2] transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        Crear Gira
                    </Link>
                </div>
            ) : (
                <div className="grid gap-4">
                    {giras.map((gira) => (
                        <motion.div
                            key={gira.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-6 rounded-2xl border border-[#E2E8F0] hover:shadow-md transition-shadow"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-lg font-bold text-[#0A192F]">{gira.title}</h3>
                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${gira.status === 'PUBLISHED'
                                                ? 'bg-emerald-100 text-emerald-700'
                                                : 'bg-amber-100 text-amber-700'
                                            }`}>
                                            {gira.status === 'PUBLISHED' ? 'Publicada' : 'Borrador'}
                                        </span>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4 text-sm text-[#64748B]">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-[#00F5D4]" />
                                            {gira.destination}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-[#00F5D4]" />
                                            {format(new Date(gira.arrivalDate), "d MMM", { locale: es })} - {format(new Date(gira.departureDate), "d MMM yyyy", { locale: es })}
                                        </div>
                                        {gira.address && (
                                            <div className="flex items-center gap-2 sm:col-span-2">
                                                <MoreVertical className="w-4 h-4 text-[#00F5D4]" />
                                                {gira.address}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 border-[#E2E8F0] pt-4 md:pt-0">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-[#0A192F]">{gira.appointmentsCount}</p>
                                        <p className="text-xs text-[#64748B]">Turnos</p>
                                    </div>

                                    <button
                                        onClick={() => handleDelete(gira.id)}
                                        disabled={isDeleting === gira.id}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors disabled:opacity-50"
                                        title="Eliminar Gira"
                                    >
                                        {isDeleting === gira.id ? (
                                            <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <Trash2 className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
