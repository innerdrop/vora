import { Construction } from "lucide-react";
import Link from "next/link";
import { headers } from "next/headers";

export default function PlaceholderPage({ title, description, backHref = "/dashboard" }: { title: string, description?: string, backHref?: string }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
            <div className="w-20 h-20 bg-[#F8FAFC] rounded-3xl flex items-center justify-center mb-6 border border-[#E2E8F0]">
                <Construction className="w-10 h-10 text-[#64748B]" />
            </div>
            <h1 className="text-3xl font-bold text-[#0A192F] mb-3">{title}</h1>
            <p className="text-[#64748B] mb-8 max-w-md">
                {description || "Estamos trabajando en esta funcionalidad. ¡Pronto estará disponible!"}
            </p>
            <Link
                href={backHref}
                className="px-6 py-3 bg-[#0A192F] text-white font-semibold rounded-xl hover:bg-[#091527] transition-colors"
            >
                Volver al inicio
            </Link>
        </div>
    );
}
