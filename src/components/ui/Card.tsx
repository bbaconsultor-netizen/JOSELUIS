import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

export function Card({
  href,
  title,
  excerpt,
  category,
  coverImage,
  date,
  cta = "Ver detalle",
}: {
  href: string;
  title: string;
  excerpt: string;
  category?: string | null;
  coverImage?: string | null;
  date?: Date | string | null;
  cta?: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-primary-100 to-primary-50">
        {coverImage && (
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        {category && <Badge>{category}</Badge>}
        <h3 className="font-display text-lg font-semibold text-ink group-hover:text-primary-700">
          {title}
        </h3>
        <p className="line-clamp-3 flex-1 text-sm text-slate-600">{excerpt}</p>
        <div className="flex items-center justify-between">
          {date && <p className="text-xs text-slate-400">{formatDate(date)}</p>}
          <span className="text-sm font-semibold text-primary-700">{cta} →</span>
        </div>
      </div>
    </Link>
  );
}
