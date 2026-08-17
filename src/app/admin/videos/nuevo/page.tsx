import { VideoForm } from "@/components/admin/VideoForm";

export default function NuevoVideoPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Agregar video</h1>
      <div className="mt-6">
        <VideoForm />
      </div>
    </div>
  );
}
