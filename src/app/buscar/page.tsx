import { getProfessionals, getSpecialties } from "@/lib/actions";
import { BuscarClient } from "./client";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Buscar Profesionales",
    description: "Encontrá especialistas verificados que viajan a Ushuaia y Tierra del Fuego",
};

export default async function BuscarPage() {
    const [professionals, specialties] = await Promise.all([
        getProfessionals({ limit: 50 }),
        getSpecialties(),
    ]);

    const specialtyOptions = [
        { id: "all", name: "all", displayName: "Todas las especialidades" },
        ...specialties,
    ];

    return (
        <BuscarClient
            initialProfessionals={professionals}
            specialties={specialtyOptions}
        />
    );
}
