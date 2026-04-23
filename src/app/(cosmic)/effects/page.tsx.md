// app/(cosmic)/effects/page.tsx
// The Grimoire - Effect gallery, animation showcase
// Feeling: Magical, inspirational, playful

'use client';

import { useState } from 'react';
import { Page } from '@/components/shared/Page';
import { EffectGallery } from '@/components/cosmic/EffectGallery';
import { ParameterSliders } from '@/components/cosmic/ParameterSliders';
import { LiveDemo } from '@/components/cosmic/LiveDemo';
import { CopyCode } from '@/components/cosmic/CopyCode';
import { FavoriteButton } from '@/components/cosmic/FavoriteButton';
import type { Effect } from '@/components/cosmic/EffectGallery';

export const metadata = {
  title: 'The Grimoire | Sovereign Sanctuary',
  description: 'Magic effects, animations, and glows'
};

export default function EffectsPage() {
  const [selectedEffect, setSelectedEffect] = useState('quantum-glow');
  const [parameters, setParameters] = useState({
    intensity: 0.5,
    speed: 1,
    color: '#6C5CE7',
  });

  // FIXED: Explicitly type the effects array with the Effect type
  const effects: Effect[] = [
    { id: 'quantum-glow', name: 'Quantum Glow', category: 'glow' },
    { id: 'fire-flicker', name: 'Fire Flicker', category: 'elemental' },
    { id: 'cosmic-sparkle', name: 'Cosmic Sparkle', category: 'particle' },
    { id: 'rainbow-flow', name: 'Rainbow Flow', category: 'gradient' },
    { id: 'quantum-entanglement', name: 'Quantum Entanglement', category: 'quantum' },
    { id: 'stardust-float', name: 'Stardust Float', category: 'particle' },
  ];

  return (
    <Page 
      variant={1}
      environment="music"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              The Grimoire
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto">
              Ancient effects for the modern weaver
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            <div>
              <EffectGallery 
                effects={effects} 
                selected={selectedEffect}
                onSelect={setSelectedEffect}
              />
            </div>
            <div className="lg:col-span-2 space-y-8">
              <LiveDemo effect={selectedEffect} parameters={parameters} />
              <ParameterSliders 
                parameters={parameters}
                onChange={setParameters}
              />
            </div>
            <div className="space-y-8">
              <CopyCode effect={selectedEffect} parameters={parameters} />
              <FavoriteButton effectId={selectedEffect} />
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}