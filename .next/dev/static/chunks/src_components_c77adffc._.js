(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/ui/select.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SearchableSelect",
    ()=>SearchableSelect,
    "Select",
    ()=>Select,
    "SelectContent",
    ()=>SelectContent,
    "SelectGroup",
    ()=>SelectGroup,
    "SelectItem",
    ()=>SelectItem,
    "SelectLabel",
    ()=>SelectLabel,
    "SelectScrollDownButton",
    ()=>SelectScrollDownButton,
    "SelectScrollUpButton",
    ()=>SelectScrollUpButton,
    "SelectSeparator",
    ()=>SelectSeparator,
    "SelectTrigger",
    ()=>SelectTrigger,
    "SelectValue",
    ()=>SelectValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-select/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as CheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDownIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUpIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript) <export default as ChevronUpIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function Select({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "select",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 13,
        columnNumber: 10
    }, this);
}
_c = Select;
function SelectGroup({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"], {
        "data-slot": "select-group",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 19,
        columnNumber: 10
    }, this);
}
_c1 = SelectGroup;
function SelectValue({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Value"], {
        "data-slot": "select-value",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 25,
        columnNumber: 10
    }, this);
}
_c2 = SelectValue;
function SelectTrigger({ className, size = "default", children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "select-trigger",
        "data-size": size,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        ...props,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icon"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
                    className: "size-4 opacity-50"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/select.tsx",
                    lineNumber: 48,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/select.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
_c3 = SelectTrigger;
function SelectContent({ className, children, position = "item-aligned", align = "center", ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
            "data-slot": "select-content",
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
            position: position,
            align: align,
            ...props,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollUpButton, {}, void 0, false, {
                    fileName: "[project]/src/components/ui/select.tsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Viewport"], {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"),
                    children: children
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/select.tsx",
                    lineNumber: 76,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollDownButton, {}, void 0, false, {
                    fileName: "[project]/src/components/ui/select.tsx",
                    lineNumber: 85,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/select.tsx",
            lineNumber: 63,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
_c4 = SelectContent;
function SelectLabel({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
        "data-slot": "select-label",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground px-2 py-1.5 text-xs", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 96,
        columnNumber: 5
    }, this);
}
_c5 = SelectLabel;
function SelectItem({ className, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Item"], {
        "data-slot": "select-item",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                "data-slot": "select-item-indicator",
                className: "absolute right-2 flex size-3.5 items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__["CheckIcon"], {
                        className: "size-4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/select.tsx",
                        lineNumber: 123,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/select.tsx",
                    lineNumber: 122,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/select.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemText"], {
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/ui/select.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 110,
        columnNumber: 5
    }, this);
}
_c6 = SelectItem;
function SelectSeparator({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
        "data-slot": "select-separator",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-border pointer-events-none -mx-1 my-1 h-px", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 136,
        columnNumber: 5
    }, this);
}
_c7 = SelectSeparator;
function SelectScrollUpButton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollUpButton"], {
        "data-slot": "select-scroll-up-button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex cursor-default items-center justify-center py-1", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUpIcon$3e$__["ChevronUpIcon"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/select.tsx",
            lineNumber: 157,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 149,
        columnNumber: 5
    }, this);
}
_c8 = SelectScrollUpButton;
function SelectScrollDownButton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollDownButton"], {
        "data-slot": "select-scroll-down-button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex cursor-default items-center justify-center py-1", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/select.tsx",
            lineNumber: 175,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 167,
        columnNumber: 5
    }, this);
}
_c9 = SelectScrollDownButton;
;
function SearchableSelect({ name, options, placeholder = "-", value, defaultValue, onValueChange, disabled, className, contentClassName, inputPlaceholder = "Cari...", allowEmpty = true, size = "default", emitChangeEvent = true, required, containerId, form }) {
    _s();
    const EMPTY_VALUE = "__EMPTY__";
    const isControlled = typeof value === "string";
    const [internal, setInternal] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](defaultValue ?? "");
    const selected = isControlled ? value : internal;
    const [query, setQuery] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]("");
    const hiddenRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const filtered = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "SearchableSelect.useMemo[filtered]": ()=>{
            if (!query) return options;
            const q = query.toLowerCase();
            return options.filter({
                "SearchableSelect.useMemo[filtered]": (o)=>o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q)
            }["SearchableSelect.useMemo[filtered]"]);
        }
    }["SearchableSelect.useMemo[filtered]"], [
        options,
        query
    ]);
    const handleChange = (v)=>{
        const next = v === EMPTY_VALUE ? "" : v;
        if (!isControlled) setInternal(next);
        if (onValueChange) onValueChange(next);
        // Dispatch native events on hidden input for form validation
        setTimeout(()=>{
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
        }, 0);
        if (emitChangeEvent && name) {
            try {
                window.dispatchEvent(new CustomEvent("docFieldChange", {
                    detail: {
                        name,
                        value: next,
                        containerId
                    }
                }));
            } catch  {}
        }
    };
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "SearchableSelect.useEffect": ()=>{
            if (hiddenRef.current) {
                hiddenRef.current.dispatchEvent(new Event("input", {
                    bubbles: true
                }));
                hiddenRef.current.dispatchEvent(new Event("change", {
                    bubbles: true
                }));
            }
        }
    }["SearchableSelect.useEffect"], [
        selected
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full", className),
        children: [
            name ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: hiddenRef,
                suppressHydrationWarning: true,
                type: "hidden",
                name: name,
                value: selected,
                required: required,
                form: form
            }, void 0, false, {
                fileName: "[project]/src/components/ui/select.tsx",
                lineNumber: 282,
                columnNumber: 15
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
                value: selected,
                onValueChange: handleChange,
                disabled: disabled,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectTrigger, {
                        size: size,
                        className: "w-full",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectValue, {
                            placeholder: placeholder
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/select.tsx",
                            lineNumber: 285,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/select.tsx",
                        lineNumber: 284,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectContent, {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full", contentClassName),
                        position: "popper",
                        align: "start",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                    value: query,
                                    onChange: (e)=>setQuery(e.target.value),
                                    placeholder: inputPlaceholder
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/select.tsx",
                                    lineNumber: 289,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/select.tsx",
                                lineNumber: 288,
                                columnNumber: 11
                            }, this),
                            allowEmpty ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectItem, {
                                value: EMPTY_VALUE,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: placeholder
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/select.tsx",
                                    lineNumber: 293,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/select.tsx",
                                lineNumber: 292,
                                columnNumber: 13
                            }, this) : null,
                            filtered.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectItem, {
                                    value: o.value,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: o.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/select.tsx",
                                        lineNumber: 298,
                                        columnNumber: 15
                                    }, this)
                                }, o.value, false, {
                                    fileName: "[project]/src/components/ui/select.tsx",
                                    lineNumber: 297,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/select.tsx",
                        lineNumber: 287,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/select.tsx",
                lineNumber: 283,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/select.tsx",
        lineNumber: 281,
        columnNumber: 5
    }, this);
}
_s(SearchableSelect, "4Ji6qCRKLt0xqJfgmVXfJ4VdtUA=");
_c10 = SearchableSelect;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10;
__turbopack_context__.k.register(_c, "Select");
__turbopack_context__.k.register(_c1, "SelectGroup");
__turbopack_context__.k.register(_c2, "SelectValue");
__turbopack_context__.k.register(_c3, "SelectTrigger");
__turbopack_context__.k.register(_c4, "SelectContent");
__turbopack_context__.k.register(_c5, "SelectLabel");
__turbopack_context__.k.register(_c6, "SelectItem");
__turbopack_context__.k.register(_c7, "SelectSeparator");
__turbopack_context__.k.register(_c8, "SelectScrollUpButton");
__turbopack_context__.k.register(_c9, "SelectScrollDownButton");
__turbopack_context__.k.register(_c10, "SearchableSelect");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/document-preview.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DocumentPreview",
    ()=>DocumentPreview,
    "renderFromTemplate",
    ()=>renderFromTemplate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/select.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
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
    _s();
    const html = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "DocumentPreview.useMemo[html]": ()=>{
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
                    const f = fields.find({
                        "DocumentPreview.useMemo[html].f": (x)=>x.key === k
                    }["DocumentPreview.useMemo[html].f"]);
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
            const injectItems = {
                "DocumentPreview.useMemo[html].injectItems": (base)=>{
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
                }
            }["DocumentPreview.useMemo[html].injectItems"];
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
        }
    }["DocumentPreview.useMemo[html]"], [
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
    const [paperSize, setPaperSize] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]("A4");
    const [editMode, setEditMode] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]("view");
    const [fieldCfgs, setFieldCfgs] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]([]);
    const [childCfgs, setChildCfgs] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]([]);
    const [specPlacement, setSpecPlacement] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]("separate");
    const [template, setTemplate] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](defaultTemplate ?? "");
    const [pages, setPages] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]([]);
    const measureRef = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](null);
    const mmToPx = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "DocumentPreview.useCallback[mmToPx]": (mm)=>mm * (96 / 25.4)
    }["DocumentPreview.useCallback[mmToPx]"], []);
    const storageKey = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "DocumentPreview.useMemo[storageKey]": ()=>`doc_preview_template_${docTypeKey}`
    }["DocumentPreview.useMemo[storageKey]"], [
        docTypeKey
    ]);
    const [open, setOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "DocumentPreview.useEffect": ()=>{
            setFieldCfgs(fields.filter({
                "DocumentPreview.useEffect": (f)=>f.type !== "TABLE"
            }["DocumentPreview.useEffect"]).map({
                "DocumentPreview.useEffect": (f)=>({
                        key: f.key,
                        label: f.label,
                        enabled: true
                    })
            }["DocumentPreview.useEffect"]));
            setChildCfgs((childFields ?? []).map({
                "DocumentPreview.useEffect": (cf)=>({
                        key: cf.key,
                        label: cf.label,
                        enabled: true
                    })
            }["DocumentPreview.useEffect"]));
        }
    }["DocumentPreview.useEffect"], [
        fields,
        childFields
    ]);
    const visualHtml = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "DocumentPreview.useMemo[visualHtml]": ()=>{
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
        }
    }["DocumentPreview.useMemo[visualHtml]"], [
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
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "DocumentPreview.useEffect": ()=>{
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
            const makePageContainer = {
                "DocumentPreview.useEffect.makePageContainer": ()=>{
                    const d = document.createElement("div");
                    d.style.width = "100%";
                    return d;
                }
            }["DocumentPreview.useEffect.makePageContainer"];
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
        }
    }["DocumentPreview.useEffect"], [
        html,
        paperSize,
        mmToPx
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm font-semibold",
                children: "Preview Dokumen"
            }, void 0, false, {
                fileName: "[project]/src/components/document-preview.tsx",
                lineNumber: 1125,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        type: "button",
                        onClick: openPrint,
                        children: "Cetak / Download"
                    }, void 0, false, {
                        fileName: "[project]/src/components/document-preview.tsx",
                        lineNumber: 1127,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        type: "button",
                        variant: "secondary",
                        onClick: openTab,
                        children: "Buka di Tab"
                    }, void 0, false, {
                        fileName: "[project]/src/components/document-preview.tsx",
                        lineNumber: 1128,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-[100px]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                            value: paperSize,
                            onValueChange: (v)=>setPaperSize(v),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                            value: "A4",
                                            children: "A4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/document-preview.tsx",
                                            lineNumber: 1135,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border rounded p-4 bg-gray-100 flex justify-center overflow-auto max-h-[800px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        width: paperSize === 'A4' ? '210mm' : '215mm',
                        flexShrink: 0
                    },
                    children: (pages && pages.length > 0 ? pages : [
                        html
                    ]).map((page, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
_s(DocumentPreview, "9TNAq/40SG0ODneGY3tgSI8NAvU=");
_c = DocumentPreview;
var _c;
__turbopack_context__.k.register(_c, "DocumentPreview");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_c77adffc._.js.map