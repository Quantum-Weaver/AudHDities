// src/app/(dashboard)/creator/page.tsx
import { Metadata } from 'next';
import { createServerSupabase } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import AuthGuard from '@/components/auth/AuthGuard';
import { Page } from '@/components/layout/Page';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';
import { Sidebar } from '@/components/layout/Sidebar';
import { 
  Package, 
  DollarSign, 
  TrendingUp, 
  Users, 
  PlusCircle,
  Settings,
  Eye,
  Edit,
  Award,
  AlertCircle,
  Sparkles,
  Compass,
  Palette,
  BarChart3
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Creator Hub | AUDHDITIES',
  description: 'Your creative sanctuary',
};

export default async function CreatorDashboardPage() {
  const supabase = await createServerSupabase();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile) redirect('/dashboard');

  if (!profile.is_creator) {
    const { data: existingApp } = await supabase
      .from('applications')
      .select('status')
      .eq('user_id', user.id)
      .eq('application_type', 'creator')
      .maybeSingle();

    if (existingApp?.status === 'pending') {
      return (
        <AuthGuard>
          <Page variant={1} environment="creator" showForeground={false} animated showContinuityBeam>
            <main className="min-h-screen py-20 px-6">
              <div className="container max-w-3xl mx-auto text-center">
                <Card className="p-12">
                  <AlertCircle className="text-yellow-400 w-16 h-16 mx-auto mb-4" />
                  <h1 className="text-2xl font-bold text-white mb-2">Application Pending</h1>
                  <p className="text-white/60 mb-6">Your creator application is under review.</p>
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

  const { data: creator } = await supabase
    .from('creator_profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('creator_id', user.id)
    .eq('owner_type', 'creator')
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
  const publishedProducts = products?.filter(p => p.is_published).length || 0;
  const draftProducts = products?.filter(p => !p.is_published).length || 0;
  const totalSales = creator?.total_sales || 0;
  const totalEarnings = creator?.total_earnings || 0;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Unknown';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return 'Invalid date';
    }
  };

  return (
    <AuthGuard>
      <Page variant={1} environment="creator" showForeground={false} animated showContinuityBeam>
        
        <main className="min-h-screen py-20 px-6">
          <div className="container max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Palette size={20} className="text-cyan-400" />
                  <span className="text-sm text-cyan-400/80">Creator Hub</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Welcome back, {profile.display_name || profile.username}
                </h1>
                <p className="text-white/60">Your creative sanctuary awaits.</p>
              </div>
              
              <div className="flex items-center gap-3">
                {creator?.verified_badge && (
                  <Badge variant="success" className="flex items-center gap-1 px-3 py-1.5">
                    <Award size={14} />
                    Verified Creator
                  </Badge>
                )}
                <Link href="/creator/edit">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Settings size={16} />
                    Edit Profile
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <Card className="p-5 group hover:bg-white/10 transition-all">
                <Package className="text-cyan-400 mb-3" size={22} />
                <p className="text-2xl font-bold text-white">{totalProducts}</p>
                <p className="text-xs text-white/40">Total Products</p>
              </Card>
              <Card className="p-5 group hover:bg-white/10 transition-all">
                <TrendingUp className="text-green-400 mb-3" size={22} />
                <p className="text-2xl font-bold text-white">{totalSales}</p>
                <p className="text-xs text-white/40">Total Sales</p>
              </Card>
              <Card className="p-5 group hover:bg-white/10 transition-all">
                <DollarSign className="text-purple-400 mb-3" size={22} />
                <p className="text-2xl font-bold text-white">${totalEarnings.toFixed(2)}</p>
                <p className="text-xs text-white/40">Lifetime Earnings</p>
              </Card>
              <Card className="p-5 group hover:bg-white/10 transition-all">
                <BarChart3 className="text-pink-400 mb-3" size={22} />
                <p className="text-2xl font-bold text-white">{creator?.default_residual_pool || 30}%</p>
                <p className="text-xs text-white/40">Residual Pool</p>
              </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-white">Your Products</h2>
                  <Link href="/creator/products/new">
                    <Button size="sm" className="gap-2">
                      <PlusCircle size={16} />
                      New Product
                    </Button>
                  </Link>
                </div>

                {products?.length ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {products.map((product) => (
                      <Card key={product.id} className="p-4 hover:border-cyan-500/30 transition-all hover:scale-[1.02]">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-white font-bold truncate">{product.title}</h3>
                          <Badge variant={product.is_published ? 'success' : 'outline'} size="sm">
                            {product.is_published ? 'Published' : 'Draft'}
                          </Badge>
                        </div>
                        <p className="text-sm text-white/40 mb-3 line-clamp-2">{product.description || 'No description'}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-cyan-400 font-bold">${product.price_ally}</span>
                          <div className="flex gap-1">
                            <Link href={`/products/${product.id}`}><Button variant="ghost" size="sm"><Eye size={14} /></Button></Link>
                            <Link href={`/creator/products/${product.id}`}><Button variant="ghost" size="sm"><Edit size={14} /></Button></Link>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="p-12 text-center">
                    <Package className="text-white/20 w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-white font-bold mb-2">No products yet</h3>
                    <p className="text-white/40 text-sm mb-4">Create your first product to start earning residuals.</p>
                    <Link href="/creator/products/new"><Button size="sm">Create Your First Product</Button></Link>
                  </Card>
                )}
              </div>

              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-white font-bold mb-4 flex items-center gap-2"><TrendingUp size={18} className="text-green-400" /> Recent Sales</h3>
                  {recentSales.length ? (
                    <div className="space-y-3">
                      {recentSales.map((sale) => (
                        <div key={sale.id} className="flex justify-between items-center py-2 border-b border-white/5">
                          <div><p className="text-white text-sm truncate max-w-[130px]">{sale.products?.title}</p><p className="text-xs text-white/40">{formatDate(sale.created_at)}</p></div>
                          <span className="text-green-400 font-bold text-sm">${sale.gross_amount}</span>
                        </div>
                      ))}
                    </div>
                  ) : <p className="text-white/40 text-sm text-center py-4">No sales yet</p>}
                </Card>

                <Card className="p-6">
                  <h3 className="text-white font-bold mb-4">Creator Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between"><span className="text-white/60">Active Products</span><span className="text-white font-medium">{publishedProducts}</span></div>
                    <div className="flex justify-between"><span className="text-white/60">Drafts</span><span className="text-white font-medium">{draftProducts}</span></div>
                    <div className="flex justify-between"><span className="text-white/60">Products Sold</span><span className="text-white font-medium">{totalSales}</span></div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-white font-bold mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <Link href="/creator/products/new"><Button variant="outline" className="w-full justify-start"><PlusCircle size={16} className="mr-2" />Create New Product</Button></Link>
                    <Link href="/creator/contributions"><Button variant="outline" className="w-full justify-start"><Users size={16} className="mr-2" />Manage Contributors</Button></Link>
                    <Link href="/creator/settings"><Button variant="outline" className="w-full justify-start"><Settings size={16} className="mr-2" />Creator Settings</Button></Link>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </Page>
    </AuthGuard>
  );
}