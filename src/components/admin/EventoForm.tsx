"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { eventoSchema, type EventoInput, contentStatusValues } from "@/lib/validations";

export function EventoForm({ initialData, id }: { initialData?: EventoInput; id?: string }) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EventoInput>({
    resolver: zodResolver(eventoSchema),
    defaultValues: initialData || {
      titulo: "",
      fecha: "",
      lugar: "",
      referencia: "",
      mapaUrl: "",
      contacto: "",
      status: "BORRADOR",
    },
  });

  async function onSubmit(data: EventoInput) {
    setServerError(null);
    const url = id ? `/api/admin/eventos/${id}` : "/api/admin/eventos";
    const method = id ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/admin/eventos");
      router.refresh();
    } else {
      setServerError("No se pudo guardar. Revisa los campos.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-5">
      <div>
        <label className="block text-sm font-medium text-ink">Título de la actividad</label>
        <input {...register("titulo")} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        {errors.titulo && <p className="mt-1 text-sm text-red-600">{errors.titulo.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">Fecha y hora</label>
        <input
          type="datetime-local"
          {...register("fecha")}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        {errors.fecha && <p className="mt-1 text-sm text-red-600">{errors.fecha.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">Lugar</label>
        <input {...register("lugar")} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        {errors.lugar && <p className="mt-1 text-sm text-red-600">{errors.lugar.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">Referencia (opcional)</label>
        <input {...register("referencia")} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">Enlace de mapa (opcional)</label>
        <input {...register("mapaUrl")} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        {errors.mapaUrl && <p className="mt-1 text-sm text-red-600">{errors.mapaUrl.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">Contacto (opcional)</label>
        <input {...register("contacto")} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
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
        <p className="mt-1 text-xs text-slate-500">
          Los eventos vencidos se retiran automáticamente de la agenda pública aunque sigan PUBLICADO.
        </p>
      </div>

      {serverError && <p className="text-sm text-red-600">{serverError}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-primary-500 px-5 py-3 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50"
      >
        {isSubmitting ? "Guardando…" : id ? "Guardar cambios" : "Crear actividad"}
      </button>
    </form>
  );
}
