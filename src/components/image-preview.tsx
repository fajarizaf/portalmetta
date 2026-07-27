"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Image as ImageIcon, ZoomIn } from "lucide-react"

interface ImagePreviewProps {
  src: string
  alt?: string
}

export function ImagePreview({ src, alt = "Preview" }: ImagePreviewProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          <ImageIcon className="size-4" />
          Preview Image
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] p-2">
        <img src={src} alt={alt} className="object-contain w-full h-full max-h-[85vh]" />
      </DialogContent>
    </Dialog>
  )
}