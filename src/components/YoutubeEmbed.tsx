"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

// Portada estática + reproducción bajo demanda: no carga el iframe de
// YouTube (ni sus scripts) hasta que el usuario hace clic, evitando video
// automático pesado — requisito de rendimiento del brief.
export function YoutubeEmbed({ youtubeId, title }: { youtubeId: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative aspect-video w-full overflow-hidden rounded-xl bg-black"
      aria-label={`Reproducir: ${title}`}
    >
      <Image
        src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
        alt={title}
        fill
        className="object-cover opacity-90 transition-opacity group-hover:opacity-100"
        unoptimized
      />
      <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-500 text-white shadow-lg transition-transform group-hover:scale-110">
          <Play className="h-7 w-7 translate-x-0.5" fill="currentColor" />
        </span>
      </span>
    </button>
  );
}
