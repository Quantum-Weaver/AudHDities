// @/components/shared/LoadingSpinner.tsx
// Loading indicator

"use client";

import { cn } from "@/lib/utils";

export interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-4 h-4 border-2",
  md: "w-8 h-8 border-2",
  lg: "w-12 h-12 border-3",
};

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  return (
    <div className={cn("flex justify-center items-center", className)}>
      <div
        className={cn(
          "rounded-full border-cyan-500 border-t-transparent animate-spin",
          sizeClasses[size]
        )}
      />
    </div>
  );
}