// src/components/shared/SearchBar.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    SEARCHBAR COMPONENT                                    ║
// ║                    Search input with optional filters                     ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

// ─── Types ─────────────────────────────────────────────────────────────────
import type { SearchBarProps } from "@/types/components/shared/searchbar.types";

// ─── Constants ─────────────────────────────────────────────────────────────
import {
  SEARCHBAR_DEFAULT_PLACEHOLDER,
  SEARCHBAR_DEFAULT_DEBOUNCE_MS,
  SEARCHBAR_SPINNER_SIZE,
  SEARCHBAR_INPUT_RIGHT_PADDING,
  SEARCHBAR_ACTIONS_POSITION,
  SEARCHBAR_SPINNER_CLASSES,
  SEARCHBAR_CLEAR_LABEL,
  SEARCHBAR_CLEAR_ARIA_LABEL,
} from "@/lib/constants/components/shared/searchbar.constants";

// ─── Variants ──────────────────────────────────────────────────────────────
import {
  searchbarContainerVariants,
  searchbarInputVariants,
  searchbarSpinnerVariants,
} from "@/lib/constants/components/shared/searchbar.variants";

// ─── Utilities ─────────────────────────────────────────────────────────────
import { createDebouncedSearch } from "@/utils/components/shared/searchbar.utils";

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function SearchBar({
  placeholder = SEARCHBAR_DEFAULT_PLACEHOLDER,
  onSearch,
  initialValue = "",
  debounceMs = SEARCHBAR_DEFAULT_DEBOUNCE_MS,
  className,
  density = "default",
  width = "default",
  theme = "default",
  size = "default",
  spinnerTheme = "default",
}: SearchBarProps) {
  const [value, setValue] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof createDebouncedSearch<[string]>> | null>(null);

  // Initialize debounced search
  useEffect(() => {
    const debounced = createDebouncedSearch((query: string) => {
      onSearch(query);
      setIsLoading(false);
    }, debounceMs);

    debounceRef.current = debounced;

    return () => {
      debounced.cancel();
    };
  }, [onSearch, debounceMs]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setIsLoading(true);
    debounceRef.current?.invoke(newValue);
  };

  const handleClear = () => {
    setValue("");
    setIsLoading(false);
    debounceRef.current?.cancel();
    onSearch("");
  };

  const containerClass = searchbarContainerVariants({ density, width });
  const inputThemeClass = searchbarInputVariants({ theme, size });

  return (
    <div className={cn(containerClass, className)}>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={cn(SEARCHBAR_INPUT_RIGHT_PADDING, inputThemeClass)}
      />
      <div className={SEARCHBAR_ACTIONS_POSITION.CONTAINER}>
        <div className={cn('flex', SEARCHBAR_ACTIONS_POSITION.GAP)}>
          {isLoading && (
            <div
              className={cn(
                SEARCHBAR_SPINNER_SIZE,
                ...SEARCHBAR_SPINNER_CLASSES,
                searchbarSpinnerVariants({ theme: spinnerTheme })
              )}
            />
          )}
          {value && !isLoading && (
            <Button
              variant="ghost"
              size="xs"
              onClick={handleClear}
              aria-label={SEARCHBAR_CLEAR_ARIA_LABEL}
            >
              {SEARCHBAR_CLEAR_LABEL}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}