// src/components/asgard/domains/hephaestus/onboarding/InfoTable.tsx
'use client';

import { motion } from 'framer-motion';
import { PartyPopper, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface NextStepsProps {
  steps: string[];
  actionText?: string;
  actionLink?: string;
}

export function NextSteps({ steps, actionText = "Get Started", actionLink = "/dashboard" }: NextStepsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-12 p-8 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-white/20 rounded-2xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <PartyPopper className="text-pink-400" size={28} />
        <h3 className="text-2xl font-bold text-star-dust">Ready to Start?</h3>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-star-dust font-bold mb-3">Your Next Steps:</h4>
          <ul className="space-y-2">
            {steps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2 text-star-dust/70">
                <span className="text-neurospark mt-1">✦</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex items-center justify-center">
          <Link
            href={actionLink}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-star-dust rounded-xl font-bold transition-all shadow-lg shadow-cyan-500/20"
          >
            {actionText}
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}