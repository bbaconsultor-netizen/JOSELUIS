import { DistritoForm } from "@/components/admin/DistritoForm";

export default function NuevoDistritoPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Nuevo distrito</h1>
      <div className="mt-6">
        <DistritoForm />
      </div>
    </div>
  );
}
