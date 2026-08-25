// components/legal/PrivacyFooter.tsx
// ─────────────────────────────────────────────────────────────────────────
// 2026-08-24, the Forge's second movement (SPEC.md ① · fix 4). The
// whileInView entrance ran whatever the reader's system said; motion is
// content, so it needs consent (HANDOFF.md). It now stills to nothing.
// The two ways out are visible at rest, no hover required.
// The closing line was star-dust/30 (2.3:1) and is now /70.
// ─────────────────────────────────────────────────────────────────────────
'use client';

import { Shield, Mail, FileText } from 'lucide-react';
import Link from 'next/link';

interface PrivacyFooterProps {
  /** The heading. Defaults to what /privacy has said since it was built. */
  heading?: string;
  /** The body. Defaults to /privacy's own. */
  children?: React.ReactNode;
  /** The closing line. */
  closing?: React.ReactNode;
}

export function PrivacyFooter({ heading, children, closing }: PrivacyFooterProps) {
  // THE ENTRANCE REMOVED, 2026-08-25. Same measured reason as PrivacyHero
  // and TermsSection: a framer whileInView from `opacity: 0` never runs
  // under prefers-reduced-motion, so this card was invisible to the reader
  // who asked for less motion. It simply is now.
  return (
    <div
      className="mt-16 p-8 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-purple-500/10 border border-white/20 rounded-2xl text-center"
    >
      <Shield className="text-emerald-400 mx-auto mb-4" size={32} aria-hidden="true" />
      <h3 className="text-2xl font-bold text-star-dust mb-4">
        {heading ?? 'Your Data Is Yours'}
      </h3>
      <div className="text-star-dust/75 max-w-2xl mx-auto mb-6">
        {children ?? (
          <p>
            We don&apos;t sell your data. We don&apos;t track you across the web. We
            don&apos;t profit from your attention. This Privacy Policy exists to
            protect your sovereignty, not to create loopholes for exploitation.
          </p>
        )}
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-star-dust transition-all motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hearth-gold focus-visible:ring-offset-2 focus-visible:ring-offset-deep-space"
        >
          <Mail size={18} aria-hidden="true" />
          <span>Questions? Contact Us</span>
        </Link>
        <Link
          href="/terms"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-star-dust/80 transition-all motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hearth-gold focus-visible:ring-offset-2 focus-visible:ring-offset-deep-space"
        >
          <FileText size={18} aria-hidden="true" />
          <span>Read Terms of Service</span>
        </Link>
      </div>
      <div className="text-xs text-star-dust/70 mt-6">
        {closing ?? (
          <p>
            This Privacy Policy is a covenant, not a disclaimer. We will never
            hide behind legal language to take what is yours.
          </p>
        )}
      </div>
    </div>
  );
}
