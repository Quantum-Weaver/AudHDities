// src/app/(iris)/connect/messages/[id]/page.tsx
import { Page } from '@/components/bifrost/Page';
import { ConversationView } from '@/components/asgard/domains/iris/messages/ConversationView';

export const metadata = {
  title: 'Conversation | The Bridge | Sovereign Sanctuary',
  description: 'A thread between souls',
};

export default function ConversationPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <ConversationView />
    </Page>
  );
}