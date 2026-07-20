"use client";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function UserMenu({ name, email, roleName, imageUrl }: { name?: string; email?: string; roleName?: string; imageUrl?: string }) {
  const initial = (name || email || "U").charAt(0).toUpperCase();
  const isAdmin = String(roleName || "").toLowerCase().includes("admin");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className="ml-auto flex items-center gap-3 rounded-md px-2 py-1 hover:bg-accent">
          {imageUrl ? (
            <Image src={imageUrl} alt="avatar" width={32} height={32} className="size-8 rounded-full object-cover" />
          ) : (
            <div className="size-8 rounded-full bg-muted grid place-content-center text-sm font-medium">{initial}</div>
          )}
          <div className="leading-tight text-left">
            <div className="text-sm font-medium">{name || email}</div>
            <div className="text-xs text-muted-foreground">{roleName || ""}</div>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link href={isAdmin ? "/admin/settings" : "/customer/account"}>{isAdmin ? "Settings" : "My Account"}</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
            signOut({ callbackUrl: "/login" });
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
