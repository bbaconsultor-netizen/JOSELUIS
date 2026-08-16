import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/ContactForm";
import { pendientes } from "@/data/perfil";

export const metadata: Metadata = {
  title: "Participa",
  description: "Envía tu propuesta, súmate como voluntario o contáctate con la campaña de José Luis Sandoval Luque.",
};

export default function ParticipaPage() {
  return (
    <Section
      eyebrow="Participa"
      title="Sigue la campaña y cuéntanos qué necesita tu distrito"
      description="Formulario mínimo: solo pedimos lo necesario para responder tu mensaje."
    >
      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ContactForm />
        </div>

        <aside className="space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="font-display text-base font-semibold text-ink">Canales oficiales</h2>
            <dl className="mt-3 space-y-2 text-sm text-slate-600">
              <div>
                <dt className="font-medium text-ink">WhatsApp</dt>
                <dd>{pendientes.whatsapp}</dd>
              </div>
              <div>
                <dt className="font-medium text-ink">Correo</dt>
                <dd>{pendientes.correoContacto}</dd>
              </div>
              <div>
                <dt className="font-medium text-ink">Facebook / Instagram / TikTok / YouTube</dt>
                <dd>
                  {pendientes.redes.facebook} · {pendientes.redes.instagram} · {pendientes.redes.tiktok} ·{" "}
                  {pendientes.redes.youtube}
                </dd>
              </div>
            </dl>
            <p className="mt-3 text-xs text-slate-400">
              Estos canales se publicarán apenas el equipo de campaña los confirme por escrito.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="font-display text-base font-semibold text-ink">Privacidad</h2>
            <p className="mt-2 text-sm text-slate-600">
              Solo recogemos nombre, distrito, medio de contacto y mensaje. No solicitamos DNI ni datos
              sensibles.{" "}
              <a href="/transparencia#privacidad" className="font-semibold text-primary-700 hover:underline">
                Ver política completa →
              </a>
            </p>
          </div>
        </aside>
      </div>
    </Section>
  );
}
