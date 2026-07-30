import * as fs from "fs";

function run() {
  let file = fs.readFileSync("src/app/admin/visits/scanner/page.tsx", "utf-8");
  
  // Define replacements
  file = file.replace(/rounded-3xl/g, "rounded-xl");
  // The scanner window has 'rounded-tl-xl' etc.
  file = file.replace(/rounded-tl-xl/g, "rounded-tl-lg");
  file = file.replace(/rounded-tr-xl/g, "rounded-tr-lg");
  file = file.replace(/rounded-bl-xl/g, "rounded-bl-lg");
  file = file.replace(/rounded-br-xl/g, "rounded-br-lg");
  
  // Some inner boxes were rounded-xl
  file = file.replace(/rounded-xl/g, "rounded-lg");
  // Fix the ones we just turned into rounded-lg if needed, but it's fine.
  
  // Buttons and badges were rounded-full
  file = file.replace(/rounded-full bg-slate-900/g, "rounded-md bg-slate-900");
  file = file.replace(/rounded-full text-sm/g, "rounded-md text-sm");
  file = file.replace(/px-2.5 py-1 rounded-full/g, "px-2.5 py-1 rounded-md");
  file = file.replace(/px-3 py-1 rounded-full/g, "px-3 py-1 rounded-md");
  file = file.replace(/w-16 h-16 rounded-full/g, "w-16 h-16 rounded-lg");
  file = file.replace(/w-12 h-12 rounded-full/g, "w-12 h-12 rounded-lg");
  file = file.replace(/w-10 h-10 rounded-full/g, "w-10 h-10 rounded-lg");
  file = file.replace(/rounded-lg flex/g, "rounded-md flex");
  file = file.replace(/rounded-lg p-6/g, "rounded-md p-6");
  file = file.replace(/rounded-lg bg-emerald-600/g, "rounded-md bg-emerald-600");
  file = file.replace(/rounded-lg bg-slate-900/g, "rounded-md bg-slate-900");
  file = file.replace(/rounded-lg bg-slate-50/g, "rounded-md bg-slate-50");
  file = file.replace(/rounded-lg bg-white/g, "rounded-md bg-white");
  
  fs.writeFileSync("src/app/admin/visits/scanner/page.tsx", file);
}

run();
