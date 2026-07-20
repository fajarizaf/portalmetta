import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/button";
import { SearchableSelect } from "@/components/ui/select";

async function save(formData: FormData) {
  "use server";
  const userId = String(formData.get("userId") || "");
  const selected = formData.getAll("branchId").map(String);
  if (!userId) return;
  await prisma.userBranchAssignment.deleteMany({ where: { userId } });
  for (const branchId of selected) {
    await prisma.userBranchAssignment.create({ data: { userId, branchId } });
  }
  revalidatePath("/admin/admin-branch");
}

export default async function AdminBranchPage() {
  const [admins, branches] = await Promise.all([
    prisma.user.findMany({ where: { role: { name: "ADMIN" } } }),
    prisma.branch.findMany(),
  ]);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Assign Admin ke Branch</h1>
      <form action={save} className="space-y-4">
        <SearchableSelect
          name="userId"
          placeholder="Pilih admin"
          options={admins.map((a) => ({ label: a.email, value: a.id }))}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {branches.map((b) => (
            <label key={b.id} className="flex items-center gap-2">
              <input type="checkbox" name="branchId" value={b.id} />
              <span>{b.name}</span>
            </label>
          ))}
        </div>
        <Button type="submit">Simpan</Button>
      </form>
    </div>
  );
}