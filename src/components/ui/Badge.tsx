// src/components/ui/Badge.tsx
"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { badgeVariants, type BadgeVariant, type BadgeSize } from "@/lib/constants/components/ui/badge_variants";

export interface BadgeProps extends React.ComponentProps<"span"> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "default", size = "md", className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };