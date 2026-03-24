// src/app/(dashboard)/creator/products/[id]/page.tsx
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
  Clock, 
  Star,
  Heart,
  Share2,
  Eye,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { MarkdownBio } from '@/components/profiles/MarkdownBio';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const supabase = await createServerSupabase();
  
  const { data: product } = await supabase
    .from('products')
    .select('title, description')
    .eq('id', params.id)
    .single();

  return {
    title: product?.title ? `${product.title} | AUDHDITIES` : 'Product | AUDHDITIES',
    description: product?.description || 'View product details',
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

// Helper to get valid prices array (filtering out null/zero)
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
  digital_course: { label: 'Digital Course', icon: <Package size={16} />, color: 'cyan' },
  digital_download: { label: 'Digital Download', icon: <Package size={16} />, color: 'cyan' },
  physical_product: { label: 'Physical Product', icon: <Package size={16} />, color: 'purple' },
  clothing: { label: 'Clothing', icon: <Package size={16} />, color: 'pink' },
  accessory: { label: 'Accessory', icon: <Package size={16} />, color: 'pink' },
  audio: { label: 'Audio', icon: <Package size={16} />, color: 'cyan' },
  music: { label: 'Music', icon: <Package size={16} />, color: 'cyan' },
  video: { label: 'Video', icon: <Package size={16} />, color: 'purple' },
  consultation: { label: 'Consultation', icon: <Users size={16} />, color: 'green' },
  service: { label: 'Service', icon: <Users size={16} />, color: 'green' },
  mutual_aid: { label: 'Mutual Aid', icon: <Heart size={16} />, color: 'pink' },
  donation: { label: 'Donation', icon: <Heart size={16} />, color: 'pink' },
  tip: { label: 'Tip', icon: <Heart size={16} />, color: 'pink' },
};

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const supabase = await createServerSupabase();
  
  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  
  // Fetch product with creator info
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
      )
    `)
    .eq('id', params.id)
    .single();

  if (error || !product) {
    notFound();
  }

  // Check if current user is the creator
  const isCreator = user?.id === product.creator_id;

  // If product is not published and user is not creator, redirect
  if (!product.is_published && !isCreator) {
    redirect('/');
  }

  // Fetch creator profile for stats
  const { data: creatorProfile } = await supabase
    .from('creator_profiles')
    .select('verified_badge, total_products, total_sales')
    .eq('id', product.creator_id)
    .single();

  // Fetch contributors
  const { data: contributors } = await supabase
    .from('contributions')
    .select(`
      *,
      contributor:profiles!contributions_contributor_id_fkey (
        id,
        username,
        display_name,
        avatar_url
      )
    `)
    .eq('product_id', product.id)
    .order('percent_share', { ascending: false });

  // Calculate price information using helper function
  const validPrices = getValidPrices(product);
  const hasAnyPrice = validPrices.length > 0;
  const lowestPrice = hasAnyPrice ? Math.min(...validPrices) : null;
  const highestPrice = hasAnyPrice ? Math.max(...validPrices) : null;
  const hasPriceRange = hasAnyPrice && lowestPrice !== highestPrice;
  
  // Individual price flags for display
  const hasCommunityPrice = product.price_community !== null && product.price_community > 0;
  const hasAllyPrice = product.price_ally !== null && product.price_ally > 0;
  const hasCorporatePrice = product.price_corporate !== null && product.price_corporate > 0;

  const productInfo = productTypeInfo[product.product_type] || { 
    label: 'Product', 
    icon: <Package size={16} />, 
    color: 'white' 
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
              href={isCreator ? '/creator/products' : '/'}
              className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={18} />
              {isCreator ? 'Back to Products' : 'Back to Marketplace'}
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
                        Published
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
                
                {/* Creator Actions */}
                {isCreator && (
                  <div className="flex gap-2">
                    <Link href={`/creator/products/${product.id}/edit`}>
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

                {/* Residual Info */}
                {product.residual_pool_percent && product.residual_pool_percent > 0 && (
                  <Card className="p-6">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Star size={20} className="text-pink-400" />
                      Residual Sharing
                    </h2>
                    <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white/60">Contributor Pool</span>
                        <span className="text-2xl font-bold text-pink-400">
                          {product.residual_pool_percent}%
                        </span>
                      </div>
                      <p className="text-white/40 text-sm">
                        {product.residual_pool_percent}% of creator earnings are shared with contributors who helped create this product
                      </p>
                    </div>
                  </Card>
                )}

                {/* Contributors Section */}
                {contributors && contributors.length > 0 && (
                  <Card className="p-6">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Users size={20} className="text-green-400" />
                      Contributors
                    </h2>
                    <div className="space-y-3">
                      {contributors.map((contrib) => (
                        <div key={contrib.id} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                              <span className="text-xs text-white">
                                {contrib.contributor?.display_name?.[0] || contrib.contributor?.username?.[0] || '?'}
                              </span>
                            </div>
                            <div>
                              <p className="text-white font-medium">
                                {contrib.contributor?.display_name || contrib.contributor?.username || 'Anonymous'}
                              </p>
                              <p className="text-xs text-white/40">
                                {contrib.contribution_type?.replace('_', ' ')} • {contrib.percent_share}% share
                              </p>
                            </div>
                          </div>
                          <Badge variant="outline" size="sm">
                            {contrib.is_residual_eligible ? 'Residual Eligible' : 'One-time'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </div>

              {/* Right Column - Creator Info & Actions */}
              <div className="space-y-6">
                
                {/* Creator Card */}
                <Card className="p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-3">
                    {product.creator?.avatar_url ? (
                      <img 
                        src={product.creator.avatar_url} 
                        alt={product.creator.display_name || product.creator.username || 'Creator'}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <span className="text-2xl text-white">
                        {product.creator?.display_name?.[0] || product.creator?.username?.[0] || '?'}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-bold text-white">
                    {product.creator?.display_name || product.creator?.username || 'Anonymous Creator'}
                  </h3>
                  
                  {creatorProfile?.verified_badge && (
                    <Badge variant="success" className="mt-1 inline-flex items-center gap-1">
                      <CheckCircle size={12} />
                      Verified Creator
                    </Badge>
                  )}
                  
                  {product.creator?.bio && (
                    <p className="text-white/60 text-sm mt-3 line-clamp-3">
                      {product.creator.bio}
                    </p>
                  )}
                  
                  <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/10">
                    <div>
                      <div className="text-lg font-bold text-white">{creatorProfile?.total_products || 0}</div>
                      <div className="text-xs text-white/40">Products</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">{creatorProfile?.total_sales || 0}</div>
                      <div className="text-xs text-white/40">Sales</div>
                    </div>
                  </div>
                  
                  <Link href={`/creators/${product.creator?.username || product.creator_id}`}>
                    <Button variant="outline" className="w-full mt-4">
                      View Creator Profile
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
                      <span className="text-white/40">Created</span>
                      <span className="text-white/60">
                        {new Date(product.created_at || '').toLocaleDateString()}
                      </span>
                    </div>
                    {product.updated_at !== product.created_at && (
                      <div className="flex justify-between">
                        <span className="text-white/40">Updated</span>
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