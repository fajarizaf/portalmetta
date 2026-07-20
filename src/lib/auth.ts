import { NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import fs from "node:fs/promises";
import path from "node:path";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { role: { include: { permissions: { include: { permission: true } } } } },
        });
        if (!user) return null;
        const ok = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!ok) return null;
        const perm = new Set((user.role?.permissions ?? []).map((rp) => rp.permission.key));
        const roleName = perm.has("ADMIN_PANEL_ACCESS") ? "ADMIN" : user.role.name;
        return { id: user.id, email: user.email, name: user.name ?? user.email, role: roleName };
      },
    }),
  ],
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as { id: string; role?: string };
        const t = token as JWT & { id?: string; role?: string };
        t.id = u.id;
        t.role = u.role;
        return t;
      }
      return token;
    },
    async session({ session, token }) {
      const t = token as JWT & { id?: string };
      const id = t.id;
      if (id && session.user) {
        const dir = path.join(process.cwd(), "public", "uploads", "avatars");
        const candidates = ["png", "jpg", "svg"];
        for (const ext of candidates) {
          try {
            await fs.access(path.join(dir, `${id}.${ext}`));
            session.user.image = `/uploads/avatars/${id}.${ext}`;
            break;
          } catch {}
        }
      }
      return session;
    },
  },
};