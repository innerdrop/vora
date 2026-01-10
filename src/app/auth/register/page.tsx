"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, Phone, Stethoscope, ArrowLeft, CheckCircle2 } from "lucide-react";

type UserType = "patient" | "professional";

export default function RegisterPage() {
    const [userType, setUserType] = useState<UserType>("patient");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        // Professional fields
        specialty: "",
        licenseNumber: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (step === 1) {
            setStep(2);
            return;
        }
        setIsLoading(true);
        // TODO: Implement registration
        setTimeout(() => setIsLoading(false), 2000);
    };

    const benefits = {
        patient: [
            "Encontrá especialistas verificados",
            "Reservá turnos fácilmente",
            "Historial médico seguro",
            "Recordatorios automáticos",
        ],
        professional: [
            "Publicá tus giras médicas",
            "Gestioná tu agenda online",
            "Cobrá señas por turnos",
            "Vault médico encriptado",
        ],
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Panel - Form */}
            <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 py-12 overflow-y-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-md w-full mx-auto"
                >
                    {/* Back Link */}
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-[#64748B] hover:text-[#0A192F] mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Volver al inicio
                    </Link>

                    {/* Logo */}
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00F5D4] to-[#00C4AA] flex items-center justify-center">
                            <Stethoscope className="w-6 h-6 text-[#0A192F]" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-[#0A192F]">VORA</h1>
                            <p className="text-sm text-[#64748B]">Medicine Beyond Distance</p>
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl font-bold text-[#0A192F] mb-2">
                        Creá tu cuenta
                    </h2>
                    <p className="text-[#64748B] mb-6">
                        {step === 1 ? "Elegí tu tipo de cuenta para comenzar" : "Completá tus datos"}
                    </p>

                    {/* Step Indicator */}
                    <div className="flex items-center gap-2 mb-8">
                        <div className={`h-2 flex-1 rounded-full ${step >= 1 ? "bg-[#00F5D4]" : "bg-[#E2E8F0]"}`} />
                        <div className={`h-2 flex-1 rounded-full ${step >= 2 ? "bg-[#00F5D4]" : "bg-[#E2E8F0]"}`} />
                    </div>

                    {step === 1 ? (
                        /* Step 1: Select User Type */
                        <div className="space-y-4">
                            {/* Patient Option */}
                            <button
                                type="button"
                                onClick={() => setUserType("patient")}
                                className={`w-full p-5 rounded-2xl border-2 text-left transition-all ${userType === "patient"
                                        ? "border-[#00F5D4] bg-[#00F5D4]/5"
                                        : "border-[#E2E8F0] hover:border-[#94A3B8]"
                                    }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${userType === "patient" ? "bg-[#00F5D4]" : "bg-[#F1F5F9]"
                                        }`}>
                                        <User className={`w-6 h-6 ${userType === "patient" ? "text-[#0A192F]" : "text-[#64748B]"}`} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-[#0A192F] mb-1">Soy Paciente</h3>
                                        <p className="text-sm text-[#64748B]">
                                            Quiero buscar y reservar turnos con profesionales
                                        </p>
                                    </div>
                                    {userType === "patient" && (
                                        <CheckCircle2 className="w-6 h-6 text-[#00F5D4]" />
                                    )}
                                </div>
                            </button>

                            {/* Professional Option */}
                            <button
                                type="button"
                                onClick={() => setUserType("professional")}
                                className={`w-full p-5 rounded-2xl border-2 text-left transition-all ${userType === "professional"
                                        ? "border-[#00F5D4] bg-[#00F5D4]/5"
                                        : "border-[#E2E8F0] hover:border-[#94A3B8]"
                                    }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${userType === "professional" ? "bg-[#00F5D4]" : "bg-[#F1F5F9]"
                                        }`}>
                                        <Stethoscope className={`w-6 h-6 ${userType === "professional" ? "text-[#0A192F]" : "text-[#64748B]"}`} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-[#0A192F] mb-1">Soy Profesional</h3>
                                        <p className="text-sm text-[#64748B]">
                                            Quiero publicar mis giras y atender pacientes
                                        </p>
                                    </div>
                                    {userType === "professional" && (
                                        <CheckCircle2 className="w-6 h-6 text-[#00F5D4]" />
                                    )}
                                </div>
                            </button>

                            <button
                                onClick={() => setStep(2)}
                                className="w-full h-12 bg-[#0A192F] text-white font-semibold rounded-xl hover:bg-[#091527] transition-all mt-6"
                            >
                                Continuar
                            </button>
                        </div>
                    ) : (
                        /* Step 2: Form */
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Name Fields */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[#0A192F]">Nombre</label>
                                    <input
                                        type="text"
                                        placeholder="Juan"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        className="w-full h-11 px-4 rounded-xl border border-[#E2E8F0] bg-white text-[#0A192F] placeholder:text-[#94A3B8] focus:border-[#00F5D4] focus:ring-2 focus:ring-[#00F5D4]/20 outline-none transition-all"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[#0A192F]">Apellido</label>
                                    <input
                                        type="text"
                                        placeholder="Pérez"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        className="w-full h-11 px-4 rounded-xl border border-[#E2E8F0] bg-white text-[#0A192F] placeholder:text-[#94A3B8] focus:border-[#00F5D4] focus:ring-2 focus:ring-[#00F5D4]/20 outline-none transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#0A192F]">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                                    <input
                                        type="email"
                                        placeholder="tu@email.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full h-11 pl-12 pr-4 rounded-xl border border-[#E2E8F0] bg-white text-[#0A192F] placeholder:text-[#94A3B8] focus:border-[#00F5D4] focus:ring-2 focus:ring-[#00F5D4]/20 outline-none transition-all"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#0A192F]">Teléfono</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                                    <input
                                        type="tel"
                                        placeholder="+54 11 1234-5678"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full h-11 pl-12 pr-4 rounded-xl border border-[#E2E8F0] bg-white text-[#0A192F] placeholder:text-[#94A3B8] focus:border-[#00F5D4] focus:ring-2 focus:ring-[#00F5D4]/20 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            {/* Professional Fields */}
                            {userType === "professional" && (
                                <>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-[#0A192F]">Especialidad</label>
                                        <select
                                            value={formData.specialty}
                                            onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                                            className="w-full h-11 px-4 rounded-xl border border-[#E2E8F0] bg-white text-[#0A192F] focus:border-[#00F5D4] focus:ring-2 focus:ring-[#00F5D4]/20 outline-none transition-all"
                                            required
                                        >
                                            <option value="">Seleccioná tu especialidad</option>
                                            <option value="cardiologia">Cardiología</option>
                                            <option value="dermatologia">Dermatología</option>
                                            <option value="endocrinologia">Endocrinología</option>
                                            <option value="ginecologia">Ginecología</option>
                                            <option value="neurologia">Neurología</option>
                                            <option value="oftalmologia">Oftalmología</option>
                                            <option value="pediatria">Pediatría</option>
                                            <option value="psiquiatria">Psiquiatría</option>
                                            <option value="traumatologia">Traumatología</option>
                                            <option value="clinica_medica">Clínica Médica</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-[#0A192F]">Número de Matrícula</label>
                                        <input
                                            type="text"
                                            placeholder="MN-12345"
                                            value={formData.licenseNumber}
                                            onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                                            className="w-full h-11 px-4 rounded-xl border border-[#E2E8F0] bg-white text-[#0A192F] placeholder:text-[#94A3B8] focus:border-[#00F5D4] focus:ring-2 focus:ring-[#00F5D4]/20 outline-none transition-all"
                                            required
                                        />
                                    </div>
                                </>
                            )}

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#0A192F]">Contraseña</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Mínimo 8 caracteres"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full h-11 pl-12 pr-12 rounded-xl border border-[#E2E8F0] bg-white text-[#0A192F] placeholder:text-[#94A3B8] focus:border-[#00F5D4] focus:ring-2 focus:ring-[#00F5D4]/20 outline-none transition-all"
                                        required
                                        minLength={8}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B]"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Terms */}
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    required
                                    className="mt-1 w-4 h-4 rounded border-[#E2E8F0] text-[#00F5D4] focus:ring-[#00F5D4]"
                                />
                                <span className="text-sm text-[#64748B]">
                                    Acepto los{" "}
                                    <Link href="/legal/terminos" className="text-[#00F5D4] hover:underline">
                                        Términos de Uso
                                    </Link>{" "}
                                    y la{" "}
                                    <Link href="/legal/privacidad" className="text-[#00F5D4] hover:underline">
                                        Política de Privacidad
                                    </Link>
                                </span>
                            </label>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="flex-1 h-12 border-2 border-[#E2E8F0] text-[#0A192F] font-semibold rounded-xl hover:bg-[#F8FAFC] transition-all"
                                >
                                    Atrás
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex-[2] h-12 bg-[#0A192F] text-white font-semibold rounded-xl hover:bg-[#091527] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        "Crear Cuenta"
                                    )}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Login Link */}
                    <p className="text-center mt-8 text-[#64748B]">
                        ¿Ya tenés cuenta?{" "}
                        <Link href="/auth/login" className="text-[#00F5D4] font-semibold hover:underline">
                            Iniciá sesión
                        </Link>
                    </p>
                </motion.div>
            </div>

            {/* Right Panel - Benefits */}
            <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#0A192F] to-[#1E293B] items-center justify-center p-16 relative overflow-hidden">
                <div className="absolute top-20 right-20 w-64 h-64 bg-[#00F5D4]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#00F5D4]/5 rounded-full blur-3xl" />

                <div className="relative z-10 text-white max-w-lg">
                    <motion.div
                        key={userType}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <span className="inline-block px-4 py-1.5 bg-[#00F5D4]/20 text-[#00F5D4] text-sm font-semibold rounded-full mb-6">
                            {userType === "patient" ? "Para Pacientes" : "Para Profesionales"}
                        </span>
                        <h3 className="text-3xl font-bold mb-6">
                            {userType === "patient"
                                ? "Tu salud, sin límites"
                                : "Expandí tu alcance"
                            }
                        </h3>
                        <ul className="space-y-4">
                            {benefits[userType].map((benefit, index) => (
                                <motion.li
                                    key={benefit}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-6 h-6 rounded-full bg-[#00F5D4]/20 flex items-center justify-center">
                                        <CheckCircle2 className="w-4 h-4 text-[#00F5D4]" />
                                    </div>
                                    <span className="text-white/80">{benefit}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
