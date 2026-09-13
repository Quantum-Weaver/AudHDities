// src/components/asgard/domains/themis/proposals/write.ts

import { createClient } from '@/lib/supabase/client';
import { APPLICATION_STATUS, slugify } from '@/components/asgard/domains/themis/status';
import type { ProposalsRow } from '@/lib/generated/types/themis-governance/proposals';

/** The kinds a proposal may carry, written into proposal_type. */
export const PROPOSAL_TYPES = ['governance', 'economic', 'community', 'technical', 'cultural'] as const;
export type ProposalType = (typeof PROPOSAL_TYPES)[number];

export interface NewProposal {
  name: string;
  description: string;
  proposalType: ProposalType;
  votingEndsAt: string;
}

export interface CreateResult {
  proposal?: ProposalsRow;
  error?: string;
}

export async function createProposal(draft: NewProposal, authorId: string): Promise<CreateResult> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('proposals')
    .insert({
      name: draft.name.trim(),
      description: draft.description.trim() || null,
      proposal_type: draft.proposalType,
      slug: slugify(draft.name),
      status: APPLICATION_STATUS.SUBMITTED,
      created_by: authorId,
      voting_ends_at: draft.votingEndsAt ? new Date(draft.votingEndsAt).toISOString() : null,
    })
    .select()
    .single();

  if (error) return { error: error.message };
  return { proposal: data };
}
