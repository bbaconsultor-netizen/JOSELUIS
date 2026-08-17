import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DataTable } from "@/components/admin/DataTable";

export default async function AdminVideosPage() {
  const videos = await prisma.video.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-ink">Videos</h1>
        <Link
          href="/admin/videos/nuevo"
          className="rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
        >
          Agregar video
        </Link>
      </div>

      <div className="mt-6">
        <DataTable
          items={videos.map((v) => ({
            id: v.id,
            title: v.titulo,
            status: v.status,
            category: v.distrito,
            createdAt: v.createdAt,
          }))}
          basePath="/admin/videos"
          deleteEndpoint="/api/admin/videos"
        />
      </div>
    </div>
  );
}
