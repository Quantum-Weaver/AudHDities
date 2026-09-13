// src/app/(athena)/loading.tsx
import { Skeleton } from '@/components/runes/Skeleton';

export default function LibraryLoading() {
  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-6xl mx-auto px-6">
        <Skeleton variant="text" className="h-6 w-40 mb-4" />
        <Skeleton variant="text" className="h-8 w-64 mb-8" />
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} variant="card" className="h-44" />
          ))}
        </div>
        <p role="status" className="sr-only">The shelves are being read.</p>
      </div>
    </main>
  );
}
