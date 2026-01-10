"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, Stethoscope, ArrowLeft, AlertCircle } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    const error = searchParams.get("error");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(error ? "Credenciales inválidas" : "");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setErrorMessage("Email o contraseña incorrectos");
                setIsLoading(false);
                return;
            }

            // Redirect based on role (we'll improve this later)
            router.push(callbackUrl);
            router.refresh();
        } catch {
            setErrorMessage("Error al iniciar sesión. Intentá de nuevo.");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Panel - Form */}
            <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 py-12">
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
                        Bienvenido de vuelta
                    </h2>
                    <p className="text-[#64748B] mb-8">
                        Ingresá tus credenciales para continuar
                    </p>

                    {/* Error Message */}
                    {errorMessage && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-3 p-4 mb-6 bg-red-50 border border-red-200 rounded-xl text-red-700"
                        >
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <p className="text-sm">{errorMessage}</p>
                        </motion.div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-[#0A192F]">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="tu@email.com"
                                    required
                                    className="w-full h-12 pl-12 pr-4 rounded-xl border border-[#E2E8F0] bg-white text-[#0A192F] placeholder:text-[#94A3B8] focus:border-[#00F5D4] focus:ring-2 focus:ring-[#00F5D4]/20 outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-[#0A192F]">
                                    Contraseña
                                </label>
                                <Link
                                    href="/auth/forgot-password"
                                    className="text-sm text-[#00F5D4] hover:underline"
                                >
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="w-full h-12 pl-12 pr-12 rounded-xl border border-[#E2E8F0] bg-white text-[#0A192F] placeholder:text-[#94A3B8] focus:border-[#00F5D4] focus:ring-2 focus:ring-[#00F5D4]/20 outline-none transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B] transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-12 bg-[#0A192F] text-white font-semibold rounded-xl hover:bg-[#091527] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                "Iniciar Sesión"
                            )}
                        </button>
                    </form>

                    {/* Demo Accounts */}
                    <div className="mt-8 p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                        <p className="text-xs font-semibold text-[#64748B] mb-3">CUENTAS DE DEMO</p>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-[#64748B]">Admin:</span>
                                <span className="font-mono text-[#0A192F]">admin@vora.health / admin123</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[#64748B]">Doctor:</span>
                                <span className="font-mono text-[#0A192F]">demo.doctor@vora.health / demo123</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[#64748B]">Paciente:</span>
                                <span className="font-mono text-[#0A192F]">paciente@demo.com / demo123</span>
                            </div>
                        </div>
                    </div>

                    {/* Register Link */}
                    <p className="text-center mt-8 text-[#64748B]">
                        ¿No tenés cuenta?{" "}
                        <Link href="/auth/register" className="text-[#00F5D4] font-semibold hover:underline">
                            Registrate gratis
                        </Link>
                    </p>
                </motion.div>
            </div>

            {/* Right Panel - Decorative */}
            <div className="hidden lg:flex flex-1 bg-gradient-to-br from-[#0A192F] to-[#1E293B] items-center justify-center p-16 relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-20 right-20 w-64 h-64 bg-[#00F5D4]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#00F5D4]/5 rounded-full blur-3xl" />

                <div className="relative z-10 text-center text-white max-w-lg">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-[#00F5D4] to-[#00C4AA] flex items-center justify-center mb-8">
                            <Stethoscope className="w-12 h-12 text-[#0A192F]" />
                        </div>
                        <h3 className="text-3xl font-bold mb-4">
                            Conectamos salud y distancia
                        </h3>
                        <p className="text-white/70 text-lg leading-relaxed">
                            Profesionales de la salud que viajan al fin del mundo para atender a quienes más lo necesitan.
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
