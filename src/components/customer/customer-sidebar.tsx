import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, FileText, CreditCard, User, ArrowRightLeft, LayoutGrid } from "lucide-react"

export async function CustomerSidebar({ roleId }: { roleId: string }) {
  const docTypesAll = await prisma.docType.findMany({
    include: { permissions: true },
    orderBy: { name: "asc" }
  });

  const accessibleDocTypes = docTypesAll.filter(dt => {
    // Hide child items and goods movement requests (moved to separate menu)
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

  // Check if user has access to Goods Movement (at least one of them)
  // We relax the check to ensure the menu appears if the doc types exist
  // The page itself handles permission checks
  const hasGoodsIn = docTypesAll.some(dt => dt.key === "goods_in_request");
  const hasGoodsOut = docTypesAll.some(dt => dt.key === "goods_out_request");
  const showGoodsMovement = hasGoodsIn || hasGoodsOut;

  return (
    <div className="lg:col-span-3 space-y-4">
      <Card className="border-none shadow-sm">
        <CardContent className="p-2">
          <nav className="space-y-1">
            <Link href="/customer/my-racks" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md transition-colors">
              <LayoutGrid className="w-5 h-5 text-slate-400" />
              <span>Rack Management</span>
            </Link>

            {/* Goods Movement Menu */}
            {showGoodsMovement && (
               <Link href="/customer/inbound-outbound" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md transition-colors">
                <ArrowRightLeft className="w-5 h-5 text-slate-400" />
                <span>Inbound & Outbound</span>
              </Link>
            )}

            {/* Dynamic DocTypes Menu */}
            <div className="group">
              <button className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-slate-400" />
                  <span>Documents</span>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>
              <div className="pl-12 pr-4 py-1 space-y-1">
                {accessibleDocTypes.length > 0 ? (
                  accessibleDocTypes.map((dt) => (
                    <Link 
                      key={dt.id} 
                      href={`/customer/docs/${dt.key}`}
                      className="flex items-center justify-between text-sm text-slate-600 py-1 hover:text-primary transition-colors"
                    >
                      <span>{dt.key === "coc" ? "COC" : dt.name}</span>
                    </Link>
                  ))
                ) : (
                  <div className="text-sm text-slate-400 py-1 italic">No documents</div>
                )}
              </div>
            </div>

            <Link href="/customer/billing" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md transition-colors">
              <CreditCard className="w-5 h-5 text-slate-400" />
              <span>View Billing</span>
            </Link>

            <Link href="/customer/account" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md transition-colors">
              <User className="w-5 h-5 text-slate-400" />
              <span>My Account</span>
            </Link>
          </nav>
        </CardContent>
      </Card>
    </div>
  )
}
