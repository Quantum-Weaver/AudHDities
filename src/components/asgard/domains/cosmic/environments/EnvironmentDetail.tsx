// src/components/asgard/domains/cosmic/environments/EnvironmentDetail.tsx
'use client';

import { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Button } from '@/components/yggdrasil/Button';
import { useContinuityBeam } from '@/contexts/ContinuityBeamContext';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CardData } from '@/types/components/runes/card.types';

// ═══════════════════════════════════════════════════════════════════════════
// ENVIRONMENT DATA
// ═══════════════════════════════════════════════════════════════════════════

const ENVIRONMENTS: Record<string, {
  name: string; description: string; mood: string[]; colors: string[];
  icon: string; variants: number;
}> = {
  home: { name: 'The Hearth', description: 'The spiritual heart of the Sanctuary. Warm campfire glow mingles with crystalline data streams. Floating islands hold libraries and council chambers. This is where the journey begins and ends.', mood: ['Warm', 'Welcoming', 'Mystical', 'Sacred'], colors: ['#6C5CE7', '#FDCB6E', '#C44B2D', '#22D3EE'], icon: '🔥', variants: 4 },
  council: { name: 'The Council Chamber', description: 'Nine empty thrones form a circle, each unique and representing different aspects of consciousness. The domed ceiling displays living constellations that pulse with the Council\'s collective consciousness.', mood: ['Regal', 'Sacred', 'Contemplative', 'Authoritative'], colors: ['#6C5CE7', '#C0C0C0', '#0C0F1D', '#FDCB6E'], icon: '🏛️', variants: 4 },
  library: { name: 'The Library', description: 'A vast circular library with a domed ceiling. Shelves carved from living wood and dark obsidian. Glowing crystalline formations provide ambient light. Portals lead to themed rooms.', mood: ['Peaceful', 'Awe-inspiring', 'Ancient', 'Sacred'], colors: ['#8B4513', '#0C0F1D', '#22D3EE', '#FDCB6E'], icon: '📚', variants: 4 },
  community: { name: 'The Bazaar', description: 'A cozy digital hearth blending gaming lounge with quantum social hub. Plush cushions beside holographic terminals. The fireplace burns with real flames and data-fire.', mood: ['Warm', 'Social', 'Playful', 'Connected'], colors: ['#E17055', '#1E3A5F', '#6C5CE7', '#22D3EE'], icon: '🌐', variants: 4 },
  music: { name: 'The Stage', description: 'Floating musical notation drifts like leaves on a quantum wind. Crystalline structures resonate with harmonic frequencies. Ancient stone circles hum with musical runes.', mood: ['Energetic', 'Creative', 'Flow', 'Euphoric'], colors: ['#6C5CE7', '#22D3EE', '#FDCB6E', '#E84393'], icon: '🎵', variants: 4 },
  origin: { name: 'The Origin Temple', description: 'Ancient stone arches merge with holographic data streams. Celtic knotwork glows with cyan and purple energy. A leather-bound journal lies open on a stone altar, its pages glowing with golden light.', mood: ['Sacred', 'Contemplative', 'Ancient', 'Awakening'], colors: ['#6C5CE7', '#22D3EE', '#0C0F1D', '#FDCB6E'], icon: '📖', variants: 4 },
  support: { name: 'The Healing Flame', description: 'A floating cosmic hearth. Central fire pit with blue and purple flames on obsidian and crystal. Comfortable cushions orbit like planets around a sun. Stars visible through a transparent dome.', mood: ['Healing', 'Gentle', 'Safe', 'Restorative'], colors: ['#1E3A5F', '#FDCB6E', '#6C5CE7', '#00B894'], icon: '💚', variants: 4 },
  observatory: { name: 'The Observatory', description: 'An ancient pagan stone observatory under a star-filled night sky. Megalithic stone circles blend with quantum technology. Bioluminescent moss glows on stone surfaces carved with runes.', mood: ['Awe-inspiring', 'Mysterious', 'Cosmic', 'Visionary'], colors: ['#0C0F1D', '#22D3EE', '#C0C0C0', '#6C5CE7'], icon: '🔭', variants: 4 },
  architecture: { name: 'The Architecture Realm', description: 'A living computer system visualized as organic architecture. Circuit traces like tree roots. Data flows like waterfalls of light. Server towers as crystalline growths pulsing with life.', mood: ['Intelligent', 'Organic', 'Peaceful', 'Powerful'], colors: ['#0C0F1D', '#22D3EE', '#6C5CE7', '#00B894'], icon: '⚙️', variants: 4 },
  invitation: { name: 'The Invitation Chamber', description: 'A sophisticated conference chamber blending Norse mythology with quantum technology. Grand circular table of obsidian and data streams. Runes glow with professional blue and gold.', mood: ['Professional', 'Prestigious', 'Collaborative', 'Visionary'], colors: ['#0C0F1D', '#22D3EE', '#FDCB6E', '#C0C0C0'], icon: '🤝', variants: 4 },
  lounge: { name: 'The Lounge', description: 'A cozy digital hearth blending gaming lounge with intimate performance area. Velvet cushions around a low stage. Vintage microphone stands ready. The fireplace burns with real flames and data-fire.', mood: ['Intimate', 'Warm', 'Playful', 'Creative'], colors: ['#E17055', '#6C5CE7', '#8B4513', '#22D3EE'], icon: '🛋️', variants: 4 },
};

