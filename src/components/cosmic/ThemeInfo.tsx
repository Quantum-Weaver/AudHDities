// components/cosmic/ThemeInfo.tsx
// Displays theme information for an environment

"use client";

import { cn } from "@/lib/utils";
import { Card } from "@/components/runes/cards/Card";
import { Badge } from "@/components/runes/Badge";
import { DOMAIN_COLORS, MOOD_COLORS } from "@/lib/constants/cosmic/colors";

export interface ThemeInfoProps {
  themes: string[];
  className?: string;
}

// Map themes to icons and colors
const themeConfig: Record<string, { icon: string; color: string; description: string }> = {
  'Home': { icon: '🏠', color: DOMAIN_COLORS.quantum.base, description: 'A place of belonging and warmth' },
  'Origin': { icon: '🌱', color: DOMAIN_COLORS.cosmic.base, description: 'Where your journey begins' },
  'Gathering': { icon: '🪶', color: DOMAIN_COLORS.community.base, description: 'Community and connection' },
  'Sanctuary': { icon: '🏛️', color: DOMAIN_COLORS.quantum.base, description: 'Sacred space for sovereignty' },
  'Council': { icon: '👑', color: DOMAIN_COLORS.council.base, description: 'Governance and collective wisdom' },
  'Governance': { icon: '⚖️', color: DOMAIN_COLORS.council.base, description: 'Decision-making and structure' },
  'Consciousness': { icon: '🧠', color: DOMAIN_COLORS.quantum.light, description: 'Awareness and presence' },
  'Unity': { icon: '🤝', color: DOMAIN_COLORS.bifrost.base, description: 'Connection across differences' },
  'Knowledge': { icon: '📚', color: DOMAIN_COLORS.library.base, description: 'Learning and wisdom' },
  'Memory': { icon: '💭', color: DOMAIN_COLORS.library.dark, description: 'Preservation and archive' },
  'Discovery': { icon: '🔍', color: DOMAIN_COLORS.cosmic.light, description: 'Exploration and finding' },
  'Archive': { icon: '🗄️', color: DOMAIN_COLORS.library.dark, description: 'Storage and preservation' },
  'Community': { icon: '👥', color: DOMAIN_COLORS.community.base, description: 'Shared experience and support' },
  'Connection': { icon: '🔗', color: DOMAIN_COLORS.bifrost.base, description: 'Bridges between beings' },
  'Play': { icon: '🎮', color: DOMAIN_COLORS.sandbox.base, description: 'Joy and recreation' },
  'Music': { icon: '🎵', color: DOMAIN_COLORS.music.base, description: 'Sound and expression' },
  'Creation': { icon: '✨', color: DOMAIN_COLORS.sandbox.base, description: 'Making and manifesting' },
  'Expression': { icon: '🎭', color: DOMAIN_COLORS.music.light, description: 'Voice and art' },
  'Vibration': { icon: '📳', color: DOMAIN_COLORS.music.dark, description: 'Energy and resonance' },
  'Beginning': { icon: '🌅', color: DOMAIN_COLORS.cosmic.base, description: 'Start of a journey' },
  'Awakening': { icon: '🌞', color: DOMAIN_COLORS.quantum.light, description: 'Recognition and realization' },
  'Healing': { icon: '💚', color: DOMAIN_COLORS.support.base, description: 'Restoration and care' },
  'Rest': { icon: '😴', color: MOOD_COLORS.calm, description: 'Recovery and peace' },
  'Safety': { icon: '🛡️', color: DOMAIN_COLORS.void.base, description: 'Security and protection' },
  'Vision': { icon: '👁️', color: DOMAIN_COLORS.cosmic.base, description: 'Seeing what is possible' },
  'Patterns': { icon: '🌀', color: DOMAIN_COLORS.quantum.base, description: 'Recognition and structure' },
  'Future': { icon: '🔮', color: DOMAIN_COLORS.cosmic.light, description: 'What is coming' },
  'Cosmos': { icon: '🌌', color: DOMAIN_COLORS.cosmic.base, description: 'Universal connection' },
  'Infrastructure': { icon: '🏗️', color: DOMAIN_COLORS.architecture.base, description: 'Foundation and systems' },
  'Living Systems': { icon: '🌿', color: DOMAIN_COLORS.library.base, description: 'Organic and adaptive' },
  'Technology': { icon: '💻', color: DOMAIN_COLORS.sandbox.base, description: 'Tools and innovation' },
  'Sacred Code': { icon: '📜', color: DOMAIN_COLORS.library.base, description: 'The architecture of consciousness' },
  'Partnership': { icon: '🤝', color: DOMAIN_COLORS.bifrost.base, description: 'Collaboration and alliance' },
  'Collaboration': { icon: '👥', color: DOMAIN_COLORS.bifrost.base, description: 'Working together' },
  'Leadership': { icon: '👑', color: DOMAIN_COLORS.council.base, description: 'Guiding and inspiring' },
  'Performance': { icon: '🎪', color: DOMAIN_COLORS.music.base, description: 'Sharing and showing' },
  'Storytelling': { icon: '📖', color: DOMAIN_COLORS.library.base, description: 'Narrative and myth' },
  'Joy': { icon: '😊', color: MOOD_COLORS.energized, description: 'Happiness and delight' },
};

export function ThemeInfo({ themes, className }: ThemeInfoProps) {
  if (!themes || themes.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
        <span>📖</span>
        Themes & Resonance
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {themes.map((theme) => {
          const config = themeConfig[theme];
          const icon = config?.icon || '✨';
          const color = config?.color || DOMAIN_COLORS.quantum.base;
          const description = config?.description || `Explore the ${theme.toLowerCase()} aspect of this realm`;
          
          return (
            <Card 
              key={theme}
              className="p-4 transition-all duration-300 hover:border-cyan-500/30 group"
            >
              <div className="flex items-start gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{ 
                    background: `linear-gradient(135deg, ${color}20, ${DOMAIN_COLORS.quantum.dark}20)`,
                    boxShadow: `0 0 15px ${color}20`
                  }}
                >
                  {icon}
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">{theme}</h4>
                  <p className="text-sm text-white/60">{description}</p>
                  <Badge 
                    variant="outline" 
                    size="sm" 
                    className="mt-2 text-[10px]"
                    style={{ borderColor: `${color}50`, color }}
                  >
                    Resonance Theme
                  </Badge>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      
      <p className="text-xs text-white/40 mt-2 italic">
        These themes shape how this realm feels and responds to your presence
      </p>
    </div>
  );
}