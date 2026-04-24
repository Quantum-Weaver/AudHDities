// @/components/hestia/EnergyMeter.tsx
// Current energy level display

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { createClient } from "@/lib/supabase/client";

export interface EnergyMeterProps {
  userId?: string;
  className?: string;
}

export function EnergyMeter({ userId, className }: EnergyMeterProps) {
  const [energy, setEnergy] = useState(75);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    const fetchEnergy = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("energy_entries")
        .select("energy_level")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (data?.energy_level) {
        setEnergy(data.energy_level);
      }
      setIsLoading(false);
    };

    fetchEnergy();
  }, [userId]);

  const getColor = () => {
    if (energy >= 70) return "from-green-500 to-emerald-500";
    if (energy >= 40) return "from-yellow-500 to-orange-500";
    return "from-red-500 to-orange-500";
  };

  const getLabel = () => {
    if (energy >= 70) return "High Energy";
    if (energy >= 40) return "Medium Energy";
    return "Low Energy";
  };

  if (isLoading) {
    return (
      <Card className={cn("p-4", className)}>
        <div className="h-16 animate-pulse bg-white/5 rounded" />
      </Card>
    );
  }

  return (
    <Card className={cn("p-4", className)}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-white/60">Energy Level</span>
        <span className="text-sm font-medium text-white">{energy}%</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
        <div
          className={cn("h-full rounded-full bg-gradient-to-r", getColor())}
          style={{ width: `${energy}%` }}
        />
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs text-white/40">{getLabel()}</span>
        <Link href="/vessel/energy" className="text-xs text-cyan-400 hover:underline">
          Log Energy
        </Link>
      </div>
    </Card>
  );
}