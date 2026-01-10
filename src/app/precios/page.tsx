"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    Check,
    X,
    Stethoscope,
    ArrowRight,
    Star,
    Zap,
    Shield,
    MessageCircle,
    Calendar,
    CreditCard,
    FileText,
    Bell,
    Headphones
} from "lucide-react";

const plans = [
    {
        name: "Start",
        price: "Gratis",
        period: "",
        description: "Ideal para comenzar y probar la plataforma",
        color: "from-secondary-400 to-secondary-500",
        features: [
            { name: "Perfil público", included: true },
            { name: "Información de contacto estática", included: true },
            { name: "1 gira por mes", included: true },
            { name: "5 turnos por gira", included: true },
            { name: "Botón de WhatsApp", included: false },
            { name: "Instagram Embed", included: false },
            { name: "Calendario de giras", included: false },
            { name: "Sistema de turnos automatizado", included: false },
            { name: "Reseñas de pacientes", included: false },
            { name: "Cobro de señas", included: false },
            { name: "Vault médico", included: false },
            { name: "Recordatorios automáticos", included: false },
        ],
        cta: "Comenzar Gratis",
        popular: false,
    },
    {
        name: "Grow",
        price: "$15.000",
        period: "/mes",
        description: "Para profesionales que quieren expandir su alcance",
        color: "from-blue-500 to-indigo-600",
        features: [
            { name: "Perfil público", included: true },
            { name: "Información de contacto estática", included: true },
            { name: "4 giras por mes", included: true },
            { name: "20 turnos por gira", included: true },
            { name: "Botón de WhatsApp", included: true },
            { name: "Instagram Embed", included: true },
            { name: "Calendario de giras", included: true },
            { name: "Sistema de turnos automatizado", included: true },
            { name: "Reseñas de pacientes", included: true },
            { name: "Cobro de señas", included: false },
            { name: "Vault médico", included: false },
            { name: "Recordatorios automáticos", included: false },
        ],
        cta: "Elegir Grow",
        popular: true,
    },
    {
        name: "Elite",
        price: "$35.000",
        period: "/mes",
        description: "Todas las herramientas para profesionales premium",
        color: "from-amber-400 to-orange-500",
        features: [
            { name: "Perfil público", included: true },
            { name: "Información de contacto estática", included: true },
            { name: "Giras ilimitadas", included: true },
            { name: "Turnos ilimitados", included: true },
            { name: "Botón de WhatsApp", included: true },
            { name: "Instagram Embed", included: true },
            { name: "Calendario de giras", included: true },
            { name: "Sistema de turnos automatizado", included: true },
            { name: "Reseñas de pacientes", included: true },
            { name: "Cobro de señas (MercadoPago)", included: true },
            { name: "Vault médico encriptado", included: true },
            { name: "Recordatorios automáticos", included: true },
        ],
        cta: "Elegir Elite",
        popular: false,
        badge: "⭐ Premium",
    },
];

const features = [
    {
        icon: MessageCircle,
        title: "WhatsApp Integrado",
        description: "Botón de contacto directo para que los pacientes te escriban fácilmente.",
    },
    {
        icon: Calendar,
        title: "Calendario de Giras",
        description: "Publicá tus fechas de viaje y que los pacientes vean cuándo estarás disponible.",
    },
    {
        icon: CreditCard,
        title: "Cobro de Señas",
        description: "Recibí pagos anticipados vía MercadoPago para confirmar turnos.",
    },
    {
        icon: FileText,
        title: "Vault Médico",
        description: "Compartí recetas y estudios de forma segura con encriptación AES-256.",
    },
    {
        icon: Bell,
        title: "Recordatorios",
        description: "Notificaciones automáticas por WhatsApp para reducir ausencias.",
    },
    {
        icon: Headphones,
        title: "Soporte Prioritario",
        description: "Atención preferencial para usuarios Elite con respuesta en menos de 2 horas.",
    },
];

