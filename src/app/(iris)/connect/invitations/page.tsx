// src/app/(iris)/connect/invitations/page.tsx
import { Page } from '@/components/bifrost/Page';
import { InvitationsHub } from '@/components/asgard/domains/iris/invitations/InvitationsHub';

export const metadata = {
  title: 'Invitations | The Bridge | Sovereign Sanctuary',
  description: 'Welcome others to the Sanctuary',
};

export default function InvitationsPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <InvitationsHub />
    </Page>
  );
}