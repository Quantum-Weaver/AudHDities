// src/app/(dashboard)/creator/products/new/page.tsx
import { Metadata } from 'next';
import { createServerSupabase } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Page } from '@/components/layout/Page';
import ProductForm from '@/components/products/ProductForm';
import { Card } from '@/components/ui/Card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Create New Product | AUDHDITIES',
  description: 'Add a new product to your sanctuary',
};

export default async function CreatorNewProductPage() {
  const supabase = await createServerSupabase();
  
  // Check if user is logged in and is a creator
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login');
  }
  
  // Check if user is a creator
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_creator')
    .eq('id', user.id)
    .single();
  
  if (!profile?.is_creator) {
    redirect('/creator/apply');
  }
  
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
          
          {/* Back Button */}
          <div className="mb-6">
            <Link href="/creator/products" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
              <ArrowLeft size={16} />
              <span>Back to Products</span>
            </Link>
          </div>
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Create New Product
            </h1>
            <p className="text-white/60">
              Share your creation with the sanctuary
            </p>
          </div>
          
          {/* Product Form */}
          <Card className="p-6 md:p-8">
            <ProductForm mode="create" />
          </Card>
        </div>
      </main>
    </Page>
  );
}