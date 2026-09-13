// src/components/asgard/domains/themis/voting/vote.ts

import { createClient } from '@/lib/supabase/client';
import type { ProposalsRow } from '@/lib/generated/types/themis-governance/proposals';

/** The three choices the base accepts on a vote. */
export const VOTE_CHOICES = ['for', 'against', 'abstain'] as const;
export type VoteChoice = (typeof VOTE_CHOICES)[number];

export interface VoteCounts {
  votes_for: number;
  votes_against: number;
}

export interface CastResult {
  counts?: VoteCounts;
  error?: string;
}

/** Writes one living vote per voter per proposal; a second cast replaces the first. */
export async function castVote(
  proposalId: string,
  voterId: string,
  choice: VoteChoice
): Promise<CastResult> {
  const supabase = createClient();

  const { error } = await supabase
    .from('votes')
    .upsert(
      { proposal_id: proposalId, voter_id: voterId, choice, updated_at: new Date().toISOString() },
      { onConflict: 'proposal_id,voter_id' }
    );

  if (error) return { error: error.message };

  const counts = await readCounts(proposalId);
  return counts ? { counts } : {};
}

/** Reads the counters the base keeps from the vote record. */
export async function readCounts(proposalId: string): Promise<VoteCounts | null> {
  const supabase = createClient();
  const { data } = await supabase
    .from('proposals')
    .select('votes_for, votes_against')
    .eq('id', proposalId)
    .maybeSingle();

  return data ?? null;
}

/** Reads the voter's own choice on each of the given proposals. */
export async function readOwnVotes(
  proposalIds: string[],
  voterId: string
): Promise<Record<string, VoteChoice>> {
  if (proposalIds.length === 0) return {};

  const supabase = createClient();
  const { data } = await supabase
    .from('votes')
    .select('proposal_id, choice')
    .eq('voter_id', voterId)
    .in('proposal_id', proposalIds);

  const cast: Record<string, VoteChoice> = {};
  for (const row of data ?? []) {
    cast[row.proposal_id] = row.choice as VoteChoice;
  }
  return cast;
}

/** True while the proposal is open and the deadline has not passed. */
export function isVotable(proposal: Pick<ProposalsRow, 'status' | 'voting_ends_at'>, now: number): boolean {
  if (proposal.status !== 'submitted' && proposal.status !== 'under_review') return false;
  if (!proposal.voting_ends_at) return true;
  return new Date(proposal.voting_ends_at).getTime() > now;
}
