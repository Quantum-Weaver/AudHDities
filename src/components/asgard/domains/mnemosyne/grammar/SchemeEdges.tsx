// src/components/asgard/domains/mnemosyne/grammar/SchemeEdges.tsx

import Link from 'next/link';
import {
  EDGES_HEADING,
  EDGES_SOURCE,
  NO_SCHEME_EDGE,
  edgeArrow,
  edgeSentence,
  edgeSideWord,
  type EdgeSide,
  type SchemeEdge,
} from '@/lib/grammar/grammar-contract';
import { Panel } from './Panel';

/** One end of an edge, a door when the base names it. */
function Side({ side }: { side: EdgeSide | null }) {
  const word = edgeSideWord(side);
  return side?.address ? (
    <Link href={side.address} className="text-star-dust hover:text-neurospark">
      {word}
    </Link>
  ) : (
    <span className="text-star-dust/35">{word}</span>
  );
}

/** Every typed edge drawn within this scheme, both ends a door. */
export function SchemeEdges({ edges }: { edges: readonly SchemeEdge[] }) {
  return (
    <Panel heading={EDGES_HEADING} source={EDGES_SOURCE}>
      {edges.length === 0 ? (
        <p className="text-[13px] text-star-dust/35">{NO_SCHEME_EDGE}</p>
      ) : (
        <ul className="flex flex-col gap-1.5 text-[13px]">
          {edges.map((edge, index) => (
            <li
              key={`${edgeSentence(edge)}-${index}`}
              className="flex flex-wrap items-center gap-2"
            >
              <Side side={edge.subject} />
              <span className="text-star-dust/40">{edgeArrow(edge.relationType)}</span>
              <Side side={edge.object} />
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}
