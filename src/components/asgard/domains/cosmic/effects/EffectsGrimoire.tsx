// src/components/asgard/domains/cosmic/effects/EffectsGrimoire.tsx
'use client';

import { useState } from 'react';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Sparkles, Wand2, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CardData } from '@/types/components/runes/card.types';

// ═══════════════════════════════════════════════════════════════════════════
// EFFECTS DATA
// ═══════════════════════════════════════════════════════════════════════════

const EFFECTS = [
  {
    name: 'Quantum Glow',
    category: 'Glow',
    description: 'A pulsing purple glow effect using the quantum color palette.',
    preview: 'shadow-[0_0_20px_#6C5CE740,0_0_40px_#0C0F1D30,0_0_60px_#6C5CE720]',
    class: 'glow-quantum',
    code: '<div className="glow-quantum">Content</div>',
  },
  {
    name: 'Cosmic Glow',
    category: 'Glow',
    description: 'A deep blue cosmic radiance with layered shadow depth.',
    preview: 'shadow-[0_0_20px_#0984E340,0_0_40px_#0C0F1D30,0_0_60px_#74B9FF20]',
    class: 'glow-cosmic',
    code: '<div className="glow-cosmic">Content</div>',
  },
  {
    name: 'Neurospark Pulse',
    category: 'Glow',
    description: 'A bright cyan pulse — the signature Sanctuary accent.',
    preview: 'shadow-[0_0_20px_#22D3EE40,0_0_40px_#22D3EE30,0_0_80px_#22D3EE20]',
    class: 'glow-neurospark',
    code: '<div className="glow-neurospark">Content</div>',
  },
  {
    name: 'Rainbow Text',
    category: 'Text',
    description: 'Smooth spectral flow across all pride colors.',
    preview: 'bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent',
    class: 'rainbow-text',
    code: '<span className="rainbow-text">Rainbow text</span>',
  },
  {
    name: 'Quantum Weaver Text',
    category: 'Text',
    description: 'The signature quantum weave gradient — purple to cyan.',
    preview: 'bg-gradient-to-r from-quantum-purple via-neurospark to-cosmic-blue bg-clip-text text-transparent',
    class: 'quantum-weaver-text',
    code: '<span className="quantum-weaver-text">Quantum text</span>',
  },
  {
    name: 'Cosmic Sparkle Text',
    category: 'Text',
    description: 'Deep space shimmer with layered glow shadows.',
    preview: '',
    class: 'cosmic-sparkle-text',
    code: '<span className="cosmic-sparkle-text">Sparkle text</span>',
  },
  {
    name: 'Domain Quantum Card',
    category: 'Card',
    description: 'Glass card with quantum gradient border and hover lift.',
    preview: 'bg-gradient-to-br from-quantum-purple/20 to-transparent border border-quantum-purple/30',
    class: 'domain-quantum-card',
    code: '<Card variant="quantum">Content</Card>',
  },
  {
    name: 'Domain Cosmic Card',
    category: 'Card',
    description: 'Deep space card with cosmic blue glow on hover.',
    preview: 'bg-gradient-to-br from-cosmic-blue/10 to-transparent border border-cosmic-blue/30',
    class: 'domain-cosmic-card',
    code: '<Card variant="cosmic">Content</Card>',
  },
  {
    name: 'Domain Council Card',
    category: 'Card',
    description: 'Regal council card with aethelred deep purple gradient.',
    preview: 'bg-gradient-to-br from-purple-900/20 to-transparent border border-purple-500/30',
    class: 'domain-council-card',
    code: '<Card variant="council">Content</Card>',
  },
  {
    name: 'Float Animation',
    category: 'Animation',
    description: 'Gentle floating motion — 6 second cycle.',
    preview: '',
    class: 'animate-float',
    code: '<div className="animate-float">Floating</div>',
  },
  {
    name: 'Pulse Animation',
    category: 'Animation',
    description: 'Soft pulsing opacity — 2 second cycle.',
    preview: '',
    class: 'animate-pulse',
    code: '<div className="animate-pulse">Pulsing</div>',
  },
  {
    name: 'Glow Animation',
    category: 'Animation',
    description: 'Quantum glow breathing — 2 second alternating cycle.',
    preview: '',
    class: 'animate-glow',
    code: '<div className="animate-glow">Glowing</div>',
  },
];

