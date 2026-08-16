import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { biografias, candidato, experiencia, mensaje } from "@/data/perfil";

export const metadata: Metadata = {
  title: "Quién es José Luis Sandoval Luque | Biografía y experiencia",
  description:
    "Conoce a José Luis Sandoval Luque: abogado, nasqueño, y su experiencia jurídica pública y privada al servicio de la provincia de Nasca.",
};

export default function JoseLuisPage() {
  return (
    <>
      <Section eyebrow="Conoce a José Luis" title="Una nueva generación para Nasca">
        <p className="max-w-2xl text-lg text-slate-700">{biografias.extendida}</p>
      </Section>

      <Section eyebrow="Trayectoria" title="Experiencia" className="bg-slate-50">
        <div className="space-y-6">
          {experiencia.map((exp) => (
            <div key={exp.periodo} className="flex flex-col gap-1 border-l-2 border-primary-500 pl-4 sm:flex-row sm:gap-6">
              <span className="w-28 shrink-0 text-sm font-semibold text-primary-700">{exp.periodo}</span>
              <div>
                <p className="font-medium text-ink">{exp.titulo}</p>
                <p className="text-sm text-slate-600">{exp.texto}</p>
                <p className="mt-1 text-xs text-slate-400">{exp.estado}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-slate-500">
          Descripción precisa: se usa &ldquo;asistente legal&rdquo; para la experiencia municipal — no se
          presenta como gerente, asesor principal, funcionario decisor ni responsable de la gestión.
        </p>
      </Section>

      <Section eyebrow="Vínculo con Nasca" title="Principios">
        <blockquote className="max-w-2xl border-l-4 border-primary-500 pl-6 text-lg italic text-slate-700">
          {mensaje.presentacion}
        </blockquote>
      </Section>

      <Section className="bg-ink" align="center">
        <div className="mx-auto max-w-xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary-400">
            {candidato.organizacionPolitica}
          </p>
          <h2 className="font-display text-2xl font-bold text-white">
            Verifica el estado vigente de la candidatura en el JNE
          </h2>
          <p className="mt-3 text-slate-300">
            La identidad de la candidatura y el número de lista deben revalidarse en las fuentes oficiales
            al momento de la consulta.
          </p>
          <div className="mt-6">
            <Button href="/transparencia" variant="outline" className="bg-transparent border-white text-white hover:border-primary-400 hover:text-primary-300">
              Ver propuestas
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
