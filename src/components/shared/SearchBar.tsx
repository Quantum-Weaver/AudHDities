// @/components/shared/SearchBar.tsx
// Search input with optional filters

"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  initialValue?: string;
  debounceMs?: number;
  className?: string;
}

export function SearchBar({
  placeholder = "Search...",
  onSearch,
  initialValue = "",
  debounceMs = 300,
  className,
}: SearchBarProps) {
  const [value, setValue] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearch = useCallback(
    (() => {
      let timeout: NodeJS.Timeout;
      return (query: string) => {
        clearTimeout(timeout);
        setIsLoading(true);
        timeout = setTimeout(() => {
          onSearch(query);
          setIsLoading(false);
        }, debounceMs);
      };
    })(),
    [onSearch, debounceMs]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedSearch(newValue);
  };

  const handleClear = () => {
    setValue("");
    onSearch("");
  };

  return (
    <div className={cn("relative", className)}>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="pr-20"
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
        {isLoading && (
          <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        )}
        {value && !isLoading && (
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={handleClear}
            aria-label="Clear search"
          >
            ✕
          </Button>
        )}
      </div>
    </div>
  );
}