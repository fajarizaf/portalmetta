"use client";

import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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
    <div className="max-w-sm">
      <Input
        placeholder="Cari nama, email, atau company..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
    </div>
  );
}
