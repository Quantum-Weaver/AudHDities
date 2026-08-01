// src/components/asgard/domains/themis/delegation/DelegationHub.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Avatar, AvatarFallback } from '@/components/runes/Avatar';
import { Badge } from '@/components/runes/Badge';
import { Button } from '@/components/yggdrasil/Button';
import { useUser } from '@/hooks/useUser';
import { ArrowLeft, Users, UserCheck, Shield, Sparkles } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

export function DelegationHub() {
  const { profile, roles } = useUser();
  const [delegates, setDelegates] = useState<any[]>([]);
  const isCouncilTier = roles.includes('council') || roles.includes('admin');

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

        {!isCouncilTier ? (
          <Card
            data={{ id: 'delegation-tier', type: 'value', title: 'Council Tier Required', value: '' }}
            variant="glass" radius="lg" shadow="sm" className="p-6 text-center"
          >
            <Shield className="h-8 w-8 text-amber-400 mx-auto mb-3" />
            <p className="text-star-dust/60 text-sm">Delegation requires Council tier. Reach 500 sovereignty to participate.</p>
          </Card>
        ) : (
          <>
            {/* Your Delegates */}
            <Card
              data={{ id: 'your-delegates', type: 'value', title: 'Your Delegates', value: '' }}
              variant="sanctuary" radius="xl" shadow="md" className="p-6 mb-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <UserCheck className="h-5 w-5 text-neurospark" />
                <h2 className="text-lg font-semibold text-star-dust">Your Delegates</h2>
              </div>

              {delegates.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="h-8 w-8 text-star-dust/20 mx-auto mb-3" />
                  <p className="text-star-dust/40 text-sm">You have not delegated your vote yet.</p>
                  <p className="text-star-dust/30 text-xs mt-1">When you find a curator whose judgment you trust, you can delegate your voting power to them.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {delegates.map((d) => (
                    <div key={d.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                      <Avatar size="default"><AvatarFallback>{d.name?.[0] || 'D'}</AvatarFallback></Avatar>
                      <div className="flex-1"><span className="text-star-dust text-sm">{d.name}</span></div>
                      <Button variant="ghost" size="sm">Revoke</Button>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* How It Works */}
            <Card
              data={{ id: 'delegation-info', type: 'value', title: 'How Delegation Works', value: '' }}
              variant="glass" radius="lg" shadow="sm" className="p-6 text-center"
            >
              <Sparkles className="h-5 w-5 text-purple-400 mx-auto mb-3" />
              <div className="grid grid-cols-3 gap-4 text-left">
                <div>
                  <span className="w-6 h-6 rounded-full bg-neurospark/20 flex items-center justify-center text-xs text-neurospark mb-2">1</span>
                  <h4 className="text-sm font-medium text-star-dust mb-1">Choose</h4>
                  <p className="text-xs text-star-dust/50">Find a curator whose judgment you trust from the Curators directory.</p>
                </div>
                <div>
                  <span className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-xs text-purple-400 mb-2">2</span>
                  <h4 className="text-sm font-medium text-star-dust mb-1">Delegate</h4>
                  <p className="text-xs text-star-dust/50">Assign your voting power to them. They vote on your behalf.</p>
                </div>
                <div>
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs text-emerald-400 mb-2">3</span>
                  <h4 className="text-sm font-medium text-star-dust mb-1">Revoke</h4>
                  <p className="text-xs text-star-dust/50">You can reclaim your voting power at any time. Sovereignty is never permanent.</p>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>
    </main>
  );
}