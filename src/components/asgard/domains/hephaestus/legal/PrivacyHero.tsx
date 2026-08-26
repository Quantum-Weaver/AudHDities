// components/legal/PrivacyHero.tsx
// ─────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────
// No entrance animation: a framer fade from `opacity: 0` never runs under
// prefers-reduced-motion, which left the hero invisible.
'use client';

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
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5" />
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-cyan-400/5 rounded-full blur-3xl animate-pulse motion-reduce:animate-none" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl animate-pulse motion-reduce:animate-none delay-700" />

      <div className="relative z-10 container max-w-4xl mx-auto px-6 text-center">
        <div>
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
        </div>
      </div>
    </section>
  );
}
