import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return Response.json({ user: null }, { headers: { "Cache-Control": "no-store" } });
  const dbUser = await prisma.user.findUnique({ where: { email: session.user.email }, include: { role: { include: { permissions: { include: { permission: true } } } } } });
  const perm = new Set((dbUser?.role?.permissions ?? []).map((rp) => rp.permission.key));
  const roleName = perm.has("ADMIN_PANEL_ACCESS") ? "ADMIN" : dbUser?.role?.name;
  return Response.json({ user: { ...session.user, role: roleName } }, { headers: { "Cache-Control": "no-store" } });
}