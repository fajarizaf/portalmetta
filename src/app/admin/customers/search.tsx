"use client";

import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

export function CustomerSearch() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [term, setTerm] = useState(searchParams.get("q")?.toString() || "");

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set("q", term);
      } else {
        params.delete("q");
      }
      replace(`/admin/customers?${params.toString()}`);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [term, replace, searchParams]);

  return (
    <div className="relative w-full sm:w-80">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
      <Input
        placeholder="Cari nama, email, atau company..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="pl-9 h-9 border-slate-200 focus:border-primary focus:ring-primary/20"
      />
    </div>
  );
}
