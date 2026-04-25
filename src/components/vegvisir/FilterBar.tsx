// src/components/vegvisir/FilterBar.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    FILTER BAR COMPONENT                                   ║
// ║                    Filter controls with multiple options                  ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/yggdrasil/Button";

// ─── Types ─────────────────────────────────────────────────────────────────
import type {
  FilterBarProps,
  FilterOption,
} from "@/types/components/vegvisir/filter_bar.types";

// ─── Utilities ─────────────────────────────────────────────────────────────────
import {
  isAllSelected,
  isOptionSelected,
  hasFilterCount,
  formatFilterCount,
} from "@/lib/utils/components/vegvisir/filter_bar.utils";

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  FILTER_BAR_DEFAULT_ALL_LABEL,
  FILTER_BAR_DEFAULT_SHOW_ALL,
} from "@/lib/constants/components/vegvisir/filter_bar.constants";

// ─── Variants ──────────────────────────────────────────────────────────────
import {
  filterBarContainerVariants,
  filterBarCountVariants,
} from "@/lib/constants/components/vegvisir/filter_bar.variants";

// ═══════════════════════════════════════════════════════════════════════════
// FILTER BAR
// ═══════════════════════════════════════════════════════════════════════════

/**
 * FilterBar — A row of toggle buttons for filtering content.
 *
 * Composes Button components with active/inactive variant toggling.
 * Supports an optional "All" button, count badges, and density/alignment variants.
 *
 * @example
 * <FilterBar
 *   options={[
 *     { id: "quantum", label: "Quantum", count: 12 },
 *     { id: "cosmic", label: "Cosmic", count: 5 },
 *   ]}
 *   selectedId={selectedFilter}
 *   onSelect={setSelectedFilter}
 *   density="default"
 *   align="start"
 * />
 */
export function FilterBar({
  options,
  selectedId,
  onSelect,
  showAll = FILTER_BAR_DEFAULT_SHOW_ALL,
  allLabel = FILTER_BAR_DEFAULT_ALL_LABEL,
  density = "default",
  align = "start",
  countPosition = "inline",
  className,
}: FilterBarProps) {
  const containerClass = filterBarContainerVariants({ density, align });

  return (
    <div className={cn(containerClass, className)}>
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
        <FilterButton
          key={option.id}
          option={option}
          isSelected={selectedId === option.id}
          onSelect={onSelect}
          countPosition={countPosition}
        />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// FILTER BUTTON (Internal)
// ═══════════════════════════════════════════════════════════════════════════

interface FilterButtonProps {
  option: FilterOption;
  isSelected: boolean;
  onSelect: (id: string | null) => void;
  countPosition: NonNullable<
    Parameters<typeof filterBarCountVariants>[0]
  >['position'];
}

function FilterButton({
  option,
  isSelected,
  onSelect,
  countPosition,
}: FilterButtonProps) {
  const countClass = filterBarCountVariants({ position: countPosition });

  return (
    <Button
      variant={isSelected ? "primary" : "outline"}
      size="sm"
      onClick={() => onSelect(option.id)}
    >
      {option.label}
      {hasFilterCount(option) && (
        <span className={cn(countClass)}>
          {formatFilterCount(option.count)}
        </span>
      )}
    </Button>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

export type {
  FilterBarProps,
  FilterOption,
  FilterBarDensity,
  FilterBarAlign,
  FilterBarCountPosition,
} from "@/types/components/vegvisir/filter_bar.types";