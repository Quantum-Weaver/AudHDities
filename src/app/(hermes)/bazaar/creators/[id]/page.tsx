import { permanentRedirect } from 'next/navigation';

export default async function CreatorRedirect({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  permanentRedirect(`/bazaar/artisans/${id}`);
}
