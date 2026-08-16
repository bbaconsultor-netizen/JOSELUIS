import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";
import { noticiaSchema } from "@/lib/validations";

export async function GET() {
  const check = await requireAdmin();
  if (!check.ok) return NextResponse.json({ error: check.error }, { status: check.status });

  const noticias = await prisma.noticia.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(noticias);
}

export async function POST(request: NextRequest) {
  const check = await requireAdmin();
  if (!check.ok) return NextResponse.json({ error: check.error }, { status: check.status });

  const body = await request.json();
  const parsed = noticiaSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const noticia = await prisma.noticia.create({
    data: {
      ...parsed.data,
      publishedAt: parsed.data.status === "PUBLICADO" ? new Date() : null,
    },
  });
  return NextResponse.json(noticia, { status: 201 });
}
