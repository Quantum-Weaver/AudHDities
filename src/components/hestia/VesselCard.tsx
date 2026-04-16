// @/components/hestia/VesselCard.tsx
// User profile summary card

"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card } from "@/components/shared/UnifiedCard";
import { Button } from "@/components/ui/Button";
import type { PublicProfiles } from "@/types/generated/hestia-core/profiles";

export interface VesselCardProps {
  user?: PublicProfiles | null;
  className?: string;
}

export function VesselCard({ user, className }: VesselCardProps) {
  if (!user) {
    return (
      <Card className={cn("text-center", className)}>
        <div className="mb-4">
          <div className="w-20 h-20 mx-auto rounded-full bg-white/10 flex items-center justify-center">
            <span className="text-3xl">✨</span>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-white mb-1">Welcome, Traveler</h3>
        <p className="text-white/60 text-sm mb-4">Sign in to continue your journey</p>
        <Link href="/enter">
          <Button size="sm">Enter Sanctuary</Button>
        </Link>
      </Card>
    );
  }

  return (
    <Card className={cn("text-center", className)}>
      <div className="mb-4">
        {user.avatar_url ? (
          <Image
            src={user.avatar_url}
            alt={user.display_name || user.username || "Avatar"}
            width={80}
            height={80}
            className="rounded-full mx-auto object-cover"
          />
        ) : (
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
            <span className="text-3xl">
              {(user.display_name?.[0] || user.username?.[0] || "✨").toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <h3 className="text-lg font-semibold text-white mb-1">
        {user.display_name || user.username || "Quantum Weaver"}
      </h3>
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 text-xs rounded-full capitalize">
          {user.user_tier || "community"}
        </span>
        {user.primary_house && (
          <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs rounded-full capitalize">
            {user.primary_house.replace("_", " ")}
          </span>
        )}
      </div>
      {user.bio && (
        <p className="text-white/60 text-sm line-clamp-2 mb-4">{user.bio}</p>
      )}
      <Link href="/vessel">
        <Button variant="outline" size="sm" className="w-full">
          View Vessel
        </Button>
      </Link>
    </Card>
  );
}