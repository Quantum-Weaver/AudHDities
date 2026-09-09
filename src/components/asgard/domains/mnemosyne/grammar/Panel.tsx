// src/components/asgard/domains/mnemosyne/grammar/Panel.tsx

import type { ReactNode } from 'react';
import { Card } from '@/components/runes/Card';
import { cn } from '@/lib/utils';

/** One panel of the atom's room: a heading, the table it reads, its rows. */
export function Panel({
  heading,
  source,
  className,
  children,
}: {
  heading: string;
  source: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Card
      data={{ id: heading, type: 'value', title: heading, value: source }}
      variant="glass"
      size="full"
      radius="lg"
      shadow="sm"
      className={cn('flex h-full flex-col gap-3 p-5', className)}
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-sm font-medium uppercase tracking-wide text-star-dust/50">{heading}</h2>
        <span className="text-[11px] text-star-dust/35">{source}</span>
      </div>
      {children}
    </Card>
  );
}
