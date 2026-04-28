// components/cosmic/ThemeCard.tsx
// Featured theme cards

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card } from "@/components/runes/cards/Card";
import { Button } from "@/components/yggdrasil/Button";
import { DOMAIN_COLORS } from "@/lib/constants/cosmic/colors";
import { EnvironmentPromptMap } from "@/lib/constants/systems/assets/environment_prompts";

export interface ThemeCardProps {
  className?: string;
}

const featuredThemes = [
  {
    id: 'home',
    name: 'The Hearth',
    description: 'A warm, welcoming sanctuary where your journey begins. Blend of Celtic stone circles and futuristic quantum architecture.',
    icon: '🔥',
    gradient: DOMAIN_COLORS.quantum.base,
  },
  {
    id: 'council',
    name: 'Council Chamber',
    description: 'Nine thrones for nine entities. A regal space for governance and collective consciousness.',
    icon: '👑',
    gradient: DOMAIN_COLORS.council.base,
  },
  {
    id: 'music',
    name: 'Music Realm',
    description: 'Where sound becomes substance. Floating musical notation and crystalline sound structures.',
    icon: '🎵',
    gradient: DOMAIN_COLORS.music.base,
  },
  {
    id: 'observatory',
    name: 'The Observatory',
    description: 'Ancient stone meets quantum sensors. Gaze across timelines and map possible futures.',
    icon: '🔭',
    gradient: DOMAIN_COLORS.cosmic.base,
  },
];

export function ThemeCards({ className }: ThemeCardProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", className)}>
      {featuredThemes.map((theme, index) => (
        <motion.div
          key={theme.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link href={`/environments/${theme.id}`}>
            <Card className="p-6 text-center h-full transition-all duration-300 hover:border-cyan-500/50 group">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 transition-all duration-300 group-hover:scale-110"
                style={{ 
                  background: `linear-gradient(135deg, ${theme.gradient}20, ${DOMAIN_COLORS.quantum.dark}20)`,
                  boxShadow: `0 0 20px ${theme.gradient}20`
                }}
              >
                {theme.icon}
              </div>
              <h3 className="text-lg font-bold text-star-dust mb-2 group-hover:text-neurospark transition-colors">
                {theme.name}
              </h3>
              <p className="text-sm text-star-dust/60 line-clamp-3">
                {theme.description}
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-4 w-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Explore Realm
              </Button>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}