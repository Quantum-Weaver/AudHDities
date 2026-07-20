// src/components/asgard/auth/VelkominGreeting.tsx
// ============================================================================
// VELKOMIN — the Sanctuary threshold's own word (Shuttle Run 08, Phase 5,
// Movement III, "THE THRESHOLDS")
// ============================================================================
// Provenance: resonance-chamber/desk/REIMAGINING-BOARD.md, THE SIX STROKES,
// stroke 1 — KP's own closing word, verbatim: "Velkomin at the door + Fáilte
// at the Hearth." Old Norse "well come" — chosen deliberately as the
// INCLUSIVE form (Old Norse greetings inflect by the arriving guest's
// gender; the house takes the form that addresses all who arrive, so the
// door never assumes). This is the DOOR's word — distinct from Fáilte, the
// Hearth's own greeting (see AuthenticatedGreeting.tsx). The two never
// render in the same glance: this fires once, at the crossing; Fáilte is
// the Hearth's persistent, later word.
//
// Register law (KP's Phase 4 strokes, carried verbatim): calm, gentle, no
// inflection or inference; no "back," no exclamation — rendered exactly as
// signed: "Velkomin, {vessel_name}." with the period. Degrades gracefully:
// "Velkomin." alone is still whole if no display name exists.
//
// THE CROSSING, not the corridor: this greets the vessel's first landing
// after authentication (AUTH_ROUTES.DASHBOARD → /vessel — the honest
// convergence point: LoginForm's default redirect, and where the Acid
// Test's own completion (AcidTestForm's RESULT_REDIRECT) lands a brand-new
// vessel too). A sessionStorage flag makes it fire once per session — on
// arrival-from-the-door, not on every internal navigation back to /vessel.
// The flag is intentionally NOT tied to the user id: one session, one
// crossing, regardless of who is at the keyboard.
//
// THE OPT-IN LAW, honored: this is the calm-word default, not a "richer"
// entry ceremony — it requires no toggle because it IS the default arrival
// (paired with Movement I's existing beam grounding, already wired via
// showContinuityBeam on the /vessel page). A soft opacity fade only;
// instant under prefers-reduced-motion.
//
// DATED HOOK (not built, not defaulted — 2026-07-20): should the Sanctum
// ever offer a richer, explicitly opt-in arrival ceremony, the natural
// composing token is O-1's `.ceremony-welcome` (ceremonies.css — approach/
// weave/seat/bless beats, written for exactly a first admission) for the
// inaugural crossing, with `.ceremony-recognition` for returns thereafter.
// Neither is wired here; this file only leaves the seam named, per the
// opt-in law — a future Sanctum choice turns it on, never a shipped default.

'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@/hooks/useUser';

const CROSSING_FLAG_KEY = 'sanctuary:velkomin-crossed';

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/** Has this session already crossed the threshold? Read once, at mount. */
function hasAlreadyCrossed(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    return window.sessionStorage.getItem(CROSSING_FLAG_KEY) === '1';
  } catch {
    // Storage unavailable (private mode, etc.) — degrade to "always fresh"
    // rather than throwing; a repeated Velkomin is a softer failure than a
    // broken page.
    return false;
  }
}

function markCrossed(): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(CROSSING_FLAG_KEY, '1');
  } catch {
    // Nothing to do — the greeting simply may repeat this session.
  }
}

export default function VelkominGreeting() {
  const { user, profile, isLoading } = useUser();
  const [shouldRender, setShouldRender] = useState(false);
  const [visible, setVisible] = useState(false);

  // Decide, once, whether this mount IS the crossing.
  useEffect(() => {
    if (isLoading) return;
    if (!user) return;
    if (hasAlreadyCrossed()) return;

    markCrossed();
    setShouldRender(true);
  }, [isLoading, user]);

  // Soft fade in; instant under reduced motion.
  useEffect(() => {
    if (!shouldRender) return;
    if (prefersReducedMotion()) {
      setVisible(true);
      return;
    }
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [shouldRender]);

  if (!shouldRender) return null;

  const vesselName = profile?.display_name?.trim();

  // "Velkomin, {vessel_name}." verbatim — the period stands; no exclamation,
  // no "back," no inflection. Degrades to "Velkomin." alone, still whole.
  const words = vesselName ? `Velkomin, ${vesselName}.` : 'Velkomin.';

  return (
    <div
      className={
        'w-full max-w-3xl mx-auto px-6 pt-8 text-center ' +
        'transition-opacity duration-700 ease-out motion-reduce:transition-none ' +
        (visible ? 'opacity-100' : 'opacity-0')
      }
      data-testid="velkomin-greeting"
    >
      <p className="text-lg md:text-xl font-medium text-star-dust">
        {words}
      </p>
    </div>
  );
}
