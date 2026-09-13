// src/app/(athena)/error.tsx
'use client';

import { useEffect, startTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, RefreshCw } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const DOOR =
  'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border px-5 text-sm transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hearth-gold focus-visible:ring-offset-2 focus-visible:ring-offset-deep-space';

export default function LibraryError({ error, reset }: ErrorProps) {
  const router = useRouter();

  useEffect(() => {
    console.error('Library error:', error);
  }, [error]);

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6 text-center">
        <BookOpen className="h-12 w-12 text-star-dust/20 mx-auto mb-4" aria-hidden="true" />
        <h1 className="text-2xl font-bold text-star-dust mb-2">This shelf could not be read</h1>
        <p className="text-star-dust/70 mb-2">The rest of the Library still stands, and nothing has been lost.</p>
        {error.digest && <p className="text-xs text-star-dust/40 mb-6">Reference {error.digest}</p>}

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            // Refetches the route, then clears the error boundary.
            onClick={() => startTransition(() => { router.refresh(); reset(); })}
            className={`${DOOR} border-hearth-gold/50 bg-hearth-gold/10 text-hearth-gold hover:bg-hearth-gold/20`}
          >
            <RefreshCw size={16} aria-hidden="true" />
            Try again
          </button>
          <Link href="/library" className={`${DOOR} border-white/10 bg-white/5 text-star-dust hover:bg-white/10`}>
            Return to the Library
          </Link>
        </div>
      </div>
    </main>
  );
}
