// @/components/shared/SortDropdown.tsx
// Sort options dropdown

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export interface SortOption {
  id: string;
  label: string;
  defaultDirection?: "asc" | "desc";
}

export interface SortDropdownProps {
  options: SortOption[];
  value: string;
  direction: "asc" | "desc";
  onChange: (value: string, direction: "asc" | "desc") => void;
  className?: string;
}

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
    let newDirection = direction;
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
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        {currentOption.label}
        <span className="text-xs">
          {direction === "asc" ? "↑" : "↓"}
        </span>
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-1 z-20 bg-surface border border-white/10 rounded-lg overflow-hidden min-w-[160px]">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelect(option)}
                className={cn(
                  "w-full px-4 py-2 text-left text-sm hover:bg-white/5 transition-colors",
                  value === option.id && "text-cyan-400"
                )}
              >
                {option.label}
                {value === option.id && (
                  <span className="ml-2 text-xs">
                    {direction === "asc" ? "↑" : "↓"}
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