import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata = {
    title: "Documentos | VORA",
};

export default function DocumentosPage() {
    return (
        <PlaceholderPage
            title="Mis Documentos"
            description="Aquí encontrarás tus recetas médicas, órdenes de estudio y resultados de laboratorio."
            backHref="/paciente"
        />
    );
}
