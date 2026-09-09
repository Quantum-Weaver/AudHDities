// src/components/asgard/domains/hephaestus/apps/AppCard.tsx
// One app or game of the register: its glyph, its definition, its badges, its standing.

import { ExternalLink, Package } from 'lucide-react';
import { Card } from '@/components/runes/Card';
import { Badge } from '@/components/runes/Badge';
import { NO_DEFINITION } from '@/lib/nexus/gateway-contract';
import {
  PART_SEPARATOR,
  platformsLine,
  standingEntries,
  standingLine,
  standingText,
  type PublishedApp,
} from '@/lib/apps/apps-contract';
import { withHouseWords } from '@/components/asgard/domains/aethelred/nexus/HouseWords';

/** The register's glyph for a row, or the standing mark when it holds none. */
function Tile({ emoji }: { emoji: string | null }) {
  if (emoji) {
    return (
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-lg">
        {emoji}
      </span>
    );
  }
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/[0.04]">
      <Package className="h-4 w-4 text-neurospark" aria-hidden="true" />
    </span>
  );
}

/** The channels this row stands in, each linked when the register holds a listing. */
function Standing({ app }: { app: PublishedApp }) {
  const entries = standingEntries(app);
  if (entries.length === 0) {
    const line = standingLine(app);
    return line ? <span className="text-[11px] text-star-dust/35">{line}</span> : null;
  }
  return (
    <span className="text-[11px] text-star-dust/45">
      {entries.map((entry, index) => (
        <span key={entry.label}>
          {index > 0 ? PART_SEPARATOR : null}
          {entry.listing ? (
            <a
              href={entry.listing}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-neurospark hover:text-star-dust"
            >
              {standingText(entry)}
              <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
            </a>
          ) : (
            standingText(entry)
          )}
        </span>
      ))}
    </span>
  );
}

export function AppCard({ app }: { app: PublishedApp }) {
  const definition = app.definition?.trim() ?? '';
  const platforms = platformsLine(app);
  const linked = app.is_public && Boolean(app.repo_url);

  return (
    <Card
      data={{ id: app.slug, type: 'value', title: app.name, value: app.status }}
      variant="glass"
      size="full"
      radius="lg"
      shadow="sm"
      className="flex h-full flex-col gap-3 p-5"
    >
      <div className="flex items-center gap-3">
        <Tile emoji={app.icon_emoji} />
        <div className="flex min-w-0 flex-col gap-0.5">
          <h3 className="truncate font-semibold text-star-dust">{app.name}</h3>
          <span className="text-[11px] text-star-dust/35">{app.slug}</span>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-star-dust/60">
        {definition ? withHouseWords(definition) : NO_DEFINITION}
      </p>

      <div className="flex flex-wrap items-center gap-1.5">
        <Badge variant="outline" size="sm" pill>
          {app.beacon_type}
        </Badge>
        {app.version ? (
          <Badge variant="outline" size="sm" pill>
            v{app.version}
          </Badge>
        ) : null}
        {platforms ? (
          <Badge variant="outline" size="sm" pill>
            {platforms}
          </Badge>
        ) : null}
      </div>

      <Standing app={app} />

      {linked && app.repo_url ? (
        <div className="mt-auto border-t border-white/[0.06] pt-3">
          <a
            href={app.repo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 break-all text-[11px] text-neurospark hover:text-star-dust"
          >
            {app.repo_url}
            <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
          </a>
        </div>
      ) : null}
    </Card>
  );
}
