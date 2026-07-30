"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Calendar, FileText, ExternalLink, Loader2, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";

interface SalesOrderSubscriptionTabProps {
  salesOrderId: string;
  salesOrderRecord: any;
}

export function SalesOrderSubscriptionTab({
  salesOrderId,
  salesOrderRecord,
}: SalesOrderSubscriptionTabProps) {
  const [activeTab, setActiveTab] = useState("subscription");
  const [data, setData] = useState<{ subscriptions: any[]; invoices: any[]; schedules: any[] }>({
    subscriptions: [],
    invoices: [],
    schedules: [],
  });
  const [loading, setLoading] = useState(true);
  const [genLoading, setGenLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/sales-orders/${salesOrderId}/subscription`);
      if (res.ok) {
        const json = await res.json();
        setData({
          subscriptions: json.subscriptions || [],
          invoices: json.invoices || [],
          schedules: json.schedules || [],
        });
      }
    } catch (e) {
      console.error("Error fetching Sales Order subscription tab data:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [salesOrderId]);

  const handleGenerateSubscription = async () => {
    setGenLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/sales-orders/${salesOrderId}/subscription`, {
        method: "POST",
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || "Gagal membuat Subscription.");
      }
      fetchData();
      setActiveTab("subscription");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setGenLoading(false);
    }
  };

  const formatIDR = (val: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val || 0);

  return (
    <div className="space-y-4 my-6">
      {/* Top Action Header Bar for Sales Order */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white rounded-xl border border-slate-200/80 shadow-sm gap-3">
        <div>
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Modul Subscription & Billing</h3>
          <p className="text-[11px] text-slate-500">Kelola pembuatan Subscription, Billing Schedule, dan Invoice untuk Sales Order ini</p>
        </div>

        <div className="flex items-center gap-2">
          {data.subscriptions.length === 0 ? (
            <Button size="sm" onClick={handleGenerateSubscription} disabled={genLoading}>
              {genLoading ? <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" /> : <Plus className="h-3.5 w-3.5 mr-1.5" />}
              Generate Subscription
            </Button>
          ) : (
            <Button size="sm" variant="outline" onClick={() => setActiveTab("subscription")}>
              Lihat Subscription ({data.subscriptions.length})
            </Button>
          )}

          <Button size="sm" variant="outline" onClick={() => setActiveTab("invoice")}>
            <FileText className="h-3.5 w-3.5 mr-1.5" />
            Lihat Invoice ({data.invoices.length})
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-3 text-xs bg-red-50 text-red-700 rounded-md border border-red-200">
          {error}
        </div>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-slate-100 p-1 border border-slate-200/80 rounded-xl grid grid-cols-3 w-full">
          <TabsTrigger value="subscription" className="text-xs">
            Subscription ({data.subscriptions.length})
          </TabsTrigger>
          <TabsTrigger value="invoice" className="text-xs">
            Invoice ({data.invoices.length})
          </TabsTrigger>
          <TabsTrigger value="billing" className="text-xs">
            Billing Schedule Summary ({data.schedules.length})
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Subscriptions */}
        <TabsContent value="subscription" className="mt-3">
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b text-slate-600 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Nomor Subscription</th>
                  <th className="py-3 px-4">Layanan</th>
                  <th className="py-3 px-4">Periode Kontrak</th>
                  <th className="py-3 px-4 text-right">Total MRC</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {data.subscriptions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-slate-400">
                      Belum ada Subscription yang dibuat dari Sales Order ini. Klik "Generate Subscription" di atas.
                    </td>
                  </tr>
                ) : (
                  data.subscriptions.map((sub) => {
                    const d = (sub.data ?? {}) as Record<string, any>;
                    return (
                      <tr key={sub.id} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4 font-mono font-bold text-primary">
                          <Link href={`/admin/docs/subscription_management/${sub.id}`} className="hover:underline flex items-center gap-1">
                            <span>{sub.code || d.subscription_no}</span>
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                        <td className="py-3 px-4 text-slate-800 font-medium">{d.service_name || "-"}</td>
                        <td className="py-3 px-4 text-slate-600">
                          {d.start_date} s/d {d.end_date} ({d.contract_duration || 12} Bln)
                        </td>
                        <td className="py-3 px-4 text-right font-bold text-slate-900">{formatIDR(d.total_mrc)}</td>
                        <td className="py-3 px-4 text-center">
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                            {sub.status || d.status || "Active"}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button size="sm" className="h-7 text-xs px-2" variant="outline" asChild>
                            <Link href={`/admin/docs/subscription_management/${sub.id}`}>
                              Buka Detail
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Tab 2: Invoices */}
        <TabsContent value="invoice" className="mt-3">
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b text-slate-600 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Nomor Invoice</th>
                  <th className="py-3 px-4">Tanggal</th>
                  <th className="py-3 px-4">Periode Billing</th>
                  <th className="py-3 px-4 text-right">Total Amount</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {data.invoices.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-slate-400">
                      Belum ada Invoice yang diterbitkan untuk Sales Order ini.
                    </td>
                  </tr>
                ) : (
                  data.invoices.map((inv) => {
                    const d = (inv.data ?? {}) as Record<string, any>;
                    return (
                      <tr key={inv.id} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4 font-mono font-bold text-primary">
                          <Link href={`/admin/docs/invoice/${inv.id}`} className="hover:underline flex items-center gap-1">
                            <span>{inv.code || d.invoice_number}</span>
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                        <td className="py-3 px-4 text-slate-600">{d.invoice_date || "-"}</td>
                        <td className="py-3 px-4 text-slate-600">
                          {d.billing_period_start || "-"} - {d.billing_period_end || "-"}
                        </td>
                        <td className="py-3 px-4 text-right font-bold text-slate-900">{formatIDR(d.total_amount)}</td>
                        <td className="py-3 px-4 text-center">
                          <Badge
                            variant="outline"
                            className={
                              inv.status === "Paid"
                                ? "bg-green-50 text-green-700"
                                : "bg-amber-50 text-amber-700"
                            }
                          >
                            {inv.status}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* Tab 3: Billing Summary */}
        <TabsContent value="billing" className="mt-3">
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b text-slate-600 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Item Layanan</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Jatuh Tempo</th>
                  <th className="py-3 px-4 text-right">Jumlah</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {data.schedules.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-slate-400">
                      Belum ada Billing Schedule.
                    </td>
                  </tr>
                ) : (
                  data.schedules.map((sch) => (
                    <tr key={sch.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 font-medium text-slate-900">{sch.itemName}</td>
                      <td className="py-3 px-4">{sch.chargeType}</td>
                      <td className="py-3 px-4">{sch.dueDate}</td>
                      <td className="py-3 px-4 text-right font-bold">{formatIDR(sch.amount)}</td>
                      <td className="py-3 px-4 text-center">
                        <Badge variant="outline">{sch.status}</Badge>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
