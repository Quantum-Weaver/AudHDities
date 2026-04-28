// src/components/cosmic/MoodIndicators.tsx
// Displays mood tags for an environment

"use client";

import { cn } from "@/lib/utils";

interface MoodIndicatorsProps {
  moods: string[];
  className?: string;
}

// Map moods to colors and icons
const moodConfig: Record<string, { color: string; icon: string; description: string }> = {
  Warm: { color: "from-orange-500 to-amber-500", icon: "🔥", description: "Comforting and inviting" },
  Welcoming: { color: "from-emerald-500 to-teal-500", icon: "🚪", description: "Open and accepting" },
  Mystical: { color: "from-purple-500 to-indigo-500", icon: "🔮", description: "Enchanting and mysterious" },
  Sacred: { color: "from-gold-500 to-amber-600", icon: "🏛️", description: "Reverent and holy" },
  Regal: { color: "from-purple-700 to-fuchsia-700", icon: "👑", description: "Majestic and grand" },
  Contemplative: { color: "from-blue-500 to-indigo-500", icon: "🧘", description: "Reflective and peaceful" },
  Authoritative: { color: "from-slate-700 to-gray-700", icon: "⚖️", description: "Commanding and confident" },
  Peaceful: { color: "from-teal-500 to-cyan-500", icon: "🕊️", description: "Tranquil and serene" },
  'Awe-inspiring': { color: "from-cyan-500 to-blue-600", icon: "✨", description: "Breathtaking and magnificent" },
  Ancient: { color: "from-amber-700 to-yellow-800", icon: "🏺", description: "Timeless and venerable" },
  Energetic: { color: "from-yellow-500 to-orange-500", icon: "⚡", description: "Vibrant and lively" },
  Creative: { color: "from-pink-500 to-rose-500", icon: "🎨", description: "Imaginative and inspired" },
  Flow: { color: "from-cyan-400 to-blue-500", icon: "🌊", description: "Effortless and natural" },
  Euphoric: { color: "from-purple-500 to-pink-500", icon: "🎉", description: "Joyful and elated" },
  Healing: { color: "from-green-500 to-emerald-500", icon: "💚", description: "Restorative and nurturing" },
  Gentle: { color: "from-sky-400 to-blue-400", icon: "🍃", description: "Soft and tender" },
  Safe: { color: "from-teal-600 to-green-600", icon: "🛡️", description: "Secure and protected" },
  Restorative: { color: "from-emerald-600 to-teal-600", icon: "🌿", description: "Renewing and revitalizing" },
  Intimate: { color: "from-rose-500 to-pink-500", icon: "💕", description: "Close and personal" },
  Playful: { color: "from-amber-400 to-yellow-500", icon: "🎈", description: "Fun and lighthearted" },
  Connected: { color: "from-indigo-500 to-purple-500", icon: "🔗", description: "Bound and related" },
  Social: { color: "from-orange-400 to-pink-500", icon: "👥", description: "Communal and interactive" },
  Intelligent: { color: "from-blue-600 to-indigo-600", icon: "🧠", description: "Wise and insightful" },
  Organic: { color: "from-green-600 to-emerald-600", icon: "🌱", description: "Natural and living" },
  Powerful: { color: "from-red-600 to-orange-600", icon: "💪", description: "Strong and impactful" },
  Professional: { color: "from-slate-600 to-gray-600", icon: "💼", description: "Polished and competent" },
  Prestigious: { color: "from-purple-800 to-indigo-800", icon: "🏆", description: "Esteemed and respected" },
  Collaborative: { color: "from-cyan-500 to-blue-500", icon: "🤝", description: "Cooperative and synergistic" },
  Visionary: { color: "from-fuchsia-600 to-purple-600", icon: "👁️", description: "Forward-thinking and prophetic" },
  Energized: { color: "from-yellow-500 to-orange-500", icon: "⚡", description: "Dynamic and active" }
};

const defaultConfig = { color: "from-gray-500 to-gray-600", icon: "✨", description: "Unique mood" };

export function MoodIndicators({ moods, className }: MoodIndicatorsProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-lg font-semibold text-star-dust mb-4 flex items-center gap-2">
        <span>🎭</span>
        Mood & Atmosphere
      </h3>
      <div className="flex flex-wrap gap-3">
        {moods.map((mood) => {
          const config = moodConfig[mood] || defaultConfig;
          return (
            <div
              key={mood}
              className="group relative"
            >
              <div className={cn(
                "px-4 py-2 rounded-full bg-gradient-to-r",
                config.color,
                "text-star-dust font-medium text-sm shadow-lg transition-all duration-300 hover:scale-105 cursor-help"
              )}>
                <span className="mr-2">{config.icon}</span>
                {mood}
              </div>
              {/* Tooltip on hover */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 backdrop-blur-sm rounded text-xs text-star-dust/80 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                {config.description}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}