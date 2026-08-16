import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { faqs, planAguaComponentes, planAguaResumen } from "@/data/perfil";

export const metadata: Metadata = {
  title: "Plan Agua para Nasca",
  description:
    "Conoce la propuesta por etapas para mejorar el abastecimiento, el saneamiento, la gestión de proyectos y la transparencia del servicio de agua en Nasca.",
};

export default function PlanAguaPage() {
  return (
    <>
      <Section eyebrow="Eje prioritario" title="Plan Agua para Nasca" description={planAguaResumen} />

      <Section eyebrow="Componentes del plan" title="Diagnóstico, obras y coordinación institucional" className="bg-slate-50">
        <div className="space-y-4">
          {planAguaComponentes.map((c) => (
            <div key={c.componente} className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-display text-base font-semibold text-ink">{c.componente}</h3>
              <p className="mt-2 text-sm text-slate-600">{c.texto}</p>
              <p className="mt-2 text-xs font-medium text-primary-700">{c.condicion}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-sm text-slate-500">
          Lenguaje obligatorio: se usa &ldquo;gestionar&rdquo;, &ldquo;coordinar&rdquo;, &ldquo;evaluar&rdquo;,
          &ldquo;cofinanciar&rdquo; o &ldquo;ejecutar&rdquo; según la competencia real. Ningún proyecto sin
          expediente, presupuesto o autorización se presenta como obra asegurada.
        </p>
      </Section>

      <Section eyebrow="Agricultura" title="Agua para el campo nasqueño">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-slate-100">
            <Image
              src="/images/propuestas/agricultores-grupo.webp"
              alt="José Luis Sandoval con agricultores de Nasca (imagen ilustrativa)"
              fill
              className="object-cover"
            />
            <span className="absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white">
              Imagen ilustrativa
            </span>
          </div>
          <div>
            <p className="text-lg text-slate-700">
              Una mesa técnica provincial para gestionar cofinanciamiento de riego tecnificado, y una
              evaluación de electrificación solar de pozos para reducir costos operativos: dos líneas de
              trabajo del Plan Agua enfocadas en la agricultura de los cinco distritos.
            </p>
            <div className="mt-6">
              <Button href="/propuestas#agua-saneamiento" variant="outline">
                Ver estas propuestas en detalle
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section eyebrow="Preguntas frecuentes" title="Lo que debes saber sobre el agua en Nasca">
        <div className="divide-y divide-slate-200 rounded-xl border border-slate-200">
          {faqs.slice(0, 3).map((f) => (
            <details key={f.pregunta} className="group p-5">
              <summary className="cursor-pointer list-none font-medium text-ink">{f.pregunta}</summary>
              <p className="mt-2 text-sm text-slate-600">{f.respuesta}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section className="bg-ink" align="center">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-2xl font-bold text-white">Envía tu propuesta sobre el agua</h2>
          <p className="mt-3 text-slate-300">
            Cuéntanos qué necesita tu distrito. Toda propuesta pública se revisa con fuente, responsable y
            fecha antes de publicarse.
          </p>
          <div className="mt-6">
            <Button href="/participa">Envía tu propuesta</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
