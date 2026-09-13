// src/app/(themis)/not-found.tsx

import Link from 'next/link';
import { Scale } from 'lucide-react';

export default function ThemisNotFound() {
  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6 text-center">
        <Scale className="h-12 w-12 text-star-dust/20 mx-auto mb-4" aria-hidden="true" />
        <h1 className="text-2xl font-bold text-star-dust mb-2">No such chamber</h1>
        <p className="text-star-dust/40 text-sm mb-8">
          The Council Chamber, its proposals and its ledger are all still open.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <Link href="/council" className="text-neurospark hover:underline">
            The Council
          </Link>
          <Link href="/council/proposals" className="text-neurospark hover:underline">
            Proposals
          </Link>
          <Link href="/council/ledger" className="text-neurospark hover:underline">
            The Ledger
          </Link>
        </div>
      </div>
    </main>
  );
}
