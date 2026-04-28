// src/components/asgard/domains/hephaestus/sanctuary/SanctuaryEconomics.tsx
'use client';

import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Button } from '@/components/yggdrasil/Button';
import { Eye, Zap, Coins } from 'lucide-react';

export function SanctuaryEconomics() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-neurospark/5 via-quantum-purple/5 to-fire-base/5">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full mb-4">
            <Coins size={14} className="text-neurospark" />
            <span className="text-star-dust/60 text-sm">The Economy</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-star-dust mb-4">
            How Value Flows
          </h2>
          <p className="text-xl text-star-dust/60 max-w-2xl mx-auto">
            Two streams. One sanctuary. Value that circulates forever.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card
            data={{ id: 'ad-stream', type: 'value', title: 'Advertising Stream', value: '' }}
            variant="glass"
            radius="lg"
            shadow="md"
            className="p-8 text-center"
          >
            <div className="w-12 h-12 bg-neurospark/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Eye className="text-neurospark" size={24} />
            </div>
            <h3 className="text-xl font-bold text-star-dust mb-4">Advertising Stream</h3>
            <p className="text-star-dust/60 text-sm mb-4">Vetted, values-aligned advertisers. You choose to opt in. You get paid when you do.</p>
            <div className="text-neurospark font-medium">Covers operational costs + pays users</div>
          </Card>
          
          <Card
            data={{ id: 'sales-stream', type: 'value', title: 'Sales Stream', value: '' }}
            variant="glass"
            radius="lg"
            shadow="md"
            className="p-8 text-center"
          >
            <div className="w-12 h-12 bg-quantum-purple/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="text-quantum-purple" size={24} />
            </div>
            <h3 className="text-xl font-bold text-star-dust mb-4">Sales Stream</h3>
            <p className="text-star-dust/60 text-sm mb-4">Creators sell products. 70% goes to creator + contributors. 30% supports the sanctuary.</p>
            <div className="text-quantum-purple font-medium">Creators earn. Contributors earn forever.</div>
          </Card>
        </div>
        
        <div className="text-center">
          <Link href="/docs/architecture/residual-system">
            <Button variant="outline">
              Learn How Residuals Work
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}