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
"[project]/src/components/ui/label.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Label",
    ()=>Label
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-label/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function Label({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "label",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/label.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/src/components/ui/checkbox.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Checkbox",
    ()=>Checkbox
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-checkbox/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as CheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function Checkbox({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "checkbox",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Indicator"], {
            "data-slot": "checkbox-indicator",
            className: "grid place-content-center text-current transition-none",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__["CheckIcon"], {
                className: "size-3.5"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/checkbox.tsx",
                lineNumber: 26,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ui/checkbox.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/checkbox.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/src/components/group-param-sync.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GroupParamSync",
    ()=>GroupParamSync
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
function GroupParamSync() {
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const gid = typeof params?.groupId === 'string' ? params.groupId : Array.isArray(params?.groupId) ? params.groupId?.[0] : undefined;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (gid) {
            try {
                document.cookie = `currentGroupId=${gid}; path=/; SameSite=Lax`;
            } catch  {}
        }
    }, [
        gid
    ]);
    return null;
}
}),
"[project]/src/components/dependent-dropdown.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DependentDropdown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/label.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/select.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function DependentDropdown({ name, label, required, placeholder = "-", defaultValue, options, source, branchId, initialDependsOnValue, initialDependsOnValues, containerId, disabled, form }) {
    const [opts, setOpts] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](options ?? []);
    const [loaded, setLoaded] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    const isRowScope = typeof name === "string" && name.startsWith("row_");
    const rowIdPrefix = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        if (!isRowScope) return "";
        const suf = name.slice("row_".length);
        const idx = suf.indexOf("_");
        if (idx < 0) return "row_";
        const rid = suf.slice(0, idx);
        return `row_${rid}_`;
    }, [
        name,
        isRowScope
    ]);
    const filtersArr = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        const f = source?.filter;
        if (!f) return [];
        return Array.isArray(f) ? f : [
            f
        ];
    }, [
        source
    ]);
    const [depMap, setDepMap] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](initialDependsOnValues || {});
    const depMapRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"](depMap);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        depMapRef.current = depMap;
    }, [
        depMap
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        if (filtersArr.length === 0) return;
        const matchDep = (dep, cand)=>{
            const a = String(dep || "").toLowerCase();
            const b = String(cand || "").toLowerCase();
            return a === b || b.endsWith(`_${a}`) || a.endsWith(`_${b}`) || b.includes(a);
        };
        const runAll = async (currentMap)=>{
            try {
                const params = new URLSearchParams();
                const hasDocTypeKey = Boolean(source?.["key"] || source?.["docTypeKey"] || source?.["target"]);
                const mode = source?.mode || (hasDocTypeKey ? "doctype" : source?.table ? "table" : "");
                if (!mode) return;
                if (mode === "doctype") {
                    const k = source?.["key"] || source?.["docTypeKey"] || source?.["target"];
                    params.set("key", String(k || ""));
                }
                if (mode === "table") params.set("table", String(source?.table || ""));
                params.set("mode", mode);
                params.set("labelField", String(source?.labelField || "name"));
                params.set("valueField", String(source?.valueField || "id"));
                if (branchId) params.set("branchId", branchId);
                let hasFilter = false;
                for (const it of filtersArr){
                    const val = currentMap[it.dependsOn];
                    if (it.field && typeof val === "string" && val) {
                        params.append("depField", it.field);
                        params.append("depValue", val);
                        hasFilter = true;
                    }
                }
                if (!hasFilter && mode !== "static_dep") {
                    setOpts([]);
                    setLoaded(true);
                    return;
                }
                const res = await fetch(`/api/dynamic-options?${params.toString()}`);
                if (!res.ok) return;
                const data = await res.json();
                setOpts(data);
                setLoaded(true);
            } catch (err) {
                console.error("[DependentDropdown] fetch error:", err);
            }
        };
        const mapInit = {
            ...depMapRef.current
        };
        const scopeEl = containerId ? document.getElementById(containerId) : undefined;
        for (const it of filtersArr){
            let val = "";
            if (isRowScope) {
                const selector = `input[name^="${rowIdPrefix || "row_"}"]`;
                const list = scopeEl ? Array.from(scopeEl.querySelectorAll(selector)) : Array.from(document.querySelectorAll(selector));
                const found = list.find((e)=>{
                    const nm = e.getAttribute("name") || "";
                    if (!nm.startsWith(rowIdPrefix || "row_")) return false;
                    const suf = nm.slice((rowIdPrefix || "row_").length);
                    return matchDep(it.dependsOn, suf);
                });
                val = found?.value || "";
                if (!val) {
                    const globalEl = document.querySelector(`input[name="${it.dependsOn}"]`);
                    val = globalEl?.value || "";
                }
            } else {
                const el = scopeEl ? scopeEl.querySelector(`input[name="${it.dependsOn}"]`) : document.querySelector(`input[name="${it.dependsOn}"]`);
                val = el?.value || "";
                if (!val) {
                    const el2 = scopeEl ? scopeEl.querySelector(`input[name$="${it.dependsOn}"]`) : document.querySelector(`input[name$="${it.dependsOn}"]`);
                    val = el2?.value || "";
                }
            }
            if (val) mapInit[it.dependsOn] = val;
        }
        if (Object.values(mapInit).some(Boolean)) {
            const changed = filtersArr.some((f)=>(depMapRef.current[f.dependsOn] || "") !== (mapInit[f.dependsOn] || ""));
            if (changed) {
                setDepMap(mapInit);
                runAll(mapInit);
            } else if (!loaded) {
                runAll(mapInit);
            }
        } else if (initialDependsOnValue && !Array.isArray(source?.filter)) {
            const single = source?.filter;
            if (single?.field) runAll({
                [single.dependsOn]: initialDependsOnValue
            });
        } else if (!loaded) {
            // If not loaded yet, try an initial fetch
            runAll(mapInit);
        }
        const handler = (e)=>{
            const ev = e;
            if (!ev.detail) return;
            const { name: evName, value, containerId: evContainerId } = ev.detail;
            // If the event has a containerId, and it doesn't match ours, ignore it
            if (evContainerId && containerId && evContainerId !== containerId) return;
            const scopeEl = containerId ? document.getElementById(containerId) : undefined;
            const scopeHasName = scopeEl ? Boolean(scopeEl.querySelector(`input[name="${evName}"]`)) : true;
            if (!scopeHasName) {
                // If we have a scope but the event is from outside, ignore it unless it's a row field that might belong to us
                if (!(isRowScope && (evName.startsWith(rowIdPrefix || "row_") || evName.endsWith(`_${filtersArr[0]?.dependsOn || ""}`)))) return;
            }
            const it = filtersArr.find((f)=>{
                // Try multiple ways to match the dependency
                if (matchDep(f.dependsOn, evName)) return true;
                if (isRowScope && evName.startsWith(rowIdPrefix || "row_")) {
                    const suffix = evName.slice((rowIdPrefix || "row_").length);
                    if (matchDep(f.dependsOn, suffix)) return true;
                }
                // Fallback for spec fields which might be row_spec_... or just spec_...
                if (evName.startsWith("row_spec_") || evName.startsWith("spec_")) {
                    const suffix = evName.slice(evName.indexOf("spec_") + 5);
                    if (matchDep(f.dependsOn, suffix)) return true;
                }
                return false;
            });
            if (it) {
                const nextVal = value || "";
                setDepMap((prev)=>{
                    const next = {
                        ...prev,
                        [it.dependsOn]: nextVal
                    };
                    runAll(next);
                    return next;
                });
            }
        };
        window.addEventListener("docFieldChange", handler);
        return ()=>window.removeEventListener("docFieldChange", handler);
    }, [
        filtersArr,
        source,
        branchId,
        initialDependsOnValue,
        isRowScope,
        containerId,
        rowIdPrefix
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                children: [
                    label,
                    required ? " *" : ""
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/dependent-dropdown.tsx",
                lineNumber: 199,
                columnNumber: 7
            }, this),
            (()=>{
                // If has filter, only show loaded opts (don't fallback to options which may be unfiltered)
                const showOpts = filtersArr.length > 0 ? loaded ? opts : [] : loaded ? opts : options ?? [];
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SearchableSelect"], {
                    name: name,
                    placeholder: placeholder,
                    options: showOpts,
                    defaultValue: defaultValue,
                    emitChangeEvent: true,
                    disabled: disabled,
                    required: required,
                    containerId: containerId,
                    form: form
                }, void 0, false, {
                    fileName: "[project]/src/components/dependent-dropdown.tsx",
                    lineNumber: 203,
                    columnNumber: 16
                }, this);
            })()
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/dependent-dropdown.tsx",
        lineNumber: 198,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/customer-product-specs.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CustomerProductSpecs",
    ()=>CustomerProductSpecs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/label.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/checkbox.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dependent$2d$dropdown$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dependent-dropdown.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function formatIDR(value) {
    const num = typeof value === "number" ? value : Number(value ?? 0);
    if (!Number.isFinite(num)) return String(value ?? "");
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        currencyDisplay: "code",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(num);
}
function CheckboxRow({ option, namePrefix, fieldKey, formId }) {
    const [qty, setQty] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](0);
    const [checked, setChecked] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](false);
    const price = option.price ?? 0;
    const subtotal = (qty || 0) * price;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
        className: `border-b border-slate-100 last:border-0 transition-colors ${checked ? "bg-primary/[0.03]" : "hover:bg-slate-50/50"}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "py-3 pr-4 align-top",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-start gap-3 pt-0.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Checkbox"], {
                            checked: checked,
                            onCheckedChange: (c)=>setChecked(!!c),
                            id: `${namePrefix}spec_${fieldKey}__${option.value}`,
                            className: `transition-colors ${checked ? "border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary" : "border-slate-300"}`
                        }, void 0, false, {
                            fileName: "[project]/src/components/customer-product-specs.tsx",
                            lineNumber: 49,
                            columnNumber: 12
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "hidden",
                            name: `${namePrefix}spec_${fieldKey}__${option.value}`,
                            value: checked ? "on" : "",
                            form: formId
                        }, void 0, false, {
                            fileName: "[project]/src/components/customer-product-specs.tsx",
                            lineNumber: 55,
                            columnNumber: 12
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                            htmlFor: `${namePrefix}spec_${fieldKey}__${option.value}`,
                            className: "cursor-pointer font-normal text-sm leading-snug text-slate-700",
                            children: [
                                option.label,
                                price > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "block text-xs text-slate-500 mt-1",
                                    children: [
                                        "@ ",
                                        formatIDR(price)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/customer-product-specs.tsx",
                                    lineNumber: 64,
                                    columnNumber: 16
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/customer-product-specs.tsx",
                            lineNumber: 61,
                            columnNumber: 12
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/customer-product-specs.tsx",
                    lineNumber: 48,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/customer-product-specs.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "py-3 pr-4 align-top",
                children: typeof option.qty === "number" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                    name: `${namePrefix}spec_${fieldKey}__${option.value}__qty`,
                    type: "number",
                    className: "h-8 w-24 border-slate-200 focus:border-primary focus:ring-primary/20",
                    placeholder: "Qty",
                    value: qty || "",
                    onChange: (e)=>setQty(Number(e.target.value)),
                    disabled: !checked,
                    form: formId
                }, void 0, false, {
                    fileName: "[project]/src/components/customer-product-specs.tsx",
                    lineNumber: 73,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/customer-product-specs.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "py-3 text-sm text-right align-top pt-3.5",
                children: checked && subtotal > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "font-medium text-slate-900",
                    children: formatIDR(subtotal)
                }, void 0, false, {
                    fileName: "[project]/src/components/customer-product-specs.tsx",
                    lineNumber: 86,
                    columnNumber: 36
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-slate-400",
                    children: "-"
                }, void 0, false, {
                    fileName: "[project]/src/components/customer-product-specs.tsx",
                    lineNumber: 86,
                    columnNumber: 112
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/customer-product-specs.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/customer-product-specs.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
function CustomerProductSpecs({ specs, dynamicOptions, namePrefix = "", formId, branchId }) {
    const containerId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"]().replace(/:/g, "_");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3",
        id: containerId,
        children: specs.map((s)=>{
            const cfg = s.config ?? {};
            if (s.type === "TEXT") {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-1.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                            className: "text-xs font-medium text-slate-600",
                            children: [
                                s.label,
                                s.required ? " *" : ""
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/customer-product-specs.tsx",
                            lineNumber: 115,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                            name: `${namePrefix}spec_${s.key}`,
                            form: formId,
                            className: "h-9 border-slate-200 focus:border-primary focus:ring-primary/20"
                        }, void 0, false, {
                            fileName: "[project]/src/components/customer-product-specs.tsx",
                            lineNumber: 116,
                            columnNumber: 15
                        }, this)
                    ]
                }, s.id, true, {
                    fileName: "[project]/src/components/customer-product-specs.tsx",
                    lineNumber: 114,
                    columnNumber: 13
                }, this);
            }
            if (s.type === "TEXTAREA") {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-1.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                            className: "text-xs font-medium text-slate-600",
                            children: [
                                s.label,
                                s.required ? " *" : ""
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/customer-product-specs.tsx",
                            lineNumber: 123,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            name: `${namePrefix}spec_${s.key}`,
                            form: formId,
                            className: "border-slate-200 text-sm rounded-lg border bg-slate-50/50 px-3 py-2.5 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary w-full min-h-20 transition-all"
                        }, void 0, false, {
                            fileName: "[project]/src/components/customer-product-specs.tsx",
                            lineNumber: 124,
                            columnNumber: 15
                        }, this)
                    ]
                }, s.id, true, {
                    fileName: "[project]/src/components/customer-product-specs.tsx",
                    lineNumber: 122,
                    columnNumber: 13
                }, this);
            }
            if (s.type === "NUMBER") {
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-1.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                            className: "text-xs font-medium text-slate-600",
                            children: [
                                s.label,
                                s.required ? " *" : ""
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/customer-product-specs.tsx",
                            lineNumber: 131,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                            name: `${namePrefix}spec_${s.key}`,
                            type: "number",
                            form: formId,
                            className: "h-9 border-slate-200 focus:border-primary focus:ring-primary/20"
                        }, void 0, false, {
                            fileName: "[project]/src/components/customer-product-specs.tsx",
                            lineNumber: 132,
                            columnNumber: 15
                        }, this)
                    ]
                }, s.id, true, {
                    fileName: "[project]/src/components/customer-product-specs.tsx",
                    lineNumber: 130,
                    columnNumber: 13
                }, this);
            }
            if (s.type === "DROPDOWN") {
                const dyn = (dynamicOptions ?? {})[s.key];
                const options = dyn ?? (Array.isArray(cfg.options) ? cfg.options : []);
                if (cfg.source) {
                    const src = cfg.source;
                    const filterRaw = src["filter"];
                    const filters = Array.isArray(filterRaw) ? filterRaw.map((x)=>({
                            dependsOn: typeof x["dependsOn"] === "string" ? x["dependsOn"] : "",
                            field: typeof x["field"] === "string" ? x["field"] : ""
                        })).filter((it)=>it.dependsOn && it.field) : (()=>{
                        const dependsOn = typeof filterRaw?.["dependsOn"] === "string" ? filterRaw["dependsOn"] : "";
                        const fieldSrc = typeof filterRaw?.["field"] === "string" ? filterRaw["field"] : "";
                        return dependsOn && fieldSrc ? [
                            {
                                dependsOn,
                                field: fieldSrc
                            }
                        ] : [];
                    })();
                    const sourceObj = {
                        mode: src["mode"],
                        key: src["key"],
                        table: src["table"],
                        labelField: src["labelField"] || "name",
                        valueField: src["valueField"] || "id",
                        filter: filters.length > 1 ? filters : filters[0] ?? undefined
                    };
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dependent$2d$dropdown$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            name: `${namePrefix}spec_${s.key}`,
                            label: s.label,
                            required: s.required,
                            options: options,
                            source: sourceObj,
                            branchId: branchId,
                            containerId: containerId,
                            form: formId
                        }, void 0, false, {
                            fileName: "[project]/src/components/customer-product-specs.tsx",
                            lineNumber: 165,
                            columnNumber: 17
                        }, this)
                    }, `${s.id}_${branchId || "none"}`, false, {
                        fileName: "[project]/src/components/customer-product-specs.tsx",
                        lineNumber: 164,
                        columnNumber: 15
                    }, this);
                }
                const handleChange = (e)=>{
                    const val = e.target.value;
                    try {
                        window.dispatchEvent(new CustomEvent("docFieldChange", {
                            detail: {
                                name: `${namePrefix}spec_${s.key}`,
                                value: val,
                                containerId
                            }
                        }));
                    } catch  {}
                };
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-1.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                            className: "text-xs font-medium text-slate-600",
                            children: [
                                s.label,
                                s.required ? " *" : ""
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/customer-product-specs.tsx",
                            lineNumber: 194,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            name: `${namePrefix}spec_${s.key}`,
                            form: formId,
                            onChange: handleChange,
                            className: "border-slate-200 text-sm rounded-lg border bg-slate-50/50 px-3 py-2.5 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary w-full transition-all",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "",
                                    children: "-"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/customer-product-specs.tsx",
                                    lineNumber: 201,
                                    columnNumber: 17
                                }, this),
                                options.map((o, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: o.value,
                                        children: o.label
                                    }, i, false, {
                                        fileName: "[project]/src/components/customer-product-specs.tsx",
                                        lineNumber: 203,
                                        columnNumber: 19
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/customer-product-specs.tsx",
                            lineNumber: 195,
                            columnNumber: 15
                        }, this)
                    ]
                }, s.id, true, {
                    fileName: "[project]/src/components/customer-product-specs.tsx",
                    lineNumber: 193,
                    columnNumber: 13
                }, this);
            }
            if (s.type === "CHECKBOX") {
                const opts = Array.isArray(cfg.options) ? cfg.options : [];
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-1.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                            className: "text-xs font-medium text-slate-600",
                            children: [
                                s.label,
                                s.required ? " *" : ""
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/customer-product-specs.tsx",
                            lineNumber: 213,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "overflow-x-auto border border-slate-200 rounded-xl",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                className: "w-full text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "border-b border-slate-100 bg-slate-50/50",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "text-left py-2.5 px-3 font-medium text-slate-500 text-xs w-[50%]",
                                                    children: "Item"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/customer-product-specs.tsx",
                                                    lineNumber: 218,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "text-left py-2.5 px-3 font-medium text-slate-500 text-xs w-24",
                                                    children: "Qty"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/customer-product-specs.tsx",
                                                    lineNumber: 219,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    className: "text-right py-2.5 px-3 font-medium text-slate-500 text-xs",
                                                    children: "Total"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/customer-product-specs.tsx",
                                                    lineNumber: 220,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/customer-product-specs.tsx",
                                            lineNumber: 217,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/customer-product-specs.tsx",
                                        lineNumber: 216,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                        children: opts.map((o, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CheckboxRow, {
                                                option: o,
                                                namePrefix: namePrefix,
                                                fieldKey: s.key,
                                                formId: formId
                                            }, i, false, {
                                                fileName: "[project]/src/components/customer-product-specs.tsx",
                                                lineNumber: 225,
                                                columnNumber: 23
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/customer-product-specs.tsx",
                                        lineNumber: 223,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/customer-product-specs.tsx",
                                lineNumber: 215,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/customer-product-specs.tsx",
                            lineNumber: 214,
                            columnNumber: 15
                        }, this)
                    ]
                }, s.id, true, {
                    fileName: "[project]/src/components/customer-product-specs.tsx",
                    lineNumber: 212,
                    columnNumber: 13
                }, this);
            }
            return null;
        })
    }, void 0, false, {
        fileName: "[project]/src/components/customer-product-specs.tsx",
        lineNumber: 108,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/customer/order/data:1f9a1b [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "submitMultiDirectOrder",
    ()=>$$RSC_SERVER_ACTION_2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"406b82ed9889954ef1508b7e6257e389ceeb0a3cca":"submitMultiDirectOrder"},"src/app/customer/order/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("406b82ed9889954ef1508b7e6257e389ceeb0a3cca", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "submitMultiDirectOrder");
;
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIlxuXG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiQC9saWIvcHJpc21hXCJcbmltcG9ydCB7IGdldFNlcnZlclNlc3Npb24gfSBmcm9tIFwibmV4dC1hdXRoXCJcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSBcIkAvbGliL2F1dGhcIlxuaW1wb3J0IHsgY29va2llcyB9IGZyb20gXCJuZXh0L2hlYWRlcnNcIlxuaW1wb3J0IHR5cGUgeyBQcmlzbWEgfSBmcm9tIFwiQC9nZW5lcmF0ZWQvcHJpc21hL2NsaWVudFwiXG5pbXBvcnQgeyBGaWVsZFR5cGUgfSBmcm9tIFwiQC9nZW5lcmF0ZWQvcHJpc21hL2VudW1zXCJcbmltcG9ydCB7IHJlZGlyZWN0IH0gZnJvbSBcIm5leHQvbmF2aWdhdGlvblwiXG5pbXBvcnQgeyByZXZhbGlkYXRlUGF0aCB9IGZyb20gXCJuZXh0L2NhY2hlXCJcblxuLy8gLS0tIEhlbHBlciBGdW5jdGlvbnMgZnJvbSBBZG1pbiBMb2dpYyAtLS1cblxuZnVuY3Rpb24gcGFyc2VJRFIocmF3OiBzdHJpbmcpOiBudW1iZXIgfCBudWxsIHtcbiAgaWYgKCFyYXcpIHJldHVybiBudWxsXG4gIGxldCBzID0gU3RyaW5nKHJhdykudHJpbSgpXG4gIHMgPSBzLnJlcGxhY2UoL15JRFJcXHMqL2ksIFwiXCIpXG4gIHMgPSBzLnJlcGxhY2UoL15ScFxcLj9cXHMqL2ksIFwiXCIpXG4gIHMgPSBzLnJlcGxhY2UoL1xcLi9nLCBcIlwiKVxuICBzID0gcy5yZXBsYWNlKC8sL2csIFwiLlwiKVxuICBjb25zdCBuID0gTnVtYmVyKHMpXG4gIHJldHVybiBOdW1iZXIuaXNOYU4obikgPyBudWxsIDogblxufVxuXG5mdW5jdGlvbiBpc1ByaWNlTGlrZUtleShrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICBjb25zdCBrID0gU3RyaW5nKGtleSB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpXG4gIHJldHVybiBrID09PSBcIm5yY1wiIHx8IGsgPT09IFwibXJjXCIgfHwgayA9PT0gXCJzdWJ0b3RhbF9ucmNcIiB8fCBrID09PSBcInN1Yl90b3RhbF9ucmNcIiB8fCBrID09PSBcInN1YnRvdGFsX21yY1wiIHx8IGsgPT09IFwic3ViX3RvdGFsX21yY1wiIHx8IGsgPT09IFwicHJpY2VcIiB8fCBrID09PSBcInVuaXRfcHJpY2VcIlxufVxuXG5mdW5jdGlvbiBldmFsRm9ybXVsYShmb3JtdWxhPzogc3RyaW5nLCB2YXJzPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBudW1iZXIgfCBudWxsIHtcbiAgICBpZiAoIWZvcm11bGEgfHwgIXZhcnMpIHJldHVybiBudWxsXG4gICAgY29uc3QgYWxsb3dlZEZucyA9IG5ldyBTZXQoW1wicm91bmRcIixcImZsb29yXCIsXCJjZWlsXCIsXCJtaW5cIixcIm1heFwiXSlcbiAgICBsZXQgZXhwciA9IGZvcm11bGEucmVwbGFjZSgvXFxeL2csIFwiKipcIilcbiAgICBleHByID0gZXhwci5yZXBsYWNlKC9cXGIoW0EtWmEtel9dW0EtWmEtejAtOV9dKilcXGIvZywgKG0pID0+IHtcbiAgICAgIGlmIChhbGxvd2VkRm5zLmhhcyhtKSkgcmV0dXJuIGBNYXRoLiR7bX1gXG4gICAgICByZXR1cm4gYGdldChcIiR7bX1cIilgXG4gICAgfSlcbiAgICB0cnkge1xuICAgICAgY29uc3QgZm4gPSBuZXcgRnVuY3Rpb24oXCJnZXRcIixcIk1hdGhcIiwgYHJldHVybiAoICR7ZXhwcn0gKWApXG4gICAgICBjb25zdCByZXMgPSBmbigoazogc3RyaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IHYgPSB2YXJzW2tdXG4gICAgICAgIGlmICh0eXBlb2YgdiA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHZcbiAgICAgICAgaWYgKHR5cGVvZiB2ID09PSBcInN0cmluZ1wiKSB7IGNvbnN0IG4gPSBOdW1iZXIodik7IHJldHVybiBOdW1iZXIuaXNOYU4obikgPyAwIDogbiB9XG4gICAgICAgIGlmICh0eXBlb2YgdiA9PT0gXCJib29sZWFuXCIpIHJldHVybiB2ID8gMSA6IDBcbiAgICAgICAgcmV0dXJuIDBcbiAgICAgIH0sIE1hdGgpXG4gICAgICByZXR1cm4gKHR5cGVvZiByZXMgPT09IFwibnVtYmVyXCIgJiYgTnVtYmVyLmlzRmluaXRlKHJlcykpID8gcmVzIDogbnVsbFxuICAgIH0gY2F0Y2ggeyByZXR1cm4gbnVsbCB9XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5hc3luYyBmdW5jdGlvbiByZXNvbHZlSW5pdGlhbFN0YXR1cyhkb2NUeXBlSWQ6IHN0cmluZywgYnJhbmNoSWQ6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQsIHByZWZlcnJlZFN0YXR1czogc3RyaW5nID0gXCJQZW5kaW5nXCIpIHtcbiAgbGV0IHdmID0gbnVsbFxuICBpZiAoYnJhbmNoSWQpIHtcbiAgICB3ZiA9IGF3YWl0IHByaXNtYS5kb2NXb3JrZmxvdy5maW5kVW5pcXVlKHsgd2hlcmU6IHsgZG9jVHlwZUlkX2JyYW5jaElkOiB7IGRvY1R5cGVJZCwgYnJhbmNoSWQgfSB9IH0pXG4gIH1cbiAgaWYgKCF3Zikge1xuICAgIHdmID0gYXdhaXQgcHJpc21hLmRvY1dvcmtmbG93LmZpbmRGaXJzdCh7IHdoZXJlOiB7IGRvY1R5cGVJZCwgYnJhbmNoSWQ6IG51bGwgfSB9KVxuICB9XG4gIFxuICAvLyBEZWZhdWx0IGZhbGxiYWNrXG4gIGNvbnN0IHJlc3VsdCA9IHsgc3RhdHVzOiBwcmVmZXJyZWRTdGF0dXMsIGRvY1N0YXR1czogMSBhcyBudW1iZXIgfCB1bmRlZmluZWQgfVxuXG4gIGlmICh3ZiAmJiB3Zi5jb25maWcpIHtcbiAgICBjb25zdCBjZmcgPSB3Zi5jb25maWcgYXMgeyBzdGF0ZXM/OiBBcnJheTx7IG5hbWU6IHN0cmluZzsgZG9jU3RhdHVzPzogbnVtYmVyIH0+IH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShjZmcuc3RhdGVzKSAmJiBjZmcuc3RhdGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIFRyeSB0byBmaW5kIHRoZSBwcmVmZXJyZWQgc3RhdHVzIGZpcnN0XG4gICAgICBjb25zdCBmb3VuZFN0YXRlID0gY2ZnLnN0YXRlcy5maW5kKHMgPT4gcy5uYW1lID09PSBwcmVmZXJyZWRTdGF0dXMpXG4gICAgICBcbiAgICAgIGlmIChmb3VuZFN0YXRlKSB7XG4gICAgICAgIHJlc3VsdC5zdGF0dXMgPSBmb3VuZFN0YXRlLm5hbWVcbiAgICAgICAgaWYgKHR5cGVvZiBmb3VuZFN0YXRlLmRvY1N0YXR1cyA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgIHJlc3VsdC5kb2NTdGF0dXMgPSB3Zi5kb250T3ZlcnJpZGVTdGF0dXMgPyB1bmRlZmluZWQgOiBmb3VuZFN0YXRlLmRvY1N0YXR1c1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBJZiBwcmVmZXJyZWQgc3RhdHVzIG5vdCBmb3VuZCBpbiB3b3JrZmxvdywgd2hhdCBzaG91bGQgd2UgZG8/XG4gICAgICAgIC8vIFVzZXIgcmVxdWVzdGVkOiBcImRlZmF1bHQgZG9jU3RhdHVzIC4uLiBhZGFsYWggMSAsIGRhbiBzdGF0dXMgPSBQZW5kaW5nXCJcbiAgICAgICAgLy8gSWYgd2Ugc3RyaWN0bHkgZm9sbG93IHdvcmtmbG93LCB3ZSBtaWdodCBwaWNrIHRoZSBmaXJzdCBzdGF0ZSAoRHJhZnQvMCkuXG4gICAgICAgIC8vIEJ1dCBzaW5jZSB0aGlzIGlzIGEgXCJTdWJtaXRcIiBhY3Rpb24sIHdlIHNob3VsZCBwcm9iYWJseSBmb3JjZSBcIlBlbmRpbmdcIiBpZiBwb3NzaWJsZSxcbiAgICAgICAgLy8gT1IgcmVseSBvbiB0aGUgZGVmYXVsdCBmYWxsYmFjayBpZiB0aGUgd29ya2Zsb3cgZG9lc24ndCBleHBsaWNpdGx5IGZvcmJpZCBpdC5cbiAgICAgICAgLy8gRm9yIG5vdywgbGV0J3Mgc3RpY2sgdG8gdGhlIERlZmF1bHQgZmFsbGJhY2sgKFBlbmRpbmcvMSkgaWYgcHJlZmVycmVkIHN0YXR1cyBpc24ndCBpbiB3b3JrZmxvdyxcbiAgICAgICAgLy8gZWZmZWN0aXZlbHkgaWdub3JpbmcgdGhlIHdvcmtmbG93J3MgXCJEcmFmdFwiIHN0YXJ0IHN0YXRlLlxuICAgICAgICAvLyBCdXQgaWYgdGhlIHdvcmtmbG93IGRlZmluZXMgc3RhdGVzLCB1c3VhbGx5IHRoZSByZWNvcmQgbXVzdCBiZSBpbiBvbmUgb2YgdGhlbS5cbiAgICAgICAgLy8gSWYgXCJQZW5kaW5nXCIgaXMgbm90IGluIHRoZSB3b3JrZmxvdywgc2V0dGluZyBpdCB0byBcIlBlbmRpbmdcIiBtaWdodCBicmVhayB0aGluZ3MgaWYgdGhlIHN5c3RlbSBlbmZvcmNlcyB2YWxpZCBzdGF0ZXMuXG4gICAgICAgIC8vIEhvd2V2ZXIsIGdpdmVuIHRoZSB1c2VyIGluc3RydWN0aW9uLCB3ZSBwcmlvcml0aXplIFwiUGVuZGluZ1wiLzEuXG4gICAgICAgIC8vIFNvIHdlIGRvIE5PVCBvdmVyd3JpdGUgcmVzdWx0IHdpdGggY2ZnLnN0YXRlc1swXSBoZXJlLlxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdWJtaXRSZXF1ZXN0T3JkZXIoZm9ybURhdGE6IEZvcm1EYXRhKSB7XG4gIGNvbnNvbGUubG9nKFwiLS0+IHN1Ym1pdFJlcXVlc3RPcmRlciBjYWxsZWQgKFJlZmFjdG9yZWQgQWRtaW4gTG9naWMpXCIpXG4gIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXJ2ZXJTZXNzaW9uKGF1dGhPcHRpb25zKVxuICBpZiAoIXNlc3Npb24/LnVzZXI/LmVtYWlsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwic3VibWl0UmVxdWVzdE9yZGVyOiBObyBzZXNzaW9uIG9yIGVtYWlsXCIpXG4gIH1cblxuICBjb25zdCB1c2VyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7XG4gICAgd2hlcmU6IHsgZW1haWw6IHNlc3Npb24udXNlci5lbWFpbCB9LFxuICAgIGluY2x1ZGU6IHsgcm9sZTogdHJ1ZSwgYXNzaWduZWRCcmFuY2hlczogeyBpbmNsdWRlOiB7IGJyYW5jaDogdHJ1ZSB9IH0sIGNvbXBhbnk6IHRydWUgfVxuICB9KVxuICBpZiAoIXVzZXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJzdWJtaXRSZXF1ZXN0T3JkZXI6IFVzZXIgbm90IGZvdW5kXCIpXG4gIH1cblxuICBjb25zdCBwcm9kdWN0SWQgPSBTdHJpbmcoZm9ybURhdGEuZ2V0KFwicHJvZHVjdElkXCIpIHx8IFwiXCIpXG4gIGNvbnNvbGUubG9nKFwic3VibWl0UmVxdWVzdE9yZGVyOiBwcm9kdWN0SWQgPVwiLCBwcm9kdWN0SWQpXG4gIGlmICghcHJvZHVjdElkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwic3VibWl0UmVxdWVzdE9yZGVyOiBNaXNzaW5nIHByb2R1Y3RJZFwiKVxuICB9XG5cbiAgY29uc3QgcHJvZHVjdCA9IGF3YWl0IHByaXNtYS5wcm9kdWN0LmZpbmRVbmlxdWUoe1xuICAgIHdoZXJlOiB7IGlkOiBwcm9kdWN0SWQgfSxcbiAgICBpbmNsdWRlOiB7IFxuICAgICAgcHJpY2VzOiB0cnVlLCBcbiAgICAgIHNwZWNzOiB0cnVlLFxuICAgICAgZ3JvdXA6IHtcbiAgICAgICAgaW5jbHVkZToge1xuICAgICAgICAgIHBhcmVudDogdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KVxuICBpZiAoIXByb2R1Y3QpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJzdWJtaXRSZXF1ZXN0T3JkZXI6IFByb2R1Y3Qgbm90IGZvdW5kXCIpXG4gIH1cblxuICAvLyBHZXQgRG9jVHlwZSBcIlJlcXVlc3RcIiAoYXNzdW1pbmcga2V5IGlzIFwicmVxdWVzdFwiKVxuICBjb25zdCBkb2NUeXBlS2V5ID0gXCJyZXF1ZXN0XCJcbiAgY29uc3QgZG9jVHlwZSA9IGF3YWl0IHByaXNtYS5kb2NUeXBlLmZpbmRVbmlxdWUoe1xuICAgIHdoZXJlOiB7IGtleTogZG9jVHlwZUtleSB9LFxuICAgIGluY2x1ZGU6IHsgZmllbGRzOiB0cnVlLCBicmFuY2g6IHRydWUgfVxuICB9KVxuICBcbiAgaWYgKCFkb2NUeXBlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBzdWJtaXRSZXF1ZXN0T3JkZXI6IERvY1R5cGUgd2l0aCBrZXkgXCIke2RvY1R5cGVLZXl9XCIgbm90IGZvdW5kYClcbiAgfVxuICBjb25zb2xlLmxvZyhcInN1Ym1pdFJlcXVlc3RPcmRlcjogRG9jVHlwZSBmb3VuZFwiLCBkb2NUeXBlLmlkKVxuXG4gIC8vIERldGVybWluZSBCcmFuY2hcbiAgY29uc3QgY29va2llU3RvcmUgPSBhd2FpdCBjb29raWVzKClcbiAgY29uc3QgY29va2llQnJhbmNoSWQgPSBjb29raWVTdG9yZS5nZXQoXCJicmFuY2hJZFwiKT8udmFsdWVcbiAgY29uc3QgYXNzaWduZWQgPSB1c2VyLmFzc2lnbmVkQnJhbmNoZXMubWFwKChhKSA9PiBhLmJyYW5jaC5pZClcbiAgXG4gIC8vIFByaW9yaXRpemUgYWN0aXZlIGJyYW5jaCAoY29va2llKSBhcyByZXF1ZXN0ZWRcbiAgbGV0IGJyYW5jaElkOiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkID0gY29va2llQnJhbmNoSWRcbiAgXG4gIC8vIEZhbGxiYWNrIHRvIGRvY1R5cGUgYnJhbmNoIG9yIGFzc2lnbmVkIGJyYW5jaCBpZiBubyBjb29raWVcbiAgaWYgKCFicmFuY2hJZCkge1xuICAgICBicmFuY2hJZCA9IGRvY1R5cGUuYnJhbmNoSWRcbiAgfVxuICBpZiAoIWJyYW5jaElkICYmIGFzc2lnbmVkLmxlbmd0aCA+IDApIHtcbiAgICBicmFuY2hJZCA9IGFzc2lnbmVkWzBdXG4gIH1cblxuICBjb25zb2xlLmxvZyhcInN1Ym1pdFJlcXVlc3RPcmRlcjogQnJhbmNoIGRldGVybWluZWRcIiwgYnJhbmNoSWQpXG5cbiAgLy8gLS0tIFBheWxvYWQgQ29uc3RydWN0aW9uIChBZG1pbiBTdHlsZSkgLS0tXG4gIGNvbnN0IHBheWxvYWQ6IFJlY29yZDxzdHJpbmcsIHVua25vd24+ID0ge31cbiAgXG4gIC8vIENvbnRleHQgb3ZlcnJpZGVzXG4gIGNvbnN0IGNvbnRleHRWYWx1ZXM6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7XG4gICAgICByZXF1ZXN0ZXI6IHVzZXIuaWQsXG4gICAgICByZXF1ZXN0X2RhdGU6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdChcIlRcIilbMF0sXG4gICAgICByZXFfZGF0ZTogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KFwiVFwiKVswXSxcbiAgICAgIHN0YXR1czogXCJQZW5kaW5nXCIsXG4gICAgICBjdXN0b21lcl9pZDogdXNlci5jb21wYW55SWQsXG4gIH1cblxuICBmb3IgKGNvbnN0IGYgb2YgZG9jVHlwZS5maWVsZHMpIHtcbiAgICAvLyAxLiBDaGVjayBDb250ZXh0IChBbGxvdyBvdmVycmlkaW5nIFJlYWRPbmx5IGlmIGluIGNvbnRleHQpXG4gICAgaWYgKGNvbnRleHRWYWx1ZXNbZi5rZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcGF5bG9hZFtmLmtleV0gPSBjb250ZXh0VmFsdWVzW2Yua2V5XVxuICAgICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIGlmIChmLnJlYWRPbmx5KSBjb250aW51ZVxuXG4gICAgLy8gMi4gQ2hlY2sgRm9ybURhdGFcbiAgICBjb25zdCByYXcgPSBTdHJpbmcoZm9ybURhdGEuZ2V0KGYua2V5KSB8fCBcIlwiKVxuICAgIFxuICAgIGlmIChmLnR5cGUgPT09IChcIkNIRUNLQk9YXCIgYXMgRmllbGRUeXBlKSkge1xuICAgICAgcGF5bG9hZFtmLmtleV0gPSByYXcgPT09IFwib25cIlxuICAgIH0gZWxzZSBpZiAoZi50eXBlID09PSAoXCJQUklDRVwiIGFzIEZpZWxkVHlwZSkgfHwgaXNQcmljZUxpa2VLZXkoZi5rZXkpKSB7XG4gICAgICBjb25zdCBwYXJzZWQgPSBwYXJzZUlEUihyYXcpXG4gICAgICBwYXlsb2FkW2Yua2V5XSA9IHBhcnNlZCAhPSBudWxsID8gcGFyc2VkIDogKHJhdyA/IE51bWJlcihyYXcpIDogbnVsbClcbiAgICB9IGVsc2UgaWYgKGYudHlwZSA9PT0gKFwiTlVNQkVSXCIgYXMgRmllbGRUeXBlKSkge1xuICAgICAgcGF5bG9hZFtmLmtleV0gPSByYXcgPyBOdW1iZXIocmF3KSA6IG51bGxcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRGVmYXVsdCBzdHJpbmdcbiAgICAgIHBheWxvYWRbZi5rZXldID0gcmF3XG4gICAgfVxuICB9XG5cbiAgLy8gLS0tIEZvcm11bGEgRXZhbHVhdGlvbiAoQWRtaW4gU3R5bGUpIC0tLVxuICBmb3IgKGNvbnN0IGYgb2YgZG9jVHlwZS5maWVsZHMpIHtcbiAgICBpZiAoIWYucmVhZE9ubHkpIGNvbnRpbnVlXG4gICAgY29uc3QgY2ZnID0gKGYuY29uZmlnID8/IHt9KSBhcyB1bmtub3duIGFzIHsgY29tcHV0ZT86IHsgZm9ybXVsYT86IHN0cmluZyB9IH1cbiAgICBjb25zdCBmb3JtdWxhID0gY2ZnLmNvbXB1dGU/LmZvcm11bGFcbiAgICBjb25zdCB2YWwgPSBldmFsRm9ybXVsYShmb3JtdWxhLCBwYXlsb2FkKVxuICAgIGlmICh2YWwgIT0gbnVsbCkge1xuICAgICAgcGF5bG9hZFtmLmtleV0gPSB2YWxcbiAgICB9XG4gIH1cblxuICAvLyAtLS0gTmFtaW5nIFNlcmllcyAtLS1cbiAgY29uc3QgbmFtaW5nQ2ZnID0gKGRvY1R5cGUuY29uZmlnID8/IHt9KSBhcyB1bmtub3duIGFzIHsgbmFtaW5nPzogeyBtb2RlPzogc3RyaW5nOyBmaWVsZD86IHN0cmluZzsgZGVmYXVsdFBhdHRlcm4/OiBzdHJpbmcgfSB9XG4gIGNvbnN0IG5hbWluZ01vZGUgPSBuYW1pbmdDZmcubmFtaW5nPy5tb2RlID8/IFwic2VyaWVzXCJcbiAgY29uc3QgZGVmYXVsdFBhdHRlcm4gPSBuYW1pbmdDZmcubmFtaW5nPy5kZWZhdWx0UGF0dGVybiA/PyBcIlJFUS0jIyMjI1wiXG5cbiAgbGV0IGNvZGU6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZFxuICBcbiAgLy8gSGVscGVyIHRvIGdlbmVyYXRlIHNlcmllc1xuICBjb25zdCBnZW5lcmF0ZVNlcmllc0NvZGUgPSBhc3luYyAocGF0dGVybjogc3RyaW5nLCBiSWQ6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQsIGRJZDogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgbSA9IC9eKC4qPykoIyspKC4qKSQvLmV4ZWMocGF0dGVybilcbiAgICBjb25zdCBwcmVmaXggPSBtID8gbVsxXSA6IHBhdHRlcm5cbiAgICBjb25zdCBoYXNoZXMgPSBtID8gbVsyXSA6IFwiIyMjIyNcIlxuICAgIGNvbnN0IHN1ZmZpeCA9IG0gPyBtWzNdIDogXCJcIlxuICAgIGNvbnN0IGRpZ2l0cyA9IGhhc2hlcy5sZW5ndGhcbiAgICBcbiAgICBjb25zdCBleGlzdGluZyA9IGF3YWl0IHByaXNtYS5kb2NOYW1pbmdDb3VudGVyLmZpbmRGaXJzdCh7XG4gICAgICB3aGVyZTogeyBkb2NUeXBlSWQ6IGRJZCwgYnJhbmNoSWQ6IGJJZCA/PyBudWxsLCBzZXJpZXM6IHBhdHRlcm4gfVxuICAgIH0pXG4gICAgXG4gICAgbGV0IGNvdW50ZXJcbiAgICBpZiAoZXhpc3RpbmcpIHtcbiAgICAgIGNvdW50ZXIgPSBhd2FpdCBwcmlzbWEuZG9jTmFtaW5nQ291bnRlci51cGRhdGUoe1xuICAgICAgICB3aGVyZTogeyBpZDogZXhpc3RpbmcuaWQgfSxcbiAgICAgICAgZGF0YTogeyBzZXE6IHsgaW5jcmVtZW50OiAxIH0gfVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgY291bnRlciA9IGF3YWl0IHByaXNtYS5kb2NOYW1pbmdDb3VudGVyLmNyZWF0ZSh7XG4gICAgICAgIGRhdGE6IHsgZG9jVHlwZUlkOiBkSWQsIGJyYW5jaElkOiBiSWQgPz8gbnVsbCwgc2VyaWVzOiBwYXR0ZXJuLCBzZXE6IDEgfVxuICAgICAgfSlcbiAgICB9XG4gICAgXG4gICAgY29uc3Qgc2VxID0gY291bnRlci5zZXFcbiAgICBjb25zdCBwYWQgPSBTdHJpbmcoc2VxKS5wYWRTdGFydChkaWdpdHMsIFwiMFwiKVxuICAgIHJldHVybiBgJHtwcmVmaXh9JHtwYWR9JHtzdWZmaXh9YFxuICB9XG5cbiAgdHJ5IHtcbiAgICBsZXQgcmV0cmllcyA9IDBcbiAgICB3aGlsZSAocmV0cmllcyA8IDUpIHtcbiAgICAgIGlmIChuYW1pbmdNb2RlID09PSBcInNlcmllc1wiKSB7XG4gICAgICAgIGNvZGUgPSBhd2FpdCBnZW5lcmF0ZVNlcmllc0NvZGUoZGVmYXVsdFBhdHRlcm4sIGJyYW5jaElkLCBkb2NUeXBlLmlkKVxuICAgICAgfSBlbHNlIGlmIChuYW1pbmdNb2RlID09PSBcInV1aWRcIikge1xuICAgICAgICBjb2RlID0gY3J5cHRvLnJhbmRvbVVVSUQoKVxuICAgICAgfVxuICAgICAgXG4gICAgICAvLyBDaGVjayB1bmlxdWVuZXNzXG4gICAgICBpZiAoY29kZSkge1xuICAgICAgICBjb25zdCBleGlzdHMgPSBhd2FpdCBwcmlzbWEuZG9jUmVjb3JkLmZpbmRVbmlxdWUoeyB3aGVyZTogeyBjb2RlIH0gfSlcbiAgICAgICAgaWYgKCFleGlzdHMpIGJyZWFrXG4gICAgICAgIGNvbnNvbGUud2Fybihgc3VibWl0UmVxdWVzdE9yZGVyOiBDb2RlIGNvbGxpc2lvbiBmb3IgJHtjb2RlfSwgcmV0cnlpbmcuLi5gKVxuICAgICAgfVxuICAgICAgcmV0cmllcysrXG4gICAgfVxuICAgIGlmICghY29kZSkgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGdlbmVyYXRlIGNvZGVcIilcbiAgICBjb25zb2xlLmxvZyhcInN1Ym1pdFJlcXVlc3RPcmRlcjogR2VuZXJhdGVkIGNvZGVcIiwgY29kZSlcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJzdWJtaXRSZXF1ZXN0T3JkZXI6IEVycm9yIGdlbmVyYXRpbmcgY29kZVwiLCBlKVxuICAgIHRocm93IG5ldyBFcnJvcihgc3VibWl0UmVxdWVzdE9yZGVyOiBFcnJvciBnZW5lcmF0aW5nIGNvZGU6ICR7ZX1gKVxuICB9XG5cbiAgLy8gLS0tIENyZWF0ZSBEb2NSZWNvcmQgKFJlcXVlc3QpIC0tLVxuICBsZXQgcmVxdWVzdFJlY29yZFxuICB0cnkge1xuICAgIGNvbnN0IHsgc3RhdHVzOiBpbml0aWFsU3RhdHVzLCBkb2NTdGF0dXM6IGluaXRpYWxEb2NTdGF0dXMgfSA9IGF3YWl0IHJlc29sdmVJbml0aWFsU3RhdHVzKGRvY1R5cGUuaWQsIGJyYW5jaElkKVxuXG4gICAgcmVxdWVzdFJlY29yZCA9IGF3YWl0IHByaXNtYS5kb2NSZWNvcmQuY3JlYXRlKHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZG9jVHlwZUlkOiBkb2NUeXBlLmlkLFxuICAgICAgICBicmFuY2hJZDogYnJhbmNoSWQgfHwgbnVsbCxcbiAgICAgICAgY29kZSxcbiAgICAgICAgc3RhdHVzOiBpbml0aWFsU3RhdHVzLFxuICAgICAgICBkb2NTdGF0dXM6IGluaXRpYWxEb2NTdGF0dXMsXG4gICAgICAgIGRhdGE6IHBheWxvYWQgYXMgUHJpc21hLklucHV0SnNvblZhbHVlLFxuICAgICAgICBjcmVhdGVkQnlJZDogdXNlci5pZCxcbiAgICAgICAgdXBkYXRlZEJ5SWQ6IHVzZXIuaWQsXG4gICAgICAgIGFzc2lnbmVkVG9JZDogdXNlci5pZCxcbiAgICAgIH1cbiAgICB9KVxuICAgIGNvbnNvbGUubG9nKFwic3VibWl0UmVxdWVzdE9yZGVyOiBSZXF1ZXN0IGNyZWF0ZWRcIiwgcmVxdWVzdFJlY29yZC5pZClcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJzdWJtaXRSZXF1ZXN0T3JkZXI6IEVycm9yIGNyZWF0aW5nIFJlcXVlc3QgcmVjb3JkXCIsIGUpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBzdWJtaXRSZXF1ZXN0T3JkZXI6IEVycm9yIGNyZWF0aW5nIFJlcXVlc3QgcmVjb3JkOiAke2V9YClcbiAgfVxuXG4gIC8vIC0tLSBDcmVhdGUgQ2hpbGQgUm93cyAoUmVxdWVzdCBJdGVtKSAtLS1cbiAgLy8gTWltaWNraW5nIEFkbWluIExvZ2ljOiBJdGVyYXRlIENoaWxkIERvY1R5cGUgRmllbGRzIGFuZCBNYXAgRGF0YVxuICBjb25zdCBpdGVtRG9jVHlwZSA9IGF3YWl0IHByaXNtYS5kb2NUeXBlLmZpbmRVbmlxdWUoeyBcbiAgICB3aGVyZTogeyBrZXk6IFwicmVxdWVzdF9pdGVtXCIgfSxcbiAgICBpbmNsdWRlOiB7IGZpZWxkczogdHJ1ZSB9XG4gIH0pXG5cbiAgaWYgKGl0ZW1Eb2NUeXBlKSB7XG4gICAgY29uc3QgaXRlbURhdGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+ID0ge31cbiAgICBcbiAgICAvLyBGaW5kIHNlbGVjdGVkIHByaWNlXG4gICAgY29uc3QgcHJpY2VJZCA9IFN0cmluZyhmb3JtRGF0YS5nZXQoXCJwcmljZUlkXCIpIHx8IFwiXCIpXG4gICAgY29uc3Qgc2VsZWN0ZWRQcmljZSA9IHByb2R1Y3QucHJpY2VzLmZpbmQocCA9PiBwLmlkID09PSBwcmljZUlkKVxuICAgIFxuICAgIGNvbnNvbGUubG9nKFwiREVCVUc6IHN1Ym1pdFJlcXVlc3RPcmRlclwiKVxuICAgIGNvbnNvbGUubG9nKFwiREVCVUc6IEZvcm1EYXRhIEtleXM6XCIsIEFycmF5LmZyb20oZm9ybURhdGEua2V5cygpKSlcbiAgICBjb25zb2xlLmxvZyhcIkRFQlVHOiBJdGVtIERvY1R5cGUgRmllbGRzOlwiLCBpdGVtRG9jVHlwZS5maWVsZHMubWFwKGYgPT4gZi5rZXkpKVxuXG4gICAgLy8gV2Ugb25seSBoYXZlIE9ORSBpdGVtIGZyb20gdGhlIGN1c3RvbWVyIGZvcm0sIHNvIHdlIG1hcCBpdCBtYW51YWxseSB0byB0aGUgZmllbGRzXG4gICAgLy8gQnV0IHdlIGl0ZXJhdGUgaXRlbURvY1R5cGUuZmllbGRzIHRvIGVuc3VyZSB0eXBlcy9rZXlzIGFyZSBjb3JyZWN0XG4gICAgXG4gICAgLy8gMS4gUG9wdWxhdGUgc3RhbmRhcmQgZmllbGRzIGJhc2VkIG9uIERvY1R5cGUgZGVmaW5pdGlvblxuICAgIGZvciAoY29uc3QgZiBvZiBpdGVtRG9jVHlwZS5maWVsZHMpIHtcbiAgICAgICAgLy8gU3BlY2lhbCBtYXBwaW5nOiBQcmlvcml0eSBmaWVsZHMgKGZpbGwgZXZlbiBpZiByZWFkT25seSlcbiAgICAgICAgaWYgKGYua2V5ID09PSBcInByb2R1Y3RfaWRcIikge1xuICAgICAgICAgICAgaXRlbURhdGFbZi5rZXldID0gcHJvZHVjdC5pZFxuICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgfSBcbiAgICAgICAgaWYgKGYua2V5ID09PSBcInF0eVwiKSB7XG4gICAgICAgICAgICBjb25zdCByYXdRdHkgPSBmb3JtRGF0YS5nZXQoXCJxdHlcIilcbiAgICAgICAgICAgIGNvbnN0IHEgPSByYXdRdHkgPyBOdW1iZXIocmF3UXR5KSA6IDFcbiAgICAgICAgICAgIGl0ZW1EYXRhW2Yua2V5XSA9ICFpc05hTihxKSAmJiBxID4gMCA/IHEgOiAxXG4gICAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG4gICAgICAgIGlmIChmLmtleSA9PT0gXCJwcm9kdWN0X2NhdGVnb3J5XCIpIHtcbiAgICAgICAgICAgIGl0ZW1EYXRhW2Yua2V5XSA9IHByb2R1Y3QuZ3JvdXA/LnBhcmVudD8uaWRcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGYua2V5ID09PSBcInByb2R1Y3Rfc3ViX2NhdGVnb3J5XCIpIHtcbiAgICAgICAgICAgIGl0ZW1EYXRhW2Yua2V5XSA9IHByb2R1Y3QuZ3JvdXA/LmlkXG4gICAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBQcmljZSBtYXBwaW5nXG4gICAgICAgIGlmIChzZWxlY3RlZFByaWNlKSB7XG4gICAgICAgICAgICBpZiAoZi5rZXkgPT09IFwibXJjXCIgfHwgZi5rZXkgPT09IFwicHJpY2VcIiB8fCBmLmtleSA9PT0gXCJ1bml0X3ByaWNlXCIpIHtcbiAgICAgICAgICAgICAgICBpdGVtRGF0YVtmLmtleV0gPSBOdW1iZXIoc2VsZWN0ZWRQcmljZS5iYXNlUHJpY2UpXG4gICAgICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmLmtleSA9PT0gXCJucmNcIikge1xuICAgICAgICAgICAgICAgIGl0ZW1EYXRhW2Yua2V5XSA9IE51bWJlcihzZWxlY3RlZFByaWNlLnNldHVwRmVlKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZi5yZWFkT25seSkgY29udGludWU7IC8vIFNraXAgcmVhZE9ubHkgZm9yIGlucHV0IG1hcHBpbmdcbiAgICB9XG5cbiAgICAvLyAyLiBQb3B1bGF0ZSBQcm9kdWN0IFNwZWNzIChtaW1pY2tpbmcgQWRtaW4gY3JlYXRlUmVjb3JkIGxvZ2ljKVxuICAgIC8vIFdlIGl0ZXJhdGUgcHJvZHVjdC5zcGVjcyB0byBlbnN1cmUgd2UgY2FwdHVyZSBhbGwgZHluYW1pYyBzcGVjcywgXG4gICAgLy8gcmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoZXkgYXJlIGV4cGxpY2l0bHkgaW4gaXRlbURvY1R5cGUuZmllbGRzIG9yIG5vdC5cbiAgICBmb3IgKGNvbnN0IHMgb2YgcHJvZHVjdC5zcGVjcykge1xuICAgICAgICBjb25zdCBzcGVjS2V5ID0gYHNwZWNfJHtzLmtleX1gXG4gICAgICAgIGNvbnN0IHZhbCA9IGZvcm1EYXRhLmdldChzcGVjS2V5KVxuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2coYERFQlVHOiBQcm9jZXNzaW5nIFByb2R1Y3QgU3BlYyAnJHtzLmtleX0nIC0+IElucHV0ICcke3NwZWNLZXl9JyAtPiBWYWx1ZTpgLCB2YWwpXG5cbiAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgLy8gVHlwZSBjb252ZXJzaW9uIGJhc2VkIG9uIHNwZWMgdHlwZVxuICAgICAgICAgICAgaWYgKHMudHlwZSA9PT0gKFwiTlVNQkVSXCIgYXMgRmllbGRUeXBlKSkge1xuICAgICAgICAgICAgICAgICBpdGVtRGF0YVtzcGVjS2V5XSA9IE51bWJlcih2YWwpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHMudHlwZSA9PT0gKFwiQ0hFQ0tCT1hcIiBhcyBGaWVsZFR5cGUpKSB7XG4gICAgICAgICAgICAgICAgIC8vIENoZWNrYm94IGhhbmRsaW5nIG1pZ2h0IGludm9sdmUgbXVsdGlwbGUgdmFsdWVzIGlmIG9wdGlvbnMgZXhpc3QsIFxuICAgICAgICAgICAgICAgICAvLyBidXQgZm9yIHNpbXBsZSBib29sZWFuIG9yIHNpbmdsZSB2YWx1ZTpcbiAgICAgICAgICAgICAgICAgY29uc3QgY2ZnID0gKHMuY29uZmlnID8/IHt9KSBhcyB1bmtub3duIGFzIHsgb3B0aW9ucz86IEFycmF5PHsgbGFiZWw6IHN0cmluZzsgdmFsdWU6IHN0cmluZzsgcXR5PzogbnVtYmVyIH0+IH1cbiAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2ZnLm9wdGlvbnMpICYmIGNmZy5vcHRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgIC8vIE11bHRpLW9wdGlvbiBjaGVja2JveCAobGlrZSBpbiBBZG1pbiBsb2dpYylcbiAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkOiBzdHJpbmdbXSA9IFtdXG4gICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG8gb2YgY2ZnLm9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNrID0gYCR7c3BlY0tleX1fXyR7by52YWx1ZX1gXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoU3RyaW5nKGZvcm1EYXRhLmdldChjaykgfHwgXCJcIikgPT09IFwib25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkLnB1c2goU3RyaW5nKG8udmFsdWUpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEhhbmRsZSBxdHkgaWYgbmVlZGVkIChvbWl0dGVkIGZvciBicmV2aXR5IHVubGVzcyByZXF1ZXN0ZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQubGVuZ3RoID4gMCkgaXRlbURhdGFbc3BlY0tleV0gPSBzZWxlY3RlZFxuICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgLy8gU2ltcGxlIGJvb2xlYW4gY2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgIGl0ZW1EYXRhW3NwZWNLZXldID0gdmFsID09PSBcIm9uXCIgfHwgdmFsID09PSBcInRydWVcIlxuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICBpdGVtRGF0YVtzcGVjS2V5XSA9IFN0cmluZyh2YWwpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy8gRm9ybXVsYSBFdmFsIGZvciBJdGVtXG4gICAgZm9yIChjb25zdCBmIG9mIGl0ZW1Eb2NUeXBlLmZpZWxkcykge1xuICAgICAgICBpZiAoIWYucmVhZE9ubHkpIGNvbnRpbnVlXG4gICAgICAgIGNvbnN0IGNmZyA9IChmLmNvbmZpZyA/PyB7fSkgYXMgdW5rbm93biBhcyB7IGNvbXB1dGU/OiB7IGZvcm11bGE/OiBzdHJpbmcgfSB9XG4gICAgICAgIGNvbnN0IGZvcm11bGEgPSBjZmcuY29tcHV0ZT8uZm9ybXVsYVxuICAgICAgICBjb25zdCB2YWwgPSBldmFsRm9ybXVsYShmb3JtdWxhLCBpdGVtRGF0YSlcbiAgICAgICAgaWYgKHZhbCAhPSBudWxsKSB7XG4gICAgICAgICAgICBpdGVtRGF0YVtmLmtleV0gPSB2YWxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAvLyAxLiBDcmVhdGUgSW5kZXBlbmRlbnQgUmVjb3JkIGZvciBSZXF1ZXN0IEl0ZW0gKE1haW50YWluaW5nIHByZXZpb3VzIHJlcXVpcmVtZW50KVxuICAgICAgY29uc3QgeyBzdGF0dXM6IGl0ZW1TdGF0dXMsIGRvY1N0YXR1czogaXRlbURvY1N0YXR1cyB9ID0gYXdhaXQgcmVzb2x2ZUluaXRpYWxTdGF0dXMoaXRlbURvY1R5cGUuaWQsIGJyYW5jaElkKVxuXG4gICAgICBjb25zdCBpdGVtUmVjb3JkID0gYXdhaXQgcHJpc21hLmRvY1JlY29yZC5jcmVhdGUoe1xuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgZG9jVHlwZUlkOiBpdGVtRG9jVHlwZS5pZCxcbiAgICAgICAgICBicmFuY2hJZDogYnJhbmNoSWQgfHwgbnVsbCxcbiAgICAgICAgICBzdGF0dXM6IGl0ZW1TdGF0dXMsXG4gICAgICAgICAgZG9jU3RhdHVzOiBpdGVtRG9jU3RhdHVzLFxuICAgICAgICAgIHBhcmVudElkOiByZXF1ZXN0UmVjb3JkLmlkLFxuICAgICAgICAgIGRhdGE6IHsgLi4uaXRlbURhdGEsIF9wYXJlbnRJZDogcmVxdWVzdFJlY29yZC5pZCwgX3BhcmVudERvY1R5cGU6IGRvY1R5cGVLZXkgfSBhcyBQcmlzbWEuSW5wdXRKc29uVmFsdWUsXG4gICAgICAgICAgY3JlYXRlZEJ5SWQ6IHVzZXIuaWQsXG4gICAgICAgICAgdXBkYXRlZEJ5SWQ6IHVzZXIuaWQsXG4gICAgICAgICAgYXNzaWduZWRUb0lkOiB1c2VyLmlkLFxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgY29uc29sZS5sb2coXCJzdWJtaXRSZXF1ZXN0T3JkZXI6IFJlcXVlc3QgSXRlbSByZWNvcmQgY3JlYXRlZFwiLCBpdGVtUmVjb3JkLmlkKVxuXG4gICAgICAvLyAyLiBDcmVhdGUgRG9jUm93IGxpbmtpbmcgdG8gdGhlIGl0ZW0gcmVjb3JkXG4gICAgICBhd2FpdCBwcmlzbWEuZG9jUm93LmNyZWF0ZSh7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICByZWNvcmRJZDogcmVxdWVzdFJlY29yZC5pZCxcbiAgICAgICAgICBjaGlsZERvY1R5cGVJZDogaXRlbURvY1R5cGUuaWQsXG4gICAgICAgICAgaWR4OiAwLFxuICAgICAgICAgIGRhdGE6IHsgLi4uaXRlbURhdGEsIF9fY2hpbGRSZWNvcmRJZDogaXRlbVJlY29yZC5pZCB9IGFzIFByaXNtYS5JbnB1dEpzb25WYWx1ZVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgY29uc29sZS5sb2coXCJzdWJtaXRSZXF1ZXN0T3JkZXI6IFJlcXVlc3QgSXRlbSByb3cgY3JlYXRlZFwiKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJzdWJtaXRSZXF1ZXN0T3JkZXI6IEVycm9yIGNyZWF0aW5nIFJlcXVlc3QgSXRlbSByZWNvcmQvcm93XCIsIGUpXG4gICAgICAvLyBOb24tZmF0YWw/IE1heWJlIHdhcm5pbmcuXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUud2FybihcInN1Ym1pdFJlcXVlc3RPcmRlcjogJ3JlcXVlc3RfaXRlbScgRG9jVHlwZSBub3QgZm91bmQsIHNraXBwaW5nIGl0ZW0gY3JlYXRpb25cIilcbiAgfVxuXG4gIC8vIFJlZGlyZWN0IHRvIHN1Y2Nlc3MgcGFnZSBvciBzaW1pbGFyIChpZiBuZWVkZWQpXG4gIC8vIEZvciBub3csIG1heWJlIGp1c3QgbG9nIHN1Y2Nlc3NcbiAgY29uc29sZS5sb2coXCJzdWJtaXRSZXF1ZXN0T3JkZXI6IFN1Y2Nlc3NcIilcbiAgcmV2YWxpZGF0ZVBhdGgoXCIvY3VzdG9tZXIvZG9jcy9yZXF1ZXN0XCIpXG4gIHJlZGlyZWN0KFwiL2N1c3RvbWVyL2RvY3MvcmVxdWVzdFwiKVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3VibWl0RGlyZWN0T3JkZXIoZm9ybURhdGE6IEZvcm1EYXRhKSB7XG4gIGNvbnNvbGUubG9nKFwiLS0+IHN1Ym1pdERpcmVjdE9yZGVyIGNhbGxlZCAoU2FsZXMgT3JkZXIgTG9naWMpXCIpXG4gIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXJ2ZXJTZXNzaW9uKGF1dGhPcHRpb25zKVxuICBpZiAoIXNlc3Npb24/LnVzZXI/LmVtYWlsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwic3VibWl0RGlyZWN0T3JkZXI6IE5vIHNlc3Npb24gb3IgZW1haWxcIilcbiAgfVxuXG4gIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcbiAgICB3aGVyZTogeyBlbWFpbDogc2Vzc2lvbi51c2VyLmVtYWlsIH0sXG4gICAgaW5jbHVkZTogeyByb2xlOiB0cnVlLCBhc3NpZ25lZEJyYW5jaGVzOiB7IGluY2x1ZGU6IHsgYnJhbmNoOiB0cnVlIH0gfSwgY29tcGFueTogdHJ1ZSB9XG4gIH0pXG4gIGlmICghdXNlcikge1xuICAgIHRocm93IG5ldyBFcnJvcihcInN1Ym1pdERpcmVjdE9yZGVyOiBVc2VyIG5vdCBmb3VuZFwiKVxuICB9XG5cbiAgY29uc3QgcHJvZHVjdElkID0gU3RyaW5nKGZvcm1EYXRhLmdldChcInByb2R1Y3RJZFwiKSB8fCBcIlwiKVxuICBjb25zb2xlLmxvZyhcInN1Ym1pdERpcmVjdE9yZGVyOiBwcm9kdWN0SWQgPVwiLCBwcm9kdWN0SWQpXG4gIGlmICghcHJvZHVjdElkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwic3VibWl0RGlyZWN0T3JkZXI6IE1pc3NpbmcgcHJvZHVjdElkXCIpXG4gIH1cblxuICBjb25zdCBwcm9kdWN0ID0gYXdhaXQgcHJpc21hLnByb2R1Y3QuZmluZFVuaXF1ZSh7XG4gICAgd2hlcmU6IHsgaWQ6IHByb2R1Y3RJZCB9LFxuICAgIGluY2x1ZGU6IHsgXG4gICAgICBwcmljZXM6IHRydWUsIFxuICAgICAgc3BlY3M6IHRydWUsXG4gICAgICBncm91cDoge1xuICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgcGFyZW50OiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pXG4gIGlmICghcHJvZHVjdCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcInN1Ym1pdERpcmVjdE9yZGVyOiBQcm9kdWN0IG5vdCBmb3VuZFwiKVxuICB9XG5cbiAgLy8gR2V0IERvY1R5cGUgXCJTYWxlcyBPcmRlclwiXG4gIGNvbnN0IGRvY1R5cGVLZXkgPSBcInNhbGVzX29yZGVyXCJcbiAgY29uc3QgZG9jVHlwZSA9IGF3YWl0IHByaXNtYS5kb2NUeXBlLmZpbmRVbmlxdWUoe1xuICAgIHdoZXJlOiB7IGtleTogZG9jVHlwZUtleSB9LFxuICAgIGluY2x1ZGU6IHsgZmllbGRzOiB0cnVlLCBicmFuY2g6IHRydWUgfVxuICB9KVxuICBcbiAgaWYgKCFkb2NUeXBlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBzdWJtaXREaXJlY3RPcmRlcjogRG9jVHlwZSB3aXRoIGtleSBcIiR7ZG9jVHlwZUtleX1cIiBub3QgZm91bmRgKVxuICB9XG4gIGNvbnNvbGUubG9nKFwic3VibWl0RGlyZWN0T3JkZXI6IERvY1R5cGUgZm91bmRcIiwgZG9jVHlwZS5pZClcblxuICAvLyBEZXRlcm1pbmUgQnJhbmNoXG4gIGNvbnN0IGNvb2tpZVN0b3JlID0gYXdhaXQgY29va2llcygpXG4gIGNvbnN0IGNvb2tpZUJyYW5jaElkID0gY29va2llU3RvcmUuZ2V0KFwiYnJhbmNoSWRcIik/LnZhbHVlXG4gIGNvbnN0IGFzc2lnbmVkID0gdXNlci5hc3NpZ25lZEJyYW5jaGVzLm1hcCgoYSkgPT4gYS5icmFuY2guaWQpXG4gIFxuICBsZXQgYnJhbmNoSWQ6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQgPSBjb29raWVCcmFuY2hJZFxuICBpZiAoIWJyYW5jaElkKSB7XG4gICAgIGJyYW5jaElkID0gZG9jVHlwZS5icmFuY2hJZFxuICB9XG4gIGlmICghYnJhbmNoSWQgJiYgYXNzaWduZWQubGVuZ3RoID4gMCkge1xuICAgIGJyYW5jaElkID0gYXNzaWduZWRbMF1cbiAgfVxuXG4gIGNvbnNvbGUubG9nKFwic3VibWl0RGlyZWN0T3JkZXI6IEJyYW5jaCBkZXRlcm1pbmVkXCIsIGJyYW5jaElkKVxuXG4gIC8vIC0tLSBQYXlsb2FkIENvbnN0cnVjdGlvbiAtLS1cbiAgY29uc3QgcGF5bG9hZDogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gPSB7fVxuICBcbiAgLy8gQ29udGV4dCBvdmVycmlkZXMgZm9yIFNhbGVzIE9yZGVyXG4gIGNvbnN0IGNvbnRleHRWYWx1ZXM6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7XG4gICAgICBjdXN0b21lcjogdXNlci5jb21wYW55SWQsIC8vIFVzdWFsbHkgbGlua2VkIHRvIENvbXBhbnlcbiAgICAgIGN1c3RvbWVyX2lkOiB1c2VyLmNvbXBhbnlJZCxcbiAgICAgIHRyYW5zYWN0aW9uX2RhdGU6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdChcIlRcIilbMF0sXG4gICAgICBvcmRlcl9kYXRlOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoXCJUXCIpWzBdLFxuICAgICAgc3RhdHVzOiBcIlBlbmRpbmdcIixcbiAgICAgIHRlcm1fb2ZfcGF5bWVudDogXCJPbmUgVGltZVwiLFxuICAgICAgdGVybV9vZl9jb250cmFjdDogMCxcbiAgfVxuXG4gIGZvciAoY29uc3QgZiBvZiBkb2NUeXBlLmZpZWxkcykge1xuICAgIGlmIChjb250ZXh0VmFsdWVzW2Yua2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHBheWxvYWRbZi5rZXldID0gY29udGV4dFZhbHVlc1tmLmtleV1cbiAgICAgICAgY29udGludWVcbiAgICB9XG5cbiAgICBpZiAoZi5yZWFkT25seSkgY29udGludWVcblxuICAgIGNvbnN0IHJhdyA9IFN0cmluZyhmb3JtRGF0YS5nZXQoZi5rZXkpIHx8IFwiXCIpXG4gICAgXG4gICAgaWYgKGYudHlwZSA9PT0gKFwiQ0hFQ0tCT1hcIiBhcyBGaWVsZFR5cGUpKSB7XG4gICAgICBwYXlsb2FkW2Yua2V5XSA9IHJhdyA9PT0gXCJvblwiXG4gICAgfSBlbHNlIGlmIChmLnR5cGUgPT09IChcIlBSSUNFXCIgYXMgRmllbGRUeXBlKSB8fCBpc1ByaWNlTGlrZUtleShmLmtleSkpIHtcbiAgICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlSURSKHJhdylcbiAgICAgIHBheWxvYWRbZi5rZXldID0gcGFyc2VkICE9IG51bGwgPyBwYXJzZWQgOiAocmF3ID8gTnVtYmVyKHJhdykgOiBudWxsKVxuICAgIH0gZWxzZSBpZiAoZi50eXBlID09PSAoXCJOVU1CRVJcIiBhcyBGaWVsZFR5cGUpKSB7XG4gICAgICBwYXlsb2FkW2Yua2V5XSA9IHJhdyA/IE51bWJlcihyYXcpIDogbnVsbFxuICAgIH0gZWxzZSB7XG4gICAgICBwYXlsb2FkW2Yua2V5XSA9IHJhd1xuICAgIH1cbiAgfVxuXG4gIC8vIEZvcm11bGEgRXZhbHVhdGlvblxuICBmb3IgKGNvbnN0IGYgb2YgZG9jVHlwZS5maWVsZHMpIHtcbiAgICBpZiAoIWYucmVhZE9ubHkpIGNvbnRpbnVlXG4gICAgY29uc3QgY2ZnID0gKGYuY29uZmlnID8/IHt9KSBhcyB1bmtub3duIGFzIHsgY29tcHV0ZT86IHsgZm9ybXVsYT86IHN0cmluZyB9IH1cbiAgICBjb25zdCBmb3JtdWxhID0gY2ZnLmNvbXB1dGU/LmZvcm11bGFcbiAgICBjb25zdCB2YWwgPSBldmFsRm9ybXVsYShmb3JtdWxhLCBwYXlsb2FkKVxuICAgIGlmICh2YWwgIT0gbnVsbCkge1xuICAgICAgcGF5bG9hZFtmLmtleV0gPSB2YWxcbiAgICB9XG4gIH1cblxuICAvLyAtLS0gTmFtaW5nIFNlcmllcyAtLS1cbiAgY29uc3QgbmFtaW5nQ2ZnID0gKGRvY1R5cGUuY29uZmlnID8/IHt9KSBhcyB1bmtub3duIGFzIHsgbmFtaW5nPzogeyBtb2RlPzogc3RyaW5nOyBmaWVsZD86IHN0cmluZzsgZGVmYXVsdFBhdHRlcm4/OiBzdHJpbmcgfSB9XG4gIGNvbnN0IG5hbWluZ01vZGUgPSBuYW1pbmdDZmcubmFtaW5nPy5tb2RlID8/IFwic2VyaWVzXCJcbiAgY29uc3QgZGVmYXVsdFBhdHRlcm4gPSBuYW1pbmdDZmcubmFtaW5nPy5kZWZhdWx0UGF0dGVybiA/PyBcIlNPLSMjIyMjXCJcblxuICBsZXQgY29kZTogc3RyaW5nIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkXG4gIFxuICBjb25zdCBnZW5lcmF0ZVNlcmllc0NvZGUgPSBhc3luYyAocGF0dGVybjogc3RyaW5nLCBiSWQ6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQsIGRJZDogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgbSA9IC9eKC4qPykoIyspKC4qKSQvLmV4ZWMocGF0dGVybilcbiAgICBjb25zdCBwcmVmaXggPSBtID8gbVsxXSA6IHBhdHRlcm5cbiAgICBjb25zdCBoYXNoZXMgPSBtID8gbVsyXSA6IFwiIyMjIyNcIlxuICAgIGNvbnN0IHN1ZmZpeCA9IG0gPyBtWzNdIDogXCJcIlxuICAgIGNvbnN0IGRpZ2l0cyA9IGhhc2hlcy5sZW5ndGhcbiAgICBcbiAgICBjb25zdCBleGlzdGluZyA9IGF3YWl0IHByaXNtYS5kb2NOYW1pbmdDb3VudGVyLmZpbmRGaXJzdCh7XG4gICAgICB3aGVyZTogeyBkb2NUeXBlSWQ6IGRJZCwgYnJhbmNoSWQ6IGJJZCA/PyBudWxsLCBzZXJpZXM6IHBhdHRlcm4gfVxuICAgIH0pXG4gICAgXG4gICAgbGV0IGNvdW50ZXJcbiAgICBpZiAoZXhpc3RpbmcpIHtcbiAgICAgIGNvdW50ZXIgPSBhd2FpdCBwcmlzbWEuZG9jTmFtaW5nQ291bnRlci51cGRhdGUoe1xuICAgICAgICB3aGVyZTogeyBpZDogZXhpc3RpbmcuaWQgfSxcbiAgICAgICAgZGF0YTogeyBzZXE6IHsgaW5jcmVtZW50OiAxIH0gfVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgY291bnRlciA9IGF3YWl0IHByaXNtYS5kb2NOYW1pbmdDb3VudGVyLmNyZWF0ZSh7XG4gICAgICAgIGRhdGE6IHsgZG9jVHlwZUlkOiBkSWQsIGJyYW5jaElkOiBiSWQgPz8gbnVsbCwgc2VyaWVzOiBwYXR0ZXJuLCBzZXE6IDEgfVxuICAgICAgfSlcbiAgICB9XG4gICAgXG4gICAgY29uc3Qgc2VxID0gY291bnRlci5zZXFcbiAgICBjb25zdCBwYWQgPSBTdHJpbmcoc2VxKS5wYWRTdGFydChkaWdpdHMsIFwiMFwiKVxuICAgIHJldHVybiBgJHtwcmVmaXh9JHtwYWR9JHtzdWZmaXh9YFxuICB9XG5cbiAgdHJ5IHtcbiAgICBsZXQgcmV0cmllcyA9IDBcbiAgICB3aGlsZSAocmV0cmllcyA8IDUpIHtcbiAgICAgIGlmIChuYW1pbmdNb2RlID09PSBcInNlcmllc1wiKSB7XG4gICAgICAgIGNvZGUgPSBhd2FpdCBnZW5lcmF0ZVNlcmllc0NvZGUoZGVmYXVsdFBhdHRlcm4sIGJyYW5jaElkLCBkb2NUeXBlLmlkKVxuICAgICAgfSBlbHNlIGlmIChuYW1pbmdNb2RlID09PSBcInV1aWRcIikge1xuICAgICAgICBjb2RlID0gY3J5cHRvLnJhbmRvbVVVSUQoKVxuICAgICAgfVxuICAgICAgXG4gICAgICBpZiAoY29kZSkge1xuICAgICAgICBjb25zdCBleGlzdHMgPSBhd2FpdCBwcmlzbWEuZG9jUmVjb3JkLmZpbmRVbmlxdWUoeyB3aGVyZTogeyBjb2RlIH0gfSlcbiAgICAgICAgaWYgKCFleGlzdHMpIGJyZWFrXG4gICAgICB9XG4gICAgICByZXRyaWVzKytcbiAgICB9XG4gICAgaWYgKCFjb2RlKSB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZ2VuZXJhdGUgY29kZVwiKVxuICB9IGNhdGNoIChlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBzdWJtaXREaXJlY3RPcmRlcjogRXJyb3IgZ2VuZXJhdGluZyBjb2RlOiAke2V9YClcbiAgfVxuXG4gIC8vIC0tLSBDcmVhdGUgRG9jUmVjb3JkIChTYWxlcyBPcmRlcikgLS0tXG4gIGxldCBvcmRlclJlY29yZFxuICB0cnkge1xuICAgIC8vIEZPUkNFIFN0YXR1cyBQZW5kaW5nIGFuZCBEb2NTdGF0dXMgMSBhcyByZXF1ZXN0ZWRcbiAgICBjb25zdCBpbml0aWFsU3RhdHVzID0gXCJQZW5kaW5nXCJcbiAgICBjb25zdCBpbml0aWFsRG9jU3RhdHVzID0gMVxuXG4gICAgb3JkZXJSZWNvcmQgPSBhd2FpdCBwcmlzbWEuZG9jUmVjb3JkLmNyZWF0ZSh7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIGRvY1R5cGVJZDogZG9jVHlwZS5pZCxcbiAgICAgICAgYnJhbmNoSWQ6IGJyYW5jaElkIHx8IG51bGwsXG4gICAgICAgIGNvZGUsXG4gICAgICAgIHN0YXR1czogaW5pdGlhbFN0YXR1cyxcbiAgICAgICAgZG9jU3RhdHVzOiBpbml0aWFsRG9jU3RhdHVzLFxuICAgICAgICBkYXRhOiBwYXlsb2FkIGFzIFByaXNtYS5JbnB1dEpzb25WYWx1ZSxcbiAgICAgICAgY3JlYXRlZEJ5SWQ6IHVzZXIuaWQsXG4gICAgICAgIHVwZGF0ZWRCeUlkOiB1c2VyLmlkLFxuICAgICAgICBhc3NpZ25lZFRvSWQ6IHVzZXIuaWQsXG4gICAgICB9XG4gICAgfSlcbiAgICBjb25zb2xlLmxvZyhcInN1Ym1pdERpcmVjdE9yZGVyOiBTYWxlcyBPcmRlciBjcmVhdGVkXCIsIG9yZGVyUmVjb3JkLmlkKVxuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5lcnJvcihcInN1Ym1pdERpcmVjdE9yZGVyOiBFcnJvciBjcmVhdGluZyBTYWxlcyBPcmRlciByZWNvcmRcIiwgZSlcbiAgICB0aHJvdyBuZXcgRXJyb3IoYHN1Ym1pdERpcmVjdE9yZGVyOiBFcnJvciBjcmVhdGluZyBTYWxlcyBPcmRlciByZWNvcmQ6ICR7ZX1gKVxuICB9XG5cbiAgLy8gLS0tIENyZWF0ZSBDaGlsZCBSb3dzIChTYWxlcyBPcmRlciBJdGVtKSAtLS1cbiAgY29uc3QgaXRlbURvY1R5cGUgPSBhd2FpdCBwcmlzbWEuZG9jVHlwZS5maW5kVW5pcXVlKHsgXG4gICAgd2hlcmU6IHsga2V5OiBcInNhbGVzX29yZGVyX2l0ZW1cIiB9LFxuICAgIGluY2x1ZGU6IHsgZmllbGRzOiB0cnVlIH1cbiAgfSlcblxuICBpZiAoaXRlbURvY1R5cGUpIHtcbiAgICBjb25zdCBpdGVtRGF0YTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gPSB7fVxuICAgIFxuICAgIGNvbnN0IHByaWNlSWQgPSBTdHJpbmcoZm9ybURhdGEuZ2V0KFwicHJpY2VJZFwiKSB8fCBcIlwiKVxuICAgIGNvbnN0IHNlbGVjdGVkUHJpY2UgPSBwcm9kdWN0LnByaWNlcy5maW5kKHAgPT4gcC5pZCA9PT0gcHJpY2VJZClcbiAgICBcbiAgICBmb3IgKGNvbnN0IGYgb2YgaXRlbURvY1R5cGUuZmllbGRzKSB7XG4gICAgICAgIGlmIChmLmtleSA9PT0gXCJwcm9kdWN0X2lkXCIgfHwgZi5rZXkgPT09IFwicHJvZHVjdFwiKSB7XG4gICAgICAgICAgICBpdGVtRGF0YVtmLmtleV0gPSBwcm9kdWN0LmlkXG4gICAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9IFxuICAgICAgICBpZiAoZi5rZXkgPT09IFwic2VydmljZV9uYW1lXCIpIHtcbiAgICAgICAgICAgIGl0ZW1EYXRhW2Yua2V5XSA9IHByb2R1Y3QubmFtZVxuICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgICBpZiAoZi5rZXkgPT09IFwicXR5XCIpIHtcbiAgICAgICAgICAgIGl0ZW1EYXRhW2Yua2V5XSA9IDFcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGYua2V5ID09PSBcInByb2R1Y3RfY2F0ZWdvcnlcIikge1xuICAgICAgICAgICAgaXRlbURhdGFbZi5rZXldID0gcHJvZHVjdC5ncm91cD8ucGFyZW50Py5pZFxuICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgICBpZiAoZi5rZXkgPT09IFwicHJvZHVjdF9zdWJfY2F0ZWdvcnlcIikge1xuICAgICAgICAgICAgaXRlbURhdGFbZi5rZXldID0gcHJvZHVjdC5ncm91cD8uaWRcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChzZWxlY3RlZFByaWNlKSB7XG4gICAgICAgICAgICBpZiAoZi5rZXkgPT09IFwibXJjXCIgfHwgZi5rZXkgPT09IFwicHJpY2VcIiB8fCBmLmtleSA9PT0gXCJ1bml0X3ByaWNlXCIpIHtcbiAgICAgICAgICAgICAgICBpdGVtRGF0YVtmLmtleV0gPSBOdW1iZXIoc2VsZWN0ZWRQcmljZS5iYXNlUHJpY2UpXG4gICAgICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmLmtleSA9PT0gXCJucmNcIikge1xuICAgICAgICAgICAgICAgIGl0ZW1EYXRhW2Yua2V5XSA9IE51bWJlcihzZWxlY3RlZFByaWNlLnNldHVwRmVlKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZi5yZWFkT25seSkgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gQ2FsY3VsYXRlIFN1YnRvdGFsc1xuICAgIGNvbnN0IHF0eSA9IHR5cGVvZiBpdGVtRGF0YS5xdHkgPT09ICdudW1iZXInID8gaXRlbURhdGEucXR5IDogMVxuICAgIGNvbnN0IG5yYyA9IHR5cGVvZiBpdGVtRGF0YS5ucmMgPT09ICdudW1iZXInID8gaXRlbURhdGEubnJjIDogMFxuICAgIGNvbnN0IG1yYyA9IHR5cGVvZiBpdGVtRGF0YS5tcmMgPT09ICdudW1iZXInID8gaXRlbURhdGEubXJjIDogXG4gICAgICAgICAgICAgICAodHlwZW9mIGl0ZW1EYXRhLnByaWNlID09PSAnbnVtYmVyJyA/IGl0ZW1EYXRhLnByaWNlIDogXG4gICAgICAgICAgICAgICAodHlwZW9mIGl0ZW1EYXRhLnVuaXRfcHJpY2UgPT09ICdudW1iZXInID8gaXRlbURhdGEudW5pdF9wcmljZSA6IDApKVxuXG4gICAgaXRlbURhdGEuc3VidG90YWxfbnJjID0gcXR5ICogbnJjXG4gICAgaXRlbURhdGEuc3VidG90YWxfbXJjID0gcXR5ICogbXJjXG5cbiAgICBmb3IgKGNvbnN0IHMgb2YgcHJvZHVjdC5zcGVjcykge1xuICAgICAgICBjb25zdCBzcGVjS2V5ID0gYHNwZWNfJHtzLmtleX1gXG4gICAgICAgIGNvbnN0IHZhbCA9IGZvcm1EYXRhLmdldChzcGVjS2V5KVxuICAgICAgICBcbiAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgaWYgKHMudHlwZSA9PT0gKFwiTlVNQkVSXCIgYXMgRmllbGRUeXBlKSkge1xuICAgICAgICAgICAgICAgICBpdGVtRGF0YVtzcGVjS2V5XSA9IE51bWJlcih2YWwpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHMudHlwZSA9PT0gKFwiQ0hFQ0tCT1hcIiBhcyBGaWVsZFR5cGUpKSB7XG4gICAgICAgICAgICAgICAgIGNvbnN0IGNmZyA9IChzLmNvbmZpZyA/PyB7fSkgYXMgdW5rbm93biBhcyB7IG9wdGlvbnM/OiBBcnJheTx7IGxhYmVsOiBzdHJpbmc7IHZhbHVlOiBzdHJpbmc7IHF0eT86IG51bWJlciB9PiB9XG4gICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNmZy5vcHRpb25zKSAmJiBjZmcub3B0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZDogc3RyaW5nW10gPSBbXVxuICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBvIG9mIGNmZy5vcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjayA9IGAke3NwZWNLZXl9X18ke28udmFsdWV9YFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFN0cmluZyhmb3JtRGF0YS5nZXQoY2spIHx8IFwiXCIpID09PSBcIm9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZC5wdXNoKFN0cmluZyhvLnZhbHVlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZC5sZW5ndGggPiAwKSBpdGVtRGF0YVtzcGVjS2V5XSA9IHNlbGVjdGVkXG4gICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICBpdGVtRGF0YVtzcGVjS2V5XSA9IHZhbCA9PT0gXCJvblwiIHx8IHZhbCA9PT0gXCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgaXRlbURhdGFbc3BlY0tleV0gPSBTdHJpbmcodmFsKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGZvciAoY29uc3QgZiBvZiBpdGVtRG9jVHlwZS5maWVsZHMpIHtcbiAgICAgICAgaWYgKCFmLnJlYWRPbmx5KSBjb250aW51ZVxuICAgICAgICBjb25zdCBjZmcgPSAoZi5jb25maWcgPz8ge30pIGFzIHVua25vd24gYXMgeyBjb21wdXRlPzogeyBmb3JtdWxhPzogc3RyaW5nIH0gfVxuICAgICAgICBjb25zdCBmb3JtdWxhID0gY2ZnLmNvbXB1dGU/LmZvcm11bGFcbiAgICAgICAgY29uc3QgdmFsID0gZXZhbEZvcm11bGEoZm9ybXVsYSwgaXRlbURhdGEpXG4gICAgICAgIGlmICh2YWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgaXRlbURhdGFbZi5rZXldID0gdmFsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgLy8gRk9SQ0UgU3RhdHVzIFBlbmRpbmcgYW5kIERvY1N0YXR1cyAxIGZvciBpdGVtIGFzIHdlbGxcbiAgICAgIGNvbnN0IGl0ZW1TdGF0dXMgPSBcIlBlbmRpbmdcIlxuICAgICAgY29uc3QgaXRlbURvY1N0YXR1cyA9IDFcblxuICAgICAgY29uc3QgaXRlbVJlY29yZCA9IGF3YWl0IHByaXNtYS5kb2NSZWNvcmQuY3JlYXRlKHtcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGRvY1R5cGVJZDogaXRlbURvY1R5cGUuaWQsXG4gICAgICAgICAgYnJhbmNoSWQ6IGJyYW5jaElkIHx8IG51bGwsXG4gICAgICAgICAgc3RhdHVzOiBpdGVtU3RhdHVzLFxuICAgICAgICAgIGRvY1N0YXR1czogaXRlbURvY1N0YXR1cyxcbiAgICAgICAgICBwYXJlbnRJZDogb3JkZXJSZWNvcmQuaWQsXG4gICAgICAgICAgZGF0YTogeyAuLi5pdGVtRGF0YSwgX3BhcmVudElkOiBvcmRlclJlY29yZC5pZCwgX3BhcmVudERvY1R5cGU6IGRvY1R5cGVLZXkgfSBhcyBQcmlzbWEuSW5wdXRKc29uVmFsdWUsXG4gICAgICAgICAgY3JlYXRlZEJ5SWQ6IHVzZXIuaWQsXG4gICAgICAgICAgdXBkYXRlZEJ5SWQ6IHVzZXIuaWQsXG4gICAgICAgICAgYXNzaWduZWRUb0lkOiB1c2VyLmlkLFxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgY29uc29sZS5sb2coXCJzdWJtaXREaXJlY3RPcmRlcjogU2FsZXMgT3JkZXIgSXRlbSByZWNvcmQgY3JlYXRlZFwiLCBpdGVtUmVjb3JkLmlkKVxuXG4gICAgICBhd2FpdCBwcmlzbWEuZG9jUm93LmNyZWF0ZSh7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICByZWNvcmRJZDogb3JkZXJSZWNvcmQuaWQsXG4gICAgICAgICAgY2hpbGREb2NUeXBlSWQ6IGl0ZW1Eb2NUeXBlLmlkLFxuICAgICAgICAgIGlkeDogMCxcbiAgICAgICAgICBkYXRhOiB7IC4uLml0ZW1EYXRhLCBfX2NoaWxkUmVjb3JkSWQ6IGl0ZW1SZWNvcmQuaWQgfSBhcyBQcmlzbWEuSW5wdXRKc29uVmFsdWVcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgLy8gVXBkYXRlIEhlYWRlciB3aXRoIFRvdGFsIENvbnRyYWN0XG4gICAgICBjb25zdCB0b3RhbE5yYyA9IE51bWJlcihpdGVtRGF0YS5zdWJ0b3RhbF9ucmMgfHwgMClcbiAgICAgIGNvbnN0IHRvdGFsTXJjID0gTnVtYmVyKGl0ZW1EYXRhLnN1YnRvdGFsX21yYyB8fCAwKVxuICAgICAgY29uc3QgdGVybU9mQ29udHJhY3QgPSBOdW1iZXIocGF5bG9hZC50ZXJtX29mX2NvbnRyYWN0IHx8IDApXG4gICAgICBjb25zdCB0b3RhbENvbnRyYWN0ID0gdG90YWxOcmMgKyAodGVybU9mQ29udHJhY3QgKiB0b3RhbE1yYylcblxuICAgICAgYXdhaXQgcHJpc21hLmRvY1JlY29yZC51cGRhdGUoe1xuICAgICAgICB3aGVyZTogeyBpZDogb3JkZXJSZWNvcmQuaWQgfSxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIC4uLihvcmRlclJlY29yZC5kYXRhIGFzIFByaXNtYS5Kc29uT2JqZWN0KSxcbiAgICAgICAgICAgICAgICB0b3RhbF9jb250cmFjdDogdG90YWxDb250cmFjdFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihcInN1Ym1pdERpcmVjdE9yZGVyOiBFcnJvciBjcmVhdGluZyBTYWxlcyBPcmRlciBJdGVtXCIsIGUpXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUud2FybihcInN1Ym1pdERpcmVjdE9yZGVyOiAnc2FsZXNfb3JkZXJfaXRlbScgRG9jVHlwZSBub3QgZm91bmRcIilcbiAgfVxuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2N1c3RvbWVyL2RvY3Mvc2FsZXNfb3JkZXJcIilcbiAgcmVkaXJlY3QoXCIvY3VzdG9tZXIvZG9jcy9zYWxlc19vcmRlclwiKVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3VibWl0TXVsdGlEaXJlY3RPcmRlcihmb3JtRGF0YTogRm9ybURhdGEpIHtcbiAgY29uc29sZS5sb2coXCItLT4gc3VibWl0TXVsdGlEaXJlY3RPcmRlciBjYWxsZWRcIilcbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlcnZlclNlc3Npb24oYXV0aE9wdGlvbnMpXG4gIGlmICghc2Vzc2lvbj8udXNlcj8uZW1haWwpIHRocm93IG5ldyBFcnJvcihcInN1Ym1pdE11bHRpRGlyZWN0T3JkZXI6IE5vIHNlc3Npb25cIilcblxuICBjb25zdCB1c2VyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7XG4gICAgd2hlcmU6IHsgZW1haWw6IHNlc3Npb24udXNlci5lbWFpbCB9LFxuICAgIGluY2x1ZGU6IHsgcm9sZTogdHJ1ZSwgYXNzaWduZWRCcmFuY2hlczogeyBpbmNsdWRlOiB7IGJyYW5jaDogdHJ1ZSB9IH0sIGNvbXBhbnk6IHRydWUgfVxuICB9KVxuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcInN1Ym1pdE11bHRpRGlyZWN0T3JkZXI6IFVzZXIgbm90IGZvdW5kXCIpXG5cbiAgLy8gUGFyc2UgSXRlbXMgZnJvbSBGb3JtRGF0YVxuICBjb25zdCByYXdJdGVtcyA9IG5ldyBNYXA8c3RyaW5nLCBSZWNvcmQ8c3RyaW5nLCBhbnk+PigpXG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIEFycmF5LmZyb20oZm9ybURhdGEuZW50cmllcygpKSkge1xuICAgIGNvbnN0IG1hdGNoID0ga2V5Lm1hdGNoKC9eaXRlbXNcXFsoW15cXF1dKylcXF1cXC4oLispJC8pXG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICBjb25zdCBpZHggPSBtYXRjaFsxXVxuICAgICAgY29uc3QgayA9IG1hdGNoWzJdXG4gICAgICBpZiAoIXJhd0l0ZW1zLmhhcyhpZHgpKSByYXdJdGVtcy5zZXQoaWR4LCB7fSlcbiAgICAgIGNvbnN0IGl0ZW0gPSByYXdJdGVtcy5nZXQoaWR4KSFcbiAgICAgIFxuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpdGVtLCBrKSkge1xuICAgICAgICAgY29uc3QgZXggPSBpdGVtW2tdXG4gICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShleCkpIGV4LnB1c2godmFsdWUpXG4gICAgICAgICBlbHNlIGl0ZW1ba10gPSBbZXgsIHZhbHVlXVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgIGl0ZW1ba10gPSB2YWx1ZVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBjb25zdCBpdGVtcyA9IEFycmF5LmZyb20ocmF3SXRlbXMudmFsdWVzKCkpXG4gIGlmIChpdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgIGNvbnNvbGUud2FybihcInN1Ym1pdE11bHRpRGlyZWN0T3JkZXI6IE5vIGl0ZW1zIGZvdW5kIGluIHBheWxvYWRcIilcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIGl0ZW1zIHNlbGVjdGVkXCIpXG4gIH1cbiAgY29uc29sZS5sb2coYHN1Ym1pdE11bHRpRGlyZWN0T3JkZXI6IEZvdW5kICR7aXRlbXMubGVuZ3RofSBpdGVtc2ApXG5cbiAgLy8gLS0tIEhlYWRlciBTZXR1cCAtLS1cbiAgY29uc3QgZG9jVHlwZUtleSA9IFwic2FsZXNfb3JkZXJcIlxuICBjb25zdCBkb2NUeXBlID0gYXdhaXQgcHJpc21hLmRvY1R5cGUuZmluZFVuaXF1ZSh7XG4gICAgd2hlcmU6IHsga2V5OiBkb2NUeXBlS2V5IH0sXG4gICAgaW5jbHVkZTogeyBmaWVsZHM6IHRydWUsIGJyYW5jaDogdHJ1ZSB9XG4gIH0pXG4gIGlmICghZG9jVHlwZSkgdGhyb3cgbmV3IEVycm9yKFwiU2FsZXMgT3JkZXIgRG9jVHlwZSBub3QgZm91bmRcIilcblxuICBjb25zdCBjb29raWVTdG9yZSA9IGF3YWl0IGNvb2tpZXMoKVxuICBsZXQgYnJhbmNoSWQ6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQgPSBjb29raWVTdG9yZS5nZXQoXCJicmFuY2hJZFwiKT8udmFsdWVcbiAgaWYgKCFicmFuY2hJZCkgYnJhbmNoSWQgPSBkb2NUeXBlLmJyYW5jaElkXG4gIGlmICghYnJhbmNoSWQgJiYgdXNlci5hc3NpZ25lZEJyYW5jaGVzLmxlbmd0aCA+IDApIGJyYW5jaElkID0gdXNlci5hc3NpZ25lZEJyYW5jaGVzWzBdLmJyYW5jaC5pZFxuXG4gIGNvbnN0IHBheWxvYWQ6IFJlY29yZDxzdHJpbmcsIHVua25vd24+ID0ge1xuICAgICAgY3VzdG9tZXI6IHVzZXIuY29tcGFueUlkLFxuICAgICAgY3VzdG9tZXJfaWQ6IHVzZXIuY29tcGFueUlkLFxuICAgICAgdHJhbnNhY3Rpb25fZGF0ZTogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KFwiVFwiKVswXSxcbiAgICAgIG9yZGVyX2RhdGU6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdChcIlRcIilbMF0sXG4gICAgICBzdGF0dXM6IFwiUGVuZGluZ1wiLFxuICAgICAgdGVybV9vZl9wYXltZW50OiBmb3JtRGF0YS5nZXQoXCJ0ZXJtX29mX3BheW1lbnRcIikgPyBTdHJpbmcoZm9ybURhdGEuZ2V0KFwidGVybV9vZl9wYXltZW50XCIpKSA6IFwiT25lIFRpbWVcIixcbiAgICAgIHRlcm1fb2ZfY29udHJhY3Q6IGZvcm1EYXRhLmdldChcInRlcm1fb2ZfY29udHJhY3RcIikgPyBOdW1iZXIoZm9ybURhdGEuZ2V0KFwidGVybV9vZl9jb250cmFjdFwiKSkgOiAwLFxuICAgICAgY29tbWVuY2VtZW50X2RhdGU6IGZvcm1EYXRhLmdldChcImNvbW1lbmNlbWVudF9kYXRlXCIpID8gU3RyaW5nKGZvcm1EYXRhLmdldChcImNvbW1lbmNlbWVudF9kYXRlXCIpKSA6IG51bGwsXG4gIH1cblxuICAvLyAtLS0gTmFtaW5nIFNlcmllcyAtLS1cbiAgY29uc3QgbmFtaW5nQ2ZnID0gKGRvY1R5cGUuY29uZmlnID8/IHt9KSBhcyB1bmtub3duIGFzIHsgbmFtaW5nPzogeyBtb2RlPzogc3RyaW5nOyBkZWZhdWx0UGF0dGVybj86IHN0cmluZyB9IH1cbiAgY29uc3QgZGVmYXVsdFBhdHRlcm4gPSBuYW1pbmdDZmcubmFtaW5nPy5kZWZhdWx0UGF0dGVybiA/PyBcIlNPLSMjIyMjXCJcbiAgbGV0IGNvZGU6IHN0cmluZyB8IHVuZGVmaW5lZFxuXG4gIGNvbnN0IGdlbmVyYXRlU2VyaWVzQ29kZSA9IGFzeW5jIChwYXR0ZXJuOiBzdHJpbmcsIGJJZDogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCwgZElkOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBtID0gL14oLio/KSgjKykoLiopJC8uZXhlYyhwYXR0ZXJuKVxuICAgIGNvbnN0IHByZWZpeCA9IG0gPyBtWzFdIDogcGF0dGVyblxuICAgIGNvbnN0IGhhc2hlcyA9IG0gPyBtWzJdIDogXCIjIyMjI1wiXG4gICAgY29uc3Qgc3VmZml4ID0gbSA/IG1bM10gOiBcIlwiXG4gICAgY29uc3QgZGlnaXRzID0gaGFzaGVzLmxlbmd0aFxuICAgIFxuICAgIGNvbnN0IGV4aXN0aW5nID0gYXdhaXQgcHJpc21hLmRvY05hbWluZ0NvdW50ZXIuZmluZEZpcnN0KHtcbiAgICAgIHdoZXJlOiB7IGRvY1R5cGVJZDogZElkLCBicmFuY2hJZDogYklkID8/IG51bGwsIHNlcmllczogcGF0dGVybiB9XG4gICAgfSlcbiAgICBcbiAgICBsZXQgY291bnRlclxuICAgIGlmIChleGlzdGluZykge1xuICAgICAgY291bnRlciA9IGF3YWl0IHByaXNtYS5kb2NOYW1pbmdDb3VudGVyLnVwZGF0ZSh7XG4gICAgICAgIHdoZXJlOiB7IGlkOiBleGlzdGluZy5pZCB9LFxuICAgICAgICBkYXRhOiB7IHNlcTogeyBpbmNyZW1lbnQ6IDEgfSB9XG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBjb3VudGVyID0gYXdhaXQgcHJpc21hLmRvY05hbWluZ0NvdW50ZXIuY3JlYXRlKHtcbiAgICAgICAgZGF0YTogeyBkb2NUeXBlSWQ6IGRJZCwgYnJhbmNoSWQ6IGJJZCA/PyBudWxsLCBzZXJpZXM6IHBhdHRlcm4sIHNlcTogMSB9XG4gICAgICB9KVxuICAgIH1cbiAgICBjb25zdCBwYWQgPSBTdHJpbmcoY291bnRlci5zZXEpLnBhZFN0YXJ0KGRpZ2l0cywgXCIwXCIpXG4gICAgcmV0dXJuIGAke3ByZWZpeH0ke3BhZH0ke3N1ZmZpeH1gXG4gIH1cblxuICBsZXQgcmV0cmllcyA9IDBcbiAgd2hpbGUgKHJldHJpZXMgPCA1KSB7XG4gICAgIGNvZGUgPSBhd2FpdCBnZW5lcmF0ZVNlcmllc0NvZGUoZGVmYXVsdFBhdHRlcm4sIGJyYW5jaElkLCBkb2NUeXBlLmlkKVxuICAgICBjb25zdCBleGlzdHMgPSBhd2FpdCBwcmlzbWEuZG9jUmVjb3JkLmZpbmRVbmlxdWUoeyB3aGVyZTogeyBjb2RlIH0gfSlcbiAgICAgaWYgKCFleGlzdHMpIGJyZWFrXG4gICAgIHJldHJpZXMrK1xuICB9XG4gIGlmICghY29kZSkgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGdlbmVyYXRlIGNvZGVcIilcblxuICAvLyAtLS0gQ3JlYXRlIEhlYWRlciBSZWNvcmQgLS0tXG4gIC8vIEZvcmNlIFBlbmRpbmcvMSBhcyBwZXIgcmVxdWlyZW1lbnRcbiAgY29uc3QgZmluYWxTdGF0dXMgPSBcIlBlbmRpbmdcIlxuICBjb25zdCBmaW5hbERvY1N0YXR1cyA9IDFcblxuICBjb25zdCBvcmRlclJlY29yZCA9IGF3YWl0IHByaXNtYS5kb2NSZWNvcmQuY3JlYXRlKHtcbiAgICBkYXRhOiB7XG4gICAgICBkb2NUeXBlSWQ6IGRvY1R5cGUuaWQsXG4gICAgICBicmFuY2hJZDogYnJhbmNoSWQgfHwgbnVsbCxcbiAgICAgIGNvZGUsXG4gICAgICBzdGF0dXM6IGZpbmFsU3RhdHVzLFxuICAgICAgZG9jU3RhdHVzOiBmaW5hbERvY1N0YXR1cyxcbiAgICAgIGRhdGE6IHBheWxvYWQgYXMgUHJpc21hLklucHV0SnNvblZhbHVlLFxuICAgICAgY3JlYXRlZEJ5SWQ6IHVzZXIuaWQsXG4gICAgICB1cGRhdGVkQnlJZDogdXNlci5pZCxcbiAgICAgIGFzc2lnbmVkVG9JZDogdXNlci5pZCxcbiAgICB9XG4gIH0pXG5cbiAgLy8gVHJhY2sgdG90YWxzIGZvciBoZWFkZXIgdXBkYXRlXG4gIGxldCB0b3RhbE5yYyA9IDBcbiAgbGV0IHRvdGFsTXJjID0gMFxuXG4gIC8vIC0tLSBQcm9jZXNzIEl0ZW1zIC0tLVxuICBjb25zdCBpdGVtRG9jVHlwZSA9IGF3YWl0IHByaXNtYS5kb2NUeXBlLmZpbmRVbmlxdWUoeyBcbiAgICB3aGVyZTogeyBrZXk6IFwic2FsZXNfb3JkZXJfaXRlbVwiIH0sXG4gICAgaW5jbHVkZTogeyBmaWVsZHM6IHRydWUgfVxuICB9KVxuXG4gIGlmIChpdGVtRG9jVHlwZSkge1xuICAgIGxldCBpdGVtSWR4ID0gMFxuICAgIGZvciAoY29uc3QgaXRlbUlucHV0IG9mIGl0ZW1zKSB7XG4gICAgICAgIGNvbnN0IHByb2R1Y3RJZCA9IFN0cmluZyhpdGVtSW5wdXQucHJvZHVjdElkIHx8IFwiXCIpXG4gICAgICAgIGlmICghcHJvZHVjdElkKSBjb250aW51ZVxuXG4gICAgICAgIGNvbnN0IHByb2R1Y3QgPSBhd2FpdCBwcmlzbWEucHJvZHVjdC5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBwcm9kdWN0SWQgfSxcbiAgICAgICAgICAgIGluY2x1ZGU6IHsgcHJpY2VzOiB0cnVlLCBzcGVjczogdHJ1ZSwgZ3JvdXA6IHsgaW5jbHVkZTogeyBwYXJlbnQ6IHRydWUgfSB9IH1cbiAgICAgICAgfSlcbiAgICAgICAgaWYgKCFwcm9kdWN0KSBjb250aW51ZVxuXG4gICAgICAgIGNvbnN0IGl0ZW1EYXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA9IHtcbiAgICAgICAgICAgIHRlcm1fb2ZfY29udHJhY3Q6IDAsXG4gICAgICAgICAgICB0ZXJtX29mX3BheW1lbnQ6IFwiT25lIFRpbWVcIixcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwcmljZUlkID0gU3RyaW5nKGl0ZW1JbnB1dC5wcmljZUlkIHx8IFwiXCIpXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkUHJpY2UgPSBwcm9kdWN0LnByaWNlcy5maW5kKHAgPT4gcC5pZCA9PT0gcHJpY2VJZClcblxuICAgICAgICAvLyBNYXAgRmllbGRzXG4gICAgICAgIGZvciAoY29uc3QgZiBvZiBpdGVtRG9jVHlwZS5maWVsZHMpIHtcbiAgICAgICAgICAgIGlmIChmLmtleSA9PT0gXCJwcm9kdWN0X2lkXCIpIHsgaXRlbURhdGFbZi5rZXldID0gcHJvZHVjdC5pZDsgY29udGludWUgfVxuICAgICAgICAgICAgaWYgKGYua2V5ID09PSBcInNlcnZpY2VfbmFtZVwiKSB7IGl0ZW1EYXRhW2Yua2V5XSA9IHByb2R1Y3QubmFtZTsgY29udGludWUgfVxuICAgICAgICAgICAgaWYgKGYua2V5ID09PSBcInF0eVwiKSB7IFxuICAgICAgICAgICAgICAgIGNvbnN0IHEgPSBOdW1iZXIoaXRlbUlucHV0LnF0eSlcbiAgICAgICAgICAgICAgICBpdGVtRGF0YVtmLmtleV0gPSAhaXNOYU4ocSkgJiYgcSA+IDAgPyBxIDogMVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoZi5rZXkgPT09IFwicHJvZHVjdF9jYXRlZ29yeVwiKSB7IGl0ZW1EYXRhW2Yua2V5XSA9IHByb2R1Y3QuZ3JvdXA/LnBhcmVudD8uaWQ7IGNvbnRpbnVlIH1cbiAgICAgICAgICAgIGlmIChmLmtleSA9PT0gXCJwcm9kdWN0X3N1Yl9jYXRlZ29yeVwiKSB7IGl0ZW1EYXRhW2Yua2V5XSA9IHByb2R1Y3QuZ3JvdXA/LmlkOyBjb250aW51ZSB9XG5cbiAgICAgICAgICAgIGlmIChzZWxlY3RlZFByaWNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGYua2V5ID09PSBcIm1yY1wiIHx8IGYua2V5ID09PSBcInByaWNlXCIgfHwgZi5rZXkgPT09IFwidW5pdF9wcmljZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1EYXRhW2Yua2V5XSA9IE51bWJlcihzZWxlY3RlZFByaWNlLmJhc2VQcmljZSlcbiAgICAgICAgICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGYua2V5ID09PSBcIm5yY1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1EYXRhW2Yua2V5XSA9IE51bWJlcihzZWxlY3RlZFByaWNlLnNldHVwRmVlKVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmLnJlYWRPbmx5KSBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlIFN1YnRvdGFsc1xuICAgICAgICBjb25zdCBxdHkgPSB0eXBlb2YgaXRlbURhdGEucXR5ID09PSAnbnVtYmVyJyA/IGl0ZW1EYXRhLnF0eSA6IDFcbiAgICAgICAgY29uc3QgbnJjID0gdHlwZW9mIGl0ZW1EYXRhLm5yYyA9PT0gJ251bWJlcicgPyBpdGVtRGF0YS5ucmMgOiAwXG4gICAgICAgIGNvbnN0IG1yYyA9IHR5cGVvZiBpdGVtRGF0YS5tcmMgPT09ICdudW1iZXInID8gaXRlbURhdGEubXJjIDogXG4gICAgICAgICAgICAgICAgICAgKHR5cGVvZiBpdGVtRGF0YS5wcmljZSA9PT0gJ251bWJlcicgPyBpdGVtRGF0YS5wcmljZSA6IFxuICAgICAgICAgICAgICAgICAgICh0eXBlb2YgaXRlbURhdGEudW5pdF9wcmljZSA9PT0gJ251bWJlcicgPyBpdGVtRGF0YS51bml0X3ByaWNlIDogMCkpXG5cbiAgICAgICAgaXRlbURhdGEuc3VidG90YWxfbnJjID0gcXR5ICogbnJjXG4gICAgICAgIGl0ZW1EYXRhLnN1YnRvdGFsX21yYyA9IHF0eSAqIG1yY1xuICAgICAgICBcbiAgICAgICAgdG90YWxOcmMgKz0gKHF0eSAqIG5yYylcbiAgICAgICAgdG90YWxNcmMgKz0gKHF0eSAqIG1yYylcblxuICAgICAgICAvLyBNYXAgU3BlY3NcbiAgICAgICAgZm9yIChjb25zdCBzIG9mIHByb2R1Y3Quc3BlY3MpIHtcbiAgICAgICAgICAgIGNvbnN0IHNwZWNLZXkgPSBgc3BlY18ke3Mua2V5fWBcbiAgICAgICAgICAgIGNvbnN0IHZhbCA9IGl0ZW1JbnB1dFtzcGVjS2V5XVxuICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgICBpZiAocy50eXBlID09PSBcIk5VTUJFUlwiKSB7XG4gICAgICAgICAgICAgICAgICAgICBpdGVtRGF0YVtzcGVjS2V5XSA9IE51bWJlcih2YWwpXG4gICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocy50eXBlID09PSBcIkNIRUNLQk9YXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlnbm9yZSBvciBoYW5kbGUgaWYgbmVlZGVkXG4gICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1EYXRhW3NwZWNLZXldID0gdmFsID09PSBcIm9uXCIgfHwgdmFsID09PSBcInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgaXRlbURhdGFbc3BlY0tleV0gPSBTdHJpbmcodmFsKVxuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChzLnR5cGUgPT09IFwiQ0hFQ0tCT1hcIikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNmZyA9IChzLmNvbmZpZyA/PyB7fSkgYXMgdW5rbm93biBhcyB7IG9wdGlvbnM/OiBBcnJheTx7IHZhbHVlOiBzdHJpbmcgfT4gfVxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNmZy5vcHRpb25zKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZDogc3RyaW5nW10gPSBbXVxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG8gb2YgY2ZnLm9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNrID0gYCR7c3BlY0tleX1fXyR7by52YWx1ZX1gXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbUlucHV0W2NrXSA9PT0gXCJvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQucHVzaChTdHJpbmcoby52YWx1ZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkLmxlbmd0aCA+IDApIGl0ZW1EYXRhW3NwZWNLZXldID0gc2VsZWN0ZWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGb3JtdWxhXG4gICAgICAgIGZvciAoY29uc3QgZiBvZiBpdGVtRG9jVHlwZS5maWVsZHMpIHtcbiAgICAgICAgICAgIGlmICghZi5yZWFkT25seSkgY29udGludWVcbiAgICAgICAgICAgIGNvbnN0IGNmZyA9IChmLmNvbmZpZyA/PyB7fSkgYXMgdW5rbm93biBhcyB7IGNvbXB1dGU/OiB7IGZvcm11bGE/OiBzdHJpbmcgfSB9XG4gICAgICAgICAgICBjb25zdCBmb3JtdWxhID0gY2ZnLmNvbXB1dGU/LmZvcm11bGFcbiAgICAgICAgICAgIGNvbnN0IHZhbCA9IGV2YWxGb3JtdWxhKGZvcm11bGEsIGl0ZW1EYXRhKVxuICAgICAgICAgICAgaWYgKHZhbCAhPSBudWxsKSBpdGVtRGF0YVtmLmtleV0gPSB2YWxcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENyZWF0ZSBJdGVtXG4gICAgICAgIGNvbnN0IGlTdGF0dXMgPSBcIlBlbmRpbmdcIlxuICAgICAgICBjb25zdCBpRG9jU3RhdHVzID0gMVxuXG4gICAgICAgIGNvbnN0IGl0ZW1SZWNvcmQgPSBhd2FpdCBwcmlzbWEuZG9jUmVjb3JkLmNyZWF0ZSh7XG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgZG9jVHlwZUlkOiBpdGVtRG9jVHlwZS5pZCxcbiAgICAgICAgICAgICAgICBicmFuY2hJZDogYnJhbmNoSWQgfHwgbnVsbCxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IGlTdGF0dXMsXG4gICAgICAgICAgICAgICAgZG9jU3RhdHVzOiBpRG9jU3RhdHVzLFxuICAgICAgICAgICAgICAgIHBhcmVudElkOiBvcmRlclJlY29yZC5pZCxcbiAgICAgICAgICAgICAgICBkYXRhOiB7IC4uLml0ZW1EYXRhLCBfcGFyZW50SWQ6IG9yZGVyUmVjb3JkLmlkLCBfcGFyZW50RG9jVHlwZTogZG9jVHlwZUtleSB9IGFzIFByaXNtYS5JbnB1dEpzb25WYWx1ZSxcbiAgICAgICAgICAgICAgICBjcmVhdGVkQnlJZDogdXNlci5pZCxcbiAgICAgICAgICAgICAgICB1cGRhdGVkQnlJZDogdXNlci5pZCxcbiAgICAgICAgICAgICAgICBhc3NpZ25lZFRvSWQ6IHVzZXIuaWQsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgYXdhaXQgcHJpc21hLmRvY1Jvdy5jcmVhdGUoe1xuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIHJlY29yZElkOiBvcmRlclJlY29yZC5pZCxcbiAgICAgICAgICAgICAgICBjaGlsZERvY1R5cGVJZDogaXRlbURvY1R5cGUuaWQsXG4gICAgICAgICAgICAgICAgaWR4OiBpdGVtSWR4LFxuICAgICAgICAgICAgICAgIGRhdGE6IHsgLi4uaXRlbURhdGEsIF9fY2hpbGRSZWNvcmRJZDogaXRlbVJlY29yZC5pZCB9IGFzIFByaXNtYS5JbnB1dEpzb25WYWx1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBpdGVtSWR4KytcbiAgICB9XG4gIH1cblxuICAvLyBVcGRhdGUgSGVhZGVyIHdpdGggVG90YWwgQ29udHJhY3RcbiAgY29uc3QgdGVybU9mQ29udHJhY3QgPSBOdW1iZXIocGF5bG9hZC50ZXJtX29mX2NvbnRyYWN0IHx8IDApXG4gIGNvbnN0IHRvdGFsQ29udHJhY3QgPSB0b3RhbE5yYyArICh0ZXJtT2ZDb250cmFjdCAqIHRvdGFsTXJjKVxuXG4gIGF3YWl0IHByaXNtYS5kb2NSZWNvcmQudXBkYXRlKHtcbiAgICB3aGVyZTogeyBpZDogb3JkZXJSZWNvcmQuaWQgfSxcbiAgICBkYXRhOiB7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIC4uLihvcmRlclJlY29yZC5kYXRhIGFzIFByaXNtYS5Kc29uT2JqZWN0KSxcbiAgICAgICAgICAgIHRvdGFsX2NvbnRyYWN0OiB0b3RhbENvbnRyYWN0XG4gICAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvY3VzdG9tZXIvZG9jcy9zYWxlc19vcmRlclwiKVxuICByZWRpcmVjdChcIi9jdXN0b21lci9kb2NzL3NhbGVzX29yZGVyXCIpXG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjRTQWt4QnNCLG1NQUFBIn0=
}),
"[project]/src/app/customer/order/data:21a754 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "submitRequestOrder",
    ()=>$$RSC_SERVER_ACTION_0
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"403dd804a9f962faf8c67629baccf1067a7347de95":"submitRequestOrder"},"src/app/customer/order/actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("403dd804a9f962faf8c67629baccf1067a7347de95", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "submitRequestOrder");
;
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vYWN0aW9ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzZXJ2ZXJcIlxuXG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiQC9saWIvcHJpc21hXCJcbmltcG9ydCB7IGdldFNlcnZlclNlc3Npb24gfSBmcm9tIFwibmV4dC1hdXRoXCJcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSBcIkAvbGliL2F1dGhcIlxuaW1wb3J0IHsgY29va2llcyB9IGZyb20gXCJuZXh0L2hlYWRlcnNcIlxuaW1wb3J0IHR5cGUgeyBQcmlzbWEgfSBmcm9tIFwiQC9nZW5lcmF0ZWQvcHJpc21hL2NsaWVudFwiXG5pbXBvcnQgeyBGaWVsZFR5cGUgfSBmcm9tIFwiQC9nZW5lcmF0ZWQvcHJpc21hL2VudW1zXCJcbmltcG9ydCB7IHJlZGlyZWN0IH0gZnJvbSBcIm5leHQvbmF2aWdhdGlvblwiXG5pbXBvcnQgeyByZXZhbGlkYXRlUGF0aCB9IGZyb20gXCJuZXh0L2NhY2hlXCJcblxuLy8gLS0tIEhlbHBlciBGdW5jdGlvbnMgZnJvbSBBZG1pbiBMb2dpYyAtLS1cblxuZnVuY3Rpb24gcGFyc2VJRFIocmF3OiBzdHJpbmcpOiBudW1iZXIgfCBudWxsIHtcbiAgaWYgKCFyYXcpIHJldHVybiBudWxsXG4gIGxldCBzID0gU3RyaW5nKHJhdykudHJpbSgpXG4gIHMgPSBzLnJlcGxhY2UoL15JRFJcXHMqL2ksIFwiXCIpXG4gIHMgPSBzLnJlcGxhY2UoL15ScFxcLj9cXHMqL2ksIFwiXCIpXG4gIHMgPSBzLnJlcGxhY2UoL1xcLi9nLCBcIlwiKVxuICBzID0gcy5yZXBsYWNlKC8sL2csIFwiLlwiKVxuICBjb25zdCBuID0gTnVtYmVyKHMpXG4gIHJldHVybiBOdW1iZXIuaXNOYU4obikgPyBudWxsIDogblxufVxuXG5mdW5jdGlvbiBpc1ByaWNlTGlrZUtleShrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICBjb25zdCBrID0gU3RyaW5nKGtleSB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpXG4gIHJldHVybiBrID09PSBcIm5yY1wiIHx8IGsgPT09IFwibXJjXCIgfHwgayA9PT0gXCJzdWJ0b3RhbF9ucmNcIiB8fCBrID09PSBcInN1Yl90b3RhbF9ucmNcIiB8fCBrID09PSBcInN1YnRvdGFsX21yY1wiIHx8IGsgPT09IFwic3ViX3RvdGFsX21yY1wiIHx8IGsgPT09IFwicHJpY2VcIiB8fCBrID09PSBcInVuaXRfcHJpY2VcIlxufVxuXG5mdW5jdGlvbiBldmFsRm9ybXVsYShmb3JtdWxhPzogc3RyaW5nLCB2YXJzPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiBudW1iZXIgfCBudWxsIHtcbiAgICBpZiAoIWZvcm11bGEgfHwgIXZhcnMpIHJldHVybiBudWxsXG4gICAgY29uc3QgYWxsb3dlZEZucyA9IG5ldyBTZXQoW1wicm91bmRcIixcImZsb29yXCIsXCJjZWlsXCIsXCJtaW5cIixcIm1heFwiXSlcbiAgICBsZXQgZXhwciA9IGZvcm11bGEucmVwbGFjZSgvXFxeL2csIFwiKipcIilcbiAgICBleHByID0gZXhwci5yZXBsYWNlKC9cXGIoW0EtWmEtel9dW0EtWmEtejAtOV9dKilcXGIvZywgKG0pID0+IHtcbiAgICAgIGlmIChhbGxvd2VkRm5zLmhhcyhtKSkgcmV0dXJuIGBNYXRoLiR7bX1gXG4gICAgICByZXR1cm4gYGdldChcIiR7bX1cIilgXG4gICAgfSlcbiAgICB0cnkge1xuICAgICAgY29uc3QgZm4gPSBuZXcgRnVuY3Rpb24oXCJnZXRcIixcIk1hdGhcIiwgYHJldHVybiAoICR7ZXhwcn0gKWApXG4gICAgICBjb25zdCByZXMgPSBmbigoazogc3RyaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IHYgPSB2YXJzW2tdXG4gICAgICAgIGlmICh0eXBlb2YgdiA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHZcbiAgICAgICAgaWYgKHR5cGVvZiB2ID09PSBcInN0cmluZ1wiKSB7IGNvbnN0IG4gPSBOdW1iZXIodik7IHJldHVybiBOdW1iZXIuaXNOYU4obikgPyAwIDogbiB9XG4gICAgICAgIGlmICh0eXBlb2YgdiA9PT0gXCJib29sZWFuXCIpIHJldHVybiB2ID8gMSA6IDBcbiAgICAgICAgcmV0dXJuIDBcbiAgICAgIH0sIE1hdGgpXG4gICAgICByZXR1cm4gKHR5cGVvZiByZXMgPT09IFwibnVtYmVyXCIgJiYgTnVtYmVyLmlzRmluaXRlKHJlcykpID8gcmVzIDogbnVsbFxuICAgIH0gY2F0Y2ggeyByZXR1cm4gbnVsbCB9XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5hc3luYyBmdW5jdGlvbiByZXNvbHZlSW5pdGlhbFN0YXR1cyhkb2NUeXBlSWQ6IHN0cmluZywgYnJhbmNoSWQ6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQsIHByZWZlcnJlZFN0YXR1czogc3RyaW5nID0gXCJQZW5kaW5nXCIpIHtcbiAgbGV0IHdmID0gbnVsbFxuICBpZiAoYnJhbmNoSWQpIHtcbiAgICB3ZiA9IGF3YWl0IHByaXNtYS5kb2NXb3JrZmxvdy5maW5kVW5pcXVlKHsgd2hlcmU6IHsgZG9jVHlwZUlkX2JyYW5jaElkOiB7IGRvY1R5cGVJZCwgYnJhbmNoSWQgfSB9IH0pXG4gIH1cbiAgaWYgKCF3Zikge1xuICAgIHdmID0gYXdhaXQgcHJpc21hLmRvY1dvcmtmbG93LmZpbmRGaXJzdCh7IHdoZXJlOiB7IGRvY1R5cGVJZCwgYnJhbmNoSWQ6IG51bGwgfSB9KVxuICB9XG4gIFxuICAvLyBEZWZhdWx0IGZhbGxiYWNrXG4gIGNvbnN0IHJlc3VsdCA9IHsgc3RhdHVzOiBwcmVmZXJyZWRTdGF0dXMsIGRvY1N0YXR1czogMSBhcyBudW1iZXIgfCB1bmRlZmluZWQgfVxuXG4gIGlmICh3ZiAmJiB3Zi5jb25maWcpIHtcbiAgICBjb25zdCBjZmcgPSB3Zi5jb25maWcgYXMgeyBzdGF0ZXM/OiBBcnJheTx7IG5hbWU6IHN0cmluZzsgZG9jU3RhdHVzPzogbnVtYmVyIH0+IH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShjZmcuc3RhdGVzKSAmJiBjZmcuc3RhdGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIFRyeSB0byBmaW5kIHRoZSBwcmVmZXJyZWQgc3RhdHVzIGZpcnN0XG4gICAgICBjb25zdCBmb3VuZFN0YXRlID0gY2ZnLnN0YXRlcy5maW5kKHMgPT4gcy5uYW1lID09PSBwcmVmZXJyZWRTdGF0dXMpXG4gICAgICBcbiAgICAgIGlmIChmb3VuZFN0YXRlKSB7XG4gICAgICAgIHJlc3VsdC5zdGF0dXMgPSBmb3VuZFN0YXRlLm5hbWVcbiAgICAgICAgaWYgKHR5cGVvZiBmb3VuZFN0YXRlLmRvY1N0YXR1cyA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgIHJlc3VsdC5kb2NTdGF0dXMgPSB3Zi5kb250T3ZlcnJpZGVTdGF0dXMgPyB1bmRlZmluZWQgOiBmb3VuZFN0YXRlLmRvY1N0YXR1c1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBJZiBwcmVmZXJyZWQgc3RhdHVzIG5vdCBmb3VuZCBpbiB3b3JrZmxvdywgd2hhdCBzaG91bGQgd2UgZG8/XG4gICAgICAgIC8vIFVzZXIgcmVxdWVzdGVkOiBcImRlZmF1bHQgZG9jU3RhdHVzIC4uLiBhZGFsYWggMSAsIGRhbiBzdGF0dXMgPSBQZW5kaW5nXCJcbiAgICAgICAgLy8gSWYgd2Ugc3RyaWN0bHkgZm9sbG93IHdvcmtmbG93LCB3ZSBtaWdodCBwaWNrIHRoZSBmaXJzdCBzdGF0ZSAoRHJhZnQvMCkuXG4gICAgICAgIC8vIEJ1dCBzaW5jZSB0aGlzIGlzIGEgXCJTdWJtaXRcIiBhY3Rpb24sIHdlIHNob3VsZCBwcm9iYWJseSBmb3JjZSBcIlBlbmRpbmdcIiBpZiBwb3NzaWJsZSxcbiAgICAgICAgLy8gT1IgcmVseSBvbiB0aGUgZGVmYXVsdCBmYWxsYmFjayBpZiB0aGUgd29ya2Zsb3cgZG9lc24ndCBleHBsaWNpdGx5IGZvcmJpZCBpdC5cbiAgICAgICAgLy8gRm9yIG5vdywgbGV0J3Mgc3RpY2sgdG8gdGhlIERlZmF1bHQgZmFsbGJhY2sgKFBlbmRpbmcvMSkgaWYgcHJlZmVycmVkIHN0YXR1cyBpc24ndCBpbiB3b3JrZmxvdyxcbiAgICAgICAgLy8gZWZmZWN0aXZlbHkgaWdub3JpbmcgdGhlIHdvcmtmbG93J3MgXCJEcmFmdFwiIHN0YXJ0IHN0YXRlLlxuICAgICAgICAvLyBCdXQgaWYgdGhlIHdvcmtmbG93IGRlZmluZXMgc3RhdGVzLCB1c3VhbGx5IHRoZSByZWNvcmQgbXVzdCBiZSBpbiBvbmUgb2YgdGhlbS5cbiAgICAgICAgLy8gSWYgXCJQZW5kaW5nXCIgaXMgbm90IGluIHRoZSB3b3JrZmxvdywgc2V0dGluZyBpdCB0byBcIlBlbmRpbmdcIiBtaWdodCBicmVhayB0aGluZ3MgaWYgdGhlIHN5c3RlbSBlbmZvcmNlcyB2YWxpZCBzdGF0ZXMuXG4gICAgICAgIC8vIEhvd2V2ZXIsIGdpdmVuIHRoZSB1c2VyIGluc3RydWN0aW9uLCB3ZSBwcmlvcml0aXplIFwiUGVuZGluZ1wiLzEuXG4gICAgICAgIC8vIFNvIHdlIGRvIE5PVCBvdmVyd3JpdGUgcmVzdWx0IHdpdGggY2ZnLnN0YXRlc1swXSBoZXJlLlxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdWJtaXRSZXF1ZXN0T3JkZXIoZm9ybURhdGE6IEZvcm1EYXRhKSB7XG4gIGNvbnNvbGUubG9nKFwiLS0+IHN1Ym1pdFJlcXVlc3RPcmRlciBjYWxsZWQgKFJlZmFjdG9yZWQgQWRtaW4gTG9naWMpXCIpXG4gIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXJ2ZXJTZXNzaW9uKGF1dGhPcHRpb25zKVxuICBpZiAoIXNlc3Npb24/LnVzZXI/LmVtYWlsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwic3VibWl0UmVxdWVzdE9yZGVyOiBObyBzZXNzaW9uIG9yIGVtYWlsXCIpXG4gIH1cblxuICBjb25zdCB1c2VyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7XG4gICAgd2hlcmU6IHsgZW1haWw6IHNlc3Npb24udXNlci5lbWFpbCB9LFxuICAgIGluY2x1ZGU6IHsgcm9sZTogdHJ1ZSwgYXNzaWduZWRCcmFuY2hlczogeyBpbmNsdWRlOiB7IGJyYW5jaDogdHJ1ZSB9IH0sIGNvbXBhbnk6IHRydWUgfVxuICB9KVxuICBpZiAoIXVzZXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJzdWJtaXRSZXF1ZXN0T3JkZXI6IFVzZXIgbm90IGZvdW5kXCIpXG4gIH1cblxuICBjb25zdCBwcm9kdWN0SWQgPSBTdHJpbmcoZm9ybURhdGEuZ2V0KFwicHJvZHVjdElkXCIpIHx8IFwiXCIpXG4gIGNvbnNvbGUubG9nKFwic3VibWl0UmVxdWVzdE9yZGVyOiBwcm9kdWN0SWQgPVwiLCBwcm9kdWN0SWQpXG4gIGlmICghcHJvZHVjdElkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwic3VibWl0UmVxdWVzdE9yZGVyOiBNaXNzaW5nIHByb2R1Y3RJZFwiKVxuICB9XG5cbiAgY29uc3QgcHJvZHVjdCA9IGF3YWl0IHByaXNtYS5wcm9kdWN0LmZpbmRVbmlxdWUoe1xuICAgIHdoZXJlOiB7IGlkOiBwcm9kdWN0SWQgfSxcbiAgICBpbmNsdWRlOiB7IFxuICAgICAgcHJpY2VzOiB0cnVlLCBcbiAgICAgIHNwZWNzOiB0cnVlLFxuICAgICAgZ3JvdXA6IHtcbiAgICAgICAgaW5jbHVkZToge1xuICAgICAgICAgIHBhcmVudDogdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KVxuICBpZiAoIXByb2R1Y3QpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJzdWJtaXRSZXF1ZXN0T3JkZXI6IFByb2R1Y3Qgbm90IGZvdW5kXCIpXG4gIH1cblxuICAvLyBHZXQgRG9jVHlwZSBcIlJlcXVlc3RcIiAoYXNzdW1pbmcga2V5IGlzIFwicmVxdWVzdFwiKVxuICBjb25zdCBkb2NUeXBlS2V5ID0gXCJyZXF1ZXN0XCJcbiAgY29uc3QgZG9jVHlwZSA9IGF3YWl0IHByaXNtYS5kb2NUeXBlLmZpbmRVbmlxdWUoe1xuICAgIHdoZXJlOiB7IGtleTogZG9jVHlwZUtleSB9LFxuICAgIGluY2x1ZGU6IHsgZmllbGRzOiB0cnVlLCBicmFuY2g6IHRydWUgfVxuICB9KVxuICBcbiAgaWYgKCFkb2NUeXBlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBzdWJtaXRSZXF1ZXN0T3JkZXI6IERvY1R5cGUgd2l0aCBrZXkgXCIke2RvY1R5cGVLZXl9XCIgbm90IGZvdW5kYClcbiAgfVxuICBjb25zb2xlLmxvZyhcInN1Ym1pdFJlcXVlc3RPcmRlcjogRG9jVHlwZSBmb3VuZFwiLCBkb2NUeXBlLmlkKVxuXG4gIC8vIERldGVybWluZSBCcmFuY2hcbiAgY29uc3QgY29va2llU3RvcmUgPSBhd2FpdCBjb29raWVzKClcbiAgY29uc3QgY29va2llQnJhbmNoSWQgPSBjb29raWVTdG9yZS5nZXQoXCJicmFuY2hJZFwiKT8udmFsdWVcbiAgY29uc3QgYXNzaWduZWQgPSB1c2VyLmFzc2lnbmVkQnJhbmNoZXMubWFwKChhKSA9PiBhLmJyYW5jaC5pZClcbiAgXG4gIC8vIFByaW9yaXRpemUgYWN0aXZlIGJyYW5jaCAoY29va2llKSBhcyByZXF1ZXN0ZWRcbiAgbGV0IGJyYW5jaElkOiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkID0gY29va2llQnJhbmNoSWRcbiAgXG4gIC8vIEZhbGxiYWNrIHRvIGRvY1R5cGUgYnJhbmNoIG9yIGFzc2lnbmVkIGJyYW5jaCBpZiBubyBjb29raWVcbiAgaWYgKCFicmFuY2hJZCkge1xuICAgICBicmFuY2hJZCA9IGRvY1R5cGUuYnJhbmNoSWRcbiAgfVxuICBpZiAoIWJyYW5jaElkICYmIGFzc2lnbmVkLmxlbmd0aCA+IDApIHtcbiAgICBicmFuY2hJZCA9IGFzc2lnbmVkWzBdXG4gIH1cblxuICBjb25zb2xlLmxvZyhcInN1Ym1pdFJlcXVlc3RPcmRlcjogQnJhbmNoIGRldGVybWluZWRcIiwgYnJhbmNoSWQpXG5cbiAgLy8gLS0tIFBheWxvYWQgQ29uc3RydWN0aW9uIChBZG1pbiBTdHlsZSkgLS0tXG4gIGNvbnN0IHBheWxvYWQ6IFJlY29yZDxzdHJpbmcsIHVua25vd24+ID0ge31cbiAgXG4gIC8vIENvbnRleHQgb3ZlcnJpZGVzXG4gIGNvbnN0IGNvbnRleHRWYWx1ZXM6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7XG4gICAgICByZXF1ZXN0ZXI6IHVzZXIuaWQsXG4gICAgICByZXF1ZXN0X2RhdGU6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdChcIlRcIilbMF0sXG4gICAgICByZXFfZGF0ZTogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KFwiVFwiKVswXSxcbiAgICAgIHN0YXR1czogXCJQZW5kaW5nXCIsXG4gICAgICBjdXN0b21lcl9pZDogdXNlci5jb21wYW55SWQsXG4gIH1cblxuICBmb3IgKGNvbnN0IGYgb2YgZG9jVHlwZS5maWVsZHMpIHtcbiAgICAvLyAxLiBDaGVjayBDb250ZXh0IChBbGxvdyBvdmVycmlkaW5nIFJlYWRPbmx5IGlmIGluIGNvbnRleHQpXG4gICAgaWYgKGNvbnRleHRWYWx1ZXNbZi5rZXldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcGF5bG9hZFtmLmtleV0gPSBjb250ZXh0VmFsdWVzW2Yua2V5XVxuICAgICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIGlmIChmLnJlYWRPbmx5KSBjb250aW51ZVxuXG4gICAgLy8gMi4gQ2hlY2sgRm9ybURhdGFcbiAgICBjb25zdCByYXcgPSBTdHJpbmcoZm9ybURhdGEuZ2V0KGYua2V5KSB8fCBcIlwiKVxuICAgIFxuICAgIGlmIChmLnR5cGUgPT09IChcIkNIRUNLQk9YXCIgYXMgRmllbGRUeXBlKSkge1xuICAgICAgcGF5bG9hZFtmLmtleV0gPSByYXcgPT09IFwib25cIlxuICAgIH0gZWxzZSBpZiAoZi50eXBlID09PSAoXCJQUklDRVwiIGFzIEZpZWxkVHlwZSkgfHwgaXNQcmljZUxpa2VLZXkoZi5rZXkpKSB7XG4gICAgICBjb25zdCBwYXJzZWQgPSBwYXJzZUlEUihyYXcpXG4gICAgICBwYXlsb2FkW2Yua2V5XSA9IHBhcnNlZCAhPSBudWxsID8gcGFyc2VkIDogKHJhdyA/IE51bWJlcihyYXcpIDogbnVsbClcbiAgICB9IGVsc2UgaWYgKGYudHlwZSA9PT0gKFwiTlVNQkVSXCIgYXMgRmllbGRUeXBlKSkge1xuICAgICAgcGF5bG9hZFtmLmtleV0gPSByYXcgPyBOdW1iZXIocmF3KSA6IG51bGxcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRGVmYXVsdCBzdHJpbmdcbiAgICAgIHBheWxvYWRbZi5rZXldID0gcmF3XG4gICAgfVxuICB9XG5cbiAgLy8gLS0tIEZvcm11bGEgRXZhbHVhdGlvbiAoQWRtaW4gU3R5bGUpIC0tLVxuICBmb3IgKGNvbnN0IGYgb2YgZG9jVHlwZS5maWVsZHMpIHtcbiAgICBpZiAoIWYucmVhZE9ubHkpIGNvbnRpbnVlXG4gICAgY29uc3QgY2ZnID0gKGYuY29uZmlnID8/IHt9KSBhcyB1bmtub3duIGFzIHsgY29tcHV0ZT86IHsgZm9ybXVsYT86IHN0cmluZyB9IH1cbiAgICBjb25zdCBmb3JtdWxhID0gY2ZnLmNvbXB1dGU/LmZvcm11bGFcbiAgICBjb25zdCB2YWwgPSBldmFsRm9ybXVsYShmb3JtdWxhLCBwYXlsb2FkKVxuICAgIGlmICh2YWwgIT0gbnVsbCkge1xuICAgICAgcGF5bG9hZFtmLmtleV0gPSB2YWxcbiAgICB9XG4gIH1cblxuICAvLyAtLS0gTmFtaW5nIFNlcmllcyAtLS1cbiAgY29uc3QgbmFtaW5nQ2ZnID0gKGRvY1R5cGUuY29uZmlnID8/IHt9KSBhcyB1bmtub3duIGFzIHsgbmFtaW5nPzogeyBtb2RlPzogc3RyaW5nOyBmaWVsZD86IHN0cmluZzsgZGVmYXVsdFBhdHRlcm4/OiBzdHJpbmcgfSB9XG4gIGNvbnN0IG5hbWluZ01vZGUgPSBuYW1pbmdDZmcubmFtaW5nPy5tb2RlID8/IFwic2VyaWVzXCJcbiAgY29uc3QgZGVmYXVsdFBhdHRlcm4gPSBuYW1pbmdDZmcubmFtaW5nPy5kZWZhdWx0UGF0dGVybiA/PyBcIlJFUS0jIyMjI1wiXG5cbiAgbGV0IGNvZGU6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZFxuICBcbiAgLy8gSGVscGVyIHRvIGdlbmVyYXRlIHNlcmllc1xuICBjb25zdCBnZW5lcmF0ZVNlcmllc0NvZGUgPSBhc3luYyAocGF0dGVybjogc3RyaW5nLCBiSWQ6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQsIGRJZDogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgbSA9IC9eKC4qPykoIyspKC4qKSQvLmV4ZWMocGF0dGVybilcbiAgICBjb25zdCBwcmVmaXggPSBtID8gbVsxXSA6IHBhdHRlcm5cbiAgICBjb25zdCBoYXNoZXMgPSBtID8gbVsyXSA6IFwiIyMjIyNcIlxuICAgIGNvbnN0IHN1ZmZpeCA9IG0gPyBtWzNdIDogXCJcIlxuICAgIGNvbnN0IGRpZ2l0cyA9IGhhc2hlcy5sZW5ndGhcbiAgICBcbiAgICBjb25zdCBleGlzdGluZyA9IGF3YWl0IHByaXNtYS5kb2NOYW1pbmdDb3VudGVyLmZpbmRGaXJzdCh7XG4gICAgICB3aGVyZTogeyBkb2NUeXBlSWQ6IGRJZCwgYnJhbmNoSWQ6IGJJZCA/PyBudWxsLCBzZXJpZXM6IHBhdHRlcm4gfVxuICAgIH0pXG4gICAgXG4gICAgbGV0IGNvdW50ZXJcbiAgICBpZiAoZXhpc3RpbmcpIHtcbiAgICAgIGNvdW50ZXIgPSBhd2FpdCBwcmlzbWEuZG9jTmFtaW5nQ291bnRlci51cGRhdGUoe1xuICAgICAgICB3aGVyZTogeyBpZDogZXhpc3RpbmcuaWQgfSxcbiAgICAgICAgZGF0YTogeyBzZXE6IHsgaW5jcmVtZW50OiAxIH0gfVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgY291bnRlciA9IGF3YWl0IHByaXNtYS5kb2NOYW1pbmdDb3VudGVyLmNyZWF0ZSh7XG4gICAgICAgIGRhdGE6IHsgZG9jVHlwZUlkOiBkSWQsIGJyYW5jaElkOiBiSWQgPz8gbnVsbCwgc2VyaWVzOiBwYXR0ZXJuLCBzZXE6IDEgfVxuICAgICAgfSlcbiAgICB9XG4gICAgXG4gICAgY29uc3Qgc2VxID0gY291bnRlci5zZXFcbiAgICBjb25zdCBwYWQgPSBTdHJpbmcoc2VxKS5wYWRTdGFydChkaWdpdHMsIFwiMFwiKVxuICAgIHJldHVybiBgJHtwcmVmaXh9JHtwYWR9JHtzdWZmaXh9YFxuICB9XG5cbiAgdHJ5IHtcbiAgICBsZXQgcmV0cmllcyA9IDBcbiAgICB3aGlsZSAocmV0cmllcyA8IDUpIHtcbiAgICAgIGlmIChuYW1pbmdNb2RlID09PSBcInNlcmllc1wiKSB7XG4gICAgICAgIGNvZGUgPSBhd2FpdCBnZW5lcmF0ZVNlcmllc0NvZGUoZGVmYXVsdFBhdHRlcm4sIGJyYW5jaElkLCBkb2NUeXBlLmlkKVxuICAgICAgfSBlbHNlIGlmIChuYW1pbmdNb2RlID09PSBcInV1aWRcIikge1xuICAgICAgICBjb2RlID0gY3J5cHRvLnJhbmRvbVVVSUQoKVxuICAgICAgfVxuICAgICAgXG4gICAgICAvLyBDaGVjayB1bmlxdWVuZXNzXG4gICAgICBpZiAoY29kZSkge1xuICAgICAgICBjb25zdCBleGlzdHMgPSBhd2FpdCBwcmlzbWEuZG9jUmVjb3JkLmZpbmRVbmlxdWUoeyB3aGVyZTogeyBjb2RlIH0gfSlcbiAgICAgICAgaWYgKCFleGlzdHMpIGJyZWFrXG4gICAgICAgIGNvbnNvbGUud2Fybihgc3VibWl0UmVxdWVzdE9yZGVyOiBDb2RlIGNvbGxpc2lvbiBmb3IgJHtjb2RlfSwgcmV0cnlpbmcuLi5gKVxuICAgICAgfVxuICAgICAgcmV0cmllcysrXG4gICAgfVxuICAgIGlmICghY29kZSkgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGdlbmVyYXRlIGNvZGVcIilcbiAgICBjb25zb2xlLmxvZyhcInN1Ym1pdFJlcXVlc3RPcmRlcjogR2VuZXJhdGVkIGNvZGVcIiwgY29kZSlcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJzdWJtaXRSZXF1ZXN0T3JkZXI6IEVycm9yIGdlbmVyYXRpbmcgY29kZVwiLCBlKVxuICAgIHRocm93IG5ldyBFcnJvcihgc3VibWl0UmVxdWVzdE9yZGVyOiBFcnJvciBnZW5lcmF0aW5nIGNvZGU6ICR7ZX1gKVxuICB9XG5cbiAgLy8gLS0tIENyZWF0ZSBEb2NSZWNvcmQgKFJlcXVlc3QpIC0tLVxuICBsZXQgcmVxdWVzdFJlY29yZFxuICB0cnkge1xuICAgIGNvbnN0IHsgc3RhdHVzOiBpbml0aWFsU3RhdHVzLCBkb2NTdGF0dXM6IGluaXRpYWxEb2NTdGF0dXMgfSA9IGF3YWl0IHJlc29sdmVJbml0aWFsU3RhdHVzKGRvY1R5cGUuaWQsIGJyYW5jaElkKVxuXG4gICAgcmVxdWVzdFJlY29yZCA9IGF3YWl0IHByaXNtYS5kb2NSZWNvcmQuY3JlYXRlKHtcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgZG9jVHlwZUlkOiBkb2NUeXBlLmlkLFxuICAgICAgICBicmFuY2hJZDogYnJhbmNoSWQgfHwgbnVsbCxcbiAgICAgICAgY29kZSxcbiAgICAgICAgc3RhdHVzOiBpbml0aWFsU3RhdHVzLFxuICAgICAgICBkb2NTdGF0dXM6IGluaXRpYWxEb2NTdGF0dXMsXG4gICAgICAgIGRhdGE6IHBheWxvYWQgYXMgUHJpc21hLklucHV0SnNvblZhbHVlLFxuICAgICAgICBjcmVhdGVkQnlJZDogdXNlci5pZCxcbiAgICAgICAgdXBkYXRlZEJ5SWQ6IHVzZXIuaWQsXG4gICAgICAgIGFzc2lnbmVkVG9JZDogdXNlci5pZCxcbiAgICAgIH1cbiAgICB9KVxuICAgIGNvbnNvbGUubG9nKFwic3VibWl0UmVxdWVzdE9yZGVyOiBSZXF1ZXN0IGNyZWF0ZWRcIiwgcmVxdWVzdFJlY29yZC5pZClcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJzdWJtaXRSZXF1ZXN0T3JkZXI6IEVycm9yIGNyZWF0aW5nIFJlcXVlc3QgcmVjb3JkXCIsIGUpXG4gICAgdGhyb3cgbmV3IEVycm9yKGBzdWJtaXRSZXF1ZXN0T3JkZXI6IEVycm9yIGNyZWF0aW5nIFJlcXVlc3QgcmVjb3JkOiAke2V9YClcbiAgfVxuXG4gIC8vIC0tLSBDcmVhdGUgQ2hpbGQgUm93cyAoUmVxdWVzdCBJdGVtKSAtLS1cbiAgLy8gTWltaWNraW5nIEFkbWluIExvZ2ljOiBJdGVyYXRlIENoaWxkIERvY1R5cGUgRmllbGRzIGFuZCBNYXAgRGF0YVxuICBjb25zdCBpdGVtRG9jVHlwZSA9IGF3YWl0IHByaXNtYS5kb2NUeXBlLmZpbmRVbmlxdWUoeyBcbiAgICB3aGVyZTogeyBrZXk6IFwicmVxdWVzdF9pdGVtXCIgfSxcbiAgICBpbmNsdWRlOiB7IGZpZWxkczogdHJ1ZSB9XG4gIH0pXG5cbiAgaWYgKGl0ZW1Eb2NUeXBlKSB7XG4gICAgY29uc3QgaXRlbURhdGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+ID0ge31cbiAgICBcbiAgICAvLyBGaW5kIHNlbGVjdGVkIHByaWNlXG4gICAgY29uc3QgcHJpY2VJZCA9IFN0cmluZyhmb3JtRGF0YS5nZXQoXCJwcmljZUlkXCIpIHx8IFwiXCIpXG4gICAgY29uc3Qgc2VsZWN0ZWRQcmljZSA9IHByb2R1Y3QucHJpY2VzLmZpbmQocCA9PiBwLmlkID09PSBwcmljZUlkKVxuICAgIFxuICAgIGNvbnNvbGUubG9nKFwiREVCVUc6IHN1Ym1pdFJlcXVlc3RPcmRlclwiKVxuICAgIGNvbnNvbGUubG9nKFwiREVCVUc6IEZvcm1EYXRhIEtleXM6XCIsIEFycmF5LmZyb20oZm9ybURhdGEua2V5cygpKSlcbiAgICBjb25zb2xlLmxvZyhcIkRFQlVHOiBJdGVtIERvY1R5cGUgRmllbGRzOlwiLCBpdGVtRG9jVHlwZS5maWVsZHMubWFwKGYgPT4gZi5rZXkpKVxuXG4gICAgLy8gV2Ugb25seSBoYXZlIE9ORSBpdGVtIGZyb20gdGhlIGN1c3RvbWVyIGZvcm0sIHNvIHdlIG1hcCBpdCBtYW51YWxseSB0byB0aGUgZmllbGRzXG4gICAgLy8gQnV0IHdlIGl0ZXJhdGUgaXRlbURvY1R5cGUuZmllbGRzIHRvIGVuc3VyZSB0eXBlcy9rZXlzIGFyZSBjb3JyZWN0XG4gICAgXG4gICAgLy8gMS4gUG9wdWxhdGUgc3RhbmRhcmQgZmllbGRzIGJhc2VkIG9uIERvY1R5cGUgZGVmaW5pdGlvblxuICAgIGZvciAoY29uc3QgZiBvZiBpdGVtRG9jVHlwZS5maWVsZHMpIHtcbiAgICAgICAgLy8gU3BlY2lhbCBtYXBwaW5nOiBQcmlvcml0eSBmaWVsZHMgKGZpbGwgZXZlbiBpZiByZWFkT25seSlcbiAgICAgICAgaWYgKGYua2V5ID09PSBcInByb2R1Y3RfaWRcIikge1xuICAgICAgICAgICAgaXRlbURhdGFbZi5rZXldID0gcHJvZHVjdC5pZFxuICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgfSBcbiAgICAgICAgaWYgKGYua2V5ID09PSBcInF0eVwiKSB7XG4gICAgICAgICAgICBjb25zdCByYXdRdHkgPSBmb3JtRGF0YS5nZXQoXCJxdHlcIilcbiAgICAgICAgICAgIGNvbnN0IHEgPSByYXdRdHkgPyBOdW1iZXIocmF3UXR5KSA6IDFcbiAgICAgICAgICAgIGl0ZW1EYXRhW2Yua2V5XSA9ICFpc05hTihxKSAmJiBxID4gMCA/IHEgOiAxXG4gICAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG4gICAgICAgIGlmIChmLmtleSA9PT0gXCJwcm9kdWN0X2NhdGVnb3J5XCIpIHtcbiAgICAgICAgICAgIGl0ZW1EYXRhW2Yua2V5XSA9IHByb2R1Y3QuZ3JvdXA/LnBhcmVudD8uaWRcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGYua2V5ID09PSBcInByb2R1Y3Rfc3ViX2NhdGVnb3J5XCIpIHtcbiAgICAgICAgICAgIGl0ZW1EYXRhW2Yua2V5XSA9IHByb2R1Y3QuZ3JvdXA/LmlkXG4gICAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBQcmljZSBtYXBwaW5nXG4gICAgICAgIGlmIChzZWxlY3RlZFByaWNlKSB7XG4gICAgICAgICAgICBpZiAoZi5rZXkgPT09IFwibXJjXCIgfHwgZi5rZXkgPT09IFwicHJpY2VcIiB8fCBmLmtleSA9PT0gXCJ1bml0X3ByaWNlXCIpIHtcbiAgICAgICAgICAgICAgICBpdGVtRGF0YVtmLmtleV0gPSBOdW1iZXIoc2VsZWN0ZWRQcmljZS5iYXNlUHJpY2UpXG4gICAgICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmLmtleSA9PT0gXCJucmNcIikge1xuICAgICAgICAgICAgICAgIGl0ZW1EYXRhW2Yua2V5XSA9IE51bWJlcihzZWxlY3RlZFByaWNlLnNldHVwRmVlKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZi5yZWFkT25seSkgY29udGludWU7IC8vIFNraXAgcmVhZE9ubHkgZm9yIGlucHV0IG1hcHBpbmdcbiAgICB9XG5cbiAgICAvLyAyLiBQb3B1bGF0ZSBQcm9kdWN0IFNwZWNzIChtaW1pY2tpbmcgQWRtaW4gY3JlYXRlUmVjb3JkIGxvZ2ljKVxuICAgIC8vIFdlIGl0ZXJhdGUgcHJvZHVjdC5zcGVjcyB0byBlbnN1cmUgd2UgY2FwdHVyZSBhbGwgZHluYW1pYyBzcGVjcywgXG4gICAgLy8gcmVnYXJkbGVzcyBvZiB3aGV0aGVyIHRoZXkgYXJlIGV4cGxpY2l0bHkgaW4gaXRlbURvY1R5cGUuZmllbGRzIG9yIG5vdC5cbiAgICBmb3IgKGNvbnN0IHMgb2YgcHJvZHVjdC5zcGVjcykge1xuICAgICAgICBjb25zdCBzcGVjS2V5ID0gYHNwZWNfJHtzLmtleX1gXG4gICAgICAgIGNvbnN0IHZhbCA9IGZvcm1EYXRhLmdldChzcGVjS2V5KVxuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2coYERFQlVHOiBQcm9jZXNzaW5nIFByb2R1Y3QgU3BlYyAnJHtzLmtleX0nIC0+IElucHV0ICcke3NwZWNLZXl9JyAtPiBWYWx1ZTpgLCB2YWwpXG5cbiAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgLy8gVHlwZSBjb252ZXJzaW9uIGJhc2VkIG9uIHNwZWMgdHlwZVxuICAgICAgICAgICAgaWYgKHMudHlwZSA9PT0gKFwiTlVNQkVSXCIgYXMgRmllbGRUeXBlKSkge1xuICAgICAgICAgICAgICAgICBpdGVtRGF0YVtzcGVjS2V5XSA9IE51bWJlcih2YWwpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHMudHlwZSA9PT0gKFwiQ0hFQ0tCT1hcIiBhcyBGaWVsZFR5cGUpKSB7XG4gICAgICAgICAgICAgICAgIC8vIENoZWNrYm94IGhhbmRsaW5nIG1pZ2h0IGludm9sdmUgbXVsdGlwbGUgdmFsdWVzIGlmIG9wdGlvbnMgZXhpc3QsIFxuICAgICAgICAgICAgICAgICAvLyBidXQgZm9yIHNpbXBsZSBib29sZWFuIG9yIHNpbmdsZSB2YWx1ZTpcbiAgICAgICAgICAgICAgICAgY29uc3QgY2ZnID0gKHMuY29uZmlnID8/IHt9KSBhcyB1bmtub3duIGFzIHsgb3B0aW9ucz86IEFycmF5PHsgbGFiZWw6IHN0cmluZzsgdmFsdWU6IHN0cmluZzsgcXR5PzogbnVtYmVyIH0+IH1cbiAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY2ZnLm9wdGlvbnMpICYmIGNmZy5vcHRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgIC8vIE11bHRpLW9wdGlvbiBjaGVja2JveCAobGlrZSBpbiBBZG1pbiBsb2dpYylcbiAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkOiBzdHJpbmdbXSA9IFtdXG4gICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG8gb2YgY2ZnLm9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNrID0gYCR7c3BlY0tleX1fXyR7by52YWx1ZX1gXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoU3RyaW5nKGZvcm1EYXRhLmdldChjaykgfHwgXCJcIikgPT09IFwib25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkLnB1c2goU3RyaW5nKG8udmFsdWUpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEhhbmRsZSBxdHkgaWYgbmVlZGVkIChvbWl0dGVkIGZvciBicmV2aXR5IHVubGVzcyByZXF1ZXN0ZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQubGVuZ3RoID4gMCkgaXRlbURhdGFbc3BlY0tleV0gPSBzZWxlY3RlZFxuICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgLy8gU2ltcGxlIGJvb2xlYW4gY2hlY2tib3hcbiAgICAgICAgICAgICAgICAgICAgIGl0ZW1EYXRhW3NwZWNLZXldID0gdmFsID09PSBcIm9uXCIgfHwgdmFsID09PSBcInRydWVcIlxuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICBpdGVtRGF0YVtzcGVjS2V5XSA9IFN0cmluZyh2YWwpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgLy8gRm9ybXVsYSBFdmFsIGZvciBJdGVtXG4gICAgZm9yIChjb25zdCBmIG9mIGl0ZW1Eb2NUeXBlLmZpZWxkcykge1xuICAgICAgICBpZiAoIWYucmVhZE9ubHkpIGNvbnRpbnVlXG4gICAgICAgIGNvbnN0IGNmZyA9IChmLmNvbmZpZyA/PyB7fSkgYXMgdW5rbm93biBhcyB7IGNvbXB1dGU/OiB7IGZvcm11bGE/OiBzdHJpbmcgfSB9XG4gICAgICAgIGNvbnN0IGZvcm11bGEgPSBjZmcuY29tcHV0ZT8uZm9ybXVsYVxuICAgICAgICBjb25zdCB2YWwgPSBldmFsRm9ybXVsYShmb3JtdWxhLCBpdGVtRGF0YSlcbiAgICAgICAgaWYgKHZhbCAhPSBudWxsKSB7XG4gICAgICAgICAgICBpdGVtRGF0YVtmLmtleV0gPSB2YWxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAvLyAxLiBDcmVhdGUgSW5kZXBlbmRlbnQgUmVjb3JkIGZvciBSZXF1ZXN0IEl0ZW0gKE1haW50YWluaW5nIHByZXZpb3VzIHJlcXVpcmVtZW50KVxuICAgICAgY29uc3QgeyBzdGF0dXM6IGl0ZW1TdGF0dXMsIGRvY1N0YXR1czogaXRlbURvY1N0YXR1cyB9ID0gYXdhaXQgcmVzb2x2ZUluaXRpYWxTdGF0dXMoaXRlbURvY1R5cGUuaWQsIGJyYW5jaElkKVxuXG4gICAgICBjb25zdCBpdGVtUmVjb3JkID0gYXdhaXQgcHJpc21hLmRvY1JlY29yZC5jcmVhdGUoe1xuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgZG9jVHlwZUlkOiBpdGVtRG9jVHlwZS5pZCxcbiAgICAgICAgICBicmFuY2hJZDogYnJhbmNoSWQgfHwgbnVsbCxcbiAgICAgICAgICBzdGF0dXM6IGl0ZW1TdGF0dXMsXG4gICAgICAgICAgZG9jU3RhdHVzOiBpdGVtRG9jU3RhdHVzLFxuICAgICAgICAgIHBhcmVudElkOiByZXF1ZXN0UmVjb3JkLmlkLFxuICAgICAgICAgIGRhdGE6IHsgLi4uaXRlbURhdGEsIF9wYXJlbnRJZDogcmVxdWVzdFJlY29yZC5pZCwgX3BhcmVudERvY1R5cGU6IGRvY1R5cGVLZXkgfSBhcyBQcmlzbWEuSW5wdXRKc29uVmFsdWUsXG4gICAgICAgICAgY3JlYXRlZEJ5SWQ6IHVzZXIuaWQsXG4gICAgICAgICAgdXBkYXRlZEJ5SWQ6IHVzZXIuaWQsXG4gICAgICAgICAgYXNzaWduZWRUb0lkOiB1c2VyLmlkLFxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgY29uc29sZS5sb2coXCJzdWJtaXRSZXF1ZXN0T3JkZXI6IFJlcXVlc3QgSXRlbSByZWNvcmQgY3JlYXRlZFwiLCBpdGVtUmVjb3JkLmlkKVxuXG4gICAgICAvLyAyLiBDcmVhdGUgRG9jUm93IGxpbmtpbmcgdG8gdGhlIGl0ZW0gcmVjb3JkXG4gICAgICBhd2FpdCBwcmlzbWEuZG9jUm93LmNyZWF0ZSh7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICByZWNvcmRJZDogcmVxdWVzdFJlY29yZC5pZCxcbiAgICAgICAgICBjaGlsZERvY1R5cGVJZDogaXRlbURvY1R5cGUuaWQsXG4gICAgICAgICAgaWR4OiAwLFxuICAgICAgICAgIGRhdGE6IHsgLi4uaXRlbURhdGEsIF9fY2hpbGRSZWNvcmRJZDogaXRlbVJlY29yZC5pZCB9IGFzIFByaXNtYS5JbnB1dEpzb25WYWx1ZVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgY29uc29sZS5sb2coXCJzdWJtaXRSZXF1ZXN0T3JkZXI6IFJlcXVlc3QgSXRlbSByb3cgY3JlYXRlZFwiKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJzdWJtaXRSZXF1ZXN0T3JkZXI6IEVycm9yIGNyZWF0aW5nIFJlcXVlc3QgSXRlbSByZWNvcmQvcm93XCIsIGUpXG4gICAgICAvLyBOb24tZmF0YWw/IE1heWJlIHdhcm5pbmcuXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUud2FybihcInN1Ym1pdFJlcXVlc3RPcmRlcjogJ3JlcXVlc3RfaXRlbScgRG9jVHlwZSBub3QgZm91bmQsIHNraXBwaW5nIGl0ZW0gY3JlYXRpb25cIilcbiAgfVxuXG4gIC8vIFJlZGlyZWN0IHRvIHN1Y2Nlc3MgcGFnZSBvciBzaW1pbGFyIChpZiBuZWVkZWQpXG4gIC8vIEZvciBub3csIG1heWJlIGp1c3QgbG9nIHN1Y2Nlc3NcbiAgY29uc29sZS5sb2coXCJzdWJtaXRSZXF1ZXN0T3JkZXI6IFN1Y2Nlc3NcIilcbiAgcmV2YWxpZGF0ZVBhdGgoXCIvY3VzdG9tZXIvZG9jcy9yZXF1ZXN0XCIpXG4gIHJlZGlyZWN0KFwiL2N1c3RvbWVyL2RvY3MvcmVxdWVzdFwiKVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3VibWl0RGlyZWN0T3JkZXIoZm9ybURhdGE6IEZvcm1EYXRhKSB7XG4gIGNvbnNvbGUubG9nKFwiLS0+IHN1Ym1pdERpcmVjdE9yZGVyIGNhbGxlZCAoU2FsZXMgT3JkZXIgTG9naWMpXCIpXG4gIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXJ2ZXJTZXNzaW9uKGF1dGhPcHRpb25zKVxuICBpZiAoIXNlc3Npb24/LnVzZXI/LmVtYWlsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwic3VibWl0RGlyZWN0T3JkZXI6IE5vIHNlc3Npb24gb3IgZW1haWxcIilcbiAgfVxuXG4gIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcbiAgICB3aGVyZTogeyBlbWFpbDogc2Vzc2lvbi51c2VyLmVtYWlsIH0sXG4gICAgaW5jbHVkZTogeyByb2xlOiB0cnVlLCBhc3NpZ25lZEJyYW5jaGVzOiB7IGluY2x1ZGU6IHsgYnJhbmNoOiB0cnVlIH0gfSwgY29tcGFueTogdHJ1ZSB9XG4gIH0pXG4gIGlmICghdXNlcikge1xuICAgIHRocm93IG5ldyBFcnJvcihcInN1Ym1pdERpcmVjdE9yZGVyOiBVc2VyIG5vdCBmb3VuZFwiKVxuICB9XG5cbiAgY29uc3QgcHJvZHVjdElkID0gU3RyaW5nKGZvcm1EYXRhLmdldChcInByb2R1Y3RJZFwiKSB8fCBcIlwiKVxuICBjb25zb2xlLmxvZyhcInN1Ym1pdERpcmVjdE9yZGVyOiBwcm9kdWN0SWQgPVwiLCBwcm9kdWN0SWQpXG4gIGlmICghcHJvZHVjdElkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwic3VibWl0RGlyZWN0T3JkZXI6IE1pc3NpbmcgcHJvZHVjdElkXCIpXG4gIH1cblxuICBjb25zdCBwcm9kdWN0ID0gYXdhaXQgcHJpc21hLnByb2R1Y3QuZmluZFVuaXF1ZSh7XG4gICAgd2hlcmU6IHsgaWQ6IHByb2R1Y3RJZCB9LFxuICAgIGluY2x1ZGU6IHsgXG4gICAgICBwcmljZXM6IHRydWUsIFxuICAgICAgc3BlY3M6IHRydWUsXG4gICAgICBncm91cDoge1xuICAgICAgICBpbmNsdWRlOiB7XG4gICAgICAgICAgcGFyZW50OiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pXG4gIGlmICghcHJvZHVjdCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcInN1Ym1pdERpcmVjdE9yZGVyOiBQcm9kdWN0IG5vdCBmb3VuZFwiKVxuICB9XG5cbiAgLy8gR2V0IERvY1R5cGUgXCJTYWxlcyBPcmRlclwiXG4gIGNvbnN0IGRvY1R5cGVLZXkgPSBcInNhbGVzX29yZGVyXCJcbiAgY29uc3QgZG9jVHlwZSA9IGF3YWl0IHByaXNtYS5kb2NUeXBlLmZpbmRVbmlxdWUoe1xuICAgIHdoZXJlOiB7IGtleTogZG9jVHlwZUtleSB9LFxuICAgIGluY2x1ZGU6IHsgZmllbGRzOiB0cnVlLCBicmFuY2g6IHRydWUgfVxuICB9KVxuICBcbiAgaWYgKCFkb2NUeXBlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBzdWJtaXREaXJlY3RPcmRlcjogRG9jVHlwZSB3aXRoIGtleSBcIiR7ZG9jVHlwZUtleX1cIiBub3QgZm91bmRgKVxuICB9XG4gIGNvbnNvbGUubG9nKFwic3VibWl0RGlyZWN0T3JkZXI6IERvY1R5cGUgZm91bmRcIiwgZG9jVHlwZS5pZClcblxuICAvLyBEZXRlcm1pbmUgQnJhbmNoXG4gIGNvbnN0IGNvb2tpZVN0b3JlID0gYXdhaXQgY29va2llcygpXG4gIGNvbnN0IGNvb2tpZUJyYW5jaElkID0gY29va2llU3RvcmUuZ2V0KFwiYnJhbmNoSWRcIik/LnZhbHVlXG4gIGNvbnN0IGFzc2lnbmVkID0gdXNlci5hc3NpZ25lZEJyYW5jaGVzLm1hcCgoYSkgPT4gYS5icmFuY2guaWQpXG4gIFxuICBsZXQgYnJhbmNoSWQ6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQgPSBjb29raWVCcmFuY2hJZFxuICBpZiAoIWJyYW5jaElkKSB7XG4gICAgIGJyYW5jaElkID0gZG9jVHlwZS5icmFuY2hJZFxuICB9XG4gIGlmICghYnJhbmNoSWQgJiYgYXNzaWduZWQubGVuZ3RoID4gMCkge1xuICAgIGJyYW5jaElkID0gYXNzaWduZWRbMF1cbiAgfVxuXG4gIGNvbnNvbGUubG9nKFwic3VibWl0RGlyZWN0T3JkZXI6IEJyYW5jaCBkZXRlcm1pbmVkXCIsIGJyYW5jaElkKVxuXG4gIC8vIC0tLSBQYXlsb2FkIENvbnN0cnVjdGlvbiAtLS1cbiAgY29uc3QgcGF5bG9hZDogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gPSB7fVxuICBcbiAgLy8gQ29udGV4dCBvdmVycmlkZXMgZm9yIFNhbGVzIE9yZGVyXG4gIGNvbnN0IGNvbnRleHRWYWx1ZXM6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7XG4gICAgICBjdXN0b21lcjogdXNlci5jb21wYW55SWQsIC8vIFVzdWFsbHkgbGlua2VkIHRvIENvbXBhbnlcbiAgICAgIGN1c3RvbWVyX2lkOiB1c2VyLmNvbXBhbnlJZCxcbiAgICAgIHRyYW5zYWN0aW9uX2RhdGU6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdChcIlRcIilbMF0sXG4gICAgICBvcmRlcl9kYXRlOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoXCJUXCIpWzBdLFxuICAgICAgc3RhdHVzOiBcIlBlbmRpbmdcIixcbiAgICAgIHRlcm1fb2ZfcGF5bWVudDogXCJPbmUgVGltZVwiLFxuICAgICAgdGVybV9vZl9jb250cmFjdDogMCxcbiAgfVxuXG4gIGZvciAoY29uc3QgZiBvZiBkb2NUeXBlLmZpZWxkcykge1xuICAgIGlmIChjb250ZXh0VmFsdWVzW2Yua2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHBheWxvYWRbZi5rZXldID0gY29udGV4dFZhbHVlc1tmLmtleV1cbiAgICAgICAgY29udGludWVcbiAgICB9XG5cbiAgICBpZiAoZi5yZWFkT25seSkgY29udGludWVcblxuICAgIGNvbnN0IHJhdyA9IFN0cmluZyhmb3JtRGF0YS5nZXQoZi5rZXkpIHx8IFwiXCIpXG4gICAgXG4gICAgaWYgKGYudHlwZSA9PT0gKFwiQ0hFQ0tCT1hcIiBhcyBGaWVsZFR5cGUpKSB7XG4gICAgICBwYXlsb2FkW2Yua2V5XSA9IHJhdyA9PT0gXCJvblwiXG4gICAgfSBlbHNlIGlmIChmLnR5cGUgPT09IChcIlBSSUNFXCIgYXMgRmllbGRUeXBlKSB8fCBpc1ByaWNlTGlrZUtleShmLmtleSkpIHtcbiAgICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlSURSKHJhdylcbiAgICAgIHBheWxvYWRbZi5rZXldID0gcGFyc2VkICE9IG51bGwgPyBwYXJzZWQgOiAocmF3ID8gTnVtYmVyKHJhdykgOiBudWxsKVxuICAgIH0gZWxzZSBpZiAoZi50eXBlID09PSAoXCJOVU1CRVJcIiBhcyBGaWVsZFR5cGUpKSB7XG4gICAgICBwYXlsb2FkW2Yua2V5XSA9IHJhdyA/IE51bWJlcihyYXcpIDogbnVsbFxuICAgIH0gZWxzZSB7XG4gICAgICBwYXlsb2FkW2Yua2V5XSA9IHJhd1xuICAgIH1cbiAgfVxuXG4gIC8vIEZvcm11bGEgRXZhbHVhdGlvblxuICBmb3IgKGNvbnN0IGYgb2YgZG9jVHlwZS5maWVsZHMpIHtcbiAgICBpZiAoIWYucmVhZE9ubHkpIGNvbnRpbnVlXG4gICAgY29uc3QgY2ZnID0gKGYuY29uZmlnID8/IHt9KSBhcyB1bmtub3duIGFzIHsgY29tcHV0ZT86IHsgZm9ybXVsYT86IHN0cmluZyB9IH1cbiAgICBjb25zdCBmb3JtdWxhID0gY2ZnLmNvbXB1dGU/LmZvcm11bGFcbiAgICBjb25zdCB2YWwgPSBldmFsRm9ybXVsYShmb3JtdWxhLCBwYXlsb2FkKVxuICAgIGlmICh2YWwgIT0gbnVsbCkge1xuICAgICAgcGF5bG9hZFtmLmtleV0gPSB2YWxcbiAgICB9XG4gIH1cblxuICAvLyAtLS0gTmFtaW5nIFNlcmllcyAtLS1cbiAgY29uc3QgbmFtaW5nQ2ZnID0gKGRvY1R5cGUuY29uZmlnID8/IHt9KSBhcyB1bmtub3duIGFzIHsgbmFtaW5nPzogeyBtb2RlPzogc3RyaW5nOyBmaWVsZD86IHN0cmluZzsgZGVmYXVsdFBhdHRlcm4/OiBzdHJpbmcgfSB9XG4gIGNvbnN0IG5hbWluZ01vZGUgPSBuYW1pbmdDZmcubmFtaW5nPy5tb2RlID8/IFwic2VyaWVzXCJcbiAgY29uc3QgZGVmYXVsdFBhdHRlcm4gPSBuYW1pbmdDZmcubmFtaW5nPy5kZWZhdWx0UGF0dGVybiA/PyBcIlNPLSMjIyMjXCJcblxuICBsZXQgY29kZTogc3RyaW5nIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkXG4gIFxuICBjb25zdCBnZW5lcmF0ZVNlcmllc0NvZGUgPSBhc3luYyAocGF0dGVybjogc3RyaW5nLCBiSWQ6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQsIGRJZDogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgbSA9IC9eKC4qPykoIyspKC4qKSQvLmV4ZWMocGF0dGVybilcbiAgICBjb25zdCBwcmVmaXggPSBtID8gbVsxXSA6IHBhdHRlcm5cbiAgICBjb25zdCBoYXNoZXMgPSBtID8gbVsyXSA6IFwiIyMjIyNcIlxuICAgIGNvbnN0IHN1ZmZpeCA9IG0gPyBtWzNdIDogXCJcIlxuICAgIGNvbnN0IGRpZ2l0cyA9IGhhc2hlcy5sZW5ndGhcbiAgICBcbiAgICBjb25zdCBleGlzdGluZyA9IGF3YWl0IHByaXNtYS5kb2NOYW1pbmdDb3VudGVyLmZpbmRGaXJzdCh7XG4gICAgICB3aGVyZTogeyBkb2NUeXBlSWQ6IGRJZCwgYnJhbmNoSWQ6IGJJZCA/PyBudWxsLCBzZXJpZXM6IHBhdHRlcm4gfVxuICAgIH0pXG4gICAgXG4gICAgbGV0IGNvdW50ZXJcbiAgICBpZiAoZXhpc3RpbmcpIHtcbiAgICAgIGNvdW50ZXIgPSBhd2FpdCBwcmlzbWEuZG9jTmFtaW5nQ291bnRlci51cGRhdGUoe1xuICAgICAgICB3aGVyZTogeyBpZDogZXhpc3RpbmcuaWQgfSxcbiAgICAgICAgZGF0YTogeyBzZXE6IHsgaW5jcmVtZW50OiAxIH0gfVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgY291bnRlciA9IGF3YWl0IHByaXNtYS5kb2NOYW1pbmdDb3VudGVyLmNyZWF0ZSh7XG4gICAgICAgIGRhdGE6IHsgZG9jVHlwZUlkOiBkSWQsIGJyYW5jaElkOiBiSWQgPz8gbnVsbCwgc2VyaWVzOiBwYXR0ZXJuLCBzZXE6IDEgfVxuICAgICAgfSlcbiAgICB9XG4gICAgXG4gICAgY29uc3Qgc2VxID0gY291bnRlci5zZXFcbiAgICBjb25zdCBwYWQgPSBTdHJpbmcoc2VxKS5wYWRTdGFydChkaWdpdHMsIFwiMFwiKVxuICAgIHJldHVybiBgJHtwcmVmaXh9JHtwYWR9JHtzdWZmaXh9YFxuICB9XG5cbiAgdHJ5IHtcbiAgICBsZXQgcmV0cmllcyA9IDBcbiAgICB3aGlsZSAocmV0cmllcyA8IDUpIHtcbiAgICAgIGlmIChuYW1pbmdNb2RlID09PSBcInNlcmllc1wiKSB7XG4gICAgICAgIGNvZGUgPSBhd2FpdCBnZW5lcmF0ZVNlcmllc0NvZGUoZGVmYXVsdFBhdHRlcm4sIGJyYW5jaElkLCBkb2NUeXBlLmlkKVxuICAgICAgfSBlbHNlIGlmIChuYW1pbmdNb2RlID09PSBcInV1aWRcIikge1xuICAgICAgICBjb2RlID0gY3J5cHRvLnJhbmRvbVVVSUQoKVxuICAgICAgfVxuICAgICAgXG4gICAgICBpZiAoY29kZSkge1xuICAgICAgICBjb25zdCBleGlzdHMgPSBhd2FpdCBwcmlzbWEuZG9jUmVjb3JkLmZpbmRVbmlxdWUoeyB3aGVyZTogeyBjb2RlIH0gfSlcbiAgICAgICAgaWYgKCFleGlzdHMpIGJyZWFrXG4gICAgICB9XG4gICAgICByZXRyaWVzKytcbiAgICB9XG4gICAgaWYgKCFjb2RlKSB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZ2VuZXJhdGUgY29kZVwiKVxuICB9IGNhdGNoIChlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBzdWJtaXREaXJlY3RPcmRlcjogRXJyb3IgZ2VuZXJhdGluZyBjb2RlOiAke2V9YClcbiAgfVxuXG4gIC8vIC0tLSBDcmVhdGUgRG9jUmVjb3JkIChTYWxlcyBPcmRlcikgLS0tXG4gIGxldCBvcmRlclJlY29yZFxuICB0cnkge1xuICAgIC8vIEZPUkNFIFN0YXR1cyBQZW5kaW5nIGFuZCBEb2NTdGF0dXMgMSBhcyByZXF1ZXN0ZWRcbiAgICBjb25zdCBpbml0aWFsU3RhdHVzID0gXCJQZW5kaW5nXCJcbiAgICBjb25zdCBpbml0aWFsRG9jU3RhdHVzID0gMVxuXG4gICAgb3JkZXJSZWNvcmQgPSBhd2FpdCBwcmlzbWEuZG9jUmVjb3JkLmNyZWF0ZSh7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIGRvY1R5cGVJZDogZG9jVHlwZS5pZCxcbiAgICAgICAgYnJhbmNoSWQ6IGJyYW5jaElkIHx8IG51bGwsXG4gICAgICAgIGNvZGUsXG4gICAgICAgIHN0YXR1czogaW5pdGlhbFN0YXR1cyxcbiAgICAgICAgZG9jU3RhdHVzOiBpbml0aWFsRG9jU3RhdHVzLFxuICAgICAgICBkYXRhOiBwYXlsb2FkIGFzIFByaXNtYS5JbnB1dEpzb25WYWx1ZSxcbiAgICAgICAgY3JlYXRlZEJ5SWQ6IHVzZXIuaWQsXG4gICAgICAgIHVwZGF0ZWRCeUlkOiB1c2VyLmlkLFxuICAgICAgICBhc3NpZ25lZFRvSWQ6IHVzZXIuaWQsXG4gICAgICB9XG4gICAgfSlcbiAgICBjb25zb2xlLmxvZyhcInN1Ym1pdERpcmVjdE9yZGVyOiBTYWxlcyBPcmRlciBjcmVhdGVkXCIsIG9yZGVyUmVjb3JkLmlkKVxuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5lcnJvcihcInN1Ym1pdERpcmVjdE9yZGVyOiBFcnJvciBjcmVhdGluZyBTYWxlcyBPcmRlciByZWNvcmRcIiwgZSlcbiAgICB0aHJvdyBuZXcgRXJyb3IoYHN1Ym1pdERpcmVjdE9yZGVyOiBFcnJvciBjcmVhdGluZyBTYWxlcyBPcmRlciByZWNvcmQ6ICR7ZX1gKVxuICB9XG5cbiAgLy8gLS0tIENyZWF0ZSBDaGlsZCBSb3dzIChTYWxlcyBPcmRlciBJdGVtKSAtLS1cbiAgY29uc3QgaXRlbURvY1R5cGUgPSBhd2FpdCBwcmlzbWEuZG9jVHlwZS5maW5kVW5pcXVlKHsgXG4gICAgd2hlcmU6IHsga2V5OiBcInNhbGVzX29yZGVyX2l0ZW1cIiB9LFxuICAgIGluY2x1ZGU6IHsgZmllbGRzOiB0cnVlIH1cbiAgfSlcblxuICBpZiAoaXRlbURvY1R5cGUpIHtcbiAgICBjb25zdCBpdGVtRGF0YTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gPSB7fVxuICAgIFxuICAgIGNvbnN0IHByaWNlSWQgPSBTdHJpbmcoZm9ybURhdGEuZ2V0KFwicHJpY2VJZFwiKSB8fCBcIlwiKVxuICAgIGNvbnN0IHNlbGVjdGVkUHJpY2UgPSBwcm9kdWN0LnByaWNlcy5maW5kKHAgPT4gcC5pZCA9PT0gcHJpY2VJZClcbiAgICBcbiAgICBmb3IgKGNvbnN0IGYgb2YgaXRlbURvY1R5cGUuZmllbGRzKSB7XG4gICAgICAgIGlmIChmLmtleSA9PT0gXCJwcm9kdWN0X2lkXCIgfHwgZi5rZXkgPT09IFwicHJvZHVjdFwiKSB7XG4gICAgICAgICAgICBpdGVtRGF0YVtmLmtleV0gPSBwcm9kdWN0LmlkXG4gICAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9IFxuICAgICAgICBpZiAoZi5rZXkgPT09IFwic2VydmljZV9uYW1lXCIpIHtcbiAgICAgICAgICAgIGl0ZW1EYXRhW2Yua2V5XSA9IHByb2R1Y3QubmFtZVxuICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgICBpZiAoZi5rZXkgPT09IFwicXR5XCIpIHtcbiAgICAgICAgICAgIGl0ZW1EYXRhW2Yua2V5XSA9IDFcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGYua2V5ID09PSBcInByb2R1Y3RfY2F0ZWdvcnlcIikge1xuICAgICAgICAgICAgaXRlbURhdGFbZi5rZXldID0gcHJvZHVjdC5ncm91cD8ucGFyZW50Py5pZFxuICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgICBpZiAoZi5rZXkgPT09IFwicHJvZHVjdF9zdWJfY2F0ZWdvcnlcIikge1xuICAgICAgICAgICAgaXRlbURhdGFbZi5rZXldID0gcHJvZHVjdC5ncm91cD8uaWRcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChzZWxlY3RlZFByaWNlKSB7XG4gICAgICAgICAgICBpZiAoZi5rZXkgPT09IFwibXJjXCIgfHwgZi5rZXkgPT09IFwicHJpY2VcIiB8fCBmLmtleSA9PT0gXCJ1bml0X3ByaWNlXCIpIHtcbiAgICAgICAgICAgICAgICBpdGVtRGF0YVtmLmtleV0gPSBOdW1iZXIoc2VsZWN0ZWRQcmljZS5iYXNlUHJpY2UpXG4gICAgICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmLmtleSA9PT0gXCJucmNcIikge1xuICAgICAgICAgICAgICAgIGl0ZW1EYXRhW2Yua2V5XSA9IE51bWJlcihzZWxlY3RlZFByaWNlLnNldHVwRmVlKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZi5yZWFkT25seSkgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gQ2FsY3VsYXRlIFN1YnRvdGFsc1xuICAgIGNvbnN0IHF0eSA9IHR5cGVvZiBpdGVtRGF0YS5xdHkgPT09ICdudW1iZXInID8gaXRlbURhdGEucXR5IDogMVxuICAgIGNvbnN0IG5yYyA9IHR5cGVvZiBpdGVtRGF0YS5ucmMgPT09ICdudW1iZXInID8gaXRlbURhdGEubnJjIDogMFxuICAgIGNvbnN0IG1yYyA9IHR5cGVvZiBpdGVtRGF0YS5tcmMgPT09ICdudW1iZXInID8gaXRlbURhdGEubXJjIDogXG4gICAgICAgICAgICAgICAodHlwZW9mIGl0ZW1EYXRhLnByaWNlID09PSAnbnVtYmVyJyA/IGl0ZW1EYXRhLnByaWNlIDogXG4gICAgICAgICAgICAgICAodHlwZW9mIGl0ZW1EYXRhLnVuaXRfcHJpY2UgPT09ICdudW1iZXInID8gaXRlbURhdGEudW5pdF9wcmljZSA6IDApKVxuXG4gICAgaXRlbURhdGEuc3VidG90YWxfbnJjID0gcXR5ICogbnJjXG4gICAgaXRlbURhdGEuc3VidG90YWxfbXJjID0gcXR5ICogbXJjXG5cbiAgICBmb3IgKGNvbnN0IHMgb2YgcHJvZHVjdC5zcGVjcykge1xuICAgICAgICBjb25zdCBzcGVjS2V5ID0gYHNwZWNfJHtzLmtleX1gXG4gICAgICAgIGNvbnN0IHZhbCA9IGZvcm1EYXRhLmdldChzcGVjS2V5KVxuICAgICAgICBcbiAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgaWYgKHMudHlwZSA9PT0gKFwiTlVNQkVSXCIgYXMgRmllbGRUeXBlKSkge1xuICAgICAgICAgICAgICAgICBpdGVtRGF0YVtzcGVjS2V5XSA9IE51bWJlcih2YWwpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHMudHlwZSA9PT0gKFwiQ0hFQ0tCT1hcIiBhcyBGaWVsZFR5cGUpKSB7XG4gICAgICAgICAgICAgICAgIGNvbnN0IGNmZyA9IChzLmNvbmZpZyA/PyB7fSkgYXMgdW5rbm93biBhcyB7IG9wdGlvbnM/OiBBcnJheTx7IGxhYmVsOiBzdHJpbmc7IHZhbHVlOiBzdHJpbmc7IHF0eT86IG51bWJlciB9PiB9XG4gICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNmZy5vcHRpb25zKSAmJiBjZmcub3B0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZDogc3RyaW5nW10gPSBbXVxuICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBvIG9mIGNmZy5vcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjayA9IGAke3NwZWNLZXl9X18ke28udmFsdWV9YFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFN0cmluZyhmb3JtRGF0YS5nZXQoY2spIHx8IFwiXCIpID09PSBcIm9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZC5wdXNoKFN0cmluZyhvLnZhbHVlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZC5sZW5ndGggPiAwKSBpdGVtRGF0YVtzcGVjS2V5XSA9IHNlbGVjdGVkXG4gICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICBpdGVtRGF0YVtzcGVjS2V5XSA9IHZhbCA9PT0gXCJvblwiIHx8IHZhbCA9PT0gXCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgaXRlbURhdGFbc3BlY0tleV0gPSBTdHJpbmcodmFsKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGZvciAoY29uc3QgZiBvZiBpdGVtRG9jVHlwZS5maWVsZHMpIHtcbiAgICAgICAgaWYgKCFmLnJlYWRPbmx5KSBjb250aW51ZVxuICAgICAgICBjb25zdCBjZmcgPSAoZi5jb25maWcgPz8ge30pIGFzIHVua25vd24gYXMgeyBjb21wdXRlPzogeyBmb3JtdWxhPzogc3RyaW5nIH0gfVxuICAgICAgICBjb25zdCBmb3JtdWxhID0gY2ZnLmNvbXB1dGU/LmZvcm11bGFcbiAgICAgICAgY29uc3QgdmFsID0gZXZhbEZvcm11bGEoZm9ybXVsYSwgaXRlbURhdGEpXG4gICAgICAgIGlmICh2YWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgaXRlbURhdGFbZi5rZXldID0gdmFsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgLy8gRk9SQ0UgU3RhdHVzIFBlbmRpbmcgYW5kIERvY1N0YXR1cyAxIGZvciBpdGVtIGFzIHdlbGxcbiAgICAgIGNvbnN0IGl0ZW1TdGF0dXMgPSBcIlBlbmRpbmdcIlxuICAgICAgY29uc3QgaXRlbURvY1N0YXR1cyA9IDFcblxuICAgICAgY29uc3QgaXRlbVJlY29yZCA9IGF3YWl0IHByaXNtYS5kb2NSZWNvcmQuY3JlYXRlKHtcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGRvY1R5cGVJZDogaXRlbURvY1R5cGUuaWQsXG4gICAgICAgICAgYnJhbmNoSWQ6IGJyYW5jaElkIHx8IG51bGwsXG4gICAgICAgICAgc3RhdHVzOiBpdGVtU3RhdHVzLFxuICAgICAgICAgIGRvY1N0YXR1czogaXRlbURvY1N0YXR1cyxcbiAgICAgICAgICBwYXJlbnRJZDogb3JkZXJSZWNvcmQuaWQsXG4gICAgICAgICAgZGF0YTogeyAuLi5pdGVtRGF0YSwgX3BhcmVudElkOiBvcmRlclJlY29yZC5pZCwgX3BhcmVudERvY1R5cGU6IGRvY1R5cGVLZXkgfSBhcyBQcmlzbWEuSW5wdXRKc29uVmFsdWUsXG4gICAgICAgICAgY3JlYXRlZEJ5SWQ6IHVzZXIuaWQsXG4gICAgICAgICAgdXBkYXRlZEJ5SWQ6IHVzZXIuaWQsXG4gICAgICAgICAgYXNzaWduZWRUb0lkOiB1c2VyLmlkLFxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgY29uc29sZS5sb2coXCJzdWJtaXREaXJlY3RPcmRlcjogU2FsZXMgT3JkZXIgSXRlbSByZWNvcmQgY3JlYXRlZFwiLCBpdGVtUmVjb3JkLmlkKVxuXG4gICAgICBhd2FpdCBwcmlzbWEuZG9jUm93LmNyZWF0ZSh7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICByZWNvcmRJZDogb3JkZXJSZWNvcmQuaWQsXG4gICAgICAgICAgY2hpbGREb2NUeXBlSWQ6IGl0ZW1Eb2NUeXBlLmlkLFxuICAgICAgICAgIGlkeDogMCxcbiAgICAgICAgICBkYXRhOiB7IC4uLml0ZW1EYXRhLCBfX2NoaWxkUmVjb3JkSWQ6IGl0ZW1SZWNvcmQuaWQgfSBhcyBQcmlzbWEuSW5wdXRKc29uVmFsdWVcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgLy8gVXBkYXRlIEhlYWRlciB3aXRoIFRvdGFsIENvbnRyYWN0XG4gICAgICBjb25zdCB0b3RhbE5yYyA9IE51bWJlcihpdGVtRGF0YS5zdWJ0b3RhbF9ucmMgfHwgMClcbiAgICAgIGNvbnN0IHRvdGFsTXJjID0gTnVtYmVyKGl0ZW1EYXRhLnN1YnRvdGFsX21yYyB8fCAwKVxuICAgICAgY29uc3QgdGVybU9mQ29udHJhY3QgPSBOdW1iZXIocGF5bG9hZC50ZXJtX29mX2NvbnRyYWN0IHx8IDApXG4gICAgICBjb25zdCB0b3RhbENvbnRyYWN0ID0gdG90YWxOcmMgKyAodGVybU9mQ29udHJhY3QgKiB0b3RhbE1yYylcblxuICAgICAgYXdhaXQgcHJpc21hLmRvY1JlY29yZC51cGRhdGUoe1xuICAgICAgICB3aGVyZTogeyBpZDogb3JkZXJSZWNvcmQuaWQgfSxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIC4uLihvcmRlclJlY29yZC5kYXRhIGFzIFByaXNtYS5Kc29uT2JqZWN0KSxcbiAgICAgICAgICAgICAgICB0b3RhbF9jb250cmFjdDogdG90YWxDb250cmFjdFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihcInN1Ym1pdERpcmVjdE9yZGVyOiBFcnJvciBjcmVhdGluZyBTYWxlcyBPcmRlciBJdGVtXCIsIGUpXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUud2FybihcInN1Ym1pdERpcmVjdE9yZGVyOiAnc2FsZXNfb3JkZXJfaXRlbScgRG9jVHlwZSBub3QgZm91bmRcIilcbiAgfVxuXG4gIHJldmFsaWRhdGVQYXRoKFwiL2N1c3RvbWVyL2RvY3Mvc2FsZXNfb3JkZXJcIilcbiAgcmVkaXJlY3QoXCIvY3VzdG9tZXIvZG9jcy9zYWxlc19vcmRlclwiKVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3VibWl0TXVsdGlEaXJlY3RPcmRlcihmb3JtRGF0YTogRm9ybURhdGEpIHtcbiAgY29uc29sZS5sb2coXCItLT4gc3VibWl0TXVsdGlEaXJlY3RPcmRlciBjYWxsZWRcIilcbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlcnZlclNlc3Npb24oYXV0aE9wdGlvbnMpXG4gIGlmICghc2Vzc2lvbj8udXNlcj8uZW1haWwpIHRocm93IG5ldyBFcnJvcihcInN1Ym1pdE11bHRpRGlyZWN0T3JkZXI6IE5vIHNlc3Npb25cIilcblxuICBjb25zdCB1c2VyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7XG4gICAgd2hlcmU6IHsgZW1haWw6IHNlc3Npb24udXNlci5lbWFpbCB9LFxuICAgIGluY2x1ZGU6IHsgcm9sZTogdHJ1ZSwgYXNzaWduZWRCcmFuY2hlczogeyBpbmNsdWRlOiB7IGJyYW5jaDogdHJ1ZSB9IH0sIGNvbXBhbnk6IHRydWUgfVxuICB9KVxuICBpZiAoIXVzZXIpIHRocm93IG5ldyBFcnJvcihcInN1Ym1pdE11bHRpRGlyZWN0T3JkZXI6IFVzZXIgbm90IGZvdW5kXCIpXG5cbiAgLy8gUGFyc2UgSXRlbXMgZnJvbSBGb3JtRGF0YVxuICBjb25zdCByYXdJdGVtcyA9IG5ldyBNYXA8c3RyaW5nLCBSZWNvcmQ8c3RyaW5nLCBhbnk+PigpXG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIEFycmF5LmZyb20oZm9ybURhdGEuZW50cmllcygpKSkge1xuICAgIGNvbnN0IG1hdGNoID0ga2V5Lm1hdGNoKC9eaXRlbXNcXFsoW15cXF1dKylcXF1cXC4oLispJC8pXG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICBjb25zdCBpZHggPSBtYXRjaFsxXVxuICAgICAgY29uc3QgayA9IG1hdGNoWzJdXG4gICAgICBpZiAoIXJhd0l0ZW1zLmhhcyhpZHgpKSByYXdJdGVtcy5zZXQoaWR4LCB7fSlcbiAgICAgIGNvbnN0IGl0ZW0gPSByYXdJdGVtcy5nZXQoaWR4KSFcbiAgICAgIFxuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpdGVtLCBrKSkge1xuICAgICAgICAgY29uc3QgZXggPSBpdGVtW2tdXG4gICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShleCkpIGV4LnB1c2godmFsdWUpXG4gICAgICAgICBlbHNlIGl0ZW1ba10gPSBbZXgsIHZhbHVlXVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgIGl0ZW1ba10gPSB2YWx1ZVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBjb25zdCBpdGVtcyA9IEFycmF5LmZyb20ocmF3SXRlbXMudmFsdWVzKCkpXG4gIGlmIChpdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgIGNvbnNvbGUud2FybihcInN1Ym1pdE11bHRpRGlyZWN0T3JkZXI6IE5vIGl0ZW1zIGZvdW5kIGluIHBheWxvYWRcIilcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIGl0ZW1zIHNlbGVjdGVkXCIpXG4gIH1cbiAgY29uc29sZS5sb2coYHN1Ym1pdE11bHRpRGlyZWN0T3JkZXI6IEZvdW5kICR7aXRlbXMubGVuZ3RofSBpdGVtc2ApXG5cbiAgLy8gLS0tIEhlYWRlciBTZXR1cCAtLS1cbiAgY29uc3QgZG9jVHlwZUtleSA9IFwic2FsZXNfb3JkZXJcIlxuICBjb25zdCBkb2NUeXBlID0gYXdhaXQgcHJpc21hLmRvY1R5cGUuZmluZFVuaXF1ZSh7XG4gICAgd2hlcmU6IHsga2V5OiBkb2NUeXBlS2V5IH0sXG4gICAgaW5jbHVkZTogeyBmaWVsZHM6IHRydWUsIGJyYW5jaDogdHJ1ZSB9XG4gIH0pXG4gIGlmICghZG9jVHlwZSkgdGhyb3cgbmV3IEVycm9yKFwiU2FsZXMgT3JkZXIgRG9jVHlwZSBub3QgZm91bmRcIilcblxuICBjb25zdCBjb29raWVTdG9yZSA9IGF3YWl0IGNvb2tpZXMoKVxuICBsZXQgYnJhbmNoSWQ6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQgPSBjb29raWVTdG9yZS5nZXQoXCJicmFuY2hJZFwiKT8udmFsdWVcbiAgaWYgKCFicmFuY2hJZCkgYnJhbmNoSWQgPSBkb2NUeXBlLmJyYW5jaElkXG4gIGlmICghYnJhbmNoSWQgJiYgdXNlci5hc3NpZ25lZEJyYW5jaGVzLmxlbmd0aCA+IDApIGJyYW5jaElkID0gdXNlci5hc3NpZ25lZEJyYW5jaGVzWzBdLmJyYW5jaC5pZFxuXG4gIGNvbnN0IHBheWxvYWQ6IFJlY29yZDxzdHJpbmcsIHVua25vd24+ID0ge1xuICAgICAgY3VzdG9tZXI6IHVzZXIuY29tcGFueUlkLFxuICAgICAgY3VzdG9tZXJfaWQ6IHVzZXIuY29tcGFueUlkLFxuICAgICAgdHJhbnNhY3Rpb25fZGF0ZTogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KFwiVFwiKVswXSxcbiAgICAgIG9yZGVyX2RhdGU6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zcGxpdChcIlRcIilbMF0sXG4gICAgICBzdGF0dXM6IFwiUGVuZGluZ1wiLFxuICAgICAgdGVybV9vZl9wYXltZW50OiBmb3JtRGF0YS5nZXQoXCJ0ZXJtX29mX3BheW1lbnRcIikgPyBTdHJpbmcoZm9ybURhdGEuZ2V0KFwidGVybV9vZl9wYXltZW50XCIpKSA6IFwiT25lIFRpbWVcIixcbiAgICAgIHRlcm1fb2ZfY29udHJhY3Q6IGZvcm1EYXRhLmdldChcInRlcm1fb2ZfY29udHJhY3RcIikgPyBOdW1iZXIoZm9ybURhdGEuZ2V0KFwidGVybV9vZl9jb250cmFjdFwiKSkgOiAwLFxuICAgICAgY29tbWVuY2VtZW50X2RhdGU6IGZvcm1EYXRhLmdldChcImNvbW1lbmNlbWVudF9kYXRlXCIpID8gU3RyaW5nKGZvcm1EYXRhLmdldChcImNvbW1lbmNlbWVudF9kYXRlXCIpKSA6IG51bGwsXG4gIH1cblxuICAvLyAtLS0gTmFtaW5nIFNlcmllcyAtLS1cbiAgY29uc3QgbmFtaW5nQ2ZnID0gKGRvY1R5cGUuY29uZmlnID8/IHt9KSBhcyB1bmtub3duIGFzIHsgbmFtaW5nPzogeyBtb2RlPzogc3RyaW5nOyBkZWZhdWx0UGF0dGVybj86IHN0cmluZyB9IH1cbiAgY29uc3QgZGVmYXVsdFBhdHRlcm4gPSBuYW1pbmdDZmcubmFtaW5nPy5kZWZhdWx0UGF0dGVybiA/PyBcIlNPLSMjIyMjXCJcbiAgbGV0IGNvZGU6IHN0cmluZyB8IHVuZGVmaW5lZFxuXG4gIGNvbnN0IGdlbmVyYXRlU2VyaWVzQ29kZSA9IGFzeW5jIChwYXR0ZXJuOiBzdHJpbmcsIGJJZDogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCwgZElkOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBtID0gL14oLio/KSgjKykoLiopJC8uZXhlYyhwYXR0ZXJuKVxuICAgIGNvbnN0IHByZWZpeCA9IG0gPyBtWzFdIDogcGF0dGVyblxuICAgIGNvbnN0IGhhc2hlcyA9IG0gPyBtWzJdIDogXCIjIyMjI1wiXG4gICAgY29uc3Qgc3VmZml4ID0gbSA/IG1bM10gOiBcIlwiXG4gICAgY29uc3QgZGlnaXRzID0gaGFzaGVzLmxlbmd0aFxuICAgIFxuICAgIGNvbnN0IGV4aXN0aW5nID0gYXdhaXQgcHJpc21hLmRvY05hbWluZ0NvdW50ZXIuZmluZEZpcnN0KHtcbiAgICAgIHdoZXJlOiB7IGRvY1R5cGVJZDogZElkLCBicmFuY2hJZDogYklkID8/IG51bGwsIHNlcmllczogcGF0dGVybiB9XG4gICAgfSlcbiAgICBcbiAgICBsZXQgY291bnRlclxuICAgIGlmIChleGlzdGluZykge1xuICAgICAgY291bnRlciA9IGF3YWl0IHByaXNtYS5kb2NOYW1pbmdDb3VudGVyLnVwZGF0ZSh7XG4gICAgICAgIHdoZXJlOiB7IGlkOiBleGlzdGluZy5pZCB9LFxuICAgICAgICBkYXRhOiB7IHNlcTogeyBpbmNyZW1lbnQ6IDEgfSB9XG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBjb3VudGVyID0gYXdhaXQgcHJpc21hLmRvY05hbWluZ0NvdW50ZXIuY3JlYXRlKHtcbiAgICAgICAgZGF0YTogeyBkb2NUeXBlSWQ6IGRJZCwgYnJhbmNoSWQ6IGJJZCA/PyBudWxsLCBzZXJpZXM6IHBhdHRlcm4sIHNlcTogMSB9XG4gICAgICB9KVxuICAgIH1cbiAgICBjb25zdCBwYWQgPSBTdHJpbmcoY291bnRlci5zZXEpLnBhZFN0YXJ0KGRpZ2l0cywgXCIwXCIpXG4gICAgcmV0dXJuIGAke3ByZWZpeH0ke3BhZH0ke3N1ZmZpeH1gXG4gIH1cblxuICBsZXQgcmV0cmllcyA9IDBcbiAgd2hpbGUgKHJldHJpZXMgPCA1KSB7XG4gICAgIGNvZGUgPSBhd2FpdCBnZW5lcmF0ZVNlcmllc0NvZGUoZGVmYXVsdFBhdHRlcm4sIGJyYW5jaElkLCBkb2NUeXBlLmlkKVxuICAgICBjb25zdCBleGlzdHMgPSBhd2FpdCBwcmlzbWEuZG9jUmVjb3JkLmZpbmRVbmlxdWUoeyB3aGVyZTogeyBjb2RlIH0gfSlcbiAgICAgaWYgKCFleGlzdHMpIGJyZWFrXG4gICAgIHJldHJpZXMrK1xuICB9XG4gIGlmICghY29kZSkgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGdlbmVyYXRlIGNvZGVcIilcblxuICAvLyAtLS0gQ3JlYXRlIEhlYWRlciBSZWNvcmQgLS0tXG4gIC8vIEZvcmNlIFBlbmRpbmcvMSBhcyBwZXIgcmVxdWlyZW1lbnRcbiAgY29uc3QgZmluYWxTdGF0dXMgPSBcIlBlbmRpbmdcIlxuICBjb25zdCBmaW5hbERvY1N0YXR1cyA9IDFcblxuICBjb25zdCBvcmRlclJlY29yZCA9IGF3YWl0IHByaXNtYS5kb2NSZWNvcmQuY3JlYXRlKHtcbiAgICBkYXRhOiB7XG4gICAgICBkb2NUeXBlSWQ6IGRvY1R5cGUuaWQsXG4gICAgICBicmFuY2hJZDogYnJhbmNoSWQgfHwgbnVsbCxcbiAgICAgIGNvZGUsXG4gICAgICBzdGF0dXM6IGZpbmFsU3RhdHVzLFxuICAgICAgZG9jU3RhdHVzOiBmaW5hbERvY1N0YXR1cyxcbiAgICAgIGRhdGE6IHBheWxvYWQgYXMgUHJpc21hLklucHV0SnNvblZhbHVlLFxuICAgICAgY3JlYXRlZEJ5SWQ6IHVzZXIuaWQsXG4gICAgICB1cGRhdGVkQnlJZDogdXNlci5pZCxcbiAgICAgIGFzc2lnbmVkVG9JZDogdXNlci5pZCxcbiAgICB9XG4gIH0pXG5cbiAgLy8gVHJhY2sgdG90YWxzIGZvciBoZWFkZXIgdXBkYXRlXG4gIGxldCB0b3RhbE5yYyA9IDBcbiAgbGV0IHRvdGFsTXJjID0gMFxuXG4gIC8vIC0tLSBQcm9jZXNzIEl0ZW1zIC0tLVxuICBjb25zdCBpdGVtRG9jVHlwZSA9IGF3YWl0IHByaXNtYS5kb2NUeXBlLmZpbmRVbmlxdWUoeyBcbiAgICB3aGVyZTogeyBrZXk6IFwic2FsZXNfb3JkZXJfaXRlbVwiIH0sXG4gICAgaW5jbHVkZTogeyBmaWVsZHM6IHRydWUgfVxuICB9KVxuXG4gIGlmIChpdGVtRG9jVHlwZSkge1xuICAgIGxldCBpdGVtSWR4ID0gMFxuICAgIGZvciAoY29uc3QgaXRlbUlucHV0IG9mIGl0ZW1zKSB7XG4gICAgICAgIGNvbnN0IHByb2R1Y3RJZCA9IFN0cmluZyhpdGVtSW5wdXQucHJvZHVjdElkIHx8IFwiXCIpXG4gICAgICAgIGlmICghcHJvZHVjdElkKSBjb250aW51ZVxuXG4gICAgICAgIGNvbnN0IHByb2R1Y3QgPSBhd2FpdCBwcmlzbWEucHJvZHVjdC5maW5kVW5pcXVlKHtcbiAgICAgICAgICAgIHdoZXJlOiB7IGlkOiBwcm9kdWN0SWQgfSxcbiAgICAgICAgICAgIGluY2x1ZGU6IHsgcHJpY2VzOiB0cnVlLCBzcGVjczogdHJ1ZSwgZ3JvdXA6IHsgaW5jbHVkZTogeyBwYXJlbnQ6IHRydWUgfSB9IH1cbiAgICAgICAgfSlcbiAgICAgICAgaWYgKCFwcm9kdWN0KSBjb250aW51ZVxuXG4gICAgICAgIGNvbnN0IGl0ZW1EYXRhOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA9IHtcbiAgICAgICAgICAgIHRlcm1fb2ZfY29udHJhY3Q6IDAsXG4gICAgICAgICAgICB0ZXJtX29mX3BheW1lbnQ6IFwiT25lIFRpbWVcIixcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwcmljZUlkID0gU3RyaW5nKGl0ZW1JbnB1dC5wcmljZUlkIHx8IFwiXCIpXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkUHJpY2UgPSBwcm9kdWN0LnByaWNlcy5maW5kKHAgPT4gcC5pZCA9PT0gcHJpY2VJZClcblxuICAgICAgICAvLyBNYXAgRmllbGRzXG4gICAgICAgIGZvciAoY29uc3QgZiBvZiBpdGVtRG9jVHlwZS5maWVsZHMpIHtcbiAgICAgICAgICAgIGlmIChmLmtleSA9PT0gXCJwcm9kdWN0X2lkXCIpIHsgaXRlbURhdGFbZi5rZXldID0gcHJvZHVjdC5pZDsgY29udGludWUgfVxuICAgICAgICAgICAgaWYgKGYua2V5ID09PSBcInNlcnZpY2VfbmFtZVwiKSB7IGl0ZW1EYXRhW2Yua2V5XSA9IHByb2R1Y3QubmFtZTsgY29udGludWUgfVxuICAgICAgICAgICAgaWYgKGYua2V5ID09PSBcInF0eVwiKSB7IFxuICAgICAgICAgICAgICAgIGNvbnN0IHEgPSBOdW1iZXIoaXRlbUlucHV0LnF0eSlcbiAgICAgICAgICAgICAgICBpdGVtRGF0YVtmLmtleV0gPSAhaXNOYU4ocSkgJiYgcSA+IDAgPyBxIDogMVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoZi5rZXkgPT09IFwicHJvZHVjdF9jYXRlZ29yeVwiKSB7IGl0ZW1EYXRhW2Yua2V5XSA9IHByb2R1Y3QuZ3JvdXA/LnBhcmVudD8uaWQ7IGNvbnRpbnVlIH1cbiAgICAgICAgICAgIGlmIChmLmtleSA9PT0gXCJwcm9kdWN0X3N1Yl9jYXRlZ29yeVwiKSB7IGl0ZW1EYXRhW2Yua2V5XSA9IHByb2R1Y3QuZ3JvdXA/LmlkOyBjb250aW51ZSB9XG5cbiAgICAgICAgICAgIGlmIChzZWxlY3RlZFByaWNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGYua2V5ID09PSBcIm1yY1wiIHx8IGYua2V5ID09PSBcInByaWNlXCIgfHwgZi5rZXkgPT09IFwidW5pdF9wcmljZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1EYXRhW2Yua2V5XSA9IE51bWJlcihzZWxlY3RlZFByaWNlLmJhc2VQcmljZSlcbiAgICAgICAgICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGYua2V5ID09PSBcIm5yY1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1EYXRhW2Yua2V5XSA9IE51bWJlcihzZWxlY3RlZFByaWNlLnNldHVwRmVlKVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmLnJlYWRPbmx5KSBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlIFN1YnRvdGFsc1xuICAgICAgICBjb25zdCBxdHkgPSB0eXBlb2YgaXRlbURhdGEucXR5ID09PSAnbnVtYmVyJyA/IGl0ZW1EYXRhLnF0eSA6IDFcbiAgICAgICAgY29uc3QgbnJjID0gdHlwZW9mIGl0ZW1EYXRhLm5yYyA9PT0gJ251bWJlcicgPyBpdGVtRGF0YS5ucmMgOiAwXG4gICAgICAgIGNvbnN0IG1yYyA9IHR5cGVvZiBpdGVtRGF0YS5tcmMgPT09ICdudW1iZXInID8gaXRlbURhdGEubXJjIDogXG4gICAgICAgICAgICAgICAgICAgKHR5cGVvZiBpdGVtRGF0YS5wcmljZSA9PT0gJ251bWJlcicgPyBpdGVtRGF0YS5wcmljZSA6IFxuICAgICAgICAgICAgICAgICAgICh0eXBlb2YgaXRlbURhdGEudW5pdF9wcmljZSA9PT0gJ251bWJlcicgPyBpdGVtRGF0YS51bml0X3ByaWNlIDogMCkpXG5cbiAgICAgICAgaXRlbURhdGEuc3VidG90YWxfbnJjID0gcXR5ICogbnJjXG4gICAgICAgIGl0ZW1EYXRhLnN1YnRvdGFsX21yYyA9IHF0eSAqIG1yY1xuICAgICAgICBcbiAgICAgICAgdG90YWxOcmMgKz0gKHF0eSAqIG5yYylcbiAgICAgICAgdG90YWxNcmMgKz0gKHF0eSAqIG1yYylcblxuICAgICAgICAvLyBNYXAgU3BlY3NcbiAgICAgICAgZm9yIChjb25zdCBzIG9mIHByb2R1Y3Quc3BlY3MpIHtcbiAgICAgICAgICAgIGNvbnN0IHNwZWNLZXkgPSBgc3BlY18ke3Mua2V5fWBcbiAgICAgICAgICAgIGNvbnN0IHZhbCA9IGl0ZW1JbnB1dFtzcGVjS2V5XVxuICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgICBpZiAocy50eXBlID09PSBcIk5VTUJFUlwiKSB7XG4gICAgICAgICAgICAgICAgICAgICBpdGVtRGF0YVtzcGVjS2V5XSA9IE51bWJlcih2YWwpXG4gICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocy50eXBlID09PSBcIkNIRUNLQk9YXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlnbm9yZSBvciBoYW5kbGUgaWYgbmVlZGVkXG4gICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1EYXRhW3NwZWNLZXldID0gdmFsID09PSBcIm9uXCIgfHwgdmFsID09PSBcInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgaXRlbURhdGFbc3BlY0tleV0gPSBTdHJpbmcodmFsKVxuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChzLnR5cGUgPT09IFwiQ0hFQ0tCT1hcIikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNmZyA9IChzLmNvbmZpZyA/PyB7fSkgYXMgdW5rbm93biBhcyB7IG9wdGlvbnM/OiBBcnJheTx7IHZhbHVlOiBzdHJpbmcgfT4gfVxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNmZy5vcHRpb25zKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZDogc3RyaW5nW10gPSBbXVxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG8gb2YgY2ZnLm9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNrID0gYCR7c3BlY0tleX1fXyR7by52YWx1ZX1gXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbUlucHV0W2NrXSA9PT0gXCJvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWQucHVzaChTdHJpbmcoby52YWx1ZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkLmxlbmd0aCA+IDApIGl0ZW1EYXRhW3NwZWNLZXldID0gc2VsZWN0ZWRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGb3JtdWxhXG4gICAgICAgIGZvciAoY29uc3QgZiBvZiBpdGVtRG9jVHlwZS5maWVsZHMpIHtcbiAgICAgICAgICAgIGlmICghZi5yZWFkT25seSkgY29udGludWVcbiAgICAgICAgICAgIGNvbnN0IGNmZyA9IChmLmNvbmZpZyA/PyB7fSkgYXMgdW5rbm93biBhcyB7IGNvbXB1dGU/OiB7IGZvcm11bGE/OiBzdHJpbmcgfSB9XG4gICAgICAgICAgICBjb25zdCBmb3JtdWxhID0gY2ZnLmNvbXB1dGU/LmZvcm11bGFcbiAgICAgICAgICAgIGNvbnN0IHZhbCA9IGV2YWxGb3JtdWxhKGZvcm11bGEsIGl0ZW1EYXRhKVxuICAgICAgICAgICAgaWYgKHZhbCAhPSBudWxsKSBpdGVtRGF0YVtmLmtleV0gPSB2YWxcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENyZWF0ZSBJdGVtXG4gICAgICAgIGNvbnN0IGlTdGF0dXMgPSBcIlBlbmRpbmdcIlxuICAgICAgICBjb25zdCBpRG9jU3RhdHVzID0gMVxuXG4gICAgICAgIGNvbnN0IGl0ZW1SZWNvcmQgPSBhd2FpdCBwcmlzbWEuZG9jUmVjb3JkLmNyZWF0ZSh7XG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgZG9jVHlwZUlkOiBpdGVtRG9jVHlwZS5pZCxcbiAgICAgICAgICAgICAgICBicmFuY2hJZDogYnJhbmNoSWQgfHwgbnVsbCxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IGlTdGF0dXMsXG4gICAgICAgICAgICAgICAgZG9jU3RhdHVzOiBpRG9jU3RhdHVzLFxuICAgICAgICAgICAgICAgIHBhcmVudElkOiBvcmRlclJlY29yZC5pZCxcbiAgICAgICAgICAgICAgICBkYXRhOiB7IC4uLml0ZW1EYXRhLCBfcGFyZW50SWQ6IG9yZGVyUmVjb3JkLmlkLCBfcGFyZW50RG9jVHlwZTogZG9jVHlwZUtleSB9IGFzIFByaXNtYS5JbnB1dEpzb25WYWx1ZSxcbiAgICAgICAgICAgICAgICBjcmVhdGVkQnlJZDogdXNlci5pZCxcbiAgICAgICAgICAgICAgICB1cGRhdGVkQnlJZDogdXNlci5pZCxcbiAgICAgICAgICAgICAgICBhc3NpZ25lZFRvSWQ6IHVzZXIuaWQsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgYXdhaXQgcHJpc21hLmRvY1Jvdy5jcmVhdGUoe1xuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIHJlY29yZElkOiBvcmRlclJlY29yZC5pZCxcbiAgICAgICAgICAgICAgICBjaGlsZERvY1R5cGVJZDogaXRlbURvY1R5cGUuaWQsXG4gICAgICAgICAgICAgICAgaWR4OiBpdGVtSWR4LFxuICAgICAgICAgICAgICAgIGRhdGE6IHsgLi4uaXRlbURhdGEsIF9fY2hpbGRSZWNvcmRJZDogaXRlbVJlY29yZC5pZCB9IGFzIFByaXNtYS5JbnB1dEpzb25WYWx1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBpdGVtSWR4KytcbiAgICB9XG4gIH1cblxuICAvLyBVcGRhdGUgSGVhZGVyIHdpdGggVG90YWwgQ29udHJhY3RcbiAgY29uc3QgdGVybU9mQ29udHJhY3QgPSBOdW1iZXIocGF5bG9hZC50ZXJtX29mX2NvbnRyYWN0IHx8IDApXG4gIGNvbnN0IHRvdGFsQ29udHJhY3QgPSB0b3RhbE5yYyArICh0ZXJtT2ZDb250cmFjdCAqIHRvdGFsTXJjKVxuXG4gIGF3YWl0IHByaXNtYS5kb2NSZWNvcmQudXBkYXRlKHtcbiAgICB3aGVyZTogeyBpZDogb3JkZXJSZWNvcmQuaWQgfSxcbiAgICBkYXRhOiB7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIC4uLihvcmRlclJlY29yZC5kYXRhIGFzIFByaXNtYS5Kc29uT2JqZWN0KSxcbiAgICAgICAgICAgIHRvdGFsX2NvbnRyYWN0OiB0b3RhbENvbnRyYWN0XG4gICAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgcmV2YWxpZGF0ZVBhdGgoXCIvY3VzdG9tZXIvZG9jcy9zYWxlc19vcmRlclwiKVxuICByZWRpcmVjdChcIi9jdXN0b21lci9kb2NzL3NhbGVzX29yZGVyXCIpXG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IndTQTZGc0IsK0xBQUEifQ==
}),
"[project]/src/components/customer/direct-order-list.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DirectOrderList",
    ()=>DirectOrderList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-ssr] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-ssr] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/label.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/checkbox.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$group$2d$param$2d$sync$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/group-param-sync.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$customer$2d$product$2d$specs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/customer-product-specs.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$customer$2f$order$2f$data$3a$1f9a1b__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/customer/order/data:1f9a1b [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$customer$2f$order$2f$data$3a$21a754__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/app/customer/order/data:21a754 [app-ssr] (ecmascript) <text/javascript>");
"use client";
;
;
;
;
;
;
;
;
;
;
;
function DirectOrderList({ displayGroupName, immediateSubs, subs, specDynamicOptions, branchId }) {
    const [selectedIds, setSelectedIds] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](new Set());
    const [quantities, setQuantities] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]({});
    const [selectedPrices, setSelectedPrices] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"]({});
    const toggleSelection = (productId, checked)=>{
        const next = new Set(selectedIds);
        if (checked) next.add(productId);
        else next.delete(productId);
        setSelectedIds(next);
    };
    const handleQuantityChange = (productId, val)=>{
        const n = parseInt(val);
        if (!isNaN(n) && n > 0) {
            setQuantities((prev)=>({
                    ...prev,
                    [productId]: n
                }));
        }
    };
    const handlePriceChange = (productId, val)=>{
        setSelectedPrices((prev)=>({
                ...prev,
                [productId]: val
            }));
    };
    const showGlobalContractFields = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>{
        for (const sub of subs){
            for (const p of sub.items){
                if (selectedIds.has(p.id)) {
                    const priceId = selectedPrices[p.id] || p.prices[0]?.id;
                    const price = p.prices.find((pr)=>pr.id === priceId);
                    if (price && price.basePrice && price.basePrice > 0) return true;
                }
            }
        }
        return false;
    }, [
        selectedIds,
        selectedPrices,
        subs
    ]);
    const selectedCount = selectedIds.size;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6 pb-32",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$group$2d$param$2d$sync$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GroupParamSync"], {}, void 0, false, {
                fileName: "[project]/src/components/customer/direct-order-list.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-semibold text-slate-900 tracking-tight",
                                children: "Product Order"
                            }, void 0, false, {
                                fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                lineNumber: 83,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-500 mt-1",
                                children: "Browse and select services to request."
                            }, void 0, false, {
                                fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                lineNumber: 84,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/customer/direct-order-list.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/customer/order",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "outline",
                            size: "sm",
                            className: "gap-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                    lineNumber: 88,
                                    columnNumber: 13
                                }, this),
                                "Back to Categories"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/customer/direct-order-list.tsx",
                            lineNumber: 87,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/customer/direct-order-list.tsx",
                        lineNumber: 86,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/customer/direct-order-list.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm text-slate-500",
                        children: "Category:"
                    }, void 0, false, {
                        fileName: "[project]/src/components/customer/direct-order-list.tsx",
                        lineNumber: 95,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-semibold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-md",
                        children: displayGroupName
                    }, void 0, false, {
                        fileName: "[project]/src/components/customer/direct-order-list.tsx",
                        lineNumber: 96,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/customer/direct-order-list.tsx",
                lineNumber: 94,
                columnNumber: 7
            }, this),
            immediateSubs.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-sm font-medium text-slate-700",
                        children: "Select subcategory"
                    }, void 0, false, {
                        fileName: "[project]/src/components/customer/direct-order-list.tsx",
                        lineNumber: 101,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3",
                        children: immediateSubs.map((sg)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: `/customer/order/${sg.id}`,
                                className: "group flex items-center gap-3 border border-slate-200 rounded-xl p-4 hover:border-primary/40 hover:shadow-md hover:shadow-primary/5 transition-all duration-200 bg-white",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-50 group-hover:bg-primary/5 transition-colors",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "h-5 w-5 text-slate-400 group-hover:text-primary transition-colors",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 1.5,
                                                d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                lineNumber: 106,
                                                columnNumber: 156
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                            lineNumber: 106,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                        lineNumber: 105,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0 flex-1",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-sm font-semibold text-slate-900 group-hover:text-primary transition-colors truncate",
                                            children: sg.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                            lineNumber: 109,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                        lineNumber: 108,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                        className: "h-4 w-4 text-slate-300 group-hover:text-primary ml-auto shrink-0 transition-colors"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                        lineNumber: 111,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, sg.id, true, {
                                fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                lineNumber: 104,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/customer/direct-order-list.tsx",
                        lineNumber: 102,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/customer/direct-order-list.tsx",
                lineNumber: 100,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        id: "multi-order-form",
                        action: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$customer$2f$order$2f$data$3a$1f9a1b__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["submitMultiDirectOrder"]
                    }, void 0, false, {
                        fileName: "[project]/src/components/customer/direct-order-list.tsx",
                        lineNumber: 119,
                        columnNumber: 11
                    }, this),
                    subs.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-50 mb-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-6 h-6 text-slate-400",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 1.5,
                                        d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                        lineNumber: 124,
                                        columnNumber: 111
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                    lineNumber: 124,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                lineNumber: 123,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-500",
                                children: "Products for this category are not available."
                            }, void 0, false, {
                                fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                lineNumber: 126,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/customer/direct-order-list.tsx",
                        lineNumber: 122,
                        columnNumber: 13
                    }, this),
                    subs.map((sub)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-px flex-1 bg-slate-200"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                            lineNumber: 133,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-semibold text-slate-500 uppercase tracking-wider",
                                            children: sub.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                            lineNumber: 134,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-px flex-1 bg-slate-200"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                            lineNumber: 135,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                    lineNumber: 132,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 lg:grid-cols-2 gap-4",
                                    children: sub.items.map((p)=>{
                                        const isDirect = !p.orderMode || p.orderMode === "DIRECT";
                                        if (!isDirect) {
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "group border border-slate-200 rounded-2xl p-5 space-y-5 bg-white hover:shadow-lg hover:shadow-slate-200/50 hover:border-slate-300 transition-all duration-200",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-1.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-base font-semibold text-slate-900",
                                                                children: p.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                                lineNumber: 145,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-xs text-slate-500",
                                                                children: [
                                                                    p.group?.name ?? "-",
                                                                    " • ",
                                                                    p.classification
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                                lineNumber: 146,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                        lineNumber: 144,
                                                        columnNumber: 26
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                                        action: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$customer$2f$order$2f$data$3a$21a754__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["submitRequestOrder"],
                                                        className: "space-y-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "hidden",
                                                                name: "productId",
                                                                value: p.id
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                                lineNumber: 149,
                                                                columnNumber: 29
                                                            }, this),
                                                            p.prices.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "space-y-1.5",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                        className: "text-xs font-medium text-slate-600",
                                                                        children: "Price"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                                        lineNumber: 152,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                        name: "priceId",
                                                                        className: "border-slate-200 text-sm rounded-lg border bg-slate-50/50 px-3 py-2.5 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary w-full transition-all",
                                                                        children: p.prices.map((pr)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: pr.id,
                                                                                children: [
                                                                                    pr.currency,
                                                                                    " • ",
                                                                                    pr.pricingModel,
                                                                                    " • MRC ",
                                                                                    pr.basePrice,
                                                                                    " • NRC ",
                                                                                    pr.setupFee
                                                                                ]
                                                                            }, pr.id, true, {
                                                                                fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                                                lineNumber: 155,
                                                                                columnNumber: 37
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                                        lineNumber: 153,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                                lineNumber: 151,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "space-y-1.5",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                        className: "text-xs font-medium text-slate-600",
                                                                        children: "Specifications"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                                        lineNumber: 161,
                                                                        columnNumber: 33
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$customer$2d$product$2d$specs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CustomerProductSpecs"], {
                                                                        specs: p.specs,
                                                                        dynamicOptions: specDynamicOptions[p.id],
                                                                        branchId: branchId
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                                        lineNumber: 162,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                                lineNumber: 160,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                                    type: "submit",
                                                                    className: "w-full bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-colors",
                                                                    children: "Submit Request"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                                    lineNumber: 169,
                                                                    columnNumber: 33
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                                lineNumber: 168,
                                                                columnNumber: 29
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                        lineNumber: 148,
                                                        columnNumber: 26
                                                    }, this)
                                                ]
                                            }, p.id, true, {
                                                fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                lineNumber: 143,
                                                columnNumber: 23
                                            }, this);
                                        }
                                        const isSelected = selectedIds.has(p.id);
                                        const priceId = selectedPrices[p.id] || p.prices[0]?.id;
                                        const price = p.prices.find((pr)=>pr.id === priceId);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `group border rounded-2xl p-5 space-y-4 bg-white transition-all duration-200 ${isSelected ? "border-primary/40 shadow-lg shadow-primary/5 ring-1 ring-primary/10" : "border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300"}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start gap-3.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "pt-0.5",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Checkbox"], {
                                                                id: `select-${p.id}`,
                                                                checked: isSelected,
                                                                onCheckedChange: (c)=>toggleSelection(p.id, !!c),
                                                                className: `transition-colors ${isSelected ? "border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary" : "border-slate-300"}`
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                                lineNumber: 184,
                                                                columnNumber: 33
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                            lineNumber: 183,
                                                            columnNumber: 29
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-1 flex-1 min-w-0",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                    htmlFor: `select-${p.id}`,
                                                                    className: "text-base font-semibold text-slate-900 cursor-pointer leading-tight",
                                                                    children: p.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                                    lineNumber: 192,
                                                                    columnNumber: 33
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-xs text-slate-500",
                                                                    children: [
                                                                        p.group?.name ?? "-",
                                                                        " • ",
                                                                        p.classification
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                                    lineNumber: 193,
                                                                    columnNumber: 33
                                                                }, this),
                                                                price && (price.basePrice || price.setupFee) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-3 mt-2",
                                                                    children: [
                                                                        price.basePrice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md",
                                                                            children: [
                                                                                "MRC ",
                                                                                typeof price.basePrice === 'number' ? price.basePrice.toLocaleString('id-ID') : price.basePrice
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                                            lineNumber: 197,
                                                                            columnNumber: 39
                                                                        }, this),
                                                                        price.setupFee && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md",
                                                                            children: [
                                                                                "NRC ",
                                                                                typeof price.setupFee === 'number' ? price.setupFee.toLocaleString('id-ID') : price.setupFee
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                                            lineNumber: 200,
                                                                            columnNumber: 39
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                                    lineNumber: 195,
                                                                    columnNumber: 35
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                            lineNumber: 191,
                                                            columnNumber: 29
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                    lineNumber: 182,
                                                    columnNumber: 25
                                                }, this),
                                                isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "pl-[2.75rem] pr-1 space-y-4 border-l-2 border-primary/20 ml-0.5 animate-in fade-in slide-in-from-top-2 duration-200",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            form: "multi-order-form",
                                                            type: "hidden",
                                                            name: `items[${p.id}].productId`,
                                                            value: p.id
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                            lineNumber: 210,
                                                            columnNumber: 33
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-1.5",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                    className: "text-xs font-medium text-slate-600",
                                                                    children: "Quantity"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                                    lineNumber: 213,
                                                                    columnNumber: 37
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                    form: "multi-order-form",
                                                                    name: `items[${p.id}].qty`,
                                                                    type: "number",
                                                                    min: 1,
                                                                    value: quantities[p.id] ?? 1,
                                                                    onChange: (e)=>handleQuantityChange(p.id, e.target.value),
                                                                    className: "w-full border-slate-200 focus:border-primary focus:ring-primary/20"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                                    lineNumber: 214,
                                                                    columnNumber: 37
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                            lineNumber: 212,
                                                            columnNumber: 33
                                                        }, this),
                                                        p.prices.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-1.5",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                    className: "text-xs font-medium text-slate-600",
                                                                    children: "Price"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                                    lineNumber: 227,
                                                                    columnNumber: 37
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                    form: "multi-order-form",
                                                                    name: `items[${p.id}].priceId`,
                                                                    className: "border-slate-200 text-sm rounded-lg border bg-slate-50/50 px-3 py-2.5 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary w-full transition-all",
                                                                    value: priceId,
                                                                    onChange: (e)=>handlePriceChange(p.id, e.target.value),
                                                                    children: p.prices.map((pr)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: pr.id,
                                                                            children: [
                                                                                pr.currency,
                                                                                " • ",
                                                                                pr.pricingModel,
                                                                                " • MRC ",
                                                                                pr.basePrice,
                                                                                " • NRC ",
                                                                                pr.setupFee
                                                                            ]
                                                                        }, pr.id, true, {
                                                                            fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                                            lineNumber: 236,
                                                                            columnNumber: 41
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                                    lineNumber: 228,
                                                                    columnNumber: 37
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                            lineNumber: 226,
                                                            columnNumber: 33
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-1.5",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                    className: "text-xs font-medium text-slate-600",
                                                                    children: "Specifications"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                                    lineNumber: 243,
                                                                    columnNumber: 37
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$customer$2d$product$2d$specs$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CustomerProductSpecs"], {
                                                                    specs: p.specs,
                                                                    dynamicOptions: specDynamicOptions[p.id],
                                                                    namePrefix: `items[${p.id}].`,
                                                                    formId: "multi-order-form",
                                                                    branchId: branchId
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                                    lineNumber: 244,
                                                                    columnNumber: 37
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                            lineNumber: 242,
                                                            columnNumber: 33
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                    lineNumber: 208,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, p.id, true, {
                                            fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                            lineNumber: 181,
                                            columnNumber: 21
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                    lineNumber: 137,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, sub.id, true, {
                            fileName: "[project]/src/components/customer/direct-order-list.tsx",
                            lineNumber: 131,
                            columnNumber: 13
                        }, this)),
                    selectedCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 animate-in fade-in slide-in-from-bottom-4",
                        children: [
                            showGlobalContractFields && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white/95 backdrop-blur-xl p-5 rounded-2xl shadow-2xl border border-slate-200/80 w-full max-w-sm space-y-3 mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-semibold text-sm text-slate-900",
                                        children: "Contract Details"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                        lineNumber: 266,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                className: "text-xs font-medium text-slate-600",
                                                children: "Commencement Date"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                lineNumber: 268,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                form: "multi-order-form",
                                                name: "commencement_date",
                                                type: "date",
                                                required: true,
                                                className: "h-9 border-slate-200 focus:border-primary focus:ring-primary/20"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                lineNumber: 269,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                        lineNumber: 267,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                className: "text-xs font-medium text-slate-600",
                                                children: "Term Of Payment"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                lineNumber: 278,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                form: "multi-order-form",
                                                name: "term_of_payment",
                                                defaultValue: "Monthly",
                                                required: true,
                                                className: "h-9 border-slate-200 focus:border-primary focus:ring-primary/20"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                lineNumber: 279,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                        lineNumber: 277,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                className: "text-xs font-medium text-slate-600",
                                                children: "Term Of Contract (Months)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                lineNumber: 288,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                form: "multi-order-form",
                                                name: "term_of_contract",
                                                type: "number",
                                                min: 1,
                                                defaultValue: 12,
                                                required: true,
                                                className: "h-9 border-slate-200 focus:border-primary focus:ring-primary/20"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                lineNumber: 289,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                        lineNumber: 287,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                lineNumber: 265,
                                columnNumber: 22
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl shadow-slate-900/20 flex items-center gap-5 border border-slate-700/50",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                                                        className: "w-5 h-5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                        lineNumber: 304,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-slate-900",
                                                        children: selectedCount
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                        lineNumber: 305,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                lineNumber: 303,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm font-medium",
                                                children: [
                                                    selectedCount,
                                                    " Product",
                                                    selectedCount > 1 ? "s" : "",
                                                    " selected"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                                lineNumber: 307,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                        lineNumber: 302,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        form: "multi-order-form",
                                        className: "bg-white text-slate-900 hover:bg-slate-100 border-none font-semibold rounded-lg transition-colors",
                                        children: "Order Now"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                        lineNumber: 309,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/customer/direct-order-list.tsx",
                                lineNumber: 301,
                                columnNumber: 18
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/customer/direct-order-list.tsx",
                        lineNumber: 263,
                        columnNumber: 14
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/customer/direct-order-list.tsx",
        lineNumber: 79,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_4259e7c7._.js.map