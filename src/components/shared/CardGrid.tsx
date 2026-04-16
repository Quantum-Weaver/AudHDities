// @/components/shared/CardGrid.tsx
// Responsive grid of cards

"use client";

import { cn } from "@/lib/utils";
import { Grid, type GridProps } from "@/components/layout/Grid";

export interface CardGridProps extends Omit<GridProps, "children"> {
  items: React.ReactNode[];
  emptyMessage?: string;
}

export function CardGrid({
  items,
  cols = 3,
  gap = 6,
  emptyMessage = "No items to display",
  className,
  ...props
}: CardGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-white/40">
        {emptyMessage}
      </div>
    );
  }

  return (
    <Grid cols={cols} gap={gap} className={cn(className)} {...props}>
      {items.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </Grid>
  );
}