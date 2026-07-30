"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import Link from "next/link"
import { Loader2, Mail, Lock, ArrowRight } from "lucide-react"

const schema = z.object({ email: z.string().email(), password: z.string().min(6) })

export default function CustomerLoginForm() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) })

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setError("")
    setLoading(true)
    try {
      const res = await signIn("credentials", { redirect: false, ...values })
      if (res?.error) {
        setError("Email or password is incorrect")
        setLoading(false)
        return
      }
      router.replace("/customer")
    } catch {
      setError("An error occurred. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left: Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '48px 48px'
          }} />
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16">
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-8">
              <Image
                src="/logo-metta-transparent.png"
                alt="Company Logo"
                width={240}
                height={80}
                className="h-14 w-auto object-contain"
                priority
              />
            </div>

            <h1 className="text-4xl font-bold text-white leading-tight tracking-tight">
              Data Center
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-200 to-red-100">
                Customer Portal
              </span>
            </h1>

            <p className="mt-6 text-slate-400 text-lg leading-relaxed">
              Access your colocation services, manage racks, monitor inventory, and submit requests through our secure customer portal.
            </p>

            <div className="mt-12 flex items-center gap-8">
              <div>
                <p className="text-2xl font-bold text-white">Real-time</p>
                <p className="text-sm text-slate-500">Monitoring</p>
              </div>
              <div className="w-px h-10 bg-slate-700" />
              <div>
                <p className="text-2xl font-bold text-white">Secure</p>
                <p className="text-sm text-slate-500">Access</p>
              </div>
              <div className="w-px h-10 bg-slate-700" />
              <div>
                <p className="text-2xl font-bold text-white">24/7</p>
                <p className="text-sm text-slate-500">Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 bg-white">
        <div className="w-full max-w-sm">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-6 sm:mb-8">
            <Image
              src="/logo-metta-transparent.png"
              alt="Company Logo"
              width={200}
              height={60}
              className="h-10 sm:h-12 w-auto object-contain"
              priority
            />
          </div>

          <div className="space-y-1.5 sm:space-y-2 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">Welcome back</h2>
            <p className="text-xs sm:text-sm text-slate-500">Sign in to access your services</p>
          </div>

          {error && (
            <div className="mb-4 sm:mb-6 p-3 rounded-lg bg-red-50 border border-red-100 text-xs sm:text-sm text-red-600 flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <span className="text-red-600 text-xs font-bold">!</span>
              </div>
              {error}
            </div>
          )}

          <form className="space-y-4 sm:space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-[13px] font-medium text-slate-700">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  {...form.register("email")}
                  className="h-11 pl-10 bg-slate-50 border-slate-200 focus:bg-white focus:ring-1 focus:ring-slate-300 transition-all rounded-lg text-[16px] sm:text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-[13px] font-medium text-slate-700">Password</Label>
                <Link href="/forgot-password" className="text-xs text-slate-500 hover:text-slate-900 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...form.register("password")}
                  className="h-11 pl-10 bg-slate-50 border-slate-200 focus:bg-white focus:ring-1 focus:ring-slate-300 transition-all rounded-lg text-[16px] sm:text-sm"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-all duration-200 text-sm sm:text-base"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          <p className="mt-6 sm:mt-8 text-center text-xs text-slate-400">
            Protected by enterprise-grade security
          </p>
        </div>
      </div>
    </div>
  )
}
