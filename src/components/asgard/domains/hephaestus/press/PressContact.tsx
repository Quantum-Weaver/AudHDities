// src/components/asgard/domains/hephaestus/press/PressContact.tsx
// ─────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────

'use client';

import { Card } from '@/components/runes/Card';
import { Mail } from 'lucide-react';
import { CONTACT_LABELS } from '@/lib/constants/components/asgard/domains/iris/contact/contact.constants';

export function PressContact() {
  return (
    <Card
      variant="interactive"
      data={{ id: 'press-contact', type: 'value', title: 'Write to a person', value: '' }}
      radius="lg"
      shadow="md"
      className="p-6 space-y-4"
    >
      <h2 className="text-xl font-semibold text-star-dust">Write to a person</h2>

      <p className="text-star-dust/75">
        There is no press kit, no media pack and no coverage yet — nothing has
        been written about the Sanctuary so far, and nothing is sitting behind
        a download button waiting for you. Ask for what you need and it will be
        written for you by hand.
      </p>

      <div className="pt-2">
        <p className="text-xs uppercase tracking-wide text-star-dust/62 mb-2">
          the house&rsquo;s one public address
        </p>
        <a
          href={`mailto:${CONTACT_LABELS.EMAIL_ADDRESS}`}
          className="inline-flex items-center gap-2 rounded-lg border border-neurospark/30 bg-neurospark/10 px-4 py-2 text-neurospark transition-colors motion-reduce:transition-none hover:bg-neurospark/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hearth-gold focus-visible:ring-offset-2 focus-visible:ring-offset-deep-space"
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          <span>{CONTACT_LABELS.EMAIL_ADDRESS}</span>
        </a>
      </div>
    </Card>
  );
}
