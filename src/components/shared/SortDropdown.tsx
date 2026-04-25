// src/components/shared/SortDropdown.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SORT DROPDOWN COMPONENT                                 ║
// ║                    Sort options dropdown selector                           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

// ─── Types ─────────────────────────────────────────────────────────────────
import type {
  SortOption,
  SortDropdownProps,
  SortDirection,
} from "@/types/components/shared/sort_dropdown.types";

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  SORT_DROPDOWN_Z_INDEX,
  SORT_DROPDOWN_SPACING,
  SORT_DROPDOWN_RADIUS,
  SORT_DIRECTION,
  SORT_DROPDOWN_TRIGGER_VARIANT,
  SORT_DROPDOWN_TRIGGER_SIZE,
  SORT_DROPDOWN_TYPOGRAPHY,
} from "@/lib/constants/components/vegvisir/sort_dropdown.constants";

// ─── Variants ──────────────────────────────────────────────────────────────
import {
  sortDropdownOptionVariants,
} from "@/lib/constants/components/vegvisir/sort_dropdown.variants";

/**
 * SortDropdown — A dropdown selector for sort options with direction toggle.
 *
 * Clicking the currently-selected option toggles direction.
 * Clicking a different option selects it with its default direction.
 *
 * @example
 * <SortDropdown
 *   options={[
 *     { id: 'name', label: 'Name' },
 *     { id: 'date', label: 'Date', defaultDirection: 'desc' },
 *   ]}
 *   value={sort}
 *   direction={dir}
 *   onChange={(v, d) => { setSort(v); setDir(d); }}
 * />
 */
export function SortDropdown({
  options,
  value,
  direction,
  onChange,
  className,
}: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const currentOption = options.find((o) => o.id === value) || options[0];

  const handleSelect = (option: SortOption) => {
    let newDirection: SortDirection = direction;
    if (option.id === value) {
      newDirection = direction === "asc" ? "desc" : "asc";
    } else {
      newDirection = option.defaultDirection || "asc";
    }
    onChange(option.id, newDirection);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative", className)}>
      <Button
        variant={SORT_DROPDOWN_TRIGGER_VARIANT}
        size={SORT_DROPDOWN_TRIGGER_SIZE}
        onClick={() => setIsOpen(!isOpen)}
        className={cn("flex items-center", SORT_DROPDOWN_SPACING.TRIGGER_GAP)}
      >
        {currentOption.label}
        <span className={SORT_DROPDOWN_TYPOGRAPHY.DIRECTION_INDICATOR}>
          {direction === "asc" ? SORT_DIRECTION.ASC : SORT_DIRECTION.DESC}
        </span>
      </Button>

      {isOpen && (
        <>
          <div
            className={cn("fixed inset-0", SORT_DROPDOWN_Z_INDEX.OVERLAY)}
            onClick={() => setIsOpen(false)}
          />
          <div
            className={cn(
              "absolute right-0 top-full",
              SORT_DROPDOWN_SPACING.DROPDOWN_OFFSET,
              SORT_DROPDOWN_Z_INDEX.DROPDOWN,
              "bg-surface border border-white/10",
              SORT_DROPDOWN_RADIUS,
              "overflow-hidden min-w-[160px]"
            )}
          >
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelect(option)}
                className={sortDropdownOptionVariants({
                  active: value === option.id,
                })}
              >
                {option.label}
                {value === option.id && (
                  <span
                    className={cn(
                      SORT_DROPDOWN_SPACING.ACTIVE_INDICATOR_GAP,
                      SORT_DROPDOWN_TYPOGRAPHY.DIRECTION_INDICATOR
                    )}
                  >
                    {direction === "asc"
                      ? SORT_DIRECTION.ASC
                      : SORT_DIRECTION.DESC}
                  </span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}