// @/components/seidr/immersive/StatusBar.tsx
"use client";

import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";
import { getPageMetadata } from "@/lib/constants/systems/environments/page_mapping";
import { HStack } from "@/components/hof/Stack";
import { cn } from "@/lib/utils";
import { Shield, Zap, Bell, Compass } from "lucide-react";

export interface StatusBarProps {
  className?: string;
}

export function StatusBar({ className }: StatusBarProps) {
  const { profile } = useAuth();
  const pathname = usePathname();
  const metadata = getPageMetadata(pathname);

  const sovereigntyScore = profile?.sovereignty_score ?? 0;
  const sovereigntyPercent = Math.min(100, Math.round((sovereigntyScore / 1000) * 100));

  return (
    <div className={cn(
      "w-full bg-deep-space/40 backdrop-blur-sm border-b border-white/5",
      "h-7 px-4 flex items-center justify-between text-[11px]",
      className
    )}>
      {/* Left: Realm */}
      <HStack align="center" space="sm">
        <Compass className="h-3 w-3 text-star-dust/40" />
        <span className="text-star-dust/50">{metadata.title}</span>
      </HStack>

      {/* Right: Personal Metrics */}
      <HStack align="center" space="md">
        {/* Sovereignty */}
        <HStack align="center" space="xs">
          <Shield className="h-3 w-3 text-neurospark" />
          <span className="text-neurospark font-medium">{sovereigntyScore.toLocaleString()}</span>
          <span className="text-star-dust/30">/ 1000</span>
        </HStack>

        {/* Energy — last logged */}
        {profile?.last_active && (
          <HStack align="center" space="xs">
            <Zap className="h-3 w-3 text-amber-400" />
            <span className="text-star-dust/50">Active</span>
          </HStack>
        )}

        {/* Notifications placeholder */}
        <Bell className="h-3 w-3 text-star-dust/30" />
      </HStack>
    </div>
  );
}