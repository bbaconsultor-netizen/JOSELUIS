import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { EventoForm } from "@/components/admin/EventoForm";

function toDatetimeLocal(date: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}`;
}

export default async function EditarEventoPage({ params }: { params: { id: string } }) {
  const evento = await prisma.evento.findUnique({ where: { id: params.id } });
  if (!evento) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Editar actividad</h1>
      <div className="mt-6">
        <EventoForm
          id={evento.id}
          initialData={{
            titulo: evento.titulo,
            fecha: toDatetimeLocal(evento.fecha),
            lugar: evento.lugar,
            referencia: evento.referencia || "",
            mapaUrl: evento.mapaUrl || "",
            contacto: evento.contacto || "",
            status: evento.status,
          }}
        />
      </div>
    </div>
  );
}
