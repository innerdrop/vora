import { Header, Footer } from "@/components/layout";
import { Metadata } from "next";
import Image from "next/image";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "Contacto | VORA",
    description: "Ponete en contacto con el equipo de soporte de VORA.",
};

export default function ContactoPage() {
    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Header />

            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-2 gap-12 bg-white rounded-3xl overflow-hidden shadow-xl border border-[#E2E8F0]">

                    {/* Contact Form */}
                    <div className="p-8 lg:p-12">
                        <h1 className="text-3xl font-bold text-[#0A192F] mb-4">Hablemos</h1>
                        <p className="text-[#64748B] mb-8">
                            ¿Tenés alguna duda o sugerencia? Completá el formulario y nuestro equipo te responderá en menos de 24 horas.
                        </p>

                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[#0A192F]">Nombre</label>
                                    <input type="text" className="w-full h-12 px-4 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#00F5D4]/20 focus:border-[#00F5D4] outline-none transition-all" placeholder="Juan" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[#0A192F]">Apellido</label>
                                    <input type="text" className="w-full h-12 px-4 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#00F5D4]/20 focus:border-[#00F5D4] outline-none transition-all" placeholder="Pérez" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#0A192F]">Email</label>
                                <input type="email" className="w-full h-12 px-4 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#00F5D4]/20 focus:border-[#00F5D4] outline-none transition-all" placeholder="juan@ejemplo.com" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[#0A192F]">Mensaje</label>
                                <textarea className="w-full h-32 px-4 py-3 rounded-xl border border-[#E2E8F0] focus:ring-2 focus:ring-[#00F5D4]/20 focus:border-[#00F5D4] outline-none transition-all resize-none" placeholder="¿En qué podemos ayudarte?"></textarea>
                            </div>

                            <button className="w-full h-12 bg-[#0A192F] text-white font-bold rounded-xl hover:bg-[#091527] transition-all transform hover:scale-[1.01] active:scale-[0.99]">
                                Enviar Mensaje
                            </button>
                        </form>
                    </div>

                    {/* Info Side with Image */}
                    <div className="bg-[#0A192F] relative p-8 lg:p-12 flex flex-col justify-between overflow-hidden">
                        {/* Background Image Overlay */}
                        <div className="absolute inset-0 opacity-20">
                            <Image
                                src="/images/contact-support.png"
                                alt="Soporte VORA"
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="relative z-10 space-y-8">
                            <div>
                                <h3 className="text-white font-bold text-xl mb-6">Información de Contacto</h3>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 text-white/80">
                                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <span>hola@vora.health</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-white/80">
                                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <span>+54 9 2901 123 456</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-white/80">
                                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <span>San Martín 123, Ushuaia, Tierra del Fuego</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                                <div className="flex items-center gap-4 mb-3">
                                    <MessageCircle className="w-6 h-6 text-[#00F5D4]" />
                                    <h4 className="font-bold text-white">Chat en vivo</h4>
                                </div>
                                <p className="text-sm text-white/70 mb-4">
                                    Nuestro equipo de soporte está disponible de Lunes a Viernes de 9 a 18hs.
                                </p>
                                <button className="w-full py-2 bg-[#00F5D4] text-[#0A192F] font-bold rounded-lg hover:bg-[#00DCC0] transition-colors">
                                    Iniciar Chat
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
