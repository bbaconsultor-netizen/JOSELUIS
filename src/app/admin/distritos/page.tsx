import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DataTable } from "@/components/admin/DataTable";

export default async function AdminDistritosPage() {
  const distritos = await prisma.distrito.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-ink">Distritos</h1>
        <Link
          href="/admin/distritos/nuevo"
          className="rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
        >
          Nuevo distrito
        </Link>
      </div>

      <div className="mt-6">
        <DataTable
          items={distritos.map((d) => ({
            id: d.id,
            title: d.nombre,
            status: d.status,
            category: null,
            createdAt: d.createdAt,
          }))}
          basePath="/admin/distritos"
          deleteEndpoint="/api/admin/distritos"
        />
      </div>
    </div>
  );
}
