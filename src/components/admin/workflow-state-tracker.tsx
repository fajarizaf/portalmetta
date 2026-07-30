"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { WorkflowSubmitter } from "@/components/workflow-submitter"
import {
  CheckCircle2,
  Clock,
  XCircle,
  PlayCircle,
  ArrowRight,
  Shield,
  Workflow,
  ChevronDown,
  ChevronUp,
  History,
  Info,
  Check
} from "lucide-react"

export interface WorkflowStateItem {
  name: string
  docStatus?: number
  updates?: Record<string, string>
  actions?: string[]
}

export interface WorkflowTransitionItem {
  from: string
  to: string
  roles: string[]
  condition?: string
}

export interface WorkflowActivityItem {
  at: Date | string
  text: string
}

export interface WorkflowStateTrackerProps {
  workflowName: string
  isBranchSpecific?: boolean
  branchName?: string | null
  currentStatus: string
  effectiveDocStatus?: number | null
  states: WorkflowStateItem[]
  transitions: WorkflowTransitionItem[]
  userRole: string
  canWriteEffective: boolean
  formId: string
  activities: WorkflowActivityItem[]
  hideUnauthorizedActions?: boolean
}

function norm(s: unknown): string {
  return String(s ?? "").trim().toLowerCase()
}

function parseActivityLog(activityText: string) {
  const match = activityText.match(/Status diubah:\s*([^\n→]+)\s*→\s*([^\n]+?)(?:\s+oleh\s+(.+))?$/i)
  if (match) {
    return {
      from: match[1].trim(),
      to: match[2].trim(),
      actor: match[3]?.trim() || "User"
    }
  }
  return null
}

function getStatusBadgeStyle(statusName: string) {
  const s = norm(statusName)
  if (s.includes("cancel") || s.includes("reject") || s.includes("batal") || s.includes("tolak")) {
    return "bg-red-50 text-red-700 border-red-200"
  }
  if (s.includes("draft")) {
    return "bg-slate-100 text-slate-700 border-slate-200"
  }
  if (s.includes("submit") || s.includes("review") || s.includes("pending") || s.includes("process")) {
    return "bg-amber-50 text-amber-800 border-amber-200"
  }
  if (s.includes("approve") || s.includes("active") || s.includes("verified") || s.includes("complete") || s.includes("publish")) {
    return "bg-emerald-50 text-emerald-800 border-emerald-200"
  }
  return "bg-indigo-50 text-indigo-700 border-indigo-200"
}

