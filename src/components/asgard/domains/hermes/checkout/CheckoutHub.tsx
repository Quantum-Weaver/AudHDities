// src/components/asgard/domains/hermes/checkout/CheckoutHub.tsx
'use client';

import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Button } from '@/components/yggdrasil/Button';
import { ArrowLeft, CreditCard, Package, Shield } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

export function CheckoutHub() {
  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">

        <Link
          href="/bazaar"
          className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Return to the Bazaar
        </Link>

        <h1 className="text-2xl font-bold text-star-dust mb-2">The Exchange</h1>
        <p className="text-star-dust/40 mb-8">Secure, transparent, and designed for dignity.</p>

        {/* How It Works */}
        <Card
          data={{ id: 'checkout-how', type: 'value', title: 'How It Works', value: '' }}
          variant="glass"
          radius="lg"
          shadow="sm"
          className="p-6 mb-6"
        >
          <h2 className="text-lg font-semibold text-star-dust mb-4">How Exchanges Work</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="text-center">
              <Package className="h-8 w-8 text-neurospark mx-auto mb-2" />
              <h3 className="text-sm font-medium text-star-dust mb-1">1. Choose</h3>
              <p className="text-xs text-star-dust/50">Browse the Tapestry and find a work you love.</p>
            </div>
            <div className="text-center">
              <CreditCard className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <h3 className="text-sm font-medium text-star-dust mb-1">2. Bring home</h3>
              <p className="text-xs text-star-dust/50">Secure payment via Stripe. Tiered pricing based on your journey.</p>
            </div>
            <div className="text-center">
              <Shield className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
              <h3 className="text-sm font-medium text-star-dust mb-1">3. Circulate</h3>
              <p className="text-xs text-star-dust/50">90% to artisan. 10% platform fee — up to 50% flows to contributors forever.</p>
            </div>
          </div>
        </Card>

        {/* Pricing Transparency */}
        <Card
          data={{ id: 'checkout-transparency', type: 'value', title: 'Pricing', value: '' }}
          variant="sanctuary"
          radius="lg"
          shadow="sm"
          className="p-6 mb-6"
        >
          <h2 className="text-lg font-semibold text-star-dust mb-4">Transparent Pricing</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-star-dust/60">Platform Fee (fixed)</span>
              <span className="text-neurospark font-medium">10%</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-star-dust/60">Artisan Share</span>
              <span className="text-purple-400 font-medium">90%</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-star-dust/60">Residual Pool</span>
              <span className="text-emerald-400 font-medium">0-50% of platform fee</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-star-dust/60">Industry Standard Platform Fee</span>
              <span className="text-star-dust/30">30-50%</span>
            </div>
          </div>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <Link href="/bazaar/creations">
            <Button variant="primary" size="lg">
              Browse the Tapestry
            </Button>
          </Link>
          <p className="text-xs text-star-dust/30 mt-4">
            The Exchange completes on each work's page. Find something that calls to you.
          </p>
        </div>
      </div>
    </main>
  );
}