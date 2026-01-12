import { getProfessionalDashboardData } from "@/lib/actions";
import { DashboardHomeClient } from "./dashboard-home-client";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Dashboard Profesional | VORA",
    description: "Panel de control para profesionales de la salud",
};

import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const data = await getProfessionalDashboardData();

    if (!data) {
        redirect("/api/auth/signin");
    }

    return <DashboardHomeClient data={data} />;
}


