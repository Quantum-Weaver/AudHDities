// src/app/(hermes)/bazaar/creations/[id]/page.tsx - the old word, kept as a door.
// The route was renamed 2026-08-25 (KP's word: creations should be wares,
// creators should be artisans, vendors should be merchants). A saved or pasted
// link still lands, id and all.
import { permanentRedirect } from 'next/navigation';

export default async function CreationRedirect({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  permanentRedirect(`/bazaar/wares/${id}`);
}
