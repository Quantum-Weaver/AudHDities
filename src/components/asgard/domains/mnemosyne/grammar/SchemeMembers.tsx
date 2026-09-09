// src/components/asgard/domains/mnemosyne/grammar/SchemeMembers.tsx

import Link from 'next/link';
import {
  MEMBERS_HEADING,
  MEMBERS_SOURCE,
  NO_MEMBER_YET,
  PRIMARY_LABEL,
  type SchemeMember,
} from '@/lib/grammar/grammar-contract';
import { Panel } from './Panel';

/** Every concept in this scheme, with its tier, its face and its primacy. */
export function SchemeMembers({ members }: { members: readonly SchemeMember[] }) {
  return (
    <Panel heading={MEMBERS_HEADING} source={MEMBERS_SOURCE}>
      {members.length === 0 ? (
        <p className="text-[13px] text-star-dust/35">{NO_MEMBER_YET}</p>
      ) : (
        <ul className="flex flex-col gap-1.5 text-[13px]">
          {members.map((member) => (
            <li key={member.key} className="flex flex-wrap items-center gap-2">
              {member.emoji ? <span>{member.emoji}</span> : null}
              <Link href={member.address} className="text-star-dust hover:text-neurospark">
                {member.name}
              </Link>
              <span className="text-star-dust/35">{member.word}</span>
              {member.primary ? (
                <span className="text-neurospark">{PRIMARY_LABEL}</span>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}
