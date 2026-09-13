// src/components/asgard/domains/themis/admin/AdminHub.tsx
'use client';

import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { ArrowLeft, Users, Shield, FileText, Database } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

const ADMIN_SECTIONS = [
  { title: 'Vessel Management', description: 'The vessels of the Sanctuary and the roles they carry', href: '/council/admin/users', icon: Users, color: 'text-neurospark' },
  { title: 'Content Moderation', description: 'Review flagged content and take action', href: '/council/reports', icon: Shield, color: 'text-hearth-gold' },
  { title: 'Audit Logs', description: 'Administrative and moderation actions, as they were taken', href: '/council/admin/audit', icon: FileText, color: 'text-mood-creative' },
  { title: 'Schema Explorer', description: 'The living blueprint of the base', href: '/observatory/schema', icon: Database, color: 'text-sanctuary-green' },
];

export function AdminHub() {
  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-6xl mx-auto px-6">

        <div className="mb-8">
          <Link href="/council" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2">
            <ArrowLeft className="h-4 w-4" />Return to the Council
          </Link>
          <h1 className="text-2xl font-bold text-star-dust">Administration</h1>
          <p className="text-sm text-star-dust/40 mt-1">Tools for Sanctuary stewards</p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ADMIN_SECTIONS.map((section) => {
            const cardData: CardData = { id: section.href, type: 'value', title: section.title, value: section.description };
            const Icon = section.icon;
            return (
              <Link key={section.href} href={section.href} className="group">
                <Card data={cardData} variant="interactive" radius="lg" shadow="sm" className="p-6 h-full">
                  <Icon className={`h-8 w-8 ${section.color} mb-3`} />
                  <h2 className="text-lg font-semibold text-star-dust mb-2">{section.title}</h2>
                  <p className="text-sm text-star-dust/50">{section.description}</p>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
