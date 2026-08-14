// src/app/(aethelred)/nexus/api/page.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE GATEWAY — the repo constellation (the wrong face healed)           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
// 2026-07-31: this page wore a verbatim copy of the webhooks room ("The
// Pulse") while the hub and README promised "The Gateway" — the Nexus bus's
// edge 1. Healed at KP's ⚛ words ("somewhere we can show off the repo set"
// · "likely in the aethelred realm actually"): the Gateway's true face is
// the WORK ITSELF — the public repo constellation, every door real, every
// description the repo's own. Build on the Sanctuary starts with reading it.
import { Page } from '@/components/bifrost/Page';
import { RepoConstellation } from '@/components/asgard/domains/aethelred/nexus/RepoConstellation';
import { GitBranch } from 'lucide-react';

export const metadata = {
  title: 'The Gateway | The Nexus | Sovereign Sanctuary',
  description: 'The open repo set — the work itself, inspectable',
};

export default function GatewayPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <main className="min-h-screen py-12">
        <div className="container max-w-5xl mx-auto px-6">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 bg-neurospark/10 px-4 py-2 rounded-full mb-4">
              <GitBranch size={14} className="text-neurospark" />
              <span className="text-neurospark text-sm">The Gateway</span>
            </div>
            <h1 className="text-3xl font-bold text-star-dust mb-3">
              The work itself, open
            </h1>
            <p className="text-star-dust/60 max-w-2xl mx-auto leading-relaxed">
              Radical transparency is not a slogan here — it is a repo set.
              Everything the Sanctuary is built from stands in the open:
              the apps, the vocabulary, the research, the method, even the
              empty rooms. Open any door and read.
            </p>
          </div>
          <RepoConstellation />
        </div>
      </main>
    </Page>
  );
}
