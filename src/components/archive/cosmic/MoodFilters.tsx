// components/cosmic/MoodFilters.tsx
// Filter environments by mood

"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { DOMAIN_COLORS, MOOD_COLORS } from "@/lib/constants/cosmic/colors";

export interface MoodFiltersProps {
  moods: string[];
  className?: string;
}

// Map moods to colors
const getMoodStyle = (mood: string, isSelected: boolean): string => {
  const colorMap: Record<string, string> = {
    'Warm': MOOD_COLORS.energized,
    'Sacred': MOOD_COLORS.mystical,
    'Peaceful': MOOD_COLORS.calm,
    'Energetic': MOOD_COLORS.energized,
    'Healing': MOOD_COLORS.peaceful,
    'Cosmic': DOMAIN_COLORS.cosmic.base,
    'Intimate': MOOD_COLORS.calm,
    'Professional': DOMAIN_COLORS.architecture.base,
  };
  const color = colorMap[mood] || DOMAIN_COLORS.quantum.base;
  
  if (isSelected) {
    return `bg-[${color}]/20 text-[${color}] border-[${color}]/50`;
  }
  return "bg-white/5 text-star-dust/60 hover:bg-white/10 border-transparent";
};

export function MoodFilters({ moods, className }: MoodFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedMood, setSelectedMood] = useState<string | null>(
    searchParams?.get('mood') || null
  );

  const handleMoodClick = (mood: string) => {
    const newMood = selectedMood === mood ? null : mood;
    setSelectedMood(newMood);
    
    const params = new URLSearchParams(searchParams?.toString() || '');
    if (newMood) {
      params.set('mood', newMood);
    } else {
      params.delete('mood');
    }
    
    router.push(`/environments?${params.toString()}`);
  };

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <button
        onClick={() => handleMoodClick('')}
        className={cn(
          "px-3 py-1.5 rounded-full text-sm transition-all duration-200",
          !selectedMood
            ? "bg-quantum-purple text-star-dust"
            : "bg-white/5 text-star-dust/60 hover:bg-white/10"
        )}
      >
        All
      </button>
      {moods.map((mood) => (
        <button
          key={mood}
          onClick={() => handleMoodClick(mood)}
          className={cn(
            "px-3 py-1.5 rounded-full text-sm transition-all duration-200 border",
            selectedMood === mood
              ? getMoodStyle(mood, true)
              : "bg-white/5 text-star-dust/60 hover:bg-white/10 border-transparent"
          )}
        >
          {mood}
        </button>
      ))}
    </div>
  );
}