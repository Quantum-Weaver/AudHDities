// src/app/(aethelred)/nexus/integrations/page.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   INTEGRATIONS — the key names each line and chain records, names only    ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
import { redirect } from 'next/navigation';
import { Page } from '@/components/bifrost/Page';
import { NexusRoom } from '@/components/asgard/domains/aethelred/nexus/NexusRoom';
import { NexusTile } from '@/components/asgard/domains/aethelred/nexus/NexusTile';
import { PouredMark } from '@/components/asgard/domains/aethelred/nexus/PouredMark';
import { Register } from '@/components/asgard/domains/aethelred/nexus/Register';
import { createServerSupabase } from '@/lib/supabase/server';
import { AUTH_ROUTES } from '@/lib/constants/components/asgard/auth/auth.constants';
import { buildRedirectUrl } from '@/lib/utils/components/asgard/auth/auth.utils';
import { INTEGRATIONS_SHAPE, INTEGRATIONS_SLUG } from '@/lib/nexus/integrations-contract';
import { pouredView } from '@/lib/nexus/poured-contract';
import { readPoured, ARTIFACTS_PROXY } from '@/lib/nexus/poured-read';

export const metadata = {
  title: 'Integrations | The Nexus | Sovereign Sanctuary',
  description: 'The key names each line and chain records — names only, never a value',
};

export const dynamic = 'force-dynamic';

const ROUTE = '/nexus/integrations';

export default async function IntegrationsPage() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(buildRedirectUrl(AUTH_ROUTES.LOGIN, ROUTE));

  const block = await readPoured(INTEGRATIONS_SLUG);
  const view = pouredView(INTEGRATIONS_SHAPE, block);

  const naming = new Set(view.rows.map((row) => row.section)).size;
  const lines = block.fault ? 0 : view.sections.length;

  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <NexusRoom
        title="Integrations"
        lede="Every outside service the house reaches is reached by a named key held in a .env file. This room lists the names each line and chain records. A value never exists on the wire."
        source={`poured · ${INTEGRATIONS_SLUG}`}
      >
        <NexusTile
          id="the-keys"
          word="key names only"
          at={block.published}
          atLabel="poured"
          atEmpty="at no recorded time"
          lines={[
            { key: 'lines', value: `${lines}` },
            { key: 'naming a key', value: `${naming}` },
            { key: 'entries', value: `${view.rows.length}` },
            { key: 'values shown', value: '0' },
          ]}
        />
        <PouredMark
          slug={view.slug}
          published={block.published}
          view={block.view ?? view.title}
          href={`${ARTIFACTS_PROXY}/${view.slug}`}
        />
        <Register sections={view.sections} rows={view.rows} />
      </NexusRoom>
    </Page>
  );
}
