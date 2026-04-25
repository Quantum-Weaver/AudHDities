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

const faqs = [
  {
    q: 'What is the platform fee?',
    a: 'The platform fee is fixed at 10% of every sale. This is significantly lower than industry standard (30-50%) and covers hosting, development, and support costs.',
  },
  {
    q: 'Who decides the residual percentage?',
    a: 'Creators set what percentage of the platform fee goes to the residual pool (0-100%). This allows creators to share value with contributors while maintaining their own earnings.',
  },
  {
    q: 'How are contributor percentages determined?',
    a: 'Creators assign percentages to each contributor based on their contribution. These are set at product creation and cannot be changed retroactively.',
  },
  {
    q: 'Do I get paid forever?',
    a: 'Yes. Every time the product sells, the residual pool is distributed to all contributors according to their set percentages. Forever.',
  },
  {
    q: 'What about one-time costs like printing?',
    a: "You can mark a contribution as 'one-time' which means they receive a flat fee instead of ongoing residuals. This is ideal for manufacturing, printing, or other one-off costs.",
  },
  {
    q: 'Can I see how much I\'ve earned?',
    a: 'Yes. Every contributor has a dashboard showing all residual payments, with a public ledger for full transparency.',
  },
  {
    q: 'What happens if a product is refunded?',
    a: 'Residual payments are reversed or adjusted automatically to ensure fairness.',
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