import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const revalidate = 60;

const EJE_LABELS: Record<string, string> = {
  AGUA_SANEAMIENTO: "Agua y saneamiento",
  TRABAJO_ECONOMIA: "Trabajo y economía local",
  TURISMO: "Turismo",
  SEGURIDAD: "Seguridad ciudadana",
  TRANSPARENCIA: "Transparencia y gestión",
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const propuesta = await prisma.propuesta.findUnique({ where: { slug: params.slug } });
  if (!propuesta) return {};
  return { title: propuesta.titulo, description: propuesta.resumen };
}

export default async function PropuestaDetallePage({ params }: { params: { slug: string } }) {
  const propuesta = await prisma.propuesta.findUnique({ where: { slug: params.slug } });
  if (!propuesta || propuesta.status !== "PUBLICADO") notFound();

  const accionItems = propuesta.accion.split("\n").filter(Boolean);

  return (
    <Section>
      <article className="mx-auto max-w-2xl">
        <Badge>{EJE_LABELS[propuesta.eje]}</Badge>
        <h1 className="mt-3 font-display text-3xl font-bold text-ink">{propuesta.titulo}</h1>
        <p className="mt-3 text-lg text-slate-600">{propuesta.resumen}</p>

        {propuesta.imagen && (
          <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100">
            <Image src={propuesta.imagen} alt={propuesta.titulo} fill className="object-cover" />
            {propuesta.imagenIlustrativa && (
              <span className="absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white">
                Imagen ilustrativa
              </span>
            )}
          </div>
        )}

        <div className="mt-8 space-y-8">
          <div>
            <h2 className="font-display text-lg font-semibold text-ink">El problema</h2>
            <p className="mt-2 text-slate-600">{propuesta.problema}</p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-ink">Qué proponemos</h2>
            {accionItems.length > 1 ? (
              <ul className="mt-2 space-y-2">
                {accionItems.map((item, i) => (
                  <li key={i} className="flex gap-2 text-slate-600">
                    <span className="mt-0.5 text-primary-600">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-slate-600">{propuesta.accion}</p>
            )}
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-ink">Competencia institucional</h2>
            <p className="mt-2 text-slate-600">{propuesta.competencia}</p>
          </div>

          <div>
            <h2 className="font-display text-lg font-semibold text-ink">Etapas</h2>
            <p className="mt-2 text-slate-600">{propuesta.etapas}</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-500">
            <p>
              <span className="font-medium text-ink">Fuente:</span> {propuesta.fuente}
            </p>
            <p className="mt-1">
              <span className="font-medium text-ink">Responsable:</span> {propuesta.responsable}
            </p>
          </div>
        </div>

        <div className="mt-10">
          <Button href="/participa">Envía tu propuesta sobre este tema</Button>
        </div>
      </article>
    </Section>
  );
}
