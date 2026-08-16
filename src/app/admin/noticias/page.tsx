import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DataTable } from "@/components/admin/DataTable";

export default async function AdminNoticiasPage() {
  const noticias = await prisma.noticia.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-ink">Noticias</h1>
        <Link
          href="/admin/noticias/nuevo"
          className="rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
        >
          Nueva noticia
        </Link>
      </div>

      <div className="mt-6">
        <DataTable
          items={noticias.map((n) => ({
            id: n.id,
            title: n.titular,
            status: n.status,
            category: n.distrito,
            createdAt: n.createdAt,
          }))}
          basePath="/admin/noticias"
          deleteEndpoint="/api/admin/noticias"
        />
      </div>
    </div>
  );
}
