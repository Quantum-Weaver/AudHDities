// src/app/(aethelred)/nexus/status/page.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE HEALTH — the base's own portrait, drawn by the self-knowing layer   ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
import { redirect } from 'next/navigation';
import { Page } from '@/components/bifrost/Page';
import { NexusRoom } from '@/components/asgard/domains/aethelred/nexus/NexusRoom';
import { NexusTile } from '@/components/asgard/domains/aethelred/nexus/NexusTile';
import {
  Register,
  type RegisterRow,
  type RegisterSection,
} from '@/components/asgard/domains/aethelred/nexus/Register';
import { createServerSupabase } from '@/lib/supabase/server';
import { AUTH_ROUTES } from '@/lib/constants/components/asgard/auth/auth.constants';
import { buildRedirectUrl } from '@/lib/utils/components/asgard/auth/auth.utils';
import { readGaiaConfig, readRegistryCounts } from '@/lib/nexus/health-read';
import {
  driftWords,
  portraitFrom,
  schemaCounts,
  HOUSE_WELL,
  NO_DRIFT,
  NO_HASH,
  NO_PORTRAIT_ROW,
  NOT_VERIFIED,
} from '@/lib/nexus/health-contract';
import { REFUSED, refusalNext } from '@/lib/nexus/read';

export const metadata = {
  title: 'The Health | The Nexus | Sovereign Sanctuary',
  description: "The base's own portrait: the registries, the tables it knows, and what drifts",
};

export const dynamic = 'force-dynamic';

const ROUTE = '/nexus/status';

const REGISTRIES = 'The registries';
const PORTRAIT = 'The tables in the portrait';
const DRIFT = 'What drifts';

export default async function StatusPage() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(buildRedirectUrl(AUTH_ROUTES.LOGIN, ROUTE));

  const [config, registries] = await Promise.all([readGaiaConfig(), readRegistryCounts()]);
  const portrait = portraitFrom(config.rows, config.fault);

  const rows: RegisterRow[] = [];

  registries.forEach((registry, index) => {
    rows.push({
      section: REGISTRIES,
      ord: index + 1,
      key: registry.table,
      value: registry.fault ? REFUSED : `${registry.count} rows`,
      note: registry.fault
        ? `${registry.fault} · ${refusalNext(registry.table)}`
        : null,
    });
  });

  config.rows.forEach((row, index) => {
    rows.push({
      section: PORTRAIT,
      ord: index + 1,
      key: row.table_name,
      value: schemaCounts(row),
      note: `${row.deity_group} · ${row.status}`,
      seat: row.schema_hash ? row.schema_hash.slice(0, 8) : NO_HASH,
      at: row.schema_verified_at,
    });
  });

  portrait.drifting.forEach((row, index) => {
    rows.push({
      section: DRIFT,
      ord: index + 1,
      key: row.table_name,
      value: driftWords(row),
      note: `${row.deity_group} · ${row.status}`,
      at: row.schema_verified_at,
    });
  });

  const sections: RegisterSection[] = [
    {
      section: REGISTRIES,
      source: 'live · the self-knowing layer, counted by the base',
      empty: 'no registry answered',
    },
    {
      section: PORTRAIT,
      source: 'live · gaia_config',
      empty: NO_PORTRAIT_ROW,
      fault: config.fault,
      faultTable: config.table,
      tally: 'one row per table the layer knows',
    },
    {
      section: DRIFT,
      source: 'live · gaia_config, the rows carrying no verification',
      empty: NO_DRIFT,
      fault: config.fault,
      faultTable: config.table,
    },
  ];

  const counted = registries.filter((registry) => registry.count !== null);
  const objects = counted.reduce((total, registry) => total + (registry.count ?? 0), 0);

  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <NexusRoom
        title="The Health"
        lede="The base keeps a portrait of itself. This room shows when it was last drawn, what it holds, and what stands apart from it."
        source="live · gaia_config and the registries of the self-knowing layer"
      >
        <NexusTile
          id="the-portrait"
          word={portrait.word}
          at={portrait.at}
          atLabel="last drawn"
          atEmpty={NOT_VERIFIED}
          glowing={portrait.word === HOUSE_WELL}
          lines={[
            { key: 'tables', value: `${portrait.tables}` },
            { key: 'registries read', value: `${counted.length} of ${registries.length}` },
            { key: 'objects held', value: `${objects}` },
            { key: 'standing apart', value: `${portrait.drifting.length}` },
          ]}
        />
        <Register sections={sections} rows={rows} />
      </NexusRoom>
    </Page>
  );
}
