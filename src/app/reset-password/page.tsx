
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import Link from "next/link";
import Image from "next/image";

async function resetPassword(formData: FormData) {
  "use server";
  const token = String(formData.get("token") || "");
  const password = String(formData.get("password") || "");
  const confirmPassword = String(formData.get("confirmPassword") || "");

  if (!token || !password || password !== confirmPassword) {
    return;
  }

  const user = await prisma.user.findFirst({
    where: {
      resetToken: token,
      resetTokenExpiry: { gt: new Date() }
    }
  });

  if (!user) {
    redirect("/reset-password?error=invalid");
  }

  const hash = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordHash: hash,
      resetToken: null,
      resetTokenExpiry: null
    }
  });

  redirect("/login?reset=success");
}

export default function ResetPasswordPage({ searchParams }: { searchParams: { token?: string, error?: string } }) {
  const token = searchParams.token;
  const isError = searchParams.error === "invalid";

  if (!token && !isError) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center space-y-2">
          <Image 
            src="/uploads/dc-company/cmkewzoro0000hdrnmyii2gpp.png" 
            alt="MettaDC Logo" 
            width={240} 
            height={80} 
            className="h-16 w-auto object-contain"
            priority 
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>
              {isError 
                ? "Tautan reset tidak valid atau telah kedaluwarsa."
                : "Silakan masukkan kata sandi baru Anda."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isError ? (
              <Button asChild className="w-full">
                <Link href="/forgot-password">Minta Tautan Baru</Link>
              </Button>
            ) : (
              <form action={resetPassword} className="space-y-4">
                <input type="hidden" name="token" value={token} />
                <div className="space-y-2">
                  <Label htmlFor="password">Password Baru</Label>
                  <Input id="password" name="password" type="password" required minLength={8} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
                  <Input id="confirmPassword" name="confirmPassword" type="password" required minLength={8} />
                </div>
                <Button type="submit" className="w-full">Simpan Password</Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
