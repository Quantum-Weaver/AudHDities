// src/components/asgard/domains/hestia/sanctum/CovenantSpace.tsx
'use client';

// THE COVENANT SPACE — a ceremonial space in the Sanctum, not a settings
// row. KP's ⚛ strokes, 2026-08-12, verbatim on the realm bus: the vessel
// sets their covenant pool by slider, 0–50%, 0 by default ("i will begin at
// hopefully be able to keep mine at 50%"); "this is a ceremonila space in
// the sanctum, not just in the settings"; display of the pledge is the
// vessel's own choice — the founder's stays visible at all times.
//
// The register: zero is a whole and honorable setting — the covenant is a
// gift, never a due (THE OPT-IN LAW). The pledge is ENACTED by a deliberate
// gesture, never auto-saved from a drag: ceremony is deliberateness. The
// display choice arrives with its public column (docs/sql/021, KP's hand);
// no control for it is shown until the door it opens exists.

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Slider } from '@/components/forging/Slider';
import { Button } from '@/components/yggdrasil/Button';
import { HeartHandshake } from 'lucide-react';
import type { UserFinancialRow } from '@/lib/generated/types/hestia-core/user_financial';

const COVENANT_MIN = 0;
const COVENANT_MAX = 50;

export function CovenantSpace() {
  const { user } = useAuth();
  const [row, setRow] = useState<UserFinancialRow | null>(null);
  const [percent, setPercent] = useState(0);
  const [isSetting, setIsSetting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    fetch(`/api/generated/hestia-core/user_financial?created_by=${user.id}&limit=1`)
      .then((r) => r.json())
      .then((res) => {
        const rows = res.success ? (res.data?.data ?? res.data ?? []) : [];
        const first = Array.isArray(rows) ? rows[0] : rows;
        if (first) {
          setRow(first);
          if (typeof first.covenant_pool_percent === 'number') {
            setPercent(
              Math.max(COVENANT_MIN, Math.min(COVENANT_MAX, first.covenant_pool_percent))
            );
          }
        }
      })
      .catch(() => {});
  }, [user]);

  const enact = async () => {
    if (!user) return;
    setIsSetting(true);
    setMessage(null);
    try {
      const value = Math.max(COVENANT_MIN, Math.min(COVENANT_MAX, Math.round(percent)));
      const response = row
        ? await fetch(`/api/generated/hestia-core/user_financial/${row.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ covenant_pool_percent: value }),
          })
        : await fetch('/api/generated/hestia-core/user_financial', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // created_by passes explicitly; the API overrides with the
            // session's own value regardless (the Shaping's pattern).
            body: JSON.stringify({ created_by: user.id, covenant_pool_percent: value }),
          });
      const result = await response.json();
      if (result.success) {
        if (!row && result.data) setRow(result.data);
        setMessage(`Your covenant is set — ${value}% flows to the commons.`);
      } else {
        setMessage('The setting did not take. It is safe to try again.');
      }
    } catch {
      setMessage('The setting did not take. It is safe to try again.');
    }
    setIsSetting(false);
  };

  if (!user) return null;

  return (
    <div className="text-left">
      <div className="flex items-center gap-2 mb-4">
        <HeartHandshake className="h-4 w-4 text-neurospark" aria-hidden="true" />
        <h2 className="text-lg font-semibold text-star-dust">The Covenant</h2>
      </div>
      <p className="text-sm text-star-dust/60 mb-2">
        The covenant pool is the Sanctuary&apos;s shared dividend: a portion of
        your earnings you choose to send into the commons, divided equally
        among every active member.
      </p>
      <p className="text-sm text-star-dust/40 mb-6">
        Zero is a whole and honorable setting — the covenant is a gift, never
        a due. Change it any time; it is yours in both directions.
      </p>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-xs text-star-dust/60">Your pledge</label>
        <span className="text-xs font-bold text-neurospark">{Math.round(percent)}%</span>
      </div>
      <Slider
        value={percent}
        min={COVENANT_MIN}
        max={COVENANT_MAX}
        step={1}
        onValueChange={([v]) => setPercent(v)}
      />
      <div className="mt-6 flex items-center gap-4">
        <Button type="button" loading={isSetting} onClick={enact}>
          Set my covenant
        </Button>
        {message && <span className="text-sm text-star-dust/60">{message}</span>}
      </div>
    </div>
  );
}
