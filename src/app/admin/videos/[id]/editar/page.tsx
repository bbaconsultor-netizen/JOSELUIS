import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { VideoForm } from "@/components/admin/VideoForm";

export default async function EditarVideoPage({ params }: { params: { id: string } }) {
  const video = await prisma.video.findUnique({ where: { id: params.id } });
  if (!video) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Editar video</h1>
      <div className="mt-6">
        <VideoForm
          id={video.id}
          initialData={{
            titulo: video.titulo,
            youtubeUrl: `https://www.youtube.com/watch?v=${video.youtubeId}`,
            descripcion: video.descripcion || "",
            distrito: video.distrito || "",
            fecha: video.fecha ? video.fecha.toISOString().slice(0, 10) : "",
            status: video.status,
          }}
        />
      </div>
    </div>
  );
}
