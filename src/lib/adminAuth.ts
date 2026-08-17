import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

type AdminCheck = { ok: true; email: string } | { ok: false; status: 401; error: string };

// signIn() en auth.ts ya valida cada proveedor (Credentials verifica la
// clave, Google verifica la lista blanca AdminUser). Si existe sesión, es de
// confianza — no hace falta repetir el chequeo contra la base de datos aquí.
export async function requireAdmin(): Promise<AdminCheck> {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if (!email) {
    return { ok: false, status: 401, error: "Debes iniciar sesión." };
  }

  return { ok: true, email };
}
