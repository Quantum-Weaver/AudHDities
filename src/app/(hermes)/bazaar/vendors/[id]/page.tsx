import { permanentRedirect } from 'next/navigation';

export default async function VendorRedirect({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  permanentRedirect(`/bazaar/merchants/${id}`);
}
