"use client";
import * as React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { SearchableSelect } from "@/components/ui/select";

type Branch = { id: string; name: string; companyId?: string | null };
type Company = { id: string; name: string };

export function CompanyBranchFields({
  companies,
  branches,
  isSuper,
  defaultCompanyId,
  defaultSelectedBranchId,
  selectedBranchIds,
  selectId,
  showCompanySelect = true,
}: {
  companies?: Company[];
  branches: Branch[];
  isSuper: boolean;
  defaultCompanyId?: string;
  defaultSelectedBranchId?: string;
  selectedBranchIds?: Set<string>;
  selectId: string;
  showCompanySelect?: boolean;
}) {
  const [companyId, setCompanyId] = React.useState<string>(defaultCompanyId ?? "");
  const initialSelected = React.useMemo(() => {
    if (selectedBranchIds && selectedBranchIds.size > 0) return new Set(selectedBranchIds);
    if (defaultSelectedBranchId) return new Set([defaultSelectedBranchId]);
    return new Set<string>();
  }, [selectedBranchIds, defaultSelectedBranchId]);
  const [selected, setSelected] = React.useState<Set<string>>(initialSelected);
  const [query, setQuery] = React.useState<string>("");
  const filtered = branches
    .filter((b) => !companyId || b.companyId === companyId)
    .filter((b) => (query ? b.name.toLowerCase().includes(query.toLowerCase()) : true));

  return (
    <div className="space-y-3">
      {showCompanySelect ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor={selectId}>Company</Label>
            <SearchableSelect name="companyId" value={companyId} onValueChange={setCompanyId} disabled={!isSuper} options={(companies ?? []).map((c) => ({ label: c.name, value: c.id }))} />
          </div>
        </div>
      ) : null}

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Assign ke Branch</Label>
          <Badge variant="outline">{selected.size} dipilih</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Input placeholder="Cari branch" value={query} onChange={(e) => setQuery(e.target.value)} />
          <Button type="button" variant="ghost" onClick={() => {
            const setNew = new Set(selected);
            for (const b of filtered) setNew.add(b.id);
            setSelected(setNew);
          }}>Pilih semua</Button>
          <Button type="button" variant="ghost" onClick={() => setSelected(new Set())}>Bersihkan</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
          {filtered.map((b) => {
            const checked = selected.has(b.id);
            return (
              <label key={b.id} className="flex items-center gap-2">
                <Checkbox checked={checked} onCheckedChange={(val) => {
                  const setNew = new Set(selected);
                  if (val) setNew.add(b.id); else setNew.delete(b.id);
                  setSelected(setNew);
                }} />
                <span>{b.name}</span>
              </label>
            );
          })}
        </div>
        {[...selected].map((id) => (
          <input key={id} type="hidden" name="branchId" value={id} />
        ))}
      </div>
    </div>
  );
}