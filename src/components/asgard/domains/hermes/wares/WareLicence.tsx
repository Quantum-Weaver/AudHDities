// src/components/asgard/domains/hermes/wares/WareLicence.tsx
//
// Renders a ware's the-sphragis licence, when it carries one. The licence is
// DATA (src/lib/sphragis/, a byte-faithful mirror of
// resonance-awen/tools/the-sphragis); this component is only ever a
// RENDERING of that data, the same way `render()` itself is — nothing here
// computes a grant, a split or a seal. A ware with no sphragis renders
// nothing; this component is not mounted for one (see WareDetail.tsx).

import { render, evidence, GRANT_ORDER, LAWYER_GATE, type Sphragis, type GrantName } from '@/lib/sphragis';
import { ShieldCheck, ShieldOff, Scale, Users } from 'lucide-react';

const GRANT_LABEL: Record<GrantName, string> = {
  'artist-to-platform': 'Artist → Platform',
  'platform-to-listener': 'Platform → Listener',
  'artist-to-buyer': 'Artist → Buyer',
};

export function WareLicence({ sphragis }: { sphragis: Sphragis }) {
  const rendering = render(sphragis);
  const proof = evidence(sphragis);
  const ordered = [...sphragis.grants].sort(
    (a, b) => GRANT_ORDER.indexOf(a.name) - GRANT_ORDER.indexOf(b.name)
  );
  const collaborators = sphragis.collaborators;

  return (
    <div className="mt-6 border border-white/10 rounded-xl p-5 bg-white/5">
      <div className="flex items-center gap-2 mb-3">
        <Scale className="h-4 w-4 text-neurospark" aria-hidden="true" />
        <h3 className="text-sm font-semibold text-star-dust">{rendering.title}</h3>
      </div>

      <p className="text-xs text-star-dust/50 mb-4">
        Copyright: {sphragis.holder}. The copyright does not move under this licence.
      </p>

      <div className="space-y-3 mb-4">
        {ordered.map((grant) => (
          <div key={grant.name} className="text-xs">
            <div className="flex items-center justify-between">
              <span className="text-star-dust/80 font-medium">{GRANT_LABEL[grant.name]}</span>
              <span className={grant.ended ? 'text-star-dust/40' : 'text-sanctuary-green'}>
                {grant.ended ? `ended — ${grant.ended.why}` : 'holds'}
              </span>
            </div>
            <p className="text-star-dust/50 mt-0.5">
              permits: {grant.permits.length ? grant.permits.join(', ') : 'nothing was declared'}
              {' · '}
              {grant.revocable ? 'revocable by the artist' : 'not revocable — what was received is kept'}
            </p>
          </div>
        ))}
      </div>

      <p className="text-xs text-star-dust/50 mb-4">
        Split: artist {sphragis.split.artist} · platform {sphragis.split.platform} — numbers in the
        licence itself, not a promise made about it.
      </p>

      {collaborators && Array.isArray(collaborators.parts) && collaborators.parts.length > 0 && (
        <div className="mb-4 border-t border-white/10 pt-3">
          <div className="flex items-center gap-1.5 mb-2">
            <Users className="h-3.5 w-3.5 text-star-dust/60" aria-hidden="true" />
            <span className="text-xs font-medium text-star-dust/70">
              Collaborator splits — the {collaborators.of}, divided
            </span>
          </div>
          <ul className="space-y-1">
            {collaborators.parts.map((part, i) => {
              const consent = (part as { consent?: { at?: string } }).consent;
              return (
                <li key={i} className="text-xs text-star-dust/50 flex items-center justify-between">
                  <span>
                    {part.points} bp — {part.who?.name ?? '(unnamed)'} · {part.role}
                  </span>
                  <span>{consent?.at ? `consented ${consent.at}` : 'not yet consented'}</span>
                </li>
              );
            })}
          </ul>
          <p className="text-xs text-star-dust/40 mt-2">
            Shares described, never money promised — consent is recorded by the-merismos and never
            implied by appearing here.
          </p>
        </div>
      )}

      <div className="flex items-center gap-1.5 mb-3 text-xs">
        {proof.sealed ? (
          <ShieldCheck className={proof.bound ? 'h-3.5 w-3.5 text-sanctuary-green' : 'h-3.5 w-3.5 text-amber-400'} aria-hidden="true" />
        ) : (
          <ShieldOff className="h-3.5 w-3.5 text-star-dust/30" aria-hidden="true" />
        )}
        <span className="text-star-dust/60">
          {!proof.sealed
            ? 'unsealed — no signature, content hash or timestamp'
            : proof.bound
              ? 'sealed and bound to these exact terms'
              : 'sealed, but the seal was taken over different terms'}
          {proof.witnessed ? ` · witnessed at ${proof.witness}` : proof.sealed ? ' · unwitnessed' : ''}
        </span>
      </div>

      <p className="text-[11px] leading-relaxed text-star-dust/40 border-t border-white/10 pt-3">
        {LAWYER_GATE}
      </p>
    </div>
  );
}
