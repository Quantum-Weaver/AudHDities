import { permanentRedirect } from 'next/navigation';

export default function VendorsRedirect() {
  permanentRedirect('/bazaar/merchants');
}
