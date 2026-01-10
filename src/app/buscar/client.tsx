"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Search,
    MapPin,
    Calendar,
    Star,
    Filter,
    ChevronDown,
    Shield,
    ArrowRight,
    X,
    Stethoscope
} from "lucide-react";
import { Header } from "@/components/layout";

interface Professional {
    id: string;
    slug: string;
    firstName: string;
    lastName: string;
    specialty: string;
    rating: number;
    reviews: number;
    verified: boolean;
    avatarUrl: string | null;
    consultationPrice: number;
    nextGira: {
        destination: string;
        arrivalDate: string;
        departureDate: string;
    } | null;
}

interface Specialty {
    id: string;
    name: string;
    displayName: string;
}

interface BuscarClientProps {
    initialProfessionals: Professional[];
    specialties: Specialty[];
}

export function BuscarClient({ initialProfessionals, specialties }: BuscarClientProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSpecialty, setSelectedSpecialty] = useState("all");
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        verified: false,
        minRating: 0,
    });

    const filteredProfessionals = initialProfessionals.filter((pro) => {
        const matchesSearch =
            `${pro.firstName} ${pro.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pro.specialty.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSpecialty =
            selectedSpecialty === "all" ||
            pro.specialty === specialties.find(s => s.id === selectedSpecialty)?.displayName;
        const matchesVerified = !filters.verified || pro.verified;
        const matchesRating = pro.rating >= filters.minRating;
        return matchesSearch && matchesSpecialty && matchesVerified && matchesRating;
    });

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("es-AR", {
            day: "numeric",
            month: "short",
        });
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Header />

            {/* Search Hero */}
            <section className="bg-gradient-to-b from-[#0A192F] to-[#1E293B] py-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                            Encontrá tu <span className="text-[#00F5D4]">especialista</span>
                        </h1>
                        <p className="text-white/70 text-lg mb-8">
                            Profesionales verificados que viajan a Ushuaia y Tierra del Fuego
                        </p>

                        {/* Search Box */}
                        <div className="bg-white rounded-2xl p-2 shadow-xl flex flex-col md:flex-row gap-2">
                            <div className="flex-[2] relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                                <input
                                    type="text"
                                    placeholder="Buscar por nombre o especialidad..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full h-12 pl-12 pr-4 rounded-xl bg-[#F8FAFC] text-[#0A192F] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#00F5D4]/20"
                                />
                            </div>

                            <div className="flex-1 relative">
                                <select
                                    value={selectedSpecialty}
                                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                                    className="w-full h-12 pl-4 pr-10 rounded-xl bg-[#F8FAFC] text-[#0A192F] appearance-none focus:outline-none focus:ring-2 focus:ring-[#00F5D4]/20 cursor-pointer"
                                >
                                    {specialties.map((spec) => (
                                        <option key={spec.id} value={spec.id}>{spec.displayName}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8] pointer-events-none" />
                            </div>

                            <button className="h-12 px-8 bg-[#0A192F] text-white font-semibold rounded-xl hover:bg-[#091527] transition-colors flex items-center justify-center gap-2">
                                <Search className="w-5 h-5" />
                                <span className="hidden md:inline">Buscar</span>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Results */}
            <section className="py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Filters Bar */}
                    <div className="flex items-center justify-between mb-8">
                        <p className="text-[#64748B]">
                            <span className="font-semibold text-[#0A192F]">{filteredProfessionals.length}</span> profesionales encontrados
                        </p>

                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors ${showFilters
                                    ? "border-[#00F5D4] bg-[#00F5D4]/5 text-[#0A192F]"
                                    : "border-[#E2E8F0] text-[#64748B] hover:border-[#94A3B8]"
                                }`}
                        >
                            <Filter className="w-4 h-4" />
                            Filtros
                        </button>
                    </div>

                    {/* Filter Panel */}
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="bg-white rounded-2xl border border-[#E2E8F0] p-6 mb-8"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-semibold text-[#0A192F]">Filtros avanzados</h3>
                                <button onClick={() => setShowFilters(false)}>
                                    <X className="w-5 h-5 text-[#64748B]" />
                                </button>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={filters.verified}
                                        onChange={(e) => setFilters({ ...filters, verified: e.target.checked })}
                                        className="w-5 h-5 rounded border-[#E2E8F0] text-[#00F5D4] focus:ring-[#00F5D4]"
                                    />
                                    <div className="flex items-center gap-2">
                                        <Shield className="w-5 h-5 text-[#00F5D4]" />
                                        <span className="text-[#0A192F]">Solo verificados</span>
                                    </div>
                                </label>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[#0A192F]">Valoración mínima</label>
                                    <div className="flex items-center gap-2">
                                        {[0, 4, 4.5].map((rating) => (
                                            <button
                                                key={rating}
                                                onClick={() => setFilters({ ...filters, minRating: rating })}
                                                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${filters.minRating === rating
                                                        ? "bg-[#00F5D4] text-[#0A192F]"
                                                        : "bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]"
                                                    }`}
                                            >
                                                <Star className="w-4 h-4" />
                                                {rating === 0 ? "Todas" : `${rating}+`}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Professional Cards Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProfessionals.map((pro, index) => (
                            <motion.div
                                key={pro.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Link href={`/profesionales/${pro.slug}`}>
                                    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 hover:shadow-lg hover:border-[#00F5D4]/50 transition-all group">
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00F5D4] to-[#00C4AA] flex items-center justify-center text-[#0A192F] font-bold text-xl">
                                                {pro.firstName[0]}{pro.lastName[0]}
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-semibold text-[#0A192F] group-hover:text-[#00F5D4] transition-colors">
                                                        Dr. {pro.firstName} {pro.lastName}
                                                    </h3>
                                                    {pro.verified && (
                                                        <Shield className="w-4 h-4 text-[#00F5D4]" />
                                                    )}
                                                </div>
                                                <p className="text-sm text-[#64748B]">{pro.specialty}</p>

                                                <div className="flex items-center gap-2 mt-2">
                                                    <div className="flex items-center gap-1">
                                                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                                        <span className="text-sm font-semibold text-[#0A192F]">{pro.rating.toFixed(1)}</span>
                                                    </div>
                                                    <span className="text-sm text-[#94A3B8]">({pro.reviews} reseñas)</span>
                                                </div>
                                            </div>
                                        </div>

                                        {pro.nextGira && (
                                            <div className="bg-[#F8FAFC] rounded-xl p-4 mb-4">
                                                <div className="flex items-center gap-2 text-sm text-[#64748B] mb-2">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>Próxima gira</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="w-4 h-4 text-[#00F5D4]" />
                                                        <span className="font-medium text-[#0A192F]">{pro.nextGira.destination}</span>
                                                    </div>
                                                    <span className="text-sm text-[#0A192F]">
                                                        {formatDate(pro.nextGira.arrivalDate)} - {formatDate(pro.nextGira.departureDate)}
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <span className="text-xs text-[#64748B]">Consulta desde</span>
                                                <p className="text-lg font-bold text-[#0A192F]">{formatPrice(pro.consultationPrice)}</p>
                                            </div>
                                            <div className="flex items-center gap-2 text-[#00F5D4] font-semibold text-sm group-hover:gap-3 transition-all">
                                                Ver perfil
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredProfessionals.length === 0 && (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#F1F5F9] flex items-center justify-center">
                                <Search className="w-10 h-10 text-[#94A3B8]" />
                            </div>
                            <h3 className="text-xl font-semibold text-[#0A192F] mb-2">
                                No encontramos resultados
                            </h3>
                            <p className="text-[#64748B] max-w-md mx-auto">
                                Probá ajustando los filtros o buscando otra especialidad.
                                Nuevos profesionales se suman cada semana.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
