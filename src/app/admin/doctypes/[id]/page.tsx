import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import Link from "next/link"
import PreviewTemplateEditor from "@/components/preview-template-editor"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { FieldType } from "@/generated/prisma/enums"
import { Prisma } from "@/generated/prisma/client"
import DocTypeDropdownConfig from "@/components/doctype-dropdown-config"
import ComputeSpecsEditor from "@/components/compute-specs-editor"
import { SearchableSelect } from "@/components/ui/select"

async function updateDocType(formData: FormData) {
  "use server"
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key))
  if (!perm.has("ADMIN_PANEL_ACCESS") && !perm.has("DOCTYPE_MANAGEMENT")) return
  const id = String(formData.get("id") || "")
  if (!id) return
  const name = String(formData.get("name") || "").trim()
  const branchIdRaw = String(formData.get("branchId") || "").trim()
  const branchId = branchIdRaw === "GLOBAL" ? null : (branchIdRaw || null)
  const description = String(formData.get("description") || "").trim() || null
  const noticeGuide = String(formData.get("noticeGuide") || "").trim() || null
  const icon = String(formData.get("icon") || "").trim() || null
  const assignmentEnabled = String(formData.get("assignmentEnabled") || "") === "on"
  const hasPreview = String(formData.get("hasPreview") || "") === "on"
  
  if (!name) return

  const dt = await prisma.docType.findUnique({ where: { id } })
  if (!dt) return
  const prevConfig = (dt.config ?? {}) as Record<string, unknown>
  const nextConfig = { ...prevConfig, assignmentEnabled, noticeGuide }

  const updateData: Prisma.DocTypeUpdateInput = {
    name,
    description,
    icon,
    hasPreview,
    config: nextConfig as unknown as Prisma.InputJsonValue
  }

  if (branchId) {
    updateData.branch = { connect: { id: branchId } }
  } else {
    updateData.branch = { disconnect: true }
  }

  await prisma.docType.update({ where: { id }, data: updateData })
  revalidatePath(`/admin/doctypes/${id}`)
  revalidatePath("/admin/doctypes")
}

async function upsertNotifications(formData: FormData) {
  "use server"
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key))
  if (!perm.has("ADMIN_PANEL_ACCESS") && !perm.has("DOCTYPE_MANAGEMENT")) return
  const docTypeId = String(formData.get("docTypeId") || "")
  if (!docTypeId) return
  const adminEnabled = String(formData.get("notify_admin_enabled") || "") === "on"
  const customerEnabled = String(formData.get("notify_customer_enabled") || "") === "on"
  const toastEnabled = String(formData.get("notify_toast_enabled") || "") === "on"
  const dt = await prisma.docType.findUnique({ where: { id: docTypeId } })
  if (!dt) return
  const prev = (dt.config ?? {}) as Record<string, unknown>
  const nextCfg = { ...prev, notifyConfig: { adminEnabled, customerEnabled, toastEnabled } }
  await prisma.docType.update({ where: { id: docTypeId }, data: { config: nextCfg as unknown as Prisma.InputJsonValue } })
  revalidatePath(`/admin/doctypes/${docTypeId}`)
}
async function addField(formData: FormData) {
  "use server"
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key))
  if (!perm.has("ADMIN_PANEL_ACCESS") && !perm.has("DOCTYPE_MANAGEMENT")) return
  const docTypeId = String(formData.get("docTypeId") || "")
  const key = String(formData.get("key") || "").trim()
  const label = String(formData.get("label") || "").trim()
  const type = String(formData.get("type") || "") as FieldType
  const required = String(formData.get("required") || "") === "on"
  const readOnly = String(formData.get("readOnly") || "") === "on"
  const order = Number(String(formData.get("order") || "0")) || 0
  let config: Record<string, unknown> | undefined = undefined
  if (type === ("DROPDOWN" as FieldType)) {
    const dropdownMode = String(formData.get("dropdownMode") || "").trim() || "static"
    if (dropdownMode === "dynamic") {
      const sourceKey = String(formData.get("sourceKey") || "").trim()
      const labelField = String(formData.get("labelField") || "").trim() || "name"
      const valueField = String(formData.get("valueField") || "").trim() || "id"
      const depFieldKey = String(formData.get("depFieldKey") || "").trim()
      const depSourceField = String(formData.get("depSourceField") || "").trim()
      if (sourceKey) {
        const srcObj: Record<string, unknown> = { key: sourceKey, labelField, valueField }
        if (depFieldKey && depSourceField) {
          srcObj["filter"] = { dependsOn: depFieldKey, field: depSourceField }
        }
        config = { source: srcObj }
      }
    } else if (dropdownMode === "dynamic-table") {
      const tableName = String(formData.get("tableName") || "").trim()
      const labelField = String(formData.get("labelField") || "").trim() || "name"
      const valueField = String(formData.get("valueField") || "").trim() || "id"
      const depFieldKey = String(formData.get("depFieldKey") || "").trim()
      const depSourceField = String(formData.get("depSourceField") || "").trim()
      if (tableName) {
        const srcObj: Record<string, unknown> = { table: tableName, labelField, valueField }
        if (depFieldKey && depSourceField) {
          srcObj["filter"] = { dependsOn: depFieldKey, field: depSourceField }
        }
        config = { source: srcObj }
      }
    } else {
      const optionsTextRaw = String(formData.get("optionsText") || "")
      const lines = optionsTextRaw.split(/\r?\n/).map((s) => s.trim()).filter(Boolean)
      const options = lines.map((line) => {
        const idx = line.indexOf("|")
        if (idx >= 0) {
          const l = line.slice(0, idx).trim()
          const v = line.slice(idx + 1).trim()
          return { label: l || v, value: v || l }
        }
        return { label: line, value: line }
      })
      if (options.length > 0) config = { options }
    }
  }
  const defaultNumberRaw = String(formData.get("defaultNumber") || "")
  if (type === ("NUMBER" as FieldType) && defaultNumberRaw) {
    const num = Number(defaultNumberRaw)
    if (!Number.isNaN(num)) {
      const prevCfg = config ?? {}
      config = { ...prevCfg, defaultValue: num }
    }
  }
  if (type === ("DATE" as FieldType)) {
    const isDefaultDateNow = String(formData.get("defaultDateNow") || "") === "on"
    const isDefaultDateCreated = String(formData.get("defaultDateCreated") || "") === "on"
    const prevCfg = config ?? {}
    if (isDefaultDateNow) config = { ...prevCfg, defaultNow: true }
    if (isDefaultDateCreated) config = { ...((config ?? {}) as object), defaultDateCreated: true }
  }
  const computeFormula = String(formData.get("computeFormula") || "").trim()
  if (readOnly && computeFormula) {
    const prevCfg = config ?? {}
    config = { ...prevCfg, compute: { formula: computeFormula } }
  }
  if (!docTypeId || !key || !label || !type) return
  const configValue: Prisma.InputJsonValue | undefined = config as unknown as Prisma.InputJsonValue | undefined
  await prisma.docField.create({ data: { docTypeId, key, label, type, readOnly, required, order, config: configValue } })
  revalidatePath(`/admin/doctypes/${docTypeId}`)
}

