"use client"

import * as React from "react"

interface AssignmentSelectorProps {
  users: Array<{ id: string; name: string | null; email: string | null }>
  currentUserId: string | null
  docTypeKey: string
  recordId: string
  assignAction: (formData: FormData) => Promise<void>
  disabled?: boolean
}

export function AssignmentSelector({ users, currentUserId, docTypeKey, recordId, assignAction, disabled }: AssignmentSelectorProps) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-xs font-medium text-muted-foreground">Assigned To</span>
      <form action={assignAction}>
        <input type="hidden" name="docTypeKey" value={docTypeKey} />
        <input type="hidden" name="id" value={recordId} />
        <select
          name="assignedToId"
          defaultValue={currentUserId || ""}
          disabled={disabled}
          className="h-8 w-[200px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          onChange={(e) => e.target.form?.requestSubmit()}
        >
          <option value="">Unassigned</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name || u.email}
            </option>
          ))}
        </select>
      </form>
    </div>
  )
}
