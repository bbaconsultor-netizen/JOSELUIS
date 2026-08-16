import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { DistritoForm } from "@/components/admin/DistritoForm";

export default async function EditarDistritoPage({ params }: { params: { id: string } }) {
  const distrito = await prisma.distrito.findUnique({ where: { id: params.id } });
  if (!distrito) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Editar distrito</h1>
      <div className="mt-6">
        <DistritoForm
          id={distrito.id}
          initialData={{
            nombre: distrito.nombre,
            slug: distrito.slug,
            introduccion: distrito.introduccion,
            necesidades: distrito.necesidades,
            prioridades: distrito.prioridades,
            fotografia: distrito.fotografia || "",
            fechaRevision: distrito.fechaRevision,
            status: distrito.status,
          }}
        />
      </div>
    </div>
  );
}