async function updateField(formData: FormData) {
  "use server"
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key))
  if (!perm.has("ADMIN_PANEL_ACCESS") && !perm.has("DOCTYPE_MANAGEMENT")) return
  const docTypeId = String(formData.get("docTypeId") || "")
  const fieldId = String(formData.get("fieldId") || "")
  const label = String(formData.get("label") || "").trim()
  const required = String(formData.get("required") || "") === "on"
  const readOnly = String(formData.get("readOnly") || "") === "on"
  const order = Number(String(formData.get("order") || "0")) || 0
  if (!docTypeId || !fieldId) return
  const field = await prisma.docField.findUnique({ where: { id: fieldId } })
  if (!field || field.docTypeId !== docTypeId) return
  let config: Record<string, unknown> | undefined = undefined
  if (field.type === ("DROPDOWN" as FieldType)) {
    const dropdownMode = String(formData.get("dropdownMode") || "").trim() || "static"
    if (dropdownMode === "dynamic") {
      const sourceKey = String(formData.get("sourceKey") || "").trim()
      const labelField = String(formData.get("labelField") || "").trim() || "name"
      const valueField = String(formData.get("valueField") || "").trim() || "id"
      const depFieldKey = String(formData.get("depFieldKey") || "").trim()
      const depSourceField = String(formData.get("depSourceField") || "").trim()
      if (sourceKey) {
        const srcObj: Record<string, unknown> = { key: sourceKey, labelField, valueField }
        if (depFieldKey && depSourceField) {
          srcObj["filter"] = { dependsOn: depFieldKey, field: depSourceField }
        }
        config = { source: srcObj }
      }
    } else if (dropdownMode === "dynamic-table") {
      const tableName = String(formData.get("tableName") || "").trim()
      const labelField = String(formData.get("labelField") || "").trim() || "name"
      const valueField = String(formData.get("valueField") || "").trim() || "id"
      const depFieldKey = String(formData.get("depFieldKey") || "").trim()
      const depSourceField = String(formData.get("depSourceField") || "").trim()
      if (tableName) {
        const srcObj: Record<string, unknown> = { table: tableName, labelField, valueField }
        if (depFieldKey && depSourceField) {
          srcObj["filter"] = { dependsOn: depFieldKey, field: depSourceField }
        }
        config = { source: srcObj }
      }
    } else {
      const optionsTextRaw = String(formData.get("optionsText") || "")
      const lines = optionsTextRaw.split(/\r?\n/).map((s) => s.trim()).filter(Boolean)
      const options = lines.map((line) => {
        const idx = line.indexOf("|")
        if (idx >= 0) {
          const l = line.slice(0, idx).trim()
          const v = line.slice(idx + 1).trim()
          return { label: l || v, value: v || l }
        }
        return { label: line, value: line }
      })
      if (options.length > 0) config = { options }
    }
  }
  const defaultNumberRaw = String(formData.get("defaultNumber") || "")
  const computeFormula = String(formData.get("computeFormula") || "").trim()
  const data: Record<string, unknown> = { label, required, readOnly, order }
  const baseCfg = (config ?? ((field.config ?? {}) as Record<string, unknown>)) as Record<string, unknown>
  if (field.type === ("NUMBER" as FieldType)) {
    const num = defaultNumberRaw ? Number(defaultNumberRaw) : Number.NaN
    if (!Number.isNaN(num)) (baseCfg as Record<string, unknown>)["defaultValue"] = num
    else delete (baseCfg as Record<string, unknown>)["defaultValue"]
  }
  if (field.type === ("DATE" as FieldType)) {
    const isDefaultDateNow = String(formData.get("defaultDateNow") || "") === "on";
    const isDefaultDateCreated = String(formData.get("defaultDateCreated") || "") === "on";
    (baseCfg as Record<string, unknown>)["defaultNow"] = isDefaultDateNow;
    (baseCfg as Record<string, unknown>)["defaultDateCreated"] = isDefaultDateCreated;
  }
  if (readOnly && computeFormula) {
    (baseCfg as Record<string, unknown>)["compute"] = { formula: computeFormula }
  } else {
    if ((baseCfg as Record<string, unknown>)["compute"]) {
      delete (baseCfg as Record<string, unknown>)["compute"]
    }
  }
  data["config"] = baseCfg as unknown
  await prisma.docField.update({ where: { id: fieldId }, data })
  revalidatePath(`/admin/doctypes/${docTypeId}`)
}

async function deleteField(formData: FormData) {
  "use server"
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key))
  if (!perm.has("ADMIN_PANEL_ACCESS") && !perm.has("DOCTYPE_MANAGEMENT")) return
  const id = String(formData.get("id") || "")
  const docTypeId = String(formData.get("docTypeId") || "")
  if (!id) return
  await prisma.docField.delete({ where: { id } })
  revalidatePath(`/admin/doctypes/${docTypeId}`)
}

async function addPermission(formData: FormData) {
  "use server"
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key))
  if (!perm.has("ADMIN_PANEL_ACCESS") && !perm.has("DOCTYPE_MANAGEMENT")) return
  const docTypeId = String(formData.get("docTypeId") || "")
  const roleId = String(formData.get("roleId") || "")
  const canCreate = String(formData.get("canCreate") || "") === "on"
  const canRead = String(formData.get("canRead") || "") === "on"
  const canWrite = String(formData.get("canWrite") || "") === "on"
  const canDelete = String(formData.get("canDelete") || "") === "on"
  const canAssign = String(formData.get("canAssign") || "") === "on"
  if (!docTypeId || !roleId) return
  await prisma.docPermission.upsert({
    where: { docTypeId_roleId: { docTypeId, roleId } },
    update: { canCreate, canRead, canWrite, canDelete, canAssign },
    create: { docTypeId, roleId, canCreate, canRead, canWrite, canDelete, canAssign },
  })
  revalidatePath(`/admin/doctypes/${docTypeId}`)
}

async function deletePermission(formData: FormData) {
  "use server"
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key))
  if (!perm.has("ADMIN_PANEL_ACCESS") && !perm.has("DOCTYPE_MANAGEMENT")) return
  const id = String(formData.get("id") || "")
  const docTypeId = String(formData.get("docTypeId") || "")
  if (!id) return
  await prisma.docPermission.delete({ where: { id } })
  revalidatePath(`/admin/doctypes/${docTypeId}`)
}

