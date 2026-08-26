import { permanentRedirect } from 'next/navigation';

export default async function CreationRedirect({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  permanentRedirect(`/bazaar/wares/${id}`);
}
