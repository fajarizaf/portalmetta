"use client"

import * as React from "react"
import { Bell } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

interface NotificationItem {
  at: string
  text: string
  recordId: string
  docTypeKey: string
}

interface NotificationPopoverProps {
  items: NotificationItem[]
}

export function NotificationPopover({ items }: NotificationPopoverProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className="relative outline-none">
          <Bell className="w-5 h-5 text-slate-600 hover:text-slate-900 transition-colors" />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifikasi</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.length === 0 ? (
          <div className="p-4 text-sm text-center text-muted-foreground">
            Tidak ada notifikasi baru
          </div>
        ) : (
          <div className="max-h-[300px] overflow-y-auto">
            {items.map((item, i) => (
              <DropdownMenuItem key={i} asChild>
                <Link
                  href={`/customer/docs/${item.docTypeKey}/${item.recordId}`}
                  className="flex flex-col items-start gap-1 p-3 cursor-pointer"
                >
                  <span className="text-sm font-medium leading-tight">
                    {item.text}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(item.at).toLocaleString("id-ID", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                </Link>
              </DropdownMenuItem>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
