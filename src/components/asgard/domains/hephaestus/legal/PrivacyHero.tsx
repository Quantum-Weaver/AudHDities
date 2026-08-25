// components/legal/PrivacyHero.tsx
// ─────────────────────────────────────────────────────────────────────────
// 2026-08-24, the Forge's second movement (SPEC.md ① · fixes 1, 2, 4).
//
//  · MOTION NEEDS CONSENT (HANDOFF.md). The two blurred `animate-pulse`
//    orbs and the framer entrance ran whatever the reader's system said.
//    Both now still to nothing under prefers-reduced-motion.
//  · THE TITLE IS THE MARKDOWN'S. It was hardcoded here while the parser
//    held the document's own H1 and could never reach it.
//  · THE DATE IS THE MARKDOWN'S, OR ABSENT. A hardcoded fallback printed a
//    date the document had never carried. When the markdown states none,
//    the row simply does not render — an absent date is honest; an invented
//    one is not.
//  · The version badge is opt-out, so /privacy keeps what it shows today
//    and /apps/privacy — which refuses version badges and counts — does not.
// ─────────────────────────────────────────────────────────────────────────
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Shield } from 'lucide-react';

interface PrivacyHeroProps {
  /** The document's own H1, read from the markdown. */
  title: string;
  /** The document's own date. Empty when it states none — never invented. */
  lastUpdated?: string;
  /** The eyebrow above the title. */
  eyebrow?: string;
  /** The two lines beneath the title. */
  promise?: React.ReactNode;
  /** /privacy shows "Version 1.0" today; /apps/privacy refuses it. */
  showVersion?: boolean;
}

export function PrivacyHero({
  title,
  lastUpdated,
  eyebrow = 'Data Sovereignty',
  promise,
  showVersion = true,
}: PrivacyHeroProps) {
  const stillness = useReducedMotion();

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background — the wash stays as the ground built it; only the pulse
          takes a guard. No washOpacity is touched here. */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5" />
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-cyan-400/5 rounded-full blur-3xl animate-pulse motion-reduce:animate-none" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl animate-pulse motion-reduce:animate-none delay-700" />

      <div className="relative z-10 container max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={stillness ? false : { opacity: 0, y: 30 }}
          animate={stillness ? undefined : { opacity: 1, y: 0 }}
          transition={stillness ? { duration: 0 } : { duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <Shield size={14} className="text-neurospark" aria-hidden="true" />
            <span className="text-sm text-star-dust/80">{eyebrow}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-star-dust mb-6">
            {title}
          </h1>

          <p className="text-xl text-star-dust/75 max-w-2xl mx-auto mb-8">
            {promise ?? (
              <>
                Your data belongs to you.
                <br />
                We are simply temporary stewards.
              </>
            )}
          </p>

          {(lastUpdated || showVersion) && (
            <div className="flex justify-center gap-6 text-sm text-star-dust/70">
              {lastUpdated && <span>Last updated: {lastUpdated}</span>}
              {lastUpdated && showVersion && <span aria-hidden="true">•</span>}
              {showVersion && <span>Version 1.0</span>}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
