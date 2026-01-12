import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata = {
    title: "Configuración | VORA",
};

export default function ConfiguracionPage() {
    return (
        <PlaceholderPage
            title="Configuración de la Plataforma"
            description="Ajustes globales, logs de auditoría y gestión de administradores."
            backHref="/admin"
        />
    );
}
