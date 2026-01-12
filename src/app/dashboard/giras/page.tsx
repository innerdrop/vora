import { Suspense } from "react";
import { getDoctorGiras } from "@/lib/actions";
import { MisGirasClient } from "./mis-giras-client";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Mis Giras | VORA",
    description: "Gestioná tus viajes y disponibilidad profesional",
};

export default async function MisGirasPage() {
    // Fetch data directly in the server component
    const giras = await getDoctorGiras();

    return (
        <div className="max-w-6xl mx-auto">
            <Suspense fallback={<div>Cargando giras...</div>}>
                <MisGirasClient initialGiras={giras} />
            </Suspense>
        </div>
    );
}
