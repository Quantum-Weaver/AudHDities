// src/components/asgard/domains/aethelred/nexus/NexusRoom.tsx

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import { HouseWordsFooter, withHouseWords } from './HouseWords';

export interface NexusRoomProps {
  title: string;
  lede: string;
  /** The line under the lede naming what the room reads. */
  source: string;
  children: ReactNode;
}

/** The shell every wired Nexus room stands in. */
export function NexusRoom({ title, lede, source, children }: NexusRoomProps) {
  return (
    <main className="min-h-screen py-12">
      <div className="mx-auto max-w-3xl px-6 flex flex-col gap-6">
        <Link
          href="/nexus"
          className="inline-flex items-center gap-2 text-sm text-star-dust/60 hover:text-star-dust transition-colors motion-reduce:transition-none w-fit"
        >
          <ArrowLeft className="h-4 w-4" />
          Return to the Nexus
        </Link>

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-star-dust">{withHouseWords(title)}</h1>
          <p className="text-star-dust/60 leading-relaxed">{withHouseWords(lede)}</p>
          <span className="inline-flex items-center gap-1.5 text-[11px] text-neurospark">
            <span className="w-1.5 h-1.5 rounded-full bg-neurospark" />
            {source}
          </span>
        </div>

        {children}

        <HouseWordsFooter />
      </div>
    </main>
  );
}
