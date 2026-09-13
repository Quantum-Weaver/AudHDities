// src/app/(aethelred)/nexus/bridge/page.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE BRIDGE — the poured registers, read through the artifacts proxy     ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
import { redirect } from 'next/navigation';
import { Page } from '@/components/bifrost/Page';
import { NexusRoom } from '@/components/asgard/domains/aethelred/nexus/NexusRoom';
import { PouredMark } from '@/components/asgard/domains/aethelred/nexus/PouredMark';
import { Register } from '@/components/asgard/domains/aethelred/nexus/Register';
import { createServerSupabase } from '@/lib/supabase/server';
import { AUTH_ROUTES } from '@/lib/constants/components/asgard/auth/auth.constants';
import { buildRedirectUrl } from '@/lib/utils/components/asgard/auth/auth.utils';
import { BRIDGE_SHAPES } from '@/lib/nexus/bridge-contract';
import { pouredView } from '@/lib/nexus/poured-contract';
import { readPoured, ARTIFACTS_PROXY } from '@/lib/nexus/poured-read';

export const metadata = {
  title: 'The Bridge | The Nexus | Sovereign Sanctuary',
  description: 'The poured registers: the tools the bridge sees, the lamps lit, the hands dealt',
};

export const dynamic = 'force-dynamic';

const ROUTE = '/nexus/bridge';

export default async function BridgePage() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(buildRedirectUrl(AUTH_ROUTES.LOGIN, ROUTE));

  const views = await Promise.all(
    BRIDGE_SHAPES.map(async (shape) => pouredView(shape, await readPoured(shape.slug)))
  );

  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <NexusRoom
        title="The Bridge"
        lede="Three registers the house pours for itself, read here through the artifacts proxy under this visitor's own session. Each carries the time it was poured."
        source={`poured · ${BRIDGE_SHAPES.map((shape) => shape.slug).join(' · ')}`}
      >
        {views.map((view) => (
          <div key={view.slug} className="flex flex-col gap-3">
            <PouredMark
              slug={view.slug}
              published={view.block.published}
              view={view.block.view ?? view.title}
              href={`${ARTIFACTS_PROXY}/${view.slug}`}
            />
            <Register sections={view.sections} rows={view.rows} />
          </div>
        ))}
      </NexusRoom>
    </Page>
  );
}
