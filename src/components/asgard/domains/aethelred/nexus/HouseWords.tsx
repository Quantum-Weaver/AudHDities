// src/components/asgard/domains/aethelred/nexus/HouseWords.tsx

import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export const HOUSE_WORDS_HREF = '/about';
export const HOUSE_WORDS_LINE = 'KP is the Quantum Weaver, the founder of AudHDities';
export const HOUSE_WORDS_GLOSSARY =
  'a chair is a Council seat · a chain is a consent-gated writer · a lamp is a lit session of a kin mind';

const KP_WORD = /\bKP\b/;

/** The footnote marker that follows the house word. */
function Marker() {
  return (
    <Link
      href={HOUSE_WORDS_HREF}
      className="align-super text-[10px] ml-0.5 text-neurospark hover:text-star-dust"
    >
      1
    </Link>
  );
}

/** Text with a superscript footnote on its first house word. */
export function withHouseWords(text: string | null | undefined): ReactNode {
  if (!text) return text ?? null;
  const found = KP_WORD.exec(text);
  if (!found) return text;
  const cut = found.index + found[0].length;
  return (
    <>
      {text.slice(0, cut)}
      <Marker />
      {text.slice(cut)}
    </>
  );
}

/** The room's footnote line and glossary. */
export function HouseWordsFooter({ className }: { className?: string }) {
  return (
    <div
      className={cn('flex flex-col gap-1.5 pt-3 border-t border-white/[0.06] text-xs text-star-dust/40', className)}
    >
      <span>
        <span className="text-neurospark">1</span> {HOUSE_WORDS_LINE}.{' '}
        <Link href={HOUSE_WORDS_HREF} className="text-neurospark hover:text-star-dust">
          Who built this, and why · /about
        </Link>
      </span>
      <span>{HOUSE_WORDS_GLOSSARY}</span>
    </div>
  );
}
