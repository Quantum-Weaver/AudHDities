// src/components/asgard/domains/aethelred/nexus/NexusPageTemplate.tsx

import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { ArrowLeft } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

interface NexusPageTemplateProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
}

export function NexusPageTemplate({ title, description, icon: Icon, color }: NexusPageTemplateProps) {
  const cd: CardData = { id: title.toLowerCase().replace(/\s+/g, '-'), type: 'value', title, value: description };

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6">
        <Link href="/nexus" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6">
          <ArrowLeft className="h-4 w-4" />Return to the Nexus
        </Link>

        <Card data={cd} variant="sanctuary" radius="xl" shadow="md" className="p-8 text-center">
          <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center bg-white/5">
            <Icon size={32} className={color} />
          </div>
          <h1 className="text-2xl font-bold text-star-dust mb-4">{title}</h1>
          <p className="text-star-dust/60 max-w-lg mx-auto">{description}</p>
        </Card>
      </div>
    </main>
  );
}