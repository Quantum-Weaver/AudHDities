// src/components/asgard/domains/iris/invitations/InvitationsHub.tsx
'use client';

import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { ArrowLeft, UserPlus, Sparkles } from 'lucide-react';

export function InvitationsHub() {
  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">

        <div className="mb-8">
          <Link href="/connect" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2">
            <ArrowLeft className="h-4 w-4" />Return to the Bridge
          </Link>
          <h1 className="text-2xl font-bold text-star-dust">Invitations</h1>
          <p className="text-sm text-star-dust/40 mt-1">Welcome others to the Sanctuary</p>
        </div>

        <Card
          data={{ id: 'invitations-waiting', type: 'value', title: 'Invitations', value: '' }}
          variant="sanctuary" radius="xl" shadow="md" className="p-10 text-center"
        >
          <UserPlus className="h-8 w-8 text-indigo-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-star-dust mb-4">Invitations are not open yet</h2>
          <p className="text-star-dust/60 text-sm leading-relaxed max-w-xl mx-auto mb-4">
            The Sanctuary keeps no record of invitations, and no link or
            message sent from this room would reach anyone. So this room
            holds no control that pretends to send one.
          </p>
          <p className="text-star-dust/60 text-sm leading-relaxed max-w-xl mx-auto">
            Anyone you want beside you can walk in the front door today.
            Send them to{' '}
            <Link href="/signup" className="text-neurospark hover:underline">
              the sign-up
            </Link>{' '}
            and they arrive as their own sovereign vessel.
          </p>
        </Card>

        <Card
          data={{ id: 'invite-covenant', type: 'value', title: 'Invitation Covenant', value: '' }}
          variant="glass" radius="lg" shadow="sm" className="mt-8 p-6 text-center"
        >
          <Sparkles className="h-5 w-5 text-purple-400 mx-auto mb-2" />
          <p className="text-xs text-star-dust/40 max-w-lg mx-auto">
            Every invitation extends the Sanctuary. Welcome those who seek sovereignty, not exploitation.
          </p>
        </Card>
      </div>
    </main>
  );
}
