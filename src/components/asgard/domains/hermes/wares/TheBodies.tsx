// src/components/asgard/domains/hermes/wares/TheBodies.tsx
// WHAT YOU RECEIVE — the bodies of a ware, each one a real file_registry row
// with a link minted at the ask (SPEC §9).
//
// Three equal rows: same height, same weight, in the order the shelf holds
// them. No "also available for". Desktop is never a footnote — many people
// cannot use a phone for this.
//
// The version is read from the bundle's own filename, never typed. The .aab is
// withheld by the route and is not mentioned here or anywhere.
'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/yggdrasil/Button';

export interface Body {
  id: string;
  name: string | null;
  version: string | null;
  mimeType: string | null;
  fileSize: number | null;
  fileHash: string | null;
  url: string | null;
  expiresInSeconds: number | null;
}

function readableSize(bytes: number | null): string | null {
  if (bytes === null || bytes <= 0) return null;
  const units = ['bytes', 'KB', 'MB', 'GB'];
  let n = bytes;
  let i = 0;
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024;
    i += 1;
  }
  return `${i === 0 ? n : n.toFixed(1)} ${units[i]}`;
}

interface TheBodiesProps {
  wareId: string;
  /** Rendered before the ask is made, so a vessel knows what the button does. */
  heading?: string;
}

export function TheBodies({ wareId, heading = 'What you receive' }: TheBodiesProps) {
  const [bodies, setBodies] = useState<Body[] | null>(null);
  const [asking, setAsking] = useState(false);
  const [problem, setProblem] = useState<string | null>(null);

  const ask = useCallback(async () => {
    setAsking(true);
    setProblem(null);
    try {
      const res = await fetch(`/api/auth/wares/${wareId}/bodies`);
      const json = await res.json().catch(() => null);
      if (!res.ok) {
        setProblem(json?.error || 'The bodies could not be read just now.');
        setBodies(null);
        return;
      }
      setBodies(json?.bodies ?? []);
    } catch {
      setProblem('The bodies could not be read just now.');
    } finally {
      setAsking(false);
    }
  }, [wareId]);

  return (
    <section className="mt-6" aria-labelledby="the-bodies-heading">
      <h2 id="the-bodies-heading" className="text-sm font-semibold text-star-dust mb-3">
        {heading}
      </h2>

      {bodies === null && (
        <div>
          <Button variant="primary" size="md" onClick={ask} disabled={asking}>
            {asking ? 'A moment.' : 'Take it'}
          </Button>
          <p className="text-xs text-star-dust/40 mt-2">
            A link rests after a while. This is yours to come back to — its stall will hand you a
            fresh one whenever you ask.
          </p>
        </div>
      )}

      {problem && (
        <p role="status" className="text-sm text-star-dust/60 mt-3">{problem}</p>
      )}

      {bodies !== null && bodies.length === 0 && (
        <p className="text-sm text-star-dust/50">
          No files are hung on this one yet.
        </p>
      )}

      {bodies !== null && bodies.length > 0 && (
        <ul className="space-y-2" role="list">
          {bodies.map((b) => {
            const size = readableSize(b.fileSize);
            const label = b.name || 'a file';
            return (
              <li
                key={b.id}
                className="flex items-center justify-between gap-4 bg-white/5 border border-white/10 rounded-lg px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="text-sm text-star-dust truncate">{label}</p>
                  <p className="text-xs text-star-dust/40">
                    {[b.version ? `version ${b.version}` : null, size].filter(Boolean).join(' · ')}
                  </p>
                </div>
                {b.url ? (
                  <a
                    href={b.url}
                    className="shrink-0 text-sm text-neurospark hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-neurospark rounded"
                  >
                    Take it<span className="sr-only"> — {label}</span>
                  </a>
                ) : (
                  <span className="shrink-0 text-xs text-star-dust/40">
                    No link could be made for this one.
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {bodies !== null && bodies.length > 0 && (
        <p className="text-xs text-star-dust/40 mt-3">
          All of them come with it. You choose when you have it — not now, and not once.
        </p>
      )}
    </section>
  );
}
