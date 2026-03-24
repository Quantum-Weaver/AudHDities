// src/app/(dashboard)/creator/products/new/page.tsx
import { Metadata } from 'next';
import { createServerSupabase } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import AuthGuard from '@/components/auth/AuthGuard';
import { Page } from '@/components/layout/Page';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Sparkles } from 'lucide-react';
import ProductForm from '@/components/products/ProductForm';

export const metadata: Metadata = {
  title: 'Create New Product | Creator Dashboard | AUDHDITIES',
  description: 'Share your creative work with the sanctuary',
};

export default async function NewProductPage() {
  const supabase = await createServerSupabase();
  
  // Check if user is logged in
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Fetch profile to check if user is a creator
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile) redirect('/dashboard');

  // If not a creator, redirect to apply
  if (!profile.is_creator) {
    redirect('/creator/apply');
  }

  // Fetch creator profile for default residual pool setting
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
                href="/creator/products"
                className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors"
              >
                <ArrowLeft size={18} />
                Back to Products
              </Link>
              
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    Create New Product
                  </h1>
                  <p className="text-white/60">
                    Share your creative work with the sanctuary community
                  </p>
                </div>
                <div className="hidden md:block text-right">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 rounded-full">
                    <Sparkles size={14} className="text-cyan-400" />
                    <span className="text-xs text-cyan-400">Creator Mode</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Card */}
            <Card className="p-6 md:p-8">
              <ProductForm 
                mode="create"
                defaultResidualPool={defaultResidualPool}
                onSuccess={() => {
                  // Redirect handled by ProductForm
                }}
              />
            </Card>

            {/* Helpful Tips */}
            <div className="mt-8 grid md:grid-cols-3 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="text-2xl mb-2">💰</div>
                <h3 className="text-white font-bold mb-1">Pricing Tiers</h3>
                <p className="text-white/40 text-sm">
                  Set different prices for Community (ND), Ally, and Corporate tiers.
                  The Acid Test determines which price users see.
                </p>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="text-2xl mb-2">🔄</div>
                <h3 className="text-white font-bold mb-1">Residual Sharing</h3>
                <p className="text-white/40 text-sm">
                  Choose a percentage of your earnings to share with contributors.
                  You can add contributors after creating the product.
                </p>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="text-2xl mb-2">🏷️</div>
                <h3 className="text-white font-bold mb-1">Product Types</h3>
                <p className="text-white/40 text-sm">
                  Digital downloads, physical goods, courses, services—choose the type that fits your creation.
                </p>
              </div>
            </div>
          </div>
        </main>
      </Page>
    </AuthGuard>
  );
}