// src/app/(dashboard)/vendor/products/[id]/edit/page.tsx
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { createServerSupabase } from '@/lib/supabase/server';
import Link from 'next/link';
import AuthGuard from '@/components/auth/AuthGuard';
import { Page } from '@/components/layout/Page';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, AlertCircle, Truck } from 'lucide-react';
import VendorProductForm from '@/components/products/VendorProductForm';

interface EditVendorProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: EditVendorProductPageProps): Promise<Metadata> {
  const supabase = await createServerSupabase();
  const { data: product } = await supabase
    .from('products')
    .select('title')
    .eq('id', params.id)
    .single();

  if (!product) {
    return {
      title: 'Product Not Found | AUDHDITIES',
    };
  }

  return {
    title: `Edit ${product.title} | Vendor Dashboard | AUDHDITIES`,
    description: 'Update your service or product listing',
  };
}

export default async function EditVendorProductPage({ params }: EditVendorProductPageProps) {
  const supabase = await createServerSupabase();
  
  // Check if user is logged in
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Check if user is a vendor
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_vendor')
    .eq('id', user.id)
    .single();

  if (!profile?.is_vendor) {
    redirect('/vendor/apply');
  }

  // Fetch product
  const { data: product, error: productError } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single();

  if (productError || !product) {
    notFound();
  }

  // Check if user owns this product
  if (product.creator_id !== user.id) {
    redirect('/vendor/products');
  }

  // Fetch vendor profile for default settings
  const { data: vendorProfile } = await supabase
    .from('vendor_profiles')
    .select('business_name, verification_status')
    .eq('id', user.id)
    .single();

  const isVerified = vendorProfile?.verification_status === 'verified';

  return (
    <AuthGuard>
      <Page 
        variant={1}
        environment="marketplace"
        showForeground={false}
        animated={true}
        showContinuityBeam={true}
      >
        <main className="min-h-screen py-12 px-6">
          <div className="container max-w-4xl mx-auto">
            
            {/* Header */}
            <div className="mb-8">
              <Link
                href={`/vendor/products/${product.id}`}
                className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors"
              >
                <ArrowLeft size={18} />
                Back to Product
              </Link>
              
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    Edit Product
                  </h1>
                  <p className="text-white/60">
                    Update your service or product listing
                  </p>
                </div>
                <div className="hidden md:block">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-full">
                    <Truck size={14} className="text-purple-400" />
                    <span className="text-xs text-purple-400">Vendor Mode</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Warning */}
            {!isVerified && (
              <div className="mb-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="text-yellow-400 flex-shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="text-yellow-400 font-medium">Verification Required</p>
                  <p className="text-white/60 text-sm">
                    Your vendor account is pending verification. Products can be created but will not be visible 
                    in the marketplace until your account is verified.
                  </p>
                </div>
              </div>
            )}

            {/* Published Warning */}
            {product.is_published && (
              <div className="mb-6 bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="text-cyan-400 flex-shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="text-cyan-400 font-medium">Published Product</p>
                  <p className="text-white/60 text-sm">
                    This product is currently published and visible to the public. 
                    Changes will be reflected immediately.
                  </p>
                </div>
              </div>
            )}

            {/* Form Card */}
            <Card className="p-6 md:p-8">
              <VendorProductForm 
                mode="edit"
                initialData={product}
                businessName={vendorProfile?.business_name}
                isVerified={isVerified}
                onSuccess={() => {
                  // Redirect handled by VendorProductForm
                }}
              />
            </Card>

            {/* Helpful Tips */}
            <div className="mt-8 grid md:grid-cols-3 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="text-2xl mb-2">📦</div>
                <h3 className="text-white font-bold mb-1">Shipping & Fulfillment</h3>
                <p className="text-white/40 text-sm">
                  Set shipping rates, processing times, and fulfillment options for physical products.
                </p>
                <Link
                  href={`/vendor/products/${product.id}/shipping`}
                  className="inline-block mt-2 text-sm text-purple-400 hover:underline"
                >
                  Configure Shipping →
                </Link>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="text-2xl mb-2">🏷️</div>
                <h3 className="text-white font-bold mb-1">Inventory Management</h3>
                <p className="text-white/40 text-sm">
                  Track stock levels, manage variants, and set low-stock alerts.
                </p>
                <Link
                  href={`/vendor/products/${product.id}/inventory`}
                  className="inline-block mt-2 text-sm text-purple-400 hover:underline"
                >
                  Manage Inventory →
                </Link>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="text-2xl mb-2">📸</div>
                <h3 className="text-white font-bold mb-1">Product Images</h3>
                <p className="text-white/40 text-sm">
                  Add multiple images to showcase your product from different angles.
                </p>
                <Link
                  href={`/vendor/products/${product.id}/images`}
                  className="inline-block mt-2 text-sm text-purple-400 hover:underline"
                >
                  Manage Images →
                </Link>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="mt-8 border border-red-500/30 rounded-lg overflow-hidden">
              <div className="bg-red-500/10 px-6 py-4 border-b border-red-500/30">
                <h3 className="text-red-400 font-bold">Danger Zone</h3>
                <p className="text-white/40 text-sm">Irreversible actions</p>
              </div>
              <div className="p-6 bg-white/5">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <p className="text-white font-medium">Delete this product</p>
                    <p className="text-white/40 text-sm">
                      This action cannot be undone. All sales data, customer orders, and reviews will be lost.
                      If you have pending orders, please fulfill them before deleting.
                    </p>
                  </div>
                  <form action={`/api/vendor/products/${product.id}/delete`} method="POST">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors"
                      onClick={(e) => {
                        if (!confirm('Are you sure you want to delete this product? This cannot be undone. Any pending orders must be fulfilled first.')) {
                          e.preventDefault();
                        }
                      }}
                    >
                      Delete Product
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Page>
    </AuthGuard>
  );
}