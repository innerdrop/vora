import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata = {
    title: "CMS | VORA",
};

export default function CMSPage() {
    return (
        <PlaceholderPage
            title="Gestor de Contenidos (CMS)"
            description="Edición de textos legales, páginas públicas y artículos del blog."
            backHref="/admin"
        />
    );
}
