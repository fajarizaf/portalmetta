import * as fs from "fs";
import * as path from "path";

function fixErrors() {
  const filePath = path.join(process.cwd(), "src/app/admin/customers/[id]/edit/page.tsx");
  let file = fs.readFileSync(filePath, "utf-8");

  // Fix 1: Remove category from generateAccessCard
  file = file.replace(
    /category: "visit",\n\s+/,
    ""
  );

  // Fix 2: Move the injection
  // First, extract it
  const extractionRegex = /const accessCardDt = await prisma\.docType\.findUnique\([\s\S]*?color: \{ dark: "#000000", light: "#ffffff" \}\n    \}\);\n  \}\n\n/;
  const extractedMatch = file.match(extractionRegex);
  if (extractedMatch) {
    // Remove it from current location
    file = file.replace(extractionRegex, "");
    
    // Insert it after `if (!customer) return notFound();`
    const insertAfterRegex = /if \(!customer\) return notFound\(\);\n\n/;
    file = file.replace(insertAfterRegex, (match) => match + extractedMatch[0]);
  }

  fs.writeFileSync(filePath, file);
}

fixErrors();
