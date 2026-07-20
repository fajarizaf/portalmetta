"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "item-aligned",
  align = "center",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        align={align}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <span
        data-slot="select-item-indicator"
        className="absolute right-2 flex size-3.5 items-center justify-center"
      >
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}

type SearchableOption = { label: string; value: string }

function SearchableSelect({
  name,
  options,
  placeholder = "-",
  value,
  defaultValue,
  onValueChange,
  disabled,
  className,
  contentClassName,
  inputPlaceholder = "Cari...",
  allowEmpty = true,
  size = "default",
  emitChangeEvent = true,
  required,
  containerId,
  form,
}: {
  name?: string
  options: SearchableOption[]
  placeholder?: string
  value?: string
  defaultValue?: string
  onValueChange?: (v: string) => void
  disabled?: boolean
  className?: string
  contentClassName?: string
  inputPlaceholder?: string
  allowEmpty?: boolean
  size?: "sm" | "default"
  emitChangeEvent?: boolean
  required?: boolean
  containerId?: string
  form?: string
}) {
  const EMPTY_VALUE = "__EMPTY__"
  const isControlled = typeof value === "string"
  const [internal, setInternal] = React.useState<string>(defaultValue ?? "")
  const selected = isControlled ? (value as string) : internal
  const [query, setQuery] = React.useState<string>("")
  const hiddenRef = React.useRef<HTMLInputElement>(null)

  const filtered = React.useMemo(() => {
    if (!query) return options
    const q = query.toLowerCase()
    return options.filter((o) => o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q))
  }, [options, query])

  const handleChange = (v: string) => {
    const next = v === EMPTY_VALUE ? "" : v
    if (!isControlled) setInternal(next)
    if (onValueChange) onValueChange(next)
    
    // Dispatch native events on hidden input for form validation
    setTimeout(() => {
      if (hiddenRef.current) {
        // Manually set value if needed, though React should update it.
        // However, we need to ensure the event fires after React updates the DOM value.
        // But React updates are batched. 
        // We can just dispatch the event. The value prop will be updated by React re-render.
        // Wait, handleChange triggers re-render (via setInternal or parent passing new value).
        // So dispatching here might be too early if we rely on the DOM value being updated?
        // Actually, validation context checks el.value.
        // If we dispatch event, the listener runs.
        // If React hasn't updated the DOM value yet, el.value might be old.
        // But we can force update the value on the ref just to be sure, or trust React + setTimeout.
        // Since we are in a controlled/uncontrolled hybrid, 'selected' will update on next render.
        // So we should dispatch inside useEffect when 'selected' changes.
      }
    }, 0)
    
    if (emitChangeEvent && name) {
      try {
        window.dispatchEvent(new CustomEvent("docFieldChange", { detail: { name, value: next, containerId } }))
      } catch {}
    }
  }

  React.useEffect(() => {
    if (hiddenRef.current) {
      hiddenRef.current.dispatchEvent(new Event("input", { bubbles: true }))
      hiddenRef.current.dispatchEvent(new Event("change", { bubbles: true }))
    }
  }, [selected])

  return (
    <div className={cn("w-full", className)}>
      {name ? <input ref={hiddenRef} suppressHydrationWarning type="hidden" name={name} value={selected} required={required} form={form} /> : null}
      <SelectPrimitive.Root value={selected} onValueChange={handleChange} disabled={disabled}>
        <SelectTrigger size={size} className={"w-full"}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className={cn("w-full", contentClassName)} position="popper" align="start">
          <div className="p-2">
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={inputPlaceholder} />
          </div>
          {allowEmpty ? (
            <SelectItem value={EMPTY_VALUE}>
              <span>{placeholder}</span>
            </SelectItem>
          ) : null}
          {filtered.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              <span>{o.label}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </SelectPrimitive.Root>
    </div>
  )
}

export { SearchableSelect }
