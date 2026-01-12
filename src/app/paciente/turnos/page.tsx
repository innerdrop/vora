import { getPatientAppointments } from "@/lib/actions";
import { MisTurnosClient } from "./mis-turnos-client";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Mis Turnos | VORA",
    description: "Gestioná tus próximos turnos médicos",
};

export default async function MisTurnosPage() {
    const appointments = await getPatientAppointments();

    return (
        <div className="max-w-4xl mx-auto">
            <MisTurnosClient initialAppointments={appointments} />
        </div>
    );
}
