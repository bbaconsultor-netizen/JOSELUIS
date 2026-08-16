import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PropuestaForm } from "@/components/admin/PropuestaForm";

export default async function EditarPropuestaPage({ params }: { params: { id: string } }) {
  const propuesta = await prisma.propuesta.findUnique({ where: { id: params.id } });
  if (!propuesta) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Editar propuesta</h1>
      <div className="mt-6">
        <PropuestaForm
          id={propuesta.id}
          initialData={{
            titulo: propuesta.titulo,
            slug: propuesta.slug,
            eje: propuesta.eje,
            resumen: propuesta.resumen,
            problema: propuesta.problema,
            accion: propuesta.accion,
            competencia: propuesta.competencia,
            etapas: propuesta.etapas,
            fuente: propuesta.fuente,
            responsable: propuesta.responsable,
            imagen: propuesta.imagen || "",
            imagenIlustrativa: propuesta.imagenIlustrativa,
            status: propuesta.status,
          }}
        />
      </div>
    </div>
  );
}
