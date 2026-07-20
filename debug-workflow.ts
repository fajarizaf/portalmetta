
import { prisma } from "./src/lib/prisma"

async function main() {
  const docTypeKey = "work_order" // Assuming key based on user input
  const docType = await prisma.docType.findUnique({ where: { key: docTypeKey } })
  
  if (!docType) {
    console.log(`DocType ${docTypeKey} not found. Trying to list all keys...`)
    const all = await prisma.docType.findMany({ select: { key: true } })
    console.log("Available keys:", all.map(d => d.key).join(", "))
    return
  }
  
  console.log(`DocType found: ${docType.name} (${docType.key})`)

  const workflows = await prisma.docWorkflow.findMany({
    where: { docTypeId: docType.id, isActive: true }
  })
  
  console.log(`Found ${workflows.length} active workflows.`)
  
  for (const wf of workflows) {
    console.log(`Workflow ID: ${wf.id}`)
    console.log(`Branch ID: ${wf.branchId}`)
    console.log(`Is Active: ${wf.isActive}`)
  }

  // Find a recent record in "Pending Approval" state
  const record = await prisma.docRecord.findFirst({
    where: { docTypeId: docType.id, status: { contains: "Pending" } },
    orderBy: { updatedAt: "desc" },
    include: { createdBy: { include: { role: true } } }
  })

  if (record) {
    console.log("\nSample Record:")
    console.log("ID:", record.id)
    console.log("Branch ID:", record.branchId)
    console.log("Status:", record.status)
    console.log("Data:", JSON.stringify(record.data, null, 2))
    console.log("Creator Role:", record.createdBy?.role?.name)

    // Simulate processTransition logic
    console.log("\n--- Simulating processTransition ---")
    const me = { id: "simulated-user", role: { name: "Operational Manager" } } // Simulate Operational Manager
    const target = "Approved"
    
    // Logic from page.tsx
    let wf: any = null
    if (record.branchId) {
      const cand = await prisma.docWorkflow.findUnique({ where: { docTypeId_branchId: { docTypeId: docType.id, branchId: record.branchId } } })
      wf = cand && cand.isActive ? cand : null
    }
    if (!wf && docType.branchId) {
       const cand = await prisma.docWorkflow.findUnique({ where: { docTypeId_branchId: { docTypeId: docType.id, branchId: docType.branchId } } })
       wf = cand && cand.isActive ? cand : null
    }
    if (!wf) {
      wf = await prisma.docWorkflow.findFirst({ where: { docTypeId: docType.id, branchId: null, isActive: true } })
    }

    if (!wf) {
      console.log("Workflow not found!")
    } else {
      console.log("Workflow found:", wf.id)
      const cfg = wf.config as any
      const stateNames = (cfg.states ?? []).map((s: any) => s.name)
      const norm = (s: unknown) => String(s ?? "").trim().toLowerCase()
      
      let currentRaw = record.status ?? (stateNames[0] ?? undefined)
      const currentMatch = stateNames.find((s: string) => norm(s) === norm(currentRaw))
      let current = currentMatch ?? (stateNames[0] ?? currentRaw)
      
      console.log("Current Status (Normalized):", current)
      console.log("Target Status:", target)
      
      const allowed = (cfg.transitions ?? []).find((t: any) => norm(t.from) === norm(current) && norm(t.to) === norm(target) && (t.roles ?? []).some((r: any) => norm(r) === norm(me.role.name)))
      
      if (allowed) {
        console.log("Transition ALLOWED!")
      } else {
        console.log("Transition DENIED!")
        console.log("Checking transitions:")
        for(const t of (cfg.transitions ?? [])) {
            console.log(`From: ${t.from} (${norm(t.from)}), To: ${t.to} (${norm(t.to)}), Roles: ${t.roles}`)
            console.log(`Match? From: ${norm(t.from) === norm(current)}, To: ${norm(t.to) === norm(target)}, Role: ${(t.roles ?? []).some((r: any) => norm(r) === norm(me.role.name))}`)
        }
      }
    }

  } else {
    console.log("\nNo record found with status like 'Pending'")
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
