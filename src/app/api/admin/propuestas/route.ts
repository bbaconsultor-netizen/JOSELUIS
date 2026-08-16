import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";
import { propuestaSchema } from "@/lib/validations";

export async function GET() {
  const check = await requireAdmin();
  if (!check.ok) return NextResponse.json({ error: check.error }, { status: check.status });

  const propuestas = await prisma.propuesta.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(propuestas);
}

export async function POST(request: NextRequest) {
  const check = await requireAdmin();
  if (!check.ok) return NextResponse.json({ error: check.error }, { status: check.status });

  const body = await request.json();
  const parsed = propuestaSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const propuesta = await prisma.propuesta.create({
    data: {
      ...parsed.data,
      publishedAt: parsed.data.status === "PUBLICADO" ? new Date() : null,
    },
  });
  return NextResponse.json(propuesta, { status: 201 });
}