async function upsertWorkflow(formData: FormData) {
  "use server"
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key))
  if (!perm.has("ADMIN_PANEL_ACCESS") && !perm.has("DOCTYPE_MANAGEMENT")) return
  const docTypeId = String(formData.get("docTypeId") || "")
  const branchIdRaw = String(formData.get("branchId") || "")
  const branchId = branchIdRaw === "GLOBAL" ? undefined : (branchIdRaw || undefined)
  const name = String(formData.get("wf_name") || "").trim() || "Default"
  const statesText = String(formData.get("wf_states") || "").trim()
  const transitionsText = String(formData.get("wf_transitions") || "").trim()
  const presetKey = String(formData.get("wf_preset") || "").trim()
  if (!docTypeId) return
  const isActive = String(formData.get("wf_isActive") || "on") === "on"
  const dontOverrideStatus = String(formData.get("wf_dontOverrideStatus") || "") === "on"
  function parseDocStatusToken(tok: string): number | undefined {
    const t = tok.trim().toLowerCase()
    if (t === "0" || t === "draft") return 0
    if (t === "1" || t === "submitted") return 1
    if (t === "2" || t === "cancelled" || t === "canceled") return 2
    return undefined
  }
  function buildPreset(key: string): { states: Array<{ name: string; docStatus?: number; optional?: boolean; updates?: Record<string, string>; actions?: string[] }>; transitions: Array<{ from: string; to: string; roles: string[]; condition?: string }> } {
    if (key === "approval1") {
      return {
        states: [
          { name: "Draft", docStatus: 0 },
          { name: "Pending Approval", docStatus: 0, optional: true },
          { name: "Submitted", docStatus: 1 },
        ],
        transitions: [
          { from: "Draft", to: "Pending Approval", roles: ["ROLE_USER"] },
          { from: "Pending Approval", to: "Submitted", roles: ["ROLE_MANAGER"] },
        ],
      }
    }
    if (key === "approval2") {
      return {
        states: [
          { name: "Draft", docStatus: 0 },
          { name: "Manager Review", docStatus: 0, optional: true },
          { name: "Director Review", docStatus: 0, optional: true },
          { name: "Submitted", docStatus: 1 },
          { name: "Cancelled", docStatus: 2 },
        ],
        transitions: [
          { from: "Draft", to: "Manager Review", roles: ["ROLE_USER"] },
          { from: "Manager Review", to: "Director Review", roles: ["ROLE_MANAGER"] },
          { from: "Director Review", to: "Submitted", roles: ["ROLE_DIRECTOR"] },
          { from: "Submitted", to: "Cancelled", roles: ["ROLE_DIRECTOR"] },
        ],
      }
    }
    if (key === "submittable") {
      return {
        states: [
          { name: "Draft", docStatus: 0 },
          { name: "Submitted", docStatus: 1 },
          { name: "Cancelled", docStatus: 2 },
        ],
        transitions: [
          { from: "Draft", to: "Submitted", roles: ["ROLE_USER"] },
          { from: "Submitted", to: "Cancelled", roles: ["ROLE_USER"] },
        ],
      }
    }
    return { states: [], transitions: [] }
  }
  let states: Array<{ name: string; docStatus?: number; optional?: boolean; updates?: Record<string, string>; actions?: string[] }> = []
  let transitions: Array<{ from: string; to: string; roles: string[]; condition?: string }> = []
  if (!statesText && !transitionsText && presetKey) {
    const preset = buildPreset(presetKey)
    states = preset.states
    transitions = preset.transitions
  } else {
    states = statesText
      .split(/\r?\n|,/) 
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const parts = line.split("|").map((p) => p.trim()).filter(Boolean)
        const namePart = parts[0] || ""
        let docStatus: number | undefined = undefined
        let optional = false
        const updates: Record<string, string> = {}
        const actions: string[] = []
        for (let i = 1; i < parts.length; i++) {
          const p = parts[i]
          const ds = parseDocStatusToken(p)
          if (ds !== undefined) { docStatus = ds; continue }
          if (p.toLowerCase() === "optional") { optional = true; continue }
          if (p.toLowerCase().startsWith("update=")) {
            const kv = p.slice("update=".length)
            const [k, v] = kv.split(":")
            const key = (k || "").trim()
            const val = (v || "").trim()
            if (key) updates[key] = val
            continue
          }
          if (p.toLowerCase().startsWith("action=")) {
            const val = p.slice("action=".length).trim()
            if (val) actions.push(val)
            continue
          }
        }
        return { name: namePart, docStatus, optional, updates, actions }
      })
    transitions = transitionsText
      .split(/\r?\n/) 
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const segs = line.split("|").map((s) => s.trim()).filter(Boolean)
        const main = segs[0] || ""
        const [left, rolesPartRaw] = main.split(":")
        const [fromRaw, toRaw] = (left || "").split("->")
        const from = (fromRaw || "").trim()
        const to = (toRaw || "").trim()
        const roles = (rolesPartRaw || "").split(",").map((r) => r.trim()).filter(Boolean)
        let condition: string | undefined = undefined
        for (let i = 1; i < segs.length; i++) {
          const s = segs[i]
          if (s.toLowerCase().startsWith("condition=")) {
            condition = s.slice("condition=".length).trim()
          }
        }
      return { from, to, roles, condition }
    })
  }
  async function mapPlaceholderRolesIfNeeded(trs: Array<{ from: string; to: string; roles: string[]; condition?: string }>): Promise<Array<{ from: string; to: string; roles: string[]; condition?: string }>> {
    const hasPlaceholder = trs.some((t) => t.roles.some((r) => r === "ROLE_USER" || r === "ROLE_MANAGER" || r === "ROLE_DIRECTOR"))
    if (!hasPlaceholder && !presetKey) return trs
    const dt = await prisma.docType.findUnique({ where: { id: docTypeId }, include: { permissions: { include: { role: true } } } })
    const perms = dt?.permissions ?? []
    function candidatesFromPermissions(filterBranchId?: string | null): Array<string> {
      const names: string[] = []
      for (const p of perms) {
        const r = p.role as unknown as { name?: string; branchId?: string | null }
        if (!r?.name) continue
        if (filterBranchId !== undefined) {
          if ((r.branchId ?? null) !== (filterBranchId ?? null)) continue
        }
        if (!names.includes(r.name)) names.push(r.name)
      }
      return names
    }
    let candidates = candidatesFromPermissions(branchId ?? null)
    if (candidates.length === 0 && dt?.branchId) candidates = candidatesFromPermissions(dt.branchId)
    if (candidates.length === 0) candidates = candidatesFromPermissions(undefined)
    if (candidates.length === 0) {
      const fallback = branchId
        ? await prisma.role.findMany({ where: { branchId }, orderBy: { name: "asc" } })
        : dt?.branchId
        ? await prisma.role.findMany({ where: { branchId: dt.branchId }, orderBy: { name: "asc" } })
        : await prisma.role.findMany({ orderBy: { name: "asc" } })
      candidates = fallback.map((r) => r.name)
    }
    function mapToken(tok: string): string {
      if (tok === "ROLE_USER") return candidates[0] ?? tok
      if (tok === "ROLE_MANAGER") return candidates[1] ?? candidates[0] ?? tok
      if (tok === "ROLE_DIRECTOR") return candidates[2] ?? candidates[candidates.length - 1] ?? tok
      return tok
    }
    return trs.map((t) => ({ ...t, roles: t.roles.map(mapToken).filter((r) => r && r.length > 0) }))
  }
  const transitionsMapped = await mapPlaceholderRolesIfNeeded(transitions)
  const config = { states, transitions: transitionsMapped }
  const cfgValue = config as unknown as Prisma.InputJsonValue
  let current: { id: string } | null = null
  if (branchId) {
    current = await prisma.docWorkflow.upsert({
      where: { docTypeId_branchId: { docTypeId, branchId } },
      update: { name, config: cfgValue, isActive, dontOverrideStatus },
      create: { 
        docType: { connect: { id: docTypeId } },
        branch: { connect: { id: branchId } },
        name, 
        config: cfgValue, 
        isActive, 
        dontOverrideStatus 
      },
    })
  } else {
    const existing = await prisma.docWorkflow.findFirst({ where: { docTypeId, branchId: null } })
    if (existing) {
      current = await prisma.docWorkflow.update({ where: { id: existing.id }, data: { name, config: cfgValue, isActive, dontOverrideStatus } })
    } else {
      current = await prisma.docWorkflow.create({ 
        data: { 
            docType: { connect: { id: docTypeId } },
            name, 
            config: cfgValue, 
            isActive, 
            dontOverrideStatus 
        } 
      })
    }
  }
  if (isActive && current) {
    await prisma.docWorkflow.updateMany({ where: { docTypeId, id: { not: current.id } }, data: { isActive: false } })
  }
  revalidatePath(`/admin/doctypes/${docTypeId}`)
}

async function upsertNaming(formData: FormData) {
  "use server"
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key))
  if (!perm.has("ADMIN_PANEL_ACCESS") && !perm.has("DOCTYPE_MANAGEMENT")) return
  const docTypeId = String(formData.get("docTypeId") || "")
  const mode = String(formData.get("naming_mode") || "").trim() || "series"
  const field = String(formData.get("naming_field") || "").trim() || "naming_series"
  const defaultPattern = String(formData.get("naming_pattern") || "").trim() || ""
  if (!docTypeId) return
  const dt = await prisma.docType.findUnique({ where: { id: docTypeId } })
  if (!dt) return
  const cfg = (dt.config ?? {}) as Record<string, unknown>
  cfg["naming"] = { mode, field, defaultPattern }
  await prisma.docType.update({ where: { id: docTypeId }, data: { config: cfg as unknown as Prisma.InputJsonValue } })
  revalidatePath(`/admin/doctypes/${docTypeId}`)
}

async function upsertPreviewTemplate(formData: FormData) {
  "use server"
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key))
  if (!perm.has("ADMIN_PANEL_ACCESS") && !perm.has("DOCTYPE_MANAGEMENT")) return
  const docTypeId = String(formData.get("docTypeId") || "")
  const template = String(formData.get("previewTemplate") || "")
  if (!docTypeId) return
  const dt = await prisma.docType.findUnique({ where: { id: docTypeId } })
  if (!dt) return
  const cfg = (dt.config ?? {}) as Record<string, unknown>
  if (template && template.trim().length > 0) {
    cfg["previewTemplate"] = template
  } else {
    delete cfg["previewTemplate"]
  }
  await prisma.docType.update({ where: { id: docTypeId }, data: { config: cfg as unknown as Prisma.InputJsonValue } })
  revalidatePath(`/admin/doctypes/${docTypeId}`)
}

async function upsertRelations(formData: FormData) {
  "use server"
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key))
  if (!perm.has("ADMIN_PANEL_ACCESS") && !perm.has("DOCTYPE_MANAGEMENT")) return
  const docTypeId = String(formData.get("docTypeId") || "")
  const childDocTypeKey = String(formData.get("childDocTypeKey") || "").trim()
  if (!docTypeId) return
  const dt = await prisma.docType.findUnique({ where: { id: docTypeId }, include: { fields: true } })
  if (!dt) return
  const cfg = (dt.config ?? {}) as Record<string, unknown>
  const map: Record<string, string> = {}
  for (const f of dt.fields) {
    if (f.type !== ("TABLE" as FieldType)) continue
    const v = String(formData.get(`childDocTypeKey_${f.key}`) || "").trim()
    if (v) map[f.key] = v
  }
  if (Object.keys(map).length > 0) {
    cfg["childDocTypes"] = map
  } else {
    delete cfg["childDocTypes"]
  }
  await prisma.docType.update({ where: { id: docTypeId }, data: { config: cfg as unknown as Prisma.InputJsonValue } })
  revalidatePath(`/admin/doctypes/${docTypeId}`)
}

