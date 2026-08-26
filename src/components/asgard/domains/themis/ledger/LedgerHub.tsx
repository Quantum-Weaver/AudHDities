// src/components/asgard/domains/themis/ledger/LedgerHub.tsx
// ═════════════════════════════════════════════════════════════════════════
// WHAT LEFT, and why:
// ═════════════════════════════════════════════════════════════════════════

'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, FileText, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PublicLedger } from '@/lib/generated/types/plutus-economics/ledger';

type LedgerEntry = PublicLedger;

const LEDGER_DOOR_CONFIRMED = false;

const PAGE_SIZE = 50;

/** Kind labels — verbatim from this file's own 2026 set. */
const ENTRY_TYPE_LABELS: Record<string, string> = {
  sale: 'exchange',
  platform_fee: 'platform fee',
  residual_payout: 'residual distribution',
  covenant_distribution: 'covenant distribution',
  infrastructure: 'infrastructure',
};

/** Cosmic tokens, never stock Tailwind. Colour is never the only carrier —
 *  the kind is always spelled out in words beside it. */
const ENTRY_COLORS: Record<string, string> = {
  sale: 'bg-neurospark/15 text-neurospark border-neurospark/30',
  platform_fee: 'bg-mood-creative/15 text-mood-creative border-mood-creative/30',
  residual_payout: 'bg-sanctuary-green/15 text-sanctuary-green border-sanctuary-green/30',
  covenant_distribution: 'bg-hearth-gold/15 text-hearth-gold border-hearth-gold/30',
  infrastructure: 'bg-void-light/15 text-void-light border-void-light/30',
};

const FILTERS: { value: string; label: string }[] = [
  { value: '', label: 'All entries' },
  { value: 'sale', label: 'exchange' },
  { value: 'platform_fee', label: 'platform fee' },
  { value: 'residual_payout', label: 'residual distribution' },
  { value: 'covenant_distribution', label: 'covenant distribution' },
  { value: 'infrastructure', label: 'infrastructure' },
];

type LoadState = 'loading' | 'ready' | 'error';

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hearth-gold focus-visible:ring-offset-2 focus-visible:ring-offset-deep-space';

