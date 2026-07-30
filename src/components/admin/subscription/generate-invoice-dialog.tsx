"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Loader2, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface BillingScheduleItem {
  id: string;
  itemName: string;
  chargeType: string;
  billingPeriodStart: string;
  billingPeriodEnd: string;
  dueDate: string;
  amount: number;
  invoiceId?: string | null;
  invoiceCode?: string | null;
  status: string;
}

interface GenerateInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subscriptionId: string;
  schedules: BillingScheduleItem[];
  onSuccess?: () => void;
}

export function GenerateInvoiceDialog({
  open,
  onOpenChange,
  subscriptionId,
  schedules,
  onSuccess,
}: GenerateInvoiceDialogProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Filter available schedules (Pending or Ready)
  const availableSchedules = schedules.filter(
    (s) => s.status === "Pending" || s.status === "Ready"
  );

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === availableSchedules.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(availableSchedules.map((s) => s.id));
    }
  };

  const selectedSchedules = schedules.filter((s) => selectedIds.includes(s.id));
  const subtotal = selectedSchedules.reduce((acc, s) => acc + s.amount, 0);
  const tax = Math.round(subtotal * 0.11);
  const totalAmount = subtotal + tax;

  const formatIDR = (val: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);

  const handleGenerate = async () => {
    if (selectedIds.length === 0) {
      setError("Pilih setidaknya satu jadwal tagihan.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/subscriptions/${subscriptionId}/generate-invoice`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scheduleIds: selectedIds }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Gagal membuat Invoice.");
      }

      onOpenChange(false);
      setSelectedIds([]);
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
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold">
            <FileText className="h-5 w-5 text-primary" />
            Generate Invoice dari Billing Schedule
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <p className="text-xs text-slate-500">
            Pilih satu atau beberapa Billing Schedule yang belum ditagihkan (Pending/Ready) untuk digabungkan menjadi satu dokumen Invoice.
          </p>

          {error && (
            <div className="flex items-center gap-2 p-3 text-xs bg-red-50 text-red-700 rounded-md border border-red-200">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="border rounded-lg overflow-hidden bg-white">
            <div className="flex items-center justify-between p-3 bg-slate-50 border-b text-xs font-semibold text-slate-700">
              <div
                className="flex items-center gap-2 cursor-pointer select-none"
                onClick={toggleSelectAll}
              >
                <div onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={availableSchedules.length > 0 && selectedIds.length === availableSchedules.length}
                    onCheckedChange={toggleSelectAll}
                    disabled={availableSchedules.length === 0}
                  />
                </div>
                <span>Pilih Semua Billing Schedule ({availableSchedules.length} tersedia)</span>
              </div>
              <span>Subtotal Dipilih: {formatIDR(subtotal)}</span>
            </div>

            <div className="divide-y max-h-60 overflow-y-auto">
              {schedules.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-500">
                  Tidak ada Billing Schedule.
                </div>
              ) : (
                schedules.map((item) => {
                  const isSelectable = item.status === "Pending" || item.status === "Ready";
                  const isChecked = selectedIds.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      className={`flex items-center justify-between p-3 text-xs transition-colors select-none ${
                        !isSelectable ? "bg-slate-50/50 opacity-60 cursor-not-allowed" : "hover:bg-slate-50 cursor-pointer"
                      }`}
                      onClick={() => {
                        if (isSelectable) toggleSelect(item.id);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            checked={isChecked}
                            disabled={!isSelectable}
                            onCheckedChange={() => {
                              if (isSelectable) toggleSelect(item.id);
                            }}
                          />
                        </div>
                        <div>
                          <div className="font-medium text-slate-900 flex items-center gap-2">
                            <span>{item.itemName}</span>
                            <Badge
                              variant="outline"
                              className={
                                item.chargeType === "NRC"
                                  ? "bg-amber-50 text-amber-700 border-amber-200"
                                  : "bg-blue-50 text-blue-700 border-blue-200"
                              }
                            >
                              {item.chargeType}
                            </Badge>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            Periode: {item.billingPeriodStart} - {item.billingPeriodEnd} | Jatuh Tempo: {item.dueDate}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-semibold text-slate-900">{formatIDR(item.amount)}</div>
                        <Badge
                          variant="outline"
                          className={
                            item.status === "Ready"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : item.status === "Invoiced"
                              ? "bg-purple-50 text-purple-700 border-purple-200"
                              : item.status === "Paid"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-slate-100 text-slate-600"
                          }
                        >
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Billing Preview Summary Card */}
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200/80 space-y-2">
            <div className="flex justify-between text-xs text-slate-600">
              <span>Subtotal ({selectedIds.length} item)</span>
              <span className="font-medium">{formatIDR(subtotal)}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-600">
              <span>PPN (11%)</span>
              <span className="font-medium">{formatIDR(tax)}</span>
            </div>
            <div className="pt-2 border-t flex justify-between text-sm font-bold text-slate-900">
              <span>Total Invoice</span>
              <span className="text-primary">{formatIDR(totalAmount)}</span>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Batal
          </Button>
          <Button onClick={handleGenerate} disabled={loading || selectedIds.length === 0}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Memproses...
              </>
            ) : (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Buat Invoice ({selectedIds.length})
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
