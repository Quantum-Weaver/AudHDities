// @/components/shared/Card.tsx
// Base card with variants

"use client";

import { cn } from "@/lib/utils";
import { forwardRef, type HTMLAttributes } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "interactive" | "glass" | "glow";
  padding?: "none" | "sm" | "md" | "lg";
}

const variantClasses = {
  default: "bg-white/5 border border-white/10",
  interactive: "bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all",
  glass: "bg-white/5 backdrop-blur-md border border-white/10",
  glow: "bg-white/5 border border-cyan-500/30 shadow-lg shadow-cyan-500/10",
};

const paddingClasses = {
  none: "p-0",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "default", padding = "md", className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl overflow-hidden",
          variantClasses[variant],
          paddingClasses[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";