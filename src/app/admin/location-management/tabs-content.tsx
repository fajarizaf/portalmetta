"use client";
import { useSearchParams } from "next/navigation";

export function TabsContent({
  branch,
  building,
  floor,
  room,
}: {
  branch: React.ReactNode;
  building: React.ReactNode;
  floor: React.ReactNode;
  room: React.ReactNode;
}) {
  const sp = useSearchParams();
  const tab = sp.get("t") ?? "branch";
  return (
    <div className="relative space-y-6 min-h-[24rem]">
      <div className={tab === "branch" ? "opacity-100 transition-opacity duration-200" : "opacity-0 pointer-events-none absolute inset-0 transition-opacity duration-200"}>{branch}</div>
      <div className={tab === "building" ? "opacity-100 transition-opacity duration-200" : "opacity-0 pointer-events-none absolute inset-0 transition-opacity duration-200"}>{building}</div>
      <div className={tab === "floor" ? "opacity-100 transition-opacity duration-200" : "opacity-0 pointer-events-none absolute inset-0 transition-opacity duration-200"}>{floor}</div>
      <div className={tab === "room" ? "opacity-100 transition-opacity duration-200" : "opacity-0 pointer-events-none absolute inset-0 transition-opacity duration-200"}>{room}</div>
    </div>
  );
}