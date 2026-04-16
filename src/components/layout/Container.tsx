// @/components/layout/Container.tsx
// Max-width container with responsive padding

"use client"

import { cn } from "@/lib/utils"

export interface ContainerProps {
  /** Max width constraint */
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full"
  /** Horizontal padding */
  padding?: boolean
  /** Center horizontally */
  centered?: boolean
  /** Additional classes */
  className?: string
  children: React.ReactNode
}

const maxWidthMap = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  full: "max-w-full",
}

export function Container({
  maxWidth = "xl",
  padding = true,
  centered = true,
  className,
  children,
}: ContainerProps) {
  return (
    <div
      className={cn(
        maxWidthMap[maxWidth],
        padding && "px-4 sm:px-6 lg:px-8",
        centered && "mx-auto",
        className
      )}
    >
      {children}
    </div>
  )
}