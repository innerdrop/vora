import { Header, Footer } from "@/components/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Política de Privacidad | VORA",
    description: "Cómo VORA recopila, utiliza y protege sus datos personales.",
};

export default function PrivacidadPage() {
    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Header />

            <main className="max-w-4xl mx-auto px-6 py-12">
                <h1 className="text-3xl md:text-4xl font-bold text-[#0A192F] mb-2">Política de Privacidad</h1>
                <p className="text-[#64748B] mb-8">Última actualización: 10 de Enero de 2026</p>

                <div className="bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-sm space-y-8 text-[#334155] leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-[#0A192F] mb-4">1. Resumen</h2>
                        <p>
                            En VORA, nos tomamos su privacidad muy en serio. Esta política describe cómo recopilamos, usamos y compartimos su información personal cuando utiliza nuestros servicios.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0A192F] mb-4">2. Información que Recopilamos</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Datos de Registro:</strong> Nombre, email, contraseña, número de teléfono.</li>
                            <li><strong>Datos de Perfil:</strong> Para profesionales, especialidad, matrícula, biografía. Para pacientes, historial médico (opcional y encriptado).</li>
                            <li><strong>Datos de Uso:</strong> Interacciones con la plataforma, logs, dispositivo y ubicación aproximada.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0A192F] mb-4">3. Uso de la Información</h2>
                        <p>Utilizamos sus datos para:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Proveer y mantener nuestros servicios.</li>
                            <li>Procesar turnos y pagos.</li>
                            <li>Verificar la identidad de los profesionales.</li>
                            <li>Mejorar la seguridad de la plataforma.</li>
                            <li>Comunicarnos con usted sobre actualizaciones o soporte.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0A192F] mb-4">4. Privacidad de Datos Médicos</h2>
                        <p>
                            Los datos médicos sensibles (historia clínica, archivos adjuntos) se almacenan de forma encriptada y solo son accesibles por usted y los profesionales con los que usted elija compartirlos. VORA no accede a esta información sin su consentimiento explícito.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0A192F] mb-4">5. Compartir Información</h2>
                        <p>
                            No vendemos sus datos personales. Solo compartimos información con:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Profesionales de la salud: para facilitar la atención médica.</li>
                            <li>Proveedores de servicios: procesadores de pago, hosting (bajo estrictos acuerdos de confidencialidad).</li>
                            <li>Autoridades legales: si es requerido por ley.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0A192F] mb-4">6. Sus Derechos</h2>
                        <p>
                            Usted tiene derecho a acceder, corregir, o eliminar su información personal. Puede gestionar la mayoría de sus datos desde su perfil o contactarnos para ejercer estos derechos.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0A192F] mb-4">7. Contacto</h2>
                        <p>
                            Para consultas sobre privacidad, contacte a nuestro Oficial de Protección de Datos en <a href="mailto:privacy@vora.health" className="text-[#00F5D4] hover:underline">privacy@vora.health</a>.
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
