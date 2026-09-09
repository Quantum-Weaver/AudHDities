// src/components/asgard/domains/aethelred/nexus/RepoConstellation.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE REPO CONSTELLATION — the register, grouped by privacy state        ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { ExternalLink, GitBranch, Lock, User } from 'lucide-react';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import {
  DOOR_UNNAMED,
  FACES_HEADING,
  NO_DEFINITION,
  NO_FACE_ROW,
  REGISTER_REFUSED,
  REGISTER_TABLE,
  REGISTER_UNREAD,
  STORE_STANDINGS,
  type GatewayCard,
  type GatewayFace,
  type GatewayGroupView,
  type GatewayView,
} from '@/lib/nexus/gateway-contract';
import { HouseWordsFooter, withHouseWords } from './HouseWords';
import { RequestToCollaborate } from './RequestToCollaborate';
import { Stamp } from './Stamp';

/** The source line under a heading. */
function SourceLine({ source }: { source: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-neurospark/25 px-2 py-0.5 text-[11px] text-neurospark">
      <span className="h-1.5 w-1.5 rounded-full bg-neurospark" />
      <span>{source}</span>
    </span>
  );
}

/** What happened, why, the next step. */
function Fault({ message }: { message: string }) {
  return (
    <div className="flex flex-col gap-1 text-[13px]">
      <span className="text-star-dust/80">{REGISTER_REFUSED}</span>
      <span className="text-star-dust/50">
        {REGISTER_TABLE} · {message}
      </span>
      <span className="text-star-dust/40">
        next · a read policy on {REGISTER_TABLE} for the anon door
      </span>
    </div>
  );
}

function Tile({ emoji, open }: { emoji: string | null; open: boolean }) {
  if (emoji) {
    return (
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-lg">
        {emoji}
      </span>
    );
  }
  const Sigil = open ? GitBranch : Lock;
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.04]">
      <Sigil className="h-4 w-4 text-neurospark" aria-hidden="true" />
    </span>
  );
}

function BeaconCard({ card, signedIn }: { card: GatewayCard; signedIn: boolean }) {
  const { beacon, github } = card;
  const open = beacon.is_public;
  const linked = open && Boolean(beacon.repo_url);
  const facts = github?.facts ?? null;
  const definition = beacon.definition?.trim() ?? '';
  const fromGitHub = facts?.description?.trim() ?? '';
  const differs = fromGitHub.length > 0 && fromGitHub !== definition;
  const standings = STORE_STANDINGS.map((standing) => ({
    label: standing.label,
    value: String(beacon[standing.key] ?? '').trim(),
  })).filter((standing) => standing.value.length > 0 && standing.value.toLowerCase() !== 'none');

  return (
    <Card
      data={{ id: beacon.slug, type: 'value', title: beacon.name, value: beacon.status }}
      variant={open ? 'ghost' : 'glass'}
      size="full"
      radius="lg"
      shadow="sm"
      className="flex h-full flex-col gap-3 p-5"
    >
      <div className="flex items-center gap-3">
        <Tile emoji={beacon.icon_emoji} open={open} />
        <div className="flex min-w-0 flex-col gap-0.5">
          <h3 className="truncate font-semibold text-star-dust">{beacon.name}</h3>
          <span className="text-[11px] text-star-dust/35">{beacon.slug}</span>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-star-dust/60">
        {definition ? withHouseWords(definition) : NO_DEFINITION}
      </p>
      {differs ? (
        <p className="text-xs leading-relaxed text-star-dust/45">github · {fromGitHub}</p>
      ) : null}

      <div className="flex flex-wrap items-center gap-1.5">
        <Badge variant="outline" size="sm" pill>
          {beacon.beacon_type}
        </Badge>
        <Badge variant="outline" size="sm" pill>
          {beacon.status}
        </Badge>
        {beacon.version ? (
          <Badge variant="outline" size="sm" pill>
            v{beacon.version}
          </Badge>
        ) : null}
        {facts?.language ? (
          <Badge variant="outline" size="sm" pill>
            {facts.language}
          </Badge>
        ) : null}
        {facts?.archived ? (
          <Badge variant="outline" size="sm" pill>
            archived
          </Badge>
        ) : null}
      </div>

      {facts ? (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-star-dust/40">
          {facts.stargazers_count !== null ? <span>{facts.stargazers_count} stars</span> : null}
          {facts.open_issues_count !== null ? (
            <span>{facts.open_issues_count} open issues</span>
          ) : null}
          {facts.pushed_at ? (
            <span>
              pushed · <Stamp value={facts.pushed_at} />
            </span>
          ) : null}
        </div>
      ) : null}
      {github?.miss ? <span className="text-[11px] text-star-dust/50">{github.miss}</span> : null}

      {beacon.available_on.length > 0 ? (
        <span className="text-[11px] text-star-dust/35">
          available on · {beacon.available_on.join(' · ')}
        </span>
      ) : null}
      {standings.length > 0 ? (
        <span className="text-[11px] text-star-dust/35">
          {standings.map((standing) => `${standing.label} ${standing.value}`).join(' · ')}
        </span>
      ) : null}

      <div className="mt-auto border-t border-white/[0.06] pt-3">
        {linked && beacon.repo_url ? (
          <a
            href={beacon.repo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 break-all text-[11px] text-neurospark hover:text-star-dust"
          >
            {beacon.repo_url}
            <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
          </a>
        ) : null}
        {!open ? (
          <RequestToCollaborate slug={beacon.slug} signedIn={signedIn} />
        ) : null}
        {open && !beacon.repo_url ? (
          <span className="text-[11px] text-star-dust/35">no repo recorded</span>
        ) : null}
      </div>
    </Card>
  );
}

function Group({ group, signedIn }: { group: GatewayGroupView; signedIn: boolean }) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-sm font-medium uppercase tracking-wide text-star-dust/50">
          {group.label}
        </h2>
        <span className="text-xs text-star-dust/40">
          {group.cards.length} {group.cards.length === 1 ? 'beacon' : 'beacons'}
        </span>
      </div>
      {group.cards.length === 0 ? (
        <p className="text-xs text-star-dust/35">{group.empty}</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {group.cards.map((card) => (
            <BeaconCard key={card.beacon.slug} card={card} signedIn={signedIn} />
          ))}
        </div>
      )}
    </section>
  );
}

