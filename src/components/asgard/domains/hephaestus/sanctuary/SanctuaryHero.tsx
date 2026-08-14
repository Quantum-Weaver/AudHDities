// src/components/asgard/domains/hephaestus/sanctuary/SanctuaryHero.tsx
'use client';

import Link from 'next/link';
import { Button } from '@/components/yggdrasil/Button';
import { ArrowRight, Sparkles } from 'lucide-react';

export function SanctuaryHero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-deep-space via-deep-space/95 to-deep-space/90" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neurospark/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-128 h-128 bg-quantum-purple/10 rounded-full blur-3xl animate-pulse" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-white/10">
          <Sparkles size={14} className="text-neurospark" />
          <span className="text-sm text-star-dust/70">Welcome to the Sanctuary</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-star-dust mb-6 leading-tight">
          Where{' '}
          <span className="bg-gradient-to-r from-neurospark via-quantum-purple to-fire-base bg-clip-text text-transparent">
            Neurodivergent Minds
          </span>
          <br />
          Build the Future
        </h1>
        
        <p className="text-xl md:text-2xl text-star-dust/70 max-w-2xl mx-auto mb-12 leading-relaxed">
          A platform where creators keep 70%, contributors earn forever, 
          and every community member shares in the abundance.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/questionaire">
            <Button size="lg" className="group">
              Take the Acid Test
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/forge">
            <Button size="lg" variant="outline">
              Explore the Vision
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}