export function WorkflowStateTracker({
  workflowName,
  isBranchSpecific = false,
  branchName,
  currentStatus,
  effectiveDocStatus,
  states = [],
  transitions = [],
  userRole,
  canWriteEffective,
  formId,
  activities = [],
  hideUnauthorizedActions = true
}: WorkflowStateTrackerProps) {
  const [showHistory, setShowHistory] = React.useState(false)

  // 1. Build List of States (with fallback if empty)
  const normalizedCurrent = norm(currentStatus)
  let effectiveStates: WorkflowStateItem[] = states.length > 0 ? [...states] : [
    { name: "Draft", docStatus: 0 },
    { name: "Pending Approval", docStatus: 0 },
    { name: "Approved", docStatus: 1 }
  ]

  const currentInList = effectiveStates.some(s => norm(s.name) === normalizedCurrent)
  if (!currentInList && currentStatus) {
    effectiveStates.push({ name: currentStatus, docStatus: effectiveDocStatus ?? undefined })
  }

  // 2. Determine Current Step Index
  const currentIndex = effectiveStates.findIndex(s => norm(s.name) === normalizedCurrent)
  const activeStepIdx = currentIndex >= 0 ? currentIndex : 0

  const isNegativeState = normalizedCurrent.includes("cancel") ||
    normalizedCurrent.includes("reject") ||
    normalizedCurrent.includes("batal") ||
    normalizedCurrent.includes("tolak")

  // 3. Map Activity Logs
  const parsedActivities = React.useMemo(() => {
    return activities.map(act => {
      const parsed = parseActivityLog(act.text)
      return {
        at: new Date(act.at),
        rawText: act.text,
        from: parsed?.from,
        to: parsed?.to,
        actor: parsed?.actor
      }
    })
  }, [activities])

  const stateHistoryMap = React.useMemo(() => {
    const map = new Map<string, { at: Date; actor?: string }>()
    for (const act of parsedActivities) {
      if (act.to) {
        map.set(norm(act.to), { at: act.at, actor: act.actor })
      }
    }
    return map
  }, [parsedActivities])

  // 4. Helper to Check Role Authorization for a Transition
  const isUserAuthorizedForTransition = (requiredRoles: string[]) => {
    const ur = norm(userRole)
    const requiredLower = (requiredRoles ?? []).map(r => norm(r))

    if (requiredLower.length === 0) return true
    if (requiredLower.includes("*")) return true

    return requiredLower.some(r => {
      if (r === ur) return true
      if (r === "customer" && (ur.includes("customer") || ur.includes("client"))) return true
      if (r === "admin" && (ur.includes("admin") || ur === "superadmin")) return true
      return false
    })
  }

  // 5. Available Transitions from Current State
  const availableTransitions = React.useMemo(() => {
    return transitions.filter(t => norm(t.from) === normalizedCurrent)
  }, [transitions, normalizedCurrent])

  // Filter transitions current user has permission to execute
  const authorizedTransitions = React.useMemo(() => {
    return availableTransitions.filter(t => {
      const isAllowed = isUserAuthorizedForTransition(t.roles ?? [])
      return canWriteEffective && isAllowed
    })
  }, [availableTransitions, userRole, canWriteEffective])

  // Current State Roles
  const currentStepTransitions = transitions.filter(t => norm(t.from) === normalizedCurrent)
  const currentStepRoles = Array.from(new Set(currentStepTransitions.flatMap(t => t.roles)))

  const totalSteps = effectiveStates.length

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden space-y-0">
      {/* Header Section */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/40">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
            <Workflow className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-sm text-slate-900">Workflow State</h3>
              <span className={cn(
                "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border",
                getStatusBadgeStyle(currentStatus)
              )}>
                {currentStatus}
              </span>
              {isBranchSpecific && branchName && (
                <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                  Cabang: {branchName}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Tahap <strong className="text-slate-800">{activeStepIdx + 1} dari {totalSteps}</strong> • Model: <span className="font-medium text-slate-700">{workflowName}</span>
            </p>
          </div>
        </div>

        {/* History Toggle */}
        <button
          type="button"
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-md px-3 py-1.5 shadow-2xs transition-colors self-start sm:self-auto cursor-pointer"
        >
          <History className="h-3.5 w-3.5 text-slate-500" />
          <span>Riwayat Status</span>
          {showHistory ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </button>
      </div>

      {/* Visual Stepper (Awal -> Akhir) */}
      <div className="p-4 sm:p-5 bg-white border-b border-slate-100">
        <div className="relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-2">
            {effectiveStates.map((st, idx) => {
              const isCurrent = idx === activeStepIdx
              const isPassed = idx < activeStepIdx && !isNegativeState
              const isFuture = idx > activeStepIdx
              const isNegative = isCurrent && isNegativeState
              const hist = stateHistoryMap.get(norm(st.name))

              return (
                <React.Fragment key={st.name}>
                  {/* Step Item */}
                  <div className="flex-1 flex md:flex-col items-center gap-3 md:gap-2 text-left md:text-center min-w-0">
                    {/* Node Icon */}
                    <div className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all border",
                      isNegative
                        ? "bg-red-100 text-red-700 border-red-300 ring-2 ring-red-100"
                        : isCurrent
                          ? "bg-indigo-600 text-white border-indigo-600 ring-4 ring-indigo-50 shadow-sm"
                          : isPassed
                            ? "bg-emerald-500 text-white border-emerald-500"
                            : "bg-slate-100 text-slate-400 border-slate-200"
                    )}>
                      {isNegative ? (
                        <XCircle className="h-4 w-4" />
                      ) : isPassed ? (
                        <Check className="h-4 w-4 stroke-[3]" />
                      ) : isCurrent ? (
                        <PlayCircle className="h-4 w-4" />
                      ) : (
                        <span>{idx + 1}</span>
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center md:justify-center gap-1.5">
                        <span className={cn(
                          "text-xs font-medium truncate",
                          isCurrent ? "font-bold text-indigo-950 text-sm" : isPassed ? "text-slate-900" : "text-slate-400"
                        )}>
                          {st.name}
                        </span>
                      </div>

                      {/* Tag Indicator */}
                      <div>
                        {isCurrent && (
                          <span className={cn(
                            "inline-block text-[10px] font-semibold px-1.5 py-0.2 rounded",
                            isNegative ? "bg-red-100 text-red-700" : "bg-indigo-100 text-indigo-700"
                          )}>
                            ● Tahap Aktif
                          </span>
                        )}
                        {isPassed && hist && (
                          <span className="text-[10px] text-slate-500 block truncate" title={`${hist.actor || "User"} • ${hist.at.toLocaleDateString("id-ID")}`}>
                            ✓ {hist.at.toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
                          </span>
                        )}
                        {isFuture && (
                          <span className="text-[10px] text-slate-400 block">
                            Mendatang
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Desktop Step Connector Arrow */}
                  {idx < effectiveStates.length - 1 && (
                    <div className="hidden md:flex items-center justify-center shrink-0 px-1 text-slate-300">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </React.Fragment>
              )
            })}
          </div>
        </div>
      </div>

      {/* Informative Action Bar */}
      <div className="p-4 sm:p-5 bg-slate-50/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
            <Info className="h-4 w-4 text-indigo-600 shrink-0" />
            <span>Tahap Saat Ini: <strong className="text-indigo-900 font-bold">{currentStatus}</strong></span>
          </div>

          {currentStepRoles.length > 0 ? (
            <p className="text-xs text-slate-600 flex items-center gap-1 pl-6">
              <Shield className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span>Wajib diproses oleh role: <strong className="text-slate-800 font-semibold">{currentStepRoles.join(", ")}</strong></span>
            </p>
          ) : (
            <p className="text-xs text-slate-500 pl-6">
              Dokumen dapat diproses sesuai wewenang.
            </p>
          )}
        </div>

        {/* Transition Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          {hideUnauthorizedActions ? (
            // Show ONLY buttons current user is authorized to click
            authorizedTransitions.length > 0 ? (
              authorizedTransitions.map((t, idx) => (
                <WorkflowSubmitter
                  key={`${t.from}-${t.to}-${idx}`}
                  targetStatus={t.to}
                  formId={formId}
                  size="sm"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs shadow-2xs h-9 px-3.5 cursor-pointer"
                >
                  <ArrowRight className="h-3.5 w-3.5 mr-1.5" />
                  Move to {t.to}
                </WorkflowSubmitter>
              ))
            ) : availableTransitions.length > 0 ? (
              <div className="text-xs text-slate-500 bg-white px-3 py-1.5 rounded-md border border-slate-200 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-amber-500" />
                <span>Menunggu proses oleh pihak terkait ({currentStepRoles.join(", ") || "Admin"}).</span>
              </div>
            ) : (
              <div className="text-xs text-slate-500 bg-white px-3 py-1.5 rounded-md border border-slate-200 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Dokumen telah mencapai tahap akhir.</span>
              </div>
            )
          ) : (
            // Show all buttons (or disabled fallback if hideUnauthorizedActions is false)
            availableTransitions.map((t, idx) => {
              const isUserRoleAllowed = isUserAuthorizedForTransition(t.roles ?? [])
              return (
                <React.Fragment key={`${t.from}-${t.to}-${idx}`}>
                  {canWriteEffective && isUserRoleAllowed ? (
                    <WorkflowSubmitter
                      targetStatus={t.to}
                      formId={formId}
                      size="sm"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs shadow-2xs h-9 px-3.5 cursor-pointer"
                    >
                      <ArrowRight className="h-3.5 w-3.5 mr-1.5" />
                      Move to {t.to}
                    </WorkflowSubmitter>
                  ) : null}
                </React.Fragment>
              )
            })
          )}
        </div>
      </div>

      {/* Expandable History Drawer */}
      {showHistory && (
        <div className="border-t border-slate-200 bg-white p-4 sm:p-5">
          <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <History className="h-4 w-4 text-slate-500" />
            <span>Riwayat Perubahan Status Dokumen</span>
          </h5>
          {parsedActivities.length > 0 ? (
            <div className="space-y-2">
              {parsedActivities.map((act, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-md border border-slate-100">
                  <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-slate-900">{act.rawText}</div>
                    <div className="text-[11px] text-slate-500">
                      {act.at.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                      {act.actor && <span className="ml-1 text-slate-700">• {act.actor}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">Belum ada riwayat transisi status.</p>
          )}
        </div>
      )}
    </div>
  )
}
