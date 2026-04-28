// src/components/asgard/domains/hephaestus/sanctuary/SanctuaryAcidTest.tsx
'use client';

import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Button } from '@/components/yggdrasil/Button';
import { ArrowRight, Sparkles } from 'lucide-react';

export function SanctuaryAcidTest() {
  return (
    <section className="py-24 px-6">
      <div className="container max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-star-dust/5 px-4 py-2 rounded-full mb-8">
          <Sparkles size={14} className="text-neurospark" />
          <span className="text-sm text-star-dust/70">Find Your Place</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-star-dust mb-6">
          Take the Acid Test
        </h2>
        <p className="text-xl text-star-dust/70 max-w-2xl mx-auto mb-12">
          A playful, gentle survey that determines your access tier. 
          No judgment. No labels. Just recognition.
        </p>
        
        <Card
          data={{ id: 'acid-test', type: 'value', title: 'Acid Test', value: '' }}
          variant="ghost"
          radius="lg"
          shadow="md"
          className="p-8 max-w-2xl mx-auto"
        >
          <div className="space-y-4 text-left">
            <p className="text-star-dust/80">✨ The test asks questions like:</p>
            <ul className="space-y-2 text-star-dust/60">
              <li>• "Regarding socks..."</li>
              <li>• "When someone says we need to talk later..."</li>
              <li>• "Your browser currently has how many tabs open?"</li>
            </ul>
            <p className="text-star-dust/80 mt-4">💫 Based on your answers:</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2"><span className="text-sanctuary-green">🌿 Community Tier</span> <span className="text-star-dust/40 text-sm">— Subsidized access</span></li>
              <li className="flex items-center gap-2"><span className="text-hearth-gold">🌟 Ally Tier</span> <span className="text-star-dust/40 text-sm">— Standard pricing</span></li>
              <li className="flex items-center gap-2"><span className="text-quantum-purple">🏢 Corporate Tier</span> <span className="text-star-dust/40 text-sm">— Premium pricing</span></li>
            </ul>
          </div>
          
          <div className="mt-8">
            <Link href="/questionaire">
              <Button size="lg" className="w-full group">
                Begin the Acid Test
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <p className="text-xs text-star-dust/40 mt-4">
              Takes about 2 minutes. No registration required.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}