"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { noticiaSchema, type NoticiaInput, contentStatusValues } from "@/lib/validations";
import { slugify } from "@/lib/utils";

export function NoticiaForm({ initialData, id }: { initialData?: NoticiaInput; id?: string }) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<NoticiaInput>({
    resolver: zodResolver(noticiaSchema),
    defaultValues: initialData || {
      titular: "",
      slug: "",
      bajada: "",
      cuerpo: "",
      distrito: "",
      autor: "",
      foto: "",
      pieDeFoto: "",
      status: "BORRADOR",
    },
  });

  async function onSubmit(data: NoticiaInput) {
    setServerError(null);
    const url = id ? `/api/admin/noticias/${id}` : "/api/admin/noticias";
    const method = id ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/admin/noticias");
      router.refresh();
    } else {
      setServerError("No se pudo guardar. Revisa los campos.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-5">
      <div>
        <label className="block text-sm font-medium text-ink">Titular</label>
        <input
          {...register("titular", {
            onChange: (e) => {
              if (!id) setValue("slug", slugify(e.target.value));
            },
          })}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        {errors.titular && <p className="mt-1 text-sm text-red-600">{errors.titular.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">Slug (URL)</label>
        <input {...register("slug")} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        {errors.slug && <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">Bajada</label>
        <textarea {...register("bajada")} rows={2} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        {errors.bajada && <p className="mt-1 text-sm text-red-600">{errors.bajada.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">Cuerpo (admite Markdown)</label>
        <textarea {...register("cuerpo")} rows={8} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-mono" />
        {errors.cuerpo && <p className="mt-1 text-sm text-red-600">{errors.cuerpo.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-ink">Distrito (opcional)</label>
          <input {...register("distrito")} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink">Autor</label>
          <input {...register("autor")} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
          {errors.autor && <p className="mt-1 text-sm text-red-600">{errors.autor.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">Foto (URL, opcional)</label>
        <input {...register("foto")} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
        {errors.foto && <p className="mt-1 text-sm text-red-600">{errors.foto.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-ink">Pie de foto (opcional)</label>
        <input {...register("pieDeFoto")} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
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
        {isSubmitting ? "Guardando…" : id ? "Guardar cambios" : "Crear noticia"}
      </button>
    </form>
  );
}
