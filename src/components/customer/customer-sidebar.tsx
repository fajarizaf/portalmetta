import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { ChevronDown, FileText, CreditCard, User, ArrowRightLeft, LayoutGrid } from "lucide-react"

export async function CustomerSidebar({ roleId }: { roleId: string }) {
  const docTypesAll = await prisma.docType.findMany({
    include: { permissions: true },
    orderBy: { name: "asc" }
  });

  const accessibleDocTypes = docTypesAll.filter(dt => {
    const isHidden = [
      "goods_in_item",
      "goods_out_item",
      "goods_in_request",
      "goods_out_request",
      "support_ticket",
      "ticket_message",
      "visitor_request",
      "visitor_request_item",
      "request",
      "coc_item",
      "cross_connect"
    ].includes(dt.key);
    return !isHidden && dt.permissions.some(p => p.roleId === roleId && p.canRead);
  });

  const hasGoodsIn = docTypesAll.some(dt => dt.key === "goods_in_request");
  const hasGoodsOut = docTypesAll.some(dt => dt.key === "goods_out_request");
  const showGoodsMovement = hasGoodsIn || hasGoodsOut;

  return (
    <div className="lg:col-span-3 space-y-6">
      {/* Main Navigation */}
      <div className="bg-white rounded-xl border border-slate-200/60 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="p-3">
          <p className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Navigation</p>
          <nav className="space-y-0.5">
            <Link
              href="/customer/my-racks"
              className="group flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-all duration-200"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-slate-500 group-hover:bg-slate-900 group-hover:text-white transition-all duration-200">
                <LayoutGrid className="w-4 h-4" />
              </div>
              <span>Rack Management</span>
            </Link>

            {showGoodsMovement && (
              <Link
                href="/customer/inbound-outbound"
                className="group flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-all duration-200"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-slate-500 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-200">
                  <ArrowRightLeft className="w-4 h-4" />
                </div>
                <span>Inbound & Outbound</span>
              </Link>
            )}

            <Link
              href="/customer/billing"
              className="group flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-all duration-200"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-slate-500 group-hover:bg-amber-500 group-hover:text-white transition-all duration-200">
                <CreditCard className="w-4 h-4" />
              </div>
              <span>Billing</span>
            </Link>

            <Link
              href="/customer/account"
              className="group flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-all duration-200"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-slate-500 group-hover:bg-violet-600 group-hover:text-white transition-all duration-200">
                <User className="w-4 h-4" />
              </div>
              <span>My Account</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Documents Section */}
      <div className="bg-white rounded-xl border border-slate-200/60 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="p-3">
          <p className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Documents</p>
          <div className="space-y-0.5">
            {accessibleDocTypes.length > 0 ? (
              accessibleDocTypes.map((dt) => (
                <Link
                  key={dt.id}
                  href={`/customer/docs/${dt.key}`}
                  className="flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-all duration-200"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  <span>{dt.key === "coc" ? "COC" : dt.name}</span>
                </Link>
              ))
            ) : (
              <p className="px-3 py-3 text-sm text-slate-400 italic">No documents available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
