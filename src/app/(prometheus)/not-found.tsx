// src/app/(prometheus)/not-found.tsx

import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function PrometheusNotFound() {
  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6 text-center">
        <Sparkles className="h-12 w-12 text-star-dust/20 mx-auto mb-4" aria-hidden="true" />
        <h1 className="text-2xl font-bold text-star-dust mb-2">No such room</h1>
        <p className="text-star-dust/40 text-sm mb-8">
          Nothing is lost. The Stage and the Loom are both still open.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <Link href="/stage" className="text-neurospark hover:underline">
            The Stage
          </Link>
          <Link href="/studio" className="text-neurospark hover:underline">
            The Loom
          </Link>
        </div>
      </div>
    </main>
  );
}
