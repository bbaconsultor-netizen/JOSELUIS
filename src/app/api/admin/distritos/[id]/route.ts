import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";
import { distritoSchema } from "@/lib/validations";

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  const check = await requireAdmin();
  if (!check.ok) return NextResponse.json({ error: check.error }, { status: check.status });

  const distrito = await prisma.distrito.findUnique({ where: { id: params.id } });
  if (!distrito) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  return NextResponse.json(distrito);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const check = await requireAdmin();
  if (!check.ok) return NextResponse.json({ error: check.error }, { status: check.status });

  const body = await request.json();
  const parsed = distritoSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const existing = await prisma.distrito.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json({ error: "No encontrado" }, { status: 404 });

  const distrito = await prisma.distrito.update({ where: { id: params.id }, data: parsed.data });
  return NextResponse.json(distrito);
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  const check = await requireAdmin();
  if (!check.ok) return NextResponse.json({ error: check.error }, { status: check.status });

  await prisma.distrito.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
