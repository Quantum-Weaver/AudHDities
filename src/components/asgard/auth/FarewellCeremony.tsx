// src/components/asgard/auth/FarewellCeremony.tsx
// ============================================================================
// ============================================================================

'use client';

import { useEffect, useRef, useState } from 'react';

/** The emitted beat clock (ceremonies.css, quoted not re-decided). */
const FAREWELL_TOTAL_MS = 3700;
/** One still breath — the reduced-motion whole (readable, never rushed). */
const FAREWELL_STILL_MS = 1400;

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export interface FarewellCeremonyProps {
  /** The vessel's display name, if they have one (degrades whole without). */
  vesselName?: string | null;
  /** Called when the release beat completes — the actual going happens here. */
  onComplete: () => void;
}

export default function FarewellCeremony({
  vesselName,
  onComplete,
}: FarewellCeremonyProps) {
  const [still] = useState(prefersReducedMotion);
  const completedRef = useRef(false);

  useEffect(() => {
    const duration = still ? FAREWELL_STILL_MS : FAREWELL_TOTAL_MS;
    const timer = window.setTimeout(() => {
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete();
      }
    }, duration);
    return () => window.clearTimeout(timer);
  }, [still, onComplete]);

  const name = vesselName?.trim();

  return (
    <div
      role="status"
      aria-live="polite"
      className="ceremony-farewell fixed inset-0 z-50 flex flex-col items-center justify-center bg-(--color-deep-space)/95 px-6 text-center"
      data-testid="farewell-ceremony"
    >
      {/* beat one — the circle pauses together */}
      <p
        className="beat-gather text-lg font-medium text-star-dust md:text-xl"
        style={{ animationName: 'fadeInUp' }}
      >
        {name ? `Gweld ti’n fuan, ${name}.` : 'Gweld ti’n fuan.'}
      </p>

      {/* beat two — no one transitions unaccompanied */}
      <p
        className="beat-escort mt-2 text-sm text-star-dust/50"
        style={{ animationName: 'consciousnessBreath' }}
      >
        see you soon — nothing here decays while you are gone
      </p>

      <span
        aria-hidden="true"
        className="beat-release mt-6 block h-px w-16 bg-star-dust/30"
        style={{ animationName: 'fadeInUp' }}
      />
    </div>
  );
}
