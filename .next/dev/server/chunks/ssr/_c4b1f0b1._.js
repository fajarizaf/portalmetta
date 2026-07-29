module.exports = [
"[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
            outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-9 px-4 py-2 has-[>svg]:px-3",
            sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
            lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
            icon: "size-9",
            "icon-sm": "size-8",
            "icon-lg": "size-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
function Button({ className, variant = "default", size = "default", asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        "data-variant": variant,
        "data-size": size,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/button.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/src/components/document-preview.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DocumentPreview",
    ()=>DocumentPreview,
    "renderFromTemplate",
    ()=>renderFromTemplate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/select.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function toString(val) {
    if (val === undefined || val === null) return "";
    if (typeof val === "string") return val;
    if (typeof val === "number") return String(val);
    if (typeof val === "boolean") return val ? "Ya" : "Tidak";
    return String(val);
}
function formatIDR(value) {
    const num = typeof value === "number" ? value : Number(value ?? 0);
    if (!Number.isFinite(num)) return toString(value);
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        currencyDisplay: "code",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(num);
}
function labelFor(value, opts) {
    const v = typeof value === "string" ? value : String(value ?? "");
    const found = opts.find((o)=>o.value === v);
    return found ? found.label : v;
}
function specsSummary(d) {
    const items = [];
    for (const [k, v] of Object.entries(d)){
        if (!k.startsWith("spec_")) continue;
        if (k.includes("__qty")) continue;
        const suffix = k.slice(5);
        if (Array.isArray(v)) {
            const parts = [];
            for (const vv of v){
                const valStr = typeof vv === "string" ? vv : String(vv ?? "");
                const qKey = `spec_${suffix}__${valStr}__qty`;
                const qRaw = d[qKey];
                const qty = typeof qRaw === "number" ? qRaw : Number(qRaw ?? "");
                parts.push(Number.isFinite(qty) && qty > 0 ? `${valStr} x${qty}` : valStr);
            }
            items.push(`${suffix}: ${parts.join(", ")}`);
        } else {
            items.push(`${suffix}: ${toString(v)}`);
        }
    }
    return items.join("; ");
}
function specsSummaryHtml(d) {
    const sum = specsSummary(d);
    if (!sum) return "";
    const lines = sum.split(/;\s*/).filter(Boolean);
    const inner = lines.map((ln)=>`<div>${ln}</div>`).join("");
    return `<div style="color:#6b7280;font-size:11px;margin-top:4px;">${inner}</div>`;
}
function buildItemsSectionHtml(args) {
    const childFields = args.childFields ?? [];
    const rows = args.rows ?? [];
    const childOptions = args.childOptions;
    if (childFields.length === 0 || rows.length === 0) return "";
    let html = "";
    html += `<div style="margin-top:12px;">`;
    html += `<div style="font-size:14px;font-weight:600;margin-bottom:6px;">Items</div>`;
    html += `<table style="width:100%;border-collapse:collapse;">`;
    html += `<thead><tr>`;
    for (const cf of childFields){
        html += `<th style="text-align:left;font-size:12px;padding:6px;border-bottom:1px solid #e5e7eb;">${cf.label}</th>`;
    }
    html += `</tr></thead>`;
    html += `<tbody>`;
    for (const row of rows){
        const d = row.data;
        html += `<tr>`;
        for (const cf of childFields){
            const raw = d[cf.key];
            let val = "";
            if (cf.type === "DROPDOWN") {
                const opts = childOptions[cf.key] ?? [];
                val = labelFor(raw, opts);
            } else if (cf.type === "CHECKBOX") {
                val = toString(Boolean(raw));
            } else if (cf.type === "PRICE") {
                val = formatIDR(raw);
            } else {
                val = toString(raw);
            }
            html += `<td style="font-size:12px;padding:6px;border-bottom:1px solid #f3f4f6;">${val}</td>`;
        }
        html += `</tr>`;
    }
    html += `</tbody>`;
    html += `</table>`;
    const hasSpecBlocks = rows.some((r)=>Object.keys(r.data ?? {}).some((k)=>k.startsWith("spec_")));
    if (hasSpecBlocks) {
        html += `<div style="margin-top:8px;">`;
        html += `<div style="font-size:14px;font-weight:600;margin-bottom:6px;">Spesifikasi Items</div>`;
        for (const row of rows){
            const d = row.data;
            const specHtml = specsSummaryHtml(d);
            if (!specHtml) continue;
            const prodField = childFields.find((f)=>f.key.toLowerCase() === "product_id" || f.key.toLowerCase().includes("product"));
            let prodLabel = "Item";
            if (prodField) {
                const raw = d[prodField.key];
                if (prodField.type === "DROPDOWN") {
                    const opts = childOptions[prodField.key] ?? [];
                    prodLabel = labelFor(raw, opts);
                } else {
                    prodLabel = toString(raw);
                }
            }
            html += `<div style="font-size:12px;padding:6px 0;border-bottom:1px solid #f3f4f6;"><div style="font-weight:600;">${prodLabel}</div>${specHtml}</div>`;
        }
        html += `</div>`;
    }
    html += `</div>`;
    return html;
}
function buildDefaultHtml(args) {
    const { docTypeName, code, status, currency, grandTotal, fields, values, dynamicOptions, childFields = [], rows = [], childOptions, fromCompanyName, companyLogoUrl, fromCompanyEmail, fromCompanyPhone, toName } = args;
    let html = "";
    html += `<div style="font-family: ui-sans-serif, system-ui, -apple-system;">`;
    html += `<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">`;
    if (companyLogoUrl) html += `<img src="${companyLogoUrl}" style="height:40px;object-fit:contain;border-radius:4px;" />`;
    html += `<div>`;
    html += `<div style="font-size:20px;font-weight:600;margin-bottom:4px;">${docTypeName}</div>`;
    const metaParts = [];
    if (toName && toName.trim().length > 0) metaParts.push(`To: ${toName}`);
    if (fromCompanyName && fromCompanyName.trim().length > 0) metaParts.push(`From: ${fromCompanyName}`);
    if (fromCompanyEmail && fromCompanyEmail.trim().length > 0) metaParts.push(fromCompanyEmail);
    if (fromCompanyPhone && fromCompanyPhone.trim().length > 0) metaParts.push(fromCompanyPhone);
    metaParts.push(`${toString(code ?? "")} • ${toString(status ?? "")}`);
    html += `<div style="font-size:12px;color:#6b7280;">${metaParts.join(" • ")}</div>`;
    html += `</div>`;
    html += `</div>`;
    html += `<div style="margin-bottom:12px;">`;
    html += `<table style="width:100%;border-collapse:collapse;">`;
    for (const f of fields){
        if (f.type === "TABLE") continue;
        if (f.key === "prorate_details" || f.key === "prorateDetails" || f.key === "subscription_id" || f.key === "subscription" || f.key === "subscriptionId" || f.key === "billing_period_start" || f.key === "billing_period_end" || f.key === "nrc_amount" || f.key === "mrc_amount") continue;
        const raw = values[f.key];
        let val = "";
        if (f.type === "DROPDOWN") {
            const opts = dynamicOptions[f.key] ?? [];
            val = labelFor(raw, opts);
        } else if (f.type === "CHECKBOX") {
            val = toString(Boolean(raw));
        } else if (f.type === "PRICE") {
            val = formatIDR(raw);
        } else {
            val = toString(raw);
        }
        html += `<tr><td style="font-size:12px;padding:4px 6px;width:30%;color:#374151;">${f.label}</td><td style="font-size:12px;padding:4px 6px;">${val}</td></tr>`;
    }
    html += `</table>`;
    html += `</div>`;
    if (childFields.length > 0) {
        html += `<div style="font-size:14px;font-weight:600;margin-bottom:6px;">Items</div>`;
        html += `<table style="width:100%;border-collapse:collapse;">`;
        html += `<thead><tr>`;
        for (const cf of childFields){
            html += `<th style="text-align:left;font-size:12px;padding:6px;border-bottom:1px solid #e5e7eb;">${cf.label}</th>`;
        }
        html += `</tr></thead>`;
        html += `<tbody>`;
        for (const row of rows){
            const d = row.data;
            html += `<tr>`;
            for (const cf of childFields){
                const raw = d[cf.key];
                let val = "";
                if (cf.type === "DROPDOWN") {
                    const opts = childOptions[cf.key] ?? [];
                    val = labelFor(raw, opts);
                } else if (cf.type === "CHECKBOX") {
                    val = toString(Boolean(raw));
                } else if (cf.type === "PRICE") {
                    val = formatIDR(raw);
                } else {
                    val = toString(raw);
                }
                html += `<td style="font-size:12px;padding:6px;border-bottom:1px solid #f3f4f6;">${val}</td>`;
            }
            html += `</tr>`;
        }
        html += `</tbody>`;
        html += `</table>`;
        const hasSpecBlocks = rows.some((r)=>Object.keys(r.data ?? {}).some((k)=>k.startsWith("spec_")));
        if (hasSpecBlocks) {
            html += `<div style="margin-top:8px;">`;
            html += `<div style="font-size:14px;font-weight:600;margin-bottom:6px;">Spesifikasi Items</div>`;
            for (const row of rows){
                const d = row.data;
                const specHtml = specsSummaryHtml(d);
                if (!specHtml) continue;
                const prodField = childFields.find((f)=>f.key.toLowerCase() === "product_id" || f.key.toLowerCase().includes("product"));
                let prodLabel = "Item";
                if (prodField) {
                    const raw = d[prodField.key];
                    if (prodField.type === "DROPDOWN") {
                        const opts = childOptions[prodField.key] ?? [];
                        prodLabel = labelFor(raw, opts);
                    } else {
                        prodLabel = toString(raw);
                    }
                }
                html += `<div style="font-size:12px;padding:6px 0;border-bottom:1px solid #f3f4f6;"><div style="font-weight:600;">${prodLabel}</div>${specHtml}</div>`;
            }
            html += `</div>`;
        }
    }
    if (currency || typeof grandTotal === "number") {
        html += `<div style="margin-top:8px;display:flex;gap:8px;align-items:center;"><span style="min-width:80px;font-size:12px;font-weight:600;">Total</span><span style="font-size:12px;font-weight:500;">${formatIDR(grandTotal ?? 0)}</span></div>`;
    }
    html += `</div>`;
    return html;
}
function buildVisualHtml(args) {
    const { docTypeName, code, status, currency, grandTotal, fields, values, dynamicOptions, rows = [], childOptions, fieldCfgs, childCfgs, childFields = [], specPlacement } = args;
    let html = "";
    html += `<div style="font-family: ui-sans-serif, system-ui, -apple-system;">`;
    html += `<div style="font-size:20px;font-weight:600;margin-bottom:4px;">${docTypeName}</div>`;
    html += `<div style="font-size:12px;color:#6b7280;margin-bottom:12px;">${toString(code ?? "")} • ${toString(status ?? "")}</div>`;
    html += `<div style="margin-bottom:12px;">`;
    html += `<table style="width:100%;border-collapse:collapse;">`;
    for (const fc of fieldCfgs){
        if (!fc.enabled) continue;
        const f = fields.find((x)=>x.key === fc.key);
        if (!f || f.type === "TABLE") continue;
        const raw = values[f.key];
        let val = "";
        if (f.type === "DROPDOWN") {
            const opts = dynamicOptions[f.key] ?? [];
            val = labelFor(raw, opts);
        } else if (f.type === "CHECKBOX") {
            val = toString(Boolean(raw));
        } else if (f.type === "PRICE") {
            val = formatIDR(raw);
        } else {
            val = toString(raw);
        }
        html += `<tr><td style="font-size:12px;padding:4px 6px;width:30%;color:#374151;">${fc.label}</td><td style="font-size:12px;padding:4px 6px;">${val}</td></tr>`;
    }
    html += `</table>`;
    html += `</div>`;
    const activeChildCols = childCfgs.filter((c)=>c.enabled);
    if (activeChildCols.length > 0) {
        html += `<div style="font-size:14px;font-weight:600;margin-bottom:6px;">Items</div>`;
        html += `<table style="width:100%;border-collapse:collapse;">`;
        html += `<thead><tr>`;
        for (const cc of activeChildCols){
            html += `<th style="text-align:left;font-size:12px;padding:6px;border-bottom:1px solid #e5e7eb;">${cc.label}</th>`;
        }
        html += `</tr></thead>`;
        html += `<tbody>`;
        const prodField = childFields.find((f)=>f.key.toLowerCase() === "product_id" || f.key.toLowerCase().includes("product"));
        for (const row of rows){
            const d = row.data;
            html += `<tr>`;
            for (const cc of activeChildCols){
                const cf = childFields.find((x)=>x.key === cc.key);
                const raw = d[cc.key];
                let val = "";
                if (cf?.type === "DROPDOWN") {
                    const opts = childOptions[cc.key] ?? [];
                    val = labelFor(raw, opts);
                } else if (cf?.type === "CHECKBOX") {
                    val = toString(Boolean(raw));
                } else if (cf?.type === "PRICE") {
                    val = formatIDR(raw);
                } else {
                    val = toString(raw);
                }
                let extra = "";
                if (specPlacement === "under_product" && prodField && cc.key === prodField.key) {
                    extra = specsSummaryHtml(d);
                }
                html += `<td style="font-size:12px;padding:6px;border-bottom:1px solid #f3f4f6;">${val}${extra}</td>`;
            }
            html += `</tr>`;
        }
        html += `</tbody>`;
        html += `</table>`;
        if (specPlacement === "separate") {
            html += `<div style="margin-top:8px;">`;
            html += `<div style="font-size:14px;font-weight:600;margin-bottom:6px;">Spesifikasi Items</div>`;
            for (const row of rows){
                const d = row.data;
                const specHtml = specsSummaryHtml(d);
                if (!specHtml) continue;
                let prodLabel = "Item";
                if (prodField) {
                    const raw = d[prodField.key];
                    if (prodField.type === "DROPDOWN") {
                        const opts = childOptions[prodField.key] ?? [];
                        prodLabel = labelFor(raw, opts);
                    } else {
                        prodLabel = toString(raw);
                    }
                }
                html += `<div style="font-size:12px;padding:6px 0;border-bottom:1px solid #f3f4f6;"><div style="font-weight:600;">${prodLabel}</div>${specHtml}</div>`;
            }
            html += `</div>`;
        }
    }
    if (currency || typeof grandTotal === "number") {
        html += `<div style="margin-top:8px;display:flex;gap:8px;align-items:center;"><span style="min-width:80px;font-size:12px;font-weight:600;">Total</span><span style="font-size:12px;font-weight:500;">${formatIDR(grandTotal ?? 0)}</span></div>`;
    }
    html += `</div>`;
    return html;
}
function buildInvoiceItemsTrsHtml(originalTrHtml, args) {
    const rows = args.rows ?? [];
    const tdOpen = originalTrHtml.match(/<td[^>]*>/gi) ?? [];
    const fallbackTd = `<td style="font-size:12px;padding:6px;border-bottom:1px solid #f3f4f6;">`;
    const colCount = Math.max(2, tdOpen.length || 0);
    const getTdOpen = (i)=>tdOpen[i] ?? tdOpen[0] ?? fallbackTd;
    const parts = [];
    for (const row of rows){
        const d = row.data ?? {};
        const desc = toString(d["description"] ?? "");
        const qtyRaw = d["qty"];
        const priceRaw = d["price"];
        const discRaw = d["discount_percent"];
        const qty = typeof qtyRaw === "number" ? qtyRaw : Number(qtyRaw ?? 0);
        const price = typeof priceRaw === "number" ? priceRaw : Number(priceRaw ?? 0);
        const disc = typeof discRaw === "number" ? discRaw : Number(discRaw ?? 0);
        const subtotalRaw = d["subtotal"];
        const subtotalCalc = qty * price * (disc ? 1 - disc / 100 : 1);
        const subtotal = typeof subtotalRaw === "number" ? subtotalRaw : Number(subtotalRaw ?? subtotalCalc ?? 0);
        const descFull = (()=>{
            const base = desc || "Item";
            const extras = [];
            if (Number.isFinite(qty) && qty > 0) extras.push(`Qty ${qty}`);
            if (Number.isFinite(price) && price > 0) extras.push(`@ ${formatIDR(price)}`);
            if (Number.isFinite(disc) && disc > 0) extras.push(`Disc ${disc}%`);
            return extras.length > 0 ? `${base} (${extras.join(" ")})` : base;
        })();
        let tr = "<tr>";
        for(let i = 0; i < colCount; i++){
            let cell = "";
            if (colCount === 2) {
                cell = i === 0 ? descFull : formatIDR(subtotal || 0);
            } else if (colCount === 3) {
                cell = i === 0 ? descFull : i === 1 ? toString(qty || "") : formatIDR(subtotal || 0);
            } else if (colCount === 4) {
                cell = i === 0 ? descFull : i === 1 ? toString(qty || "") : i === 2 ? formatIDR(price || 0) : formatIDR(subtotal || 0);
            } else {
                cell = i === 0 ? descFull : i === colCount - 1 ? formatIDR(subtotal || 0) : "";
            }
            tr += `${getTdOpen(i)}${cell}</td>`;
        }
        tr += "</tr>";
        parts.push(tr);
    }
    return parts.join("");
}
function renderFromTemplate(tpl, args) {
    const { docTypeName, code, status, currency, grandTotal, fields, values, dynamicOptions, childFields = [], rows = [], childOptions, fromCompanyName, companyLogoUrl, fromCompanyAddress, fromCompanyEmail, fromCompanyPhone, customerCompanyName, customerEmail, customerPhoneNumber, customerAddress, customerJobTitle, creatorName, creatorEmail, creatorRole, seriesName, parentSeriesName, grandParentSeriesName, createdDate, toName, assignedToName, assignedToEmail, assignedToRole, salesManagerName, salesManagerEmail, parentRecord, grandParentRecord, companyPIC, customerPIC } = args;
    let out = tpl;
    out = out.replace(/\{\{docTypeName\}\}/g, toString(docTypeName));
    out = out.replace(/\{\{code\}\}/g, toString(code ?? ""));
    if (parentRecord) {
        out = out.replace(/\{\{parent\.code\}\}/g, toString(parentRecord.code ?? ""));
        out = out.replace(/\{\{parent\.id\}\}/g, toString(parentRecord.id ?? ""));
        const pData = parentRecord.data ?? {};
        for (const [pk, pv] of Object.entries(pData)){
            out = out.replace(new RegExp(`\\{\\{parent\\.${pk}\\}\\}`, "g"), toString(pv));
        }
        // Also support parent.naming_series if it exists in data or is alias for code
        if (pData.naming_series) {
            out = out.replace(/\{\{parent\.naming_series\}\}/g, toString(pData.naming_series));
        }
        // Also support parent.status
        if (parentRecord.status) {
            out = out.replace(/\{\{parent\.status\}\}/g, toString(parentRecord.status));
        }
        // Also support parent.created_at formatted
        if (parentRecord.createdAt) {
            const dt = new Date(parentRecord.createdAt);
            if (!isNaN(dt.getTime())) {
                const y = dt.getFullYear();
                const m = String(dt.getMonth() + 1).padStart(2, "0");
                const d = String(dt.getDate()).padStart(2, "0");
                const fmt = `${y}-${m}-${d}`;
                out = out.replace(/\{\{parent\.created_at\}\}/g, fmt);
                out = out.replace(/\{\{parent\.createdAt\}\}/g, fmt);
                out = out.replace(/\{\{parent\.createdDate\}\}/g, fmt);
            }
        }
    }
    if (parentSeriesName) {
        out = out.replace(/\{\{parent\.naming_series\}\}/g, toString(parentSeriesName));
        out = out.replace(/\{\{parent\.series_name\}\}/g, toString(parentSeriesName));
    }
    if (grandParentRecord) {
        out = out.replace(/\{\{parent\.parent\.code\}\}/g, toString(grandParentRecord.code ?? ""));
        out = out.replace(/\{\{parent\.parent\.id\}\}/g, toString(grandParentRecord.id ?? ""));
        const gpData = grandParentRecord.data ?? {};
        for (const [gk, gv] of Object.entries(gpData)){
            out = out.replace(new RegExp(`\\{\\{parent\\.parent\\.${gk}\\}\\}`, "g"), toString(gv));
        }
        const gpStatus = grandParentRecord.status;
        if (gpStatus !== undefined) {
            out = out.replace(/\{\{parent\.parent\.status\}\}/g, toString(gpStatus));
        }
        const gpCreated = grandParentRecord.createdAt;
        if (gpCreated) {
            const dt = new Date(gpCreated);
            if (!isNaN(dt.getTime())) {
                const y = dt.getFullYear();
                const m = String(dt.getMonth() + 1).padStart(2, "0");
                const d = String(dt.getDate()).padStart(2, "0");
                const fmt = `${y}-${m}-${d}`;
                out = out.replace(/\{\{parent\.parent\.created_at\}\}/g, fmt);
                out = out.replace(/\{\{parent\.parent\.createdAt\}\}/g, fmt);
                out = out.replace(/\{\{parent\.parent\.createdDate\}\}/g, fmt);
            }
        }
    }
    if (grandParentSeriesName) {
        out = out.replace(/\{\{parent\.parent\.naming_series\}\}/g, toString(grandParentSeriesName));
        out = out.replace(/\{\{parent\.parent\.series_name\}\}/g, toString(grandParentSeriesName));
    }
    out = out.replace(/\{\{status\}\}/g, toString(status ?? ""));
    out = out.replace(/\{\{currency\}\}/g, toString(currency ?? ""));
    out = out.replace(/\{\{grandTotal\}\}/g, toString(grandTotal ?? ""));
    out = out.replace(/\{\{grandTotal_currency\}\}/g, formatIDR(grandTotal ?? 0));
    out = out.replace(new RegExp("\\{\\{\\s*fromCompanyName\\s*\\}\\}", "g"), toString(fromCompanyName ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*fromCompanyLogo\\s*\\}\\}", "g"), toString(companyLogoUrl ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*fromCompanyAddress\\s*\\}\\}", "g"), toString(fromCompanyAddress ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*fromCompanyEmail\\s*\\}\\}", "g"), toString(fromCompanyEmail ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*fromCompanyPhone\\s*\\}\\}", "g"), toString(fromCompanyPhone ?? ""));
    // Company PIC replacements - handle both camelCase and snake_case, and clean up if null
    out = out.replace(new RegExp("\\{\\{\\s*company\\.pic\\.name\\s*\\}\\}", "g"), toString(companyPIC?.name ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*company\\.pic\\.email\\s*\\}\\}", "g"), toString(companyPIC?.email ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*company\\.pic\\.phoneNumber\\s*\\}\\}", "g"), toString(companyPIC?.phoneNumber ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*company\\.pic\\.technicalContactName\\s*\\}\\}", "g"), toString(companyPIC?.technicalContactName ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*company\\.pic\\.billingContactName\\s*\\}\\}", "g"), toString(companyPIC?.billingContactName ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*company\\.pic\\.technicalPhoneNumber\\s*\\}\\}", "g"), toString(companyPIC?.technicalPhoneNumber ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*company\\.pic\\.billingPhoneNumber\\s*\\}\\}", "g"), toString(companyPIC?.billingPhoneNumber ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*company\\.pic\\.technicalEmail\\s*\\}\\}", "g"), toString(companyPIC?.technicalEmail ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*company\\.pic\\.billingEmail\\s*\\}\\}", "g"), toString(companyPIC?.billingEmail ?? ""));
    // Snake case aliases for Company PIC
    out = out.replace(new RegExp("\\{\\{\\s*company_pic_name\\s*\\}\\}", "g"), toString(companyPIC?.name ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*company_pic_email\\s*\\}\\}", "g"), toString(companyPIC?.email ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*company_pic_phone\\s*\\}\\}", "g"), toString(companyPIC?.phoneNumber ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*company_pic_technical_contact_name\\s*\\}\\}", "g"), toString(companyPIC?.technicalContactName ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*company_pic_billing_contact_name\\s*\\}\\}", "g"), toString(companyPIC?.billingContactName ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*company_pic_technical_phone\\s*\\}\\}", "g"), toString(companyPIC?.technicalPhoneNumber ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*company_pic_billing_phone\\s*\\}\\}", "g"), toString(companyPIC?.billingPhoneNumber ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*company_pic_technical_email\\s*\\}\\}", "g"), toString(companyPIC?.technicalEmail ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*company_pic_billing_email\\s*\\}\\}", "g"), toString(companyPIC?.billingEmail ?? ""));
    // Customer PIC replacements - handle both camelCase and snake_case, and clean up if null
    out = out.replace(new RegExp("\\{\\{\\s*customer\\.pic\\.name\\s*\\}\\}", "g"), toString(customerPIC?.name ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*customer\\.pic\\.email\\s*\\}\\}", "g"), toString(customerPIC?.email ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*customer\\.pic\\.phoneNumber\\s*\\}\\}", "g"), toString(customerPIC?.phoneNumber ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*customer\\.pic\\.technicalContactName\\s*\\}\\}", "g"), toString(customerPIC?.technicalContactName ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*customer\\.pic\\.billingContactName\\s*\\}\\}", "g"), toString(customerPIC?.billingContactName ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*customer\\.pic\\.technicalPhoneNumber\\s*\\}\\}", "g"), toString(customerPIC?.technicalPhoneNumber ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*customer\\.pic\\.billingPhoneNumber\\s*\\}\\}", "g"), toString(customerPIC?.billingPhoneNumber ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*customer\\.pic\\.technicalEmail\\s*\\}\\}", "g"), toString(customerPIC?.technicalEmail ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*customer\\.pic\\.billingEmail\\s*\\}\\}", "g"), toString(customerPIC?.billingEmail ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*customer\\.pic\\.jobTitle\\s*\\}\\}", "g"), toString(customerPIC?.jobTitle ?? ""));
    // Snake case aliases for Customer PIC
    out = out.replace(new RegExp("\\{\\{\\s*customer_pic_name\\s*\\}\\}", "g"), toString(customerPIC?.name ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*customer_pic_email\\s*\\}\\}", "g"), toString(customerPIC?.email ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*customer_pic_phone\\s*\\}\\}", "g"), toString(customerPIC?.phoneNumber ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*customer_pic_technical_contact_name\\s*\\}\\}", "g"), toString(customerPIC?.technicalContactName ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*customer_pic_billing_contact_name\\s*\\}\\}", "g"), toString(customerPIC?.billingContactName ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*customer_pic_technical_phone\\s*\\}\\}", "g"), toString(customerPIC?.technicalPhoneNumber ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*customer_pic_billing_phone\\s*\\}\\}", "g"), toString(customerPIC?.billingPhoneNumber ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*customer_pic_technical_email\\s*\\}\\}", "g"), toString(customerPIC?.technicalEmail ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*customer_pic_billing_email\\s*\\}\\}", "g"), toString(customerPIC?.billingEmail ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*company_name_label\\s*\\}\\}", "g"), toString(customerCompanyName ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*company_email_label\\s*\\}\\}", "g"), toString(customerEmail ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*company_phonenumber_label\\s*\\}\\}", "g"), toString(customerPhoneNumber ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*company_address_label\\s*\\}\\}", "g"), toString(customerAddress ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*creator_name_label\\s*\\}\\}", "g"), toString(creatorName ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*creator_email_label\\s*\\}\\}", "g"), toString(creatorEmail ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*creator_role_label\\s*\\}\\}", "g"), toString(creatorRole ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*creator_role\\s*\\}\\}", "g"), toString(creatorRole ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*creator\\.role\\.name\\s*\\}\\}", "g"), toString(creatorRole ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*creator\\.role\\s*\\}\\}", "g"), toString(creatorRole ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*series_name_label\\s*\\}\\}", "g"), toString(seriesName ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*naming_series_label\\s*\\}\\}", "g"), toString(seriesName ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*document_series_label\\s*\\}\\}", "g"), toString(seriesName ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*series_name\\s*\\}\\}", "g"), toString(seriesName ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*naming_series\\s*\\}\\}", "g"), toString(seriesName ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*document_series\\s*\\}\\}", "g"), toString(seriesName ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*created_date_label\\s*\\}\\}", "g"), toString(createdDate ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*created_at_label\\s*\\}\\}", "g"), toString(createdDate ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*created_date\\s*\\}\\}", "g"), toString(createdDate ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*created_at\\s*\\}\\}", "g"), toString(createdDate ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*document_created_date_label\\s*\\}\\}", "g"), toString(createdDate ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*customer_email_label\\s*\\}\\}", "g"), toString(customerEmail ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*customer_phonenumber_label\\s*\\}\\}", "g"), toString(customerPhoneNumber ?? ""));
    // Direct aliases for customer info
    out = out.replace(new RegExp("\\{\\{\\s*customerCompanyName\\s*\\}\\}", "g"), toString(customerCompanyName ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*customerEmail\\s*\\}\\}", "g"), toString(customerEmail ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*customerPhoneNumber\\s*\\}\\}", "g"), toString(customerPhoneNumber ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*customerAddress\\s*\\}\\}", "g"), toString(customerAddress ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*customerJobTitle\\s*\\}\\}", "g"), toString(customerJobTitle ?? ""));
    // Snake case aliases for customer info
    out = out.replace(new RegExp("\\{\\{\\s*customer_company_name\\s*\\}\\}", "g"), toString(customerCompanyName ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*customer_email\\s*\\}\\}", "g"), toString(customerEmail ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*customer_phone_number\\s*\\}\\}", "g"), toString(customerPhoneNumber ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*customer_address\\s*\\}\\}", "g"), toString(customerAddress ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*customer_job_title\\s*\\}\\}", "g"), toString(customerJobTitle ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*customer_address_label\\s*\\}\\}", "g"), toString(customerAddress ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*customer_job_title\\s*\\}\\}", "g"), toString(customerJobTitle ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*customer_job_title_label\\s*\\}\\}", "g"), toString(customerJobTitle ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*customer\\.jobTitle\\s*\\}\\}", "g"), toString(customerJobTitle ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*toName\\s*\\}\\}", "g"), toString(toName ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*assignedToName\\s*\\}\\}", "g"), toString(assignedToName ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*assignedToEmail\\s*\\}\\}", "g"), toString(assignedToEmail ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*assignedToRole\\s*\\}\\}", "g"), toString(assignedToRole ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*assigned_to_role\\s*\\}\\}", "g"), toString(assignedToRole ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*assigned_to_role_label\\s*\\}\\}", "g"), toString(assignedToRole ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*assignedTo\\.role\\.name\\s*\\}\\}", "g"), toString(assignedToRole ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*assigned_to_name_label\\s*\\}\\}", "g"), toString(assignedToName ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*assigned_to_email_label\\s*\\}\\}", "g"), toString(assignedToEmail ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*salesManagerName\\s*\\}\\}", "g"), toString(salesManagerName ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*salesManagerEmail\\s*\\}\\}", "g"), toString(salesManagerEmail ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*sales_manager_name\\s*\\}\\}", "g"), toString(salesManagerName ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*sales_manager_email\\s*\\}\\}", "g"), toString(salesManagerEmail ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*salesManager\\.name\\s*\\}\\}", "g"), toString(salesManagerName ?? ""));
    out = out.replace(new RegExp("\\{\\{\\s*salesManager\\.email\\s*\\}\\}", "g"), toString(salesManagerEmail ?? ""));
    for (const f of fields){
        const raw = values[f.key];
        if (f.key === "prorate_details" || f.key === "prorateDetails" || f.key === "subscription_id" || f.key === "subscription" || f.key === "subscriptionId" || f.key === "billing_period_start" || f.key === "billing_period_end" || f.key === "nrc_amount" || f.key === "mrc_amount") {
            const escapedKey = f.key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            out = out.replace(new RegExp(`\\{\\{\\s*${escapedKey}\\s*\\}\\}`, "g"), "");
            out = out.replace(new RegExp(`\\{\\{\\s*${escapedKey}_label\\s*\\}\\}`, "g"), "");
            out = out.replace(new RegExp(`\\{\\{\\s*${escapedKey}_currency\\s*\\}\\}`, "g"), "");
            continue;
        }
        const val = f.type === "DROPDOWN" ? labelFor(raw, dynamicOptions[f.key] ?? []) : f.type === "CHECKBOX" ? toString(Boolean(raw)) : toString(raw);
        // Support {{field_key}}, {{ field_key }}, {{field_key_label}}, etc.
        const escapedKey = f.key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        out = out.replace(new RegExp(`\\{\\{\\s*${escapedKey}\\s*\\}\\}`, "g"), toString(raw));
        out = out.replace(new RegExp(`\\{\\{\\s*${escapedKey}_label\\s*\\}\\}`, "g"), val);
        out = out.replace(new RegExp(`\\{\\{\\s*${escapedKey}_currency\\s*\\}\\}`, "g"), formatIDR(typeof raw === "number" ? raw : Number(raw ?? 0)));
    }
    out = out.replace(/\{\{#rows\}\}([\s\S]*?)\{\{\/rows\}\}/g, (_, inner)=>{
        const parts = [];
        for (const row of rows){
            const d = row.data;
            let p = inner;
            for (const cf of childFields){
                const raw = d[cf.key];
                const val = cf.type === "DROPDOWN" ? labelFor(raw, childOptions[cf.key] ?? []) : cf.type === "CHECKBOX" ? toString(Boolean(raw)) : toString(raw);
                p = p.replace(new RegExp(`\\{\\{row\\.${cf.key}\\}\\}`, "g"), toString(raw));
                p = p.replace(new RegExp(`\\{\\{row\\.${cf.key}_label\\}\\}`, "g"), val);
                p = p.replace(new RegExp(`\\{\\{row\\.${cf.key}_currency\\}\\}`, "g"), formatIDR(typeof raw === "number" ? raw : Number(raw ?? 0)));
            }
            for (const [rk, rv] of Object.entries(d)){
                if (!rk.startsWith("spec_")) continue;
                const rawStr = Array.isArray(rv) ? rv.map((x)=>typeof x === "string" ? x : String(x ?? "")).join(", ") : toString(rv);
                p = p.replace(new RegExp(`\\{\\{row\\.${rk}\\}\\}`, "g"), rawStr);
            }
            const specSum = specsSummary(d);
            p = p.replace(/\{\{row\.specs\}\}/g, specSum);
            p = p.replace(/\{\{row\.specs_summary\}\}/g, specSum);
            parts.push(p);
        }
        return parts.join("");
    });
    out = out.replace(/\{\{sum_rows\.([a-zA-Z0-9_]+)_currency\}\}/g, (_m, k)=>{
        const sum = rows.reduce((acc, r)=>{
            const raw = (r.data ?? {})[k];
            const num = typeof raw === "number" ? raw : Number(raw ?? 0);
            return acc + (Number.isFinite(num) ? num : 0);
        }, 0);
        return formatIDR(sum);
    });
    out = out.replace(/\{\{sum_rows\.([a-zA-Z0-9_]+)\}\}/g, (_m, k)=>{
        const sum = rows.reduce((acc, r)=>{
            const raw = (r.data ?? {})[k];
            const num = typeof raw === "number" ? raw : Number(raw ?? 0);
            return acc + (Number.isFinite(num) ? num : 0);
        }, 0);
        return toString(sum);
    });
    {
        const itemsHtml = buildItemsSectionHtml({
            childFields,
            rows,
            childOptions
        });
        out = out.replace(/\{\{\s*(items|items_html|items_section_html|items_table_html|itemsTable|itemsSection)\s*\}\}/g, itemsHtml);
    }
    return out;
}
function DocumentPreview({ docTypeKey, docTypeName, code, status, currency, grandTotal, fields, values, dynamicOptions, childFields, rows, childOptions, defaultTemplate, companyName, companyLogoUrl, companyAddress, companyEmail, companyPhoneNumber, customerEmail, customerPhoneNumber, customerAddress, customerJobTitle, customerCompanyName, creatorName, creatorEmail, creatorRole, seriesName, parentSeriesName, grandParentSeriesName, createdDate, assignedToName, assignedToEmail, assignedToRole, salesManagerName, salesManagerEmail, parentRecord, grandParentRecord, companyPIC, customerPIC, grandTotalInWords }) {
    const html = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        const tpl = (defaultTemplate ?? "").trim();
        const tplHasRows = /\{\{\#rows\}\}/.test(tpl);
        const tplHasItemsPlaceholder = /\{\{\s*(items|items_html|items_section_html|items_table_html|itemsTable|itemsSection)\s*\}\}/.test(tpl);
        const candidates = [
            "customer_id",
            "customer",
            "customer_name",
            "customerId"
        ];
        let toName = "";
        for (const k of candidates){
            const raw = values[k];
            if (raw !== undefined && raw !== null) {
                const f = fields.find((x)=>x.key === k);
                if (f?.type === "DROPDOWN") {
                    toName = labelFor(raw, dynamicOptions[k] ?? []);
                } else {
                    toName = toString(raw);
                }
                break;
            }
        }
        const hasRows = Array.isArray(rows) && rows.length > 0;
        const itemsHtml = hasRows ? buildItemsSectionHtml({
            childFields,
            rows,
            childOptions
        }) : "";
        const injectItems = (base)=>{
            if (!itemsHtml) return base;
            if (docTypeKey === "invoice") {
                const mrcRe = /Monthly\s+Recur\w*\s+Charge/i;
                const mrcMatch = mrcRe.exec(base);
                if (mrcMatch && typeof mrcMatch.index === "number") {
                    const idx = mrcMatch.index;
                    const lower = base.toLowerCase();
                    const trStart = lower.lastIndexOf("<tr", idx);
                    const trEnd = lower.indexOf("</tr>", idx);
                    if (trStart >= 0 && trEnd >= 0 && trEnd > trStart) {
                        const trHtml = base.slice(trStart, trEnd + 5);
                        const trs = buildInvoiceItemsTrsHtml(trHtml, {
                            rows
                        });
                        return base.slice(0, trStart) + trs + base.slice(trEnd + 5);
                    }
                    const pStart = lower.lastIndexOf("<p", idx);
                    const pEnd = lower.indexOf("</p>", idx);
                    if (pStart >= 0 && pEnd >= 0 && pEnd > pStart) {
                        return base.slice(0, pStart) + itemsHtml + base.slice(pEnd + 4);
                    }
                }
                const kw = /(grand\s*total|total\s*amount|amount\s*due|subtotal|ppn|tax|total)/i;
                const m = kw.exec(base);
                if (m && typeof m.index === "number" && m.index >= 0) {
                    const idx = m.index;
                    const tags = [
                        "<table",
                        "<div",
                        "<section",
                        "<hr",
                        "<p"
                    ];
                    let best = -1;
                    for (const t of tags){
                        const p = base.toLowerCase().lastIndexOf(t, idx);
                        if (p > best) best = p;
                    }
                    if (best >= 0) return base.slice(0, best) + itemsHtml + base.slice(best);
                }
                const firstTableEnd = base.search(/<\/table\s*>/i);
                if (firstTableEnd >= 0) {
                    const insertAt = firstTableEnd + (base.slice(firstTableEnd).match(/<\/table\s*>/i)?.[0]?.length ?? 8);
                    return base.slice(0, insertAt) + itemsHtml + base.slice(insertAt);
                }
            }
            const m = base.match(/<\/body\s*>/i);
            if (m && m.index != null) return base.slice(0, m.index) + itemsHtml + base.slice(m.index);
            const m2 = base.match(/<\/html\s*>/i);
            if (m2 && m2.index != null) return base.slice(0, m2.index) + itemsHtml + base.slice(m2.index);
            return base + itemsHtml;
        };
        if (tpl.length > 0) {
            try {
                const rendered = renderFromTemplate(tpl, {
                    docTypeName,
                    code,
                    status,
                    currency,
                    grandTotal,
                    fields,
                    values,
                    dynamicOptions,
                    childFields,
                    rows,
                    childOptions,
                    fromCompanyName: companyName,
                    companyLogoUrl,
                    fromCompanyAddress: companyAddress,
                    fromCompanyEmail: companyEmail,
                    fromCompanyPhone: companyPhoneNumber,
                    customerCompanyName,
                    customerEmail,
                    customerPhoneNumber,
                    customerAddress,
                    customerJobTitle,
                    creatorName,
                    creatorEmail,
                    creatorRole,
                    seriesName,
                    parentSeriesName,
                    grandParentSeriesName,
                    createdDate,
                    toName,
                    assignedToName,
                    assignedToEmail,
                    assignedToRole,
                    salesManagerName,
                    salesManagerEmail,
                    parentRecord,
                    grandParentRecord,
                    companyPIC,
                    customerPIC
                });
                if (hasRows && !tplHasRows && !tplHasItemsPlaceholder) return injectItems(rendered);
                return rendered;
            } catch  {
                return buildDefaultHtml({
                    docTypeName,
                    code,
                    status,
                    currency,
                    grandTotal,
                    fields,
                    values,
                    dynamicOptions,
                    childFields,
                    rows,
                    childOptions,
                    fromCompanyName: companyName,
                    companyLogoUrl,
                    fromCompanyEmail: companyEmail,
                    fromCompanyPhone: companyPhoneNumber,
                    toName
                });
            }
        }
        return buildDefaultHtml({
            docTypeName,
            code,
            status,
            currency,
            grandTotal,
            fields,
            values,
            dynamicOptions,
            childFields,
            rows,
            childOptions,
            fromCompanyName: companyName,
            companyLogoUrl,
            fromCompanyEmail: companyEmail,
            fromCompanyPhone: companyPhoneNumber,
            toName
        });
    }, [
        defaultTemplate,
        docTypeName,
        code,
        status,
        currency,
        grandTotal,
        fields,
        values,
        dynamicOptions,
        childFields,
        rows,
        childOptions,
        companyName,
        companyLogoUrl,
        companyAddress,
        companyEmail,
        companyPhoneNumber,
        customerCompanyName,
        customerEmail,
        customerPhoneNumber,
        customerAddress,
        creatorName,
        creatorEmail,
        creatorRole,
        seriesName,
        parentSeriesName,
        grandParentSeriesName,
        createdDate,
        assignedToName,
        assignedToEmail,
        assignedToRole,
        salesManagerName,
        salesManagerEmail,
        parentRecord,
        grandParentRecord,
        companyPIC,
        customerPIC
    ]);
    const [paperSize, setPaperSize] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]("A4");
    const [editMode, setEditMode] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]("view");
    const [fieldCfgs, setFieldCfgs] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]([]);
    const [childCfgs, setChildCfgs] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]([]);
    const [specPlacement, setSpecPlacement] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]("separate");
    const [template, setTemplate] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](defaultTemplate ?? "");
    const [pages, setPages] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]([]);
    const measureRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](null);
    const mmToPx = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((mm)=>mm * (96 / 25.4), []);
    const storageKey = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>`doc_preview_template_${docTypeKey}`, [
        docTypeKey
    ]);
    const [open, setOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        setFieldCfgs(fields.filter((f)=>f.type !== "TABLE").map((f)=>({
                key: f.key,
                label: f.label,
                enabled: true
            })));
        setChildCfgs((childFields ?? []).map((cf)=>({
                key: cf.key,
                label: cf.label,
                enabled: true
            })));
    }, [
        fields,
        childFields
    ]);
    const visualHtml = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        return buildVisualHtml({
            docTypeName,
            code,
            status,
            currency,
            grandTotal,
            fields,
            values,
            dynamicOptions,
            childFields: childFields ?? [],
            rows: rows ?? [],
            childOptions,
            fieldCfgs,
            childCfgs,
            specPlacement
        });
    }, [
        docTypeName,
        code,
        status,
        currency,
        grandTotal,
        fields,
        values,
        dynamicOptions,
        childFields,
        rows,
        childOptions,
        fieldCfgs,
        childCfgs,
        specPlacement
    ]);
    const moveChild = (idx, dir)=>{
        setChildCfgs((prev)=>{
            const next = prev.slice();
            const j = idx + dir;
            if (j < 0 || j >= next.length) return prev;
            const tmp = next[idx];
            next[idx] = next[j];
            next[j] = tmp;
            return next;
        });
    };
    const moveField = (idx, dir)=>{
        setFieldCfgs((prev)=>{
            const next = prev.slice();
            const j = idx + dir;
            if (j < 0 || j >= next.length) return prev;
            const tmp = next[idx];
            next[idx] = next[j];
            next[j] = tmp;
            return next;
        });
    };
    const generateTemplate = ()=>{
        let tpl = "";
        tpl += `<div>`;
        tpl += `<div>{{docTypeName}}</div>`;
        tpl += `<div style="font-size:12px;color:#6b7280;">{{code}} • {{status}}</div>`;
        tpl += `<div><table style="width:100%;border-collapse:collapse;">`;
        for (const fc of fieldCfgs){
            if (!fc.enabled) continue;
            tpl += `<tr><td style="font-size:12px;padding:4px 6px;width:30%;color:#374151;">${fc.label}</td><td style="font-size:12px;padding:4px 6px;">{{${fc.key}_label}}</td></tr>`;
        }
        tpl += `</table></div>`;
        const activeChild = childCfgs.filter((c)=>c.enabled);
        if (activeChild.length > 0) {
            tpl += `<div style="font-size:14px;font-weight:600;margin-bottom:6px;">Items</div>`;
            tpl += `<table style="width:100%;border-collapse:collapse;">`;
            tpl += `<thead><tr>`;
            for (const cc of activeChild){
                tpl += `<th style="text-align:left;font-size:12px;padding:6px;border-bottom:1px solid #e5e7eb;">${cc.label}</th>`;
            }
            tpl += `</tr></thead>`;
            tpl += `<tbody>`;
            tpl += `{{#rows}}<tr>`;
            const productKey = (childFields ?? []).find((f)=>f.key.toLowerCase() === "product_id" || f.key.toLowerCase().includes("product"))?.key;
            for (const cc of activeChild){
                const isProd = productKey && cc.key === productKey;
                if (specPlacement === "under_product" && isProd) {
                    tpl += `<td style="font-size:12px;padding:6px;border-bottom:1px solid #f3f4f6;">{{row.${cc.key}_label}}<div style="color:#6b7280;font-size:11px;margin-top:4px;">{{row.specs}}</div></td>`;
                } else {
                    tpl += `<td style="font-size:12px;padding:6px;border-bottom:1px solid #f3f4f6;">{{row.${cc.key}_label}}</td>`;
                }
            }
            tpl += `</tr>{{/rows}}`;
            tpl += `</tbody>`;
            tpl += `</table>`;
            if (specPlacement === "separate") {
                tpl += `<div style="margin-top:8px;">`;
                tpl += `<div style="font-size:14px;font-weight:600;margin-bottom:6px;">Spesifikasi Items</div>`;
                tpl += `{{#rows}}<div style="font-size:12px;padding:6px 0;border-bottom:1px solid #f3f4f6;"><div style="font-weight:600;">{{row.${productKey ?? activeChild[0].key}_label}}</div><div style="color:#6b7280;font-size:11px;margin-top:4px;">{{row.specs}}</div></div>{{/rows}}`;
                tpl += `</div>`;
            }
        }
        tpl += `</div>`;
        setTemplate(tpl);
        setEditMode("html");
    };
    const openPrint = ()=>{
        const w = window.open("", "_blank");
        if (!w) return;
        const width = paperSize === "A4" ? "210mm" : "215mm";
        const height = paperSize === "A4" ? "297mm" : "330mm";
        const size = paperSize === "A4" ? "A4" : "215mm 330mm";
        const style = `
      @page { size: ${size}; margin: 0; }
      body { margin: 0; font-family: ui-sans-serif, system-ui, -apple-system; background: #eee; }
      .sheet {
        width: ${width};
        min-height: ${height};
        background: white;
        padding: 15mm;
        margin: 20px auto;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        box-sizing: border-box;
      }
      @media print {
        body { background: white; margin: 0; }
        .sheet { width: 100%; min-height: auto; margin: 0; padding: 15mm; box-shadow: none; }
      }
      table{border-collapse:collapse; width: 100%;} 
      th,td{border-color:#e5e7eb}
    `;
        const body = pages && pages.length > 0 ? pages.map((p)=>`<div class="sheet">${p}</div>`).join("") : `<div class="sheet">${html}</div>`;
        w.document.write(`<html><head><meta charset=\"utf-8\"/><title>${docTypeName}</title><style>${style}</style></head><body>${body}</body></html>`);
        w.document.close();
        w.focus();
        setTimeout(()=>{
            try {
                w.print();
            } catch  {}
        }, 300);
    };
    const openTab = ()=>{
        const w = window.open("", "_blank");
        if (!w) return;
        const width = paperSize === "A4" ? "210mm" : "215mm";
        const height = paperSize === "A4" ? "297mm" : "330mm";
        const size = paperSize === "A4" ? "A4" : "215mm 330mm";
        const style = `
      @page { size: ${size}; margin: 0; }
      body { margin: 0; font-family: ui-sans-serif, system-ui, -apple-system; background: #eee; }
      .sheet {
        width: ${width};
        min-height: ${height};
        background: white;
        padding: 15mm;
        margin: 20px auto;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        box-sizing: border-box;
      }
      table{border-collapse:collapse; width: 100%;} 
      th,td{border-color:#e5e7eb}
    `;
        const body = pages && pages.length > 0 ? pages.map((p)=>`<div class="sheet">${p}</div>`).join("") : `<div class="sheet">${html}</div>`;
        w.document.write(`<html><head><meta charset=\"utf-8\"/><title>${docTypeName}</title><style>${style}</style></head><body>${body}</body></html>`);
        w.document.close();
        w.focus();
    };
    const saveTemplate = ()=>{
        try {
            window.localStorage.setItem(storageKey, template);
            setOpen(false);
        } catch  {}
    };
    const resetTemplate = ()=>{
        setTemplate(defaultTemplate ?? "");
    };
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        const el = measureRef.current;
        if (!el) return;
        const pageHeightMm = paperSize === "A4" ? 297 : 330;
        const pageWidthMm = paperSize === "A4" ? 210 : 215;
        const paddingMm = 15;
        const contentHeightPx = mmToPx(pageHeightMm - paddingMm * 2);
        el.style.width = `${pageWidthMm}mm`;
        el.style.padding = `${paddingMm}mm`;
        el.style.boxSizing = "border-box";
        el.innerHTML = "";
        const tmp = document.createElement("div");
        tmp.innerHTML = html || "";
        const outPages = [];
        const makePageContainer = ()=>{
            const d = document.createElement("div");
            d.style.width = "100%";
            return d;
        };
        let pageContainer = makePageContainer();
        el.appendChild(pageContainer);
        const children = Array.from(tmp.children);
        for(let i = 0; i < children.length; i++){
            const child = children[i];
            const clone = child.cloneNode(true);
            pageContainer.appendChild(clone);
            const h = pageContainer.scrollHeight;
            if (h > contentHeightPx) {
                pageContainer.removeChild(clone);
                outPages.push(pageContainer.innerHTML);
                el.innerHTML = "";
                pageContainer = makePageContainer();
                el.appendChild(pageContainer);
                pageContainer.appendChild(clone);
            }
        }
        if (pageContainer.childElementCount > 0) {
            outPages.push(pageContainer.innerHTML);
        }
        setPages(outPages);
    }, [
        html,
        paperSize,
        mmToPx
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm font-semibold",
                children: "Preview Dokumen"
            }, void 0, false, {
                fileName: "[project]/src/components/document-preview.tsx",
                lineNumber: 1125,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        type: "button",
                        onClick: openPrint,
                        children: "Cetak / Download"
                    }, void 0, false, {
                        fileName: "[project]/src/components/document-preview.tsx",
                        lineNumber: 1127,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        type: "button",
                        variant: "secondary",
                        onClick: openTab,
                        children: "Buka di Tab"
                    }, void 0, false, {
                        fileName: "[project]/src/components/document-preview.tsx",
                        lineNumber: 1128,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-[100px]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                            value: paperSize,
                            onValueChange: (v)=>setPaperSize(v),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                                        placeholder: "Ukuran Kertas"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/document-preview.tsx",
                                        lineNumber: 1132,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/document-preview.tsx",
                                    lineNumber: 1131,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                            value: "A4",
                                            children: "A4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/document-preview.tsx",
                                            lineNumber: 1135,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                            value: "F4",
                                            children: "F4 (Folio)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/document-preview.tsx",
                                            lineNumber: 1136,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/document-preview.tsx",
                                    lineNumber: 1134,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/document-preview.tsx",
                            lineNumber: 1130,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/document-preview.tsx",
                        lineNumber: 1129,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/document-preview.tsx",
                lineNumber: 1126,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border rounded p-4 bg-gray-100 flex justify-center overflow-auto max-h-[800px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        width: paperSize === 'A4' ? '210mm' : '215mm',
                        flexShrink: 0
                    },
                    children: (pages && pages.length > 0 ? pages : [
                        html
                    ]).map((page, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                minHeight: paperSize === 'A4' ? '297mm' : '330mm',
                                backgroundColor: 'white',
                                padding: '15mm',
                                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                                boxSizing: 'border-box',
                                marginBottom: '20px'
                            },
                            dangerouslySetInnerHTML: {
                                __html: page
                            }
                        }, idx, false, {
                            fileName: "[project]/src/components/document-preview.tsx",
                            lineNumber: 1144,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/document-preview.tsx",
                    lineNumber: 1142,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/document-preview.tsx",
                lineNumber: 1141,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: measureRef,
                style: {
                    position: "fixed",
                    left: -99999,
                    top: -99999,
                    opacity: 0,
                    pointerEvents: "none",
                    zIndex: -1
                }
            }, void 0, false, {
                fileName: "[project]/src/components/document-preview.tsx",
                lineNumber: 1159,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/document-preview.tsx",
        lineNumber: 1124,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Root",
    ()=>Slot,
    "Slot",
    ()=>Slot,
    "Slottable",
    ()=>Slottable,
    "createSlot",
    ()=>createSlot,
    "createSlottable",
    ()=>createSlottable
]);
// src/slot.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-compose-refs/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
;
;
;
var REACT_LAZY_TYPE = Symbol.for("react.lazy");
var use = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__[" use ".trim().toString()];
function isPromiseLike(value) {
    return typeof value === "object" && value !== null && "then" in value;
}
function isLazyComponent(element) {
    return element != null && typeof element === "object" && "$$typeof" in element && element.$$typeof === REACT_LAZY_TYPE && "_payload" in element && isPromiseLike(element._payload);
}
// @__NO_SIDE_EFFECTS__
function createSlot(ownerName) {
    const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
    const Slot2 = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.forwardRef((props, forwardedRef)=>{
        let { children, ...slotProps } = props;
        if (isLazyComponent(children) && typeof use === "function") {
            children = use(children._payload);
        }
        const childrenArray = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.Children.toArray(children);
        const slottable = childrenArray.find(isSlottable);
        if (slottable) {
            const newElement = slottable.props.children;
            const newChildren = childrenArray.map((child)=>{
                if (child === slottable) {
                    if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.Children.count(newElement) > 1) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.Children.only(null);
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.isValidElement(newElement) ? newElement.props.children : null;
                } else {
                    return child;
                }
            });
            return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(SlotClone, {
                ...slotProps,
                ref: forwardedRef,
                children: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.isValidElement(newElement) ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.cloneElement(newElement, void 0, newChildren) : null
            });
        }
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(SlotClone, {
            ...slotProps,
            ref: forwardedRef,
            children
        });
    });
    Slot2.displayName = `${ownerName}.Slot`;
    return Slot2;
}
var Slot = /* @__PURE__ */ createSlot("Slot");
// @__NO_SIDE_EFFECTS__
function createSlotClone(ownerName) {
    const SlotClone = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.forwardRef((props, forwardedRef)=>{
        let { children, ...slotProps } = props;
        if (isLazyComponent(children) && typeof use === "function") {
            children = use(children._payload);
        }
        if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.isValidElement(children)) {
            const childrenRef = getElementRef(children);
            const props2 = mergeProps(slotProps, children.props);
            if (children.type !== __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.Fragment) {
                props2.ref = forwardedRef ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["composeRefs"])(forwardedRef, childrenRef) : childrenRef;
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.cloneElement(children, props2);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.Children.count(children) > 1 ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.Children.only(null) : null;
    });
    SlotClone.displayName = `${ownerName}.SlotClone`;
    return SlotClone;
}
var SLOTTABLE_IDENTIFIER = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function createSlottable(ownerName) {
    const Slottable2 = ({ children })=>{
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children
        });
    };
    Slottable2.displayName = `${ownerName}.Slottable`;
    Slottable2.__radixId = SLOTTABLE_IDENTIFIER;
    return Slottable2;
}
var Slottable = /* @__PURE__ */ createSlottable("Slottable");
function isSlottable(child) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
function mergeProps(slotProps, childProps) {
    const overrideProps = {
        ...childProps
    };
    for(const propName in childProps){
        const slotPropValue = slotProps[propName];
        const childPropValue = childProps[propName];
        const isHandler = /^on[A-Z]/.test(propName);
        if (isHandler) {
            if (slotPropValue && childPropValue) {
                overrideProps[propName] = (...args)=>{
                    const result = childPropValue(...args);
                    slotPropValue(...args);
                    return result;
                };
            } else if (slotPropValue) {
                overrideProps[propName] = slotPropValue;
            }
        } else if (propName === "style") {
            overrideProps[propName] = {
                ...slotPropValue,
                ...childPropValue
            };
        } else if (propName === "className") {
            overrideProps[propName] = [
                slotPropValue,
                childPropValue
            ].filter(Boolean).join(" ");
        }
    }
    return {
        ...slotProps,
        ...overrideProps
    };
}
function getElementRef(element) {
    let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
    let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
    if (mayWarn) {
        return element.ref;
    }
    getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
    mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
    if (mayWarn) {
        return element.props.ref;
    }
    return element.props.ref || element.ref;
}
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cva",
    ()=>cva,
    "cx",
    ()=>cx
]);
/**
 * Copyright 2022 Joe Bell. All rights reserved.
 *
 * This file is licensed to you under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR REPRESENTATIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
;
const falsyToString = (value)=>typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
const cx = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"];
const cva = (base, config)=>(props)=>{
        var _config_compoundVariants;
        if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
        const { variants, defaultVariants } = config;
        const getVariantClassNames = Object.keys(variants).map((variant)=>{
            const variantProp = props === null || props === void 0 ? void 0 : props[variant];
            const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
            if (variantProp === null) return null;
            const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
            return variants[variant][variantKey];
        });
        const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param)=>{
            let [key, value] = param;
            if (value === undefined) {
                return acc;
            }
            acc[key] = value;
            return acc;
        }, {});
        const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param)=>{
            let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
            return Object.entries(compoundVariantOptions).every((param)=>{
                let [key, value] = param;
                return Array.isArray(value) ? value.includes({
                    ...defaultVariants,
                    ...propsWithoutUndefined
                }[key]) : ({
                    ...defaultVariants,
                    ...propsWithoutUndefined
                })[key] === value;
            }) ? [
                ...acc,
                cvClass,
                cvClassName
            ] : acc;
        }, []);
        return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
    };
}),
];

//# sourceMappingURL=_c4b1f0b1._.js.map