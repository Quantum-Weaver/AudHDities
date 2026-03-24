// src/app/(dashboard)/vendor/products/[id]/page.tsx
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { createServerSupabase } from '@/lib/supabase/server';
import AuthGuard from '@/components/auth/AuthGuard';
import { Page } from '@/components/layout/Page';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  ArrowLeft, 
  Edit, 
  Package, 
  DollarSign, 
  Users, 
  Star,
  Heart,
  Share2,
  Truck,
  CheckCircle,
  AlertCircle,
  Store
} from 'lucide-react';
import type { Database } from '@/types/supabase/database.types';

export type VendorProfile = Database['public']['Tables']['vendor_profiles']['Row'];

interface VendorProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: VendorProductPageProps): Promise<Metadata> {
  const supabase = await createServerSupabase();
  
  const { data: product } = await supabase
    .from('products')
    .select('title, description')
    .eq('id', params.id)
    .single();

  return {
    title: product?.title ? `${product.title} | Vendor | AUDHDITIES` : 'Product | AUDHDITIES',
    description: product?.description || 'View vendor product details',
  };
}

// Helper to format price
const formatPrice = (price: number | null) => {
  if (price === null || price === 0) return null;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(price);
};

// Helper to get valid prices array
const getValidPrices = (product: any): number[] => {
  const prices: number[] = [];
  
  if (product.price_community !== null && product.price_community > 0) {
    prices.push(product.price_community);
  }
  if (product.price_ally !== null && product.price_ally > 0) {
    prices.push(product.price_ally);
  }
  if (product.price_corporate !== null && product.price_corporate > 0) {
    prices.push(product.price_corporate);
  }
  
  return prices;
};

// Product type labels and icons
const productTypeInfo: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  physical_product: { label: 'Physical Product', icon: <Package size={16} />, color: 'purple' },
  clothing: { label: 'Clothing', icon: <Package size={16} />, color: 'pink' },
  accessory: { label: 'Accessory', icon: <Package size={16} />, color: 'pink' },
  bundle: { label: 'Bundle', icon: <Package size={16} />, color: 'cyan' },
  kit: { label: 'Kit', icon: <Package size={16} />, color: 'cyan' },
  subscription_box: { label: 'Subscription Box', icon: <Package size={16} />, color: 'purple' },
  fabric: { label: 'Fabric', icon: <Package size={16} />, color: 'cyan' },
  pattern: { label: 'Pattern', icon: <Package size={16} />, color: 'cyan' },
};

