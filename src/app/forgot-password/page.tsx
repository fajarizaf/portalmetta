
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
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 sm:px-6">
      <div className="w-full max-w-md space-y-6 sm:space-y-8">
        <div className="flex flex-col items-center space-y-2">
          <Image 
            src="/uploads/dc-company/cmkewzoro0000hdrnmyii2gpp.png" 
            alt="MettaDC Logo" 
            width={240} 
            height={80} 
            className="h-14 sm:h-16 w-auto object-contain"
            priority 
          />
        </div>

        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">Lupa Password?</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              {isSuccess 
                ? "Instruksi reset password telah dikirim ke email Anda jika akun tersebut terdaftar."
                : "Masukkan email Anda untuk menerima tautan reset password."}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
            {isSuccess ? (
              <Button asChild className="w-full text-sm sm:text-base">
                <Link href="/login">Kembali ke Login</Link>
              </Button>
            ) : (
              <form action={requestReset} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="name@company.com" required className="text-[16px] sm:text-sm" />
                </div>
                <Button type="submit" className="w-full text-sm sm:text-base">Kirim Tautan Reset</Button>
                <div className="text-center text-xs sm:text-sm">
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
