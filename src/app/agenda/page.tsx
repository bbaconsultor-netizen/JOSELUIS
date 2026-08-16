import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Section } from "@/components/ui/Section";
import { formatDateTime } from "@/lib/utils";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Agenda",
  description: "Actividades públicas de la campaña de José Luis Sandoval Luque en la provincia de Nasca.",
};

export default async function AgendaPage() {
  const eventos = await prisma.evento.findMany({
    where: { status: "PUBLICADO", fecha: { gte: new Date() } },
    orderBy: { fecha: "asc" },
  });

  return (
    <Section
      eyebrow="Agenda"
      title="Próximas actividades"
      description="Solo se muestran actividades futuras. Los eventos vencidos se retiran automáticamente de esta página."
    >
      {eventos.length === 0 ? (
        <p className="text-sm text-slate-500">
          Todavía no hay actividades programadas. Esta agenda se actualiza semanalmente.
        </p>
      ) : (
        <div className="space-y-4">
          {eventos.map((ev) => (
            <div key={ev.id} className="rounded-xl border border-slate-200 bg-white p-6">
              <p className="text-sm font-semibold uppercase text-primary-600">{formatDateTime(ev.fecha)}</p>
              <h2 className="mt-1 font-display text-lg font-semibold text-ink">{ev.titulo}</h2>
              <p className="mt-1 text-sm text-slate-600">{ev.lugar}</p>
              {ev.referencia && <p className="mt-1 text-sm text-slate-500">{ev.referencia}</p>}
              <div className="mt-3 flex flex-wrap gap-4 text-sm">
                {ev.mapaUrl && (
                  <a href={ev.mapaUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary-700 hover:underline">
                    Ver mapa →
                  </a>
                )}
                {ev.contacto && <span className="text-slate-500">Contacto: {ev.contacto}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
