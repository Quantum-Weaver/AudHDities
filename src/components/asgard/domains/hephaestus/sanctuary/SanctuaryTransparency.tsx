// src/components/asgard/domains/hephaestus/sanctuary/SanctuaryTransparency.tsx
'use client';

import Link from 'next/link';
import { Button } from '@/components/yggdrasil/Button';
import { Shield } from 'lucide-react';

export function SanctuaryTransparency() {
  return (
    <section className="py-24 px-6">
      <div className="container max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full mb-8">
          <Shield size={14} className="text-neurospark" />
          <span className="text-sm text-star-dust/70">Our Promise</span>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-star-dust mb-6">
          Radical Transparency
        </h2>
        <p className="text-xl text-star-dust/60 max-w-2xl mx-auto mb-12">
          Every dollar that moves through the sanctuary is visible. 
          Every fee explained. Every payout tracked.
        </p>
        
        <div className="flex flex-wrap gap-6 justify-center mb-12">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-sanctuary-green rounded-full" />
            <span className="text-star-dust/70">Creator: 70%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-neurospark rounded-full" />
            <span className="text-star-dust/70">Platform: 30%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-quantum-purple rounded-full" />
            <span className="text-star-dust/70">Residual Pool: adjustable (0-50%)</span>
          </div>
        </div>
        
        <Link href="/council/ledger">
          <Button variant="outline">
            View Public Ledger
          </Button>
        </Link>
      </div>
    </section>
  );
}