"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="w-full rounded-md border border-white/20 px-3 py-2 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white"
    >
      Cerrar sesión
    </button>
  );
}
