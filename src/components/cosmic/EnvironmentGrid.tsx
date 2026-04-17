// components/cosmic/EnvironmentGrid.tsx
// Grid display of all available environments

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { DOMAIN_COLORS, MOOD_COLORS } from "@/lib/constants/cosmic/colors";
import { GLOW_EFFECTS } from "@/lib/constants/cosmic/effects";

export interface Environment {
  id: string;
  name: string;
  description: string;
  mood: string[];
  colors: string[];
  themes: string[];
  background: string;
}

export interface EnvironmentGridProps {
  environments: Environment[];
  className?: string;
}

// Map moods to colors from cosmic system
const getMoodColor = (mood: string): string => {
  const moodMap: Record<string, string> = {
    'Warm': MOOD_COLORS.energized,
    'Sacred': MOOD_COLORS.mystical,
    'Peaceful': MOOD_COLORS.calm,
    'Energetic': MOOD_COLORS.energized,
    'Healing': MOOD_COLORS.peaceful,
    'Cosmic': DOMAIN_COLORS.cosmic.base,
    'Intimate': MOOD_COLORS.calm,
    'Professional': DOMAIN_COLORS.architecture.base,
    'Regal': DOMAIN_COLORS.council.base,
    'Contemplative': MOOD_COLORS.peaceful,
    'Authoritative': DOMAIN_COLORS.quantum.base,
    'Awe-inspiring': DOMAIN_COLORS.cosmic.light,
    'Ancient': DOMAIN_COLORS.library.dark,
    'Social': DOMAIN_COLORS.community.base,
    'Playful': MOOD_COLORS.creative,
    'Connected': DOMAIN_COLORS.bifrost.base,
    'Creative': MOOD_COLORS.creative,
    'Flow': MOOD_COLORS.focused,
    'Euphoric': MOOD_COLORS.energized,
    'Intelligent': DOMAIN_COLORS.architecture.light,
    'Powerful': DOMAIN_COLORS.quantum.light,
    'Mysterious': MOOD_COLORS.mystical,
    'Visionary': DOMAIN_COLORS.cosmic.light,
  };
  return moodMap[mood] || DOMAIN_COLORS.quantum.base;
};

export function EnvironmentGrid({ environments, className }: EnvironmentGridProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {environments.map((env) => (
        <motion.div
          key={env.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
          onMouseEnter={() => setHoveredId(env.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <Link href={`/environments/${env.id}`}>
            <Card className="overflow-hidden h-full transition-all duration-300 hover:border-cyan-500/50 group">
              {/* Environment Preview Image */}
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={env.background}
                  alt={env.name}
                  width={400}
                  height={225}
                  className={cn(
                    "w-full h-full object-cover transition-transform duration-700",
                    hoveredId === env.id && "scale-105"
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {/* Mood Badges */}
                <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
                  {env.mood.slice(0, 2).map((mood) => (
                    <Badge
                      key={mood}
                      variant="outline"
                      size="sm"
                      className="bg-black/50 backdrop-blur-sm text-xs"
                      style={{ borderColor: getMoodColor(mood) }}
                    >
                      {mood}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                  {env.name}
                </h3>
                <p className="text-sm text-white/60 line-clamp-2 mb-3">
                  {env.description}
                </p>
                
                {/* Theme Tags */}
                <div className="flex flex-wrap gap-1">
                  {env.themes.slice(0, 3).map((theme) => (
                    <span
                      key={theme}
                      className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/40"
                    >
                      {theme}
                    </span>
                  ))}
                </div>

                {/* Color Palette Preview */}
                <div className="mt-3 flex items-center gap-1">
                  {env.colors.slice(0, 4).map((color, idx) => (
                    <div
                      key={idx}
                      className="w-5 h-5 rounded-full border border-white/20"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}