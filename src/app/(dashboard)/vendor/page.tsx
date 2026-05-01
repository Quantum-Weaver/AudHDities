// src/app/(dashboard)/vendor/page.tsx
import { Metadata } from 'next';
import { createServerSupabase } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import AuthGuard from '@/components/auth/AuthGuard';
import { Page } from '@/components/layout/Page';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';
import { 
  Package, DollarSign, TrendingUp, Users, PlusCircle, Settings, Store, Truck, Award, AlertCircle, BarChart3
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Vendor Hub | AUDHDITIES',
  description: 'Your business sanctuary',
};

export default async function VendorDashboardPage() {
  const supabase = await createServerSupabase();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile) redirect('/dashboard');

  if (!profile.is_vendor) {
    const { data: existingApp } = await supabase
      .from('applications')
      .select('status')
      .eq('user_id', user.id)
      .eq('application_type', 'vendor')
      .maybeSingle();

    if (existingApp?.status === 'pending') {
      return (
        <AuthGuard>
          <Page variant={1} environment="business" showForeground={false} animated showContinuityBeam>
            <main className="min-h-screen py-20 px-6"><div className="container max-w-3xl mx-auto text-center"><Card className="p-12"><AlertCircle className="text-yellow-400 w-16 h-16 mx-auto mb-4" /><h1 className="text-2xl font-bold text-white mb-2">Application Pending</h1><p className="text-white/60 mb-6">Your vendor application is under review.</p><Link href="/dashboard"><Button variant="outline">Return to Dashboard</Button></Link></Card></div></main>
          </Page>
        </AuthGuard>
      );
    }
    redirect('/vendor/apply');
  }

  const { data: vendor } = await supabase
    .from('vendor_profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('creator_id', user.id)
    .eq('owner_type', 'vendor') 
    .order('created_at', { ascending: false });

  let recentSales: any[] = [];
  if (products?.length) {
    const { data: salesData } = await supabase
      .from('sales')
      .select('*, products!inner (title)')
      .in('product_id', products.map(p => p.id))
      .order('created_at', { ascending: false })
      .limit(5);
    recentSales = salesData || [];
  }

  const totalProducts = products?.length || 0;
  const totalSales = vendor?.total_sales || 0;
  const totalEarnings = vendor?.total_earnings || 0;
  const publishedProducts = products?.filter(p => p.is_published).length || 0;
  const draftProducts = products?.filter(p => !p.is_published).length || 0;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Unknown';
    try { return new Date(dateString).toLocaleDateString(); } catch { return 'Invalid date'; }
  };

  const getBusinessTypeDisplay = (type: string | null) => {
    if (!type) return null;
    return type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  return (
    <AuthGuard>
      <Page variant={1} environment="business" showForeground={false} animated showContinuityBeam>
        <main className="min-h-screen py-20 px-6">
          <div className="container max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-2"><Truck size={20} className="text-purple-400" /><span className="text-sm text-purple-400/80">Vendor Hub</span></div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Welcome back, {profile.display_name || profile.username}</h1>
                <p className="text-white/60">Your business sanctuary.</p>
                {vendor?.business_name && <p className="text-sm text-cyan-400 mt-1"><Store size={14} className="inline mr-1" />{vendor.business_name}{vendor.business_type && <span className="text-white/40 ml-2">• {getBusinessTypeDisplay(vendor.business_type)}</span>}</p>}
              </div>
              <div className="flex items-center gap-3">
                {vendor?.verified_badge && <Badge variant="success" className="flex items-center gap-1 px-3 py-1.5"><Award size={14} />Verified Vendor</Badge>}
                <Link href="/vendor/edit"><Button variant="outline" size="sm" className="gap-2"><Settings size={16} />Edit Profile</Button></Link>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <Card className="p-5"><Package className="text-cyan-400 mb-3" size={22} /><p className="text-2xl font-bold text-white">{totalProducts}</p><p className="text-xs text-white/40">Total Products</p></Card>
              <Card className="p-5"><TrendingUp className="text-green-400 mb-3" size={22} /><p className="text-2xl font-bold text-white">{totalSales}</p><p className="text-xs text-white/40">Total Sales</p></Card>
              <Card className="p-5"><DollarSign className="text-purple-400 mb-3" size={22} /><p className="text-2xl font-bold text-white">${totalEarnings.toFixed(2)}</p><p className="text-xs text-white/40">Lifetime Earnings</p></Card>
              <Card className="p-5"><BarChart3 className="text-pink-400 mb-3" size={22} /><p className="text-2xl font-bold text-white">{vendor?.product_categories?.length || 0}</p><p className="text-xs text-white/40">Categories</p></Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="flex justify-between items-center"><h2 className="text-xl font-bold text-white">Your Products</h2><Link href="/vendor/products/new"><Button size="sm" className="gap-2"><PlusCircle size={16} />New Product</Button></Link></div>
                {products?.length ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {products.map((product) => (
                      <Card key={product.id} className="p-4 hover:border-purple-500/30 transition-all hover:scale-[1.02]">
                        <div className="flex justify-between items-start mb-2"><h3 className="text-white font-bold truncate">{product.title}</h3><Badge variant={product.is_published ? 'success' : 'outline'} size="sm">{product.is_published ? 'Published' : 'Draft'}</Badge></div>
                        <p className="text-sm text-white/40 mb-3 line-clamp-2">{product.description || 'No description'}</p>
                        <div className="flex justify-between items-center"><span className="text-purple-400 font-bold">${product.price_ally}</span><div className="flex gap-1"><Link href={`/vendor/products/${product.id}`}><Button variant="ghost" size="sm">View</Button></Link><Link href={`/vendor/products/${product.id}/edit`}><Button variant="ghost" size="sm">Edit</Button></Link></div></div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="p-12 text-center"><Package className="text-white/20 w-12 h-12 mx-auto mb-4" /><h3 className="text-white font-bold mb-2">No products yet</h3><p className="text-white/40 text-sm mb-4">Add your first product to start selling.</p><Link href="/vendor/products/new"><Button size="sm">Create Your First Product</Button></Link></Card>
                )}
              </div>

              <div className="space-y-6">
                <Card className="p-6"><h3 className="text-white font-bold mb-4 flex items-center gap-2"><TrendingUp size={18} className="text-green-400" /> Recent Sales</h3>
                  {recentSales.length ? <div className="space-y-3">{recentSales.map((sale) => (<div key={sale.id} className="flex justify-between items-center py-2 border-b border-white/5"><div><p className="text-white text-sm truncate max-w-[130px]">{sale.products?.title}</p><p className="text-xs text-white/40">{formatDate(sale.created_at)}</p></div><span className="text-green-400 font-bold text-sm">${sale.gross_amount}</span></div>))}</div> : <p className="text-white/40 text-sm text-center py-4">No sales yet</p>}
                </Card>
                <Card className="p-6"><h3 className="text-white font-bold mb-4">Business Stats</h3>
                  <div className="space-y-3"><div className="flex justify-between"><span className="text-white/60">Active Products</span><span className="text-white font-medium">{publishedProducts}</span></div>
                  <div className="flex justify-between"><span className="text-white/60">Stripe Connected</span><span className="text-white font-medium">{vendor?.stripe_account_id ? '✅' : '❌'}</span></div></div>
                </Card>
                <Card className="p-6"><h3 className="text-white font-bold mb-4">Quick Actions</h3>
                  <div className="space-y-2"><Link href="/vendor/products/new"><Button variant="outline" className="w-full justify-start"><PlusCircle size={16} className="mr-2" />Add New Product</Button></Link>
                  <Link href="/vendor/settings"><Button variant="outline" className="w-full justify-start"><Settings size={16} className="mr-2" />Business Settings</Button></Link>
                  <Link href="/vendor/connect-stripe"><Button variant="outline" className="w-full justify-start"><DollarSign size={16} className="mr-2" />{vendor?.stripe_account_id ? 'Update' : 'Connect'} Stripe</Button></Link></div>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </Page>
    </AuthGuard>
  );
}