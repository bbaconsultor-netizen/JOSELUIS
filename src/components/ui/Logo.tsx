import Link from "next/link";

// Placeholder: monograma "JLS" en degradado naranja (primary-500 -> accent-500).
// Reemplazar con el logotipo maestro real del equipo de diseño (SVG/PNG,
// ver inventario de activos del brief) apenas esté confirmado.
export function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const textColor = variant === "light" ? "text-white" : "text-ink";

  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0">
      <svg width="36" height="36" viewBox="0 0 64 64" aria-hidden="true">
        <defs>
          <linearGradient id="logo-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f36c00" />
            <stop offset="100%" stopColor="#c94f00" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="16" fill="url(#logo-gradient)" />
        <text
          x="32"
          y="41"
          fontFamily="system-ui, sans-serif"
          fontSize="22"
          fontWeight="700"
          fill="#ffffff"
          textAnchor="middle"
        >
          JLS
        </text>
      </svg>
      <span className={`hidden font-display text-sm font-semibold leading-tight sm:inline ${textColor}`}>
        José Luis Sandoval
      </span>
    </Link>
  );
}
