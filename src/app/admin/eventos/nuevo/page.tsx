import { EventoForm } from "@/components/admin/EventoForm";

export default function NuevoEventoPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Nueva actividad</h1>
      <div className="mt-6">
        <EventoForm />
      </div>
    </div>
  );
}
