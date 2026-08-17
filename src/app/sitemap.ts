import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [distritos, noticias] = await Promise.all([
    prisma.distrito.findMany({ where: { status: "PUBLICADO" }, select: { slug: true, updatedAt: true } }),
    prisma.noticia.findMany({ where: { status: "PUBLICADO" }, select: { slug: true, updatedAt: true } }),
  ]);

  const staticRoutes = [
    "",
    "/jose-luis",
    "/plan-agua",
    "/propuestas",
    "/territorio",
    "/agenda",
    "/noticias",
    "/transparencia",
    "/participa",
    "/videos",
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));

  const distritoRoutes = distritos.map((d) => ({
    url: `${SITE_URL}/territorio/${d.slug}`,
    lastModified: d.updatedAt,
  }));

  const noticiaRoutes = noticias.map((n) => ({
    url: `${SITE_URL}/noticias/${n.slug}`,
    lastModified: n.updatedAt,
  }));

  return [...staticRoutes, ...distritoRoutes, ...noticiaRoutes];
}
