// src/components/asgard/domains/hephaestus/sanctuary/SanctuaryHero.tsx
'use client';

import Link from 'next/link';
import { Button } from '@/components/yggdrasil/Button';
import { AUTH_LABELS, AUTH_ROUTES } from '@/lib/constants/components/asgard/auth/auth.constants';

export function SanctuaryHero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-star-dust mb-6 leading-tight">
          Where{' '}
          <span className="bg-gradient-to-r from-neurospark via-quantum-purple to-fire-base bg-clip-text text-transparent">
            Neurodivergent Minds
          </span>
          <br />
          Build the Future
        </h1>

        {/* 2026-08-24, the truth pass — the last clause read "and every
            member shares in the abundance." The model pays two rosters, not
            everyone: the residual pool goes to every artisan who has ever
            stood as one (once in, never out), and the covenant pool to every
            user who has opted in. Same register, true names.
            Ground: transparency/page.tsx:372, :400. */}
        <p className="text-xl md:text-2xl text-star-dust/70 max-w-2xl mx-auto mb-12 leading-relaxed">
          A platform where 90% of everything circulates, every contributor is
          paid an equal share, and the abundance reaches every artisan who has
          ever pitched in — and every user who opts in.
        </p>

        <div className="flex flex-col items-center gap-4">
          <Link href={AUTH_ROUTES.LOGIN}>
            <Button size="lg">{AUTH_LABELS.ENTER_SANCTUARY}</Button>
          </Link>

          <p className="text-star-dust/70">
            {AUTH_LABELS.NEW_TO_SANCTUARY}{' '}
            <Link href={AUTH_ROUTES.SIGNUP} className="text-neurospark hover:underline">
              {AUTH_LABELS.COME_IN}
            </Link>
          </p>

          <Link href={AUTH_ROUTES.QUESTIONNAIRE}>
            <Button size="lg" variant="outline">
              {AUTH_LABELS.ACID_OFFER_TAKE}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
