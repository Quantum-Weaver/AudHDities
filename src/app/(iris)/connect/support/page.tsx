// app/(iris)/connect/support/page.tsx
// The Healing Flame - Support requests, crisis resources
// Feeling: Safe, gentle, healing, restorative

import { Page } from '@/components/arrchive/shared/Page';
import { SupportForm } from '@/components/connect/SupportForm';
import { CategorySelect } from '@/components/connect/CategorySelect';
import { UrgencyIndicator } from '@/components/connect/UrgencyIndicator';
import { ChatButton } from '@/components/connect/ChatButton';
import { ResourceLinks } from '@/components/connect/ResourceLinks';
import { auth } from '@/lib/auth';

export const metadata = {
  title: 'The Healing Flame | Sovereign Sanctuary',
  description: 'Support and resources for the community'
};

export default async function SupportPage() {
  const session = await auth();

  return (
    <Page 
      variant={1}
      environment="support"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              The Healing Flame
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto">
              You are not alone. We are here for you.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white/5 rounded-xl p-8">
                <h2 className="text-xl font-semibold text-white mb-4">
                  How can we help?
                </h2>
                <SupportForm />
              </div>
            </div>

            <div className="space-y-8">
              <CategorySelect />
              <UrgencyIndicator />
              <ChatButton />
              <ResourceLinks />
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}