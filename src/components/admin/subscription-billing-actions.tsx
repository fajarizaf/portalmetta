"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProrateResult {
  totalAmount: number;
  breakdown: {
    description: string;
    amount: number;
    days: number;
    dailyRate: number;
    totalDays: number;
  }[];
  periodStart: string | Date;
  periodEnd: string | Date;
}

interface BillingPreview {
  subscriptionCode: string | null;
  serviceName: string;
  mrc: number;
  frequency: string;
  startDate: string;
  prorate: ProrateResult;
  subtotal: number;
  tax: number;
  total: number;
  formattedSubtotal: string;
  formattedTax: string;
  formattedTotal: string;
  formattedMrc: string;
}

interface SubscriptionBillingActionsProps {
  subscriptionId: string;
  preview: BillingPreview;
}

export function SubscriptionBillingActions({ subscriptionId, preview }: SubscriptionBillingActionsProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [lastMode, setLastMode] = useState<"recurring" | "setup">("recurring");
  const router = useRouter();

  const handleGenerateInvoice = async (mode: "recurring" | "setup") => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setLastMode(mode);

    try {
      const response = await fetch("/api/billing/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscriptionId,
          sendEmail: false,
          mode,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to generate invoice");
      }

      setSuccess(true);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Billing Preview (Prorate)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {preview.prorate.breakdown.map((item, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{item.description}</span>
              <span className="font-medium">
                {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(item.amount)}
              </span>
            </div>
          ))}
          <div className="pt-2 border-t flex justify-between font-bold">
            <span>Subtotal</span>
            <span>{preview.formattedSubtotal}</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Tax (11%)</span>
            <span>{preview.formattedTax}</span>
          </div>
          <div className="flex justify-between text-lg font-bold text-primary">
            <span>Total Tagihan</span>
            <span>{preview.formattedTotal}</span>
          </div>
        </div>

        <div className="pt-2">
          {success ? (
            <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 p-3 rounded-md border border-green-200">
              <CheckCircle2 className="h-4 w-4" />
              {lastMode === "setup" ? "Setup invoice berhasil di-generate." : "Invoice berhasil di-generate."}
            </div>
          ) : error ? (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-md border border-red-200">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2">
              <Button
                className="w-full"
                onClick={() => handleGenerateInvoice("recurring")}
                disabled={loading}
              >
                {loading && lastMode === "recurring" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Invoice"
                )}
              </Button>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => handleGenerateInvoice("setup")}
                disabled={loading}
              >
                {loading && lastMode === "setup" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Setup Invoice"
                )}
              </Button>
            </div>
          )}
        </div>
        <p className="text-[10px] text-muted-foreground text-center">
          * Penagihan rutin selanjutnya akan dilakukan otomatis setiap tanggal 1 awal bulan.
        </p>
      </CardContent>
    </Card>
  );
}
