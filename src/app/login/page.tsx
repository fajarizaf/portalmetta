"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setError("");
    const res = await signIn("credentials", { redirect: false, ...values });
    if (res?.error) {
      setError("Email atau password salah");
      return;
    }
    const me = await fetch("/api/me");
    const json = await me.json();
    if (json?.user?.role === "ADMIN") router.replace("/admin");
    else router.replace("/customer");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="flex justify-center">
          <Image 
            src="/uploads/dc-company/cmkewzoro0000hdrnmyii2gpp.png" 
            alt="Company Logo" 
            width={240} 
            height={80} 
            className="h-16 w-auto object-contain"
            priority
          />
        </div>
        <div className="space-y-2 text-center">
          <h1 className="text-xl font-semibold">Masuk</h1>
          <p className="text-sm text-muted-foreground">Masukkan email dan password untuk melanjutkan</p>
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...form.register("email")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...form.register("password")} />
          </div>
          <Button type="submit" className="w-full">Masuk</Button>
        </form>
      </Card>
    </div>
  );
}