// @/components/shared/AspectRatio.tsx
// Maintain aspect ratio container

"use client"

import { cn } from "@/lib/utils"

export interface AspectRatioProps {
  /** Aspect ratio (e.g., 16/9, 4/3, 1/1) */
  ratio: number
  /** Additional classes */
  className?: string
  children: React.ReactNode
}

export function AspectRatio({
  ratio,
  className,
  children,
}: AspectRatioProps) {
  return (
    <div
      className={cn("relative w-full", className)}
      style={{ paddingBottom: `${(1 / ratio) * 100}%` }}
    >
      <div className="absolute inset-0">
        {children}
      </div>
    </div>
  )
}