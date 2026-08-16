import Link from "next/link";
import Image from "next/image";

// Foto real del candidato (recorte circular) + nombre. Fuente: material de
// campaña entregado por el equipo (carpeta "Jose Luis Sandoval a la
// alcaldía"). Reemplazar solo si el equipo confirma un logotipo distinto.
export function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const textColor = variant === "light" ? "text-white" : "text-ink";

  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0">
      <Image
        src="/images/candidato-avatar.webp"
        alt="José Luis Sandoval Luque"
        width={36}
        height={36}
        className="rounded-full object-cover"
      />
      <span className={`hidden font-display text-sm font-semibold leading-tight sm:inline ${textColor}`}>
        José Luis Sandoval
      </span>
    </Link>
  );
}
