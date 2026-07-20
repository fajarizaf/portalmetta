import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import type { PaymentModel, FieldType, PricingModel, OrderMode } from "../../../generated/prisma/enums"
import type { Prisma } from "../../../generated/prisma/client"
import SpecConfigBuilder from "@/components/products/spec-config-builder"
import PriceConfigBuilder from "@/components/products/price-config-builder"
import HtmlEditor from "@/components/products/html-editor"
import { SearchableSelect } from "@/components/ui/select"

async function createGroup(formData: FormData) {
  "use server"
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email ? await prisma.user.findUnique({ where: { email } }) : null
  if (!me) return
  const cookieStore = await cookies()
  const branchId = cookieStore.get("branchId")?.value
  const name = String(formData.get("name") || "").trim()
  const parentId = String(formData.get("parentId") || "").trim() || undefined
  const description = String(formData.get("description") || "").trim() || undefined
  if (!branchId || !name) return
  await prisma.productGroup.create({ data: { name, branchId, parentId, description } })
  const referer = (await headers()).get("referer") || "/admin/products"
  redirect(`${referer}?toast=Group%20berhasil%20dibuat`)
}

async function updateGroup(formData: FormData) {
  "use server"
  const id = String(formData.get("id") || "")
  const name = String(formData.get("name") || "").trim()
  const parentId = String(formData.get("parentId") || "").trim() || undefined
  const description = String(formData.get("description") || "").trim() || undefined
  if (!id || !name) return
  await prisma.productGroup.update({ where: { id }, data: { name, parentId, description } })
  const referer = (await headers()).get("referer") || "/admin/products"
  redirect(`${referer}?toast=Group%20berhasil%20diperbarui`)
}

async function deleteGroup(formData: FormData) {
  "use server"
  const id = String(formData.get("id") || "")
  if (!id) return
  const usage = await prisma.product.count({ where: { groupId: id } })
  if (usage > 0) {
    redirect("/admin/products?toast=Group%20digunakan%20oleh%20produk")
    return
  }
  await prisma.productGroup.delete({ where: { id } })
  const referer = (await headers()).get("referer") || "/admin/products"
  redirect(`${referer}?toast=Group%20berhasil%20dihapus`)
}

async function createProduct(formData: FormData) {
  "use server"
  const cookieStore = await cookies()
  const branchId = cookieStore.get("branchId")?.value
  const name = String(formData.get("name") || "").trim()
  const classification = String(formData.get("classification") || "").trim()
  const groupId = String(formData.get("groupId") || "").trim() || undefined
  const orderMode = String(formData.get("orderMode") || "DIRECT").trim() || "DIRECT"
  const description = String(formData.get("description") || "").trim() || undefined
  if (!branchId || !name || !classification) return
  await prisma.product.create({ data: { name, branchId, classification: classification as PaymentModel, orderMode: orderMode as OrderMode, groupId, description } })
  const referer = (await headers()).get("referer") || "/admin/products"
  redirect(`${referer}?toast=Produk%20berhasil%20dibuat`)
}

async function updateProduct(formData: FormData) {
  "use server"
  const id = String(formData.get("id") || "")
  const name = String(formData.get("name") || "").trim()
  const classification = String(formData.get("classification") || "").trim()
  const groupId = String(formData.get("groupId") || "").trim() || undefined
  const orderMode = String(formData.get("orderMode") || "DIRECT").trim() || "DIRECT"
  const active = String(formData.get("active") || "") === "on"
  const description = String(formData.get("description") || "").trim() || undefined
  if (!id || !name || !classification) return
  await prisma.product.update({
    where: { id },
    data: {
      name,
      classification: classification as PaymentModel,
      orderMode: orderMode as OrderMode,
      active,
      description,
      ...(groupId ? { group: { connect: { id: groupId } } } : { group: { disconnect: true } }),
    },
  })
  const referer = (await headers()).get("referer") || "/admin/products"
  redirect(`${referer}?toast=Produk%20berhasil%20diperbarui`)
}

async function deleteProduct(formData: FormData) {
  "use server"
  const id = String(formData.get("id") || "")
  if (!id) return
  await prisma.productSpecField.deleteMany({ where: { productId: id } })
  await prisma.productPrice.deleteMany({ where: { productId: id } })
  await prisma.product.delete({ where: { id } })
  const referer = (await headers()).get("referer") || "/admin/products"
  redirect(`${referer}?toast=Produk%20berhasil%20dihapus`)
}

