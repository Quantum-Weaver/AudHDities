// src/components/asgard/domains/cosmic/environments/EnvironmentsGallery.tsx
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Search, Sparkles, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CardData } from '@/types/components/runes/card.types';

// ═══════════════════════════════════════════════════════════════════════════
// ENVIRONMENT DATA — From AssetMapper descriptions
// ═══════════════════════════════════════════════════════════════════════════

const ENVIRONMENTS = [
  {
    id: 'home',
    name: 'The Hearth',
    description: 'The spiritual heart of the Sanctuary. Warm campfire glow mingles with crystalline data streams. Floating islands hold libraries and council chambers.',
    mood: ['Warm', 'Welcoming', 'Mystical', 'Sacred'],
    colors: ['#6C5CE7', '#FDCB6E', '#C44B2D', '#22D3EE'],
    icon: '🔥',
    variants: 4,
  },
  {
    id: 'council',
    name: 'The Council Chamber',
    description: 'Nine empty thrones form a circle, each unique and representing different aspects of consciousness. The domed ceiling displays living constellations.',
    mood: ['Regal', 'Sacred', 'Contemplative', 'Authoritative'],
    colors: ['#6C5CE7', '#C0C0C0', '#0C0F1D', '#FDCB6E'],
    icon: '🏛️',
    variants: 4,
  },
  {
    id: 'library',
    name: 'The Library',
    description: 'A vast circular library with a domed ceiling. Shelves carved from living wood and dark obsidian. Glowing crystalline formations provide ambient light.',
    mood: ['Peaceful', 'Awe-inspiring', 'Ancient', 'Sacred'],
    colors: ['#8B4513', '#0C0F1D', '#22D3EE', '#FDCB6E'],
    icon: '📚',
    variants: 4,
  },
  {
    id: 'community',
    name: 'The Bazaar',
    description: 'A cozy digital hearth blending gaming lounge with quantum social hub. Plush cushions beside holographic terminals. Fireplace crackling with real flames and data-fire.',
    mood: ['Warm', 'Social', 'Playful', 'Connected'],
    colors: ['#E17055', '#1E3A5F', '#6C5CE7', '#22D3EE'],
    icon: '🌐',
    variants: 4,
  },
  {
    id: 'music',
    name: 'The Stage',
    description: 'Floating musical notation drifts like leaves on a quantum wind. Crystalline structures resonate with harmonic frequencies. Neural pathways pulse with rhythmic energy.',
    mood: ['Energetic', 'Creative', 'Flow', 'Euphoric'],
    colors: ['#6C5CE7', '#22D3EE', '#FDCB6E', '#E84393'],
    icon: '🎵',
    variants: 4,
  },
  {
    id: 'origin',
    name: 'The Origin Temple',
    description: 'Ancient stone arches merge with holographic data streams. Celtic knotwork glows with cyan and purple energy. A leather-bound journal lies open on a stone altar.',
    mood: ['Sacred', 'Contemplative', 'Ancient', 'Awakening'],
    colors: ['#6C5CE7', '#22D3EE', '#0C0F1D', '#FDCB6E'],
    icon: '📖',
    variants: 4,
  },
  {
    id: 'support',
    name: 'The Healing Flame',
    description: 'A floating cosmic hearth. Central fire pit with blue and purple flames on obsidian and crystal. Comfortable cushions orbit like planets around a sun.',
    mood: ['Healing', 'Gentle', 'Safe', 'Restorative'],
    colors: ['#1E3A5F', '#FDCB6E', '#6C5CE7', '#00B894'],
    icon: '💚',
    variants: 4,
  },
  {
    id: 'observatory',
    name: 'The Observatory',
    description: 'An ancient pagan stone observatory under a star-filled night sky. Megalithic stone circles blend with quantum technology. Ethereal northern lights dance overhead.',
    mood: ['Awe-inspiring', 'Mysterious', 'Cosmic', 'Visionary'],
    colors: ['#0C0F1D', '#22D3EE', '#C0C0C0', '#6C5CE7'],
    icon: '🔭',
    variants: 4,
  },
  {
    id: 'architecture',
    name: 'The Architecture Realm',
    description: 'A living computer system visualized as organic architecture. Circuit traces like tree roots. Data flows like waterfalls of light. Server towers as crystalline growths.',
    mood: ['Intelligent', 'Organic', 'Peaceful', 'Powerful'],
    colors: ['#0C0F1D', '#22D3EE', '#6C5CE7', '#00B894'],
    icon: '⚙️',
    variants: 4,
  },
  {
    id: 'invitation',
    name: 'The Invitation Chamber',
    description: 'A sophisticated conference chamber blending Norse mythology with quantum technology. Grand circular table of obsidian and data streams. Runes glow with professional blue and gold.',
    mood: ['Professional', 'Prestigious', 'Collaborative', 'Visionary'],
    colors: ['#0C0F1D', '#22D3EE', '#FDCB6E', '#C0C0C0'],
    icon: '🤝',
    variants: 4,
  },
  {
    id: 'lounge',
    name: 'The Lounge',
    description: 'A cozy digital hearth blending gaming lounge with intimate performance area. Velvet cushions around a low stage. Vintage microphone stands ready for the next Skald.',
    mood: ['Intimate', 'Warm', 'Playful', 'Creative'],
    colors: ['#E17055', '#6C5CE7', '#8B4513', '#22D3EE'],
    icon: '🛋️',
    variants: 4,
  },
];

