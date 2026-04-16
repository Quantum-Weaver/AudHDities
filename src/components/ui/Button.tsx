// @/components/ui/Button.tsx
// NEUTRAL BUTTON FOUNDATION
// No variants, no assumptions, no opinions.
// Variants will be passed from the design system via className.

"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"

export interface ButtonProps extends ButtonPrimitive.Props {
  /** Additional CSS classes (variants come from design system) */
  className?: string
}

/**
 * Neutral Button Component
 * 
 * This is the pure, unopinionated foundation.
 * All styling (variants, sizes, animations) comes from:
 * - Tailwind classes passed via className
 * - Our design system's CSS variables
 * 
 * Usage:
 *   <Button className="bg-quantum-purple text-white rounded-lg px-4 py-2">
 *     Click me
 *   </Button>
 * 
 * With design system variant helpers (to be built):
 *   <Button className="btn-primary btn-lg">Click me</Button>
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <ButtonPrimitive
        ref={ref}
        data-slot="button"
        className={cn(
          // Base structural styles (no visual opinions)
          "inline-flex items-center justify-center",
          "select-none",
          "outline-none",
          "focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          "transition-all duration-200 ease-quantum",
          // All visual variants come from className
          className
        )}
        {...props}
      >
        {children}
      </ButtonPrimitive>
    )
  }
)

Button.displayName = "Button"

export { Button }