import { PatientShell } from "@/components/dashboard/PatientShell";

export const metadata = {
    title: "Mi Salud | VORA",
    description: "Gestioná tu historia clínica y turnos",
};

export default function PatientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <PatientShell>{children}</PatientShell>;
}
