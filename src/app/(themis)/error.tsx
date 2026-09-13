// src/app/(themis)/error.tsx
'use client';

import { useEffect, startTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ThemisErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ThemisError({ error, reset }: ThemisErrorProps) {
  const router = useRouter();

  useEffect(() => {
    console.error('Council error:', error);
  }, [error]);

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-fire-base/20 border border-fire-base/30 mb-6">
          <AlertTriangle size={28} className="text-fire-base" aria-hidden="true" />
        </div>
        <h1 className="text-2xl font-bold text-star-dust mb-2">This chamber did not open</h1>
        <p className="text-star-dust/40 text-sm mb-6">
          No vote, proposal or application was changed. The chamber can be asked for again.
        </p>

        <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-8 text-left">
          <p className="text-sm font-mono text-fire-base break-words">
            {error.message || 'Unknown error occurred'}
          </p>
          {error.digest && (
            <p className="text-xs text-star-dust/40 mt-2">Error ID: {error.digest}</p>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <button
            // Refetches the route, then clears the error boundary.
            onClick={() => startTransition(() => { router.refresh(); reset(); })}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-neurospark/20 border border-neurospark/40 hover:bg-neurospark/30 text-neurospark rounded-lg font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neurospark"
          >
            <RefreshCw size={18} aria-hidden="true" />
            Try again
          </button>
          <Link href="/council" className="text-neurospark hover:underline">
            The Council
          </Link>
        </div>
      </div>
    </main>
  );
}
