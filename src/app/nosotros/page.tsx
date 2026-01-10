import { Header, Footer } from "@/components/layout";
import { Metadata } from "next";
import Image from "next/image";
import { Users, Heart, Shield, Globe } from "lucide-react";

export const metadata: Metadata = {
    title: "Sobre Nosotros | VORA",
    description: "Conocé la misión y el equipo detrás de VORA.",
};

export default function NosotrosPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <section className="bg-[#0A192F] text-white py-20 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 space-y-6">
                        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                            Medicina <span className="text-[#00F5D4]">sin distancia</span> para el fin del mundo.
                        </h1>
                        <p className="text-lg text-white/70 max-w-xl">
                            Nacimos para conectar a los mejores especialistas itinerantes con los pacientes de Tierra del Fuego, eliminando las barreras geográficas para acceder a una salud de calidad.
                        </p>
                    </div>
                    <div className="flex-1 relative h-[400px] w-full bg-white/5 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10">
                        {/* Image Placeholder - To be replaced by hero-doctors.png */}
                        <Image
                            src="/images/hero-doctors.png"
                            alt="Doctor consultando con paciente"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Stats - Interactive BENTO style */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-[#F8FAFC] p-8 rounded-3xl border border-[#E2E8F0] space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-[#00F5D4]/10 flex items-center justify-center">
                            <Users className="w-6 h-6 text-[#00F5D4]" />
                        </div>
                        <h3 className="text-4xl font-bold text-[#0A192F]">+5,000</h3>
                        <p className="text-[#64748B]">Pacientes atendidos en el último año gracias a nuestras giras médicas.</p>
                    </div>
                    <div className="bg-[#F8FAFC] p-8 rounded-3xl border border-[#E2E8F0] space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-[#00F5D4]/10 flex items-center justify-center">
                            <Shield className="w-6 h-6 text-[#00F5D4]" />
                        </div>
                        <h3 className="text-4xl font-bold text-[#0A192F]">100%</h3>
                        <p className="text-[#64748B]">Profesionales verificados con matrícula habilitante en Tierra del Fuego.</p>
                    </div>
                    <div className="bg-[#F8FAFC] p-8 rounded-3xl border border-[#E2E8F0] space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-[#00F5D4]/10 flex items-center justify-center">
                            <Globe className="w-6 h-6 text-[#00F5D4]" />
                        </div>
                        <h3 className="text-4xl font-bold text-[#0A192F]">10+</h3>
                        <p className="text-[#64748B]">Especialidades médicas que antes no estaban disponibles de forma regular.</p>
                    </div>
                </div>
            </section>

            {/* Mission & Team */}
            <section className="py-20 px-6 bg-[#F8FAFC]">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="flex-1 relative h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src="/images/about-team.png"
                                alt="Equipo VORA"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex-1 space-y-8">
                            <div className="inline-block px-4 py-2 bg-[#00F5D4]/10 rounded-full text-[#00F1CF] font-bold text-sm tracking-wide">
                                NUESTRA MISIÓN
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold text-[#0A192F]">
                                Democratizando el acceso a la salud especializada.
                            </h2>
                            <p className="text-[#64748B] text-lg leading-relaxed">
                                Vivir en zonas extremas no debería significar tener menos acceso a la salud. VORA facilita la logística para que médicos especialistas puedan realizar "giras" periódicas, asegurando continuidad en los tratamientos y acceso a diagnósticos complejos sin que el paciente tenga que viajar miles de kilómetros.
                            </p>
                            <div className="flex items-center gap-4 pt-4">
                                <Heart className="w-12 h-12 text-[#FF6B6B]" />
                                <div>
                                    <p className="font-bold text-[#0A192F]">Compromiso Humano</p>
                                    <p className="text-sm text-[#64748B]">Tecnología al servicio de las personas, no al revés.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
