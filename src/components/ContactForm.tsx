"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { contactSchema, type ContactInput } from "@/lib/validations";

const TIPO_LABELS: Record<string, string> = {
  PROPUESTA: "Enviar una propuesta",
  VOLUNTARIADO: "Sumarme como voluntario",
  CONSULTA_PRENSA: "Consulta de prensa",
  OTRO: "Otro motivo",
};

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { tipo: "PROPUESTA" },
  });

  async function onSubmit(data: ContactInput) {
    setServerError(null);
    const res = await fetch("/api/contacto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setSent(true);
      reset();
    } else {
      setServerError("No pudimos enviar tu mensaje. Intenta nuevamente en unos minutos.");
    }
  }

  if (sent) {
    return (
      <div className="rounded-xl border border-primary-200 bg-primary-50 p-6 text-center">
        <p className="font-display text-lg font-semibold text-ink">¡Gracias por escribirnos!</p>
        <p className="mt-2 text-sm text-slate-600">
          Tu mensaje fue recibido. El equipo de campaña lo revisará y se pondrá en contacto si es
          necesario.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-4 text-sm font-semibold text-primary-700 hover:underline"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-ink">
          Nombre
        </label>
        <input
          id="name"
          {...register("name")}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          aria-invalid={!!errors.name}
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink">
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          aria-invalid={!!errors.email}
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-ink">
            Teléfono (opcional)
          </label>
          <input
            id="phone"
            {...register("phone")}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>
        <div>
          <label htmlFor="distrito" className="block text-sm font-medium text-ink">
            Distrito (opcional)
          </label>
          <input
            id="distrito"
            {...register("distrito")}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="tipo" className="block text-sm font-medium text-ink">
          Motivo
        </label>
        <select
          id="tipo"
          {...register("tipo")}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
        >
          {Object.entries(TIPO_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ink">
          Mensaje
        </label>
        <textarea
          id="message"
          rows={4}
          {...register("message")}
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
          aria-invalid={!!errors.message}
        />
        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
      </div>

      <div className="flex items-start gap-2">
        <input
          id="consentimiento"
          type="checkbox"
          {...register("consentimiento")}
          className="mt-1 h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
        />
        <label htmlFor="consentimiento" className="text-sm text-slate-600">
          Acepto que mis datos sean usados por el equipo de campaña únicamente para responder este
          mensaje, según la{" "}
          <a href="/transparencia#privacidad" className="font-semibold text-primary-700 hover:underline">
            política de datos
          </a>
          .
        </label>
      </div>
      {errors.consentimiento && (
        <p className="text-sm text-red-600">{errors.consentimiento.message}</p>
      )}

      {serverError && <p className="text-sm text-red-600">{serverError}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-primary-500 px-5 py-3 text-sm font-semibold text-white hover:bg-primary-700 disabled:opacity-50"
      >
        {isSubmitting ? "Enviando…" : "Enviar"}
      </button>
    </form>
  );
}
