import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { AuthProvider } from "@/components/providers/auth-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "VORA - Medicine Beyond Distance",
    template: "%s | VORA",
  },
  description:
    "Conectamos profesionales de la salud itinerantes con pacientes en Ushuaia y Tierra del Fuego. Encontrá especialistas verificados que viajan al fin del mundo.",
  keywords: [
    "medicina",
    "Ushuaia",
    "Tierra del Fuego",
    "especialistas",
    "turnos médicos",
    "profesionales de la salud",
    "telemedicina",
    "giras médicas",
  ],
  authors: [{ name: "VORA Health" }],
  creator: "VORA Health",
  publisher: "VORA Health",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://vora.health",
    siteName: "VORA",
    title: "VORA - Medicine Beyond Distance",
    description:
      "Conectamos profesionales de la salud con pacientes en el fin del mundo",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VORA - Healthcare Nomad Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VORA - Medicine Beyond Distance",
    description:
      "Conectamos profesionales de la salud con pacientes en el fin del mundo",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0A192F" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${inter.variable} ${plusJakarta.variable} font-sans antialiased`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