const CATEGORIES = ['All', 'Glow', 'Text', 'Card', 'Animation'];

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function EffectsGrimoire() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const filtered = selectedCategory === 'All'
    ? EFFECTS
    : EFFECTS.filter((e) => e.category === selectedCategory);

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-neurospark/10 px-4 py-2 rounded-full mb-4">
            <Wand2 size={14} className="text-neurospark" />
            <span className="text-neurospark text-sm">The Grimoire</span>
          </div>
          <h1 className="text-3xl font-bold text-star-dust mb-4">Effects Grimoire</h1>
          <p className="text-lg text-star-dust/60 max-w-xl mx-auto">
            Ancient effects for the modern weaver. Browse glows, text effects,
            card styles, and animations. Copy the code to use in your own creations.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium border transition-all',
                selectedCategory === cat
                  ? 'bg-neurospark/20 text-neurospark border-neurospark/40'
                  : 'bg-white/5 text-star-dust/50 border-white/10 hover:text-star-dust hover:border-white/20'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Effects Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((effect, index) => {
            const cardData: CardData = {
              id: effect.class,
              type: 'value',
              title: effect.name,
              value: effect.category,
            };

            return (
              <Card key={effect.class} data={cardData} variant="glass" radius="xl" shadow="sm" className="p-5 h-full">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" size="sm" className="text-[10px]">
                    {effect.category}
                  </Badge>
                  <button
                    onClick={() => handleCopy(effect.code, index)}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-star-dust/60 hover:text-star-dust transition-all"
                  >
                    {copiedIndex === index ? (
                      <Check size={14} className="text-emerald-400" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                </div>

                <h3 className="text-lg font-semibold text-star-dust mb-2">{effect.name}</h3>
                <p className="text-sm text-star-dust/50 mb-4">{effect.description}</p>

                {/* Preview Area */}
                {effect.preview && (
                  <div
                    className="rounded-lg p-4 mb-3 flex items-center justify-center min-h-[60px]"
                    style={
                      effect.category === 'Text'
                        ? undefined
                        : effect.category === 'Glow'
                          ? { backgroundColor: 'rgba(255,255,255,0.03)', boxShadow: effect.preview }
                          : { backgroundColor: 'rgba(255,255,255,0.03)' }
                    }
                  >
                    {effect.category === 'Text' && (
                      <span className={cn('text-lg font-bold', effect.class)}>
                        {effect.name}
                      </span>
                    )}
                    {effect.category === 'Glow' && (
                      <span className="text-xs text-star-dust/40">Preview: box-shadow applied</span>
                    )}
                    {effect.category === 'Card' && (
                      <span className="text-xs text-star-dust/40">Preview: card style applied</span>
                    )}
                    {effect.category === 'Animation' && (
                      <span className={cn('text-lg font-bold', effect.class)}>
                        ✨ {effect.name}
                      </span>
                    )}
                  </div>
                )}

                {/* Code Snippet */}
                <pre className="bg-black/50 rounded-lg p-3 text-xs text-star-dust/50 font-mono overflow-x-auto">
                  {effect.code}
                </pre>
              </Card>
            );
          })}
        </div>

        {/* Footer */}
        <Card data={{ id: 'grimoire-footer', type: 'value', title: 'COSMIC', value: '' }} variant="glass" radius="xl" shadow="none" className="mt-8 p-6 text-center">
          <Sparkles className="h-5 w-5 text-neurospark mx-auto mb-2" />
          <p className="text-sm text-star-dust/40">
            All effects are generated from COSMIC design tokens.
            Run <code className="text-neurospark">npm run generate</code> to regenerate.
          </p>
        </Card>
      </div>
    </main>
  );
}