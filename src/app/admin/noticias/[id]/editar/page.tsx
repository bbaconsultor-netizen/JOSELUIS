import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { NoticiaForm } from "@/components/admin/NoticiaForm";

export default async function EditarNoticiaPage({ params }: { params: { id: string } }) {
  const noticia = await prisma.noticia.findUnique({ where: { id: params.id } });
  if (!noticia) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Editar noticia</h1>
      <div className="mt-6">
        <NoticiaForm
          id={noticia.id}
          initialData={{
            titular: noticia.titular,
            slug: noticia.slug,
            bajada: noticia.bajada,
            cuerpo: noticia.cuerpo,
            distrito: noticia.distrito || "",
            autor: noticia.autor,
            foto: noticia.foto || "",
            pieDeFoto: noticia.pieDeFoto || "",
            status: noticia.status,
          }}
        />
      </div>
    </div>
  );
}
