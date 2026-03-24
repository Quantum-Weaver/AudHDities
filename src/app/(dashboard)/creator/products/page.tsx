// src/app/(dashboard)/creator/products/page.tsx
import { Metadata } from 'next';
import { createServerSupabase } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import AuthGuard from '@/components/auth/AuthGuard';
import { Page } from '@/components/layout/Page';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { PlusCircle, Package, DollarSign, TrendingUp, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'My Products | Creator Dashboard | AUDHDITIES',
  description: 'Manage your creative products',
};

export default async function CreatorProductsPage() {
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
    // Check if they have a pending application
    const { data: existingApp } = await supabase
      .from('applications')
      .select('status')
      .eq('user_id', user.id)
      .eq('application_type', 'creator')
      .maybeSingle();

    if (existingApp?.status === 'pending') {
      return (
        <AuthGuard>
          <Page 
            variant={1}
            environment="creator"
            showForeground={false}
            animated={true}
            showContinuityBeam={true}
          >
            <main className="min-h-screen py-20 px-6">
              <div className="container max-w-3xl mx-auto text-center">
                <Card className="p-12">
                  <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="text-yellow-400" size={32} />
                  </div>
                  <h1 className="text-2xl font-bold text-white mb-2">Application Pending</h1>
                  <p className="text-white/60 mb-6">
                    Your creator application is still under review. You'll be able to create products once approved.
                  </p>
                  <Link href="/dashboard">
                    <Button variant="outline">Return to Dashboard</Button>
                  </Link>
                </Card>
              </div>
            </main>
          </Page>
        </AuthGuard>
      );
    }

    redirect('/creator/apply');
  }

  // Fetch creator profile for stats
  const { data: creatorProfile } = await supabase
    .from('creator_profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Fetch products
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('creator_id', user.id)
    .order('created_at', { ascending: false });

  // Calculate stats
  const totalProducts = products?.length || 0;
  const publishedProducts = products?.filter(p => p.is_published).length || 0;
  const draftProducts = products?.filter(p => !p.is_published).length || 0;
  const totalEarnings = creatorProfile?.total_earnings || 0;
  const totalSales = creatorProfile?.total_sales || 0;

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
          <div className="container max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  My Products
                </h1>
                <p className="text-white/60">
                  Manage your creative offerings
                </p>
              </div>
              
              <Link href="/creator/products/new">
                <Button className="mt-4 md:mt-0 flex items-center gap-2">
                  <PlusCircle size={18} />
                  Create New Product
                </Button>
              </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card className="p-4 text-center">
                <Package className="text-cyan-400 mx-auto mb-2" size={20} />
                <div className="text-2xl font-bold text-white">{totalProducts}</div>
                <div className="text-xs text-white/40">Total Products</div>
              </Card>
              
              <Card className="p-4 text-center">
                <div className="text-green-400 text-2xl mb-2">📄</div>
                <div className="text-2xl font-bold text-white">{publishedProducts}</div>
                <div className="text-xs text-white/40">Published</div>
              </Card>
              
              <Card className="p-4 text-center">
                <div className="text-yellow-400 text-2xl mb-2">✏️</div>
                <div className="text-2xl font-bold text-white">{draftProducts}</div>
                <div className="text-xs text-white/40">Drafts</div>
              </Card>
              
              <Card className="p-4 text-center">
                <DollarSign className="text-purple-400 mx-auto mb-2" size={20} />
                <div className="text-2xl font-bold text-white">${totalEarnings.toFixed(2)}</div>
                <div className="text-xs text-white/40">Lifetime Earnings</div>
              </Card>
            </div>

            {/* Products Grid */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Your Products</h2>
                <Link href="/creator/products/new" className="text-sm text-cyan-400 hover:underline">
                  + New Product
                </Link>
              </div>
              
              <ProductGrid
                products={products || []}
                variant="dashboard"
                showActions={true}
                showFilters={true}
                showSearch={true}
                showViewToggle={true}
                emptyMessage="You haven't created any products yet. Click 'Create New Product' to get started."
              />
            </div>

            {/* Tips Card */}
            {totalProducts === 0 && (
              <Card className="mt-8 p-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-cyan-500/20">
                <h3 className="text-white font-bold mb-2">✨ Ready to share your gifts?</h3>
                <p className="text-white/60 text-sm mb-4">
                  Creating a product is easy. Choose a type, set your pricing, and share your work with the world.
                  Remember—you can set up residual sharing so contributors earn forever.
                </p>
                <Link href="/creator/products/new">
                  <Button size="sm">Create Your First Product</Button>
                </Link>
              </Card>
            )}
          </div>
        </main>
      </Page>
    </AuthGuard>
  );
}