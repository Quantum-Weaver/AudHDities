// src/app/(dashboard)/creator/products/[id]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createServerSupabase } from '@/lib/supabase/server';
import { Page } from '@/components/layout/Page';
import ProductForm from '@/components/products/ProductForm';
import { Card } from '@/components/ui/Card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface VendorProductDetailPageProps {
  params: Promise<{ id: string }> | { id: string };
}

export async function generateMetadata({ params }: VendorProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createServerSupabase();
  
  const { data: product } = await supabase
    .from('products')
    .select('title')
    .eq('id', id)
    .single();
  
  if (!product) {
    return { title: 'Product Not Found' };
  }
  
  return {
    title: `${product.title} | Edit Product | AUDHDITIES`,
    description: `Edit ${product.title}`,
  };
}

export default async function VendorProductDetailPage({ params }: VendorProductDetailPageProps) {
  const { id } = await params;
  const supabase = await createServerSupabase();
  
  // Fetch product
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error || !product) {
    notFound();
  }
  
  // Check if user is the creator
  const { data: { user } } = await supabase.auth.getUser();
  const isCreator = user?.id === product.creator_id;
  
  if (!isCreator) {
    notFound();
  }
  
  const initialData = {
    ...product,
    price_community: product.price_community ?? 0,
    price_corporate: product.price_corporate ?? 0,
    price_ally: product.price_ally ?? 0,
    residual_pool_percent: product.residual_pool_percent ?? 30,
    sanctuary_infrastructure_percent: product.sanctuary_infrastructure_percent ?? 10,
  };
  
  return (
    <Page 
      variant={1}
      environment="dashboard"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-4xl mx-auto px-6">
          
          <div className="mb-6">
            <Link href="/vendor/products" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
              <ArrowLeft size={16} />
              <span>Back to Products</span>
            </Link>
          </div>
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Edit Product
            </h1>
            <p className="text-white/60">
              Update your product details
            </p>
          </div>
          
          <Card className="p-6 md:p-8">
            <ProductForm 
              mode="edit"
            />
          </Card>
        </div>
      </main>
    </Page>
  );
}