// @/components/shared/FilterBar.tsx
// Filter controls with multiple options

"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

export interface FilterBarProps {
  options: FilterOption[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  showAll?: boolean;
  allLabel?: string;
  className?: string;
}

export function FilterBar({
  options,
  selectedId,
  onSelect,
  showAll = true,
  allLabel = "All",
  className,
}: FilterBarProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {showAll && (
        <Button
          variant={selectedId === null ? "primary" : "outline"}
          size="sm"
          onClick={() => onSelect(null)}
        >
          {allLabel}
        </Button>
      )}
      {options.map((option) => (
        <Button
          key={option.id}
          variant={selectedId === option.id ? "primary" : "outline"}
          size="sm"
          onClick={() => onSelect(option.id)}
        >
          {option.label}
          {option.count !== undefined && (
            <span className="ml-1 text-xs opacity-70">({option.count})</span>
          )}
        </Button>
      ))}
    </div>
  );
}