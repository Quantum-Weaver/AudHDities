// src/app/(dashboard)/vendor/products/new/page.tsx
import { Metadata } from 'next';
import { createServerSupabase } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Page } from '@/components/layout/Page';
import ProductForm from '@/components/products/ProductForm';
import { Card } from '@/components/ui/Card';
import { ArrowLeft, Store } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Create New Product | Vendor Dashboard | AUDHDITIES',
  description: 'Add a new product to your vendor catalog',
};

export default async function VendorNewProductPage() {
  const supabase = await createServerSupabase();
  
  // Check if user is logged in
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login');
  }
  
  // Check if user is a vendor
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_vendor, vendor_profiles!inner(id)')
    .eq('id', user.id)
    .single();
  
  if (!profile?.is_vendor) {
    redirect('/vendor/apply');
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
            <Link href="/vendor/products" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
              <ArrowLeft size={16} />
              <span>Back to Products</span>
            </Link>
          </div>
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Store className="text-purple-400" size={28} />
              <h1 className="text-3xl font-bold text-white">
                Create New Product
              </h1>
            </div>
            <p className="text-white/60">
              Add a new product to your vendor catalog. Products can be digital downloads, physical goods, services, or anything you create.
            </p>
          </div>
          
          {/* Product Form */}
          <Card className="p-6 md:p-8">
            <ProductForm 
              mode="create"
              defaultResidualPool={30}
            />
          </Card>
        </div>
      </main>
    </Page>
  );
}