export default function PreciosPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00F5D4] to-[#00C4AA] flex items-center justify-center">
                                <Stethoscope className="w-5 h-5 text-[#0A192F]" />
                            </div>
                            <span className="text-xl font-bold text-[#0A192F]">VORA</span>
                        </Link>

                        <div className="flex items-center gap-4">
                            <Link href="/auth/login" className="text-sm font-semibold text-[#64748B] hover:text-[#0A192F]">
                                Iniciar Sesión
                            </Link>
                            <Link
                                href="/auth/register"
                                className="px-4 py-2 bg-[#0A192F] text-white text-sm font-semibold rounded-xl hover:bg-[#091527]"
                            >
                                Registrarse
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className="py-20 px-6 bg-gradient-to-b from-[#F8FAFC] to-white">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#00F5D4]/10 text-[#00F5D4] text-sm font-semibold rounded-full mb-6">
                            <Zap className="w-4 h-4" />
                            Planes para Profesionales
                        </span>
                        <h1 className="text-4xl lg:text-5xl font-bold text-[#0A192F] mb-6">
                            Elegí el plan que mejor se adapte a tu práctica
                        </h1>
                        <p className="text-xl text-[#64748B] max-w-2xl mx-auto">
                            Comenzá gratis y escalá cuando lo necesites. Sin compromisos, cancelá cuando quieras.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        {plans.map((plan, index) => (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.15 }}
                                className={`relative rounded-3xl border-2 p-8 transition-all ${plan.popular
                                        ? "border-[#00F5D4] bg-gradient-to-b from-[#00F5D4]/5 to-white shadow-xl scale-105"
                                        : "border-[#E2E8F0] bg-white hover:border-[#00F5D4]/50 hover:shadow-lg"
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#00F5D4] to-[#00C4AA] text-[#0A192F] text-sm font-bold rounded-full">
                                        Más Popular
                                    </div>
                                )}

                                {plan.badge && (
                                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-semibold rounded-full mb-4">
                                        {plan.badge}
                                    </span>
                                )}

                                <h3 className="text-2xl font-bold text-[#0A192F] mb-2">{plan.name}</h3>
                                <p className="text-[#64748B] text-sm mb-6">{plan.description}</p>

                                <div className="mb-8">
                                    <span className="text-4xl font-bold text-[#0A192F]">{plan.price}</span>
                                    <span className="text-[#64748B]">{plan.period}</span>
                                </div>

                                <Link
                                    href="/auth/register"
                                    className={`w-full flex items-center justify-center gap-2 h-12 rounded-xl font-semibold transition-all ${plan.popular
                                            ? "bg-[#0A192F] text-white hover:bg-[#091527]"
                                            : "bg-[#F8FAFC] text-[#0A192F] hover:bg-[#F1F5F9] border border-[#E2E8F0]"
                                        }`}
                                >
                                    {plan.cta}
                                    <ArrowRight className="w-4 h-4" />
                                </Link>

                                <div className="mt-8 pt-8 border-t border-[#E2E8F0]">
                                    <p className="text-sm font-semibold text-[#0A192F] mb-4">Incluye:</p>
                                    <ul className="space-y-3">
                                        {plan.features.map((feature) => (
                                            <li key={feature.name} className="flex items-start gap-3">
                                                {feature.included ? (
                                                    <Check className="w-5 h-5 text-[#00F5D4] flex-shrink-0" />
                                                ) : (
                                                    <X className="w-5 h-5 text-[#CBD5E1] flex-shrink-0" />
                                                )}
                                                <span className={feature.included ? "text-[#64748B]" : "text-[#CBD5E1]"}>
                                                    {feature.name}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 px-6 bg-[#F8FAFC]">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-[#0A192F] mb-4">
                            Todo lo que necesitás para gestionar tu práctica
                        </h2>
                        <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
                            Herramientas pensadas para profesionales de la salud que viajan
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-2xl border border-[#E2E8F0] p-6 hover:shadow-lg transition-all"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00F5D4] to-[#00C4AA] flex items-center justify-center mb-4">
                                    <feature.icon className="w-6 h-6 text-[#0A192F]" />
                                </div>
                                <h3 className="text-lg font-bold text-[#0A192F] mb-2">{feature.title}</h3>
                                <p className="text-[#64748B]">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-20 px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-[#0A192F] mb-4">
                            Preguntas frecuentes
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                q: "¿Puedo cambiar de plan en cualquier momento?",
                                a: "Sí, podés actualizar o bajar de plan cuando quieras. Los cambios se aplican de forma proporcional al tiempo restante de tu ciclo de facturación.",
                            },
                            {
                                q: "¿Qué métodos de pago aceptan?",
                                a: "Aceptamos tarjetas de crédito y débito de todas las marcas, y también MercadoPago para usuarios de Argentina.",
                            },
                            {
                                q: "¿Cómo funciona la verificación de matrícula?",
                                a: "Al registrarte, nuestro equipo verifica tu número de matrícula con los registros oficiales. El proceso toma entre 24 y 48 horas hábiles.",
                            },
                            {
                                q: "¿Puedo usar VORA si atiendo solo en Buenos Aires?",
                                a: "VORA está optimizado para profesionales que viajan, pero también podés usarlo si atendés en una sola ciudad. La plataforma te ayuda a gestionar turnos y pacientes.",
                            },
                        ].map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-[#F8FAFC] rounded-2xl p-6"
                            >
                                <h3 className="font-semibold text-[#0A192F] mb-2">{faq.q}</h3>
                                <p className="text-[#64748B]">{faq.a}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6 bg-gradient-to-br from-[#0A192F] to-[#1E293B]">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                        ¿Listo para expandir tu práctica?
                    </h2>
                    <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
                        Únete a más de 50 profesionales que ya usan VORA para llegar a pacientes en Ushuaia y Tierra del Fuego.
                    </p>
                    <Link
                        href="/auth/register"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#00F5D4] to-[#00C4AA] text-[#0A192F] font-bold rounded-xl hover:opacity-90 transition-opacity"
                    >
                        Comenzar Gratis
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 bg-[#0A192F] text-white">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-white/40 text-sm">
                        © 2026 VORA Health. Todos los derechos reservados.
                    </p>
                </div>
            </footer>
        </div>
    );
}
