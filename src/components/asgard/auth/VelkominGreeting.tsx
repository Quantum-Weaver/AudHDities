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
// DATED HOOK (2026-07-20) → TURNED ON AT THE SANCTUM'S CHOICE (2026-07-29,
// Movement IV, the finishing session): the Sanctum now offers the richer
// arrival as an explicit opt-in (ceremony_arrival, default false —
// migrations/20260729_ceremony_choices.sql). When — and only when — the
// vessel chose it, the crossing wears O-1's `.ceremony-welcome` (approach/
// weave/seat/bless beats, emitted in ceremonies.css; keyframes from the
// generated animations vocabulary). The calm word remains the default for
// everyone else, exactly as shipped in Movement III. The seam's other half
// (`.ceremony-recognition` for returns) stays named, not wired — returns
// are recognitions, and recognition surfaces belong to a later movement.

'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@/hooks/useUser';

const CROSSING_FLAG_KEY = 'sanctuary:velkomin-crossed';
// KP ⚛ 2026-08-24, answer 2: the word also fires at /sanctuary, the visitors'
// home. Its own flag — a visitor's greeting must not spend the vessel's
// crossing at /vessel, which is a different arrival in the same session.
const ARRIVAL_FLAG_KEY = 'sanctuary:velkomin-arrived';

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/** Has this session already crossed the threshold? Read once, at mount. */
function hasAlreadyCrossed(flagKey: string): boolean {
  if (typeof window === 'undefined') return true;
  try {
    return window.sessionStorage.getItem(flagKey) === '1';
  } catch {
    // Storage unavailable (private mode, etc.) — degrade to "always fresh"
    // rather than throwing; a repeated Velkomin is a softer failure than a
    // broken page.
    return false;
  }
}

function markCrossed(flagKey: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(flagKey, '1');
  } catch {
    // Nothing to do — the greeting simply may repeat this session.
  }
}

export interface VelkominGreetingProps {
  /** The visitors' home: the word fires for anyone who arrives, signed in or
   *  not, and degrades to "Velkomin." alone when there is no display name. */
  visitors?: boolean;
}

export default function VelkominGreeting({ visitors = false }: VelkominGreetingProps = {}) {
  const { user, profile, isLoading } = useUser();
  const flagKey = visitors ? ARRIVAL_FLAG_KEY : CROSSING_FLAG_KEY;
  const [shouldRender, setShouldRender] = useState(false);
  const [visible, setVisible] = useState(false);
  // The richer arrival — ONLY at the vessel's own Sanctum choice
  // (ceremony_arrival, default false; read defensively so a not-yet-
  // migrated base means the calm default, which is the opt-in law working).
  const [richerArrival, setRicherArrival] = useState(false);

  // Decide, once, whether this mount IS the crossing.
  useEffect(() => {
    if (isLoading) return;
    if (!user && !visitors) return;
    if (hasAlreadyCrossed(flagKey)) return;

    markCrossed(flagKey);
    setShouldRender(true);
  }, [isLoading, user, visitors, flagKey]);

  // Read the ceremony choice only when this mount is a crossing at all.
  useEffect(() => {
    if (!shouldRender || !user) return;
    fetch(`/api/generated/hestia-core/vessel_config?created_by=${user.id}&limit=1`)
      .then((r) => r.json())
      .then((res) => {
        const row = res.success ? (res.data?.data ?? [])[0] : undefined;
        setRicherArrival(
          !!row && (row as Record<string, unknown>).ceremony_arrival === true
        );
      })
      .catch(() => {});
  }, [shouldRender, user]);

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

  if (richerArrival) {
    // The opted-in welcome ceremony — the word approaches, the blessing
    // follows (O-1's emitted beats; the generated CSS stills every beat
    // under reduced motion). Same words, same register: the ceremony is
    // more time, never more noise.
    return (
      <div
        className="ceremony-welcome w-full max-w-3xl mx-auto px-6 pt-8 text-center"
        data-testid="velkomin-greeting"
      >
        <p
          className="beat-approach text-lg md:text-xl font-medium text-star-dust"
          style={{ animationName: 'fadeInUp' }}
        >
          {words}
        </p>
        <p
          className="beat-bless mt-2 text-sm text-star-dust/50"
          style={{ animationName: 'fadeInUp' }}
        >
          The flame has been waiting.
        </p>
      </div>
    );
  }

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
