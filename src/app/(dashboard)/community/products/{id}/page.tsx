// src/app/(dashboard)/community/products/[id]/page.tsx
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
  Package, 
  DollarSign, 
  Users, 
  Star,
  Heart,
  Share2,
  Shield,
  CheckCircle,
  AlertCircle,
  MessageCircle
} from 'lucide-react';

interface CommunityProductPageProps {
  params: Promise<{ id: string }> | { id: string };
}

export async function generateMetadata({ params }: CommunityProductPageProps): Promise<Metadata> {
  const { id } = params;
  const supabase = await createServerSupabase();
  
  const { data: product } = await supabase
    .from('products')
    .select('title, description')
    .eq('id', id)
    .single();

  return {
    title: product?.title ? `${product.title} | Community | AUDHDITIES` : 'Product | AUDHDITIES',
    description: product?.description || 'View community product details',
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
  mutual_aid: { label: 'Mutual Aid', icon: <Heart size={16} />, color: 'pink' },
  crowdfunding: { label: 'Crowdfunding', icon: <Users size={16} />, color: 'cyan' },
  donation: { label: 'Donation', icon: <Heart size={16} />, color: 'pink' },
  tip: { label: 'Tip', icon: <Heart size={16} />, color: 'pink' },
  workshop: { label: 'Workshop', icon: <Users size={16} />, color: 'purple' },
  class: { label: 'Class', icon: <Users size={16} />, color: 'purple' },
  event_virtual: { label: 'Virtual Event', icon: <Users size={16} />, color: 'cyan' },
  event_live: { label: 'Live Event', icon: <Users size={16} />, color: 'cyan' },
};

export default async function CommunityProductDetailPage({ params }: CommunityProductPageProps) {
  const { id } = params;
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
      ),
      community:community_profiles!community_profiles_id_fkey (
        nd_identity,
        is_mentor,
        peer_endorsements
      )
    `)
    .eq('id', id)
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

  // Fetch creator community profile
  const { data: communityProfile } = await supabase
    .from('community_profiles')
    .select('nd_identity, is_mentor, peer_endorsements')
    .eq('id', product.creator_id)
    .single();

  // Calculate price information with null safety
  const validPrices = getValidPrices(product);
  const hasAnyPrice = validPrices.length > 0;
  const lowestPrice = hasAnyPrice ? Math.min(...validPrices) : null;
  const highestPrice = hasAnyPrice ? Math.max(...validPrices) : null;
  const hasPriceRange = hasAnyPrice && lowestPrice !== highestPrice;
  
  const hasCommunityPrice = product.price_community !== null && product.price_community > 0;
  const hasAllyPrice = product.price_ally !== null && product.price_ally > 0;
  const hasCorporatePrice = product.price_corporate !== null && product.price_corporate > 0;

  const productInfo = productTypeInfo[product.product_type] || { 
    label: 'Community Resource', 
    icon: <Shield size={16} />, 
    color: 'cyan' 
  };
  
  // Safe values with defaults
  const creatorName = product.creator?.display_name ?? product.creator?.username ?? 'Community Member';
  const creatorAvatar = product.creator?.avatar_url ?? null;
  const creatorBio = product.creator?.bio ?? null;
  const creatorUsername = product.creator?.username ?? null;
  const creatorId = product.creator?.id ?? product.creator_id;
  const communityMentor = communityProfile?.is_mentor ?? false;
  const communityEndorsements = communityProfile?.peer_endorsements ?? 0;
  const communityNDIdentity = communityProfile?.nd_identity ?? [];

  return (
    <AuthGuard>
      <Page 
        variant={1}
        environment="community"
        showForeground={false}
        animated={true}
        showContinuityBeam={true}
      >
        <main className="min-h-screen py-12 px-6">
          <div className="container max-w-5xl mx-auto">
            
            {/* Back Button */}
            <Link
              href="/community"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={18} />
              Back to Community
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
                        Active
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
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Left Column - Product Details */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Community Note */}
                <Card className="p-6 bg-gradient-to-r from-cyan-500/10 to-pink-500/10 border-cyan-500/30">
                  <div className="flex items-start gap-3">
                    <Shield size={20} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white/80 text-sm">
                        This is a community-driven resource. 100% of proceeds go directly to the community member who created it.
                        Mutual aid and community support are at the heart of our sanctuary.
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Pricing Card */}
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <DollarSign size={20} className="text-cyan-400" />
                    Contribution
                  </h2>
                  
                  <div className="space-y-3">
                    {hasCommunityPrice && (
                      <div className="flex justify-between items-center p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                        <div>
                          <span className="text-white font-medium">Community Rate</span>
                          <p className="text-xs text-white/40">For community members</p>
                        </div>
                        <span className="text-2xl font-bold text-cyan-400">
                          {formatPrice(product.price_community)}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <div>
                        <span className="text-white font-medium">Ally Contribution</span>
                        <p className="text-xs text-white/40">For supportive allies</p>
                      </div>
                      <span className="text-2xl font-bold text-purple-400">
                        {formatPrice(product.price_ally)}
                      </span>
                    </div>
                    
                    {hasCorporatePrice && (
                      <div className="flex justify-between items-center p-3 bg-pink-500/10 rounded-lg border border-pink-500/20">
                        <div>
                          <span className="text-white font-medium">Corporate Support</span>
                          <p className="text-xs text-white/40">For businesses and organizations</p>
                        </div>
                        <span className="text-2xl font-bold text-pink-400">
                          {formatPrice(product.price_corporate)}
                        </span>
                      </div>
                    )}
                    
                    {hasPriceRange && (
                      <p className="text-xs text-white/40 mt-2">
                        * Contribution amount determined by your Acid Test tier
                      </p>
                    )}
                    
                    {!hasAnyPrice && (
                      <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                        <div>
                          <span className="text-white font-medium">Pay What You Want</span>
                          <p className="text-xs text-white/40">Support at your capacity</p>
                        </div>
                        <span className="text-2xl font-bold text-green-400">Free / PWYW</span>
                      </div>
                    )}
                  </div>
                </Card>

                {/* Community Impact */}
                {product.residual_pool_percent && product.residual_pool_percent > 0 && (
                  <Card className="p-6">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Star size={20} className="text-pink-400" />
                      Community Impact
                    </h2>
                    <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white/60">Community Share</span>
                        <span className="text-2xl font-bold text-pink-400">
                          {product.residual_pool_percent}%
                        </span>
                      </div>
                      <p className="text-white/40 text-sm">
                        {product.residual_pool_percent}% of contributions go to community mutual aid funds, supporting other community members in need.
                      </p>
                    </div>
                  </Card>
                )}

                {/* Tags */}
                {product.tags && product.tags.length > 0 && (
                  <Card className="p-6">
                    <h2 className="text-xl font-bold text-white mb-4">Tags</h2>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag: string) => (
                        <Badge key={tag} variant="outline">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                )}
              </div>

              {/* Right Column - Creator Info & Actions */}
              <div className="space-y-6">
                
                {/* Creator Card */}
                <Card className="p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-pink-500/20 flex items-center justify-center mx-auto mb-3">
                    {creatorAvatar ? (
                      <img 
                        src={creatorAvatar} 
                        alt={creatorName}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <span className="text-2xl text-white">
                        {creatorName[0] || '?'}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-bold text-white">
                    {creatorName}
                  </h3>
                  
                  {communityMentor && (
                    <Badge variant="success" className="mt-1 inline-flex items-center gap-1">
                      <Shield size={12} />
                      Community Mentor
                    </Badge>
                  )}
                  
                  {communityNDIdentity.length > 0 && (
                    <div className="flex flex-wrap gap-1 justify-center mt-2">
                      {communityNDIdentity.slice(0, 2).map((identity: string) => (
                        <Badge key={identity} variant="outline" size="sm">
                          {identity}
                        </Badge>
                      ))}
                      {communityNDIdentity.length > 2 && (
                        <Badge variant="outline" size="sm">+{communityNDIdentity.length - 2}</Badge>
                      )}
                    </div>
                  )}
                  
                  {creatorBio && (
                    <p className="text-white/60 text-sm mt-3 line-clamp-3">
                      {creatorBio}
                    </p>
                  )}
                  
                  <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/10">
                    <div>
                      <div className="text-lg font-bold text-white">{communityEndorsements}</div>
                      <div className="text-xs text-white/40">Endorsements</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">
                        {communityMentor ? 'Mentor' : 'Member'}
                      </div>
                      <div className="text-xs text-white/40">Status</div>
                    </div>
                  </div>
                  
                  <Link href={`/community/${creatorUsername || creatorId}`}>
                    <Button variant="outline" className="w-full mt-4">
                      View Community Profile
                    </Button>
                  </Link>
                </Card>

                {/* Action Buttons */}
                <Card className="p-6">
                  <h3 className="text-white font-bold mb-4">Actions</h3>
                  <div className="space-y-2">
                    <Button className="w-full">
                      Support This Resource
                    </Button>
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                      <MessageCircle size={16} />
                      Ask a Question
                    </Button>
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                      <Share2 size={16} />
                      Share with Community
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
                        {product.created_at ? new Date(product.created_at).toLocaleDateString() : 'Unknown'}
                      </span>
                    </div>
                    {product.updated_at && product.updated_at !== product.created_at && (
                      <div className="flex justify-between">
                        <span className="text-white/40">Updated</span>
                        <span className="text-white/60">
                          {new Date(product.updated_at).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-white/40">Resource ID</span>
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