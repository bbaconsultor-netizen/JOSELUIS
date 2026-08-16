import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [propuestas, distritos, eventos, noticias, leads] = await Promise.all([
    prisma.propuesta.count(),
    prisma.distrito.count(),
    prisma.evento.count(),
    prisma.noticia.count(),
    prisma.contactLead.count({ where: { status: "NUEVO" } }),
  ]);

  const cards = [
    { label: "Propuestas", value: propuestas, href: "/admin/propuestas" },
    { label: "Distritos", value: distritos, href: "/admin/distritos" },
    { label: "Eventos de agenda", value: eventos, href: "/admin/eventos" },
    { label: "Noticias", value: noticias, href: "/admin/noticias" },
    { label: "Mensajes nuevos", value: leads, href: "/admin" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Panel de campaña</h1>
      <p className="mt-1 text-sm text-slate-600">
        Gestiona propuestas, territorio, agenda y noticias sin apoyo del desarrollador.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md"
          >
            <p className="text-3xl font-bold text-primary-600">{card.value}</p>
            <p className="mt-1 text-sm font-medium text-slate-600">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
