"use client";

import { signIn } from "next-auth/react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  return (
    <Section align="center" className="min-h-[60vh] flex items-center">
      <div className="mx-auto max-w-sm text-center">
        <h1 className="font-display text-2xl font-bold text-ink">Panel administrativo</h1>
        <p className="mt-2 text-sm text-slate-600">
          Ingresa con la cuenta de Google autorizada por la campaña para gestionar propuestas,
          territorio, agenda y noticias.
        </p>
        <Button
          className="mt-6 w-full justify-center"
          onClick={() => signIn("google", { callbackUrl: "/admin" })}
        >
          Iniciar sesión con Google
        </Button>
      </div>
    </Section>
  );
}
