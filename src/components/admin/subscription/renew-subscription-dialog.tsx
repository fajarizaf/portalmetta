"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, RefreshCw, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface RenewSubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subscriptionId: string;
  currentEndDate?: string;
  currentMrc?: number;
  onSuccess?: () => void;
}

export function RenewSubscriptionDialog({
  open,
  onOpenChange,
  subscriptionId,
  currentEndDate,
  currentMrc = 0,
  onSuccess,
}: RenewSubscriptionDialogProps) {
  const [months, setMonths] = useState<number>(12);
  const [mrc, setMrc] = useState<number>(currentMrc);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleRenew = async () => {
    if (months <= 0) {
      setError("Durasi perpanjangan harus lebih dari 0 bulan.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/subscriptions/${subscriptionId}/actions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "renew",
          additionalMonths: months,
          updatedMrc: mrc,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Gagal memperpanjang Subscription.");
      }

      onOpenChange(false);
      if (onSuccess) onSuccess();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            <RefreshCw className="h-5 w-5 text-primary" />
            Perpanjang Kontrak (Renewal)
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <p className="text-xs text-slate-500">
            Perpanjang durasi kontrak layanan tanpa mengubah histori kontrak dan penagihan sebelumnya.
          </p>

          {error && (
            <div className="flex items-center gap-2 p-3 text-xs bg-red-50 text-red-700 rounded-md border border-red-200">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-3">
            <div>
              <Label className="text-xs">Tanggal Berakhir Saat Ini</Label>
              <Input value={currentEndDate || "-"} disabled className="text-xs bg-slate-50" />
            </div>

            <div>
              <Label className="text-xs">Durasi Perpanjangan (Bulan)</Label>
              <Input
                type="number"
                min="1"
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="text-xs"
              />
            </div>

            <div>
              <Label className="text-xs">Nominal Monthly Recurring Charge (MRC IDR)</Label>
              <Input
                type="number"
                value={mrc}
                onChange={(e) => setMrc(Number(e.target.value))}
                className="text-xs"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Batal
          </Button>
          <Button onClick={handleRenew} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Memproses...
              </>
            ) : (
              "Konfirmasi Renewal"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
