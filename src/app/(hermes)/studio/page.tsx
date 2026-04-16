// app/(hermes)/studio/page.tsx
// The Loom - Create new product
// Feeling: Generative, fluid, sovereign, unbounded

import { Page } from '@/components/arrchive/layout/Page';
import { ProductForm } from '@/components/bazaar/ProductForm';
import { TypeSelector } from '@/components/bazaar/TypeSelector';
import { PricingFields } from '@/components/bazaar/PricingFields';
import { MediaUploader } from '@/components/bazaar/MediaUploader';
import { ContributionManager } from '@/components/bazaar/ContributionManager';
import { PublishToggle } from '@/components/bazaar/PublishToggle';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function StudioPage() {
  const session = await auth();
  
  if (!session) {
    redirect('/enter');
  }

  return (
    <Page 
      variant={2}
      environment="studio"
      showForeground={true}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              The Loom
            </h1>
            <p className="text-white/60">
              Weave your creation into the Sanctuary
            </p>
          </div>

          {/* Creation Form */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <ProductForm 
              mode="create"
              onSuccess={() => redirect('/bazaar/creations')}
            />
          </div>
        </div>
      </main>
    </Page>
  );
}