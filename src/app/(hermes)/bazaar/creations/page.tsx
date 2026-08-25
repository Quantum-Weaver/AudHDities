// src/app/(hermes)/bazaar/creations/page.tsx - the old word, kept as a door.
// The route was renamed 2026-08-25 (KP's word: creations should be wares,
// creators should be artisans, vendors should be merchants). A saved or pasted
// link still lands.
import { permanentRedirect } from 'next/navigation';

export default function CreationsRedirect() {
  permanentRedirect('/bazaar/wares');
}
