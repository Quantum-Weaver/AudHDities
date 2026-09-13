// src/app/(mnemosyne)/error.tsx
'use client';

import { useEffect, startTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface MnemosyneErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function MnemosyneError({ error, reset }: MnemosyneErrorProps) {
  const router = useRouter();

  useEffect(() => {
    console.error('Observatory error:', error);
  }, [error]);

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 border border-red-500/30 mb-6">
          <AlertTriangle size={28} className="text-red-400" aria-hidden="true" />
        </div>
        <h1 className="text-2xl font-bold text-star-dust mb-2">This room did not open</h1>
        <p className="text-star-dust/40 text-sm mb-6">
          Nothing recorded is lost. The room can be asked for again.
        </p>

        <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-8 text-left">
          <p className="text-sm font-mono text-red-400 break-words">
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
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-star-dust rounded-lg font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neurospark"
          >
            <RefreshCw size={18} aria-hidden="true" />
            Try again
          </button>
          <Link href="/observatory" className="text-neurospark hover:underline">
            The Observatory
          </Link>
          <Link href="/grammar" className="text-neurospark hover:underline">
            The Grammar
          </Link>
        </div>
      </div>
    </main>
  );
}
