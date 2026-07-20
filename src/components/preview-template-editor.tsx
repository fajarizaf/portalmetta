"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"

export default function PreviewTemplateEditor({
  name,
  initialHTML,
  previewCompanyName,
  previewCompanyLogoUrl,
  previewCompanyAddress,
}: {
  name: string
  initialHTML?: string
  previewCompanyName?: string
  previewCompanyLogoUrl?: string
  previewCompanyAddress?: string
}) {
  const [data, setData] = React.useState<string>(initialHTML ?? "")
  const [mode, setMode] = React.useState<"html" | "preview">("preview")
  const areaRef = React.useRef<HTMLTextAreaElement | null>(null)
  const overlayRef = React.useRef<HTMLPreElement | null>(null)
  const indentUnit = "  "
  const [highlightEnabled, setHighlightEnabled] = React.useState(true)
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault()
      const el = areaRef.current
      if (!el) return
      const start = el.selectionStart
      const end = el.selectionEnd
      const value = el.value
      const indent = indentUnit
      el.value = value.slice(0, start) + indent + value.slice(end)
      el.selectionStart = el.selectionEnd = start + indent.length
      setData(el.value)
      return
    }
    if (e.key === "Enter") {
      e.preventDefault()
      const el = areaRef.current
      if (!el) return
      const pos = el.selectionStart
      const value = el.value
      const before = value.slice(0, pos)
      const lastLineStart = Math.max(before.lastIndexOf("\n"), 0)
      const currentLine = before.slice(lastLineStart + (lastLineStart > 0 ? 1 : 0))
      const leading = currentLine.match(/^\s*/)?.[0] ?? ""
      const insert = "\n" + leading
      el.value = value.slice(0, pos) + insert + value.slice(el.selectionEnd)
      const newPos = pos + insert.length
      el.selectionStart = el.selectionEnd = newPos
      setData(el.value)
    }
  }
  const onScroll = () => {
    const ta = areaRef.current
    const ov = overlayRef.current
    if (ta && ov) {
      ov.scrollTop = ta.scrollTop
      ov.scrollLeft = ta.scrollLeft
    }
  }
  const escapeHTML = (s: string) => s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
  const highlightHTML = (src: string) => {
    let s = escapeHTML(src)
    s = s.replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="text-slate-400">$1</span>')
    s = s.replace(/\{\{[^}]+\}\}/g, (m) => `<span class="text-fuchsia-600">${m}</span>`)
    s = s.replace(/(&lt;\/?)([a-zA-Z][\w\-]*)([^&]*?)(&gt;)/g, (_m, p1, tag, attrs, p4) => {
      const attrsHl = String(attrs)
        .replace(/([a-zA-Z_:][\w:.-]*)(=)/g, '<span class="text-amber-600">$1</span>$2')
        .replace(/(\"[^\"]*\"|'[^']*')/g, '<span class="text-emerald-600">$1</span>')
      return `<span class="text-blue-600">${p1}${tag}</span>${attrsHl}<span class="text-blue-600">${p4}</span>`
    })
    return s
  }
  const highlighted = React.useMemo(() => highlightHTML(data), [data])
  const formatHTML = (src: string) => {
    const voidTags = new Set(["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"])
    const tokens: Array<{ type: "tag" | "text"; value: string; closing?: boolean; selfClose?: boolean; name?: string }> = []
    let i = 0
    while (i < src.length) {
      const lt = src.indexOf("<", i)
      if (lt === -1) {
        const text = src.slice(i)
        if (text.length) tokens.push({ type: "text", value: text })
        break
      }
      if (lt > i) {
        const text = src.slice(i, lt)
        if (text.length) tokens.push({ type: "text", value: text })
      }
      const gt = src.indexOf(">", lt + 1)
      if (gt === -1) {
        // malformed, push rest as text
        tokens.push({ type: "text", value: src.slice(lt) })
        break
      }
      const raw = src.slice(lt, gt + 1)
      const closing = /^<\//.test(raw)
      const m = raw.match(/^<\/?\s*([a-zA-Z][\w\-]*)/)
      const name = m ? m[1].toLowerCase() : undefined
      const selfClose = /\/>\s*$/.test(raw) || (name ? voidTags.has(name) : false)
      tokens.push({ type: "tag", value: raw, closing, selfClose, name })
      i = gt + 1
    }
    const lines: string[] = []
    let indent = 0
    const pad = () => indentUnit.repeat(Math.max(indent, 0))
    for (const t of tokens) {
      if (t.type === "tag") {
        if (t.closing) indent = Math.max(indent - 1, 0)
        lines.push(pad() + t.value.trim())
        if (!t.closing && !t.selfClose) indent += 1
      } else {
        const txt = t.value.replace(/[\t\r\n]+/g, " ").trim()
        if (txt.length > 0) lines.push(pad() + txt)
      }
    }
    return lines.join("\n")
  }
  const previewHtml = React.useMemo(() => {
    let out = data
    if (previewCompanyName) out = out.replace(/\{\{fromCompanyName\}\}/g, previewCompanyName)
    if (previewCompanyLogoUrl) out = out.replace(/\{\{fromCompanyLogo\}\}/g, previewCompanyLogoUrl)
    if (previewCompanyAddress) out = out.replace(/\{\{fromCompanyAddress\}\}/g, previewCompanyAddress)
    return out
  }, [data, previewCompanyName, previewCompanyLogoUrl, previewCompanyAddress])

  
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Button type="button" variant={mode === "html" ? "default" : "outline"} onClick={() => setMode("html")}>Mode HTML</Button>
        <Button type="button" variant={mode === "preview" ? "default" : "outline"} onClick={() => setMode("preview")}>Mode Preview</Button>
        {mode === "html" ? (
          <Button type="button" variant="secondary" onClick={() => setData((v) => formatHTML(v))}>Format HTML</Button>
        ) : null}
        {mode === "html" ? (
          <Button type="button" variant={highlightEnabled ? "outline" : "default"} onClick={() => setHighlightEnabled((v) => !v)}>
            {highlightEnabled ? "Matikan Highlight" : "Nyalakan Highlight"}
          </Button>
        ) : null}
        {mode === "html" ? (
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setHighlightEnabled(false)
              setTimeout(() => areaRef.current?.select(), 0)
            }}
          >Pilih Semua</Button>
        ) : null}
      </div>
      {mode === "html" ? (
        <div className="relative">
          {highlightEnabled ? (
            <pre
              ref={overlayRef}
              className="border rounded p-2 w-full min-h-40 text-sm font-mono text-transparent pointer-events-none whitespace-pre-wrap break-words overflow-auto"
              aria-hidden="true"
            >
              <code dangerouslySetInnerHTML={{ __html: highlighted }} />
            </pre>
          ) : null}
          <textarea
            ref={areaRef}
            className={`absolute inset-0 border rounded p-2 w-full min-h-40 text-sm font-mono ${highlightEnabled ? "bg-transparent text-transparent caret-black" : "bg-background text-foreground"} overflow-auto`}
            value={data}
            onChange={(e) => setData(e.target.value)}
            onKeyDown={onKeyDown}
            onScroll={onScroll}
            spellCheck={false}
          />
        </div>
      ) : (
        <div className="border rounded p-3">
          <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
        </div>
      )}
      <input type="hidden" name={name} value={data} />
    </div>
  )
}