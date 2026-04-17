// src/components/cosmic/FavoriteEffectsGallery.tsx
// FavoriteEffectsGallery - Display user's saved effects

"use client";

import { useState, useEffect } from "react";
import { EffectGallery, type Effect } from "./EffectGallery";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const ALL_EFFECTS: Effect[] = [
  { id: 'quantum-glow', name: 'Quantum Glow', category: 'glow' },
  { id: 'fire-flicker', name: 'Fire Flicker', category: 'elemental' },
  { id: 'cosmic-sparkle', name: 'Cosmic Sparkle', category: 'particle' },
  { id: 'rainbow-flow', name: 'Rainbow Flow', category: 'gradient' },
  { id: 'quantum-entanglement', name: 'Quantum Entanglement', category: 'quantum' },
  { id: 'stardust-float', name: 'Stardust Float', category: 'particle' },
];

export interface FavoriteEffectsGalleryProps {
  onSelect?: (id: string) => void;
  selected?: string;
  className?: string;
}

export function FavoriteEffectsGallery({ onSelect, selected, className }: FavoriteEffectsGalleryProps) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorite-effects") || "[]");
    setFavoriteIds(favorites);
  }, []);

  const favoriteEffects = ALL_EFFECTS.filter(e => favoriteIds.includes(e.id));

  if (favoriteEffects.length === 0) {
    return (
      <div className={cn("p-6 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 text-center", className)}>
        <Heart className="w-8 h-8 text-white/20 mx-auto mb-3" />
        <p className="text-white/40 text-sm">No saved effects yet</p>
        <p className="text-white/30 text-xs mt-1">Click the heart on any effect to save it</p>
      </div>
    );
  }

  return (
    <EffectGallery
      effects={favoriteEffects}
      selected={selected || ""}
      onSelect={(id) => onSelect?.(id)}
      className={className}
    />
  );
}