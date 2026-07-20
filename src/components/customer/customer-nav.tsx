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
    <nav className="flex items-center gap-6">
      {navItems.map((item) => {
        const active = isActive(item.href, item.exact)
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2 text-sm font-medium transition-colors h-14 px-1 border-b-2",
              active
                ? "text-primary border-primary"
                : "text-slate-600 border-transparent hover:text-primary"
            )}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </Link>
        )
      })}
      <Link
        href="/api/auth/signout"
        className="flex items-center gap-2 text-sm font-medium text-slate-600 border-b-2 border-transparent hover:text-primary transition-colors h-14 px-1"
      >
        <LogOut className="w-4 h-4" />
        Keluar
      </Link>
    </nav>
  )
}