async function upsertComputeConfig(formData: FormData) {
  "use server"
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key))
  if (!perm.has("ADMIN_PANEL_ACCESS") && !perm.has("DOCTYPE_MANAGEMENT")) return
  const docTypeId = String(formData.get("docTypeId") || "")
  if (!docTypeId) return
  const dt = await prisma.docType.findUnique({ where: { id: docTypeId } })
  if (!dt) return
  const cfg = (dt.config ?? {}) as Record<string, unknown>
  const computeCfg = (cfg["compute"] ?? {}) as Record<string, unknown>
  const specsIndexed: Map<number, Record<string, string>> = new Map()
  formData.forEach?.((v, k) => {
    const key = String(k)
    const val = String(v ?? "")
    const m = key.match(/^compute_spec_(\d+)_(targetField|childDocTypeKey|qtyKey|nrcKey|mrcKey|formula)$/)
    if (m) {
      const idx = Number(m[1])
      const field = m[2]
      const cur = specsIndexed.get(idx) ?? {}
      cur[field] = val
      specsIndexed.set(idx, cur)
    }
  })
  const specs: Array<Record<string, unknown>> = []
  for (const idx of Array.from(specsIndexed.keys()).sort((a, b) => a - b)) {
    const s = specsIndexed.get(idx) ?? {}
    const targetField = String(s["targetField"] || "").trim()
    const childDocTypeKey = String(s["childDocTypeKey"] || "").trim()
    const qtyKey = String(s["qtyKey"] || "").trim() || "qty"
    const nrcKey = String(s["nrcKey"] || "").trim() || "nrc"
    const mrcKey = String(s["mrcKey"] || "").trim() || "mrc"
    const formula = String(s["formula"] || "").trim()
    if (!targetField || !childDocTypeKey) continue
    const spec: Record<string, unknown> = { targetField, childDocTypeKey, qtyKey, nrcKey, mrcKey }
    if (formula) spec["formula"] = formula
    specs.push(spec)
  }
  if (specs.length === 0) {
    const targetField = String(formData.get("compute_targetField") || "").trim()
    const childDocTypeKey = String(formData.get("compute_childDocTypeKey") || "").trim()
    const qtyKey = String(formData.get("compute_qtyKey") || "").trim() || "qty"
    const nrcKey = String(formData.get("compute_nrcKey") || "").trim() || "nrc"
    const mrcKey = String(formData.get("compute_mrcKey") || "").trim() || "mrc"
    const formula = String(formData.get("compute_formula") || "").trim()
    if (targetField && childDocTypeKey) {
      const spec: Record<string, unknown> = { targetField, childDocTypeKey, qtyKey, nrcKey, mrcKey }
      if (formula) spec["formula"] = formula
      specs.push(spec)
    }
  }
  if (specs.length > 0) {
    computeCfg["totalFromRows"] = specs
    cfg["compute"] = computeCfg
  } else {
    delete computeCfg["totalFromRows"]
    if (Object.keys(computeCfg).length > 0) cfg["compute"] = computeCfg
    else delete cfg["compute"]
  }
  await prisma.docType.update({ where: { id: docTypeId }, data: { config: cfg as unknown as Prisma.InputJsonValue } })
  revalidatePath(`/admin/doctypes/${docTypeId}`)
}

async function upsertListConfig(formData: FormData) {
  "use server"
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key))
  if (!perm.has("ADMIN_PANEL_ACCESS") && !perm.has("DOCTYPE_MANAGEMENT")) return
  const docTypeId = String(formData.get("docTypeId") || "")
  if (!docTypeId) return
  const dt = await prisma.docType.findUnique({ where: { id: docTypeId } })
  if (!dt) return
  const listFields = (formData.getAll("listField") || []).map((v) => String(v)).filter(Boolean)
  const filterFields = (formData.getAll("filterField") || []).map((v) => String(v)).filter(Boolean)
  const cfg = (dt.config ?? {}) as Record<string, unknown>
  cfg["listFields"] = listFields
  cfg["filterFields"] = filterFields
  await prisma.docType.update({ where: { id: docTypeId }, data: { config: cfg as unknown as Prisma.InputJsonValue } })
  revalidatePath(`/admin/doctypes/${docTypeId}`)
}

