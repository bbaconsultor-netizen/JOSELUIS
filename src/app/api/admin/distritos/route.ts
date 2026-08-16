import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";
import { distritoSchema } from "@/lib/validations";

export async function GET() {
  const check = await requireAdmin();
  if (!check.ok) return NextResponse.json({ error: check.error }, { status: check.status });

  const distritos = await prisma.distrito.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(distritos);
}

export async function POST(request: NextRequest) {
  const check = await requireAdmin();
  if (!check.ok) return NextResponse.json({ error: check.error }, { status: check.status });

  const body = await request.json();
  const parsed = distritoSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const distrito = await prisma.distrito.create({ data: parsed.data });
  return NextResponse.json(distrito, { status: 201 });
}
