// src/app/(dashboard)/creator/products/[id]/edit/page.tsx
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { createServerSupabase } from '@/lib/supabase/server';
import Link from 'next/link';
import AuthGuard from '@/components/auth/AuthGuard';
import { Page } from '@/components/layout/Page';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import ProductForm from '@/components/products/ProductForm';

interface EditProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: EditProductPageProps): Promise<Metadata> {
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
    title: `Edit ${product.title} | Creator Dashboard | AUDHDITIES`,
    description: 'Update your creative product',
  };
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const supabase = await createServerSupabase();
  
  // Check if user is logged in
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

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
    redirect('/creator/products');
  }

  // Fetch creator profile for default residual pool
  const { data: creatorProfile } = await supabase
    .from('creator_profiles')
    .select('default_residual_pool')
    .eq('id', user.id)
    .single();

  const defaultResidualPool = creatorProfile?.default_residual_pool ?? 30;

  return (
    <AuthGuard>
      <Page 
        variant={1}
        environment="creator"
        showForeground={false}
        animated={true}
        showContinuityBeam={true}
      >
        <main className="min-h-screen py-12 px-6">
          <div className="container max-w-4xl mx-auto">
            
            {/* Header */}
            <div className="mb-8">
              <Link
                href={`/creator/products/${product.id}`}
                className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors"
              >
                <ArrowLeft size={18} />
                Back to Product
              </Link>
              
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Edit Product
                </h1>
                <p className="text-white/60">
                  Update your creative work
                </p>
              </div>
            </div>

            {/* Warning for published products */}
            {product.is_published && (
              <div className="mb-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="text-yellow-400 flex-shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="text-yellow-400 font-medium">Published Product</p>
                  <p className="text-white/60 text-sm">
                    This product is currently published and visible to the public. 
                    Changes will be reflected immediately.
                  </p>
                </div>
              </div>
            )}

            {/* Form Card */}
            <Card className="p-6 md:p-8">
              <ProductForm 
                mode="edit"
                initialData={product}
                defaultResidualPool={defaultResidualPool}
                onSuccess={() => {
                  // Redirect handled by ProductForm
                }}
              />
            </Card>

            {/* Helpful Tips */}
            <div className="mt-8 grid md:grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="text-2xl mb-2">👥</div>
                <h3 className="text-white font-bold mb-1">Manage Contributors</h3>
                <p className="text-white/40 text-sm">
                  After saving, you can add or edit contributors who share in the residuals.
                </p>
                <Link
                  href={`/creator/products/${product.id}/contributors`}
                  className="inline-block mt-2 text-sm text-cyan-400 hover:underline"
                >
                  Manage Contributors →
                </Link>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="text-2xl mb-2">📊</div>
                <h3 className="text-white font-bold mb-1">View Analytics</h3>
                <p className="text-white/40 text-sm">
                  See how your product is performing with sales data and insights.
                </p>
                <Link
                  href={`/creator/products/${product.id}/analytics`}
                  className="inline-block mt-2 text-sm text-cyan-400 hover:underline"
                >
                  View Analytics →
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
                      This action cannot be undone. All sales data and contributions will be lost.
                    </p>
                  </div>
                  <form action={`/api/products/${product.id}/delete`} method="POST">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors"
                      onClick={(e) => {
                        if (!confirm('Are you sure you want to delete this product? This cannot be undone.')) {
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