// src/app/(hermes)/bazaar/contributions/page.tsx
import { Page } from '@/components/bifrost/Page';
import { ContributionsGallery } from '@/components/asgard/domains/hermes/contributions/ContributionsGallery';

export const metadata = { title: 'Contributions | Sovereign Sanctuary', description: 'Your part in every work, recorded' };

export default function ContributionsPage() {
  return (<Page showForeground={false} showContinuityBeam={true}><ContributionsGallery /></Page>);
}