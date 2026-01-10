import { Header, Footer } from "@/components/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Términos y Condiciones | VORA",
    description: "Términos y condiciones de uso de la plataforma VORA.",
};

export default function TerminosPage() {
    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Header />

            <main className="max-w-4xl mx-auto px-6 py-12">
                <h1 className="text-3xl md:text-4xl font-bold text-[#0A192F] mb-2">Términos y Condiciones</h1>
                <p className="text-[#64748B] mb-8">Última actualización: 10 de Enero de 2026</p>

                <div className="bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-sm space-y-8 text-[#334155] leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-[#0A192F] mb-4">1. Introducción</h2>
                        <p>
                            Bienvenido a VORA. Al acceder a nuestro sitio web y utilizar nuestros servicios, usted acepta estar sujeto a los siguientes términos y condiciones. Si no está de acuerdo con alguna parte de estos términos, no podrá acceder al servicio.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0A192F] mb-4">2. Definiciones</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Plataforma:</strong> Se refiere al sitio web y aplicaciones de VORA.</li>
                            <li><strong>Profesional:</strong> Profesional de la salud registrado y verificado en VORA.</li>
                            <li><strong>Paciente:</strong> Usuario que busca servicios de salud a través de la plataforma.</li>
                            <li><strong>Servicios:</strong> Conexión entre profesionales y pacientes, gestión de turnos y herramientas relacionadas.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0A192F] mb-4">3. Uso de la Plataforma</h2>
                        <p>
                            VORA actúa únicamente como intermediario tecnológico para facilitar la conexión entre Profesionales y Pacientes. No proporcionamos servicios médicos directos ni reemplazamos la relación médico-paciente.
                        </p>
                        <p className="mt-2">
                            Usted se compromete a utilizar la plataforma solo para fines legales y de acuerdo con estos términos.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0A192F] mb-4">4. Cuentas y Seguridad</h2>
                        <p>
                            Para utilizar ciertas funciones, debe registrarse y crear una cuenta. Usted es responsable de mantener la confidencialidad de su cuenta y contraseña. Notifíquenos inmediatamente sobre cualquier uso no autorizado.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0A192F] mb-4">5. Pagos y Cancelaciones</h2>
                        <p>
                            Los Profesionales pueden requerir un depósito o seña para confirmar turnos. Las políticas de cancelación y reembolso son establecidas por cada Profesional, pero VORA facilita la gestión de las mismas.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0A192F] mb-4">6. Responsabilidad</h2>
                        <p>
                            VORA verifica las credenciales de los Profesionales, pero no garantiza la calidad ni el resultado de los servicios médicos prestados. La responsabilidad profesional recae exclusivamente en el Profesional de la salud.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0A192F] mb-4">7. Modificaciones</h2>
                        <p>
                            Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0A192F] mb-4">8. Contacto</h2>
                        <p>
                            Si tiene preguntas sobre estos términos, por favor contáctenos a través de <a href="mailto:legal@vora.health" className="text-[#00F5D4] hover:underline">legal@vora.health</a>.
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
