import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";
import { videoSchema } from "@/lib/validations";
import { extractYoutubeId } from "@/lib/utils";

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  const check = await requireAdmin();
  if (!check.ok) return NextResponse.json({ error: check.error }, { status: check.status });

  const video = await prisma.video.findUnique({ where: { id: params.id } });
  if (!video) return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  return NextResponse.json(video);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const check = await requireAdmin();
  if (!check.ok) return NextResponse.json({ error: check.error }, { status: check.status });

  const body = await request.json();
  const parsed = videoSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const youtubeId = extractYoutubeId(parsed.data.youtubeUrl);
  if (!youtubeId) {
    return NextResponse.json({ error: "No se pudo reconocer el link de YouTube" }, { status: 400 });
  }

  const existing = await prisma.video.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json({ error: "No encontrado" }, { status: 404 });

  const video = await prisma.video.update({
    where: { id: params.id },
    data: {
      titulo: parsed.data.titulo,
      youtubeId,
      descripcion: parsed.data.descripcion,
      distrito: parsed.data.distrito,
      status: parsed.data.status,
      fecha: parsed.data.fecha ? new Date(parsed.data.fecha) : null,
      publishedAt: parsed.data.status === "PUBLICADO" ? existing.publishedAt || new Date() : existing.publishedAt,
    },
  });
  return NextResponse.json(video);
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  const check = await requireAdmin();
  if (!check.ok) return NextResponse.json({ error: check.error }, { status: check.status });

  await prisma.video.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
