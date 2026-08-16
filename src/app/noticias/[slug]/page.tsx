import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { prisma } from "@/lib/prisma";
import { Section } from "@/components/ui/Section";
import { formatDate } from "@/lib/utils";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const noticia = await prisma.noticia.findUnique({ where: { slug: params.slug } });
  if (!noticia) return {};
  return {
    title: noticia.titular,
    description: noticia.bajada,
  };
}

export default async function NoticiaPage({ params }: { params: { slug: string } }) {
  const noticia = await prisma.noticia.findUnique({ where: { slug: params.slug } });
  if (!noticia || noticia.status !== "PUBLICADO") notFound();

  return (
    <Section>
      <article className="mx-auto max-w-2xl">
        {noticia.distrito && (
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary-600">
            {noticia.distrito}
          </p>
        )}
        <h1 className="font-display text-3xl font-bold text-ink">{noticia.titular}</h1>
        <p className="mt-3 text-lg text-slate-600">{noticia.bajada}</p>
        <p className="mt-2 text-sm text-slate-400">
          {noticia.publishedAt && formatDate(noticia.publishedAt)} · {noticia.autor}
        </p>

        {noticia.foto && (
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-xl">
            <Image src={noticia.foto} alt={noticia.titular} fill className="object-cover" />
          </div>
        )}
        {noticia.pieDeFoto && <p className="mt-2 text-xs text-slate-400">{noticia.pieDeFoto}</p>}

        <div className="prose prose-slate mt-8 max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{noticia.cuerpo}</ReactMarkdown>
        </div>
      </article>
    </Section>
  );
}
