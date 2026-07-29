"use client"

import { useState, useActionState, useEffect, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function FormDialog({
  trigger,
  children,
  action,
  title,
  className,
}: {
  trigger: React.ReactNode
  children: React.ReactNode
  action: (prevState: unknown, formData: FormData) => Promise<{ ok: boolean }>
  title?: string
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const [state, formAction] = useActionState(action, undefined)
  const prevStateRef = useRef(state)

  useEffect(() => {
    if (state && state !== prevStateRef.current) {
      setOpen(false)
    }
    prevStateRef.current = state
  }, [state])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={className}>
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}
        <form action={formAction} className="space-y-4">
          {children}
        </form>
      </DialogContent>
    </Dialog>
  )
}
