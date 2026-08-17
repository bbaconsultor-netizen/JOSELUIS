import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Section } from "@/components/ui/Section";
import { YoutubeEmbed } from "@/components/YoutubeEmbed";
import { formatDate } from "@/lib/utils";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Videos",
  description: "Videos de la campaña de José Luis Sandoval Luque en Nasca, Vista Alegre, Changuillo, El Ingenio y Marcona.",
};

export default async function VideosPage() {
  const videos = await prisma.video.findMany({
    where: { status: "PUBLICADO" },
    orderBy: [{ fecha: "desc" }, { createdAt: "desc" }],
  });

  return (
    <Section
      eyebrow="Videos"
      title="La campaña en video"
      description="Contenido del canal oficial de YouTube. El video se reproduce solo cuando lo eliges."
    >
      {videos.length === 0 ? (
        <p className="text-sm text-slate-500">Todavía no hay videos publicados.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v) => (
            <div key={v.id} className="flex flex-col">
              <YoutubeEmbed youtubeId={v.youtubeId} title={v.titulo} />
              <h3 className="mt-3 font-display text-base font-semibold text-ink">{v.titulo}</h3>
              {v.descripcion && <p className="mt-1 line-clamp-2 text-sm text-slate-600">{v.descripcion}</p>}
              <div className="mt-2 flex gap-2 text-xs text-slate-400">
                {v.distrito && <span>{v.distrito}</span>}
                {v.fecha && <span>{formatDate(v.fecha)}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
