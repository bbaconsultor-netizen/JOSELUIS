"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { videoSchema, type VideoInput, contentStatusValues } from "@/lib/validations";

export function VideoForm({ initialData, id }: { initialData?: VideoInput; id?: string }) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VideoInput>({
    resolver: zodResolver(videoSchema),
    defaultValues: initialData || {
      titulo: "",
      youtubeUrl: "",
      descripcion: "",
      distrito: "",
      fecha: "",
      status: "BORRADOR",
    },
  });

  async function onSubmit(data: VideoInput) {
    setServerError(null);
    const url = id ? `/api/admin/videos/${id}` : "/api/admin/videos";
    const method = id ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/admin/videos");
      router.refresh();
    } else {
      const body = await res.json().catch(() => null);
      setServerError(body?.error?.toString() || "No se pudo guardar. Revisa los campos.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-5">
      <div>
        <label className="block text-sm font-medium text-ink">Título</label>
        <input {...register("titulo")} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        {errors.titulo && <p className="mt-1 text-sm text-red-600">{errors.titulo.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">Link de YouTube</label>
        <input
          {...register("youtubeUrl")}
          placeholder="https://www.youtube.com/watch?v=..."
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        {errors.youtubeUrl && <p className="mt-1 text-sm text-red-600">{errors.youtubeUrl.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">Descripción (opcional)</label>
        <textarea {...register("descripcion")} rows={3} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-ink">Distrito (opcional)</label>
          <input {...register("distrito")} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink">Fecha (opcional)</label>
          <input type="date" {...register("fecha")} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">Estado editorial</label>
        <select {...register("status")} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm">
          {contentStatusValues.map((s) => (
            <option key={s} value={s}>
              {s.replace("_", " ")}
            </option>
          ))}
        </select>
      </div>

      {serverError && <p className="text-sm text-red-600">{serverError}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-primary-500 px-5 py-3 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50"
      >
        {isSubmitting ? "Guardando…" : id ? "Guardar cambios" : "Agregar video"}
      </button>
    </form>
  );
}