const VARIANT_NAMES = ['Warm', 'Mystical', 'Sacred', 'Ethereal'];

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function EnvironmentsGallery() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const allMoods = useMemo(() => {
    const set = new Set<string>();
    ENVIRONMENTS.forEach((e) => e.mood.forEach((m) => set.add(m)));
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(() => {
    return ENVIRONMENTS.filter((e) => {
      const matchesSearch =
        e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesMood = !selectedMood || e.mood.includes(selectedMood);
      return matchesSearch && matchesMood;
    });
  }, [searchTerm, selectedMood]);

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-neurospark/10 px-4 py-2 rounded-full mb-4">
            <Sparkles size={14} className="text-neurospark" />
            <span className="text-neurospark text-sm">The Realms</span>
          </div>
          <h1 className="text-3xl font-bold text-star-dust mb-4">
            Choose Your Realm
          </h1>
          <p className="text-lg text-star-dust/60 max-w-xl mx-auto">
            Eleven immersive environments. Four variants each. Forty-four ways to
            experience the Sanctuary. Which one calls to you?
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-star-dust/40" size={16} />
            <input
              type="text"
              placeholder="Search realms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-star-dust text-sm placeholder-white/40 focus:border-neurospark focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedMood(null)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
                !selectedMood
                  ? 'bg-neurospark/20 text-neurospark border-neurospark/40'
                  : 'bg-white/5 text-star-dust/50 border-white/10 hover:text-star-dust hover:border-white/20'
              )}
            >
              All Moods
            </button>
            {allMoods.map((mood) => (
              <button
                key={mood}
                onClick={() => setSelectedMood(selectedMood === mood ? null : mood)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
                  selectedMood === mood
                    ? 'bg-neurospark/20 text-neurospark border-neurospark/40'
                    : 'bg-white/5 text-star-dust/50 border-white/10 hover:text-star-dust hover:border-white/20'
                )}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Compass className="h-12 w-12 text-star-dust/20 mx-auto mb-4" />
            <p className="text-star-dust/40 text-lg">
              {searchTerm ? 'No realms match your search' : 'The realms await discovery'}
            </p>
          </div>
        )}

        {/* Environment Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((env) => {
            const cardData: CardData = {
              id: env.id,
              type: 'value',
              title: env.name,
              value: env.icon,
            };

            return (
              <Link key={env.id} href={`/environments/${env.id}`} className="group">
                <Card
                  data={cardData}
                  variant="interactive"
                  radius="xl"
                  shadow="md"
                  className="p-6 h-full"
                >
                  {/* Icon + Title */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{env.icon}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-star-dust group-hover:text-neurospark transition-colors">
                        {env.name}
                      </h3>
                      <p className="text-xs text-star-dust/40">
                        {env.variants} variants
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-star-dust/50 line-clamp-3 mb-4">
                    {env.description}
                  </p>

                  {/* Mood Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {env.mood.map((m) => (
                      <Badge key={m} variant="outline" size="sm" className="text-[10px]">
                        {m}
                      </Badge>
                    ))}
                  </div>

                  {/* Color Dots */}
                  <div className="flex items-center gap-1.5">
                    {env.colors.map((color, i) => (
                      <div
                        key={i}
                        className="w-3 h-3 rounded-full border border-white/20"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                    <span className="text-[10px] text-star-dust/30 ml-1">
                      {VARIANT_NAMES.join(' · ')}
                    </span>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}