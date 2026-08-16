import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Section } from "@/components/ui/Section";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Territorio",
  description: "Presencia equilibrada en los cinco distritos de la provincia de Nasca.",
};

export default async function TerritorioPage() {
  const distritos = await prisma.distrito.findMany({
    where: { status: "PUBLICADO" },
    orderBy: { nombre: "asc" },
  });

  return (
    <Section
      eyebrow="Territorio"
      title="Cinco distritos, una sola provincia"
      description="Nasca, Vista Alegre, Changuillo, El Ingenio y Marcona. Las prioridades de cada distrito son hipótesis de trabajo que se validan con reuniones, actas y datos públicos antes de presentarse como prioridad oficial."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {distritos.map((d) => (
          <Link
            key={d.slug}
            href={`/territorio/${d.slug}`}
            className="rounded-xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md"
          >
            <h2 className="font-display text-xl font-semibold text-ink">{d.nombre}</h2>
            <p className="mt-2 text-sm text-slate-600">{d.introduccion}</p>
            <span className="mt-4 block text-sm font-semibold text-primary-700">Ver mi distrito →</span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
