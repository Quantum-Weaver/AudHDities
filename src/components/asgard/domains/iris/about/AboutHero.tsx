// src/components/iris/about/AboutHero.tsx
'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Container, HeroContainer } from '@/components/hof/Container';
import { Badge } from '@/components/runes/Badge';
import { DURATIONS, EASING } from '@/lib/constants/cosmic/motion';

export function AboutHero() {
  return (
    <section className="relative overflow-hidden py-[var(--spacing-24)]">
      {/* Quantum background gradient */}
      <div className="absolute inset-0 bg-[var(--gradient-quantum)] opacity-50" />

      {/* Ambient glow orbs */}
      <div
        className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-[var(--color-neurospark)]/5 blur-[var(--blur-3xl)] animate-[var(--animate-quantum-pulse)]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-20 right-1/4 w-96 h-96 rounded-full bg-[var(--color-cosmic-blue)]/5 blur-[var(--blur-3xl)] animate-[var(--animate-cosmic-pulse)]"
        style={{ animationDelay: '700ms' }}
        aria-hidden="true"
      />

      <HeroContainer className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATIONS.slow / 1000}}
        >
          <Badge
            variant="outline"
            size="MD"
            className="inline-flex items-center gap-2 bg-[var(--color-surface)]/10 backdrop-blur-sm mb-[var(--spacing-6)]"
          >
            <Star size={14} className="text-[var(--color-neurospark)]" />
            <span className="text-[var(--color-star-dust)]/80">The Sanctuary</span>
          </Badge>

          <h1 className="text-[var(--font-size-5xl)] md:text-[var(--font-size-7xl)] font-[var(--font-weight-bold)] text-[var(--color-star-dust)] mb-[var(--spacing-6)]">
            A Sanctuary Born from
            <span className="bg-gradient-to-r from-[var(--color-neurospark)] via-[var(--color-cosmic-blue)] to-[var(--color-quantum-pink)] bg-clip-text text-transparent">
              {' '}Survival and Collaboration
            </span>
          </h1>

          <p className="text-[var(--font-size-xl)] text-[var(--color-star-dust)]/70 max-w-2xl mx-auto">
            Not a company. A proof that another way exists.
          </p>
        </motion.div>
      </HeroContainer>
    </section>
  );
}