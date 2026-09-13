// src/app/(mnemosyne)/loading.tsx

import { Skeleton } from '@/components/runes/Skeleton';

export default function MnemosyneLoading() {
  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-4xl mx-auto px-6">
        <Skeleton variant="text" className="h-8 w-48 mb-4" />
        <Skeleton variant="text" className="h-4 w-72 mb-8" />
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} variant="card" className="h-44" />
          ))}
        </div>
      </div>
    </main>
  );
}
