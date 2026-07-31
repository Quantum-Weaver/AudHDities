// src/components/asgard/domains/cosmic/environments/BeingThere.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   BEING-THERE — the Realm Detail room, become the place itself           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
// Provenance: REALMS-AS-TRAVEL moves 2 + 3, ruled at KP's ⚛ word 2026-07-30
// (design + ruling on the (cosmic) REALM-BUS). Entering this room IS the
// crossing: the beam's own session environment becomes the place on arrival
// (Page's fixed EnvironmentLayer is the sky — one dress, never doubled), and
// the content breathes in after the sky grounds — instant under reduced
// motion. The place-soul reads as the place's own story; mood, colors, and
// themes are the room's registers, in words, not swatches. "Set as My Realm"
// keeps its exact wiring to hestia's sanctum. Law 7 rides: the room's only
// state is the beam's own session.

'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Button } from '@/components/yggdrasil/Button';
import { useContinuityBeam } from '@/contexts/ContinuityBeamContext';
import { getEnvironmentAffect } from '@/lib/constants/systems/environments/affects';
import { PLACE_DISPLAY, VARIANT_NAMES } from '@/lib/constants/systems/environments/places';
import type { EnvironmentKey } from '@/lib/constants/systems/assets/mapper';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CardData } from '@/types/components/runes/card.types';

export function BeingThere() {
  const params = useParams();
  const router = useRouter();
  const { setEnvironment, environmentVariant } = useContinuityBeam();
  const [selectedVariant, setSelectedVariant] = useState(environmentVariant || 1);
  const prefersReducedMotion = useReducedMotion();

  const rawId = params.id as string;
  const envId: EnvironmentKey = (rawId in PLACE_DISPLAY ? rawId : 'home') as EnvironmentKey;
  const affect = getEnvironmentAffect(envId);
  const place = PLACE_DISPLAY[envId];

  // THE CROSSING — arrival itself changes the sky (and deepening a variant
  // re-grounds it). The beam session is this room's only state.
  useEffect(() => {
    setEnvironment(envId, selectedVariant);
  }, [envId, selectedVariant, setEnvironment]);

  const cardData: CardData = {
    id: envId,
    type: 'value',
    title: place.name,
    value: place.icon,
  };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">
        <Link
          href="/environments"
          className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Return to the Crossing Hall
        </Link>

        {/* The grounding beat — the sky lands first, the room breathes in
            after (~400ms). Instant under reduced motion. */}
        <motion.div
          key={envId}
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <Card data={cardData} variant="sanctuary" radius="xl" shadow="md" className="p-8">
            {/* You are here */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-5xl">{place.icon}</span>
              <div>
                <h1 className="text-2xl font-bold text-star-dust">{place.name}</h1>
                <p className="text-xs text-star-dust/40 mt-1">
                  You are here — the sky above is this place's own.
                </p>
              </div>
            </div>

            {/* The place's own story — the soul, read whole */}
            <p className="text-star-dust/70 leading-relaxed mb-6">
              {affect.description}
            </p>

            {/* The registers — mood, colors, themes, in words */}
            <div className="space-y-3 mb-8">
              <div className="flex flex-wrap items-center gap-1.5">
                {affect.mood.map((m) => (
                  <Badge key={m} variant="outline" size="sm" className="text-[10px]">
                    {m}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-star-dust/40">
                Wears: {affect.colors.join(' · ')}
              </p>
              <p className="text-xs text-star-dust/40">
                Carries: {affect.themes.join(' · ')}
              </p>
            </div>

            {/* Deepen the crossing — the four variant registers */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-star-dust/60 mb-3">
                Deepen the Crossing
              </h3>
              <div className="flex w-full">
                {VARIANT_NAMES.map((variantName, i) => {
                  const variant = i + 1;
                  return (
                    <button
                      key={variant}
                      type="button"
                      onClick={() => setSelectedVariant(variant)}
                      className={cn(
                        'flex-1 py-3 text-sm font-medium border border-white/10 transition-all motion-reduce:transition-none',
                        'first:rounded-l-lg last:rounded-r-lg',
                        variant === selectedVariant
                          ? 'bg-neurospark/20 border-neurospark/40 text-neurospark'
                          : 'bg-deep-space/40 text-star-dust/50 hover:text-star-dust/80 hover:bg-white/5'
                      )}
                    >
                      {variantName}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions — the sanctum wiring untouched */}
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
        </motion.div>
      </div>
    </main>
  );
}
