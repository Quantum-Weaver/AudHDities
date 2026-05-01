// src/components/asgard/domains/iris/translations/TranslationsHub.tsx
'use client';

import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { ArrowLeft, Globe, Sparkles } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', complete: 100 },
  { code: 'es', name: 'Spanish', native: 'Español', complete: 65 },
  { code: 'fr', name: 'French', native: 'Français', complete: 45 },
  { code: 'de', name: 'German', native: 'Deutsch', complete: 30 },
  { code: 'ja', name: 'Japanese', native: '日本語', complete: 15 },
  { code: 'ar', name: 'Arabic', native: 'العربية', complete: 10 },
];

export function TranslationsHub() {
  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-5xl mx-auto px-6">

        <div className="mb-8">
          <Link href="/connect" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2">
            <ArrowLeft className="h-4 w-4" />Return to the Bridge
          </Link>
          <h1 className="text-2xl font-bold text-star-dust">The Voice</h1>
          <p className="text-sm text-star-dust/40 mt-1">Every language, every voice, welcome here</p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LANGUAGES.map((lang) => {
            const cardData: CardData = { id: lang.code, type: 'value', title: lang.name, value: lang.native };
            return (
              <Card key={lang.code} data={cardData} variant="interactive" radius="lg" shadow="sm" className="p-5 h-full">
                <Globe className="h-6 w-6 text-neurospark mb-3" />
                <h3 className="text-lg font-semibold text-star-dust">{lang.name}</h3>
                <p className="text-sm text-star-dust/50 mb-3">{lang.native}</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-neurospark rounded-full" style={{ width: `${lang.complete}%` }} />
                  </div>
                  <span className="text-xs text-star-dust/40">{lang.complete}%</span>
                </div>
              </Card>
            );
          })}
        </div>

        <Card
          data={{ id: 'translations-covenant', type: 'value', title: 'Translation Covenant', value: '' }}
          variant="glass" radius="xl" shadow="md" className="mt-12 p-8 text-center"
        >
          <Sparkles className="h-6 w-6 text-purple-400 mx-auto mb-3" />
          <p className="text-star-dust/50 text-sm max-w-lg mx-auto">
            The Sanctuary welcomes every tongue, every dialect, every voice. Community translators help make the Sanctuary accessible to all. If you'd like to contribute translations, contact the Curator.
          </p>
        </Card>
      </div>
    </main>
  );
}