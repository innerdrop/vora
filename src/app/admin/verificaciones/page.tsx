import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata = {
    title: "Verificaciones | VORA",
};

export default function VerificacionesPage() {
    return (
        <PlaceholderPage
            title="Verificaciones Pendientes"
            description="Listado completo de solicitudes de verificación para procesar."
            backHref="/admin"
        />
    );
}
