import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";

type AdminCheck = { ok: true; email: string } | { ok: false; status: 401 | 403; error: string };

export async function requireAdmin(): Promise<AdminCheck> {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email?.toLowerCase();

  if (!email) {
    return { ok: false, status: 401, error: "Debes iniciar sesión." };
  }

  const admin = await prisma.adminUser.findUnique({ where: { email } });
  if (!admin) {
    return { ok: false, status: 403, error: "No autorizado." };
  }

  return { ok: true, email };
}
