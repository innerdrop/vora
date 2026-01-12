import { GiraForm } from "../gira-form";

export const metadata = {
    title: "Nueva Gira | VORA",
    description: "Programá tu próximo viaje profesional",
};

export default function NuevaGiraPage() {
    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#0A192F]">Nueva Gira</h1>
                <p className="text-[#64748B]">
                    Completá los datos de tu próximo viaje para que los pacientes puedan reservar turnos.
                </p>
            </div>

            <GiraForm />
        </div>
    );
}
