// src/app/(iris)/connect/messages/page.tsx
import { Page } from '@/components/bifrost/Page';
import { MessagesStream } from '@/components/asgard/domains/iris/messages/MessagesStream';

export const metadata = {
  title: 'Messages | The Bridge | Sovereign Sanctuary',
  description: 'Your conversations, all in one place',
};

export default function MessagesPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <MessagesStream />
    </Page>
  );
}