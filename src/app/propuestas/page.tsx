import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { ejes } from "@/data/perfil";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Propuestas",
  description:
    "Propuestas de José Luis Sandoval Luque para el agua y saneamiento, trabajo, turismo, seguridad y transparencia en Nasca.",
};

const EJE_KEY_MAP: Record<string, string> = {
  "agua-saneamiento": "AGUA_SANEAMIENTO",
  "trabajo-economia": "TRABAJO_ECONOMIA",
  turismo: "TURISMO",
  seguridad: "SEGURIDAD",
  transparencia: "TRANSPARENCIA",
};

export default async function PropuestasPage() {
  const propuestas = await prisma.propuesta.findMany({
    where: { status: "PUBLICADO" },
    orderBy: { titulo: "asc" },
  });

  return (
    <>
      <Section
        eyebrow="Propuestas"
        title="Compromisos claros, competencias claras"
        description="Cada propuesta distingue el problema, la acción, la competencia institucional y la fuente."
      />

      {ejes.map((eje) => {
        const items = propuestas.filter((p) => p.eje === EJE_KEY_MAP[eje.slug]);
        return (
          <Section key={eje.slug} className="border-t border-slate-100">
            <div id={eje.slug} className="scroll-mt-24">
              <h2 className="font-display text-2xl font-bold text-ink">{eje.nombre}</h2>
              <p className="mt-2 max-w-2xl text-slate-600">{eje.resumen}</p>

              {items.length === 0 ? (
                <p className="mt-6 text-sm text-slate-500">
                  Las propuestas de este eje están en revisión y se publicarán con fuente y responsable
                  confirmados.
                </p>
              ) : (
                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((p) => (
                    <div key={p.id} className="flex flex-col rounded-xl border border-slate-200 bg-white p-5">
                      <Badge className="w-fit">{p.competencia}</Badge>
                      <h3 className="mt-3 font-display text-base font-semibold text-ink">{p.titulo}</h3>
                      <p className="mt-2 line-clamp-3 flex-1 text-sm text-slate-600">{p.resumen}</p>
                      <p className="mt-3 text-xs text-slate-400">Etapas: {p.etapas}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Section>
        );
      })}
    </>
  );
}
