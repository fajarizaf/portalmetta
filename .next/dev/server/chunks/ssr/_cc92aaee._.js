module.exports = [
"[project]/src/app/customer/order/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"403dd804a9f962faf8c67629baccf1067a7347de95":"submitRequestOrder","406b82ed9889954ef1508b7e6257e389ceeb0a3cca":"submitMultiDirectOrder","40a2c0d13fbae2a1cc4c08c2ed975abebfe09fdc80":"submitDirectOrder"},"",""] */ __turbopack_context__.s([
    "submitDirectOrder",
    ()=>submitDirectOrder,
    "submitMultiDirectOrder",
    ()=>submitMultiDirectOrder,
    "submitRequestOrder",
    ()=>submitRequestOrder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
// --- Helper Functions from Admin Logic ---
function parseIDR(raw) {
    if (!raw) return null;
    let s = String(raw).trim();
    s = s.replace(/^IDR\s*/i, "");
    s = s.replace(/^Rp\.?\s*/i, "");
    s = s.replace(/\./g, "");
    s = s.replace(/,/g, ".");
    const n = Number(s);
    return Number.isNaN(n) ? null : n;
}
function isPriceLikeKey(key) {
    const k = String(key || "").toLowerCase();
    return k === "nrc" || k === "mrc" || k === "subtotal_nrc" || k === "sub_total_nrc" || k === "subtotal_mrc" || k === "sub_total_mrc" || k === "price" || k === "unit_price";
}
function evalFormula(formula, vars) {
    if (!formula || !vars) return null;
    const allowedFns = new Set([
        "round",
        "floor",
        "ceil",
        "min",
        "max"
    ]);
    let expr = formula.replace(/\^/g, "**");
    expr = expr.replace(/\b([A-Za-z_][A-Za-z0-9_]*)\b/g, (m)=>{
        if (allowedFns.has(m)) return `Math.${m}`;
        return `get("${m}")`;
    });
    try {
        const fn = new Function("get", "Math", `return ( ${expr} )`);
        const res = fn((k)=>{
            const v = vars[k];
            if (typeof v === "number") return v;
            if (typeof v === "string") {
                const n = Number(v);
                return Number.isNaN(n) ? 0 : n;
            }
            if (typeof v === "boolean") return v ? 1 : 0;
            return 0;
        }, Math);
        return typeof res === "number" && Number.isFinite(res) ? res : null;
    } catch  {
        return null;
    }
}
// ------------------------------------------
async function resolveInitialStatus(docTypeId, branchId, preferredStatus = "Pending") {
    let wf = null;
    if (branchId) {
        wf = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].docWorkflow.findUnique({
            where: {
                docTypeId_branchId: {
                    docTypeId,
                    branchId
                }
            }
        });
    }
    if (!wf) {
        wf = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].docWorkflow.findFirst({
            where: {
                docTypeId,
                branchId: null
            }
        });
    }
    // Default fallback
    const result = {
        status: preferredStatus,
        docStatus: 1
    };
    if (wf && wf.config) {
        const cfg = wf.config;
        if (Array.isArray(cfg.states) && cfg.states.length > 0) {
            // Try to find the preferred status first
            const foundState = cfg.states.find((s)=>s.name === preferredStatus);
            if (foundState) {
                result.status = foundState.name;
                if (typeof foundState.docStatus === "number") {
                    result.docStatus = wf.dontOverrideStatus ? undefined : foundState.docStatus;
                }
            } else {
            // If preferred status not found in workflow, what should we do?
            // User requested: "default docStatus ... adalah 1 , dan status = Pending"
            // If we strictly follow workflow, we might pick the first state (Draft/0).
            // But since this is a "Submit" action, we should probably force "Pending" if possible,
            // OR rely on the default fallback if the workflow doesn't explicitly forbid it.
            // For now, let's stick to the Default fallback (Pending/1) if preferred status isn't in workflow,
            // effectively ignoring the workflow's "Draft" start state.
            // But if the workflow defines states, usually the record must be in one of them.
            // If "Pending" is not in the workflow, setting it to "Pending" might break things if the system enforces valid states.
            // However, given the user instruction, we prioritize "Pending"/1.
            // So we do NOT overwrite result with cfg.states[0] here.
            }
        }
    }
    return result;
}
async function submitRequestOrder(formData) {
    console.log("--> submitRequestOrder called (Refactored Admin Logic)");
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getServerSession"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["authOptions"]);
    if (!session?.user?.email) {
        throw new Error("submitRequestOrder: No session or email");
    }
    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
        where: {
            email: session.user.email
        },
        include: {
            role: true,
            assignedBranches: {
                include: {
                    branch: true
                }
            },
            company: true
        }
    });
    if (!user) {
        throw new Error("submitRequestOrder: User not found");
    }
    const productId = String(formData.get("productId") || "");
    console.log("submitRequestOrder: productId =", productId);
    if (!productId) {
        throw new Error("submitRequestOrder: Missing productId");
    }
    const product = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].product.findUnique({
        where: {
            id: productId
        },
        include: {
            prices: true,
            specs: true,
            group: {
                include: {
                    parent: true
                }
            }
        }
    });
    if (!product) {
        throw new Error("submitRequestOrder: Product not found");
    }
    // Get DocType "Request" (assuming key is "request")
    const docTypeKey = "request";
    const docType = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].docType.findUnique({
        where: {
            key: docTypeKey
        },
        include: {
            fields: true,
            branch: true
        }
    });
    if (!docType) {
        throw new Error(`submitRequestOrder: DocType with key "${docTypeKey}" not found`);
    }
    console.log("submitRequestOrder: DocType found", docType.id);
    // Determine Branch
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    const cookieBranchId = cookieStore.get("branchId")?.value;
    const assigned = user.assignedBranches.map((a)=>a.branch.id);
    // Prioritize active branch (cookie) as requested
    let branchId = cookieBranchId;
    // Fallback to docType branch or assigned branch if no cookie
    if (!branchId) {
        branchId = docType.branchId;
    }
    if (!branchId && assigned.length > 0) {
        branchId = assigned[0];
    }
    console.log("submitRequestOrder: Branch determined", branchId);
    // --- Payload Construction (Admin Style) ---
    const payload = {};
    // Context overrides
    const contextValues = {
        requester: user.id,
        request_date: new Date().toISOString().split("T")[0],
        req_date: new Date().toISOString().split("T")[0],
        status: "Pending",
        customer_id: user.companyId
    };
    for (const f of docType.fields){
        // 1. Check Context (Allow overriding ReadOnly if in context)
        if (contextValues[f.key] !== undefined) {
            payload[f.key] = contextValues[f.key];
            continue;
        }
        if (f.readOnly) continue;
        // 2. Check FormData
        const raw = String(formData.get(f.key) || "");
        if (f.type === "CHECKBOX") {
            payload[f.key] = raw === "on";
        } else if (f.type === "PRICE" || isPriceLikeKey(f.key)) {
            const parsed = parseIDR(raw);
            payload[f.key] = parsed != null ? parsed : raw ? Number(raw) : null;
        } else if (f.type === "NUMBER") {
            payload[f.key] = raw ? Number(raw) : null;
        } else {
            // Default string
            payload[f.key] = raw;
        }
    }
    // --- Formula Evaluation (Admin Style) ---
    for (const f of docType.fields){
        if (!f.readOnly) continue;
        const cfg = f.config ?? {};
        const formula = cfg.compute?.formula;
        const val = evalFormula(formula, payload);
        if (val != null) {
            payload[f.key] = val;
        }
    }
    // --- Naming Series ---
    const namingCfg = docType.config ?? {};
    const namingMode = namingCfg.naming?.mode ?? "series";
    const defaultPattern = namingCfg.naming?.defaultPattern ?? "REQ-#####";
    let code = undefined;
    // Helper to generate series
    const generateSeriesCode = async (pattern, bId, dId)=>{
        const m = /^(.*?)(#+)(.*)$/.exec(pattern);
        const prefix = m ? m[1] : pattern;
        const hashes = m ? m[2] : "#####";
        const suffix = m ? m[3] : "";
        const digits = hashes.length;
        const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].docNamingCounter.findFirst({
            where: {
                docTypeId: dId,
                branchId: bId ?? null,
                series: pattern
            }
        });
        let counter;
        if (existing) {
            counter = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].docNamingCounter.update({
                where: {
                    id: existing.id
                },
                data: {
                    seq: {
                        increment: 1
                    }
                }
            });
        } else {
            counter = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].docNamingCounter.create({
                data: {
                    docTypeId: dId,
                    branchId: bId ?? null,
                    series: pattern,
                    seq: 1
                }
            });
        }
        const seq = counter.seq;
        const pad = String(seq).padStart(digits, "0");
        return `${prefix}${pad}${suffix}`;
    };
    try {
        let retries = 0;
        while(retries < 5){
            if (namingMode === "series") {
                code = await generateSeriesCode(defaultPattern, branchId, docType.id);
            } else if (namingMode === "uuid") {
                code = crypto.randomUUID();
            }
            // Check uniqueness
            if (code) {
                const exists = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].docRecord.findUnique({
                    where: {
                        code
                    }
                });
                if (!exists) break;
                console.warn(`submitRequestOrder: Code collision for ${code}, retrying...`);
            }
            retries++;
        }
        if (!code) throw new Error("Failed to generate code");
        console.log("submitRequestOrder: Generated code", code);
    } catch (e) {
        console.error("submitRequestOrder: Error generating code", e);
        throw new Error(`submitRequestOrder: Error generating code: ${e}`);
    }
    // --- Create DocRecord (Request) ---
    let requestRecord;
    try {
        const { status: initialStatus, docStatus: initialDocStatus } = await resolveInitialStatus(docType.id, branchId);
        requestRecord = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].docRecord.create({
            data: {
                docTypeId: docType.id,
                branchId: branchId || null,
                code,
                status: initialStatus,
                docStatus: initialDocStatus,
                data: payload,
                createdById: user.id,
                updatedById: user.id,
                assignedToId: user.id
            }
        });
        console.log("submitRequestOrder: Request created", requestRecord.id);
    } catch (e) {
        console.error("submitRequestOrder: Error creating Request record", e);
        throw new Error(`submitRequestOrder: Error creating Request record: ${e}`);
    }
    // --- Create Child Rows (Request Item) ---
    // Mimicking Admin Logic: Iterate Child DocType Fields and Map Data
    const itemDocType = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].docType.findUnique({
        where: {
            key: "request_item"
        },
        include: {
            fields: true
        }
    });
    if (itemDocType) {
        const itemData = {};
        // Find selected price
        const priceId = String(formData.get("priceId") || "");
        const selectedPrice = product.prices.find((p)=>p.id === priceId);
        console.log("DEBUG: submitRequestOrder");
        console.log("DEBUG: FormData Keys:", Array.from(formData.keys()));
        console.log("DEBUG: Item DocType Fields:", itemDocType.fields.map((f)=>f.key));
        // We only have ONE item from the customer form, so we map it manually to the fields
        // But we iterate itemDocType.fields to ensure types/keys are correct
        // 1. Populate standard fields based on DocType definition
        for (const f of itemDocType.fields){
            // Special mapping: Priority fields (fill even if readOnly)
            if (f.key === "product_id") {
                itemData[f.key] = product.id;
                continue;
            }
            if (f.key === "qty") {
                const rawQty = formData.get("qty");
                const q = rawQty ? Number(rawQty) : 1;
                itemData[f.key] = !isNaN(q) && q > 0 ? q : 1;
                continue;
            }
            if (f.key === "product_category") {
                itemData[f.key] = product.group?.parent?.id;
                continue;
            }
            if (f.key === "product_sub_category") {
                itemData[f.key] = product.group?.id;
                continue;
            }
            // Price mapping
            if (selectedPrice) {
                if (f.key === "mrc" || f.key === "price" || f.key === "unit_price") {
                    itemData[f.key] = Number(selectedPrice.basePrice);
                    continue;
                }
                if (f.key === "nrc") {
                    itemData[f.key] = Number(selectedPrice.setupFee);
                    continue;
                }
            }
            if (f.readOnly) continue; // Skip readOnly for input mapping
        }
        // 2. Populate Product Specs (mimicking Admin createRecord logic)
        // We iterate product.specs to ensure we capture all dynamic specs, 
        // regardless of whether they are explicitly in itemDocType.fields or not.
        for (const s of product.specs){
            const specKey = `spec_${s.key}`;
            const val = formData.get(specKey);
            console.log(`DEBUG: Processing Product Spec '${s.key}' -> Input '${specKey}' -> Value:`, val);
            if (val) {
                // Type conversion based on spec type
                if (s.type === "NUMBER") {
                    itemData[specKey] = Number(val);
                } else if (s.type === "CHECKBOX") {
                    // Checkbox handling might involve multiple values if options exist, 
                    // but for simple boolean or single value:
                    const cfg = s.config ?? {};
                    if (Array.isArray(cfg.options) && cfg.options.length > 0) {
                        // Multi-option checkbox (like in Admin logic)
                        const selected = [];
                        for (const o of cfg.options){
                            const ck = `${specKey}__${o.value}`;
                            if (String(formData.get(ck) || "") === "on") {
                                selected.push(String(o.value));
                            // Handle qty if needed (omitted for brevity unless requested)
                            }
                        }
                        if (selected.length > 0) itemData[specKey] = selected;
                    } else {
                        // Simple boolean checkbox
                        itemData[specKey] = val === "on" || val === "true";
                    }
                } else {
                    itemData[specKey] = String(val);
                }
            }
        }
        // Formula Eval for Item
        for (const f of itemDocType.fields){
            if (!f.readOnly) continue;
            const cfg = f.config ?? {};
            const formula = cfg.compute?.formula;
            const val = evalFormula(formula, itemData);
            if (val != null) {
                itemData[f.key] = val;
            }
        }
        try {
            // 1. Create Independent Record for Request Item (Maintaining previous requirement)
            const { status: itemStatus, docStatus: itemDocStatus } = await resolveInitialStatus(itemDocType.id, branchId);
            const itemRecord = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].docRecord.create({
                data: {
                    docTypeId: itemDocType.id,
                    branchId: branchId || null,
                    status: itemStatus,
                    docStatus: itemDocStatus,
                    parentId: requestRecord.id,
                    data: {
                        ...itemData,
                        _parentId: requestRecord.id,
                        _parentDocType: docTypeKey
                    },
                    createdById: user.id,
                    updatedById: user.id,
                    assignedToId: user.id
                }
            });
            console.log("submitRequestOrder: Request Item record created", itemRecord.id);
            // 2. Create DocRow linking to the item record
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].docRow.create({
                data: {
                    recordId: requestRecord.id,
                    childDocTypeId: itemDocType.id,
                    idx: 0,
                    data: {
                        ...itemData,
                        __childRecordId: itemRecord.id
                    }
                }
            });
            console.log("submitRequestOrder: Request Item row created");
        } catch (e) {
            console.error("submitRequestOrder: Error creating Request Item record/row", e);
        // Non-fatal? Maybe warning.
        }
    } else {
        console.warn("submitRequestOrder: 'request_item' DocType not found, skipping item creation");
    }
    // Redirect to success page or similar (if needed)
    // For now, maybe just log success
    console.log("submitRequestOrder: Success");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/customer/docs/request");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/customer/docs/request");
}
async function submitDirectOrder(formData) {
    console.log("--> submitDirectOrder called (Sales Order Logic)");
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getServerSession"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["authOptions"]);
    if (!session?.user?.email) {
        throw new Error("submitDirectOrder: No session or email");
    }
    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
        where: {
            email: session.user.email
        },
        include: {
            role: true,
            assignedBranches: {
                include: {
                    branch: true
                }
            },
            company: true
        }
    });
    if (!user) {
        throw new Error("submitDirectOrder: User not found");
    }
    const productId = String(formData.get("productId") || "");
    console.log("submitDirectOrder: productId =", productId);
    if (!productId) {
        throw new Error("submitDirectOrder: Missing productId");
    }
    const product = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].product.findUnique({
        where: {
            id: productId
        },
        include: {
            prices: true,
            specs: true,
            group: {
                include: {
                    parent: true
                }
            }
        }
    });
    if (!product) {
        throw new Error("submitDirectOrder: Product not found");
    }
    // Get DocType "Sales Order"
    const docTypeKey = "sales_order";
    const docType = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].docType.findUnique({
        where: {
            key: docTypeKey
        },
        include: {
            fields: true,
            branch: true
        }
    });
    if (!docType) {
        throw new Error(`submitDirectOrder: DocType with key "${docTypeKey}" not found`);
    }
    console.log("submitDirectOrder: DocType found", docType.id);
    // Determine Branch
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    const cookieBranchId = cookieStore.get("branchId")?.value;
    const assigned = user.assignedBranches.map((a)=>a.branch.id);
    let branchId = cookieBranchId;
    if (!branchId) {
        branchId = docType.branchId;
    }
    if (!branchId && assigned.length > 0) {
        branchId = assigned[0];
    }
    console.log("submitDirectOrder: Branch determined", branchId);
    // --- Payload Construction ---
    const payload = {};
    // Context overrides for Sales Order
    const contextValues = {
        customer: user.companyId,
        customer_id: user.companyId,
        transaction_date: new Date().toISOString().split("T")[0],
        order_date: new Date().toISOString().split("T")[0],
        status: "Pending",
        term_of_payment: "One Time",
        term_of_contract: 0
    };
    for (const f of docType.fields){
        if (contextValues[f.key] !== undefined) {
            payload[f.key] = contextValues[f.key];
            continue;
        }
        if (f.readOnly) continue;
        const raw = String(formData.get(f.key) || "");
        if (f.type === "CHECKBOX") {
            payload[f.key] = raw === "on";
        } else if (f.type === "PRICE" || isPriceLikeKey(f.key)) {
            const parsed = parseIDR(raw);
            payload[f.key] = parsed != null ? parsed : raw ? Number(raw) : null;
        } else if (f.type === "NUMBER") {
            payload[f.key] = raw ? Number(raw) : null;
        } else {
            payload[f.key] = raw;
        }
    }
    // Formula Evaluation
    for (const f of docType.fields){
        if (!f.readOnly) continue;
        const cfg = f.config ?? {};
        const formula = cfg.compute?.formula;
        const val = evalFormula(formula, payload);
        if (val != null) {
            payload[f.key] = val;
        }
    }
    // --- Naming Series ---
    const namingCfg = docType.config ?? {};
    const namingMode = namingCfg.naming?.mode ?? "series";
    const defaultPattern = namingCfg.naming?.defaultPattern ?? "SO-#####";
    let code = undefined;
    const generateSeriesCode = async (pattern, bId, dId)=>{
        const m = /^(.*?)(#+)(.*)$/.exec(pattern);
        const prefix = m ? m[1] : pattern;
        const hashes = m ? m[2] : "#####";
        const suffix = m ? m[3] : "";
        const digits = hashes.length;
        const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].docNamingCounter.findFirst({
            where: {
                docTypeId: dId,
                branchId: bId ?? null,
                series: pattern
            }
        });
        let counter;
        if (existing) {
            counter = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].docNamingCounter.update({
                where: {
                    id: existing.id
                },
                data: {
                    seq: {
                        increment: 1
                    }
                }
            });
        } else {
            counter = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].docNamingCounter.create({
                data: {
                    docTypeId: dId,
                    branchId: bId ?? null,
                    series: pattern,
                    seq: 1
                }
            });
        }
        const seq = counter.seq;
        const pad = String(seq).padStart(digits, "0");
        return `${prefix}${pad}${suffix}`;
    };
    try {
        let retries = 0;
        while(retries < 5){
            if (namingMode === "series") {
                code = await generateSeriesCode(defaultPattern, branchId, docType.id);
            } else if (namingMode === "uuid") {
                code = crypto.randomUUID();
            }
            if (code) {
                const exists = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].docRecord.findUnique({
                    where: {
                        code
                    }
                });
                if (!exists) break;
            }
            retries++;
        }
        if (!code) throw new Error("Failed to generate code");
    } catch (e) {
        throw new Error(`submitDirectOrder: Error generating code: ${e}`);
    }
    // --- Create DocRecord (Sales Order) ---
    let orderRecord;
    try {
        // FORCE Status Pending and DocStatus 1 as requested
        const initialStatus = "Pending";
        const initialDocStatus = 1;
        orderRecord = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].docRecord.create({
            data: {
                docTypeId: docType.id,
                branchId: branchId || null,
                code,
                status: initialStatus,
                docStatus: initialDocStatus,
                data: payload,
                createdById: user.id,
                updatedById: user.id,
                assignedToId: user.id
            }
        });
        console.log("submitDirectOrder: Sales Order created", orderRecord.id);
    } catch (e) {
        console.error("submitDirectOrder: Error creating Sales Order record", e);
        throw new Error(`submitDirectOrder: Error creating Sales Order record: ${e}`);
    }
    // --- Create Child Rows (Sales Order Item) ---
    const itemDocType = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].docType.findUnique({
        where: {
            key: "sales_order_item"
        },
        include: {
            fields: true
        }
    });
    if (itemDocType) {
        const itemData = {};
        const priceId = String(formData.get("priceId") || "");
        const selectedPrice = product.prices.find((p)=>p.id === priceId);
        for (const f of itemDocType.fields){
            if (f.key === "product_id" || f.key === "product") {
                itemData[f.key] = product.id;
                continue;
            }
            if (f.key === "service_name") {
                itemData[f.key] = product.name;
                continue;
            }
            if (f.key === "qty") {
                itemData[f.key] = 1;
                continue;
            }
            if (f.key === "product_category") {
                itemData[f.key] = product.group?.parent?.id;
                continue;
            }
            if (f.key === "product_sub_category") {
                itemData[f.key] = product.group?.id;
                continue;
            }
            if (selectedPrice) {
                if (f.key === "mrc" || f.key === "price" || f.key === "unit_price") {
                    itemData[f.key] = Number(selectedPrice.basePrice);
                    continue;
                }
                if (f.key === "nrc") {
                    itemData[f.key] = Number(selectedPrice.setupFee);
                    continue;
                }
            }
            if (f.readOnly) continue;
        }
        // Calculate Subtotals
        const qty = typeof itemData.qty === 'number' ? itemData.qty : 1;
        const nrc = typeof itemData.nrc === 'number' ? itemData.nrc : 0;
        const mrc = typeof itemData.mrc === 'number' ? itemData.mrc : typeof itemData.price === 'number' ? itemData.price : typeof itemData.unit_price === 'number' ? itemData.unit_price : 0;
        itemData.subtotal_nrc = qty * nrc;
        itemData.subtotal_mrc = qty * mrc;
        for (const s of product.specs){
            const specKey = `spec_${s.key}`;
            const val = formData.get(specKey);
            if (val) {
                if (s.type === "NUMBER") {
                    itemData[specKey] = Number(val);
                } else if (s.type === "CHECKBOX") {
                    const cfg = s.config ?? {};
                    if (Array.isArray(cfg.options) && cfg.options.length > 0) {
                        const selected = [];
                        for (const o of cfg.options){
                            const ck = `${specKey}__${o.value}`;
                            if (String(formData.get(ck) || "") === "on") {
                                selected.push(String(o.value));
                            }
                        }
                        if (selected.length > 0) itemData[specKey] = selected;
                    } else {
                        itemData[specKey] = val === "on" || val === "true";
                    }
                } else {
                    itemData[specKey] = String(val);
                }
            }
        }
        for (const f of itemDocType.fields){
            if (!f.readOnly) continue;
            const cfg = f.config ?? {};
            const formula = cfg.compute?.formula;
            const val = evalFormula(formula, itemData);
            if (val != null) {
                itemData[f.key] = val;
            }
        }
        try {
            // FORCE Status Pending and DocStatus 1 for item as well
            const itemStatus = "Pending";
            const itemDocStatus = 1;
            const itemRecord = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].docRecord.create({
                data: {
                    docTypeId: itemDocType.id,
                    branchId: branchId || null,
                    status: itemStatus,
                    docStatus: itemDocStatus,
                    parentId: orderRecord.id,
                    data: {
                        ...itemData,
                        _parentId: orderRecord.id,
                        _parentDocType: docTypeKey
                    },
                    createdById: user.id,
                    updatedById: user.id,
                    assignedToId: user.id
                }
            });
            console.log("submitDirectOrder: Sales Order Item record created", itemRecord.id);
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].docRow.create({
                data: {
                    recordId: orderRecord.id,
                    childDocTypeId: itemDocType.id,
                    idx: 0,
                    data: {
                        ...itemData,
                        __childRecordId: itemRecord.id
                    }
                }
            });
            // Update Header with Total Contract
            const totalNrc = Number(itemData.subtotal_nrc || 0);
            const totalMrc = Number(itemData.subtotal_mrc || 0);
            const termOfContract = Number(payload.term_of_contract || 0);
            const totalContract = totalNrc + termOfContract * totalMrc;
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].docRecord.update({
                where: {
                    id: orderRecord.id
                },
                data: {
                    data: {
                        ...orderRecord.data,
                        total_contract: totalContract
                    }
                }
            });
        } catch (e) {
            console.error("submitDirectOrder: Error creating Sales Order Item", e);
        }
    } else {
        console.warn("submitDirectOrder: 'sales_order_item' DocType not found");
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/customer/docs/sales_order");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/customer/docs/sales_order");
}
async function submitMultiDirectOrder(formData) {
    console.log("--> submitMultiDirectOrder called");
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getServerSession"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["authOptions"]);
    if (!session?.user?.email) throw new Error("submitMultiDirectOrder: No session");
    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
        where: {
            email: session.user.email
        },
        include: {
            role: true,
            assignedBranches: {
                include: {
                    branch: true
                }
            },
            company: true
        }
    });
    if (!user) throw new Error("submitMultiDirectOrder: User not found");
    // Parse Items from FormData
    const rawItems = new Map();
    for (const [key, value] of Array.from(formData.entries())){
        const match = key.match(/^items\[([^\]]+)\]\.(.+)$/);
        if (match) {
            const idx = match[1];
            const k = match[2];
            if (!rawItems.has(idx)) rawItems.set(idx, {});
            const item = rawItems.get(idx);
            if (Object.prototype.hasOwnProperty.call(item, k)) {
                const ex = item[k];
                if (Array.isArray(ex)) ex.push(value);
                else item[k] = [
                    ex,
                    value
                ];
            } else {
                item[k] = value;
            }
        }
    }
    const items = Array.from(rawItems.values());
    if (items.length === 0) {
        console.warn("submitMultiDirectOrder: No items found in payload");
        throw new Error("No items selected");
    }
    console.log(`submitMultiDirectOrder: Found ${items.length} items`);
    // --- Header Setup ---
    const docTypeKey = "sales_order";
    const docType = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].docType.findUnique({
        where: {
            key: docTypeKey
        },
        include: {
            fields: true,
            branch: true
        }
    });
    if (!docType) throw new Error("Sales Order DocType not found");
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    let branchId = cookieStore.get("branchId")?.value;
    if (!branchId) branchId = docType.branchId;
    if (!branchId && user.assignedBranches.length > 0) branchId = user.assignedBranches[0].branch.id;
    const payload = {
        customer: user.companyId,
        customer_id: user.companyId,
        transaction_date: new Date().toISOString().split("T")[0],
        order_date: new Date().toISOString().split("T")[0],
        status: "Pending",
        term_of_payment: formData.get("term_of_payment") ? String(formData.get("term_of_payment")) : "One Time",
        term_of_contract: formData.get("term_of_contract") ? Number(formData.get("term_of_contract")) : 0,
        commencement_date: formData.get("commencement_date") ? String(formData.get("commencement_date")) : null
    };
    // --- Naming Series ---
    const namingCfg = docType.config ?? {};
    const defaultPattern = namingCfg.naming?.defaultPattern ?? "SO-#####";
    let code;
    const generateSeriesCode = async (pattern, bId, dId)=>{
        const m = /^(.*?)(#+)(.*)$/.exec(pattern);
        const prefix = m ? m[1] : pattern;
        const hashes = m ? m[2] : "#####";
        const suffix = m ? m[3] : "";
        const digits = hashes.length;
        const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].docNamingCounter.findFirst({
            where: {
                docTypeId: dId,
                branchId: bId ?? null,
                series: pattern
            }
        });
        let counter;
        if (existing) {
            counter = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].docNamingCounter.update({
                where: {
                    id: existing.id
                },
                data: {
                    seq: {
                        increment: 1
                    }
                }
            });
        } else {
            counter = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].docNamingCounter.create({
                data: {
                    docTypeId: dId,
                    branchId: bId ?? null,
                    series: pattern,
                    seq: 1
                }
            });
        }
        const pad = String(counter.seq).padStart(digits, "0");
        return `${prefix}${pad}${suffix}`;
    };
    let retries = 0;
    while(retries < 5){
        code = await generateSeriesCode(defaultPattern, branchId, docType.id);
        const exists = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].docRecord.findUnique({
            where: {
                code
            }
        });
        if (!exists) break;
        retries++;
    }
    if (!code) throw new Error("Failed to generate code");
    // --- Create Header Record ---
    // Force Pending/1 as per requirement
    const finalStatus = "Pending";
    const finalDocStatus = 1;
    const orderRecord = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].docRecord.create({
        data: {
            docTypeId: docType.id,
            branchId: branchId || null,
            code,
            status: finalStatus,
            docStatus: finalDocStatus,
            data: payload,
            createdById: user.id,
            updatedById: user.id,
            assignedToId: user.id
        }
    });
    // Track totals for header update
    let totalNrc = 0;
    let totalMrc = 0;
    // --- Process Items ---
    const itemDocType = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].docType.findUnique({
        where: {
            key: "sales_order_item"
        },
        include: {
            fields: true
        }
    });
    if (itemDocType) {
        let itemIdx = 0;
        for (const itemInput of items){
            const productId = String(itemInput.productId || "");
            if (!productId) continue;
            const product = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].product.findUnique({
                where: {
                    id: productId
                },
                include: {
                    prices: true,
                    specs: true,
                    group: {
                        include: {
                            parent: true
                        }
                    }
                }
            });
            if (!product) continue;
            const itemData = {
                term_of_contract: 0,
                term_of_payment: "One Time"
            };
            const priceId = String(itemInput.priceId || "");
            const selectedPrice = product.prices.find((p)=>p.id === priceId);
            // Map Fields
            for (const f of itemDocType.fields){
                if (f.key === "product_id") {
                    itemData[f.key] = product.id;
                    continue;
                }
                if (f.key === "service_name") {
                    itemData[f.key] = product.name;
                    continue;
                }
                if (f.key === "qty") {
                    const q = Number(itemInput.qty);
                    itemData[f.key] = !isNaN(q) && q > 0 ? q : 1;
                    continue;
                }
                if (f.key === "product_category") {
                    itemData[f.key] = product.group?.parent?.id;
                    continue;
                }
                if (f.key === "product_sub_category") {
                    itemData[f.key] = product.group?.id;
                    continue;
                }
                if (selectedPrice) {
                    if (f.key === "mrc" || f.key === "price" || f.key === "unit_price") {
                        itemData[f.key] = Number(selectedPrice.basePrice);
                        continue;
                    }
                    if (f.key === "nrc") {
                        itemData[f.key] = Number(selectedPrice.setupFee);
                        continue;
                    }
                }
                if (f.readOnly) continue;
            }
            // Calculate Subtotals
            const qty = typeof itemData.qty === 'number' ? itemData.qty : 1;
            const nrc = typeof itemData.nrc === 'number' ? itemData.nrc : 0;
            const mrc = typeof itemData.mrc === 'number' ? itemData.mrc : typeof itemData.price === 'number' ? itemData.price : typeof itemData.unit_price === 'number' ? itemData.unit_price : 0;
            itemData.subtotal_nrc = qty * nrc;
            itemData.subtotal_mrc = qty * mrc;
            totalNrc += qty * nrc;
            totalMrc += qty * mrc;
            // Map Specs
            for (const s of product.specs){
                const specKey = `spec_${s.key}`;
                const val = itemInput[specKey];
                if (val) {
                    if (s.type === "NUMBER") {
                        itemData[specKey] = Number(val);
                    } else if (s.type === "CHECKBOX") {
                        if (Array.isArray(val)) {
                        // ignore or handle if needed
                        } else {
                            itemData[specKey] = val === "on" || val === "true";
                        }
                    } else {
                        itemData[specKey] = String(val);
                    }
                }
                if (s.type === "CHECKBOX") {
                    const cfg = s.config ?? {};
                    if (Array.isArray(cfg.options)) {
                        const selected = [];
                        for (const o of cfg.options){
                            const ck = `${specKey}__${o.value}`;
                            if (itemInput[ck] === "on") {
                                selected.push(String(o.value));
                            }
                        }
                        if (selected.length > 0) itemData[specKey] = selected;
                    }
                }
            }
            // Formula
            for (const f of itemDocType.fields){
                if (!f.readOnly) continue;
                const cfg = f.config ?? {};
                const formula = cfg.compute?.formula;
                const val = evalFormula(formula, itemData);
                if (val != null) itemData[f.key] = val;
            }
            // Create Item
            const iStatus = "Pending";
            const iDocStatus = 1;
            const itemRecord = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].docRecord.create({
                data: {
                    docTypeId: itemDocType.id,
                    branchId: branchId || null,
                    status: iStatus,
                    docStatus: iDocStatus,
                    parentId: orderRecord.id,
                    data: {
                        ...itemData,
                        _parentId: orderRecord.id,
                        _parentDocType: docTypeKey
                    },
                    createdById: user.id,
                    updatedById: user.id,
                    assignedToId: user.id
                }
            });
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].docRow.create({
                data: {
                    recordId: orderRecord.id,
                    childDocTypeId: itemDocType.id,
                    idx: itemIdx,
                    data: {
                        ...itemData,
                        __childRecordId: itemRecord.id
                    }
                }
            });
            itemIdx++;
        }
    }
    // Update Header with Total Contract
    const termOfContract = Number(payload.term_of_contract || 0);
    const totalContract = totalNrc + termOfContract * totalMrc;
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].docRecord.update({
        where: {
            id: orderRecord.id
        },
        data: {
            data: {
                ...orderRecord.data,
                total_contract: totalContract
            }
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/customer/docs/sales_order");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/customer/docs/sales_order");
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    submitRequestOrder,
    submitDirectOrder,
    submitMultiDirectOrder
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(submitRequestOrder, "403dd804a9f962faf8c67629baccf1067a7347de95", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(submitDirectOrder, "40a2c0d13fbae2a1cc4c08c2ed975abebfe09fdc80", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(submitMultiDirectOrder, "406b82ed9889954ef1508b7e6257e389ceeb0a3cca", null);
}),
"[project]/.next-internal/server/app/customer/order/[groupId]/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/customer/layout.tsx [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/app/customer/order/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$customer$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/customer/layout.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$customer$2f$order$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/customer/order/actions.ts [app-rsc] (ecmascript)");
;
;
;
}),
"[project]/.next-internal/server/app/customer/order/[groupId]/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/customer/layout.tsx [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/app/customer/order/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "40305ddd5c4ea3bd84f81c081da02297a9ef4478ad",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$customer$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["$$RSC_SERVER_ACTION_0"],
    "403dd804a9f962faf8c67629baccf1067a7347de95",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$customer$2f$order$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["submitRequestOrder"],
    "406b82ed9889954ef1508b7e6257e389ceeb0a3cca",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$customer$2f$order$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["submitMultiDirectOrder"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$customer$2f$order$2f5b$groupId$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$customer$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$app$2f$customer$2f$order$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/customer/order/[groupId]/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/customer/layout.tsx [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/src/app/customer/order/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$customer$2f$layout$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/customer/layout.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$customer$2f$order$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/customer/order/actions.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_cc92aaee._.js.map