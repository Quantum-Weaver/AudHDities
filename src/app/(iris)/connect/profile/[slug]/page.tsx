// src/app/(iris)/connect/profile/[slug]/page.tsx
import { Page } from '@/components/bifrost/Page';
import { ProfileRoom } from '@/components/asgard/domains/iris/profile/ProfileRoom';

export const metadata = {
  title: 'Profile | The Bridge | Sovereign Sanctuary',
  description: 'A vessel’s public face',
};

export default function ProfilePage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <ProfileRoom />
    </Page>
  );
}
