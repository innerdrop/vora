"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    MapPin,
    Calendar,
    Clock,
    FileText,
    Users,
    Save,
    Loader2
} from "lucide-react";
import { createGira } from "@/lib/actions";

export function GiraForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        destination: "Ushuaia",
        arrivalDate: "",
        departureDate: "",
        address: "",
        maxAppointments: 8,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            await createGira(formData);
            router.push("/dashboard/giras");
            router.refresh(); // Ensure the list updates
        } catch (err) {
            console.error(err);
            setError("Error al crear la gira. Por favor intentá nuevamente.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Título de la Gira */}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-[#0A192F] mb-2">
                            Título (para tu referencia)
                        </label>
                        <div className="relative">
                            <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                            <input
                                type="text"
                                required
                                placeholder="Ej: Gira Febrero 2026"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#E2E8F0] focus:border-[#00F5D4] focus:ring-2 focus:ring-[#00F5D4]/20 outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Destino */}
                    <div>
                        <label className="block text-sm font-medium text-[#0A192F] mb-2">
                            Ciudad de Destino
                        </label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                            <select
                                value={formData.destination}
                                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#E2E8F0] focus:border-[#00F5D4] focus:ring-2 focus:ring-[#00F5D4]/20 outline-none transition-all bg-white"
                            >
                                <option value="Ushuaia">Ushuaia</option>
                                <option value="Río Grande">Río Grande</option>
                                <option value="Tolhuin">Tolhuin</option>
                            </select>
                        </div>
                    </div>

                    {/* Dirección */}
                    <div>
                        <label className="block text-sm font-medium text-[#0A192F] mb-2">
                            Dirección del Consultorio
                        </label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                            <input
                                type="text"
                                required
                                placeholder="Ej: San Martín 123"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#E2E8F0] focus:border-[#00F5D4] focus:ring-2 focus:ring-[#00F5D4]/20 outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Fechas */}
                    <div>
                        <label className="block text-sm font-medium text-[#0A192F] mb-2">
                            Fecha de Llegada
                        </label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                            <input
                                type="date"
                                required
                                value={formData.arrivalDate}
                                onChange={(e) => setFormData({ ...formData, arrivalDate: e.target.value })}
                                className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#E2E8F0] focus:border-[#00F5D4] focus:ring-2 focus:ring-[#00F5D4]/20 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#0A192F] mb-2">
                            Fecha de Salida
                        </label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                            <input
                                type="date"
                                required
                                min={formData.arrivalDate}
                                value={formData.departureDate}
                                onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                                className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#E2E8F0] focus:border-[#00F5D4] focus:ring-2 focus:ring-[#00F5D4]/20 outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Capacidad */}
                    <div>
                        <label className="block text-sm font-medium text-[#0A192F] mb-2">
                            Turnos máx. por día
                        </label>
                        <div className="relative">
                            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                            <input
                                type="number"
                                min="1"
                                max="20"
                                required
                                value={formData.maxAppointments}
                                onChange={(e) => setFormData({ ...formData, maxAppointments: parseInt(e.target.value) })}
                                className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#E2E8F0] focus:border-[#00F5D4] focus:ring-2 focus:ring-[#00F5D4]/20 outline-none transition-all"
                            />
                        </div>
                        <p className="text-xs text-[#64748B] mt-1">Límite para evitar sobrecargas.</p>
                    </div>
                </div>
            </div>

            {error && (
                <div className="p-4 rounded-xl bg-red-50 text-red-600 border border-red-100 flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" /> {/* Just using an icon for alert */}
                    {error}
                </div>
            )}

            <div className="flex justify-end gap-4">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-2 rounded-xl text-[#64748B] font-medium hover:bg-[#F1F5F9] transition-colors"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center gap-2 px-6 py-2 bg-[#0A192F] text-white font-bold rounded-xl hover:bg-[#091527] transition-colors disabled:opacity-50"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Guardando...
                        </>
                    ) : (
                        <>
                            <Save className="w-5 h-5" />
                            Publicar Gira
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
