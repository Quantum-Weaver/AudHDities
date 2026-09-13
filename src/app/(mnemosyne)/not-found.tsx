// src/app/(mnemosyne)/not-found.tsx

import Link from 'next/link';
import { Telescope } from 'lucide-react';

export const metadata = {
  title: 'No such room | The Observatory | Sovereign Sanctuary',
  description: 'This room is not in the Observatory',
};

export default function MnemosyneNotFound() {
  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6 text-center">
        <Telescope className="h-12 w-12 text-star-dust/20 mx-auto mb-4" aria-hidden="true" />
        <h1 className="text-2xl font-bold text-star-dust mb-2">No such room</h1>
        <p className="text-star-dust/40 text-sm mb-8">
          Nothing is lost. The tower and the Grammar are both still open.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6">
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
