// components/legal/TermsSection.tsx
// ─────────────────────────────────────────────────────────────────────────
// 2026-08-25 — THE ENTRANCE REMOVED, and the reason measured.
//
// This card used to arrive with `initial={{ opacity: 0, y: 20 }}` and a
// `whileInView` that raised it. Measured this sitting with Chrome's
// --force-prefers-reduced-motion and a DOM dump: WITH REDUCED MOTION ON,
// THE ENTRANCE NEVER RUNS AND THE ELEMENT STAYS AT ITS INITIAL STATE —
// opacity 0. Every section of /privacy, /terms and /apps/privacy was
// invisible to a reader who had asked for less motion. The content was in
// the DOM the whole time, at `opacity:0;transform:translateY(20px)`.
//
// That is the worst possible shape of this bug: asking for less motion cost
// the reader the document. Motion needs consent (HANDOFF.md) — and consent
// must never be charged for.
//
// So the entrance is gone. The card simply is. The chevron's rotation and
// the disclosure's height still animate, because those are responses to a
// press the reader made, and both take a reduced-motion guard below.
//
// THE SAME DEFECT STANDS IN ~45 OTHER FILES that animate in from
// `opacity: 0`. Named for the chassis; not swept here.
// ─────────────────────────────────────────────────────────────────────────
'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown, Shield, Users, DollarSign, Scale, BookOpen, Mail } from 'lucide-react';

interface TermsSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function TermsSection({ title, icon, children, defaultOpen = false }: TermsSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const stillness = useReducedMotion();

  return (
    <div
      className="border border-white/10 rounded-xl overflow-hidden bg-white/5 hover:bg-white/10 transition-all duration-300 motion-reduce:transition-none"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hearth-gold focus-visible:ring-offset-2 focus-visible:ring-offset-deep-space"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
            {icon}
          </div>
          <h2 className="text-xl font-bold text-star-dust">{title}</h2>
        </div>
        {/* The chevron turns because the reader pressed something. Under
            reduced motion it arrives turned, with no travel. */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: stillness ? 0 : 0.3 }}
        >
          <ChevronDown className="text-star-dust/70" size={20} aria-hidden="true" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={stillness ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={stillness ? { height: 0, opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: stillness ? 0 : 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 border-t border-white/10 prose prose-invert max-w-none">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}