export default async function VendorProductDetailPage({ params }: VendorProductPageProps) {
  const supabase = await createServerSupabase();
  
  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  
  // Fetch product with vendor info
  const { data: product, error } = await supabase
    .from('products')
    .select(`
      *,
      creator:profiles!products_creator_id_fkey (
        id,
        username,
        display_name,
        avatar_url,
        bio
      ),
      vendor:vendor_profiles!vendor_profiles_id_fkey (
        business_name,
        business_description,
        business_logo_url,
        verified_badge,
        product_categories
      )
    `)
    .eq('id', params.id)
    .single();

  if (error || !product) {
    notFound();
  }

  // Check if current user is the vendor
  const isVendor = user?.id === product.creator_id;

  // If product is not published and user is not vendor, redirect
  if (!product.is_published && !isVendor) {
    redirect('/');
  }

  // Fetch vendor profile stats
  const { data: vendorProfile } = await supabase
    .from('vendor_profiles')
    .select('verified_badge, total_products, total_sales, business_name, business_description, business_logo_url')
    .eq('id', product.creator_id)
    .single();

  // Calculate price information
  const validPrices = getValidPrices(product);
  const hasAnyPrice = validPrices.length > 0;
  const lowestPrice = hasAnyPrice ? Math.min(...validPrices) : null;
  const highestPrice = hasAnyPrice ? Math.max(...validPrices) : null;
  const hasPriceRange = hasAnyPrice && lowestPrice !== highestPrice;
  
  const hasCommunityPrice = product.price_community !== null && product.price_community > 0;
  const hasAllyPrice = product.price_ally !== null && product.price_ally > 0;
  const hasCorporatePrice = product.price_corporate !== null && product.price_corporate > 0;

  const productInfo = productTypeInfo[product.product_type] || { 
    label: 'Vendor Product', 
    icon: <Truck size={16} />, 
    color: 'purple' 
  };

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
          <div className="container max-w-5xl mx-auto">
            
            {/* Back Button */}
            <Link
              href={isVendor ? '/vendor/products' : '/'}
              className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={18} />
              {isVendor ? 'Back to Vendor Products' : 'Back to Marketplace'}
            </Link>

            {/* Product Header */}
            <div className="mb-8">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className={`bg-${productInfo.color}-500/20 text-${productInfo.color}-400 border-${productInfo.color}-500/30`}>
                      {productInfo.icon}
                      <span className="ml-1">{productInfo.label}</span>
                    </Badge>
                    {product.is_published ? (
                      <Badge variant="success" className="bg-green-500/20 text-green-400 border-green-500/30">
                        <CheckCircle size={12} className="mr-1" />
                        Available
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-yellow-400 border-yellow-500/30">
                        <AlertCircle size={12} className="mr-1" />
                        Draft
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {product.title}
                  </h1>
                  <p className="text-white/60 text-lg max-w-2xl">
                    {product.description}
                  </p>
                </div>
                
                {/* Vendor Actions */}
                {isVendor && (
                  <div className="flex gap-2">
                    <Link href={`/vendor/products/${product.id}/edit`}>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Edit size={16} />
                        Edit
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Left Column - Product Details */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Vendor Note */}
                <Card className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30">
                  <div className="flex items-start gap-3">
                    <Store size={20} className="text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white/80 text-sm">
                        This item is sold and shipped by <span className="text-purple-400 font-medium">{vendorProfile?.business_name || 'our vendor partner'}</span>.
                        All transactions are protected by the Sanctuary's transparent ledger.
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Pricing Card */}
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <DollarSign size={20} className="text-cyan-400" />
                    Pricing
                  </h2>
                  
                  <div className="space-y-3">
                    {hasCommunityPrice && (
                      <div className="flex justify-between items-center p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                        <div>
                          <span className="text-white font-medium">Community Tier</span>
                          <p className="text-xs text-white/40">For neurodivergent community members</p>
                        </div>
                        <span className="text-2xl font-bold text-cyan-400">
                          {formatPrice(product.price_community)}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <div>
                        <span className="text-white font-medium">Ally Tier</span>
                        <p className="text-xs text-white/40">For supportive allies</p>
                      </div>
                      <span className="text-2xl font-bold text-purple-400">
                        {formatPrice(product.price_ally)}
                      </span>
                    </div>
                    
                    {hasCorporatePrice && (
                      <div className="flex justify-between items-center p-3 bg-pink-500/10 rounded-lg border border-pink-500/20">
                        <div>
                          <span className="text-white font-medium">Corporate Tier</span>
                          <p className="text-xs text-white/40">For businesses and organizations</p>
                        </div>
                        <span className="text-2xl font-bold text-pink-400">
                          {formatPrice(product.price_corporate)}
                        </span>
                      </div>
                    )}
                    
                    {hasPriceRange && (
                      <p className="text-xs text-white/40 mt-2">
                        * Price determined by your Acid Test tier
                      </p>
                    )}
                    
                    {!hasAnyPrice && (
                      <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                        <div>
                          <span className="text-white font-medium">Pay What You Want</span>
                          <p className="text-xs text-white/40">Name your own price</p>
                        </div>
                        <span className="text-2xl font-bold text-green-400">Free / PWYW</span>
                      </div>
                    )}
                  </div>
                </Card>

                {/* Shipping Info (for physical products) */}
                {['physical_product', 'clothing', 'accessory', 'bundle', 'kit', 'subscription_box'].includes(product.product_type) && (
                  <Card className="p-6">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Truck size={20} className="text-cyan-400" />
                      Shipping
                    </h2>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                        <span className="text-white/60">Processing Time</span>
                        <span className="text-white">3-5 business days</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                        <span className="text-white/60">Shipping From</span>
                        <span className="text-white">United States</span>
                      </div>
                      <p className="text-xs text-white/40 mt-2">
                        Shipping costs calculated at checkout. International shipping available.
                      </p>
                    </div>
                  </Card>
                )}

                {/* Categories */}
                {product.category && product.category.length > 0 && (
                  <Card className="p-6">
                    <h2 className="text-xl font-bold text-white mb-4">Categories</h2>
                    <div className="flex flex-wrap gap-2">
                      {product.category.map((cat: string) => (
                        <Badge key={cat} variant="outline">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                )}
              </div>

              {/* Right Column - Vendor Info & Actions */}
              <div className="space-y-6">
                
                {/* Vendor Card */}
                <Card className="p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mx-auto mb-3">
                    {vendorProfile?.business_logo_url ? (
                      <img 
                        src={vendorProfile.business_logo_url} 
                        alt={vendorProfile.business_name || 'Vendor'}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <Store size={32} className="text-purple-400" />
                    )}
                  </div>
                  
                  <h3 className="text-lg font-bold text-white">
                    {vendorProfile?.business_name || product.creator?.display_name || 'Vendor'}
                  </h3>
                  
                  {vendorProfile?.verified_badge && (
                    <Badge variant="success" className="mt-1 inline-flex items-center gap-1">
                      <CheckCircle size={12} />
                      Verified Vendor
                    </Badge>
                  )}
                  
                  {vendorProfile?.business_description && (
                    <p className="text-white/60 text-sm mt-3 line-clamp-3">
                      {vendorProfile.business_description}
                    </p>
                  )}
                  
                  <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/10">
                    <div>
                      <div className="text-lg font-bold text-white">{vendorProfile?.total_products || 0}</div>
                      <div className="text-xs text-white/40">Products</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">{vendorProfile?.total_sales || 0}</div>
                      <div className="text-xs text-white/40">Sales</div>
                    </div>
                  </div>
                  
                  <Link href={`/vendors/${product.creator?.username || product.creator_id}`}>
                    <Button variant="outline" className="w-full mt-4">
                      View Vendor Profile
                    </Button>
                  </Link>
                </Card>

                {/* Action Buttons */}
                <Card className="p-6">
                  <h3 className="text-white font-bold mb-4">Actions</h3>
                  <div className="space-y-2">
                    <Button className="w-full">
                      Purchase Now
                    </Button>
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                      <Heart size={16} />
                      Save to Wishlist
                    </Button>
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                      <Share2 size={16} />
                      Share Product
                    </Button>
                  </div>
                </Card>

                {/* Product Meta */}
                <Card className="p-6">
                  <h3 className="text-white font-bold mb-4">Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/40">Available Since</span>
                      <span className="text-white/60">
                        {new Date(product.created_at || '').toLocaleDateString()}
                      </span>
                    </div>
                    {product.updated_at !== product.created_at && (
                      <div className="flex justify-between">
                        <span className="text-white/40">Last Updated</span>
                        <span className="text-white/60">
                          {new Date(product.updated_at || '').toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-white/40">Product ID</span>
                      <span className="text-white/60 font-mono text-xs">{product.id.slice(0, 8)}</span>
                    </div>
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