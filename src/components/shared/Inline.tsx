// @/components/shared/Inline.tsx
// Horizontal spacing utility

"use client"

import { cn } from "@/lib/utils"

export interface InlineProps {
  /** Space between children (in rem, based on spacing scale) */
  space?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16
  /** Horizontal alignment */
  align?: "start" | "center" | "end" | "between" | "around" | "evenly"
  /** Wrap on mobile */
  wrap?: boolean
  /** Additional classes */
  className?: string
  children: React.ReactNode
}

const spaceMap: Record<number, string> = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
  16: "gap-16",
}

const alignMap = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
}

export function Inline({
  space = 4,
  align = "start",
  wrap = true,
  className,
  children,
}: InlineProps) {
  return (
    <div
      className={cn(
        "flex flex-row",
        spaceMap[space],
        alignMap[align],
        wrap && "flex-wrap",
        className
      )}
    >
      {children}
    </div>
  )
}