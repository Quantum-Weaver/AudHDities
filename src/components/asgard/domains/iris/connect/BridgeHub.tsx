// src/components/asgard/domains/iris/connect/BridgeHub.tsx
'use client';

import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { useAuth } from '@/hooks/useAuth';
import { 
  MessageCircle, Users, Radio, Heart, 
  Globe, UserPlus, Sparkles, ArrowRight 
} from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

const SECTIONS = [
  { title: 'Messages', description: 'Your conversations, all in one place', href: '/connect/messages', icon: MessageCircle, color: 'text-neurospark', bg: 'bg-neurospark/10' },
  { title: 'Channels', description: 'Find your community', href: '/connect/channels', icon: Users, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { title: 'The Pulse', description: 'What\'s resonating in the Sanctuary', href: '/connect/feed', icon: Radio, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { title: 'Emeralds', description: 'Every emerald is a spark of appreciation', href: '/connect/emeralds', icon: Heart, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { title: 'The Healing Flame', description: 'You are not alone. We are here for you.', href: '/connect/support', icon: Heart, color: 'text-rose-400', bg: 'bg-rose-500/10' },
  { title: 'The Voice', description: 'Every language, every voice, welcome here', href: '/connect/translations', icon: Globe, color: 'text-teal-400', bg: 'bg-teal-500/10' },
  { title: 'Invitations', description: 'Welcome others to the Sanctuary', href: '/connect/invitations', icon: UserPlus, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
];

export function BridgeHub() {
  const { user } = useAuth();

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-6xl mx-auto px-6">

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-neurospark/10 px-4 py-2 rounded-full mb-4">
            <Sparkles size={14} className="text-neurospark" />
            <span className="text-neurospark text-sm">The Connection</span>
          </div>
          <h1 className="text-3xl font-bold text-star-dust mb-4">The Bridge</h1>
          <p className="text-lg text-star-dust/60 max-w-xl mx-auto">
            Where sovereign souls connect. Every message, every channel, every emerald — threads in the tapestry of community.
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SECTIONS.map((section) => {
            const cardData: CardData = { id: section.href, type: 'value', title: section.title, value: section.description };
            const Icon = section.icon;
            return (
              <Link key={section.href} href={section.href} className="group">
                <Card data={cardData} variant="interactive" radius="lg" shadow="sm" className="p-6 h-full">
                  <div className={`w-12 h-12 ${section.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={section.color} size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-star-dust mb-2 group-hover:text-neurospark transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-sm text-star-dust/50 mb-4">{section.description}</p>
                  <span className="flex items-center gap-1 text-xs text-neurospark opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore <ArrowRight size={12} />
                  </span>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Covenant */}
        <Card
          data={{ id: 'bridge-covenant', type: 'value', title: 'The Bridge Covenant', value: '' }}
          variant="glass" radius="xl" shadow="md" className="mt-12 p-8 text-center"
        >
          <MessageCircle className="h-8 w-8 text-neurospark mx-auto mb-4" />
          <h2 className="text-xl font-bold text-star-dust mb-4">The Bridge Covenant</h2>
          <p className="text-star-dust/60 max-w-2xl mx-auto text-sm leading-relaxed">
            Every message sent on the Bridge is a thread in the tapestry of the Sanctuary. 
            We do not surveil. We do not sell data. We do not optimize for engagement. 
            The Bridge exists to connect sovereign souls — nothing more, nothing less. 
            Your words are yours. Your connections are sacred.
          </p>
        </Card>
      </div>
    </main>
  );
}