export function LedgerHub() {
  const [entries, setEntries] = useState<LedgerEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [state, setState] = useState<LoadState>('loading');
  const [filter, setFilter] = useState('');
  const [loadingMore, setLoadingMore] = useState(false);

  const load = useCallback(async (which: number, kind: string, append: boolean) => {
    if (append) setLoadingMore(true);
    else setState('loading');

    const params = new URLSearchParams({
      sort: 'created_at',
      order: 'desc',
      limit: String(PAGE_SIZE),
      page: String(which),
    });
    if (kind) params.set('entry_type', kind);

    try {
      const response = await fetch(`/api/generated/plutus-economics/ledger?${params.toString()}`);
      const result = await response.json();
      if (!response.ok || !result?.success) {
        throw new Error(result?.error || `The ledger request answered ${response.status}`);
      }
      const rows: LedgerEntry[] = result.data?.data ?? [];
      setEntries((prev) => (append ? [...prev, ...rows] : rows));
      setTotal(result.data?.pagination?.total ?? 0);
      setPage(which);
      setState('ready');
    } catch {
      if (!append) setState('error');
    } finally {
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    void load(1, filter, false);
  }, [load, filter]);

  const formatAmount = (amount: number, currency?: string) => {
    try {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency || 'USD' }).format(amount);
    } catch {
      return `$${amount.toFixed(2)}`;
    }
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  /** What the row hangs from — the exchange, the pool, the thing that made
   *  it. Never invented: when the row names nothing, the cell says so. */
  const hangsFrom = (entry: LedgerEntry) => {
    if (entry.reference_table) {
      const where = entry.reference_table.replace(/_/g, ' ');
      return entry.reference_id ? `${where} · ${entry.reference_id.slice(0, 8)}` : where;
    }
    return null;
  };

  const hasMore = entries.length < total;

  const linkUp = (
    <div className="rounded-xl border border-star-dust/15 bg-surface/40 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-star-dust">
            The public telling lives at Transparency
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-star-dust/70">
            Lifetime totals, where the fee goes, and the admin log — written once,
            and read by anyone. This page is the entries themselves.
          </p>
        </div>
        <Link
          href="/transparency"
          className={cn(
            'inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-neurospark/30 bg-neurospark/10 px-3 py-2 text-sm text-neurospark transition-colors motion-reduce:transition-none hover:bg-neurospark/20',
            FOCUS_RING
          )}
        >
          <span>Read the public telling</span>
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-5xl mx-auto px-6">

        <div className="mb-8">
          <Link
            href="/council"
            className={cn(
              'mb-2 flex w-fit items-center gap-2 rounded text-sm text-star-dust/70 transition-colors motion-reduce:transition-none hover:text-star-dust',
              FOCUS_RING
            )}
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />Return to the Council
          </Link>
          <h1 className="text-2xl font-bold text-star-dust">The Ledger</h1>
          <p className="mt-1 text-sm text-star-dust/70">
            Every entry, one line each, in the order they were written.
          </p>
        </div>

        <div className="mb-8">{linkUp}</div>

        {/* THE FILTERS — real buttons, six of them, in the URL */}
        <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter entries by kind">
          {FILTERS.map((f) => {
            const on = filter === f.value;
            return (
              <button
                key={f.value || 'all'}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(f.value)}
                className={cn(
                  'rounded-full border px-3 py-1.5 text-xs transition-colors motion-reduce:transition-none',
                  FOCUS_RING,
                  on
                    ? 'border-neurospark/40 bg-neurospark/15 text-neurospark'
                    : 'border-star-dust/15 text-star-dust/70 hover:text-star-dust hover:bg-white/5'
                )}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* LOADING — a single still line. No skeleton pulses; nothing moves. */}
        {state === 'loading' && (
          <p className="py-16 text-center text-sm text-star-dust/70">Reading the ledger…</p>
        )}

        {state === 'error' && (
          <div className="py-16 text-center">
            <AlertCircle className="mx-auto mb-4 block h-10 w-10 text-star-dust/40" aria-hidden="true" />
            <p className="text-lg text-star-dust">The ledger could not be read just now</p>
            <p className="mx-auto mt-2 max-w-xl text-sm text-star-dust/70">
              This is not an empty ledger — it is a page that did not get an
              answer. Nothing has been lost. Try again, or read the public
              telling, which is written from the same rows.
            </p>
            <button
              type="button"
              onClick={() => void load(1, filter, false)}
              className={cn(
                'mt-6 rounded-lg border border-star-dust/20 px-4 py-2 text-sm text-star-dust transition-colors motion-reduce:transition-none hover:bg-white/5',
                FOCUS_RING
              )}
            >
              Try again
            </button>
          </div>
        )}

        {state === 'ready' && entries.length === 0 && !LEDGER_DOOR_CONFIRMED && (
          <div className="py-16 text-center">
            <AlertCircle className="mx-auto mb-4 block h-10 w-10 text-star-dust/40" aria-hidden="true" />
            <p className="text-lg text-star-dust">The ledger is not yet readable from this room</p>
            <p className="mx-auto mt-2 max-w-xl text-sm text-star-dust/70">
              The request answered, and it answered with nothing — which here
              means the door has not been opened, not that nothing has
              happened. This page will not tell you the ledger is empty until
              it can actually see that it is. The public telling is written
              from the same rows.
            </p>
          </div>
        )}

        {/* THE DRAWN EMPTY STATE — live the moment the door is confirmed. */}
        {state === 'ready' && entries.length === 0 && LEDGER_DOOR_CONFIRMED && (
          <div className="py-16 text-center">
            <FileText className="mx-auto mb-4 block h-10 w-10 text-star-dust/40" aria-hidden="true" />
            <p className="text-lg text-star-dust">The ledger has not been written in yet</p>
            <p className="mx-auto mt-2 max-w-xl text-sm text-star-dust/70">
              Nothing has moved through the Sanctuary so far. This is a page
              waiting for its first line, not a page that lost one — when an
              exchange happens, it writes itself here and on the public
              telling in the same breath.
            </p>
            <Link
              href="/transparency"
              className={cn(
                'mt-6 inline-flex items-center gap-1.5 rounded-lg border border-star-dust/20 px-4 py-2 text-sm text-star-dust transition-colors motion-reduce:transition-none hover:bg-white/5',
                FOCUS_RING
              )}
            >
              <span>Read the public telling</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        )}

        {/* THE ENTRIES — rows, not shadowed cards. Rows take no tab stop. */}
        {state === 'ready' && entries.length > 0 && (
          <>
            <ul className="divide-y divide-star-dust/10 border-y border-star-dust/10">
              {entries.map((entry) => {
                const where = hangsFrom(entry);
                return (
                  <li
                    key={entry.id}
                    className="grid grid-cols-[7rem_11rem_1fr_auto] items-baseline gap-4 py-3 max-md:grid-cols-1 max-md:gap-1"
                  >
                    <span className="text-xs text-star-dust/70 tabular-nums">
                      {formatDate(entry.event_at || entry.created_at)}
                    </span>
                    <span>
                      <span
                        className={cn(
                          'inline-block rounded-full border px-2 py-0.5 text-[10px]',
                          ENTRY_COLORS[entry.entry_type] || 'border-star-dust/20 text-star-dust/70'
                        )}
                      >
                        {ENTRY_TYPE_LABELS[entry.entry_type] || entry.entry_type?.replace(/_/g, ' ')}
                      </span>
                    </span>
                    <span className="min-w-0 text-sm text-star-dust/85">
                      {entry.icon_emoji && <span className="mr-1">{entry.icon_emoji}</span>}
                      {entry.description || <span className="text-star-dust/62">no description written</span>}
                      {where && (
                        <span className="block text-xs text-star-dust/62">{where}</span>
                      )}
                    </span>
                    <span
                      className={cn(
                        'font-mono text-sm font-bold md:text-right',
                        entry.entry_type === 'sale' ? 'text-neurospark' : 'text-star-dust/85'
                      )}
                    >
                      {formatAmount(entry.amount, entry.currency)}
                    </span>
                  </li>
                );
              })}
            </ul>

            <p className="mt-4 text-xs text-star-dust/70">
              Showing the {entries.length} most recent{' '}
              {entries.length === 1 ? 'entry' : 'entries'} of {total}. Older
              entries are behind &ldquo;show earlier&rdquo;; nothing is hidden, and this
              line never says a number the page did not actually count.
            </p>

            {hasMore && (
              <button
                type="button"
                disabled={loadingMore}
                onClick={() => void load(page + 1, filter, true)}
                className={cn(
                  'mt-4 rounded-lg border border-star-dust/20 px-4 py-2 text-sm text-star-dust transition-colors motion-reduce:transition-none hover:bg-white/5 disabled:opacity-60',
                  FOCUS_RING
                )}
              >
                {loadingMore ? 'Reading…' : 'Show earlier'}
              </button>
            )}
          </>
        )}
      </div>
    </main>
  );
}
