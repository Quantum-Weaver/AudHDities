// src/components/asgard/domains/aethelred/nexus/RequestToCollaborate.tsx
'use client';

import { useState, useTransition } from 'react';
import { requestCollaboration } from '@/lib/nexus/gateway-request';
import {
  NOTE_LABEL,
  NOTE_MAX,
  REQUEST_LANDED,
  REQUEST_SENDING,
  REQUEST_WORD,
  SIGN_IN_TO_REQUEST,
  type RequestRefusal,
} from '@/lib/nexus/gateway-contract';
import { Stamp } from './Stamp';

export interface RequestToCollaborateProps {
  slug: string;
  signedIn: boolean;
}

/** What happened, why, the next step. */
function Refusal({ refusal }: { refusal: RequestRefusal }) {
  return (
    <div className="flex flex-col gap-1 text-[12px]">
      <span className="text-star-dust/80">{refusal.what}</span>
      <span className="text-star-dust/50">{refusal.why}</span>
      <span className="text-star-dust/40">next · {refusal.next}</span>
    </div>
  );
}

export function RequestToCollaborate({ slug, signedIn }: RequestToCollaborateProps) {
  const [note, setNote] = useState('');
  const [landedAt, setLandedAt] = useState<string | null>(null);
  const [refusal, setRefusal] = useState<RequestRefusal | null>(null);
  const [pending, startTransition] = useTransition();

  if (!signedIn) {
    return <span className="text-xs text-star-dust/40">{SIGN_IN_TO_REQUEST}</span>;
  }

  if (landedAt) {
    return (
      <span className="text-xs text-neurospark">
        {REQUEST_LANDED} · <Stamp value={landedAt} />
      </span>
    );
  }

  const send = () => {
    setRefusal(null);
    startTransition(async () => {
      const outcome = await requestCollaboration(slug, note);
      if (outcome.ok) {
        setLandedAt(outcome.at);
        return;
      }
      setRefusal({ what: outcome.what, why: outcome.why, next: outcome.next });
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="flex flex-col gap-1 text-[11px] text-star-dust/40">
        {NOTE_LABEL}
        <textarea
          value={note}
          maxLength={NOTE_MAX}
          rows={2}
          onChange={(event) => setNote(event.target.value)}
          className="w-full rounded-lg border border-white/[0.08] bg-white/[0.02] px-2.5 py-2 text-[12px] text-star-dust outline-none focus:border-neurospark/40"
        />
      </label>
      <button
        type="button"
        onClick={send}
        disabled={pending}
        className="w-fit rounded-full border border-neurospark/30 px-3 py-1.5 text-xs text-neurospark transition-colors hover:border-neurospark/60 disabled:opacity-50 motion-reduce:transition-none"
      >
        {pending ? REQUEST_SENDING : REQUEST_WORD}
      </button>
      {refusal ? <Refusal refusal={refusal} /> : null}
    </div>
  );
}
