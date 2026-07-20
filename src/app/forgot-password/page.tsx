
import { prisma } from "@/lib/prisma";
import { sendResetPasswordLinkEmail } from "@/lib/mail";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";
import crypto from "crypto";
import Link from "next/link";
import Image from "next/image";

async function requestReset(formData: FormData) {
  "use server";
  const email = String(formData.get("email") || "").trim();
  if (!email) return;

  const user = await prisma.user.findUnique({ where: { email } });
  
  if (user) {
    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 3600000); // 1 hour from now

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken: token,
        resetTokenExpiry: expiry
      }
    });

    await sendResetPasswordLinkEmail(user.email, user.name || user.email, token);
  }

  // Always redirect to success to prevent email enumeration
  redirect("/forgot-password?success=1");
}

export default function ForgotPasswordPage({ searchParams }: { searchParams: { success?: string } }) {
  const isSuccess = searchParams.success === "1";

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
            <CardTitle>Lupa Password?</CardTitle>
            <CardDescription>
              {isSuccess 
                ? "Instruksi reset password telah dikirim ke email Anda jika akun tersebut terdaftar."
                : "Masukkan email Anda untuk menerima tautan reset password."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSuccess ? (
              <Button asChild className="w-full">
                <Link href="/login">Kembali ke Login</Link>
              </Button>
            ) : (
              <form action={requestReset} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="name@company.com" required />
                </div>
                <Button type="submit" className="w-full">Kirim Tautan Reset</Button>
                <div className="text-center text-sm">
                  <Link href="/login" className="text-primary hover:underline">
                    Kembali ke Login
                  </Link>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
