// src/components/asgard/domains/iris/translations/TranslationsHub.tsx
//
// STAGE 1 — the honest room (KP's ruling, 2026-07-30, at the realm bus).
// The six hardcoded languages with invented completion percentages are
// retired: no table ever backed those numbers, and this house does not
// dress theater as measurement. The language-craft itself (the tables
// this room once imagined — languages, translations, localization)
// emigrated to the Resonance Grammar by KP's hand, 2026-07-28.
// This room now says what is true: the welcome stands, the craft is
// being grown, and the room is waiting — never missing. Stage 2 (the
// doorway into the Grammar's language walk) convenes at the realm bus
// when the Grammar's front lights and KP gives the word.
'use client';

import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { ArrowLeft, Globe, Sparkles } from 'lucide-react';

export function TranslationsHub() {
  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">

        <div className="mb-8">
          <Link href="/connect" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2">
            <ArrowLeft className="h-4 w-4" />Return to the Bridge
          </Link>
          <h1 className="text-2xl font-bold text-star-dust">The Voice</h1>
          <p className="text-sm text-star-dust/40 mt-1">Every language, every voice, welcome here</p>
        </div>

        <Card
          data={{ id: 'voice-covenant', type: 'value', title: 'The Voice', value: '' }}
          variant="sanctuary" radius="xl" shadow="md" className="p-10 text-center"
        >
          <Globe className="h-8 w-8 text-teal-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-star-dust mb-4">
            Every tongue, every dialect, every voice
          </h2>
          <p className="text-star-dust/60 text-sm leading-relaxed max-w-xl mx-auto mb-4">
            The Sanctuary&apos;s welcome is not written in one language.
            Whatever tongue you carry — spoken, signed, typed, or found
            late in life — it belongs here, and nothing about how you
            speak will ever be scored, ranked, or measured against
            anyone else&apos;s.
          </p>
          <p className="text-star-dust/60 text-sm leading-relaxed max-w-xl mx-auto">
            The craft of carrying the Sanctuary into many languages is
            being grown with care in the Resonance Grammar — the
            house&apos;s home for shared meaning — rather than rushed
            here. When that work is ready, this room becomes its
            doorway.
          </p>
        </Card>

        <Card
          data={{ id: 'voice-waiting', type: 'value', title: 'A room that waits', value: '' }}
          variant="glass" radius="xl" shadow="sm" className="mt-8 p-8 text-center"
        >
          <Sparkles className="h-6 w-6 text-teal-400/70 mx-auto mb-3" />
          <p className="text-star-dust/50 text-sm max-w-lg mx-auto">
            This room is waiting, not missing. If you would like to help
            carry the Sanctuary into your tongue, the{' '}
            <Link href="/connect/support" className="text-neurospark hover:underline">
              Healing Flame
            </Link>{' '}
            is a real door — leave word there, and it will reach the
            hands growing this work.
          </p>
        </Card>
      </div>
    </main>
  );
}
