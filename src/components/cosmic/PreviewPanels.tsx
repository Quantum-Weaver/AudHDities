// components/cosmic/PreviewPanels.tsx
// Preview panels for environment details (placeholder - can be expanded)

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { DOMAIN_COLORS } from "@/lib/constants/cosmic/colors";

export interface PreviewPanelsProps {
  className?: string;
}

// Sample data - would come from selected environment
const sampleMood = ['Warm', 'Welcoming', 'Mystical', 'Sacred'];
const sampleColors = ['#6C5CE7', '#FDCB6E', '#00B894', '#22D3EE'];

export function PreviewPanels({ className }: PreviewPanelsProps) {
  const [activeTab, setActiveTab] = useState<'mood' | 'colors' | 'themes'>('mood');

  return (
    <Card className={cn("p-4", className)}>
      <div className="flex gap-2 mb-4 border-b border-white/10">
        <button
          onClick={() => setActiveTab('mood')}
          className={cn(
            "px-3 py-2 text-sm transition-colors",
            activeTab === 'mood' 
              ? "text-cyan-400 border-b-2 border-cyan-400" 
              : "text-white/40 hover:text-white/60"
          )}
        >
          Mood
        </button>
        <button
          onClick={() => setActiveTab('colors')}
          className={cn(
            "px-3 py-2 text-sm transition-colors",
            activeTab === 'colors' 
              ? "text-cyan-400 border-b-2 border-cyan-400" 
              : "text-white/40 hover:text-white/60"
          )}
        >
          Colors
        </button>
        <button
          onClick={() => setActiveTab('themes')}
          className={cn(
            "px-3 py-2 text-sm transition-colors",
            activeTab === 'themes' 
              ? "text-cyan-400 border-b-2 border-cyan-400" 
              : "text-white/40 hover:text-white/60"
          )}
        >
          Themes
        </button>
      </div>

      <div className="min-h-[100px]">
        {activeTab === 'mood' && (
          <div className="flex flex-wrap gap-2">
            {sampleMood.map((mood) => (
              <Badge key={mood} variant="outline" className="text-cyan-400 border-cyan-400/30">
                {mood}
              </Badge>
            ))}
          </div>
        )}

        {activeTab === 'colors' && (
          <div className="flex gap-3">
            {sampleColors.map((color) => (
              <div key={color} className="text-center">
                <div 
                  className="w-12 h-12 rounded-full mb-2 border border-white/20"
                  style={{ backgroundColor: color }}
                />
                <span className="text-xs text-white/40">{color}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'themes' && (
          <div className="space-y-2">
            <p className="text-sm text-white/60">Home · Origin · Gathering · Sanctuary</p>
            <p className="text-xs text-white/40">This environment resonates with themes of belonging, beginnings, community, and sacred space.</p>
          </div>
        )}
      </div>
    </Card>
  );
}