// src/components/asgard/domains/hermes/bazaar/BazaarHub.tsx
'use client';

import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { 
  Package, Users, Building2, Palette, 
  HandCoins, CreditCard, ArrowRight, Sparkles 
} from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

const SECTIONS = [
  {
    title: 'The Tapestry',
    description: 'Discover works from sovereign souls',
    href: '/bazaar/creations',
    icon: Package,
    color: 'text-neurospark',
    bg: 'bg-neurospark/10',
  },
  {
    title: 'The Weavers',
    description: 'Meet the artisans of the Sanctuary',
    href: '/bazaar/creators',
    icon: Users,
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
  },
  {
    title: 'The Guild',
    description: 'Ethical merchants serving the community',
    href: '/bazaar/vendors',
    icon: Building2,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
  {
    title: 'The Loom',
    description: 'Create and share your own works',
    href: '/bazaar/studio',
    icon: Palette,
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
  },
  {
    title: 'Contributions Ledger',
    description: 'Track your distributions and impact',
    href: '/bazaar/contributions',
    icon: HandCoins,
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
  },
  {
    title: 'The Exchange',
    description: 'Bring home your wares securely',
    href: '/bazaar/checkout',
    icon: CreditCard,
    color: 'text-teal-400',
    bg: 'bg-teal-500/10',
  },
];

export function BazaarHub() {
  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-neurospark/10 px-4 py-2 rounded-full mb-4">
            <Sparkles size={14} className="text-neurospark" />
            <span className="text-neurospark text-sm">The Marketplace</span>
          </div>
          <h1 className="text-3xl font-bold text-star-dust mb-4">The Bazaar</h1>
          <p className="text-lg text-star-dust/60 max-w-xl mx-auto">
            Where sovereign souls exchange their gifts. Every exchange supports artisans,
            contributors, and the community — forever.
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <div className={`w-12 h-12 ${section.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <section.icon className={section.color} size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-star-dust mb-2 group-hover:text-neurospark transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-sm text-star-dust/50 mb-4">
                    {section.description}
                  </p>
                  <span className="flex items-center gap-1 text-xs text-neurospark opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore <ArrowRight size={12} />
                  </span>
                </Card>
              </Link>
            );
          })}
        </div>

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
                <span className="w-6 h-6 rounded-full bg-neurospark/20 flex items-center justify-center text-xs">1</span>
                Create
              </h3>
              <p className="text-sm text-star-dust/50">
                Weavers craft their works in the Loom. Set tiered pricing, add contributors,
                and publish to the Tapestry.
              </p>
            </div>
            <div>
              <h3 className="text-purple-400 font-semibold mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-xs">2</span>
                Discover
              </h3>
              <p className="text-sm text-star-dust/50">
                Browse the Tapestry for works. Meet the Weavers and Guild members who
                make the Sanctuary thrive.
              </p>
            </div>
            <div>
              <h3 className="text-emerald-400 font-semibold mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs">3</span>
                Circulate
              </h3>
              <p className="text-sm text-star-dust/50">
                90% goes to artisans. 10% platform fee — with up to 50% flowing to contributors
                forever through the residual pool.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}