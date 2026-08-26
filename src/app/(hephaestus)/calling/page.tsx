// src/app/(hephaestus)/calling/page.tsx
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║   THE CALLING — an invitation, not a job board                           ║
// ╚═══════════════════════════════════════════════════════════════════════════╝
import { Page } from '@/components/bifrost/Page';
import Link from 'next/link';
import { CultureDeck } from '@/components/asgard/domains/hephaestus/calling/CultureDeck';
import { CommunityVoices } from '@/components/asgard/domains/hephaestus/calling/CommunityVoices';
import { Card } from '@/components/runes/Card';
import { Infinity as InfinityIcon, DoorOpen, GitBranch } from 'lucide-react';

export const metadata = {
  title: 'The Calling | Sovereign Sanctuary',
  description: 'There is no company here — there is us, and the community that arrives',
};

export default function CallingPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <main className="min-h-screen py-12">
        <div className="container max-w-5xl mx-auto px-6">

          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-star-dust mb-3">
              The Calling
            </h1>
            <p className="text-star-dust/70 max-w-2xl mx-auto leading-relaxed">
              There is no company here. There are no careers, no job listings,
              no applications. There is us — and the community that arrives.
            </p>
            <p className="text-star-dust/50 max-w-2xl mx-auto mt-3 text-sm leading-relaxed">
              The Sanctuary is built to be self-perpetuating: roles are not
              posted, they emerge — from dwelling here, making things, and
              sharing them. Whatever you arrive carrying is enough.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <CultureDeck />
              <CommunityVoices />
            </div>
            <div className="space-y-8">

              <Card
                data={{ id: 'ecosystem-self', type: 'value', title: 'Self-Perpetuating', value: 'Ecosystem' }}
                variant="glass"
                radius="lg"
                shadow="md"
                className="p-6 text-center"
              >
                <InfinityIcon className="text-neurospark mx-auto mb-3" size={28} />
                <h3 className="text-star-dust font-bold mb-2">No applications, by design</h3>
                <p className="text-star-dust/60 text-sm">
                  The residual system, covenant pool, and artisan economy are
                  designed so that contributing sustains the contributor. The
                  design is documented in the Forge, open for inspection —
                  what it promises is what its tables enforce.
                </p>
                <Link
                  href="/forge/business/ecosystem"
                  className="mt-3 inline-block text-xs text-neurospark hover:underline"
                >
                  Read how the economy works
                </Link>
              </Card>

              {/* The doors — the actual invitation */}
              <Card
                data={{ id: 'calling-doors', type: 'value', title: 'The doors', value: '' }}
                variant="ghost"
                radius="lg"
                shadow="sm"
                className="p-6"
              >
                <h3 className="text-star-dust font-bold mb-3">If this calls to you</h3>
                <div className="space-y-2">
                  <Link
                    href="/sanctuary"
                    className="flex items-center gap-2 rounded-lg border border-star-dust/15 p-3 text-sm text-star-dust/80 transition-colors hover:border-star-dust/30 motion-reduce:transition-none"
                  >
                    <DoorOpen className="h-4 w-4 text-neurospark" aria-hidden="true" />
                    Enter the Sanctuary
                  </Link>
                  <Link
                    href="/nexus/api"
                    className="flex items-center gap-2 rounded-lg border border-star-dust/15 p-3 text-sm text-star-dust/80 transition-colors hover:border-star-dust/30 motion-reduce:transition-none"
                  >
                    <GitBranch className="h-4 w-4 text-neurospark" aria-hidden="true" />
                    See the work itself — the open repos
                  </Link>
                </div>
                <p className="mt-3 text-xs text-star-dust/40">
                  Both doors are real. Neither asks anything of you first.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}
