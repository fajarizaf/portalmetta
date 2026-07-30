"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FileText,
  Calendar,
  CreditCard,
  History,
  Info,
  Play,
  Pause,
  RefreshCw,
  Plus,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { GenerateInvoiceDialog } from "./generate-invoice-dialog";
import { RenewSubscriptionDialog } from "./renew-subscription-dialog";
import { useRouter } from "next/navigation";

interface SubscriptionDetailViewProps {
  subscriptionId: string;
  subscriptionRecord: any;
  customerRecord?: any;
  salesOrderRecord?: any;
}

export function SubscriptionDetailView({
  subscriptionId,
  subscriptionRecord,
  customerRecord,
  salesOrderRecord,
}: SubscriptionDetailViewProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [metrics, setMetrics] = useState<any>(null);
  const [schedules, setSchedules] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [generateInvoiceOpen, setGenerateInvoiceOpen] = useState(false);
  const [renewOpen, setRenewOpen] = useState(false);
  const router = useRouter();

  const subData = (subscriptionRecord?.data ?? {}) as Record<string, any>;
  const status = subscriptionRecord?.status || subData.status || "Active";

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Schedules & Metrics
      const schRes = await fetch(`/api/subscriptions/${subscriptionId}/billing-schedules`);
      if (schRes.ok) {
        const schData = await schRes.json();
        setSchedules(schData.schedules || []);
        setMetrics(schData.metrics || null);
      }

      // Fetch Invoices
      const soId = subData.sales_order_id;
      if (soId) {
        const soRes = await fetch(`/api/sales-orders/${soId}/subscription`);
        if (soRes.ok) {
          const soData = await soRes.json();
          setInvoices(soData.invoices || []);
        }
      }
    } catch (err) {
      console.error("Error fetching subscription details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [subscriptionId]);

  const formatIDR = (val: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val || 0);

  const handleToggleSuspend = async () => {
    setActionLoading(true);
    try {
      const action = status === "Active" ? "suspend" : "resume";
      const res = await fetch(`/api/subscriptions/${subscriptionId}/actions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });

      if (res.ok) {
        fetchData();
        router.refresh();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setActionLoading(false);
    }
  };

  const handlePayInvoice = async (invoiceId: string) => {
    try {
      const res = await fetch(`/api/invoices/${invoiceId}/payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "pay" }),
      });
      if (res.ok) {
        fetchData();
        router.refresh();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCancelInvoice = async (invoiceId: string) => {
    if (!confirm("Apakah Anda yakin ingin membatalkan Invoice ini? Status Billing Schedule akan kembali ke Pending/Ready.")) return;
    try {
      const res = await fetch(`/api/invoices/${invoiceId}/payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "cancel" }),
      });
      if (res.ok) {
        fetchData();
        router.refresh();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const activityTimeline = (() => {
    const arr = Array.isArray(subData.__activity) ? subData.__activity : [];
    return [
      { at: subscriptionRecord.createdAt, text: `Subscription dibuat dari Sales Order ${salesOrderRecord?.code || ""}` },
      ...arr,
    ];
  })();

  return (
    <div className="space-y-6">
      {/* Header Actions & Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-slate-900 font-mono">
              {subscriptionRecord.code || subData.subscription_no}
            </h2>
            <Badge
              variant="outline"
              className={
                status === "Active"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : status === "Suspended"
                  ? "bg-amber-50 text-amber-700 border-amber-200"
                  : "bg-slate-100 text-slate-600"
              }
            >
              {status}
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Service: <span className="font-medium text-slate-800">{subData.service_name || "-"}</span> | Customer:{" "}
            <span className="font-medium text-slate-800">{customerRecord?.name || subData.customer_id || "-"}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" onClick={() => setGenerateInvoiceOpen(true)}>
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            Generate Invoice
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => setActiveTab("schedule")}
          >
            <Calendar className="h-3.5 w-3.5 mr-1.5" />
            Lihat Billing Schedule
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={handleToggleSuspend}
            disabled={actionLoading}
          >
            {actionLoading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : status === "Active" ? (
              <>
                <Pause className="h-3.5 w-3.5 mr-1.5 text-amber-600" />
                Suspend
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 mr-1.5 text-emerald-600" />
                Resume
              </>
            )}
          </Button>

          <Button size="sm" variant="outline" onClick={() => setRenewOpen(true)}>
            <RefreshCw className="h-3.5 w-3.5 mr-1.5 text-blue-600" />
            Renew Subscription
          </Button>
        </div>
      </div>

      {/* Summary Metrics Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="border-slate-200/80 shadow-sm">
          <CardContent className="p-4">
            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Total Contract Value</p>
            <p className="text-lg font-bold text-slate-900 mt-1">{formatIDR(metrics?.totalContractValue)}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">{subData.contract_duration || 12} Bulan Kontrak</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 shadow-sm">
          <CardContent className="p-4">
            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Total Recurring (MRC)</p>
            <p className="text-lg font-bold text-blue-600 mt-1">{formatIDR(metrics?.totalMrc)} / bln</p>
            <p className="text-[10px] text-slate-400 mt-0.5">NRC: {formatIDR(metrics?.totalNrc)}</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 shadow-sm">
          <CardContent className="p-4">
            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Total Invoiced / Paid</p>
            <p className="text-lg font-bold text-emerald-600 mt-1">{formatIDR(metrics?.totalInvoiced)}</p>
            <p className="text-[10px] text-emerald-600 mt-0.5">Lunas: {formatIDR(metrics?.totalPaid)}</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200/80 shadow-sm">
          <CardContent className="p-4">
            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Outstanding / Next Bill</p>
            <p className="text-lg font-bold text-amber-600 mt-1">{formatIDR(metrics?.outstanding)}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Next: {metrics?.nextBillingDate || "-"}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-slate-100 p-1 border border-slate-200/80 rounded-xl grid grid-cols-5 w-full">
          <TabsTrigger value="overview" className="text-xs">
            <Info className="h-3.5 w-3.5 mr-1.5" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="schedule" className="text-xs">
            <Calendar className="h-3.5 w-3.5 mr-1.5" />
            Billing Schedule ({schedules.length})
          </TabsTrigger>
          <TabsTrigger value="invoice" className="text-xs">
            <FileText className="h-3.5 w-3.5 mr-1.5" />
            Invoice ({invoices.length})
          </TabsTrigger>
          <TabsTrigger value="payment" className="text-xs">
            <CreditCard className="h-3.5 w-3.5 mr-1.5" />
            Payment History
          </TabsTrigger>
          <TabsTrigger value="activity" className="text-xs">
            <History className="h-3.5 w-3.5 mr-1.5" />
            Activity Log
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Overview */}
        <TabsContent value="overview" className="mt-4 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900 border-b pb-3 mb-4">Informasi Kontrak Subscription</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
              <div>
                <span className="text-slate-500">Nomor Subscription:</span>
                <p className="font-semibold text-slate-900 font-mono mt-0.5">{subscriptionRecord.code || subData.subscription_no}</p>
              </div>

              <div>
                <span className="text-slate-500">Sales Order Referensi:</span>
                <p className="mt-0.5">
                  {salesOrderRecord ? (
                    <Link
                      href={`/admin/docs/sales_order/${salesOrderRecord.id}`}
                      className="text-primary font-medium hover:underline flex items-center gap-1"
                    >
                      <span>{salesOrderRecord.code || salesOrderRecord.id}</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  ) : (
                    <span className="text-slate-800 font-medium">{subData.sales_order_id || "-"}</span>
                  )}
                </p>
              </div>

              <div>
                <span className="text-slate-500">Customer:</span>
                <p className="font-semibold text-slate-900 mt-0.5">{customerRecord?.name || subData.customer_id || "-"}</p>
              </div>

              <div>
                <span className="text-slate-500">Periode Kontrak:</span>
                <p className="font-semibold text-slate-900 mt-0.5">
                  {subData.start_date || "-"} s/d {subData.end_date || "-"} ({subData.contract_duration || 12} Bulan)
                </p>
              </div>

              <div>
                <span className="text-slate-500">Billing Cycle:</span>
                <p className="font-semibold text-slate-900 mt-0.5">{subData.frequency || "Monthly"}</p>
              </div>

              <div>
                <span className="text-slate-500">Auto Renewal:</span>
                <p className="mt-0.5">
                  <Badge variant="outline" className={subData.auto_renewal !== false ? "bg-emerald-50 text-emerald-700" : "bg-slate-100"}>
                    {subData.auto_renewal !== false ? "Aktif" : "Non-Aktif"}
                  </Badge>
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Tab 2: Billing Schedule */}
        <TabsContent value="schedule" className="mt-4">
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50 border-b flex items-center justify-between">
              <div>
                <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Jadwal Penagihan (Billing Schedule)</h3>
                <p className="text-[11px] text-slate-500">Daftar seluruh charge NRC & MRC yang dijadwalkan dalam periode kontrak</p>
              </div>
              <Button size="sm" onClick={() => setGenerateInvoiceOpen(true)}>
                <Plus className="h-3.5 w-3.5 mr-1.5" />
                Generate Invoice Dari Schedule
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 border-b text-slate-600 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Item Layanan</th>
                    <th className="py-3 px-4">Jenis Charge</th>
                    <th className="py-3 px-4">Periode Billing</th>
                    <th className="py-3 px-4">Jatuh Tempo</th>
                    <th className="py-3 px-4 text-right">Jumlah (IDR)</th>
                    <th className="py-3 px-4">Referens Invoice</th>
                    <th className="py-3 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {schedules.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-6 text-center text-slate-400">
                        Belum ada Billing Schedule yang di-generate.
                      </td>
                    </tr>
                  ) : (
                    schedules.map((sch) => (
                      <tr key={sch.id} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4 font-medium text-slate-900">{sch.itemName}</td>
                        <td className="py-3 px-4">
                          <Badge
                            variant="outline"
                            className={
                              sch.chargeType === "NRC"
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : "bg-blue-50 text-blue-700 border-blue-200"
                            }
                          >
                            {sch.chargeType}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          {sch.billingPeriodStart} - {sch.billingPeriodEnd}
                        </td>
                        <td className="py-3 px-4 text-slate-600">{sch.dueDate}</td>
                        <td className="py-3 px-4 text-right font-semibold text-slate-900">{formatIDR(sch.amount)}</td>
                        <td className="py-3 px-4">
                          {sch.invoiceCode ? (
                            <span className="font-mono text-primary font-medium">{sch.invoiceCode}</span>
                          ) : (
                            <span className="text-slate-400">-</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Badge
                            variant="outline"
                            className={
                              sch.status === "Ready"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : sch.status === "Invoiced"
                                ? "bg-purple-50 text-purple-700 border-purple-200"
                                : sch.status === "Paid"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-slate-100 text-slate-600"
                            }
                          >
                            {sch.status}
                          </Badge>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Tab 3: Invoice */}
        <TabsContent value="invoice" className="mt-4">
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50 border-b">
              <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Riwayat Invoice Subscription</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 border-b text-slate-600 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Nomor Invoice</th>
                    <th className="py-3 px-4">Tanggal Invoice</th>
                    <th className="py-3 px-4">Periode Billing</th>
                    <th className="py-3 px-4 text-right">Subtotal</th>
                    <th className="py-3 px-4 text-right">Total (Inc PPN)</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {invoices.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-6 text-center text-slate-400">
                        Belum ada Invoice yang diterbitkan untuk Subscription ini.
                      </td>
                    </tr>
                  ) : (
                    invoices.map((inv) => {
                      const d = (inv.data ?? {}) as Record<string, any>;
                      const invStatus = inv.status || d.status;

                      return (
                        <tr key={inv.id} className="hover:bg-slate-50/50">
                          <td className="py-3 px-4 font-mono font-semibold text-primary">
                            <Link href={`/admin/docs/invoice/${inv.id}`} className="hover:underline flex items-center gap-1">
                              <span>{inv.code || d.invoice_number}</span>
                              <ExternalLink className="h-3 w-3" />
                            </Link>
                          </td>
                          <td className="py-3 px-4 text-slate-600">{d.invoice_date || "-"}</td>
                          <td className="py-3 px-4 text-slate-600">
                            {d.billing_period_start || "-"} - {d.billing_period_end || "-"}
                          </td>
                          <td className="py-3 px-4 text-right text-slate-700">{formatIDR(d.subtotal)}</td>
                          <td className="py-3 px-4 text-right font-bold text-slate-900">{formatIDR(d.total_amount)}</td>
                          <td className="py-3 px-4 text-center">
                            <Badge
                              variant="outline"
                              className={
                                invStatus === "Paid"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : invStatus === "Cancelled"
                                  ? "bg-red-50 text-red-700 border-red-200"
                                  : "bg-amber-50 text-amber-700 border-amber-200"
                              }
                            >
                              {invStatus}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            {invStatus !== "Paid" && invStatus !== "Cancelled" && (
                              <>
                                <Button size="sm" className="h-7 text-xs px-2" variant="outline" onClick={() => handlePayInvoice(inv.id)}>
                                  Tandai Lunas
                                </Button>
                                <Button size="sm" className="h-7 text-xs px-2" variant="destructive" onClick={() => handleCancelInvoice(inv.id)}>
                                  Batal
                                </Button>
                              </>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Tab 4: Payment */}
        <TabsContent value="payment" className="mt-4">
          <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900 border-b pb-3 mb-4">Riwayat Pembayaran (Payment Logs)</h3>
            <div className="space-y-3">
              {invoices.filter((i) => i.status === "Paid" || (i.data as any)?.paid_at).length === 0 ? (
                <p className="text-xs text-slate-400 py-4 text-center">Belum ada riwayat pembayaran yang tercatat.</p>
              ) : (
                invoices
                  .filter((i) => i.status === "Paid" || (i.data as any)?.paid_at)
                  .map((inv) => {
                    const d = (inv.data ?? {}) as Record<string, any>;
                    return (
                      <div key={inv.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border text-xs">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                          <div>
                            <p className="font-semibold text-slate-900">Pembayaran Invoice {inv.code || d.invoice_number}</p>
                            <p className="text-slate-500">Tanggal Bayar: {d.paid_at ? new Date(d.paid_at).toLocaleDateString("id-ID") : "-"}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-emerald-700 text-sm">{formatIDR(d.total_amount)}</p>
                          <p className="text-slate-400">Bank Transfer</p>
                        </div>
                      </div>
                    );
                  })
              )}
            </div>
          </div>
        </TabsContent>

        {/* Tab 5: Activity */}
        <TabsContent value="activity" className="mt-4">
          <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900 border-b pb-3 mb-4">Activity & Audit Timeline</h3>
            <div className="space-y-4">
              {activityTimeline.map((item, idx) => (
                <div key={idx} className="flex gap-3 text-xs">
                  <div className="mt-1 size-2 rounded-full bg-primary shrink-0" />
                  <div>
                    <p className="font-medium text-slate-800">{item.text}</p>
                    <p className="text-slate-400 text-[11px]">
                      {new Date(item.at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Dialog Modals */}
      <GenerateInvoiceDialog
        open={generateInvoiceOpen}
        onOpenChange={setGenerateInvoiceOpen}
        subscriptionId={subscriptionId}
        schedules={schedules}
        onSuccess={fetchData}
      />

      <RenewSubscriptionDialog
        open={renewOpen}
        onOpenChange={setRenewOpen}
        subscriptionId={subscriptionId}
        currentEndDate={subData.end_date}
        currentMrc={subData.total_mrc}
        onSuccess={fetchData}
      />
    </div>
  );
}
