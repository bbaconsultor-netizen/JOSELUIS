import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { formatDateTime } from "@/lib/utils";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const distrito = await prisma.distrito.findUnique({ where: { slug: params.slug } });
  if (!distrito) return {};
  return {
    title: distrito.nombre,
    description: distrito.introduccion,
  };
}

export default async function DistritoPage({ params }: { params: { slug: string } }) {
  const distrito = await prisma.distrito.findUnique({ where: { slug: params.slug } });
  if (!distrito || distrito.status !== "PUBLICADO") notFound();

  const eventos = await prisma.evento.findMany({
    where: { status: "PUBLICADO", fecha: { gte: new Date() } },
    orderBy: { fecha: "asc" },
  });

  return (
    <>
      <Section eyebrow="Territorio" title={distrito.nombre} description={distrito.introduccion} />

      <Section className="bg-slate-50">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="font-display text-lg font-semibold text-ink">Necesidades escuchadas</h2>
            <p className="mt-2 text-sm text-slate-600">{distrito.necesidades}</p>
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-ink">Prioridades a validar</h2>
            <p className="mt-2 text-sm text-slate-600">{distrito.prioridades}</p>
          </div>
        </div>
        <p className="mt-8 text-xs text-slate-400">Fecha de última revisión: {distrito.fechaRevision}</p>
      </Section>

      <Section eyebrow="Agenda local" title="Próximas actividades">
        {eventos.length === 0 ? (
          <p className="text-sm text-slate-500">No hay actividades programadas por el momento.</p>
        ) : (
          <ul className="space-y-3">
            {eventos.map((ev) => (
              <li key={ev.id} className="rounded-lg border border-slate-200 p-4">
                <p className="text-xs font-semibold uppercase text-primary-600">{formatDateTime(ev.fecha)}</p>
                <p className="mt-1 font-medium text-ink">{ev.titulo}</p>
                <p className="text-sm text-slate-600">{ev.lugar}</p>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-8">
          <Button href="/participa">Cuéntanos qué necesita tu distrito</Button>
        </div>
      </Section>
    </>
  );
}
