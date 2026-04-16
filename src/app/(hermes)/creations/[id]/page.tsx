// app/(hermes)/creations/[id]/page.tsx
// Creation View - Single product detail
// Feeling: Detailed, trustworthy, exciting
// Environment: dynamic based on product type

import { notFound } from 'next/navigation';
import { Page } from '@/components/arrchive/layout/Page';
import { ProductDetail } from '@/components/hermes/products/ProductDetail';
import { ImageGallery } from '@/components/hermes/ImageGallery';
import { PriceTiers } from '@/components/hermes/products/PriceTiers';
import { ContributionBreakdown } from '@/components/hermes/ContributionBreakdown';
import { CreatorInfo } from '@/components/hermes/CreatorInfo';
import { CheckoutButton } from '@/components/hermes/CheckoutButton';
import { RelatedProducts } from '@/components/hermes/RelatedProducts';
import { createServerSupabase } from '@/lib/supabase/server';

interface CreationViewPageProps {
  params: Promise<{ id: string }>;
}

export default async function CreationViewPage({ params }: CreationViewPageProps) {
  const { id } = await params;
  const supabase = await createServerSupabase();

  const { data: product } = await supabase
    .from('products')
    .select('*, creator:creator_id(*), contributions:contributions(*, contributor:contributor_id(*))')
    .eq('id', id)
    .single();

  if (!product) {
    notFound();
  }

  // Environment based on product type
  const productTypeEnv: Record<string, string> = {
    music: 'music',
    comedy: 'lounge',
    digital_course: 'library',
    physical_product: 'community',
  };
  const environment = productTypeEnv[product.product_type] || 'community';

  // Fetch related products
  const { data: related } = await supabase
    .from('products')
    .select('*')
    .eq('product_type', product.product_type)
    .neq('id', id)
    .limit(4);

  return (
    <Page 
      variant={1}
      environment={environment}
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Images */}
            <ImageGallery images={product.media_urls || []} />

            {/* Right Column - Details */}
            <div className="space-y-6">
              <ProductDetail product={product} />
              <PriceTiers 
                communityPrice={product.price_community}
                allyPrice={product.price_ally}
                corporatePrice={product.price_corporate}
              />
              <ContributionBreakdown contributions={product.contributions || []} />
              <CreatorInfo creator={product.creator} />
              <CheckoutButton productId={product.id} />
            </div>
          </div>

          {/* Related Products */}
          {related && related.length > 0 && (
            <div className="mt-16">
              <h2 className="text-xl font-semibold text-white mb-4">
                You Might Also Like
              </h2>
              <RelatedProducts products={related} />
            </div>
          )}
        </div>
      </main>
    </Page>
  );
}