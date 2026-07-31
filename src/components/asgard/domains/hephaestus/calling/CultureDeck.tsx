// components/asgard/domains/hephaestus/calling/CultureDeck.tsx
// How this place is — the house's principles (retitled 2026-07-31, the
// truth season: no company, so no "company values" — but every principle
// below is one the house actually holds and enforces; they stay).

"use client";

import { Card } from "@/components/runes/Card";
import { cn } from "@/lib/utils";

interface CultureValue {
  title: string;
  description: string;
  icon: string;
}

const cultureValues: CultureValue[] = [
  {
    title: "Sovereignty First",
    description: "We believe every person is the sovereign of their own consciousness. Our tools empower, never control.",
    icon: "👑",
  },
  {
    title: "Radical Transparency",
    description: "Every decision, every transaction, every line of code is open for inspection.",
    icon: "🔍",
  },
  {
    title: "Neurodivergent Led",
    description: "Built by and for neurodivergent minds. Different is not broken—it's the upgrade.",
    icon: "🧠",
  },
  {
    title: "Conscious Collaboration",
    description: "We rise together. Contribution is tracked, valued, and rewarded perpetually.",
    icon: "🤝",
  },
  {
    title: "Ethical by Default",
    description: "No surveillance capitalism. No dark patterns. No extraction without consent.",
    icon: "⚖️",
  },
  {
    title: "Continuous Emergence",
    description: "We don't arrive. We become. Every day is an opportunity to evolve.",
    icon: "🦋",
  },
];

export function CultureDeck() {
  return (
    <Card 
      data={{ id: 'culture-deck', type: 'value', title: 'Our Culture', value: '' }}
      variant="ghost"
      radius="lg"
      shadow="sm"
      className="p-6"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-star-dust mb-2">How this place is</h2>
        <p className="text-star-dust/60">The principles that guide everything here</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cultureValues.map((value) => (
          <div
            key={value.title}
            className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <span className="text-2xl">{value.icon}</span>
            <div>
              <h3 className="font-semibold text-star-dust">{value.title}</h3>
              <p className="text-sm text-star-dust/60">{value.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}