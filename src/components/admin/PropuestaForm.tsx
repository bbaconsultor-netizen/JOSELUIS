"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { propuestaSchema, type PropuestaInput, contentStatusValues, ejeValues } from "@/lib/validations";
import { slugify } from "@/lib/utils";

const EJE_LABELS: Record<string, string> = {
  AGUA_SANEAMIENTO: "Agua y saneamiento",
  TRABAJO_ECONOMIA: "Trabajo y economía local",
  TURISMO: "Turismo",
  SEGURIDAD: "Seguridad ciudadana",
  TRANSPARENCIA: "Transparencia y gestión",
};

export function PropuestaForm({
  initialData,
  id,
}: {
  initialData?: PropuestaInput;
  id?: string;
}) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PropuestaInput>({
    resolver: zodResolver(propuestaSchema),
    defaultValues: initialData || {
      titulo: "",
      slug: "",
      eje: "AGUA_SANEAMIENTO",
      resumen: "",
      problema: "",
      accion: "",
      competencia: "",
      etapas: "",
      fuente: "",
      responsable: "",
      imagen: "",
      imagenIlustrativa: false,
      status: "BORRADOR",
    },
  });

  const titulo = watch("titulo");

  async function onSubmit(data: PropuestaInput) {
    setServerError(null);
    const url = id ? `/api/admin/propuestas/${id}` : "/api/admin/propuestas";
    const method = id ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/admin/propuestas");
      router.refresh();
    } else {
      setServerError("No se pudo guardar. Revisa los campos.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-5">
      <div>
        <label className="block text-sm font-medium text-ink">Título</label>
        <input
          {...register("titulo", {
            onChange: (e) => {
              if (!id) setValue("slug", slugify(e.target.value));
            },
          })}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        {errors.titulo && <p className="mt-1 text-sm text-red-600">{errors.titulo.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">Slug (URL)</label>
        <input {...register("slug")} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        {errors.slug && <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">Eje</label>
        <select {...register("eje")} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm">
          {ejeValues.map((eje) => (
            <option key={eje} value={eje}>
              {EJE_LABELS[eje]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">Resumen (máx. 45 palabras)</label>
        <textarea {...register("resumen")} rows={2} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        {errors.resumen && <p className="mt-1 text-sm text-red-600">{errors.resumen.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">Problema</label>
        <textarea {...register("problema")} rows={3} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        {errors.problema && <p className="mt-1 text-sm text-red-600">{errors.problema.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">Acción propuesta</label>
        <textarea {...register("accion")} rows={3} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        {errors.accion && <p className="mt-1 text-sm text-red-600">{errors.accion.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">Competencia institucional</label>
        <input
          {...register("competencia")}
          placeholder="Ej: Gestionar y coordinar con Emapavigs"
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        {errors.competencia && <p className="mt-1 text-sm text-red-600">{errors.competencia.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">Etapas</label>
        <input {...register("etapas")} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        {errors.etapas && <p className="mt-1 text-sm text-red-600">{errors.etapas.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-ink">Fuente</label>
          <input {...register("fuente")} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
          {errors.fuente && <p className="mt-1 text-sm text-red-600">{errors.fuente.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-ink">Responsable</label>
          <input {...register("responsable")} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
          {errors.responsable && <p className="mt-1 text-sm text-red-600">{errors.responsable.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">Imagen de portada (URL, opcional)</label>
        <input {...register("imagen")} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
      </div>

      <div className="flex items-start gap-2">
        <input
          id="imagenIlustrativa"
          type="checkbox"
          {...register("imagenIlustrativa")}
          className="mt-1 h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
        />
        <label htmlFor="imagenIlustrativa" className="text-sm text-slate-600">
          Es una imagen ilustrativa (generada con IA o de archivo), no una fotografía documental del hecho.
          Se marcará visiblemente como &ldquo;Imagen ilustrativa&rdquo; en el sitio público — regla
          obligatoria del brief para evitar simular hechos reales.
        </label>
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
        <p className="mt-1 text-xs text-slate-500">Solo el estado PUBLICADO se muestra en el sitio.</p>
      </div>

      {serverError && <p className="text-sm text-red-600">{serverError}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-primary-500 px-5 py-3 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50"
      >
        {isSubmitting ? "Guardando…" : id ? "Guardar cambios" : `Crear propuesta${titulo ? "" : ""}`}
      </button>
    </form>
  );
}
