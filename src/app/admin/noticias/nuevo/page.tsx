import { NoticiaForm } from "@/components/admin/NoticiaForm";

export default function NuevaNoticiaPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Nueva noticia</h1>
      <div className="mt-6">
        <NoticiaForm />
      </div>
    </div>
  );
}
