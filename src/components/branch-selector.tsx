"use client";
import * as React from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { MapPin } from "lucide-react";

export function BranchSelector({ branches, selectedBranchId, action }: { branches: { id: string; name: string }[]; selectedBranchId?: string; action: (formData: FormData) => void }) {
  const formRef = React.useRef<HTMLFormElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = React.useState<string | undefined>(selectedBranchId);
  React.useEffect(() => {
    setValue(selectedBranchId);
    if (inputRef.current && selectedBranchId) inputRef.current.value = selectedBranchId;
  }, [selectedBranchId]);
  return (
    <form action={action} ref={formRef} className="flex items-center gap-2">
      <input ref={inputRef} type="hidden" name="branchId" defaultValue={selectedBranchId ?? ""} />
      <Select value={value} onValueChange={(v) => { setValue(v); if (inputRef.current) inputRef.current.value = v; formRef.current?.requestSubmit(); }}>
        <SelectTrigger className="w-full">
          <MapPin className="size-4 opacity-70" />
          <SelectValue placeholder="Pilih branch" />
        </SelectTrigger>
        <SelectContent>
          {branches.map((b) => (
            <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </form>
  );
}
