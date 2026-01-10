import { Header, Footer } from "@/components/layout";
import { Metadata } from "next";
import { Search, ChevronRight, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "Centro de Ayuda | VORA",
    description: "Preguntas frecuentes y soporte para VORA.",
};

const faqs = [
    {
        category: "Pacientes",
        color: "bg-blue-100 text-blue-600",
        questions: [
            "¿Cómo reservo un turno?",
            "¿Cuáles son los métodos de pago aceptados?",
            "¿Puedo cancelar mi turno?",
            "¿Cómo funciona la telemedicina en VORA?",
        ],
    },
    {
        category: "Profesionales",
        color: "bg-green-100 text-green-600",
        questions: [
            "¿Cómo verifico mi cuenta?",
            "¿Cómo creo una gira médica?",
            "¿Cuándo recibo los pagos de mis consultas?",
            "¿Cómo gestionar mi agenda?",
        ],
    },
    {
        category: "Cuenta y Seguridad",
        color: "bg-purple-100 text-purple-600",
        questions: [
            "Olvidé mi contraseña",
            "¿Cómo actualizo mi perfil?",
            "Privacidad de mis datos médicos",
            "Reportar un problema",
        ],
    },
];

export default function AyudaPage() {
    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Header />

            {/* Hero Search */}
            <section className="bg-[#0A192F] py-16 px-6 text-center">
                <h1 className="text-3xl font-bold text-white mb-4">¿Cómo podemos ayudarte?</h1>
                <div className="max-w-2xl mx-auto relative">
                    <input
                        type="text"
                        placeholder="Buscar en la ayuda (ej. pagos, turnos...)"
                        className="w-full h-14 pl-12 pr-4 rounded-xl border-none focus:ring-4 focus:ring-[#00F5D4]/30 text-[#0A192F] placeholder:text-gray-400 shadow-lg"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-3 gap-8">
                    {faqs.map((category, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 ${category.color}`}>
                                {category.category}
                            </span>
                            <ul className="space-y-4">
                                {category.questions.map((q, qIdx) => (
                                    <li key={qIdx}>
                                        <button className="flex items-center justify-between w-full text-left group">
                                            <span className="text-[#0A192F] group-hover:text-[#00F5D4] transition-colors font-medium text-sm">
                                                {q}
                                            </span>
                                            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#00F5D4] transition-colors" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                            <button className="mt-6 text-sm font-semibold text-[#64748B] hover:text-[#0A192F] flex items-center gap-1 transition-colors">
                                Ver todo <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Still need help? */}
                <div className="mt-16 text-center bg-white p-8 rounded-2xl border border-[#E2E8F0]">
                    <div className="w-12 h-12 bg-[#00F5D4]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <HelpCircle className="w-6 h-6 text-[#00F5D4]" />
                    </div>
                    <h2 className="text-xl font-bold text-[#0A192F] mb-2">¿No encontrás lo que buscás?</h2>
                    <p className="text-[#64748B] mb-6">Nuestro equipo de soporte está listo para responder tus dudas.</p>
                    <a href="/contacto" className="inline-flex h-10 items-center justify-center px-6 rounded-lg bg-[#0A192F] text-white font-semibold hover:bg-[#091527] transition-colors">
                        Contactar Soporte
                    </a>
                </div>
            </main>

            <Footer />
        </div>
    );
}
