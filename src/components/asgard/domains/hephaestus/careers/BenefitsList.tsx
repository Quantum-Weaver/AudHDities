// components/supporting/BenefitsList.tsx
// Employee benefits showcase

"use client";

import { Card } from "@/components/runes/Card";

interface Benefit {
  title: string;
  description: string;
  icon: string;
}

const benefits: Benefit[] = [
  {
    title: "Sovereign Schedule",
    description: "Work when you're most productive. No fixed hours, just outcomes.",
    icon: "⏰",
  },
  {
    title: "Residual Revenue",
    description: "Every contribution earns perpetual residuals. Build once, benefit forever.",
    icon: "💰",
  },
  {
    title: "Remote-First",
    description: "Work from anywhere. We're building a digital sanctuary, not an office.",
    icon: "🌍",
  },
  {
    title: "Neurodivergent Support",
    description: "Sensory accommodations, flexible communication, and understanding leadership.",
    icon: "🧩",
  },
  {
    title: "Health & Wellness",
    description: "Comprehensive health coverage for you and your vessel.",
    icon: "❤️",
  },
  {
    title: "Learning Budget",
    description: "Annual stipend for courses, tools, and resources to fuel your growth.",
    icon: "📚",
  },
  {
    title: "Equity in the Vision",
    description: "Every team member holds a stake in the Sanctuary's success.",
    icon: "🔮",
  },
  {
    title: "Creative Freedom",
    description: "Pursue passion projects. Innovation emerges from joy, not assignment.",
    icon: "🎨",
  },
];

export function BenefitsList() {
  return (
    <Card 
      data={{ id: 'benefits-list', type: 'value', title: 'What We Offer', value: '' }}
      variant="ghost"
      radius="lg"
      shadow="sm"
      className="p-6"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-star-dust mb-2">What We Offer</h2>
        <p className="text-star-dust/60">The rewards of answering the calling</p>
      </div>
      <div className="space-y-4">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <span className="text-2xl">{benefit.icon}</span>
            <div>
              <h3 className="font-semibold text-star-dust">{benefit.title}</h3>
              <p className="text-sm text-star-dust/60">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}