import { redirect } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { SignOutButton } from "@/components/admin/SignOutButton";

const ADMIN_LINKS = [
  { href: "/admin", label: "Panel" },
  { href: "/admin/propuestas", label: "Propuestas" },
  { href: "/admin/distritos", label: "Distritos" },
  { href: "/admin/eventos", label: "Agenda" },
  { href: "/admin/noticias", label: "Noticias" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email?.toLowerCase();

  if (!email) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex flex-col lg:flex-row">
        <aside className="w-full border-b border-slate-200 bg-ink lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r">
          <div className="p-6">
            <p className="font-display text-lg font-semibold text-white">Panel de campaña</p>
            <p className="mt-1 text-xs text-slate-400">{email}</p>
          </div>
          <nav className="flex flex-wrap gap-1 px-4 pb-4 lg:flex-col">
            {ADMIN_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="px-4 pb-6 lg:mt-auto">
            <SignOutButton />
          </div>
        </aside>
        <main className="flex-1 p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
