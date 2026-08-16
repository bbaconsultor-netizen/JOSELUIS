"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { distritoSchema, type DistritoInput, contentStatusValues } from "@/lib/validations";
import { slugify } from "@/lib/utils";

export function DistritoForm({ initialData, id }: { initialData?: DistritoInput; id?: string }) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<DistritoInput>({
    resolver: zodResolver(distritoSchema),
    defaultValues: initialData || {
      nombre: "",
      slug: "",
      introduccion: "",
      necesidades: "",
      prioridades: "",
      fotografia: "",
      fechaRevision: "",
      status: "BORRADOR",
    },
  });

  async function onSubmit(data: DistritoInput) {
    setServerError(null);
    const url = id ? `/api/admin/distritos/${id}` : "/api/admin/distritos";
    const method = id ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/admin/distritos");
      router.refresh();
    } else {
      setServerError("No se pudo guardar. Revisa los campos.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-5">
      <div>
        <label className="block text-sm font-medium text-ink">Nombre del distrito</label>
        <input
          {...register("nombre", {
            onChange: (e) => {
              if (!id) setValue("slug", slugify(e.target.value));
            },
          })}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">Slug (URL)</label>
        <input {...register("slug")} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        {errors.slug && <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">Introducción</label>
        <textarea {...register("introduccion")} rows={2} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        {errors.introduccion && <p className="mt-1 text-sm text-red-600">{errors.introduccion.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">Necesidades escuchadas</label>
        <textarea {...register("necesidades")} rows={2} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        {errors.necesidades && <p className="mt-1 text-sm text-red-600">{errors.necesidades.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">Prioridades (a validar con el territorio)</label>
        <textarea {...register("prioridades")} rows={2} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        {errors.prioridades && <p className="mt-1 text-sm text-red-600">{errors.prioridades.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">Fotografía (URL, opcional)</label>
        <input {...register("fotografia")} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        {errors.fotografia && <p className="mt-1 text-sm text-red-600">{errors.fotografia.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">Fecha de revisión</label>
        <input
          {...register("fechaRevision")}
          placeholder="Ej: 15 de agosto de 2026"
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        {errors.fechaRevision && <p className="mt-1 text-sm text-red-600">{errors.fechaRevision.message}</p>}
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
        {isSubmitting ? "Guardando…" : id ? "Guardar cambios" : "Crear distrito"}
      </button>
    </form>
  );
}
