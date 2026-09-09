// src/components/asgard/domains/mnemosyne/grammar/CompoundLattice.tsx

import Link from 'next/link';
import {
  ATOM_LATTICE_SOURCE,
  EDGE_SIDE_UNNAMED,
  LATTICE_HEADING,
  NOT_IN_A_SCHEME,
  NO_TYPED_EDGES,
  PRIMARY_LABEL,
  schemeAddress,
  type ConceptEdge,
  type SchemeMembershipView,
} from '@/lib/grammar/grammar-contract';
import { Panel } from './Panel';

/** The schemes this concept is placed in, with primacy, and its typed edges. */
export function CompoundLattice({
  memberships,
  edges,
}: {
  memberships: readonly SchemeMembershipView[];
  edges: readonly ConceptEdge[];
}) {
  return (
    <Panel heading={LATTICE_HEADING} source={ATOM_LATTICE_SOURCE}>
      {memberships.length === 0 ? (
        <span className="text-[13px] text-star-dust/35">{NOT_IN_A_SCHEME}</span>
      ) : (
        <div className="flex flex-col gap-1.5 text-[13px]">
          {memberships.map((membership) => (
            <span key={`${membership.scheme}-${membership.schemeType}`}>
              <Link
                href={schemeAddress(membership.scheme)}
                className="text-neurospark hover:text-star-dust"
              >
                {membership.scheme}
              </Link>
              <span className="text-star-dust/35"> · {membership.schemeType}</span>
              {membership.primary ? (
                <span className="text-neurospark"> · {PRIMARY_LABEL}</span>
              ) : null}
            </span>
          ))}
        </div>
      )}

      {edges.length === 0 ? (
        <span className="text-[13px] text-star-dust/35">{NO_TYPED_EDGES}</span>
      ) : (
        <div className="flex flex-col gap-1.5 text-[13px]">
          {edges.map((edge, index) => (
            <span key={`${edge.relationType}-${edge.direction}-${index}`} className="text-star-dust/70">
              {edge.relationType}
              {edge.other ? (
                <span className="text-star-dust/35"> · {edge.other.word}</span>
              ) : null}
              {edge.other?.name && edge.other.address ? (
                <>
                  <span className="text-star-dust/35"> · </span>
                  <Link href={edge.other.address} className="text-neurospark hover:text-star-dust">
                    {edge.other.name}
                  </Link>
                </>
              ) : null}
              {edge.other && !edge.other.name ? (
                <span className="text-star-dust/35"> · {EDGE_SIDE_UNNAMED}</span>
              ) : null}
            </span>
          ))}
        </div>
      )}
    </Panel>
  );
}
