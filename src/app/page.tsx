import Link from "next/link";
import { ArrowRight, MapPin, Shield, Calendar, Star, Users, Stethoscope, MessageCircle } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00F5D4] to-[#00C4AA] flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-[#0A192F]" />
            </div>
            <span className="text-xl font-bold text-[#0A192F]">VORA</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/buscar" className="text-sm font-medium text-[#64748B] hover:text-[#0A192F] transition-colors">
              Buscar Profesionales
            </Link>
            <Link href="/profesionales" className="text-sm font-medium text-[#64748B] hover:text-[#0A192F] transition-colors">
              Soy Profesional
            </Link>
            <Link href="/nosotros" className="text-sm font-medium text-[#64748B] hover:text-[#0A192F] transition-colors">
              Nosotros
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="text-sm font-semibold text-[#0A192F] hover:text-[#00F5D4] transition-colors"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/auth/register"
              className="px-4 py-2 bg-[#0A192F] text-white text-sm font-semibold rounded-xl hover:bg-[#091527] transition-colors"
            >
              Registrarse
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00F5D4]/10 rounded-full">
                <MapPin className="w-4 h-4 text-[#00F5D4]" />
                <span className="text-sm font-medium text-[#0A192F]">Ushuaia, Tierra del Fuego</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-[#0A192F] leading-tight">
                Medicina sin{" "}
                <span className="gradient-text">distancia</span>
              </h1>

              <p className="text-xl text-[#64748B] leading-relaxed max-w-lg">
                Conectamos profesionales de la salud itinerantes con pacientes en
                el fin del mundo. Encuentra especialistas que viajan a Ushuaia.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/buscar"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#0A192F] text-white font-semibold rounded-xl hover:bg-[#091527] transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Buscar Profesionales
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/profesionales"
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 border-2 border-[#E2E8F0] text-[#0A192F] font-semibold rounded-xl hover:bg-[#F8FAFC] transition-colors"
                >
                  Soy Profesional
                </Link>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-[#0A192F]">50+</div>
                  <div className="text-sm text-[#64748B]">Profesionales</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#0A192F]">1.2k+</div>
                  <div className="text-sm text-[#64748B]">Consultas</div>
                </div>
                <div>
                  <div className="text-3xl font-bold gradient-text">4.9</div>
                  <div className="text-sm text-[#64748B]">Valoración</div>
                </div>
              </div>
            </div>

            {/* Right Bento Grid */}
            <div className="grid grid-cols-2 gap-4">
              {/* Large Card */}
              <div className="col-span-2 p-6 rounded-3xl bg-gradient-to-br from-[#0A192F] to-[#1E293B] text-white">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-white/10">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 bg-[#00F5D4] text-[#0A192F] text-xs font-bold rounded-full">
                    Próxima Gira
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">Dr. Carlos Méndez</h3>
                <p className="text-white/70 text-sm mb-4">Cardiología • 15 años de experiencia</p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-[#00F5D4]" />
                    <span>Ushuaia</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-[#00F5D4]" />
                    <span>4.8 (127)</span>
                  </div>
                </div>
              </div>

              {/* Small Card 1 */}
              <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#00F5D4] transition-colors group">
                <div className="p-3 rounded-xl bg-[#00F5D4]/10 w-fit mb-4 group-hover:bg-[#00F5D4]/20 transition-colors">
                  <Shield className="w-5 h-5 text-[#00F5D4]" />
                </div>
                <h4 className="font-semibold text-[#0A192F] mb-1">Verificados</h4>
                <p className="text-xs text-[#64748B]">Matrículas auditadas</p>
              </div>

              {/* Small Card 2 */}
              <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#00F5D4] transition-colors group">
                <div className="p-3 rounded-xl bg-[#00F5D4]/10 w-fit mb-4 group-hover:bg-[#00F5D4]/20 transition-colors">
                  <MessageCircle className="w-5 h-5 text-[#00F5D4]" />
                </div>
                <h4 className="font-semibold text-[#0A192F] mb-1">WhatsApp</h4>
                <p className="text-xs text-[#64748B]">Contacto directo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="py-20 px-6 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-[#00F5D4]/10 text-[#00F5D4] text-sm font-semibold rounded-full mb-4">
              ¿Cómo funciona?
            </span>
            <h2 className="text-4xl font-bold text-[#0A192F] mb-4">
              Conectamos salud y distancia
            </h2>
            <p className="text-lg text-[#64748B] max-w-2xl mx-auto">
              VORA simplifica el acceso a especialistas médicos en zonas remotas
              como Ushuaia y Tierra del Fuego.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl bg-white border border-[#E2E8F0] hover:shadow-lg hover:border-[#00F5D4]/50 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00F5D4] to-[#00C4AA] flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-[#0A192F]" />
              </div>
              <h3 className="text-xl font-bold text-[#0A192F] mb-3">
                Para Pacientes
              </h3>
              <p className="text-[#64748B] leading-relaxed">
                Descubrí profesionales verificados que viajan a tu ciudad.
                Filtrá por especialidad, fecha de llegada y valoraciones.
              </p>
              <Link
                href="/buscar"
                className="inline-flex items-center gap-2 text-[#00F5D4] font-semibold mt-6 group-hover:gap-3 transition-all"
              >
                Explorar <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-3xl bg-white border border-[#E2E8F0] hover:shadow-lg hover:border-[#00F5D4]/50 transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0A192F] to-[#334155] flex items-center justify-center mb-6">
                <Stethoscope className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#0A192F] mb-3">
                Para Profesionales
              </h3>
              <p className="text-[#64748B] leading-relaxed">
                Publicá tus giras médicas, gestioná turnos y cobrá señas.
                Potenciá tu alcance en el fin del mundo.
              </p>
              <Link
                href="/profesionales"
                className="inline-flex items-center gap-2 text-[#00F5D4] font-semibold mt-6 group-hover:gap-3 transition-all"
              >
                Unirte <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#00F5D4] to-[#00C4AA] text-[#0A192F] group">
              <div className="w-14 h-14 rounded-2xl bg-white/30 flex items-center justify-center mb-6">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">
                100% Seguro
              </h3>
              <p className="opacity-80 leading-relaxed">
                Verificamos cada matrícula profesional. Tu historial médico
                encriptado con AES-256. Pagos protegidos.
              </p>
              <Link
                href="/seguridad"
                className="inline-flex items-center gap-2 font-semibold mt-6 group-hover:gap-3 transition-all"
              >
                Más Info <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#0A192F] mb-6">
            ¿Listo para comenzar?
          </h2>
          <p className="text-lg text-[#64748B] mb-8 max-w-2xl mx-auto">
            Únete a la comunidad de profesionales de la salud que llevan medicina
            de calidad al fin del mundo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0A192F] text-white font-semibold rounded-xl hover:bg-[#091527] transition-all"
            >
              Crear Cuenta Gratis
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#E2E8F0] text-[#0A192F] font-semibold rounded-xl hover:bg-[#F8FAFC] transition-colors"
            >
              Ver Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#0A192F] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00F5D4] to-[#00C4AA] flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-[#0A192F]" />
                </div>
                <span className="text-xl font-bold">VORA</span>
              </div>
              <p className="text-white/60 text-sm">
                Medicine Beyond Distance
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Plataforma</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><Link href="/buscar" className="hover:text-[#00F5D4]">Buscar Profesionales</Link></li>
                <li><Link href="/profesionales" className="hover:text-[#00F5D4]">Para Profesionales</Link></li>
                <li><Link href="/precios" className="hover:text-[#00F5D4]">Planes y Precios</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Recursos</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><Link href="/blog" className="hover:text-[#00F5D4]">Blog</Link></li>
                <li><Link href="/ayuda" className="hover:text-[#00F5D4]">Centro de Ayuda</Link></li>
                <li><Link href="/contacto" className="hover:text-[#00F5D4]">Contacto</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><Link href="/legal/terminos" className="hover:text-[#00F5D4]">Términos de Uso</Link></li>
                <li><Link href="/legal/privacidad" className="hover:text-[#00F5D4]">Privacidad</Link></li>
                <li><Link href="/legal/cookies" className="hover:text-[#00F5D4]">Cookies</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-center text-sm text-white/40">
            <p>© 2026 VORA Health. Todos los derechos reservados. Ushuaia, Tierra del Fuego 🇦🇷</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
