// src/components/asgard/domains/hestia/import/BringItIn.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/yggdrasil/Button';
import { useUser } from '@/hooks/useUser';
import { face, READS, whyNoReader, type EnvelopeFace } from '@/lib/import/registry';
import type { Landing, NotLanded } from '@/lib/import/types';

interface Report {
  file: string;
  app: string;
  appVersion: string;
  exportedAt: string;
  counts: Record<string, number>;
  tables: string[];
  landings: Landing[];
  notLanded: NotLanded[];
  landed: number;
  held: number;
}

const NOT_AN_ENVELOPE = 'This file is not a resonance export envelope.';
const NOTHING_CHOSEN = 'Choose an export file first.';

function stamp(when: string): string {
  if (!when) return 'no date on the envelope';
  const at = new Date(when);
  return Number.isNaN(at.getTime()) ? when : at.toLocaleString();
}

function countLine(counts: Record<string, number>): string {
  const parts = Object.entries(counts).map(([key, value]) => `${value} ${key}`);
  return parts.length > 0 ? parts.join(' · ') : 'no counts on the envelope';
}

export function BringItIn() {
  const { user, isLoading } = useUser();
  const [file, setFile] = useState<File | null>(null);
  const [seen, setSeen] = useState<EnvelopeFace | null>(null);
  const [fault, setFault] = useState<string | null>(null);
  const [report, setReport] = useState<Report | null>(null);
  const [landing, setLanding] = useState(false);

  const known = seen ? seen.app in READS : false;

  const choose = async (chosen: File | null) => {
    setFile(chosen);
    setSeen(null);
    setReport(null);
    setFault(null);
    if (!chosen) return;
    try {
      const read = face(JSON.parse(await chosen.text()));
      if (!read) {
        setFault(NOT_AN_ENVELOPE);
        return;
      }
      setSeen(read);
      if (!(read.app in READS)) setFault(whyNoReader(read.app));
    } catch {
      setFault(NOT_AN_ENVELOPE);
    }
  };

  const bringItIn = async () => {
    if (!file || !seen) {
      setFault(NOTHING_CHOSEN);
      return;
    }
    setLanding(true);
    setFault(null);
    try {
      const form = new FormData();
      form.append('file', file);
      form.append('app', seen.app);
      const response = await fetch('/api/auth/import', { method: 'POST', body: form });
      const result = await response.json();
      if (result.success) setReport(result.data as Report);
      else setFault(result.error ?? 'The import did not land');
    } catch {
      setFault('The import did not land');
    } finally {
      setLanding(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-star-dust">Bring your data in</h1>
        <Link href="/vessel" className="text-sm text-star-dust/60 hover:text-star-dust">
          Back to the vessel
        </Link>
      </div>

      <p className="mb-6 text-sm text-star-dust/70">
        An export file from a sovereign app lands in your vessel here. What you already hold is
        never overwritten and never deleted.
      </p>

      {!isLoading && !user && (
        <p className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-star-dust/70">
          Sign in to bring a file in.
        </p>
      )}

      <div className="rounded-lg border border-white/10 bg-white/5 p-5">
        <label className="block text-sm text-star-dust/80" htmlFor="envelope-file">
          Your export file
        </label>
        <input
          id="envelope-file"
          type="file"
          accept="application/json,.json"
          onChange={(event) => choose(event.target.files?.[0] ?? null)}
          className="mt-3 block w-full text-sm text-star-dust/70 file:mr-4 file:min-h-[44px] file:rounded-full file:border file:border-white/10 file:bg-white/5 file:px-5 file:text-sm file:text-star-dust hover:file:bg-white/10"
        />

        {seen && (
          <dl className="mt-5 grid grid-cols-1 gap-2 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-star-dust/50">App</dt>
              <dd className="text-star-dust">{seen.app}</dd>
            </div>
            <div>
              <dt className="text-star-dust/50">Exported</dt>
              <dd className="text-star-dust">{stamp(seen.exportedAt)}</dd>
            </div>
            <div>
              <dt className="text-star-dust/50">Carries</dt>
              <dd className="text-star-dust">{countLine(seen.counts)}</dd>
            </div>
          </dl>
        )}

        {fault && <p className="mt-5 text-sm text-amber-300/90">{fault}</p>}

        <div className="mt-6">
          <Button onClick={bringItIn} disabled={!user || !seen || !known || landing} loading={landing}>
            Bring it in
          </Button>
        </div>
      </div>

      {report && (
        <div className="mt-8 rounded-lg border border-white/10 bg-white/5 p-5">
          <h2 className="text-lg font-semibold text-star-dust">
            {report.landed} landed · {report.held} already held
          </h2>
          <ul className="mt-4 flex flex-col gap-1 text-sm text-star-dust/80">
            {report.landings.map((one) => (
              <li key={`${one.kind}-${one.table}`}>
                {one.kind} · {one.table} · {one.landed} landed · {one.held} already held
              </li>
            ))}
          </ul>

          {report.notLanded.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-star-dust/80">What did not land</h3>
              <ul className="mt-2 flex flex-col gap-1 text-sm text-star-dust/60">
                {report.notLanded.map((one) => (
                  <li key={one.field}>
                    {one.field} · {one.count} · {one.reason}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="mt-6 text-sm">
            <Link href="/vessel" className="text-star-dust/70 hover:text-star-dust">
              Back to the vessel
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
