import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Noticias",
  description: "Registro del trabajo territorial de la campaña de José Luis Sandoval Luque.",
};

export default async function NoticiasPage() {
  const noticias = await prisma.noticia.findMany({
    where: { status: "PUBLICADO" },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <Section eyebrow="Noticias" title="Trabajo territorial">
      {noticias.length === 0 ? (
        <p className="text-sm text-slate-500">Todavía no hay noticias publicadas.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {noticias.map((n) => (
            <Card
              key={n.id}
              href={`/noticias/${n.slug}`}
              title={n.titular}
              excerpt={n.bajada}
              category={n.distrito}
              coverImage={n.foto}
              date={n.publishedAt}
              cta="Compartir"
            />
          ))}
        </div>
      )}
    </Section>
  );
}
