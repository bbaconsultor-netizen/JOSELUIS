import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validations";
import { sendContactNotification } from "@/lib/resend";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const lead = await prisma.contactLead.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      distrito: parsed.data.distrito,
      tipo: parsed.data.tipo,
      message: parsed.data.message,
    },
  });

  try {
    await sendContactNotification(parsed.data);
  } catch (error) {
    console.error("No se pudo enviar el correo de notificación:", error);
  }

  return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
}
