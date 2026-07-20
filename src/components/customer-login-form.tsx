"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import Link from "next/link"

const schema = z.object({ email: z.string().email(), password: z.string().min(6) })

export default function CustomerLoginForm() {
  const router = useRouter()
  const [error, setError] = useState("")
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) })
  const onSubmit = async (values: z.infer<typeof schema>) => {
    setError("")
    const res = await signIn("credentials", { redirect: false, ...values })
    if (res?.error) {
      setError("Email atau password salah")
      return
    }
    router.replace("/customer")
  }
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
          <h1 className="text-xl font-semibold">Masuk Customer</h1>
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...form.register("email")} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
                className="text-xs text-primary hover:underline"
              >
                Lupa Password?
              </Link>
            </div>
            <Input id="password" type="password" {...form.register("password")} />
          </div>
          <Button type="submit" className="w-full">Masuk</Button>
        </form>
      </Card>
    </div>
  )
}