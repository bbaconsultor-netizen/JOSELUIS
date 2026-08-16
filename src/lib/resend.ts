import { Resend } from "resend";
import type { ContactInput } from "@/lib/validations";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendContactNotification(lead: ContactInput) {
  if (!resend) {
    console.warn("RESEND_API_KEY no configurada; se omite el envío de correo.");
    return;
  }

  await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev",
    to: process.env.CONTACT_TO_EMAIL || "",
    subject: `Nuevo mensaje desde la web — ${lead.name}`,
    html: `
      <p><strong>${lead.name}</strong> (${lead.email}) escribió desde el formulario de Participa.</p>
      ${lead.distrito ? `<p>Distrito: ${lead.distrito}</p>` : ""}
      ${lead.phone ? `<p>Teléfono: ${lead.phone}</p>` : ""}
      <p>Tipo: ${lead.tipo}</p>
      <p>${lead.message}</p>
    `,
  });
}
