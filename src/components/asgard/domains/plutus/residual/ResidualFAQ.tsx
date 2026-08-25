// src/components/asgard/domains/plutus/residual/ResidualFAQ.tsx
'use client';

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/yggdrasil/Accordion';

// ============================================================================
// FAQ DATA
// ============================================================================

// Two earlier answers were removed here on 2026-08-24: a 'one-time contribution'
// flat-fee tier and an automatic refund reversal. Neither mechanism exists in the
// model (docs/architecture/residual-system.md), and a FAQ is no place to invent one.
const faqs = [
  {
    q: 'What is the platform fee?',
    a: 'The platform fee is fixed at 10% of every sale — well under the industry standard of 30-50%. Of that fee, 70% funds the machine: hosting, development, support, payment costs. That 7% of the sale is the only money that ever leaves. The other 30% of the fee returns to the residual pool on every sale, whatever anyone has set their dials to.',
  },
  {
    q: 'Who decides the residual pledge, and what is it a share of?',
    a: "A ware's main artisan sets it, per ware, anywhere from 0 to 50%, and it defaults to 0. It is a pledge out of that ware's profit — the 90% that remains after the fee — never out of the fee. What is pledged goes to the residual pool; what is left stays with the ware's contributors.",
  },
  {
    q: "How is each contributor's share worked out?",
    a: "It is not assigned — it is divided. Whatever is left of the ware's profit after the pledge divides equally among the ware's contributors, and the main artisan is one of them. There is no ranking, no role weighting, and no per-contributor percentage anywhere in the system.",
  },
  {
    q: 'Who does the residual pool pay?',
    a: 'Every artisan on the platform — any vessel who has ever appeared, even once, as an artisan or on a contributor roster. Once you are on it you are never taken off. The pool divides equally among all of them.',
  },
  {
    q: 'What is the covenant pool?',
    a: 'The dignity floor. Every vessel sets one covenant dial in the Sanctum, 0 to 50%, default 0, and it takes that slice of their own share of a sale — nothing else. The pool then pays every user who has opted in to be identified, equally, and an opt-in holds forever.',
  },
  {
    q: 'Do I get paid forever?',
    a: 'Two ways, yes. Every sale of a ware you contributed to pays you an equal share of what is left of its profit. And having contributed once, ever, puts you on the residual pool’s roster for as long as the Sanctuary stands — the pool pays it in equal shares at every distribution, whether or not that ware ever sells again.',
  },
  {
    q: 'When do the pools pay out?',
    a: 'At intervals, when the arithmetic is worth it: pool total divided by recipients, less the cost of the transaction. A payout small enough to be eaten by its own transfer fee leaves nobody better off, so it waits. The money waiting is the vessels’, held and never used for anything else.',
  },
  {
    q: 'Can I see where the money went?',
    a: 'Yes. Every transaction is visible in the public ledger, the fee’s own 70/30 split included, and what the pools are holding is checkable rather than promised. Distributions arrive whole — the only deduction a payout ever meets is its own transaction cost, named.',
  },
];

// ============================================================================
// RESIDUAL FAQ COMPONENT
// ============================================================================

export function ResidualFAQ() {
  return (
    <Accordion type="single" variant="separated" size="md">
      {faqs.map((faq) => (
        <AccordionItem key={faq.q} value={faq.q}>
          <AccordionTrigger>{faq.q}</AccordionTrigger>
          <AccordionContent>
            <p className="text-[var(--color-star-dust)]/60">{faq.a}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}