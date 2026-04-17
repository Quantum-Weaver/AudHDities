// src/app/(dashboard)/admin/products/page.tsx
import { Metadata } from 'next';
import { createServerSupabase } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Page } from '@/components/shared/Page';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Search, Package, Eye, Edit, CheckCircle, XCircle, User } from 'lucide-react';
import Link from 'next/link';
import type { Product } from '@/types/supabase/tables/products';
import { getProductTypeLabel } from '@/types/supabase/tables/products';

export const metadata: Metadata = {
  title: 'Products | Admin Dashboard',
  description: 'Moderate sanctuary products',
};

// Server-side admin check
async function requireAdmin() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();
  
  if (!profile?.is_admin) redirect('/dashboard');
  
  return { supabase, currentAdmin: user };
}

// Helper to format price safely
function formatPrice(price: number | null): string {
  if (price === null || price === 0) return 'Free';
  return `$${price.toFixed(2)}`;
}

// Helper to format date safely
function formatDate(dateString: string | null) {
  if (!dateString) return 'Unknown';
  try {
    return new Date(dateString).toLocaleDateString();
  } catch {
    return 'Invalid date';
  }
}

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: { q?: string; status?: string };
}) {
  const { supabase } = await requireAdmin();
  const searchQuery = searchParams.q || '';
  const statusFilter = searchParams.status || 'pending';
  
  // Build query
  let query = supabase
    .from('products')
    .select(`
      *,
      creator:profiles!products_creator_id_fkey (
        id,
        username,
        display_name,
        avatar_url
      )
    `)
    .order('created_at', { ascending: false });
  
  if (statusFilter === 'pending') {
    query = query.eq('is_published', false);
  } else if (statusFilter === 'published') {
    query = query.eq('is_published', true);
  } else if (statusFilter === 'reported') {
    // For reported products - you'd need a reported flag in products table
    query = query.eq('is_published', true); // Placeholder
  }
  
  if (searchQuery) {
    query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
  }
  
  const { data: products } = await query;
  
  const tabs = [
    { id: 'pending', label: 'Pending Review' },
    { id: 'published', label: 'Published' },
  ];
  
  return (
    <Page variant={1} environment="dashboard" showForeground={false} animated={true} showContinuityBeam={true}>
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Product Moderation
              </h1>
              <p className="text-white/60">
                Review and manage products from the community
              </p>
            </div>
            
            {/* Search */}
            <form action="/admin/products" method="GET" className="flex gap-2">
              <input type="hidden" name="status" value={statusFilter} />
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                <Input
                  name="q"
                  type="text"
                  placeholder="Search products..."
                  defaultValue={searchQuery}
                  className="pl-10 w-64"
                />
              </div>
            </form>
          </div>
          
          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b border-white/10 pb-2">
            {tabs.map((tab) => (
              <Link
                key={tab.id}
                href={`/admin/products?status=${tab.id}${searchQuery ? `&q=${searchQuery}` : ''}`}
                className={`px-2 py-1 text-sm transition-colors ${
                  statusFilter === tab.id
                    ? 'text-cyan-400 border-b-2 border-cyan-400 -mb-[2px]'
                    : 'text-white/40 hover:text-white/60'
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>
          
          {/* Products Grid */}
          <div className="grid gap-4">
            {products && products.length > 0 ? (
              products.map((product) => {
                const creator = product.creator;
                const productTypeLabel = getProductTypeLabel(product.product_type);
                const hasMultiplePrices = (product.price_community && product.price_community > 0) ||
                                           (product.price_ally && product.price_ally > 0) ||
                                           (product.price_corporate && product.price_corporate > 0);
                
                return (
                  <Card key={product.id} className="p-4 hover:border-cyan-500/30 transition-all">
                    <div className="flex flex-wrap items-start gap-4">
                      {/* Preview */}
                      <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {product.preview_image ? (
                          <img src={product.preview_image} alt={product.title} className="w-full h-full object-cover" />
                        ) : (
                          <Package size={28} className="text-white/40" />
                        )}
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="text-white font-bold text-lg truncate">{product.title}</h3>
                          <Badge variant={product.is_published ? 'success' : 'outline'} size="sm">
                            {product.is_published ? 'Published' : 'Draft'}
                          </Badge>
                          <Badge variant="outline" size="sm" className="text-cyan-400">
                            {productTypeLabel}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-white/40 line-clamp-2 mb-2">
                          {product.description || 'No description provided'}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-xs">
                          {/* Creator */}
                          <div className="flex items-center gap-1">
                            {creator?.avatar_url ? (
                              <img src={creator.avatar_url} alt="" className="w-4 h-4 rounded-full" />
                            ) : (
                              <User size={12} className="text-white/40" />
                            )}
                            <span className="text-white/40">
                              by {creator?.display_name || creator?.username || 'Unknown'}
                            </span>
                          </div>
                          
                          {/* Pricing */}
                          <div className="flex items-center gap-2">
                            <span className="text-cyan-400 font-medium">
                              {hasMultiplePrices ? (
                                <>
                                  {product.price_community && <span className="text-green-400">ND: ${product.price_community}</span>}
                                  {product.price_ally && <span className="ml-1">Ally: ${product.price_ally}</span>}
                                </>
                              ) : (
                                formatPrice(product.price_ally)
                              )}
                            </span>
                          </div>
                          
                          {/* Residual */}
                          {product.residual_pool_percent && product.residual_pool_percent > 0 && (
                            <span className="text-purple-400">
                              {product.residual_pool_percent}% to contributors
                            </span>
                          )}
                          
                          {/* Date */}
                          <span className="text-white/30">
                            Created: {formatDate(product.created_at)}
                          </span>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex gap-2">
                        <Link href={`/products/${product.id}`} target="_blank">
                          <Button variant="ghost" size="sm" title="View Product">
                            <Eye size={14} />
                          </Button>
                        </Link>
                        <Link href={`/creator/products/${product.id}/edit`}>
                          <Button variant="ghost" size="sm" title="Edit Product">
                            <Edit size={14} />
                          </Button>
                        </Link>
                        {!product.is_published && (
                          <form action={`/api/admin/products/${product.id}/publish`} method="POST">
                            <Button type="submit" size="sm" className="bg-green-600 hover:bg-green-500">
                              <CheckCircle size={14} className="mr-1" />
                              Publish
                            </Button>
                          </form>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })
            ) : (
              <Card className="p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                  <Package size={32} className="text-white/20" />
                </div>
                <h3 className="text-white font-bold mb-2">No products found</h3>
                <p className="text-white/40 text-sm">
                  {searchQuery 
                    ? "Try a different search term." 
                    : statusFilter === 'pending' 
                      ? "No pending products need review."
                      : "No published products yet."}
                </p>
              </Card>
            )}
          </div>
        </div>
      </main>
    </Page>
  );
}