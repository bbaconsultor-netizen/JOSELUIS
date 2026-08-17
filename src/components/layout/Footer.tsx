import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { formatDate } from "@/lib/utils";
import { pendientes } from "@/data/perfil";

const RED_LABELS: Record<keyof typeof pendientes.redes, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
};

const COLUMNS = [
  {
    title: "Candidatura",
    links: [
      { href: "/jose-luis", label: "José Luis Sandoval" },
      { href: "/plan-agua", label: "Plan Agua para Nasca" },
      { href: "/propuestas", label: "Propuestas" },
    ],
  },
  {
    title: "Provincia",
    links: [
      { href: "/territorio", label: "Territorio" },
      { href: "/agenda", label: "Agenda" },
      { href: "/noticias", label: "Noticias" },
    ],
  },
  {
    title: "Transparencia",
    links: [
      { href: "/transparencia", label: "Fuentes y documentos" },
      { href: "/transparencia#privacidad", label: "Política de datos" },
      { href: "/participa", label: "Contacto editorial" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-ink">
      <Container className="py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo variant="light" />
            <p className="mt-4 max-w-xs text-sm text-slate-400">
              Candidatura a la Alcaldía Provincial de Nasca · ERM 2026.
              &ldquo;Agua para Nasca. Trabajo para su gente.&rdquo;
            </p>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
              {(Object.keys(pendientes.redes) as (keyof typeof pendientes.redes)[])
                .filter((red) => !pendientes.redes[red].startsWith("[PENDIENTE"))
                .map((red) => (
                  <a
                    key={red}
                    href={pendientes.redes[red]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-primary-400 hover:text-primary-300"
                  >
                    {RED_LABELS[red]}
                  </a>
                ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-white">{col.title}</h3>
              <ul className="mt-4 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-primary-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} José Luis Sandoval Luque · Candidatura ERM 2026. Contenido
            sujeto a revisión editorial.
          </p>
          <p>Última actualización de este sitio: {formatDate(new Date())}</p>
        </div>
      </Container>
    </footer>
  );
}
