// src/components/asgard/auth/FarewellCeremony.tsx
// ============================================================================
// THE FAREWELL — the going's own ceremony (Shuttle Run 08, Phase 5,
// Movement IV, "THE WEARING" — built by the finishing session, 2026-07-29)
// ============================================================================
// Provenance: the study record (fable lanes/study/e2-the-ux-study-bus.md).
// KP's ⚛ third word, given by his own hand within minutes of the gap being
// named, verbatim: "Gweld ti'n fuan" - see you soon. Welsh — the pantheon's
// weave grew its third tongue: Old Norse named the door (Velkomin), Irish
// warmed the hearth (Fáilte), Welsh keeps the going. The only departure
// word that carries a return inside it. ✍ GATE ① (2026-07-29): the Three
// Words are street-wide — every app inherits them at its own thresholds.
//
// STROKE 5 GOVERNS: ceremonies are opt-in. This component renders ONLY when
// the vessel chose the farewell in their Sanctum (ceremony_farewell — the
// switchboard's own column; absence of choice means OFF, always). No
// pre-checked anything; a vessel who never opts in simply leaves, plainly.
//
// The beats are the emitted costume (ceremonies.css, generated
// gather 1200ms → escort 2000ms → release 500ms, total 3700ms — "no one
// transitions unaccompanied"). Keyframes are the generated vocabulary
// (animations.css: fadeInUp, consciousnessBreath). Under reduced motion the
// generated CSS stills every beat; here the whole ceremony also SHORTENS to
// one still breath, because a vessel who asked the world to stop moving is
// not made to wait out a 3.7s choreography (the vessel's filters outrank
// every dress). Register law: calm, no inflection, no exclamation.
// The north star is served most literally here: at the moment of leaving,
// attention is RETURNED — no re-engagement hook, no "are you sure," no
// parting ask. Only the word, and the going.

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
      className="ceremony-farewell fixed inset-0 z-50 flex flex-col items-center justify-center bg-cosmic-deep/95 px-6 text-center"
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

      {/* beat three — go gently; you are held even in leaving. The release
          is the going itself: onComplete fires as this beat ends. */}
      <span
        aria-hidden="true"
        className="beat-release mt-6 block h-px w-16 bg-star-dust/30"
        style={{ animationName: 'fadeInUp' }}
      />
    </div>
  );
}
