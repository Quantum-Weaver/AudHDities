// src/components/asgard/domains/hephaestus/sanctuary/SanctuaryPillars.tsx
'use client';

import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { Heart, Infinity, Globe, Star } from 'lucide-react';

const PILLARS = [
  {
    icon: Heart,
    title: 'Dignity for All',
    description: 'Every community member receives a share — active or not. Disabled, neurodivergent, and anyone the system left behind.',
    badge: 'Universal dignity',
    color: 'neurospark',
  },
  {
    icon: Infinity,
    title: 'Value Circulation',
    description: '90% of every sale circulates. Residuals flow to everyone who helped build what sells — and to every contributor on the platform, equally.',
    badge: 'Never extraction',
    color: 'quantum-purple',
  },
  {
    icon: Globe,
    title: 'Sovereign Ownership',
    description: 'You own your data. You control your experience. You choose to opt in — and get paid when you do.',
    badge: 'Your sovereignty',
    color: 'fire-base',
  },
];

export function SanctuaryPillars() {
  return (
    <section className="py-24 px-6">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-neurospark/10 px-4 py-2 rounded-full mb-4">
            <Star size={14} className="text-neurospark" />
            <span className="text-neurospark text-sm">A Different Way</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-star-dust mb-4">
            What We Built
          </h2>
          <p className="text-xl text-star-dust/60 max-w-2xl mx-auto">
            A place where value circulates, dignity is guaranteed, and everyone belongs.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {PILLARS.map((pillar) => (
            <Card
              key={pillar.title}
              data={{ id: `pillar-${pillar.title}`, type: 'value', title: pillar.title, value: pillar.description }}
              variant="glass"
              radius="lg"
              shadow="md"
              className="p-6 text-center"
            >
              <div className={`w-16 h-16 bg-${pillar.color}/20 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <pillar.icon className={`text-${pillar.color}`} size={28} />
              </div>
              <h3 className="text-xl font-bold text-star-dust mb-2">{pillar.title}</h3>
              <p className="text-star-dust/60 text-sm mb-4">{pillar.description}</p>
              <Badge variant="outline">{pillar.badge}</Badge>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}