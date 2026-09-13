// src/app/(themis)/loading.tsx

import { Skeleton } from '@/components/runes/Skeleton';

export default function ThemisLoading() {
  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-5xl mx-auto px-6">
        <Skeleton variant="text" className="h-8 w-48 mb-4" />
        <Skeleton variant="text" className="h-4 w-72 mb-8" />
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} variant="card" className="h-28" />
          ))}
        </div>
      </div>
    </main>
  );
}
