// src/components/asgard/domains/themis/proposals/ProposalForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/runes/Card';
import { Button } from '@/components/yggdrasil/Button';
import { Skeleton } from '@/components/runes/Skeleton';
import { Input } from '@/components/forging/Input';
import { Textarea } from '@/components/forging/Textarea';
import { Select } from '@/components/forging/Select';
import { useUser } from '@/hooks/useUser';
import { ArrowLeft, Shield } from 'lucide-react';
import {
  createProposal,
  PROPOSAL_TYPES,
  type ProposalType,
} from '@/components/asgard/domains/themis/proposals/write';

const TYPE_OPTIONS = PROPOSAL_TYPES.map((value) => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1),
}));

export function ProposalForm() {
  const router = useRouter();
  const { user, roles, isLoading } = useUser();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [proposalType, setProposalType] = useState<ProposalType>('governance');
  const [votingEndsAt, setVotingEndsAt] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [fault, setFault] = useState<string | null>(null);

  const canPropose = roles.includes('council') || roles.includes('admin');

  const submit = async () => {
    if (!user) return;
    if (name.trim().length < 4) {
      setFault('A proposal needs a name of at least four characters.');
      return;
    }
    setSubmitting(true);
    setFault(null);
    const result = await createProposal({ name, description, proposalType, votingEndsAt }, user.id);
    if (result.proposal) {
      router.push(`/council/proposals/${result.proposal.id}`);
      return;
    }
    setFault(result.error ?? 'The proposal was not written.');
    setSubmitting(false);
  };

  if (isLoading) {
    return (
      <main className="min-h-screen py-12">
        <div className="container max-w-2xl mx-auto px-6">
          <Skeleton variant="text" className="h-8 w-48 mb-8" />
          <Skeleton variant="card" className="h-96" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12">
      <div className="container max-w-2xl mx-auto px-6">
        <Link href="/council/proposals" className="flex items-center gap-2 text-star-dust/60 hover:text-star-dust transition-colors text-sm mb-6">
          <ArrowLeft className="h-4 w-4" />Return to Proposals
        </Link>

        <h1 className="text-2xl font-bold text-star-dust mb-1">New Proposal</h1>
        <p className="text-sm text-star-dust/40 mb-8">Shape the future of the Sanctuary</p>

        {!canPropose ? (
          <Card
            data={{ id: 'proposal-gate', type: 'value', title: 'The Council Writes Proposals', value: '' }}
            variant="glass" radius="lg" shadow="sm" className="p-6 text-center"
          >
            <Shield className="h-8 w-8 text-hearth-gold mx-auto mb-3" />
            <p className="text-star-dust/60 text-sm">
              Writing a proposal is held by the Council role. Every proposal is open to read.
            </p>
          </Card>
        ) : (
          <Card
            data={{ id: 'proposal-draft', type: 'value', title: 'Your Proposal', value: '' }}
            variant="sanctuary" radius="xl" shadow="md" className="p-8 space-y-5"
          >
            {fault && (
              <div className="p-4 bg-fire-base/10 border border-fire-base/30 rounded-lg">
                <p className="text-fire-base text-sm">{fault}</p>
              </div>
            )}

            <Input
              name="name"
              label="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="What is being proposed"
            />

            <Textarea
              name="description"
              label="Description"
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="The proposal in full, and what it changes"
            />

            <Select
              name="proposal_type"
              label="Kind"
              value={proposalType}
              onChange={(e) => setProposalType(e.target.value as ProposalType)}
              options={TYPE_OPTIONS}
            />

            <Input
              name="voting_ends_at"
              label="Voting ends"
              type="date"
              optional
              value={votingEndsAt}
              onChange={(e) => setVotingEndsAt(e.target.value)}
              helper="Leave empty for a proposal with no deadline"
            />

            <div className="flex justify-end pt-2">
              <Button variant="primary" size="md" loading={submitting} onClick={submit}>
                Open the Proposal
              </Button>
            </div>
          </Card>
        )}
      </div>
    </main>
  );
}
