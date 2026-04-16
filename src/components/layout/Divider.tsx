// @/components/layout/Divider.tsx
// Visual separator

"use client"

import { cn } from "@/lib/utils"

export interface DividerProps {
  /** Orientation */
  orientation?: "horizontal" | "vertical"
  /** Variant */
  variant?: "light" | "dark" | "glow"
  /** Label text (optional, horizontal only) */
  label?: string
  /** Additional classes */
  className?: string
}

const variantMap = {
  light: "bg-white/10",
  dark: "bg-black/10",
  glow: "bg-gradient-to-r from-transparent via-quantum-purple to-transparent",
}

export function Divider({
  orientation = "horizontal",
  variant = "light",
  label,
  className,
}: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        className={cn(
          "w-px h-full",
          variantMap[variant],
          className
        )}
      />
    )
  }
  
  if (label) {
    return (
      <div className={cn("relative", className)}>
        <div className="absolute inset-0 flex items-center">
          <div className={cn("w-full h-px", variantMap[variant])} />
        </div>
        <div className="relative flex justify-center">
          <span className="px-4 bg-background text-sm text-white/40">
            {label}
          </span>
        </div>
      </div>
    )
  }
  
  return (
    <div
      className={cn(
        "w-full h-px",
        variantMap[variant],
        className
      )}
    />
  )
}