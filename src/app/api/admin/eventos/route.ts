import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";
import { eventoSchema } from "@/lib/validations";

export async function GET() {
  const check = await requireAdmin();
  if (!check.ok) return NextResponse.json({ error: check.error }, { status: check.status });

  const eventos = await prisma.evento.findMany({ orderBy: { fecha: "desc" } });
  return NextResponse.json(eventos);
}

export async function POST(request: NextRequest) {
  const check = await requireAdmin();
  if (!check.ok) return NextResponse.json({ error: check.error }, { status: check.status });

  const body = await request.json();
  const parsed = eventoSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const evento = await prisma.evento.create({
    data: { ...parsed.data, fecha: new Date(parsed.data.fecha) },
  });
  return NextResponse.json(evento, { status: 201 });
}
