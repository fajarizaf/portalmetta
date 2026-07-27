"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

function toTitle(segment: string) {
  return segment
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

export function AdminBreadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const adminIndex = segments.indexOf("admin");
  const trail = adminIndex >= 0 ? segments.slice(adminIndex + 1) : segments;

  if (trail.length === 0) {
    return <div className="text-[13px] font-medium text-slate-900">Dashboard</div>;
  }

  return (
    <div className="flex items-center gap-1.5 text-[13px]">
      <Link
        href="/admin"
        className="text-slate-400 hover:text-slate-900 transition-colors"
      >
        Dashboard
      </Link>
      {trail.map((seg, i) => {
        const href = `/${[...segments.slice(0, adminIndex + 1), ...trail.slice(0, i + 1)].join("/")}`;
        const isLast = i === trail.length - 1;
        return (
          <React.Fragment key={href}>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            {isLast ? (
              <span className="font-medium text-slate-900">{toTitle(seg)}</span>
            ) : (
              <Link href={href} className="text-slate-400 hover:text-slate-900 transition-colors">
                {toTitle(seg)}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
