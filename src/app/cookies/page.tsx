import { Header, Footer } from "@/components/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Política de Cookies | VORA",
    description: "Uso de cookies y tecnologías similares en VORA.",
};

export default function CookiesPage() {
    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Header />

            <main className="max-w-4xl mx-auto px-6 py-12">
                <h1 className="text-3xl md:text-4xl font-bold text-[#0A192F] mb-2">Política de Cookies</h1>
                <p className="text-[#64748B] mb-8">Última actualización: 10 de Enero de 2026</p>

                <div className="bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-sm space-y-8 text-[#334155] leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-[#0A192F] mb-4">1. ¿Qué son las cookies?</h2>
                        <p>
                            Las cookies son pequeños archivos de texto que los sitios web almacenan en su dispositivo para recordar sus preferencias y mejorar su experiencia de uso.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0A192F] mb-4">2. ¿Cómo usamos las cookies?</h2>
                        <p>Utilizamos cookies para:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Mantenener su sesión activa de forma segura.</li>
                            <li>Recordar sus preferencias de idioma y configuración.</li>
                            <li>Analizar cómo se utiliza nuestra plataforma para mejorarla.</li>
                            <li>Personalizar el contenido que se le muestra.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0A192F] mb-4">3. Tipos de Cookies</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-bold text-[#0A192F]">Esenciales</h3>
                                <p>Necesarias para que el sitio funcione. No se pueden desactivar.</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-[#0A192F]">Funcionales</h3>
                                <p>Permiten recordar sus elecciones (ej. nombre de usuario, región).</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-[#0A192F]">Analíticas</h3>
                                <p>Nos ayudan a entender cómo los usuarios interactúan con el sitio (Google Analytics, etc.).</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0A192F] mb-4">4. Gestión de Cookies</h2>
                        <p>
                            Puede controlar y/o eliminar las cookies según desee desde la configuración de su navegador. Tenga en cuenta que desactivar las cookies esenciales puede afectar el funcionamiento de VORA.
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
