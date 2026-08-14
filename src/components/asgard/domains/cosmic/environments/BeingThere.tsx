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
  // "Set as My Realm" made TRUE (KP's ⚛ word, 2026-07-31: "the Playground
  // can enable screen settings" — enabled by hestia's hand at his direction
  // the sitting the Sanctum connection completed). Saves through the same
  // walled door the Sanctum uses (vessel_config.environment_preference,
  // docs/sql/013); the beam already wears this room, and hydration at every
  // arrival is the beam provider's standing law.
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'failed'>('idle');

  const rawId = params.id as string;
  const envId: EnvironmentKey = (rawId in PLACE_DISPLAY ? rawId : 'home') as EnvironmentKey;
  const affect = getEnvironmentAffect(envId);
  const place = PLACE_DISPLAY[envId];

  const setAsMyRealm = async () => {
    setSaveState('saving');
    try {
      const res = await fetch('/api/auth/update-profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          config: { environment_preference: `${envId}:${selectedVariant}` },
        }),
      });
      const result = await res.json();
      setSaveState(result?.success ? 'saved' : 'failed');
    } catch {
      setSaveState('failed');
    }
  };

  // THE CROSSING — arrival itself changes the sky (and deepening a variant
  // re-grounds it). The beam session is this room's only state — and a new
  // crossing or deeper variant re-offers the choice.
  useEffect(() => {
    setEnvironment(envId, selectedVariant);
    setSaveState('idle');
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

            {/* Actions — "Set as My Realm" saves for real now (the same
                walled door as the Sanctum's picker); the Sanctum stays one
                step away for shaping everything else. */}
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={setAsMyRealm}
                loading={saveState === 'saving'}
                disabled={saveState === 'saved'}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {saveState === 'saved' ? 'This is your realm now' : 'Set as My Realm'}
              </Button>
              <Button variant="ghost" size="md" onClick={() => router.back()}>
                Back
              </Button>
              {saveState === 'saved' && (
                <span className="text-xs text-star-dust/50">
                  It will greet you at every arrival —{' '}
                  <Link href="/vessel/sanctum" className="underline hover:text-star-dust">
                    shape more in your Sanctum
                  </Link>
                </span>
              )}
              {saveState === 'failed' && (
                <span className="text-xs text-error">
                  The saving stumbled — try once more, or set it in your{' '}
                  <Link href="/vessel/sanctum" className="underline">Sanctum</Link>.
                </span>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}
