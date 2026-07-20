"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function HtmlEditor({
  name,
  initialHTML,
  label = "Deskripsi",
  onChange,
  includeHidden = true,
}: {
  name: string
  initialHTML?: string
  label?: string
  onChange?: (html: string) => void
  includeHidden?: boolean
}) {
  const areaRef = React.useRef<HTMLDivElement>(null)
  const selRef = React.useRef<Range | null>(null)
  const hiddenRef = React.useRef<HTMLInputElement>(null)
  const [plainPaste, setPlainPaste] = React.useState(false)

  React.useEffect(() => {
    if (areaRef.current) areaRef.current.innerHTML = initialHTML ?? ""
    if (hiddenRef.current) hiddenRef.current.value = initialHTML ?? ""
    if (onChange) onChange(initialHTML ?? "")
  }, [initialHTML])

  const saveSel = () => {
    const sel = window.getSelection()
    if (!sel || sel.rangeCount === 0) return
    const range = sel.getRangeAt(0)
    if (areaRef.current && sel.anchorNode && areaRef.current.contains(sel.anchorNode)) {
      selRef.current = range
    }
  }

  const restoreSel = () => {
    const sel = window.getSelection()
    if (selRef.current && sel) {
      sel.removeAllRanges()
      sel.addRange(selRef.current)
    }
  }

  const syncHidden = () => {
    if (hiddenRef.current && areaRef.current) {
      hiddenRef.current.value = areaRef.current.innerHTML
      if (onChange) onChange(hiddenRef.current.value)
    }
  }

  const apply = (cmd: string, value?: string) => {
    restoreSel()
    areaRef.current?.focus()
    document.execCommand(cmd, false, value)
    syncHidden()
  }

  const addLink = () => {
    const url = window.prompt("Masukkan URL")
    if (!url) return
    apply("createLink", url)
  }

  const onInput = () => {
    syncHidden()
    saveSel()
  }

  const insertPlain = (text: string) => {
    restoreSel()
    areaRef.current?.focus()
    if (document.queryCommandSupported("insertText")) {
      document.execCommand("insertText", false, text)
    } else {
      const sel = window.getSelection()
      if (!sel || sel.rangeCount === 0) return
      const range = sel.getRangeAt(0)
      range.deleteContents()
      range.insertNode(document.createTextNode(text))
      range.collapse(false)
    }
    syncHidden()
  }

  const onPaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    if (plainPaste) {
      e.preventDefault()
      const text = e.clipboardData?.getData("text/plain") ?? ""
      insertPlain(text)
      saveSel()
      return
    }
    setTimeout(() => {
      syncHidden()
      saveSel()
    }, 0)
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" onMouseDown={(e) => e.preventDefault()} onClick={() => apply("bold")}>Bold</Button>
        <Button type="button" variant="outline" onMouseDown={(e) => e.preventDefault()} onClick={() => apply("italic")}>Italic</Button>
        <Button type="button" variant="outline" onMouseDown={(e) => e.preventDefault()} onClick={() => apply("underline")}>Underline</Button>
        <Button type="button" variant="outline" onMouseDown={(e) => e.preventDefault()} onClick={() => apply("insertUnorderedList")}>Bullets</Button>
        <Button type="button" variant="outline" onMouseDown={(e) => e.preventDefault()} onClick={() => apply("insertOrderedList")}>Numbers</Button>
        <Button type="button" variant="outline" onMouseDown={(e) => e.preventDefault()} onClick={addLink}>Link</Button>
        <Button type="button" variant="outline" onMouseDown={(e) => e.preventDefault()} onClick={() => apply("formatBlock", "h2")}>H2</Button>
        <Button type="button" variant="outline" onMouseDown={(e) => e.preventDefault()} onClick={() => apply("removeFormat")}>Clear</Button>
        <Button type="button" variant={plainPaste ? "default" : "outline"} onMouseDown={(e) => e.preventDefault()} onClick={() => setPlainPaste((v) => !v)}>
          {plainPaste ? "Plain Paste ON" : "Plain Paste OFF"}
        </Button>
      </div>
      <div
        ref={areaRef}
        className="min-h-24 border rounded p-2 text-sm"
        contentEditable
        onInput={onInput}
        onKeyUp={saveSel}
        onMouseUp={saveSel}
        onPaste={onPaste}
      />
      {includeHidden ? (<input ref={hiddenRef} type="hidden" name={name} defaultValue={initialHTML ?? ""} />) : null}
    </div>
  )
}