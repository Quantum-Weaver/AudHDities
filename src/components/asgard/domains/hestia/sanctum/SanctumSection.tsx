// src/components/asgard/domains/hestia/sanctum/SanctumSection.tsx
'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { Card } from '@/components/runes/Card';
import { cn } from '@/lib/utils';
import type { CardData } from '@/types/components/runes/card.types';

export interface SanctumSectionProps {
  /** Stable key; the open or closed state is remembered under it in this browser. */
  id: string;
  title: string;
  lead?: string;
  data: CardData;
  variant?: 'sanctuary' | 'interactive';
  defaultOpen?: boolean;
  children: ReactNode;
}

const storageKey = (id: string) => `sanctum:${id}`;

export function SanctumSection({
  id,
  title,
  lead,
  data,
  variant = 'sanctuary',
  defaultOpen = true,
  children,
}: SanctumSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  useEffect(() => {
    try {
      const remembered = localStorage.getItem(storageKey(id));
      if (remembered === 'open') setOpen(true);
      if (remembered === 'closed') setOpen(false);
    } catch {
      // the browser keeps nothing; the default stands
    }
  }, [id]);

  const toggle = () => {
    setOpen((current) => {
      const next = !current;
      try {
        localStorage.setItem(storageKey(id), next ? 'open' : 'closed');
      } catch {
        // the browser keeps nothing; the state still changes
      }
      return next;
    });
  };

  return (
    <Card
      variant={variant}
      data={data}
      radius="lg"
      shadow="md"
      className={cn('mb-6 bg-surface/90', open ? 'p-8' : 'px-8 py-5')}
    >
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls={`sanctum-${id}`}
        className="flex w-full items-center justify-between text-left"
      >
        <h2 className="text-lg font-semibold text-star-dust">{title}</h2>
        <ChevronDown
          aria-hidden="true"
          className={cn('h-4 w-4 text-star-dust/60 transition-transform', open && 'rotate-180')}
        />
      </button>
      {open && (
        <div id={`sanctum-${id}`} className="mt-4">
          {lead && <p className="text-sm text-star-dust/70 mb-4">{lead}</p>}
          {children}
        </div>
      )}
    </Card>
  );
}
