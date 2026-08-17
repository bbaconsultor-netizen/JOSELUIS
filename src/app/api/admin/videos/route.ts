import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";
import { videoSchema } from "@/lib/validations";
import { extractYoutubeId } from "@/lib/utils";

export async function GET() {
  const check = await requireAdmin();
  if (!check.ok) return NextResponse.json({ error: check.error }, { status: check.status });

  const videos = await prisma.video.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(videos);
}

export async function POST(request: NextRequest) {
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

  const video = await prisma.video.create({
    data: {
      titulo: parsed.data.titulo,
      youtubeId,
      descripcion: parsed.data.descripcion,
      distrito: parsed.data.distrito,
      status: parsed.data.status,
      fecha: parsed.data.fecha ? new Date(parsed.data.fecha) : null,
      publishedAt: parsed.data.status === "PUBLICADO" ? new Date() : null,
    },
  });
  return NextResponse.json(video, { status: 201 });
}
