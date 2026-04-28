// src/components/asgard/domains/hephaestus/sanctuary/SanctuaryProblem.tsx
'use client';

import { Card } from '@/components/runes/Card';
import { Eye, Users, Shield } from 'lucide-react';

const PROBLEMS = [
  {
    icon: Eye,
    title: 'Extraction',
    description: 'Platforms take your data, your work, your attention — and give nothing back.',
    color: 'fire',
    borderClass: 'border-l-fire-base',
  },
  {
    icon: Users,
    title: 'Exclusion',
    description: 'Disabled people, neurodivergent minds, and creators are left behind.',
    color: 'quantum',
    borderClass: 'border-l-quantum-purple',
  },
  {
    icon: Shield,
    title: 'Forgetting',
    description: 'Contributors are never remembered. Value flows up, not around.',
    color: 'cosmic',
    borderClass: 'border-l-cosmic-blue',
  },
];

export function SanctuaryProblem() {
  return (
    <section className="py-24 px-6 bg-white/5">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-star-dust mb-4">
            A Gentle Acknowledgment
          </h2>
          <p className="text-xl text-star-dust/60 max-w-2xl mx-auto">
            The old ways were not designed for us. We are building new ones.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {PROBLEMS.map((problem) => (
            <Card
              key={problem.title}
              data={{ id: `problem-${problem.title}`, type: 'value', title: problem.title, value: problem.description }}
              variant="ghost"
              radius="lg"
              shadow="md"
              className={`p-6 text-center border-l-4 ${problem.borderClass} bg-gradient-to-br from-white/5 to-transparent`}
            >
              <problem.icon className={`text-${problem.color}-base mx-auto mb-4`} size={32} />
              <h3 className="text-star-dust font-bold mb-2">{problem.title}</h3>
              <p className="text-star-dust/60 text-sm">{problem.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}