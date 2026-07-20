"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    return <div className="text-sm text-muted-foreground">Dashboard</div>;
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      {trail.map((seg, i) => {
        const href = `/${[...segments.slice(0, adminIndex + 1), ...trail.slice(0, i + 1)].join("/")}`;
        const isLast = i === trail.length - 1;
        return (
          <React.Fragment key={href}>
            {i > 0 && <span className="text-muted-foreground">/</span>}
            {isLast ? (
              <span className="font-medium">{toTitle(seg)}</span>
            ) : (
              <Link href={href} className="text-muted-foreground hover:text-foreground">
                {toTitle(seg)}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}