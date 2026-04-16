// @/components/hestia/QuickActions.tsx
// Common action buttons

"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card } from "@/components/shared/UnifiedCard";
import { useAuth } from "@/hooks/core/useAuth";

export interface QuickActionsProps {
  className?: string;
}

const actions = [
  { icon: "📝", label: "Journal", href: "/vessel/journal", color: "from-cyan-500 to-blue-500" },
  { icon: "🎨", label: "Create", href: "/studio", color: "from-purple-500 to-pink-500" },
  { icon: "🔍", label: "Discover", href: "/bazaar", color: "from-emerald-500 to-teal-500" },
  { icon: "📚", label: "Learn", href: "/library", color: "from-orange-500 to-red-500" },
  { icon: "💬", label: "Connect", href: "/connect", color: "from-indigo-500 to-purple-500" },
  { icon: "⚡", label: "Energy", href: "/vessel/energy", color: "from-yellow-500 to-orange-500" },
];

export function QuickActions({ className }: QuickActionsProps) {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Card className={cn("p-4", className)}>
      <h3 className="text-sm font-medium text-white/60 mb-3">Quick Actions</h3>
      <div className="grid grid-cols-3 gap-3">
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="group flex flex-col items-center gap-2 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <span className="text-2xl">{action.icon}</span>
            <span className="text-xs text-white/60 group-hover:text-white transition-colors">
              {action.label}
            </span>
          </Link>
        ))}
      </div>
    </Card>
  );
}