// components/cosmic/ThemeTester.tsx
// Theme selection and preview

"use client";

import { cn } from "@/lib/utils";
import { Card } from "@/components/runes/cards/Card";
import { Badge } from "@/components/runes/Badge";
import { DOMAIN_COLORS, QUANTUM_COLORS } from "@/lib/constants/cosmic/colors";

export interface ThemeTesterProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
  className?: string;
}

const themes = [
  { id: 'quantum', name: 'Quantum', color: DOMAIN_COLORS.quantum.base, description: 'Purple energy, mystical' },
  { id: 'cosmic', name: 'Cosmic', color: DOMAIN_COLORS.cosmic.base, description: 'Blue depth, expansive' },
  { id: 'fire', name: 'Fire', color: DOMAIN_COLORS.pantheon.base, description: 'Orange warmth, intense' },
  { id: 'nature', name: 'Nature', color: DOMAIN_COLORS.library.base, description: 'Green growth, grounded' },
];

export function ThemeTester({ currentTheme, onThemeChange, className }: ThemeTesterProps) {
  return (
    <Card className={cn("p-4", className)}>
      <h3 className="text-sm font-medium text-star-dust/60 mb-3">Theme Tester</h3>
      <div className="space-y-3">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onThemeChange(theme.id)}
            className={cn(
              "w-full p-3 rounded-lg transition-all duration-200 text-left flex items-center gap-3",
              currentTheme === theme.id
                ? "bg-white/10 border border-white/20"
                : "bg-white/5 hover:bg-white/10"
            )}
          >
            <div 
              className="w-8 h-8 rounded-full"
              style={{ backgroundColor: theme.color }}
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-star-dust">{theme.name}</span>
                {currentTheme === theme.id && (
                  <Badge variant="quantum" size="sm" className="text-[10px]">Active</Badge>
                )}
              </div>
              <p className="text-xs text-star-dust/40">{theme.description}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Theme Preview Indicators */}
      <div className="mt-4 pt-3 border-t border-white/10">
        <p className="text-xs text-star-dust/30 mb-2">Theme Preview</p>
        <div className="flex gap-2">
          <div className="flex-1 h-2 rounded-full bg-quantum-purple/30 overflow-hidden">
            <div 
              className="h-full w-2/3 rounded-full"
              style={{ backgroundColor: themes.find(t => t.id === currentTheme)?.color }}
            />
          </div>
          <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
            <div 
              className="h-full w-1/2 rounded-full"
              style={{ backgroundColor: themes.find(t => t.id === currentTheme)?.color }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}