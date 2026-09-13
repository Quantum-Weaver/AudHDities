// src/components/asgard/domains/themis/delegation/DelegationHub.tsx
'use client';

import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { ArrowLeft, Users, Sparkles } from 'lucide-react';

export function DelegationHub() {
  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-4xl mx-auto px-6">

        <div className="mb-8">
          <Link href="/council" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2">
            <ArrowLeft className="h-4 w-4" />Return to the Council
          </Link>
          <h1 className="text-2xl font-bold text-star-dust">Delegation</h1>
          <p className="text-sm text-star-dust/40 mt-1">Trust your voice to those who share your values</p>
        </div>

        <Card
          data={{ id: 'delegation-closed', type: 'value', title: 'Delegation Is Not Yet Open', value: '' }}
          variant="sanctuary" radius="xl" shadow="md" className="p-8 text-center mb-8"
        >
          <Users className="h-8 w-8 text-star-dust/30 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-star-dust mb-2">Delegation is not yet open</h2>
          <p className="text-star-dust/60 text-sm max-w-lg mx-auto">
            The Sanctuary keeps no record of delegated votes, so no voice can be assigned or reclaimed here today.
            Every vote is cast by the vessel that holds it, at{' '}
            <Link href="/council/voting" className="text-neurospark hover:underline">Voting</Link>.
          </p>
        </Card>

        <Card
          data={{ id: 'delegation-info', type: 'value', title: 'How Delegation Will Work', value: '' }}
          variant="glass" radius="lg" shadow="sm" className="p-6"
        >
          <Sparkles className="h-5 w-5 text-mood-creative mx-auto mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div>
              <span className="w-6 h-6 rounded-full bg-neurospark/20 flex items-center justify-center text-xs text-neurospark mb-2">1</span>
              <h3 className="text-sm font-medium text-star-dust mb-1">Choose</h3>
              <p className="text-xs text-star-dust/50">Find a curator whose judgment you trust in the Curators directory.</p>
            </div>
            <div>
              <span className="w-6 h-6 rounded-full bg-mood-creative/20 flex items-center justify-center text-xs text-mood-creative mb-2">2</span>
              <h3 className="text-sm font-medium text-star-dust mb-1">Delegate</h3>
              <p className="text-xs text-star-dust/50">Assign your voting power to them. They vote on your behalf.</p>
            </div>
            <div>
              <span className="w-6 h-6 rounded-full bg-sanctuary-green/20 flex items-center justify-center text-xs text-sanctuary-green mb-2">3</span>
              <h3 className="text-sm font-medium text-star-dust mb-1">Revoke</h3>
              <p className="text-xs text-star-dust/50">You reclaim your voting power at any time. Sovereignty is never permanent.</p>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
