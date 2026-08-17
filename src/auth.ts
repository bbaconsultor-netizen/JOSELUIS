import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const googleConfigured = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Usuario y clave",
      credentials: {
        username: { label: "Usuario", type: "text" },
        password: { label: "Clave", type: "password" },
      },
      async authorize(credentials) {
        const username = credentials?.username?.trim().toLowerCase();
        const password = credentials?.password ?? "";
        const expectedUsername = (process.env.ADMIN_USERNAME || "admin").toLowerCase();
        const passwordHash = process.env.ADMIN_PASSWORD_HASH;

        if (!username || !passwordHash || username !== expectedUsername) return null;

        const valid = await bcrypt.compare(password, passwordHash);
        if (!valid) return null;

        return { id: "admin", name: "Administrador", email: "admin@sandovalnasca.local" };
      },
    }),
    ...(googleConfigured
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          }),
        ]
      : []),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // Cada proveedor ya valida por su cuenta: Credentials verifica la clave
    // contra el hash, Google verifica el email contra la lista blanca
    // AdminUser. Si signIn() llega aquí, la sesión ya es de confianza.
    async signIn({ account, user }) {
      if (account?.provider === "credentials") return true;
      if (!user.email) return false;
      const admin = await prisma.adminUser.findUnique({
        where: { email: user.email.toLowerCase() },
      });
      return Boolean(admin);
    },
  },
};
