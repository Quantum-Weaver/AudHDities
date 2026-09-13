// src/app/(athena)/not-found.tsx
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

const DOOR =
  'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 text-sm text-star-dust transition-colors motion-reduce:transition-none hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hearth-gold focus-visible:ring-offset-2 focus-visible:ring-offset-deep-space';

export default function LibraryNotFound() {
  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-3xl mx-auto px-6 text-center">
        <BookOpen className="h-12 w-12 text-star-dust/20 mx-auto mb-4" aria-hidden="true" />
        <h1 className="text-2xl font-bold text-star-dust mb-2">Nothing stands on this shelf</h1>
        <p className="text-star-dust/70 mb-6">The page you asked for is not in the Library.</p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/library" className={DOOR}>Return to the Library</Link>
          <Link href="/library/lessons" className={DOOR}>The Lessons</Link>
          <Link href="/library/courses" className={DOOR}>The Curriculum</Link>
        </div>
      </div>
    </main>
  );
}
