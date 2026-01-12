import { AdminShell } from "@/components/dashboard/AdminShell";

export const metadata = {
    title: "Admin Panel | VORA",
    description: "Gestión de plataforma VORA",
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <AdminShell>{children}</AdminShell>;
}
