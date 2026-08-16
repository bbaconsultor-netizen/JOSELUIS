import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Section align="center" className="min-h-[60vh] flex items-center">
      <div className="mx-auto max-w-md text-center">
        <p className="font-display text-6xl font-bold text-primary-500">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-ink">Página no encontrada</h1>
        <p className="mt-2 text-slate-600">
          El contenido que buscas no existe o fue retirado tras una revisión editorial.
        </p>
        <div className="mt-6">
          <Button href="/">Volver al inicio</Button>
        </div>
      </div>
    </Section>
  );
}
