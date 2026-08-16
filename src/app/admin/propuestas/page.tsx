import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DataTable } from "@/components/admin/DataTable";

export default async function AdminPropuestasPage() {
  const propuestas = await prisma.propuesta.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-ink">Propuestas</h1>
        <Link
          href="/admin/propuestas/nuevo"
          className="rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
        >
          Nueva propuesta
        </Link>
      </div>

      <div className="mt-6">
        <DataTable
          items={propuestas.map((p) => ({
            id: p.id,
            title: p.titulo,
            status: p.status,
            category: p.eje.replace("_", " "),
            createdAt: p.createdAt,
          }))}
          basePath="/admin/propuestas"
          deleteEndpoint="/api/admin/propuestas"
        />
      </div>
    </div>
  );
}
