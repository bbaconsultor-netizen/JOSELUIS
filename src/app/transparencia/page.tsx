import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { fuentes } from "@/data/perfil";

export const metadata: Metadata = {
  title: "Transparencia",
  description: "Fuentes, documentos públicos, correcciones, política de datos y contacto editorial.",
};

export default function TransparenciaPage() {
  return (
    <>
      <Section
        eyebrow="Transparencia"
        title="Fuentes y documentos"
        description="Toda cifra, antecedente o estado electoral publicado en este sitio tiene una fuente verificable."
      >
        <div className="space-y-4">
          {fuentes.map((f) => (
            <div key={f.titulo} className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase text-primary-600">{f.entidad}</p>
              <h3 className="mt-1 font-display text-base font-semibold text-ink">{f.titulo}</h3>
              <p className="mt-2 text-sm text-slate-600">{f.detalle}</p>
              <p className="mt-2 text-xs text-slate-400">Vigencia: {f.vigencia}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <a
            href="https://www.onpe.gob.pe"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary-700 hover:underline"
          >
            ONPE — Elecciones Regionales y Municipales 2026 →
          </a>
          <a
            href="https://www.jne.gob.pe"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary-700 hover:underline"
          >
            JNE — portal y reglamentos ERM 2026 →
          </a>
        </div>
      </Section>

      <Section className="bg-slate-50">
        <div id="privacidad" className="scroll-mt-24">
          <h2 className="font-display text-2xl font-bold text-ink">Política de datos</h2>
          <div className="mt-4 max-w-2xl space-y-3 text-sm text-slate-600">
            <p>
              Este sitio recoge únicamente nombre, distrito, medio de contacto y mensaje cuando son
              necesarios para responder una consulta o registrar una propuesta ciudadana.
            </p>
            <p>
              No se solicita DNI, orientación política, datos de salud ni otra información sensible en los
              formularios generales del sitio.
            </p>
            <p>
              Finalidad: atender consultas, propuestas y solicitudes de voluntariado de la campaña.
              Responsable: equipo de coordinación de la campaña de José Luis Sandoval Luque. Periodo de
              conservación: durante el proceso electoral 2026 y su cierre administrativo.
            </p>
            <p>
              Para ejercer tus derechos sobre tus datos personales, escribe al correo de contacto que se
              publicará una vez confirmado por el equipo (ver aviso en la página Participa).
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <h2 className="font-display text-xl font-bold text-ink">Correcciones y contacto editorial</h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-600">
          Si detectas un error en este sitio, escríbenos desde la página{" "}
          <a href="/participa" className="font-semibold text-primary-700 hover:underline">
            Participa
          </a>{" "}
          seleccionando el motivo &ldquo;Consulta de prensa&rdquo;. Todo contenido pasa por revisión
          editorial antes de publicarse.
        </p>
      </Section>
    </>
  );
}