async function addSpecField(formData: FormData) {
  "use server"
  const productId = String(formData.get("productId") || "")
  const key = String(formData.get("key") || "").trim()
  const label = String(formData.get("label") || "").trim()
  const type = String(formData.get("type") || "").trim()
  const required = String(formData.get("required") || "") === "on"
  const configRaw = String(formData.get("config") || "").trim()
  if (!productId || !key || !label || !type) return
  const config = configRaw ? JSON.parse(configRaw) : undefined
  await prisma.productSpecField.create({ data: { productId, key, label, type: type as FieldType, required, config } })
  const referer = (await headers()).get("referer") || "/admin/products"
  redirect(`${referer}?toast=Spesifikasi%20ditambahkan`)
}

async function updateSpecField(formData: FormData) {
  "use server"
  const id = String(formData.get("id") || "")
  const label = String(formData.get("label") || "").trim()
  const type = String(formData.get("type") || "").trim()
  const required = String(formData.get("required") || "") === "on"
  const configRaw = String(formData.get("config") || "").trim()
  if (!id || !label || !type) return
  const config = configRaw ? JSON.parse(configRaw) : undefined
  await prisma.productSpecField.update({ where: { id }, data: { label, type: type as FieldType, required, config } })
  const referer = (await headers()).get("referer") || "/admin/products"
  redirect(`${referer}?toast=Spesifikasi%20diperbarui`)
}

async function deleteSpecField(formData: FormData) {
  "use server"
  const id = String(formData.get("id") || "")
  if (!id) return
  await prisma.productSpecField.delete({ where: { id } })
  const referer = (await headers()).get("referer") || "/admin/products"
  redirect(`${referer}?toast=Spesifikasi%20dihapus`)
}

async function addPrice(formData: FormData) {
  "use server"
  const productId = String(formData.get("productId") || "")
  const currency = String(formData.get("currency") || "IDR")
  const basePrice = Number(String(formData.get("basePrice") || "0"))
  const setupFee = Number(String(formData.get("setupFee") || "0"))
  const pricingModel = String(formData.get("pricingModel") || "").trim()
  const configRaw = String(formData.get("config") || "").trim()
  if (!productId || !pricingModel) return
  const config = configRaw ? JSON.parse(configRaw) : undefined
  await prisma.productPrice.create({ data: { productId, currency, basePrice, setupFee, pricingModel: pricingModel as PricingModel, config } })
  const referer = (await headers()).get("referer") || "/admin/products"
  redirect(`${referer}?toast=Harga%20ditambahkan`)
}

async function updatePrice(formData: FormData) {
  "use server"
  const id = String(formData.get("id") || "")
  const currency = String(formData.get("currency") || "IDR")
  const basePrice = Number(String(formData.get("basePrice") || "0"))
  const setupFee = Number(String(formData.get("setupFee") || "0"))
  const pricingModel = String(formData.get("pricingModel") || "").trim()
  const configRaw = String(formData.get("config") || "").trim()
  if (!id || !pricingModel) return
  const config = configRaw ? JSON.parse(configRaw) : undefined
  await prisma.productPrice.update({ where: { id }, data: { currency, basePrice, setupFee, pricingModel: pricingModel as PricingModel, config } })
  const referer = (await headers()).get("referer") || "/admin/products"
  redirect(`${referer}?toast=Harga%20diperbarui`)
}

async function deletePrice(formData: FormData) {
  "use server"
  const id = String(formData.get("id") || "")
  if (!id) return
  await prisma.productPrice.delete({ where: { id } })
  const referer = (await headers()).get("referer") || "/admin/products"
  redirect(`${referer}?toast=Harga%20dihapus`)
}

