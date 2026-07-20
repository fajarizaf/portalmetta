"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function TabsBar() {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();

  React.useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("locationTab") : null;
    const current = search.get("t");
    if (!current && saved) {
      const params = new URLSearchParams(search.toString());
      params.set("t", saved);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [pathname, router, search]);

  const setTab = (val: string) => {
    const params = new URLSearchParams(search.toString());
    params.set("t", val);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    try {
      localStorage.setItem("locationTab", val);
    } catch {}
  };

  const current = search.get("t") ?? "branch";

  return (
    <div className="flex gap-2">
      <Button
        type="button"
        variant={current === "branch" ? "default" : "ghost"}
        className={cn(current === "branch" ? "ring-2 ring-ring shadow-md font-semibold" : "opacity-70")}
        onClick={() => setTab("branch")}
      >
        Branch
      </Button>
      <Button
        type="button"
        variant={current === "building" ? "default" : "ghost"}
        className={cn(current === "building" ? "ring-2 ring-ring shadow-md font-semibold" : "opacity-70")}
        onClick={() => setTab("building")}
      >
        Building
      </Button>
      <Button
        type="button"
        variant={current === "floor" ? "default" : "ghost"}
        className={cn(current === "floor" ? "ring-2 ring-ring shadow-md font-semibold" : "opacity-70")}
        onClick={() => setTab("floor")}
      >
        Floor
      </Button>
      <Button
        type="button"
        variant={current === "room" ? "default" : "ghost"}
        className={cn(current === "room" ? "ring-2 ring-ring shadow-md font-semibold" : "opacity-70")}
        onClick={() => setTab("room")}
      >
        Room
      </Button>
    </div>
  );
}