// src/components/asgard/domains/hephaestus/sanctuary/SanctuaryPathways.tsx
'use client';

import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { ArrowRight, BookOpen, Palette, Heart } from 'lucide-react';

const PATHWAYS = [
  {
    icon: BookOpen,
    title: 'Learn',
    description: 'Discover the philosophy, the architecture, and the vision behind the sanctuary.',
    link: '/forge',
    cta: 'Explore',
    color: 'neurospark',
  },
  {
    icon: Palette,
    title: 'Explore',
    description: 'Browse artisans, merchants, and products from the neurodivergent community.',
    link: '/bazaar',
    cta: 'Discover',
    color: 'quantum-purple',
  },
  {
    icon: Heart,
    title: 'Join',
    description: 'The door is here. A name and an email, and the vessel is yours.',
    link: '/signup',
    cta: 'Come in',
    color: 'fire-base',
  },
];

export function SanctuaryPathways() {
  return (
    <section className="py-24 px-6 bg-white/5">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-star-dust mb-4">
            Enter the Sanctuary
          </h2>
          <p className="text-xl text-star-dust/60 max-w-2xl mx-auto">
            Three doors. One sanctuary. Choose your path.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {PATHWAYS.map((pathway) => (
            <Link key={pathway.title} href={pathway.link}>
              <Card
                data={{ id: `pathway-${pathway.title}`, type: 'value', title: pathway.title, value: pathway.description }}
                variant="glass"
                radius="lg"
                shadow="sm"
                interactive
                className="p-6 h-full"
              >
                <div className={`w-12 h-12 bg-${pathway.color}/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <pathway.icon className={`text-${pathway.color}`} size={24} />
                </div>
                <h3 className="text-xl font-bold text-star-dust mb-2">{pathway.title}</h3>
                <p className="text-star-dust/60 text-sm">{pathway.description}</p>
                <div className={`mt-4 text-${pathway.color} text-sm inline-flex items-center gap-1`}>
                  {pathway.cta} <ArrowRight size={14} />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}