import { Header, Footer } from "@/components/layout";
import { Metadata } from "next";
import { Newspaper } from "lucide-react";

export const metadata: Metadata = {
    title: "Blog | VORA",
    description: "Novedades y artículos sobre salud en Tierra del Fuego.",
};

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Header />

            <main className="max-w-4xl mx-auto px-6 py-20 text-center">
                <div className="w-20 h-20 bg-[#F1F5F9] rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Newspaper className="w-10 h-10 text-[#94A3B8]" />
                </div>
                <h1 className="text-3xl font-bold text-[#0A192F] mb-4">Blog en Construcción</h1>
                <p className="text-[#64748B] mb-8 max-w-lg mx-auto">
                    Estamos preparando artículos interesantes sobre salud, prevención y novedades de nuestras giras médicas. ¡Volvé pronto!
                </p>
                <div className="inline-block px-4 py-2 bg-[#00F5D4]/10 text-[#00AA93] font-semibold rounded-lg text-sm">
                    Próximamente
                </div>
            </main>

            <Footer />
        </div>
    );
}