function FaceCard({ face }: { face: GatewayFace }) {
  if (!face.read) {
    return (
      <Card
        data={{ id: face.login, type: 'user', title: face.login, role: '' }}
        variant="glass"
        size="full"
        radius="lg"
        shadow="sm"
        className="flex h-full flex-col gap-3 p-5"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.04]">
            <User className="h-4 w-4 text-neurospark" aria-hidden="true" />
          </span>
          <div className="flex min-w-0 flex-col gap-0.5">
            <h3 className="truncate font-semibold text-star-dust">{face.login}</h3>
            <span className="text-[11px] text-star-dust/50">{REGISTER_UNREAD}</span>
          </div>
        </div>
      </Card>
    );
  }

  const facts = face.read.facts;
  const beacon = face.beacon;
  const definition = beacon?.definition?.trim() ?? '';
  const bio = facts?.bio?.trim() ?? '';
  const differs = bio.length > 0 && bio !== definition;

  return (
    <Card
      data={{
        id: face.login,
        type: 'user',
        title: beacon?.name ?? face.login,
        role: facts?.name ?? '',
      }}
      variant="glass"
      size="full"
      radius="lg"
      shadow="sm"
      className="flex h-full flex-col gap-3 p-5"
    >
      <div className="flex items-center gap-3">
        {beacon?.icon_emoji ? (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-lg">
            {beacon.icon_emoji}
          </span>
        ) : (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.04]">
            <User className="h-4 w-4 text-neurospark" aria-hidden="true" />
          </span>
        )}
        <div className="flex min-w-0 flex-col gap-0.5">
          <h3 className="truncate font-semibold text-star-dust">{beacon?.name ?? face.login}</h3>
          <span className="text-[11px] text-star-dust/35">
            {face.login}
            {facts?.name ? ` · ${facts.name}` : ''}
          </span>
        </div>
      </div>

      {definition ? (
        <p className="text-sm leading-relaxed text-star-dust/60">{withHouseWords(definition)}</p>
      ) : null}
      {differs ? (
        <p className="text-xs leading-relaxed text-star-dust/45">github · {withHouseWords(bio)}</p>
      ) : null}

      {beacon ? (
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge variant="outline" size="sm" pill>
            {beacon.beacon_type}
          </Badge>
          <Badge variant="outline" size="sm" pill>
            {beacon.status}
          </Badge>
          {beacon.version ? (
            <Badge variant="outline" size="sm" pill>
              v{beacon.version}
            </Badge>
          ) : null}
        </div>
      ) : (
        <span className="text-[11px] text-star-dust/35">{NO_FACE_ROW}</span>
      )}

      {facts ? (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-star-dust/40">
          {facts.public_repos !== null ? <span>{facts.public_repos} public repos</span> : null}
          {facts.followers !== null ? <span>{facts.followers} followers</span> : null}
        </div>
      ) : null}
      {face.read.miss ? (
        <span className="text-[11px] text-star-dust/50">{face.read.miss}</span>
      ) : null}

      <a
        href={beacon?.repo_url ?? face.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex items-center gap-1.5 break-all border-t border-white/[0.06] pt-3 text-[11px] text-neurospark hover:text-star-dust"
      >
        {beacon?.repo_url ?? face.url}
        <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
      </a>
    </Card>
  );
}

export interface RepoConstellationProps {
  view: GatewayView;
}

export function RepoConstellation({ view }: RepoConstellationProps) {
  const grouped = view.groups.reduce((total, group) => total + group.cards.length, 0);
  const pinned = view.faces.filter((face) => face.beacon !== null).length;
  const counted = grouped + pinned;

  return (
    <div className="flex flex-col gap-8">
      {view.doorNamed ? (
        <div className="flex flex-wrap items-center gap-3 text-xs text-star-dust/40">
          <span>
            {counted} {counted === 1 ? 'beacon' : 'beacons'} in the register · {pinned} pinned as
            faces
          </span>
          <SourceLine source="live · beacons · the knowledge register" />
          <SourceLine source="github · public api, no token" />
        </div>
      ) : null}

      {!view.doorNamed ? (
        <p className="text-[13px] text-star-dust/60">{DOOR_UNNAMED}</p>
      ) : view.fault ? (
        <Fault message={view.fault} />
      ) : (
        view.groups.map((group) => (
          <Group key={group.key} group={group} signedIn={view.signedIn} />
        ))
      )}

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium uppercase tracking-wide text-star-dust/50">
          {FACES_HEADING}
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {view.faces.map((face) => (
            <FaceCard key={face.login} face={face} />
          ))}
        </div>
      </section>

      <HouseWordsFooter />
    </div>
  );
}
