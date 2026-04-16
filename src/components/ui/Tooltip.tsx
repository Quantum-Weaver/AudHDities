// src/components/ui/Tooltip.tsx
"use client";

import { forwardRef } from "react";
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { cn } from "@/lib/utils";
import { tooltipVariants, type TooltipVariant, type TooltipPlacement } from "@/lib/constants/components/ui/tooltip_variants";

export interface TooltipProps extends TooltipPrimitive.Root.Props {
  content: string;
  variant?: TooltipVariant;
  placement?: TooltipPlacement;
  delay?: number;
}

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ content, variant = "default", placement = "top", delay = 0, children, ...props }, ref) => {
    return (
      <TooltipPrimitive.Provider delay={delay}>
        <TooltipPrimitive.Root {...props}>
          <TooltipPrimitive.Trigger asChild>
            {children}
          </TooltipPrimitive.Trigger>
          <TooltipPrimitive.Portal>
            <TooltipPrimitive.Positioner
              side={placement}
              className="z-50"
            >
              <TooltipPrimitive.Popup
                ref={ref}
                className={cn(tooltipVariants({ variant, placement }))}
              >
                {content}
                <TooltipPrimitive.Arrow className="fill-current" />
              </TooltipPrimitive.Popup>
            </TooltipPrimitive.Positioner>
          </TooltipPrimitive.Portal>
        </TooltipPrimitive.Root>
      </TooltipPrimitive.Provider>
    );
  }
);

Tooltip.displayName = "Tooltip";

export { Tooltip };