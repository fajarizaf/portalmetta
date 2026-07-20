"use client"

import Image from "next/image"

interface DatacenterBannerProps {
  companyName: string
  className?: string
}

export function DatacenterBanner({ companyName, className }: DatacenterBannerProps) {
  return (
    <div className={`relative w-full h-48 md:h-64 overflow-hidden bg-white border border-slate-100 ${className}`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/img/metta-dc-portal-banner.png"
          alt="Portal Banner"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="absolute bottom-6 left-6 md:left-10 z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg inline-block">
          {companyName}
        </h1>
        <div className="mt-2">
          <p className="text-slate-800 font-medium text-sm md:text-base bg-white/80 backdrop-blur-sm px-4 py-1 rounded-lg inline-block">
            Secure, Reliable, and High-Performance Infrastructure
          </p>
        </div>
      </div>
    </div>
  )
}
