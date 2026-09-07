// src/components/asgard/domains/hestia/sanctum/InventoryShelf.tsx
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/yggdrasil/Button';
import { cn } from '@/lib/utils';

export type InventoryBucket = 'interiors' | 'exteriors';

export interface InventoryItem {
  name: string;
  size: number;
  createdAt: string | null;
  url: string | null;
}

interface Shelf {
  items: InventoryItem[];
  used: number;
  limit: number;
  worn: string | null;
}

export interface InventoryShelfProps {
  bucket: InventoryBucket;
  /** Called with the item to wear, or null to wear none. */
  onWear: (item: InventoryItem | null) => Promise<void> | void;
  className?: string;
}

const MB = 1024 * 1024;
const EMPTY: Shelf = { items: [], used: 0, limit: 0, worn: null };

function formatBytes(n: number): string {
  return n >= MB ? `${(n / MB).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`;
}

export function InventoryShelf({ bucket, onWear, className }: InventoryShelfProps) {
  const [shelf, setShelf] = useState<Shelf>(EMPTY);
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [confirmPurge, setConfirmPurge] = useState(false);
  const addInput = useRef<HTMLInputElement>(null);
  const replaceInput = useRef<HTMLInputElement>(null);
  const replacing = useRef<string | null>(null);
  const base = `/api/auth/vessel/inventory/${bucket}`;

  const load = useCallback(async () => {
    const res = await fetch(base).then((r) => r.json()).catch(() => null);
    if (res?.success) setShelf(res.data as Shelf);
  }, [base]);

  useEffect(() => { load(); }, [load]);

  const send = async (file: File, replaceName?: string) => {
    setBusy(replaceName ?? 'add');
    setMessage(null);
    const form = new FormData();
    form.append('file', file);
    if (replaceName) form.append('replace', replaceName);
    const res = await fetch(base, { method: 'POST', body: form }).then((r) => r.json()).catch(() => null);
    if (!res?.success) setMessage(res?.error ?? 'The upload did not land.');
    await load();
    setBusy(null);
  };

  const remove = async (name?: string) => {
    setBusy(name ?? 'purge');
    setMessage(null);
    const res = await fetch(base, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(name ? { name } : { all: true }),
    }).then((r) => r.json()).catch(() => null);
    if (!res?.success) setMessage(res?.error ?? 'Nothing was removed.');
    setConfirmPurge(false);
    await load();
    setBusy(null);
  };

  const wear = async (item: InventoryItem | null) => {
    setBusy(item?.name ?? 'none');
    await onWear(item);
    await load();
    setBusy(null);
  };

  const isWorn = (item: InventoryItem) =>
    Boolean(shelf.worn) && (shelf.worn === item.name || shelf.worn!.endsWith(`/${item.name}`));

  const room = Math.max(0, shelf.limit - shelf.used);
  const fill = shelf.limit > 0 ? Math.min(100, Math.round((shelf.used / shelf.limit) * 100)) : 0;

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div>
        <div className="flex items-center justify-between text-xs text-star-dust/60 mb-1">
          <span>{formatBytes(shelf.used)} of {formatBytes(shelf.limit)} on the shelf</span>
          <span>{formatBytes(room)} free</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
          <div className="h-full bg-neurospark/70 transition-all" style={{ width: `${fill}%` }} />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button type="button" size="sm" loading={busy === 'add'} onClick={() => addInput.current?.click()}>
          Add
        </Button>
        <Button
          type="button"
          size="sm"
          disabled={shelf.items.length === 0}
          onClick={() => window.location.assign(`${base}?export=1`)}
        >
          Export
        </Button>
        {confirmPurge ? (
          <>
            <Button type="button" size="sm" loading={busy === 'purge'} onClick={() => remove()} className="border-red-500/40 text-red-300">
              Purge all?
            </Button>
            <Button type="button" size="sm" onClick={() => setConfirmPurge(false)}>
              Keep
            </Button>
          </>
        ) : (
          <Button type="button" size="sm" disabled={shelf.items.length === 0} onClick={() => setConfirmPurge(true)}>
            Purge
          </Button>
        )}
        {shelf.worn && (
          <Button type="button" size="sm" loading={busy === 'none'} onClick={() => wear(null)}>
            Wear none
          </Button>
        )}
      </div>

      {message && <p className="text-sm text-amber-300">{message}</p>}

      {shelf.items.length === 0 ? (
        <p className="text-sm text-star-dust/50">Nothing on this shelf yet.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {shelf.items.map((item) => (
            <li
              key={item.name}
              className={cn(
                'rounded-lg border p-2 flex flex-col gap-2',
                isWorn(item) ? 'border-neurospark/50 bg-neurospark/5' : 'border-white/10 bg-deep-space/30'
              )}
            >
              <div className="aspect-video w-full overflow-hidden rounded-md bg-black/30">
                {item.url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.url} alt="" className="h-full w-full object-cover" />
                )}
              </div>
              <div className="flex items-center justify-between text-xs text-star-dust/60">
                <span className="truncate" title={item.name}>{item.name.replace(/^\d+-/, '')}</span>
                <span>{formatBytes(item.size)}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <Button type="button" size="sm" disabled={isWorn(item)} loading={busy === item.name} onClick={() => wear(item)}>
                  {isWorn(item) ? 'Worn' : 'Wear'}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => { replacing.current = item.name; replaceInput.current?.click(); }}
                >
                  Replace
                </Button>
                <Button type="button" size="sm" onClick={() => remove(item.name)}>
                  Remove
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <input
        ref={addInput}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) send(file);
          e.target.value = '';
        }}
      />
      <input
        ref={replaceInput}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          const name = replacing.current;
          replacing.current = null;
          if (file && name) send(file, name);
          e.target.value = '';
        }}
      />
    </div>
  );
}
