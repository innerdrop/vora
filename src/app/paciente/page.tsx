import { getPatientDashboardData } from "@/lib/actions";
import { PatientHomeClient } from "./patient-home-client";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Mi Salud | VORA",
    description: "Panel de paciente",
};

export default async function PatientDashboardPage() {
    const data = await getPatientDashboardData();

    return <PatientHomeClient data={data} />;
}
