import { NextRequest, NextResponse } from "next/server"
import * as fs from "node:fs"
import * as path from "node:path"

/**
 * File serving route for production environments.
 *
 * In development, files in `public/` are served directly by Next.js.
 * In production, especially with Docker/serverless deployments, the
 * `public/` directory is part of the build and may not include
 * user-uploaded files. This route serves files from a configurable
 * persistent directory (defaults to `public/uploads/` for dev).
 *
 * Usage: `/api/uploads/<path>` → serves the file from upload dir
 *
 * Configure the upload directory via `UPLOAD_DIR` env var.
 * Default: `public/uploads` relative to project root.
 */

const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(process.cwd(), "public", "uploads")

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".xls": "application/vnd.ms-excel",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".txt": "text/plain",
  ".csv": "text/csv",
  ".json": "application/json",
}

function getMimeType(filename: string): string {
  const ext = path.extname(filename).toLowerCase()
  return MIME_TYPES[ext] || "application/octet-stream"
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: pathSegments } = await params

  if (!pathSegments || pathSegments.length === 0) {
    return NextResponse.json({ error: "Path required" }, { status: 400 })
  }

  // Reject path traversal attempts
  const joined = pathSegments.join("/")
  if (joined.includes("..") || joined.startsWith("/") || joined.startsWith("\\")) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 })
  }

  const filePath = path.join(UPLOAD_DIR, ...pathSegments)

  // Verify the resolved path is within UPLOAD_DIR
  const resolvedPath = path.resolve(filePath)
  const resolvedUploadDir = path.resolve(UPLOAD_DIR)
  if (!resolvedPath.startsWith(resolvedUploadDir + path.sep) && resolvedPath !== resolvedUploadDir) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 })
  }

  // Check if file exists
  if (!fs.existsSync(resolvedPath)) {
    return NextResponse.json({ error: "File not found" }, { status: 404 })
  }

  // Check if it's a file (not a directory)
  const stat = fs.statSync(resolvedPath)
  if (!stat.isFile()) {
    return NextResponse.json({ error: "Not a file" }, { status: 400 })
  }

  // Read and serve the file
  try {
    const fileBuffer = fs.readFileSync(resolvedPath)
    const mimeType = getMimeType(resolvedPath)

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": mimeType,
        "Content-Length": stat.size.toString(),
        "Cache-Control": "public, max-age=3600",
      },
    })
  } catch (err) {
    console.error("Error serving upload:", err)
    return NextResponse.json({ error: "Error reading file" }, { status: 500 })
  }
}
