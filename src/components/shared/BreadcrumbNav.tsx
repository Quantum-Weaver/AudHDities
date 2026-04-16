// @/components/shared/BreadcrumbNav.tsx
// Navigation path

"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  className?: string;
  separator?: React.ReactNode;
}

export function BreadcrumbNav({
  items,
  className,
  separator = "/",
}: BreadcrumbNavProps) {
  return (
    <nav className={cn("flex flex-wrap items-center text-sm", className)}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && (
            <span className="mx-2 text-white/40">{separator}</span>
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="text-white/60 hover:text-cyan-400 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-white font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}