export default async function DocTypeDetailPage({ params, searchParams }: { params?: Record<string, string | string[] | undefined> | Promise<Record<string, string | string[] | undefined>>; searchParams?: Record<string, string | string[] | undefined> | Promise<Record<string, string | string[] | undefined>> }) {
  const session = await getServerSession(authOptions)
  const email = session?.user?.email ?? ""
  const me = email ? await prisma.user.findUnique({ where: { email }, include: { role: { include: { permissions: { include: { permission: true } } } } } }) : null
  const perm = new Set((me?.role?.permissions ?? []).map((rp) => rp.permission.key))
  if (!perm.has("ADMIN_PANEL_ACCESS") && !perm.has("DOCTYPE_MANAGEMENT")) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">DocType</h1>
        <p>Anda tidak memiliki akses.</p>
      </div>
    )
  }

  const p = ((await params) ?? {}) as Record<string, string | string[] | undefined>
  const sp = ((await searchParams) ?? {}) as Record<string, string | string[] | undefined>
  const idRaw = p?.id
  const id = typeof idRaw === "string" ? idRaw : Array.isArray(idRaw) ? idRaw[0] : ""
  if (!id) redirect("/admin/doctypes")
  const data = await prisma.docType.findUnique({ where: { id }, include: { branch: true, fields: { orderBy: { order: "asc" } }, permissions: { include: { role: true } } } })
  if (!data) redirect("/admin/doctypes")
  const roles = data.branchId ? await prisma.role.findMany({ where: { branchId: data.branchId }, orderBy: { name: "asc" } }) : await prisma.role.findMany({ orderBy: { name: "asc" } })
  const allDocTypes = await prisma.docType.findMany({ orderBy: { name: "asc" }, include: { fields: { orderBy: { order: "asc" } } } })
  const branches = await prisma.branch.findMany({ orderBy: { name: "asc" } })
  const workflows = (await prisma.docWorkflow.findMany({ where: { docTypeId: data.id }, include: { branch: true }, orderBy: { updatedAt: "desc" } })) as Array<{ id: string; name: string; branch: { id: string; name?: string } | null; config?: unknown }>
  const cookieStore = await cookies()
  const cookieBranchId = cookieStore.get("branchId")?.value
  const allowedBranchIds = new Set(branches.map((b) => b.id))
  const candidateBranchId = cookieBranchId ?? data.branchId ?? branches[0]?.id
  const selectedBranchId = allowedBranchIds.has(String(candidateBranchId)) ? candidateBranchId : branches[0]?.id
  const wfSelected = (() => {
    const byBranch = workflows.find((w) => (w.branch?.id ?? null) === (selectedBranchId ?? null))
    if (byBranch) return byBranch
    const global = workflows.find((w) => !w.branch)
    return global ?? workflows[0]
  })()
  const workflowsForView = selectedBranchId ? workflows.filter((w) => (w.branch?.id ?? null) === (selectedBranchId ?? null)) : workflows
  const namingCfg = (data.config ?? {}) as unknown as { naming?: { mode?: string; field?: string; defaultPattern?: string } }
  const listFilterCfg = (data.config ?? {}) as unknown as { listFields?: string[]; filterFields?: string[] }
  const assignmentCfg = (data.config ?? {}) as unknown as { assignmentEnabled?: boolean }
  const relationsCfg = (data.config ?? {}) as unknown as { childDocTypes?: Record<string, string> }
  const company = await prisma.company.findUnique({ where: { id: me?.companyId ?? "" }, select: { name: true, logoUrl: true, address: true } })
  const db = process.env.DATABASE_NAME || "mettadc"
  const allowedTables = ["Branch", "Building", "Floor", "Room", "Company", "Role", "Product", "ProductGroup", "ProductPrice"]
  const tables: Array<{ name: string; columns: string[] }> = []
  for (const name of allowedTables) {
    let cols = await prisma.$queryRaw<Array<{ COLUMN_NAME: unknown }>>(Prisma.sql`
      SELECT CAST(COLUMN_NAME AS CHAR) AS COLUMN_NAME
      FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = ${db} AND TABLE_NAME = ${name}
      ORDER BY ORDINAL_POSITION ASC
    `)
    if (cols.length === 0) {
      cols = await prisma.$queryRaw<Array<{ COLUMN_NAME: unknown }>>(Prisma.sql`
        SELECT CAST(COLUMN_NAME AS CHAR) AS COLUMN_NAME
        FROM information_schema.COLUMNS
        WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ${name}
        ORDER BY ORDINAL_POSITION ASC
      `)
    }
    tables.push({ name, columns: cols.map((c) => String(c.COLUMN_NAME ?? "")).filter(Boolean) })
  }
  const typeOptions: Array<{ label: string; value: FieldType }> = [
    { label: "TEXT", value: "TEXT" as FieldType },
    { label: "TEXTAREA", value: "TEXTAREA" as FieldType },
    { label: "NUMBER", value: "NUMBER" as FieldType },
    { label: "PRICE", value: "PRICE" as FieldType },
    { label: "DROPDOWN", value: "DROPDOWN" as FieldType },
    { label: "CHECKBOX", value: "CHECKBOX" as FieldType },
    { label: "DATE", value: "DATE" as FieldType },
    { label: "DATETIME", value: "DATETIME" as FieldType },
    { label: "LINK", value: "LINK" as FieldType },
    { label: "TABLE", value: "TABLE" as FieldType },
    { label: "ATTACHMENT", value: "ATTACHMENT" as FieldType },
  ]

  const tabRaw = sp?.tab
  const tab = typeof tabRaw === "string" ? tabRaw : Array.isArray(tabRaw) ? tabRaw[0] : "fields"
  const baseHref = `/admin/doctypes/${id}`
  const tabs = [
    { key: "settings", label: "Settings" },
    { key: "fields", label: "Fields" },
    { key: "permissions", label: "Permissions" },
    { key: "workflow", label: "Workflow" },
    { key: "naming", label: "Naming Series" },
    { key: "list", label: "List & Filter" },
    { key: "template", label: "Template" },
    { key: "relations", label: "Relasi" },
    { key: "compute", label: "Compute" },
    { key: "notifications", label: "Notifikasi" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">{data.name}</h1>
          <div className="text-xs text-muted-foreground">{data.key} • {data.branch?.name ?? "Global"}</div>
        </div>
        <Link href="/admin/doctypes" className="text-sm underline">Kembali</Link>
      </div>

      <div className="border-b flex items-center gap-4">
        {tabs.map((t) => (
          <Link key={t.key} href={`${baseHref}?tab=${t.key}`} className={`text-sm pb-2 border-b-2 ${tab === t.key ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>{t.label}</Link>
        ))}
      </div>

      <div className={`space-y-4 ${tab === "settings" ? "" : "hidden"}`}>
        <div className="text-sm font-semibold">Settings</div>
        <form action={updateDocType} className="space-y-3">
          <input type="hidden" name="id" value={data.id} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Nama</Label>
              <Input name="name" defaultValue={data.name} required />
            </div>
            <div className="space-y-2">
              <Label>Key</Label>
              <Input defaultValue={data.key} disabled />
              <div className="text-xs text-muted-foreground">Key tidak dapat diubah setelah dibuat.</div>
            </div>
            <div className="space-y-2">
              <Label>Branch</Label>
              <SearchableSelect 
                name="branchId" 
                placeholder="Pilih Branch" 
                defaultValue={data.branchId ?? "GLOBAL"} 
                options={[{ label: "Global (Semua Branch)", value: "GLOBAL" }, ...branches.map((b) => ({ label: b.name, value: b.id }))]} 
              />
            </div>
            <div className="space-y-2">
              <Label>Icon (Lucide Name)</Label>
              <Input name="icon" defaultValue={data.icon ?? ""} placeholder="e.g. FileText" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 mt-8">
                <input type="checkbox" id="assignmentEnabled" name="assignmentEnabled" defaultChecked={assignmentCfg.assignmentEnabled} />
                <Label htmlFor="assignmentEnabled">Aktifkan Assignment</Label>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 mt-8">
                <input type="checkbox" id="hasPreview" name="hasPreview" defaultChecked={data.hasPreview} />
                <Label htmlFor="hasPreview">Aktifkan Preview Dokumen</Label>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Deskripsi</Label>
            <textarea name="description" className="border rounded p-2 w-full min-h-20 text-sm" defaultValue={data.description ?? ""} />
          </div>
          <div className="space-y-2">
            <Label>Panduan (Notice)</Label>
            <textarea name="noticeGuide" className="border rounded p-2 w-full min-h-20 text-sm" defaultValue={(() => { const cfg = (data.config ?? {}) as Record<string, unknown>; return (cfg["noticeGuide"] as string) ?? "" })()} placeholder="Tulis panduan atau catatan penting untuk dokumen ini..." />
            <div className="text-xs text-muted-foreground">Akan ditampilkan di halaman detail dokumen.</div>
          </div>
          <div>
            <Button type="submit">Simpan Perubahan</Button>
          </div>
        </form>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${tab === "fields" || tab === "permissions" ? "" : "hidden"}`}>
        <div className={`space-y-4 ${tab === "fields" ? "" : "hidden"}`}>
          <div className="text-sm font-semibold">Fields</div>
  <form action={addField} className="space-y-3">
            <input type="hidden" name="docTypeId" value={data.id} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Key</Label>
                <Input name="key" />
              </div>
              <div className="space-y-2">
                <Label>Label</Label>
                <Input name="label" />
              </div>
              <div className="space-y-2">
                <Label>Tipe</Label>
                <SearchableSelect name="type" options={typeOptions.map((t) => ({ label: t.label, value: t.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Urutan</Label>
                <Input name="order" type="number" defaultValue={data.fields.length} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="required" name="required" />
              <Label htmlFor="required">Wajib</Label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="readOnly" name="readOnly" />
              <Label htmlFor="readOnly">Readonly (otomatis dihitung)</Label>
            </div>
            <div className="space-y-2">
              <Label>Formula (opsional)</Label>
              <Input name="computeFormula" placeholder="cth: qty * price" />
              <div className="text-xs text-muted-foreground">Gunakan key field lain, operator + - * / dan fungsi Math: round, floor, ceil, min, max.</div>
            </div>
            <div className="space-y-2">
              <Label>Default Number (untuk NUMBER)</Label>
              <Input name="defaultNumber" type="number" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="defaultDateNow" name="defaultDateNow" defaultChecked />
              <Label htmlFor="defaultDateNow">Default DATE ke hari ini</Label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="defaultDateCreated" name="defaultDateCreated" />
              <Label htmlFor="defaultDateCreated">Default DATE ke tanggal document dibuat</Label>
            </div>
            <DocTypeDropdownConfig
              docTypes={allDocTypes.map((d) => ({ key: d.key, name: d.name, fields: d.fields.map((f) => ({ key: f.key, label: f.label })) }))}
              tables={tables}
              currentDropdownFields={data.fields.filter((f) => f.type === ("DROPDOWN" as FieldType)).map((f) => ({ key: f.key, label: f.label, config: (f.config ?? {}) as Record<string, unknown> }))}
              parentDropdownFields={(() => {
                const fields: Array<{ key: string; label: string; config?: Record<string, unknown> }> = []
                for (const dt of allDocTypes) {
                  const cfg = (dt.config ?? {}) as Record<string, unknown>
                  const map = (cfg["childDocTypes"] ?? {}) as Record<string, string>
                  const used = Object.values(map).includes(data.key)
                  if (!used) continue
                  for (const ff of dt.fields) {
                    if (ff.type === ("DROPDOWN" as FieldType)) {
                      fields.push({ key: ff.key, label: `${ff.label} (${dt.name})`, config: (ff.config ?? {}) as Record<string, unknown> })
                    }
                  }
                }
                return fields
              })()}
            />
            <div>
              <Button type="submit">Tambah Field</Button>
            </div>
          </form>
          <div className="space-y-3">
            {data.fields.map((f) => (
              <div key={f.id} className="border rounded p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-sm font-medium">{f.label}</div>
                    <div className="text-xs text-muted-foreground">{f.key} • {f.type} • Urutan {f.order}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <form action={deleteField}>
                      <input type="hidden" name="id" value={f.id} />
                      <input type="hidden" name="docTypeId" value={data.id} />
                      <Button variant="destructive">Hapus</Button>
                    </form>
                  </div>
                </div>
                <details>
                  <summary className="text-xs cursor-pointer">Ubah Field</summary>
                  <form action={updateField} className="space-y-3 mt-2">
                    <input type="hidden" name="docTypeId" value={data.id} />
                    <input type="hidden" name="fieldId" value={f.id} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label>Key</Label>
                        <Input defaultValue={f.key} disabled />
                      </div>
                      <div className="space-y-2">
                        <Label>Label</Label>
                        <Input name="label" defaultValue={f.label} />
                      </div>
                      <div className="space-y-2">
                        <Label>Tipe</Label>
                        <Input defaultValue={f.type} disabled />
                      </div>
                      <div className="space-y-2">
                        <Label>Urutan</Label>
                        <Input name="order" type="number" defaultValue={f.order} />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id={`required_${f.id}`} name="required" defaultChecked={f.required} />
                      <Label htmlFor={`required_${f.id}`}>Wajib</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id={`readonly_${f.id}`} name="readOnly" defaultChecked={f.readOnly} />
                      <Label htmlFor={`readonly_${f.id}`}>Readonly (otomatis dihitung)</Label>
                    </div>
                    <div className="space-y-2">
                      <Label>Formula (opsional)</Label>
                      <Input name="computeFormula" defaultValue={(() => { const cfg = (f.config ?? {}) as unknown as { compute?: { formula?: string } }; return cfg.compute?.formula ?? "" })()} />
                      <div className="text-xs text-muted-foreground">Gunakan key field lain, operator + - * / dan fungsi Math: round, floor, ceil, min, max.</div>
                    </div>
                    {f.type === ("NUMBER" as FieldType) ? (
                      <div className="space-y-2">
                        <Label>Default Number</Label>
                        <Input name="defaultNumber" type="number" defaultValue={(() => { const cfg = (f.config ?? {}) as unknown as { defaultValue?: number }; const v = cfg.defaultValue; return typeof v === "number" ? String(v) : "" })()} />
                      </div>
                    ) : null}
                    {f.type === ("DATE" as FieldType) ? (
                      <>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" id={`defaultDateNow_${f.id}`} name="defaultDateNow" defaultChecked={(() => { const cfg = (f.config ?? {}) as unknown as { defaultNow?: boolean }; return cfg.defaultNow ?? true })()} />
                          <Label htmlFor={`defaultDateNow_${f.id}`}>Default ke tanggal hari ini</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input type="checkbox" id={`defaultDateCreated_${f.id}`} name="defaultDateCreated" defaultChecked={(() => { const cfg = (f.config ?? {}) as unknown as { defaultDateCreated?: boolean }; return cfg.defaultDateCreated ?? false })()} />
                          <Label htmlFor={`defaultDateCreated_${f.id}`}>Default ke tanggal document dibuat</Label>
                        </div>
                      </>
                    ) : null}
                    {f.type === ("DROPDOWN" as FieldType) ? (
                      <DocTypeDropdownConfig
                        docTypes={allDocTypes.map((d) => ({ key: d.key, name: d.name, fields: d.fields.map((ff) => ({ key: ff.key, label: ff.label })) }))}
                        tables={tables}
                        currentDropdownFields={data.fields.filter((ff) => ff.type === ("DROPDOWN" as FieldType)).map((ff) => ({ key: ff.key, label: ff.label, config: (ff.config ?? {}) as Record<string, unknown> }))}
                        parentDropdownFields={(() => {
                          const fields: Array<{ key: string; label: string; config?: Record<string, unknown> }> = []
                          for (const dt of allDocTypes) {
                            const cfg = (dt.config ?? {}) as Record<string, unknown>
                            const map = (cfg["childDocTypes"] ?? {}) as Record<string, string>
                            const used = Object.values(map).includes(data.key)
                            if (!used) continue
                            for (const fff of dt.fields) {
                              if (fff.type === ("DROPDOWN" as FieldType)) {
                                fields.push({ key: fff.key, label: `${fff.label} (${dt.name})`, config: (fff.config ?? {}) as Record<string, unknown> })
                              }
                            }
                          }
                          return fields
                        })()}
                        defaults={(() => {
                          const cfg = (f.config ?? {}) as unknown as { options?: Array<{ label: string; value: string }>; source?: Record<string, unknown> }
                          if (cfg.options && cfg.options.length > 0) {
                            const optionsText = cfg.options.map((o) => `${o.label}|${o.value}`).join("\n")
                            return { mode: "static", optionsText }
                          }
                          const src = cfg.source as Record<string, unknown> | undefined
                          if (src && typeof src["key"] === "string") {
                            const sourceKey = src["key"] as string
                            const labelField = typeof src["labelField"] === "string" ? (src["labelField"] as string) : "name"
                            const valueField = typeof src["valueField"] === "string" ? (src["valueField"] as string) : "id"
                            const filterObj = src["filter"] as Record<string, unknown> | undefined
                            const depFieldKey = filterObj && typeof filterObj["dependsOn"] === "string" ? (filterObj["dependsOn"] as string) : ""
                            const depSourceField = filterObj && typeof filterObj["field"] === "string" ? (filterObj["field"] as string) : ""
                            return { mode: "dynamic", sourceKey, labelField, valueField, depFieldKey, depSourceField }
                          }
                          if (src && typeof src["table"] === "string") {
                            const tableName = src["table"] as string
                            const labelField = typeof src["labelField"] === "string" ? (src["labelField"] as string) : "name"
                            const valueField = typeof src["valueField"] === "string" ? (src["valueField"] as string) : "id"
                            const filterObj = src["filter"] as Record<string, unknown> | undefined
                            const depFieldKey = filterObj && typeof filterObj["dependsOn"] === "string" ? (filterObj["dependsOn"] as string) : ""
                            const depSourceField = filterObj && typeof filterObj["field"] === "string" ? (filterObj["field"] as string) : ""
                            return { mode: "dynamic-table", tableName, labelField, valueField, depFieldKey, depSourceField }
                          }
                          return { mode: "static" }
                        })()}
                      />
                    ) : null}
                    <div>
                      <Button type="submit">Simpan</Button>
                    </div>
                  </form>
                </details>
              </div>
            ))}
          </div>
        </div>
        <div className={`space-y-4 ${tab === "permissions" ? "" : "hidden"}`}>
          <div className="text-sm font-semibold">Permissions</div>
          <form action={addPermission} className="space-y-3">
            <input type="hidden" name="docTypeId" value={data.id} />
            <div className="space-y-2">
              <Label>Role</Label>
              <SearchableSelect name="roleId" options={roles.map((r) => ({ label: r.name, value: r.id }))} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="canCreate" /> Buat</label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="canRead" defaultChecked /> Baca</label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="canWrite" /> Ubah</label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="canDelete" /> Hapus</label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="canAssign" /> Assignment</label>
            </div>
            <div>
              <Button type="submit">Simpan Akses</Button>
            </div>
          </form>
          <div className="space-y-2">
            {data.permissions.map((p) => (
              <div key={p.id} className="border rounded p-3 flex items-center justify-between">
                <div className="text-sm">{p.role.name} • {p.canCreate ? "Buat" : ""} {p.canRead ? "Baca" : ""} {p.canWrite ? "Ubah" : ""} {p.canDelete ? "Hapus" : ""} {p.canAssign ? "Assign" : ""}</div>
                <form action={deletePermission}>
                  <input type="hidden" name="id" value={p.id} />
                  <input type="hidden" name="docTypeId" value={data.id} />
                  <Button variant="destructive">Hapus</Button>
                </form>
              </div>
            ))}
          </div>
        </div>
        </div>
        <div className={`space-y-4 ${tab === "workflow" ? "" : "hidden"}`}>
          <div className="text-sm font-semibold">Workflow</div>
          <form action={upsertWorkflow} className="space-y-3">
            <input type="hidden" name="docTypeId" value={data.id} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label>Nama</Label>
                <Input name="wf_name" defaultValue={wfSelected?.name ?? "Default"} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Branch</Label>
                <SearchableSelect
                  name="branchId"
                  placeholder="Pilih branch atau Global"
                  defaultValue={selectedBranchId ?? ""}
                  options={[{ label: "Global (Semua Branch)", value: "GLOBAL" }, ...branches.map((b) => ({ label: b.name, value: b.id }))]}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="wf_isActive" defaultChecked /> Aktifkan Workflow</label>
              <label className="flex items-center gap-2 text-sm md:col-span-2"><input type="checkbox" name="wf_dontOverrideStatus" /> Jangan Override DocStatus</label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label>Preset</Label>
                <SearchableSelect name="wf_preset" placeholder="Pilih preset (opsional)" options={[
                  { label: "Approval 1 level", value: "approval1" },
                  { label: "Approval 2 level", value: "approval2" },
                  { label: "Submittable + Cancel", value: "submittable" },
                ]} />
                <div className="text-xs text-muted-foreground">Preset otomatis memetakan role (user/manager/director) dari daftar role pada DocType/branch. Anda tetap bisa mengubah roles di Transitions.</div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>States (pisahkan dengan koma atau baris)</Label>
              <textarea name="wf_states" className="border rounded p-2 w-full min-h-24 text-sm" defaultValue={(() => {
                const cfg = (wfSelected?.config ?? {}) as unknown as { states?: Array<{ name: string; docStatus?: number; optional?: boolean; updates?: Record<string, string>; actions?: string[] }> }
                const sts = cfg?.states ?? []
                if (sts.length === 0) return ""
                return sts.map((s) => {
                  const parts: string[] = [s.name]
                  if (typeof s.docStatus === "number") parts.push(String(s.docStatus))
                  if (s.optional) parts.push("optional")
                  const upd = s.updates ?? {}
                  for (const k of Object.keys(upd)) parts.push(`update=${k}:${upd[k]}`)
                  const acts = s.actions ?? []
                  for (const a of acts) parts.push(`action=${a}`)
                  return parts.join(" | ")
                }).join("\n")
              })()} />
            </div>
            <div className="space-y-2">
              <Label>Transitions (format: from → to : ROLE1,ROLE2)</Label>
              <textarea name="wf_transitions" className="border rounded p-2 w-full min-h-24 text-sm" defaultValue={(() => {
                const cfg = (wfSelected?.config ?? {}) as unknown as { transitions?: Array<{ from: string; to: string; roles: string[]; condition?: string }> }
                const trs = cfg?.transitions ?? []
                if (trs.length === 0) return ""
                return trs.map((t) => {
                  const base = `${t.from} -> ${t.to} : ${t.roles.join(",")}`
                  return t.condition ? `${base} | condition=${t.condition}` : base
                }).join("\n")
              })()} />
            </div>
            <div>
              <Button type="submit">Simpan Workflow</Button>
            </div>
          </form>
          <div className="space-y-2">
            {workflowsForView.map((wf) => {
              const cfg = (wf.config ?? {}) as unknown as { states?: Array<{ name: string }>; transitions?: Array<{ from: string; to: string; roles: string[]; condition?: string }> }
              const statesLabel = (cfg.states ?? []).map((s) => s.name).join(", ")
              return (
                <div key={wf.id} className="border rounded p-3">
                  <div className="text-sm font-medium">{wf.name} • {wf.branch?.name ?? "Global"}</div>
                  <div className="text-xs text-muted-foreground">States: {statesLabel}</div>
                  <div className="text-xs">{(cfg.transitions ?? []).map((t, i) => (<span key={i} className="inline-block mr-2">{t.from} → {t.to} [{t.roles.join(",")} ]{t.condition ? ` if (${t.condition})` : ""}</span>))}</div>
                </div>
              )
            })}
          </div>
        </div>
        <div className={`space-y-4 ${tab === "naming" ? "" : "hidden"}`}>
          <div className="text-sm font-semibold">Naming Series</div>
          <form action={upsertNaming} className="space-y-3">
            <input type="hidden" name="docTypeId" value={data.id} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label>Mode</Label>
                <SearchableSelect name="naming_mode" defaultValue={namingCfg.naming?.mode ?? "series"} options={[
                  { label: "Series (by field)", value: "series" },
                  { label: "UUID", value: "uuid" },
                  { label: "Random", value: "random" },
                  { label: "By Field", value: "field" },
                ]} />
              </div>
              <div className="space-y-2">
                <Label>Field (untuk series/field)</Label>
                <Input name="naming_field" defaultValue={namingCfg.naming?.field ?? "naming_series"} />
              </div>
              <div className="space-y-2">
                <Label>Default Pattern</Label>
                <Input name="naming_pattern" defaultValue={namingCfg.naming?.defaultPattern ?? "PRE-#####"} />
              </div>
            </div>
            <div>
              <Button type="submit">Simpan Naming</Button>
            </div>
          </form>
        </div>
        <div className={`space-y-4 ${tab === "list" ? "" : "hidden"}`}>
          <div className="text-sm font-semibold">List & Filter</div>
          <form action={upsertListConfig} className="space-y-3">
            <input type="hidden" name="docTypeId" value={data.id} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="text-sm font-medium">Field untuk ditampilkan</div>
                <div className="space-y-2">
                  {data.fields.map((f) => (
                    <label key={f.id} className="flex items-center gap-2 text-sm">
                      <input type="checkbox" name="listField" value={f.key} defaultChecked={(listFilterCfg.listFields ?? []).includes(f.key)} />
                      {f.label} ({f.key})
                    </label>
                  ))}
                  {assignmentCfg.assignmentEnabled ? (
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" name="listField" value="assignedToId" defaultChecked={(listFilterCfg.listFields ?? []).includes("assignedToId")} />
                      Assigned To (assignedToId)
                    </label>
                  ) : null}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">Field untuk filter</div>
                <div className="space-y-2">
                  {data.fields.map((f) => (
                    <label key={f.id} className="flex items-center gap-2 text-sm">
                      <input type="checkbox" name="filterField" value={f.key} defaultChecked={(listFilterCfg.filterFields ?? []).includes(f.key)} />
                      {f.label} ({f.key})
                    </label>
                  ))}
                  {assignmentCfg.assignmentEnabled ? (
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" name="filterField" value="assignedToId" defaultChecked={(listFilterCfg.filterFields ?? []).includes("assignedToId")} />
                      Assigned To (assignedToId)
                    </label>
                  ) : null}
                </div>
              </div>
            </div>
            <div>
              <Button type="submit">Simpan</Button>
            </div>
          </form>
        </div>
        <div className={`space-y-4 ${tab === "template" ? "" : "hidden"}`}>
          <div className="text-sm font-semibold">Template Preview Dokumen</div>
          <form action={upsertPreviewTemplate} className="space-y-3">
            <input type="hidden" name="docTypeId" value={data.id} />
            <div className="space-y-2">
              <div className="text-xs text-muted-foreground">Gunakan token: {"{{docTypeName}}"}, {"{{code}}"}, {"{{status}}"}, {"{{currency}}"}, {"{{grandTotal}}"}. Field: {"{{fieldKey}}"} atau {"{{fieldKey_label}}"}. Baris: {"{{#rows}}...{{/rows}}"} dengan {"{{row.fieldKey}}"} atau {"{{row.fieldKey_label}}"}.</div>
              {(() => {
                const cfg = (data.config ?? {}) as unknown as { previewTemplate?: string }
                const base = (cfg.previewTemplate ?? "").trim()
                let initial = base
                if (!initial) {
                  let tpl = ""
                  tpl += `<div>`
                  tpl += `<div style=\"display:flex;align-items:center;gap:12px;margin-bottom:12px;\">`
                  tpl += `<img src=\"{{fromCompanyLogo}}\" style=\"height:40px;object-fit:contain;border-radius:4px;\" />`
                  tpl += `<div>`
                  tpl += `<div style=\"font-size:20px;font-weight:600;margin-bottom:4px;\">{{docTypeName}}</div>`
                  tpl += `<div style=\"font-size:12px;color:#6b7280;\">To: {{toName}} • From: {{fromCompanyName}} • {{fromCompanyEmail}} • {{fromCompanyPhone}} • {{code}} • {{status}}</div>`
                  tpl += `<div style=\"font-size:11px;color:#6b7280;margin-top:4px;\">Customer: {{customer_name_label}} • {{customer_email_label}} • {{customer_phonenumber_label}} • {{customer_address_label}}</div>`
                  tpl += `</div>`
                  tpl += `</div>`
                  tpl += `<div><table style=\"width:100%;border-collapse:collapse;\">`
                  for (const f of data.fields) {
                    if (f.type === ("TABLE" as FieldType)) continue
                    tpl += `<tr><td style=\"font-size:12px;padding:4px 6px;width:30%;color:#374151;\">${f.label}</td><td style=\"font-size:12px;padding:4px 6px;\">{{${f.key}_label}}</td></tr>`
                  }
                  tpl += `</table></div>`
                  tpl += `</div>`
                  tpl += `<div>`
                  tpl += `<table style=\"width:100%;border-collapse:collapse;\">`
                  tpl += `<thead><tr>`
                  tpl += `<th style=\"text-align:left;font-size:12px;padding:6px;border-bottom:1px solid #e5e7eb;\">Produk</th>`
                  tpl += `<th style=\"text-align:left;font-size:12px;padding:6px;border-bottom:1px solid #e5e7eb;\">Qty</th>`
                  tpl += `<th style=\"text-align:left;font-size:12px;padding:6px;border-bottom:1px solid #e5e7eb;\">NRC</th>`
                  tpl += `<th style=\"text-align:left;font-size:12px;padding:6px;border-bottom:1px solid #e5e7eb;\">MRC</th>`
                  tpl += `<th style=\"text-align:left;font-size:12px;padding:6px;border-bottom:1px solid #e5e7eb;\">Catatan</th>`
                  tpl += `</tr></thead>`
                  tpl += `<tbody>`
                  tpl += `{{#rows}}<tr>`
                  tpl += `<td style=\"font-size:12px;padding:6px;border-bottom:1px solid #f3f4f6;\">{{row.product_id_label}}</td>`
                  tpl += `<td style=\"font-size:12px;padding:6px;border-bottom:1px solid #f3f4f6;\">{{row.qty}}</td>`
                  tpl += `<td style=\"font-size:12px;padding:6px;border-bottom:1px solid #f3f4f6;\">{{row.nrc}}</td>`
                  tpl += `<td style=\"font-size:12px;padding:6px;border-bottom:1px solid #f3f4f6;\">{{row.mrc}}</td>`
                  tpl += `<td style=\"font-size:12px;padding:6px;border-bottom:1px solid #f3f4f6;\">{{row.notes}}</td>`
                  tpl += `</tr>{{/rows}}`
                  tpl += `</tbody>`
                  tpl += `</table>`
                  tpl += `</div>`
                  tpl += `<div style=\"margin-top:8px;display:flex;gap:8px;align-items:center;\"><span style=\"min-width:80px;font-size:12px;font-weight:600;\">Total</span><span style=\"font-size:12px;font-weight:500;\">{{grandTotal}}</span></div>`
                  tpl += `{{#rows}}<div style=\"font-size:12px;padding:6px 0;border-bottom:1px solid #f3f4f6;\"><div style=\"font-weight:600;\">{{row.product_id_label}}</div><div style=\"color:#6b7280;font-size:11px;margin-top:4px;\">{{row.specs}}</div></div>{{/rows}}`
                  initial = tpl
                }
                return <PreviewTemplateEditor name="previewTemplate" initialHTML={initial} previewCompanyName={company?.name} previewCompanyLogoUrl={company?.logoUrl ?? undefined} previewCompanyAddress={company?.address ?? undefined} />
              })()}
            </div>
            <div className="flex items-center gap-2">
              <Button type="submit">Simpan Template</Button>
            </div>
          </form>
        </div>
        <div className={`space-y-4 ${tab === "notifications" ? "" : "hidden"}`}>
          <div className="text-sm font-semibold">Pengaturan Notifikasi</div>
          <form action={upsertNotifications} className="space-y-3">
            <input type="hidden" name="docTypeId" value={data.id} />
            <div className="space-y-2">
              <div className="text-xs text-muted-foreground">Aktifkan notifikasi terkait perubahan status workflow.</div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="notify_admin_enabled" name="notify_admin_enabled" defaultChecked={(() => { const cfg = (data.config ?? {}) as unknown as { notifyConfig?: { adminEnabled?: boolean } }; return Boolean(cfg.notifyConfig?.adminEnabled) })()} />
                <Label htmlFor="notify_admin_enabled">Tampilkan di Admin</Label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="notify_customer_enabled" name="notify_customer_enabled" defaultChecked={(() => { const cfg = (data.config ?? {}) as unknown as { notifyConfig?: { customerEnabled?: boolean } }; return Boolean(cfg.notifyConfig?.customerEnabled) })()} />
                <Label htmlFor="notify_customer_enabled">Tampilkan di Customer</Label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="notify_toast_enabled" name="notify_toast_enabled" defaultChecked={(() => { const cfg = (data.config ?? {}) as unknown as { notifyConfig?: { toastEnabled?: boolean } }; return Boolean(cfg.notifyConfig?.toastEnabled) })()} />
                <Label htmlFor="notify_toast_enabled">Tampilkan Toast saat Transisi</Label>
              </div>
            </div>
            <div>
              <Button type="submit">Simpan Notifikasi</Button>
            </div>
          </form>
        </div>
        <div className={`space-y-4 ${tab === "relations" ? "" : "hidden"}`}>
          <div className="text-sm font-semibold">Relasi DocType</div>
          <form action={upsertRelations} className="space-y-3">
            <input type="hidden" name="docTypeId" value={data.id} />
            <div className="space-y-2">
              <div className="text-xs text-muted-foreground">Pemetaan DocType anak per field TABLE. Anda bisa memilih DocType berbeda untuk tiap field TABLE.</div>
              <div className="space-y-2">
                {data.fields.filter((f) => f.type === ("TABLE" as FieldType)).map((f) => (
                  <div key={f.id} className="grid grid-cols-1 md:grid-cols-2 gap-3 items-end">
                    <div className="space-y-1">
                      <div className="text-sm font-medium">{f.label}</div>
                      <div className="text-xs text-muted-foreground">Key: {f.key}</div>
                    </div>
                    <div className="space-y-2">
                      <Label>Child DocType</Label>
                      <SearchableSelect
                        name={`childDocTypeKey_${f.key}`}
                        placeholder="Pilih DocType anak untuk baris/items"
                        defaultValue={(relationsCfg.childDocTypes ?? {})[f.key] ?? ""}
                        options={allDocTypes.map((d) => ({ label: `${d.name} (${d.key})`, value: d.key }))}
                      />
                    </div>
                  </div>
                ))}
                {data.fields.filter((f) => f.type === ("TABLE" as FieldType)).length === 0 ? (
                  <div className="text-xs text-muted-foreground">Tidak ada field TABLE pada DocType ini.</div>
                ) : null}
              </div>
            </div>
            <div>
              <Button type="submit">Simpan Relasi</Button>
            </div>
        </form>
        </div>

        {tab === "compute" ? (
          <div className="space-y-4">
            <div className="text-sm font-semibold">Compute (Total dari Rows)</div>
            <form action={upsertComputeConfig} className="space-y-3">
              <input type="hidden" name="docTypeId" value={data.id} />
              {(() => {
                const computeCfg = (data.config ?? {}) as unknown as { compute?: { totalFromRows?: { targetField?: string; childDocTypeKey?: string; qtyKey?: string; nrcKey?: string; mrcKey?: string; formula?: string } | Array<{ targetField?: string; childDocTypeKey?: string; qtyKey?: string; nrcKey?: string; mrcKey?: string; formula?: string }> } }
                const raw = computeCfg.compute?.totalFromRows
                const specs = Array.isArray(raw) ? raw : raw ? [raw] : []
                return (
                  <ComputeSpecsEditor
                    initialSpecs={specs as Array<{ targetField?: string; childDocTypeKey?: string; qtyKey?: string; nrcKey?: string; mrcKey?: string; formula?: string }>}
                    fields={data.fields.map((f) => ({ key: f.key, label: f.label }))}
                    docTypes={allDocTypes.map((d) => ({ key: d.key, name: d.name }))}
                  />
                )
              })()}
              <div>
                <Button type="submit">Simpan</Button>
              </div>
            </form>
          </div>
        ) : null}

      </div>
  )
}
