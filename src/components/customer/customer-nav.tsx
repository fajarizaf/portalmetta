"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ShoppingCart, LifeBuoy, HelpCircle, LogOut, CreditCard, LayoutGrid, User } from "lucide-react"
import { cn } from "@/lib/utils"

export function CustomerNav() {
  const pathname = usePathname()

  const navItems = [
    {
      href: "/customer",
      label: "Beranda",
      icon: Home,
      exact: true,
    },
    {
      href: "/customer/my-racks",
      label: "Rack Management",
      icon: LayoutGrid,
      exact: false,
    },
    {
      href: "/customer/order",
      label: "Request",
      icon: ShoppingCart,
      exact: false,
    },
    {
      href: "/customer/support",
      label: "Dukungan",
      icon: LifeBuoy,
      exact: false,
    },
    {
      href: "/customer/billing",
      label: "Billing",
      icon: CreditCard,
      exact: false,
    },
    {
      href: "/customer/account",
      label: "Akun",
      icon: User,
      exact: false,
    },
    {
      href: "/help",
      label: "Bantuan",
      icon: HelpCircle,
      exact: false,
    },
  ]

  const isActive = (href: string, exact: boolean) => {
    if (exact) {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="flex items-center gap-1">
      {navItems.map((item) => {
        const active = isActive(item.href, item.exact)
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium rounded-md transition-all duration-200",
              active
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/80"
            )}
          >
            <item.icon className="w-3.5 h-3.5" />
            {item.label}
          </Link>
        )
      })}
      <div className="w-px h-4 bg-slate-200 mx-1" />
      <Link
        href="/api/auth/signout"
        className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all duration-200"
      >
        <LogOut className="w-3.5 h-3.5" />
        Keluar
      </Link>
    </nav>
  )
}
