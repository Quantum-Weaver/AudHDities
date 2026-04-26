// components/cosmic/ColorPalette.tsx
// Displays color palette for an environment
// FULLY INTEGRATED with cosmic colors system

"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { QUANTUM_COLORS, DOMAIN_COLORS, MOOD_COLORS } from "@/lib/constants/cosmic/colors";

interface ColorPaletteProps {
  colors: string[];
  className?: string;
}

// Map color names directly to QUANTUM_COLORS keys
const colorKeyMap: Record<string, string> = {
  // Core brand colors
  "Deep Purple": "quantum.purple",
  "Gold": "hearth.gold",
  "Amber": "hearth.gold",  // Fallback to hearth.gold
  "Nebula Blue": "cosmic.blue",
  "Royal Purple": "quantum.dark",
  "Silver": "void.light",
  "Obsidian": "surface",
  "Emerald": "sanctuary.green",
  "Sapphire": "cosmic.light",
  "Ruby": "fire.base",
  
  // Library theme colors
  "Warm Wood": "pagan.earth",
  "Obsidian Black": "deepSpace",
  "Crystal Cyan": "neurospark",
  "Parchment Gold": "hearth.gold",
  
  // Community theme colors
  "Warm Orange": "fire.base",
  "Deep Blue": "cosmic.dark",
  "Purple": "quantum.purple",
  "Wood Tone": "pagan.earth",
  "Neon Cyan": "neurospark",
  
  // Music theme colors
  "Cyan": "neurospark",
  "Violet": "mood.creative",
  "Electric Blue": "cosmic.light",
  "Cyan Blue": "cosmic.blue",
  
  // Support theme colors
  "Deep Indigo": "entity.aethelred",
  "Warm Gold": "hearth.gold",
  "Soft Purple": "quantum.light",
  "Healing Green": "sanctuary.emerald",
  
  // Observatory theme colors
  "Deep Night Blue": "deepSpace",
  "Purple Aurora": "mood.mystical",
  
  // Architecture theme colors
  "Deep Teal": "library.dark",
  "Glowing Cyan": "neurospark",
  "Rich Purple": "quantum.dark",
  "Emerald Green": "sanctuary.green",
};

function getColorHex(colorName: string): string {
  const key = colorKeyMap[colorName];
  if (key && QUANTUM_COLORS[key as keyof typeof QUANTUM_COLORS]) {
    return QUANTUM_COLORS[key as keyof typeof QUANTUM_COLORS];
  }
  
  // Fallback: try to find by partial match
  for (const [mapKey, mapValue] of Object.entries(colorKeyMap)) {
    if (colorName.toLowerCase().includes(mapKey.toLowerCase())) {
      return QUANTUM_COLORS[mapValue as keyof typeof QUANTUM_COLORS];
    }
  }
  
  // Default fallback
  return QUANTUM_COLORS['quantum.purple'];
}

function getTextColor(hex: string): string {
  // Simple contrast check - if hex is dark, return white, else dark
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? QUANTUM_COLORS['deepSpace'] : QUANTUM_COLORS['starDust'];
}

export function ColorPalette({ colors, className }: ColorPaletteProps) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const handleCopy = (colorName: string, hexValue: string) => {
    navigator.clipboard.writeText(hexValue);
    setCopiedColor(colorName);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  // Filter out any undefined or empty colors
  const validColors = colors.filter(c => c && c.trim());

  if (validColors.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <span>🎨</span>
        Color Palette
      </h3>
      <div className="space-y-3">
        {validColors.map((color) => {
          const hexValue = getColorHex(color);
          const textColor = getTextColor(hexValue);
          const isCopied = copiedColor === color;
          
          return (
            <button
              key={color}
              onClick={() => handleCopy(color, hexValue)}
              className="w-full group relative rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-neurospark"
            >
              <div 
                className="flex items-center justify-between p-3"
                style={{ backgroundColor: hexValue }}
              >
                <span 
                  className="font-medium text-sm"
                  style={{ color: textColor }}
                >
                  {color}
                </span>
                <div className="flex items-center gap-2">
                  <span 
                    className="font-mono text-xs opacity-80"
                    style={{ color: textColor }}
                  >
                    {hexValue.toUpperCase()}
                  </span>
                  {isCopied ? (
                    <Check 
                      size={16} 
                      className="text-green-400" 
                      style={{ color: textColor }}
                    />
                  ) : (
                    <Copy 
                      size={16} 
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: textColor }}
                    />
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
      <p className="text-xs text-white/40 mt-2 text-center">
        Click any color to copy its hex value
      </p>
    </div>
  );
}