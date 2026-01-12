import PlaceholderPage from "@/components/PlaceholderPage";

export const metadata = {
    title: "Favoritos | VORA",
};

export default function FavoritosPage() {
    return (
        <PlaceholderPage
            title="Profesionales Favoritos"
            description="Guardá a tus médicos de confianza para agendar turnos más rápido."
            backHref="/paciente"
        />
    );
}
