// src/components/hermes/bazaar/residual/ResidualFAQ.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: "What is the platform fee?",
    a: "The platform fee is fixed at 10% of every sale. This is significantly lower than industry standard (30-50%) and covers hosting, development, and support costs."
  },
  {
    q: "Who decides the residual percentage?",
    a: "Creators set what percentage of the platform fee goes to the residual pool (0-100%). This allows creators to share value with contributors while maintaining their own earnings."
  },
  {
    q: "How are contributor percentages determined?",
    a: "Creators assign percentages to each contributor based on their contribution. These are set at product creation and cannot be changed retroactively."
  },
  {
    q: "Do I get paid forever?",
    a: "Yes. Every time the product sells, the residual pool is distributed to all contributors according to their set percentages. Forever."
  },
  {
    q: "What about one-time costs like printing?",
    a: "You can mark a contribution as 'one-time' which means they receive a flat fee instead of ongoing residuals. This is ideal for manufacturing, printing, or other one-off costs."
  },
  {
    q: "Can I see how much I've earned?",
    a: "Yes. Every contributor has a dashboard showing all residual payments, with a public ledger for full transparency."
  },
  {
    q: "What happens if a product is refunded?",
    a: "Residual payments are reversed or adjusted automatically to ensure fairness."
  }
];

export function ResidualFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {faqs.map((faq, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          viewport={{ once: true }}
          className="border border-white/10 rounded-xl overflow-hidden bg-white/5 hover:bg-white/10 transition-colors"
        >
          <button
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="w-full flex justify-between items-center p-5 text-left"
          >
            <span className="text-white font-medium">{faq.q}</span>
            <motion.div
              animate={{ rotate: openIndex === idx ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="text-white/40" size={18} />
            </motion.div>
          </button>
          
          <AnimatePresence>
            {openIndex === idx && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-5 pt-0 text-white/60 border-t border-white/10">
                  {faq.a}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}