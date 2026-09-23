// src/components/asgard/domains/hermes/artisans/ArtisanTiers.tsx
'use client';

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/yggdrasil/Accordion';
import { RungLadder } from '@/components/asgard/domains/hermes/wares/RungLadder';
import type { Tables } from '@/lib/generated/supabase/database.helpers.js';

type WareRow = Tables<'wares'>;

interface ArtisanTiersProps {
  /** The artisan's published rungs. */
  rungs: WareRow[];
}

/** One small card, closed until pressed, holding the artisan's support tiers. */
export function ArtisanTiers({ rungs }: ArtisanTiersProps) {
  if (rungs.length === 0) return null;

  return (
    <Accordion variant="separated" className="mt-6">
      <AccordionItem value="tiers">
        <AccordionTrigger>
          <span className="font-semibold text-star-dust">Support</span>
          <span className="text-sm text-star-dust/50">
            {' · '}{rungs.length} {rungs.length === 1 ? 'tier' : 'tiers'}
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <RungLadder rungs={rungs} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
