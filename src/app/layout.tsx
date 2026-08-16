import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "José Luis Sandoval Luque | Alcaldía Provincial de Nasca 2026",
    template: "%s | José Luis Sandoval Luque",
  },
  description:
    "Conoce a José Luis Sandoval Luque y sus propuestas para el agua, el trabajo, el turismo, la seguridad y la transparencia en la provincia de Nasca.",
  openGraph: {
    title: "José Luis Sandoval Luque | Alcaldía Provincial de Nasca 2026",
    description:
      "Conoce a José Luis Sandoval Luque y sus propuestas para el agua, el trabajo, el turismo, la seguridad y la transparencia en la provincia de Nasca.",
    url: SITE_URL,
    siteName: "José Luis Sandoval Luque",
    locale: "es_PE",
    type: "website",
    images: [{ url: "/images/og-campana.webp", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${sora.variable} font-sans antialiased text-ink`}>
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>
        <Navbar />
        <main id="contenido">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