export default async function ProductsPage() {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key))
  if (!perm.has("ADMIN_PANEL_ACCESS")) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Product Management</h1>
        <p>Anda tidak memiliki permission untuk mengakses halaman ini.</p>
      </div>
    )
  }
  const cookieStore = await cookies()
  const cookieBranchId = cookieStore.get("branchId")?.value
  const assigned = me ? await prisma.branch.findMany({ where: { admins: { some: { userId: me.id } } }, orderBy: { name: "asc" } }) : []
  const branches = assigned.length > 0 ? assigned : await prisma.branch.findMany({ where: { companyId: me?.companyId ?? undefined }, orderBy: { name: "asc" } })
  const allowedBranchIds = new Set(branches.map((b) => b.id))
  const candidateBranchId = cookieBranchId ?? branches[0]?.id
  const selectedBranchId = allowedBranchIds.has(String(candidateBranchId)) ? candidateBranchId : branches[0]?.id
  const q = ""
  const model = undefined as string | undefined
  const groupFilter = undefined as string | undefined
  let groups: Awaited<ReturnType<typeof prisma.productGroup.findMany>> = []
  type ProductWithRelations = Prisma.ProductGetPayload<{ include: { group: true, specs: true, prices: true } }>
  let products: ProductWithRelations[] = []
  try {
    groups = await prisma.productGroup.findMany({ where: { branchId: selectedBranchId }, orderBy: { name: "asc" } })
    products = await prisma.product.findMany({ where: { branchId: selectedBranchId }, include: { group: true, specs: true, prices: true }, orderBy: { name: "asc" } })
  } catch {
    groups = []
    products = []
  }
  const allDocTypes = await prisma.docType.findMany({ orderBy: { name: "asc" }, include: { fields: { orderBy: { order: "asc" } } } })
  const docTypeInfos = allDocTypes.map((d) => ({ key: d.key, name: d.name, fields: d.fields.map((f) => ({ key: f.key, label: f.label })) }))
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Product Management</h1>
      {selectedBranchId ? (
        <p className="text-sm text-muted-foreground">Branch aktif: {branches.find((b) => b.id === selectedBranchId)?.name ?? "(tidak ditemukan)"}</p>
      ) : (
        <p className="text-sm text-muted-foreground">Tidak ada branch yang tersedia.</p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Tambah Group</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Group</DialogTitle>
            </DialogHeader>
            <form action={createGroup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="group_name">Nama</Label>
                <Input id="group_name" name="name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="group_parent">Parent Group</Label>
                <SearchableSelect name="parentId" placeholder="—" options={groups.map((g) => ({ label: g.name, value: g.id }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="group_desc">Deskripsi</Label>
                <Input id="group_desc" name="description" />
              </div>
              <DialogFooter>
                <Button type="submit">Simpan</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Tambah Produk</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>Tambah Produk</DialogTitle>
            </DialogHeader>
            <form action={createProduct} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="prod_name">Nama</Label>
                <Input id="prod_name" name="name" />
              </div>
              <HtmlEditor name="description" />
              <div className="space-y-2">
                <Label htmlFor="prod_group">Group</Label>
                <SearchableSelect name="groupId" placeholder="—" options={groups.map((g) => ({ label: g.name, value: g.id }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prod_class">Klasifikasi Pembayaran</Label>
                <SearchableSelect name="classification" defaultValue={"FREE"} allowEmpty={false} options={[
                  { label: "Free", value: "FREE" },
                  { label: "Onetime", value: "ONETIME" },
                  { label: "Recurring", value: "RECURRING" },
                ]} />
              </div>
              <div className="space-y-2">
                <Label>Mode Pemesanan</Label>
                <SearchableSelect name="orderMode" defaultValue={"DIRECT"} allowEmpty={false} options={[
                  { label: "Order Langsung", value: "DIRECT" },
                  { label: "Pengajuan", value: "REQUEST" },
                ]} />
              </div>
              <DialogFooter>
                <Button type="submit">Simpan</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Product Groups</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {groups.map((g) => (
            <div key={g.id} className="border rounded p-3">
              <div className="font-medium">{g.name}</div>
              <div className="text-xs text-muted-foreground">Parent: {groups.find((x) => x.id === g.parentId)?.name ?? "—"}</div>
              <div className="text-xs text-muted-foreground">{g.description ?? ""}</div>
              <div className="flex gap-2 mt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">Edit</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Group</DialogTitle>
                    </DialogHeader>
                    <form action={updateGroup} className="space-y-3">
                      <input type="hidden" name="id" value={g.id} />
                      <div className="space-y-2">
                        <Label>Nama</Label>
                        <Input name="name" defaultValue={g.name} />
                      </div>
                      <div className="space-y-2">
                        <Label>Parent Group</Label>
                        <SearchableSelect name="parentId" defaultValue={g.parentId ?? ""} placeholder="—" options={groups.filter((x) => x.id !== g.id).map((x) => ({ label: x.name, value: x.id }))} />
                      </div>
                      <div className="space-y-2">
                        <Label>Deskripsi</Label>
                        <Input name="description" defaultValue={g.description ?? ""} />
                      </div>
                      <DialogFooter>
                        <Button type="submit">Simpan</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
                <form action={deleteGroup}>
                  <input type="hidden" name="id" value={g.id} />
                  <Button variant="destructive" size="sm">Hapus</Button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Input placeholder="Cari produk..." defaultValue={q} name="q" />
          <SearchableSelect name="model" placeholder="Semua model" defaultValue={model ?? ""} options={[
            { label: "Free", value: "FREE" },
            { label: "Onetime", value: "ONETIME" },
            { label: "Recurring", value: "RECURRING" },
          ]} />
          <SearchableSelect name="group" placeholder="Semua group" defaultValue={groupFilter ?? ""} options={groups.map((g) => ({ label: g.name, value: g.id }))} />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="p-2">Nama</th>
                <th className="p-2">Group</th>
                <th className="p-2">Model</th>
                <th className="p-2">Specs</th>
                <th className="p-2">Prices</th>
                <th className="p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b align-top">
                  <td className="p-2">
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.active ? "Aktif" : "Nonaktif"}</div>
                  </td>
                  <td className="p-2">{p.group?.name ?? "—"}</td>
                  <td className="p-2">{p.classification}</td>
                  <td className="p-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Kelola Specs ({p.specs.length})</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Spesifikasi: {p.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <form action={addSpecField} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="hidden" name="productId" value={p.id} />
                            <div className="space-y-2">
                              <Label>Key</Label>
                              <Input name="key" placeholder="mis. accessories" />
                            </div>
                            <div className="space-y-2">
                              <Label>Label</Label>
                              <Input name="label" placeholder="Additional Accessories" />
                            </div>
                            <SpecConfigBuilder docTypes={docTypeInfos} />
                            <div className="space-y-2">
                              <Label>Required</Label>
                              <div className="flex items-center gap-2">
                                <Checkbox name="required" />
                                <span className="text-sm">Field wajib diisi</span>
                              </div>
                            </div>
                            
                            <div className="md:col-span-2">
                              <Button type="submit">Tambah Field</Button>
                            </div>
                          </form>
                          <div className="space-y-2">
                            <Label>Daftar Field</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {p.specs.map((s) => (
                                <div key={s.id} className="border rounded p-2">
                                  <div className="text-sm font-medium">{s.label} <Badge variant="outline" className="ml-2">{s.type}</Badge></div>
                                  <div className="text-xs text-muted-foreground">key: {s.key} {s.required ? "(required)" : ""}</div>
                                  <div className="flex gap-2 mt-2">
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button variant="outline" size="sm">Edit</Button>
                                      </DialogTrigger>
                                      <DialogContent>
                                        <DialogHeader>
                                          <DialogTitle>Edit Field</DialogTitle>
                                        </DialogHeader>
                                        <form action={updateSpecField} className="space-y-3">
                                          <input type="hidden" name="id" value={s.id} />
                                          <div className="space-y-2">
                                            <Label>Label</Label>
                                            <Input name="label" defaultValue={s.label} />
                                          </div>
                                          <SpecConfigBuilder docTypes={docTypeInfos} initialType={s.type as unknown as "TEXT" | "TEXTAREA" | "NUMBER" | "DROPDOWN" | "CHECKBOX"} initialConfig={s.config as unknown as { options?: { label: string; value: string; qty?: number }[]; source?: { key?: string; docTypeKey?: string; target?: string; labelField?: string; valueField?: string } }} />
                                          <div className="space-y-2">
                                            <Label>Required</Label>
                                            <div className="flex items-center gap-2">
                                              <Checkbox name="required" defaultChecked={s.required} />
                                              <span className="text-sm">Field wajib diisi</span>
                                            </div>
                                          </div>
                                          
                                          <DialogFooter>
                                            <Button type="submit">Simpan</Button>
                                          </DialogFooter>
                                        </form>
                                      </DialogContent>
                                    </Dialog>
                                    <form action={deleteSpecField}>
                                      <input type="hidden" name="id" value={s.id} />
                                      <Button variant="destructive" size="sm">Hapus</Button>
                                    </form>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </td>
                  <td className="p-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Kelola Harga ({p.prices.length})</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Harga: {p.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <form action={addPrice} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input type="hidden" name="productId" value={p.id} />
                            <div className="space-y-2">
                              <Label>Currency</Label>
                              <Input name="currency" defaultValue="IDR" />
                            </div>
                            <div className="space-y-2">
                              <Label>MRC Base Price (minor unit)</Label>
                              <Input name="basePrice" type="number" defaultValue={0} />
                            </div>
                            <div className="space-y-2">
                              <Label>NRC Setup Fee (minor unit)</Label>
                              <Input name="setupFee" type="number" defaultValue={0} />
                            </div>
                            <PriceConfigBuilder />
                            
                            <div className="md:col-span-2">
                              <Button type="submit">Tambah Harga</Button>
                            </div>
                          </form>
                          <div className="space-y-2">
                            <Label>Daftar Harga</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {p.prices.map((pr) => (
                                <div key={pr.id} className="border rounded p-2">
                                  <div className="text-sm font-medium">{pr.currency} • {pr.pricingModel}</div>
                                  <div className="text-xs text-muted-foreground">base: {pr.basePrice} • setup: {pr.setupFee}</div>
                                  <div className="flex gap-2 mt-2">
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button variant="outline" size="sm">Edit</Button>
                                      </DialogTrigger>
                                      <DialogContent>
                                        <DialogHeader>
                                          <DialogTitle>Edit Harga</DialogTitle>
                                        </DialogHeader>
                                        <form action={updatePrice} className="space-y-3">
                                          <input type="hidden" name="id" value={pr.id} />
                                          <div className="space-y-2">
                                            <Label>Currency</Label>
                                            <Input name="currency" defaultValue={pr.currency} />
                                          </div>
                                          <div className="space-y-2">
                                            <Label>MRC Base Price</Label>
                                            <Input name="basePrice" type="number" defaultValue={pr.basePrice} />
                                          </div>
                                          <div className="space-y-2">
                                            <Label>NRC Setup Fee</Label>
                                            <Input name="setupFee" type="number" defaultValue={pr.setupFee} />
                                          </div>
                                          <PriceConfigBuilder initialModel={pr.pricingModel as unknown as "FIXED" | "DISCOUNT" | "TIERED"} initialConfig={pr.config as unknown as { discountPercent?: number; tiers?: { upTo: number; price: number }[]; mrcPeriod?: "MONTHLY" | "YEARLY"; nrcPeriod?: "HOUR" | "DAY" | "MONTH" | "YEAR" }} />
                                          
                                          <DialogFooter>
                                            <Button type="submit">Simpan</Button>
                                          </DialogFooter>
                                        </form>
                                      </DialogContent>
                                    </Dialog>
                                    <form action={deletePrice}>
                                      <input type="hidden" name="id" value={pr.id} />
                                      <Button variant="destructive" size="sm">Hapus</Button>
                                    </form>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </td>
                  <td className="p-2 space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Edit</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Produk</DialogTitle>
                        </DialogHeader>
                        <form action={updateProduct} className="space-y-3">
                          <input type="hidden" name="id" value={p.id} />
                          <div className="space-y-2">
                            <Label>Nama</Label>
                            <Input name="name" defaultValue={p.name} />
                          </div>
                          <HtmlEditor name="description" initialHTML={(p as unknown as { description?: string }).description ?? ""} />
                          <div className="space-y-2">
                            <Label>Group</Label>
                            <SearchableSelect name="groupId" defaultValue={p.groupId ?? ""} placeholder="—" options={groups.map((g) => ({ label: g.name, value: g.id }))} />
                          </div>
                          <div className="space-y-2">
                            <Label>Klasifikasi</Label>
                            <SearchableSelect name="classification" defaultValue={p.classification} allowEmpty={false} options={[
                              { label: "Free", value: "FREE" },
                              { label: "Onetime", value: "ONETIME" },
                              { label: "Recurring", value: "RECURRING" },
                            ]} />
                          </div>
                          <div className="space-y-2">
                            <Label>Mode Pemesanan</Label>
                            <SearchableSelect name="orderMode" defaultValue={p.orderMode} allowEmpty={false} options={[
                              { label: "Order Langsung", value: "DIRECT" },
                              { label: "Pengajuan", value: "REQUEST" },
                            ]} />
                          </div>
                          <div className="space-y-2">
                            <Label>Status</Label>
                            <div className="flex items-center gap-2">
                              <Checkbox name="active" defaultChecked={p.active} />
                              <span className="text-sm">Aktif</span>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit">Simpan</Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <form action={deleteProduct} className="inline-flex">
                      <input type="hidden" name="id" value={p.id} />
                      <Button variant="destructive">Hapus</Button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}