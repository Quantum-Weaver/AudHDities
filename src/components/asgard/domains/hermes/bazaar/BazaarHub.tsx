// src/components/asgard/domains/hermes/bazaar/BazaarHub.tsx
'use client';

import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Package, Users, Building2, Palette, ArrowRight } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

const SECTIONS = [
  {
    title: 'The Tapestry',
    description: 'Works offered by sovereign souls.',
    href: '/bazaar/wares',
    icon: Package,
    color: 'text-neurospark',
    bg: 'bg-neurospark/10',
  },
  {
    title: 'The Weavers',
    description: 'The artisans, and what is on their looms.',
    href: '/bazaar/artisans',
    icon: Users,
    color: 'text-mood-creative',
    bg: 'bg-mood-creative/10',
  },
  {
    title: 'The Guild',
    description: 'Vessels who keep a stall here.',
    href: '/bazaar/merchants',
    icon: Building2,
    color: 'text-sanctuary-green',
    bg: 'bg-sanctuary-green/10',
  },
  {
    title: 'The Loom',
    description: 'Where a vessel offers a work of their own.',
    href: '/bazaar/studio',
    icon: Palette,
    color: 'text-entity-skald',
    bg: 'bg-entity-skald/10',
  },
];

export function BazaarHub() {
  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-star-dust mb-4">The Bazaar</h1>
          <p className="text-lg text-star-dust/60 max-w-xl mx-auto">
            Where sovereign souls exchange their gifts. Every exchange supports artisans,
            contributors, and the community — forever.
          </p>
        </div>

        {/* The four doors */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SECTIONS.map((section) => {
            const cardData: CardData = {
              id: section.href,
              type: 'value',
              title: section.title,
              value: section.description,
            };

            return (
              <Link key={section.href} href={section.href} className="group">
                <Card
                  data={cardData}
                  variant="interactive"
                  radius="lg"
                  shadow="sm"
                  className="p-6 h-full"
                >
                  <div
                    aria-hidden="true"
                    className={`w-12 h-12 ${section.bg} rounded-xl flex items-center justify-center mb-4 transition-colors group-hover:bg-star-dust/10`}
                  >
                    <section.icon className={section.color} size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-star-dust mb-2 group-hover:text-neurospark transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-sm text-star-dust/50 mb-4">
                    {section.description}
                  </p>
                  <span className="flex items-center gap-1 text-xs text-neurospark">
                    Go in <ArrowRight size={12} aria-hidden="true" />
                  </span>
                </Card>
              </Link>
            );
          })}
        </div>

        <p className="text-center text-sm text-star-dust/50 mt-8">
          <Link href="/bazaar/contributions" className="hover:text-star-dust hover:underline">
            Contributions
          </Link>
          {' — your part in every work, recorded.'}
        </p>

        {/* Philosophy */}
        <Card
          data={{ id: 'bazaar-philosophy', type: 'value', title: 'How It Works', value: '' }}
          variant="glass"
          radius="xl"
          shadow="md"
          className="mt-12 p-8 text-center"
        >
          <h2 className="text-xl font-bold text-star-dust mb-4">How the Bazaar Works</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div>
              <h3 className="text-neurospark font-semibold mb-2 flex items-center gap-2">
                <span aria-hidden="true" className="w-6 h-6 rounded-full bg-neurospark/20 flex items-center justify-center text-xs">1</span>
                Create
              </h3>
              <p className="text-sm text-star-dust/50">
                Weavers craft their works in the Loom. Set a price, add contributors,
                and publish to the Tapestry.
              </p>
            </div>
            <div>
              <h3 className="text-mood-creative font-semibold mb-2 flex items-center gap-2">
                <span aria-hidden="true" className="w-6 h-6 rounded-full bg-mood-creative/20 flex items-center justify-center text-xs">2</span>
                Discover
              </h3>
              <p className="text-sm text-star-dust/50">
                Browse the Tapestry for works. Meet the Weavers and Guild members who
                make the Sanctuary thrive.
              </p>
            </div>
            <div>
              <h3 className="text-sanctuary-green font-semibold mb-2 flex items-center gap-2">
                <span aria-hidden="true" className="w-6 h-6 rounded-full bg-sanctuary-green/20 flex items-center justify-center text-xs">3</span>
                Circulate
              </h3>
              <p className="text-sm text-star-dust/50">
                90% goes to the ware&apos;s contributors, divided equally. 10% platform fee, of
                which 30% returns to the residual pool on every sale — and an artisan may pledge
                up to 50% of their own 90% to that pool besides.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
