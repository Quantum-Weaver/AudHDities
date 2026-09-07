// src/components/asgard/domains/hestia/sanctum/PayoutsSpace.tsx
'use client';

import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/yggdrasil/Button';

interface PayoutStatus {
  connected: boolean;
  payoutsEnabled?: boolean;
  chargesEnabled?: boolean;
  detailsSubmitted?: boolean;
  currentlyDue?: string[];
  schedule?: string | null;
}

export function PayoutsSpace() {
  const [status, setStatus] = useState<PayoutStatus | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const load = useCallback(async () => {
    const res = await fetch('/api/auth/payouts').then((r) => r.json()).catch(() => null);
    setStatus(res?.success ? (res.data as PayoutStatus) : { connected: false });
  }, []);

  useEffect(() => { load(); }, [load]);

  const go = async (action: 'connect' | 'manage', newTab = false) => {
    setBusy(true);
    setMessage(null);
    const res = await fetch('/api/auth/payouts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action }),
    }).then((r) => r.json()).catch(() => null);
    const url = res?.success ? (res.data?.url as string | undefined) : undefined;
    if (!url) {
      setMessage(res?.error ?? 'Stripe did not answer.');
      setBusy(false);
      return;
    }
    if (newTab) {
      window.open(url, '_blank', 'noopener');
      setBusy(false);
    } else {
      window.location.assign(url);
    }
  };

  if (!status) return <p className="text-sm text-star-dust/50">Reading your payout account…</p>;

  const due = status.currentlyDue?.length ?? 0;

  return (
    <div className="text-left">
      <p className="text-sm text-star-dust/60 mb-4">
        Payouts run through a Stripe account that belongs to you. Stripe holds
        your identity, bank, and tax details; the Sanctuary holds only the
        account&apos;s id and whether payouts are live.
      </p>

      {!status.connected && (
        <div className="flex flex-wrap items-center gap-3">
          <Button type="button" loading={busy} onClick={() => go('connect')}>
            Connect payouts
          </Button>
          <span className="text-xs text-star-dust/50">Opens Stripe&apos;s setup and returns you here.</span>
        </div>
      )}

      {status.connected && !status.payoutsEnabled && (
        <div className="flex flex-wrap items-center gap-3">
          <Button type="button" loading={busy} onClick={() => go('connect')}>
            Finish setup
          </Button>
          <span className="text-xs text-star-dust/50">
            {status.detailsSubmitted
              ? 'Stripe is reviewing your details.'
              : due > 0
                ? `Stripe still needs ${due} ${due === 1 ? 'item' : 'items'}.`
                : 'Setup is not complete yet.'}
          </span>
        </div>
      )}

      {status.connected && status.payoutsEnabled && (
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-neurospark">Payouts live{status.schedule ? ` · ${status.schedule}` : ''}</span>
          <Button type="button" loading={busy} onClick={() => go('manage', true)}>
            Manage payouts
          </Button>
        </div>
      )}

      {message && <p className="text-sm text-amber-300 mt-3">{message}</p>}
    </div>
  );
}
