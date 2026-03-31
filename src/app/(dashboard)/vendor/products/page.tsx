// src/app/(dashboard)/vendor/products/page.tsx
import { Metadata } from 'next';
import { createServerSupabase } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import AuthGuard from '@/components/auth/AuthGuard';
import { Page } from '@/components/layout/Page';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { PlusCircle, Package, DollarSign, TrendingUp, Truck, Store } from 'lucide-react';

export const metadata: Metadata = {
  title: 'My Services | Vendor Dashboard | AUDHDITIES',
  description: 'Manage your vendor services and offerings',
};

export default async function VendorProductsPage() {
  const supabase = await createServerSupabase();
  
  // Check if user is logged in
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Fetch profile to check if user is a vendor
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile) redirect('/dashboard');

  // If not a vendor, redirect to apply
  if (!profile.is_vendor) {
    // Check if they have a pending application
    const { data: existingApp } = await supabase
      .from('applications')
      .select('status')
      .eq('user_id', user.id)
      .eq('application_type', 'vendor')
      .maybeSingle();

    if (existingApp?.status === 'pending') {
      return (
        <AuthGuard>
          <Page 
            variant={1}
            environment="marketplace"
            showForeground={false}
            animated={true}
            showContinuityBeam={true}
          >
            <main className="min-h-screen py-20 px-6">
              <div className="container max-w-3xl mx-auto text-center">
                <Card className="p-12">
                  <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Truck className="text-yellow-400" size={32} />
                  </div>
                  <h1 className="text-2xl font-bold text-white mb-2">Application Pending</h1>
                  <p className="text-white/60 mb-6">
                    Your vendor application is still under review. You'll be able to offer services once approved.
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

    redirect('/vendor/apply');
  }

  // Fetch vendor profile for stats
  const { data: vendorProfile } = await supabase
    .from('vendor_profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Fetch products (services) - products table uses creator_id for both creators and vendors
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('creator_id', user.id)
    .eq('owner_type', 'vendor')
    .order('created_at', { ascending: false });

  // Calculate stats
  const totalProducts = products?.length || 0;
  const publishedProducts = products?.filter(p => p.is_published).length || 0;
  const draftProducts = products?.filter(p => !p.is_published).length || 0;
  const totalEarnings = vendorProfile?.total_earnings || 0;
  const totalSales = vendorProfile?.total_sales || 0;

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
          <div className="container max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Store size={24} className="text-purple-400" />
                  <h1 className="text-3xl font-bold text-white">
                    My Services
                  </h1>
                </div>
                <p className="text-white/60">
                  Manage your vendor services and offerings
                </p>
                {vendorProfile?.business_name && (
                  <p className="text-sm text-purple-400 mt-1">
                    {vendorProfile.business_name}
                  </p>
                )}
              </div>
              
              <Link href="/vendor/products/new">
                <Button className="mt-4 md:mt-0 flex items-center gap-2 bg-purple-600 hover:bg-purple-500">
                  <PlusCircle size={18} />
                  Create New Service
                </Button>
              </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card className="p-4 text-center border-purple-500/20">
                <Package className="text-purple-400 mx-auto mb-2" size={20} />
                <div className="text-2xl font-bold text-white">{totalProducts}</div>
                <div className="text-xs text-white/40">Total Services</div>
              </Card>
              
              <Card className="p-4 text-center">
                <div className="text-green-400 text-2xl mb-2">✓</div>
                <div className="text-2xl font-bold text-white">{publishedProducts}</div>
                <div className="text-xs text-white/40">Active</div>
              </Card>
              
              <Card className="p-4 text-center">
                <div className="text-yellow-400 text-2xl mb-2">✏️</div>
                <div className="text-2xl font-bold text-white">{draftProducts}</div>
                <div className="text-xs text-white/40">Drafts</div>
              </Card>
              
              <Card className="p-4 text-center">
                <DollarSign className="text-green-400 mx-auto mb-2" size={20} />
                <div className="text-2xl font-bold text-white">${totalEarnings.toFixed(2)}</div>
                <div className="text-xs text-white/40">Lifetime Earnings</div>
              </Card>
            </div>

            {/* Services Grid */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Your Services</h2>
                <Link href="/vendor/products/new" className="text-sm text-purple-400 hover:underline">
                  + New Service
                </Link>
              </div>
              
              <ProductGrid
                products={products || []}
                variant="dashboard"
                showActions={true}
                showFilters={true}
                showSearch={true}
                showViewToggle={true}
                emptyMessage="You haven't created any services yet. Click 'Create New Service' to get started."
              />
            </div>

            {/* Tips Card */}
            {totalProducts === 0 && (
              <Card className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
                <h3 className="text-white font-bold mb-2">✨ Ready to offer your services?</h3>
                <p className="text-white/60 text-sm mb-4">
                  As a vendor, you can offer logistics, shipping, venues, marketing, or other services that help creators reach their audience.
                  Set your pricing and start connecting with creators who need your expertise.
                </p>
                <Link href="/vendor/products/new">
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-500">Create Your First Service</Button>
                </Link>
              </Card>
            )}

            {/* Business Info Card */}
            {vendorProfile && totalProducts > 0 && !vendorProfile.verified_badge && (
              <Card className="mt-8 p-6 bg-yellow-500/10 border-yellow-500/20">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                    <Truck size={16} className="text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">Complete Your Vendor Profile</h3>
                    <p className="text-white/60 text-sm">
                      Add more details about your business, including your website, product categories, and verification status to build trust with creators.
                    </p>
                    <Link href="/vendor/edit" className="text-sm text-yellow-400 hover:underline mt-2 inline-block">
                      Update Vendor Profile →
                    </Link>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </main>
      </Page>
    </AuthGuard>
  );
}