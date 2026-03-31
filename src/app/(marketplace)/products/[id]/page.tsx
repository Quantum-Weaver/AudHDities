// src/app/(marketplace)/products/[id]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createServerSupabase } from '@/lib/supabase/server';
import { Page } from '@/components/layout/Page';
import { ProductDetail } from '@/components/products/ProductDetail';
import { ProductCard } from '@/components/products/ProductCard';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { Product, ProductWithCreator} from '@/types/supabase/tables/products';
import type { ProfileWithRelations } from '@/types/supabase/tables/profiles';

interface ProductPageProps {
  params: Promise<{ id: string }> | { id: string };
}


export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createServerSupabase();
  
  const { data: product } = await supabase
    .from('products')
    .select('title, description')
    .eq('id', id)
    .eq('is_published', true)
    .single();
  
  if (!product) {
    return { title: 'Product Not Found' };
  }
  
  return {
    title: `${product.title} | AUDHDITIES Marketplace`,
    description: product.description || 'View this creation on AUDHDITIES',
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const supabase = await createServerSupabase();
  
  // Fetch product with creator info using explicit foreign key
  const { data: product, error } = await supabase
    .from('products')
    .select(`
      *,
      creator:profiles!products_creator_id_fkey (
        id,
        username,
        display_name,
        avatar_url,
        creator_profiles!creator_profiles_id_fkey (
          verified_badge,
          creative_categories
        )
      )
    `)
    .eq('id', id)
    .eq('is_published', true)
    .single();
  
  if (error || !product) {
    notFound();
  }
  
  // Fetch related products (same creator)
  const { data: relatedProducts } = await supabase
    .from('products')
    .select('*')
    .eq('is_published', true)
    .eq('active', true)
    .neq('id', id)
    .eq('creator_id', product.creator_id)
    .order('created_at', { ascending: false })
    .limit(4);
  
  return (
    <Page 
      variant={1}
      environment="marketplace"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-6xl mx-auto px-6">
          
          {/* Back Button */}
          <div className="mb-6">
            <Link href="/products" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
              <ArrowLeft size={16} />
              <span>Back to Products</span>
            </Link>
          </div>
          
          {/* Product Detail */}
          <ProductDetail product={product as Product} />
          
          {/* Related Products */}
          {relatedProducts && relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-white mb-6">
                More from this creator
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map((related) => (
                  <ProductCard key={related.id} product={related} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </Page>
  );
}