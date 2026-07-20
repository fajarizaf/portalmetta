import fs from "fs"
import path from "path"

export function getLogoDataUri(logoUrl: string | null | undefined): string | undefined {
  if (!logoUrl) return undefined
  if (logoUrl.startsWith("data:")) return logoUrl
  
  try {
    const filePath = path.join(process.cwd(), "public", logoUrl)
    if (fs.existsSync(filePath)) {
      const buffer = fs.readFileSync(filePath)
      const extension = path.extname(filePath).slice(1) || "png"
      return `data:image/${extension};base64,${buffer.toString("base64")}`
    }
  } catch (e) {
    console.error("Failed to read logo file:", e)
  }
  
  if (logoUrl.startsWith("http")) return logoUrl
  
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000"
  return `${baseUrl}${logoUrl.startsWith("/") ? "" : "/"}${logoUrl}`
}
