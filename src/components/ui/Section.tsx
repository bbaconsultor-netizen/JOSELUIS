import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

export function Section({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  children,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className={cn("py-16 sm:py-24", className)}>
      <Container>
        {(eyebrow || title || description) && (
          <div className={cn("mb-12 max-w-2xl", align === "center" && "mx-auto text-center")}>
            {eyebrow && (
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary-600">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                {title}
              </h2>
            )}
            {description && <p className="mt-4 text-lg text-slate-600">{description}</p>}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
