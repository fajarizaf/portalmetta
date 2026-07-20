"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Image as ImageIcon, UploadCloud } from "lucide-react";

export function LogoUpload({ id, name, defaultImageUrl }: { id: string; name: string; defaultImageUrl?: string }) {
  const [preview, setPreview] = React.useState<string | undefined>(defaultImageUrl);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  return (
    <div className="space-y-2">
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden",
          "rounded-md border border-dashed",
          "bg-muted/30 hover:bg-muted/40 transition-colors",
          "h-40 w-full"
        )}
      >
        {preview ? (
          <img src={preview} alt="Logo preview" className="h-full w-full object-contain p-2" />
        ) : (
          <div className="flex flex-col items-center justify-center text-center text-sm text-muted-foreground gap-2">
            <ImageIcon className="h-8 w-8" />
            <div className="font-medium">Upload Logo</div>
            <div className="text-xs">PNG, JPG, atau SVG</div>
          </div>
        )}
        <input
          ref={inputRef}
          id={id}
          name={name}
          type="file"
          accept="image/png,image/jpeg,image/svg+xml"
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          onChange={onChange}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={cn(
            "absolute bottom-2 right-2 inline-flex items-center gap-1",
            "rounded-md border bg-background px-2 py-1 text-xs shadow-xs"
          )}
        >
          <UploadCloud className="h-3 w-3" /> Pilih Logo
        </button>
      </div>
    </div>
  );
}