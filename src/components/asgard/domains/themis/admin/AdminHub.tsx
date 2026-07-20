// src/components/asgard/domains/themis/admin/AdminHub.tsx
'use client';

import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { useUser } from '@/hooks/useUser';
import { ArrowLeft, Settings, Users, Shield, FileText, Activity, Database } from 'lucide-react';
import type { CardData } from '@/types/components/runes/card.types';

const ADMIN_SECTIONS = [
  { title: 'Vessel Management', description: 'Manage vessel accounts, roles, and permissions', href: '/council/admin/users', icon: Users, color: 'text-neurospark' },
  { title: 'Content Moderation', description: 'Review flagged content and take action', href: '/council/reports', icon: Shield, color: 'text-amber-400' },
  { title: 'System Settings', description: 'Platform configuration and parameters', href: '/council/admin/settings', icon: Settings, color: 'text-purple-400' },
  { title: 'Analytics', description: 'Usage metrics and platform health', href: '/council/admin/analytics', icon: Activity, color: 'text-emerald-400' },
  { title: 'Audit Logs', description: 'Complete record of administrative actions', href: '/council/admin/audit', icon: FileText, color: 'text-cyan-400' },
  { title: 'Schema Explorer', description: 'The living blueprint of our database', href: '/observatory/schema', icon: Database, color: 'text-teal-400' },
];

export function AdminHub() {
  const { profile, roles } = useUser();
  const isAdmin = roles.includes('admin');

  if (!isAdmin) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="mb-8">
            <Link href="/council" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-2">
              <ArrowLeft className="h-4 w-4" />Return to the Council
            </Link>
            <h1 className="text-2xl font-bold text-star-dust">Administration</h1>
          </div>
          <Card data={{ id: 'admin-restricted', type: 'value', title: 'Admin Access Only', value: '' }}
            variant="glass" radius="lg" shadow="sm" className="p-6 text-center">
            <Shield className="h-8 w-8 text-red-400 mx-auto mb-3" />
            <p className="text-star-dust/60 text-sm">Administrative tools are restricted to Sanctuary administrators.</p>
          </Card>
        </div>
      </main>
    );
  }

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
                  <h3 className="text-lg font-semibold text-star-dust mb-2">{section.title}</h3>
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