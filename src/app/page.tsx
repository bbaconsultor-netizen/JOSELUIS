import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatDateTime } from "@/lib/utils";
import { bloqueConfianza, candidato, ejes, mensaje, planAguaResumen } from "@/data/perfil";

export default async function InicioPage() {
  const [distritos, proximasActividades] = await Promise.all([
    prisma.distrito.findMany({ where: { status: "PUBLICADO" }, orderBy: { nombre: "asc" } }),
    prisma.evento.findMany({
      where: { status: "PUBLICADO", fecha: { gte: new Date() } },
      orderBy: { fecha: "asc" },
      take: 3,
    }),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="bg-ink">
        <Container className="grid gap-10 py-16 sm:py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <Badge className="bg-primary-500/15 text-primary-300">Candidatura ERM 2026</Badge>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Una nueva generación para Nasca
            </h1>
            <p className="mt-4 text-lg text-slate-300">{candidato.lemaPrincipal}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/plan-agua">Conoce el plan</Button>
              <Button href="/participa" variant="outline" className="bg-transparent border-white text-white hover:border-primary-400 hover:text-primary-300">
                Sigue la campaña
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-primary-900">
            <Image
              src="/images/candidato-retrato.webp"
              alt="José Luis Sandoval Luque"
              fill
              priority
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      {/* Banner de campaña */}
      <div className="relative aspect-[2000/520] w-full">
        <Image
          src="/images/hero-banner.webp"
          alt="José Luis Sandoval Luque — Honradez, salud y educación. Agua para Nasca. Trabajo para su gente."
          fill
          className="object-cover"
        />
      </div>

      {/* Bloque de confianza */}
      <Section className="py-12">
        <div className="grid gap-6 sm:grid-cols-3">
          {bloqueConfianza.map((dato) => (
            <div key={dato} className="rounded-xl border border-slate-200 p-6 text-center">
              <p className="font-display text-lg font-semibold text-ink">{dato}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Plan Agua */}
      <Section
        eyebrow="Eje prioritario"
        title="Plan Agua para Nasca"
        description={planAguaResumen}
        className="bg-primary-50/40"
      >
        <Button href="/plan-agua" variant="outline">
          Revisa nuestras propuestas
        </Button>
      </Section>

      {/* Cinco ejes */}
      <Section eyebrow="Propuestas" title="Cinco ejes para toda la provincia" align="center">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {ejes.map((eje) => (
            <a
              key={eje.slug}
              href={`/propuestas#${eje.slug}`}
              className="flex flex-col rounded-xl border border-slate-200 p-5 transition-shadow hover:shadow-md"
            >
              <h3 className="font-display text-base font-semibold text-ink">{eje.nombre}</h3>
              <p className="mt-2 flex-1 text-sm text-slate-600">{eje.resumen}</p>
              <span className="mt-3 text-sm font-semibold text-primary-700">Explorar por tema →</span>
            </a>
          ))}
        </div>
      </Section>

      {/* La provincia completa */}
      <Section eyebrow="Territorio" title="La provincia completa" description="Cinco distritos, una sola provincia.">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {distritos.map((d) => (
            <a
              key={d.slug}
              href={`/territorio/${d.slug}`}
              className="rounded-xl border border-slate-200 p-5 text-center transition-shadow hover:shadow-md"
            >
              <h3 className="font-display text-base font-semibold text-ink">{d.nombre}</h3>
              <span className="mt-3 block text-sm font-semibold text-primary-700">Ver mi distrito →</span>
            </a>
          ))}
        </div>
      </Section>

      {/* Últimas actividades */}
      <Section eyebrow="Agenda" title="Últimas actividades">
        {proximasActividades.length === 0 ? (
          <p className="text-sm text-slate-500">
            Todavía no hay actividades programadas. La agenda se actualizará semanalmente.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-3">
            {proximasActividades.map((ev) => (
              <div key={ev.id} className="rounded-xl border border-slate-200 p-5">
                <p className="text-xs font-semibold uppercase text-primary-600">{formatDateTime(ev.fecha)}</p>
                <h3 className="mt-2 font-display text-base font-semibold text-ink">{ev.titulo}</h3>
                <p className="mt-1 text-sm text-slate-600">{ev.lugar}</p>
              </div>
            ))}
          </div>
        )}
        <div className="mt-8">
          <Button href="/agenda" variant="outline">
            Agregar al calendario
          </Button>
        </div>
      </Section>

      {/* Participación */}
      <section className="bg-ink py-16 sm:py-24">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary-400">Participa</p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Cuéntanos qué necesita tu distrito
            </h2>
            <p className="mt-4 text-slate-300">{mensaje.presentacion}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/participa">Quiero participar</Button>
              <Button
                href="/transparencia"
                variant="outline"
                className="bg-transparent border-white text-white hover:border-primary-400 hover:text-primary-300"
              >
                Ver documentos oficiales
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
