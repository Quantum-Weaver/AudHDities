// components/cosmic/EffectGallery.tsx
// Effect gallery - displays available effects grouped by category

"use client";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { GLOW_EFFECTS, GRADIENTS } from "@/lib/constants/cosmic/effects";

export interface Effect {
  id: string;
  name: string;
  category: 'glow' | 'elemental' | 'particle' | 'gradient' | 'quantum';
  preview?: string;
}

export interface EffectGalleryProps {
  effects: Effect[];
  selected: string;
  onSelect: (id: string) => void;
  className?: string;
}

const categoryLabels: Record<Effect['category'], string> = {
  glow: 'Glow Effects',
  elemental: 'Elemental Magic',
  particle: 'Particle Systems',
  gradient: 'Gradients',
  quantum: 'Quantum Effects',
};

// Map effect IDs to cosmic system values for preview
const effectPreviewStyles: Record<string, string> = {
  'quantum-glow': GLOW_EFFECTS.quantum,
  'cosmic-sparkle': GLOW_EFFECTS.cosmic,
  'fire-flicker': GLOW_EFFECTS.fire,
  'quantum-entanglement': GLOW_EFFECTS.quantum,
  'rainbow-flow': GRADIENTS.prideRainbow,
  'stardust-float': GLOW_EFFECTS.neurospark,
};

export function EffectGallery({ effects, selected, onSelect, className }: EffectGalleryProps) {
  const grouped = effects.reduce((acc, effect) => {
    if (!acc[effect.category]) acc[effect.category] = [];
    acc[effect.category].push(effect);
    return acc;
  }, {} as Record<Effect['category'], Effect[]>);

  return (
    <div className={cn("space-y-6", className)}>
      {Object.entries(grouped).map(([category, categoryEffects]) => (
        <div key={category}>
          <h3 className="text-sm font-medium text-white/60 mb-3">
            {categoryLabels[category as Effect['category']]}
          </h3>
          <div className="space-y-2">
            {categoryEffects.map((effect) => (
              <button
                key={effect.id}
                onClick={() => onSelect(effect.id)}
                className={cn(
                  "w-full text-left p-3 rounded-lg transition-all duration-200",
                  selected === effect.id
                    ? "bg-quantum-purple/20 border border-quantum-purple/50 shadow-lg shadow-quantum-purple/10"
                    : "bg-white/5 hover:bg-white/10 border border-transparent"
                )}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-white">
                    {effect.name}
                  </span>
                  <Badge 
                    variant="outline" 
                    size="sm"
                    className="text-quantum-purple/80 border-quantum-purple/30 text-[10px]"
                  >
                    {category}
                  </Badge>
                </div>
                <div 
                  className="h-8 w-full rounded-md mt-2"
                  style={{
                    boxShadow: effectPreviewStyles[effect.id] || GLOW_EFFECTS.quantum,
                    background: effectPreviewStyles[effect.id]?.includes('linear-gradient') 
                      ? effectPreviewStyles[effect.id] 
                      : undefined,
                    backgroundColor: !effectPreviewStyles[effect.id]?.includes('linear-gradient')
                      ? 'rgba(108, 92, 231, 0.2)'
                      : undefined,
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}