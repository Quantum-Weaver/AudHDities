// src/components/asgard/auth/VelkominGreeting.tsx
// ============================================================================
// ============================================================================

'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@/hooks/useUser';

const CROSSING_FLAG_KEY = 'sanctuary:velkomin-crossed';
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
  const [richerArrival, setRicherArrival] = useState(false);

  useEffect(() => {
    if (isLoading) return;
    if (!user && !visitors) return;
    if (hasAlreadyCrossed(flagKey)) return;

    markCrossed(flagKey);
    setShouldRender(true);
  }, [isLoading, user, visitors, flagKey]);

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

  const words = vesselName ? `Velkomin, ${vesselName}.` : 'Velkomin.';

  if (richerArrival) {
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
