import { getAdminDashboardData } from "@/lib/actions";
import { AdminHomeClient } from "./admin-home-client";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
    const data = await getAdminDashboardData();

    if (!data) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <p className="text-[#64748B]">No tenés permiso para ver esta página o hubo un error.</p>
            </div>
        );
    }

    return <AdminHomeClient data={data} />;
}