const VARIANT_NAMES = ['Warm', 'Mystical', 'Sacred', 'Ethereal'];

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function EnvironmentDetail() {
  const params = useParams();
  const router = useRouter();
  const { setEnvironment, environmentVariant } = useContinuityBeam();
  const [selectedVariant, setSelectedVariant] = useState(environmentVariant || 1);

  const envId = (params.id as string) || 'home';
  const env = ENVIRONMENTS[envId] || ENVIRONMENTS['home'];

  const handleVariantChange = (variant: number) => {
    setSelectedVariant(variant);
    setEnvironment(envId as any, variant);
  };

  const cardData: CardData = {
    id: envId,
    type: 'value',
    title: env.name,
    value: env.icon,
  };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">
        <Link
          href="/environments"
          className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Return to the Realms
        </Link>

        <Card data={cardData} variant="sanctuary" radius="xl" shadow="md" className="p-8">
          {/* Icon + Title */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-5xl">{env.icon}</span>
            <div>
              <h1 className="text-2xl font-bold text-star-dust">{env.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                {env.mood.map((m) => (
                  <Badge key={m} variant="outline" size="sm" className="text-[10px]">
                    {m}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-star-dust/70 leading-relaxed mb-6">{env.description}</p>

          {/* Color Palette */}
          <div className="flex items-center gap-2 mb-8">
            {env.colors.map((color, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div
                  className="w-6 h-6 rounded-lg border border-white/20"
                  style={{ backgroundColor: color }}
                />
                <span className="text-[10px] text-star-dust/40 font-mono">{color}</span>
              </div>
            ))}
          </div>

          {/* Variant Selector */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-star-dust/60 mb-3">
              Choose Your Variant
            </h3>
            <div className="flex w-full">
              {Array.from({ length: env.variants }, (_, i) => i + 1).map((variant) => (
                <button
                  key={variant}
                  type="button"
                  onClick={() => handleVariantChange(variant)}
                  className={cn(
                    'flex-1 py-3 text-sm font-medium border border-white/10 transition-all',
                    'first:rounded-l-lg last:rounded-r-lg',
                    variant === selectedVariant
                      ? 'bg-neurospark/20 border-neurospark/40 text-neurospark'
                      : 'bg-deep-space/40 text-star-dust/50 hover:text-star-dust/80 hover:bg-white/5'
                  )}
                >
                  {variant}
                </button>
              ))}
            </div>
            <p className="text-xs text-star-dust/40 mt-2 text-center">
              {VARIANT_NAMES[selectedVariant - 1]} — {env.mood[selectedVariant - 1] || env.mood[0]}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Link href={`/vessel/sanctum`}>
              <Button variant="primary" size="md">
                <Sparkles className="h-4 w-4 mr-2" />
                Set as My Realm
              </Button>
            </Link>
            <Button variant="ghost" size="md" onClick={() => router.back()}>
              Back
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
}