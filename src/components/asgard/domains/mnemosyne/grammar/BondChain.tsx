// src/components/asgard/domains/mnemosyne/grammar/BondChain.tsx

import Link from 'next/link';
import { chainLinkLine, type ChainLink } from '@/lib/grammar/grammar-contract';

/** The bonded parts in their own order, each a door, its role and bond type under it. */
export function BondChain({ links, empty }: { links: readonly ChainLink[]; empty: string }) {
  if (links.length === 0) {
    return <span className="text-[13px] text-star-dust/35">{empty}</span>;
  }

  return (
    <ol className="flex flex-wrap items-start gap-2">
      {links.map((link) => {
        const line = chainLinkLine(link);
        return (
          <li key={link.key} className="flex flex-col gap-0.5">
            <Link
              href={link.address}
              className="inline-flex items-center gap-1.5 rounded-full border border-neurospark/30 px-2.5 py-1 text-[13px] text-neurospark hover:text-star-dust"
            >
              {link.face ? <span aria-hidden="true">{link.face}</span> : null}
              {link.name}
            </Link>
            {line ? <span className="px-2.5 text-[11px] text-star-dust/35">{line}</span> : null}
          </li>
        );
      })}
    </ol>
  );
}
