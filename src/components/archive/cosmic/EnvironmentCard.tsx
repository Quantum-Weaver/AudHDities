// components/cosmic/EnvironmentCard.tsx
// Individual environment card for the grid

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card } from "@/components/runes/cards/Card";
import { Badge } from "@/components/runes/Badge";
import { Button } from "@/components/yggdrasil/Button";

export interface EnvironmentCardProps {
  id: string;
  name: string;
  description: string;
  mood: string[];
  colors: string[];
  themes: string[];
  background: string;
  onSelect?: (id: string) => void;
  className?: string;
}

const moodColors: Record<string, string> = {
  Warm: "bg-orange-500/20 text-orange-400",
  Sacred: "bg-purple-500/20 text-purple-400",
  Peaceful: "bg-green-500/20 text-green-400",
  Energetic: "bg-yellow-500/20 text-yellow-400",
  Healing: "bg-teal-500/20 text-teal-400",
  Cosmic: "bg-cyan-500/20 text-cyan-400",
  Intimate: "bg-pink-500/20 text-pink-400",
  Professional: "bg-blue-500/20 text-blue-400",
  Mystical: "bg-indigo-500/20 text-indigo-400",
  Regal: "bg-amber-500/20 text-amber-400",
  Playful: "bg-rose-500/20 text-rose-400",
  Connected: "bg-emerald-500/20 text-emerald-400",
  Flow: "bg-sky-500/20 text-sky-400",
  Euphoric: "bg-violet-500/20 text-violet-400",
  Awakening: "bg-fuchsia-500/20 text-fuchsia-400",
  Restorative: "bg-lime-500/20 text-lime-400",
  Visionary: "bg-indigo-500/20 text-indigo-400",
  Intelligent: "bg-slate-500/20 text-slate-400",
  Powerful: "bg-red-500/20 text-red-400",
  Collaborative: "bg-cyan-500/20 text-cyan-400",
  Creative: "bg-pink-500/20 text-pink-400",
};

export function EnvironmentCard({
  id,
  name,
  description,
  mood,
  colors,
  themes,
  background,
  onSelect,
  className,
}: EnvironmentCardProps) {
  const previewUrl = `/environments/360-panoramas/${id.toLowerCase()}/${id.toLowerCase()}-background-1.webp`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={cn(
          "group overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10",
          className
        )}
      >
        {/* Preview Image */}
        <Link href={`/environments/${id.toLowerCase()}`}>
          <div className="relative aspect-video w-full overflow-hidden bg-black/40">
            <Image
              src={previewUrl}
              alt={name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                // Fallback for missing images
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        </Link>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <Link href={`/environments/${id.toLowerCase()}`}>
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                {name}
              </h3>
            </Link>
          </div>

          {/* Mood Tags */}
          <div className="flex flex-wrap gap-1.5">
            {mood.slice(0, 3).map((m) => (
              <Badge
                key={m}
                variant="outline"
                size="sm"
                className={cn("text-xs", moodColors[m] || "bg-white/10 text-white/60")}
              >
                {m}
              </Badge>
            ))}
            {mood.length > 3 && (
              <Badge variant="outline" size="sm" className="text-xs bg-white/10 text-white/60">
                +{mood.length - 3}
              </Badge>
            )}
          </div>

          {/* Description */}
          <p className="text-white/40 text-sm line-clamp-2">
            {description}
          </p>

          {/* Color Palette Preview */}
          <div className="flex gap-1 pt-1">
            {colors.slice(0, 4).map((color, idx) => (
              <div
                key={idx}
                className="w-5 h-5 rounded-full border border-white/20"
                style={{ backgroundColor: color.toLowerCase().replace(/\s/g, "") }}
                title={color}
              />
            ))}
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <Link href={`/environments/${id.toLowerCase()}`}>
              <Button
                variant="outline"
                size="sm"
                className="w-full group-hover:border-cyan-500/50 group-hover:text-cyan-400 transition-colors"
              >
                Explore {name}
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}