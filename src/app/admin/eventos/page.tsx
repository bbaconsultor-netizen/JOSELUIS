import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DataTable } from "@/components/admin/DataTable";

export default async function AdminEventosPage() {
  const eventos = await prisma.evento.findMany({ orderBy: { fecha: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-ink">Agenda</h1>
        <Link
          href="/admin/eventos/nuevo"
          className="rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
        >
          Nueva actividad
        </Link>
      </div>

      <div className="mt-6">
        <DataTable
          items={eventos.map((e) => ({
            id: e.id,
            title: e.titulo,
            status: e.status,
            category: e.lugar,
            createdAt: e.fecha,
          }))}
          basePath="/admin/eventos"
          deleteEndpoint="/api/admin/eventos"
        />
      </div>
    </div>
  );
}
