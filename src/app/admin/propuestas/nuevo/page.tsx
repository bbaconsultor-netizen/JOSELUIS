import { PropuestaForm } from "@/components/admin/PropuestaForm";

export default function NuevaPropuestaPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Nueva propuesta</h1>
      <div className="mt-6">
        <PropuestaForm />
      </div>
    </div>
  );
}
