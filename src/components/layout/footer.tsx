import Link from "next/link";
import { Stethoscope, Facebook, Twitter, Instagram, Linkedin, Heart } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-[#0A192F] text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00F5D4] to-[#00C4AA] flex items-center justify-center">
                                <Stethoscope className="w-5 h-5 text-[#0A192F]" />
                            </div>
                            <span className="text-2xl font-bold">VORA</span>
                        </Link>
                        <p className="text-white/60 leading-relaxed">
                            Conectando profesionales de la salud itinerantes con pacientes en el fin del mundo. Medicina sin distancia.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                <Instagram className="w-5 h-5 text-[#00F5D4]" />
                            </a>
                            <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                <Facebook className="w-5 h-5 text-[#00F5D4]" />
                            </a>
                            <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                <Linkedin className="w-5 h-5 text-[#00F5D4]" />
                            </a>
                            <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                <Twitter className="w-5 h-5 text-[#00F5D4]" />
                            </a>
                        </div>
                    </div>

                    {/* Links 1 */}
                    <div>
                        <h3 className="font-bold text-lg mb-6">Plataforma</h3>
                        <ul className="space-y-4 text-white/60">
                            <li><Link href="/buscar" className="hover:text-[#00F5D4] transition-colors">Buscar Profesionales</Link></li>
                            <li><Link href="/precios" className="hover:text-[#00F5D4] transition-colors">Planes para Profesionales</Link></li>
                            <li><Link href="/auth/register" className="hover:text-[#00F5D4] transition-colors">Registrarse</Link></li>
                            <li><Link href="/auth/login" className="hover:text-[#00F5D4] transition-colors">Iniciar Sesión</Link></li>
                        </ul>
                    </div>

                    {/* Links 2 */}
                    <div>
                        <h3 className="font-bold text-lg mb-6">Compañía</h3>
                        <ul className="space-y-4 text-white/60">
                            <li><Link href="/nosotros" className="hover:text-[#00F5D4] transition-colors">Sobre Nosotros</Link></li>
                            <li><Link href="/contacto" className="hover:text-[#00F5D4] transition-colors">Contacto</Link></li>
                            <li><Link href="/ayuda" className="hover:text-[#00F5D4] transition-colors">Centro de Ayuda</Link></li>
                            <li><Link href="/blog" className="hover:text-[#00F5D4] transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    {/* Links 3 */}
                    <div>
                        <h3 className="font-bold text-lg mb-6">Legales</h3>
                        <ul className="space-y-4 text-white/60">
                            <li><Link href="/terminos" className="hover:text-[#00F5D4] transition-colors">Términos y Condiciones</Link></li>
                            <li><Link href="/privacidad" className="hover:text-[#00F5D4] transition-colors">Política de Privacidad</Link></li>
                            <li><Link href="/cookies" className="hover:text-[#00F5D4] transition-colors">Política de Cookies</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-white/40 text-sm text-center md:text-left">
                        © 2026 VORA Health. Todos los derechos reservados.
                    </p>
                    <div className="flex items-center gap-2 text-white/40 text-sm">
                        <span>Hecho con</span>
                        <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                        <span>en Tierra del Fuego</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
