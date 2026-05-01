// src/components/asgard/domains/hestia/vessel/QuickLinks.tsx
'use client';

import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { cn } from '@/lib/utils';
import type { CardData } from '@/types/components/runes/card.types';
import type { LucideIcon } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════

export interface QuickLink {
  href: string;
  label: string;
  icon: LucideIcon;
  id: string;
  badge?: string;
  badgeColor?: string;
}

export interface QuickLinksProps {
  links: QuickLink[];
  userId: string;
  columns?: 2 | 3 | 4;
  className?: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function QuickLinks({
  links,
  userId,
  columns = 4,
  className,
}: QuickLinksProps) {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-4',
  };

  return (
    <div className={cn('grid gap-4', gridCols[columns], className)}>
      {links.map((link) => {
        const cardData: CardData = {
          id: `${userId}-${link.id}`,
          type: 'value',
          title: link.label,
          value: '',
        };

        return (
          <Link key={link.id} href={link.href}>
            <Card
              variant="interactive"
              data={cardData}
              radius="md"
              shadow="sm"
              className="p-4 text-center relative"
            >
              <link.icon className="h-5 w-5 text-neurospark mx-auto mb-2" />
              <span className="text-sm text-star-dust/80">{link.label}</span>
              {link.badge && (
                <span
                  className={cn(
                    'absolute top-1.5 right-1.5 text-[10px] px-1.5 py-0.5 rounded-full',
                    link.badgeColor || 'bg-neurospark/20 text-neurospark'
                  )}
                >
                  {link.badge}
                </span>
              )}
            </Card>
          </Link>
        );
      })}
    </div>
  );
}