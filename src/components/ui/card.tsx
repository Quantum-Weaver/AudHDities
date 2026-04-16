// src/components/ui/Card.tsx
"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { cardVariants, type CardVariant, type CardSize } from "@/lib/constants/components/ui/card_variants";

export interface CardProps extends React.ComponentProps<"div"> {
  variant?: CardVariant;
  size?: CardSize;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "default", size = "md", className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, size }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export { Card };