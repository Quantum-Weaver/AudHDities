// src/app/(marketplace)/creators/[username]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createServerSupabase } from '@/lib/supabase/server';
import { Page } from '@/components/layout/Page';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { MarkdownBio } from '@/components/profiles/MarkdownBio';
import { ArrowLeft, Package, Shield, Home, Award, Users, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface CreatorPageProps {
  params: { username: string };
}

export async function generateMetadata({ params }: CreatorPageProps): Promise<Metadata> {
  const supabase = await createServerSupabase();
  
  const { data: creator } = await supabase
    .from('profiles')
    .select(`
      display_name,
      username,
      creator_profiles!creator_profiles_id_fkey (
        creative_categories
      )
    `)
    .eq('username', params.username)
    .eq('is_creator', true)
    .maybeSingle();
  
  if (!creator) {
    return { title: 'Creator Not Found' };
  }
  
  return {
    title: `${creator.display_name || creator.username} | AUDHDITIES Creator`,
    description: `Explore creations from ${creator.display_name || creator.username}`,
  };
}

export default async function CreatorPage({ params }: CreatorPageProps) {
  const supabase = await createServerSupabase();
  const { username } = params;
  
  // Fetch creator profile using the same pattern as the API
  const { data: creator, error } = await supabase
    .from('profiles')
    .select(`
      id,
      username,
      display_name,
      avatar_url,
      banner_url,
      bio,
      created_at,
      is_creator,
      is_vendor,
      is_admin,
      user_tier,
      sovereignty_score,
      primary_house,
      creator_profiles!creator_profiles_id_fkey (
        verified_badge,
        verification_status,
        creative_categories,
        creative_description,
        portfolio_url,
        total_products,
        total_sales,
        total_earnings,
        default_residual_pool
      )
    `)
    .eq('username', username)
    .eq('is_creator', true)
    .maybeSingle();
  
  if (error || !creator) {
    notFound();
  }
  
  // Fetch creator's products
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('creator_id', creator.id)
    .eq('is_published', true)
    .eq('active', true)
    .order('created_at', { ascending: false })
    .limit(12);
  
  const creatorProfile = creator.creator_profiles;
  const hasProducts = products && products.length > 0;
  
  // Helper for house display
  const getHouseDisplay = (house: string | null) => {
    if (!house) return null;
    return house.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };
  
  return (
    <Page 
      variant={1}
      environment="marketplace"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen pb-20">
        
        {/* Back Button */}
        <div className="container max-w-7xl mx-auto px-6 pt-8">
          <Link href="/creators" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <ArrowLeft size={16} />
            <span>Back to Creators</span>
          </Link>
        </div>
        
        {/* Custom Creator Header (not using ProfileHeader to avoid type issues) */}
        <div className="relative mt-4">
          {/* Banner */}
          <div className="relative h-48 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-t-lg overflow-hidden">
            {creator.banner_url ? (
              <img 
                src={creator.banner_url} 
                alt="Banner" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/40">
                No banner
              </div>
            )}
          </div>

          {/* Avatar - positioned absolutely */}
          <div className="absolute -bottom-12 left-8 flex items-end gap-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-black bg-white/5">
                {creator.avatar_url ? (
                  <img 
                    src={creator.avatar_url} 
                    alt={creator.display_name || creator.username || 'Creator'} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-white/40">
                    {creator.display_name?.[0] || creator.username?.[0] || '?'}
                  </div>
                )}
              </div>
            </div>

            {/* Sovereignty Score Badge */}
            <div className="mb-2 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-cyan-500/30">
              <Shield size={14} className="text-cyan-400" />
              <span className="text-sm font-medium text-white">{creator.sovereignty_score || 0}</span>
              <span className="text-xs text-white/40">Sovereignty</span>
            </div>
          </div>

          {/* Profile Info Section */}
          <div className="pt-16 px-8 pb-6 border-b border-white/10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold text-white">
                    {creator.display_name || creator.username}
                  </h1>
                  {creatorProfile?.verified_badge && (
                    <CheckCircle size={20} className="text-green-400" />
                  )}
                </div>
                
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  {/* Username */}
                  <span className="text-white/40 text-sm">@{creator.username}</span>
                  
                  {/* Primary House */}
                  {creator.primary_house && (
                    <span className="flex items-center gap-1 px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs text-purple-400">
                      <Home size={12} />
                      House of {getHouseDisplay(creator.primary_house)}
                    </span>
                  )}
                  
                  {/* Creator Badge */}
                  <span className="px-2 py-0.5 bg-green-500/20 border border-green-500/30 rounded-full text-xs text-green-400">
                    Creator
                  </span>
                </div>
              </div>

              {/* User Tier */}
              <div className="text-right">
                <span className={`
                  px-3 py-1 rounded-full text-xs font-medium
                  ${creator.user_tier === 'community' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : ''}
                  ${creator.user_tier === 'ally' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : ''}
                  ${creator.user_tier === 'corporate' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : ''}
                `}>
                  {creator.user_tier?.toUpperCase() || 'COMMUNITY'}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Creator Content */}
        <div className="container max-w-7xl mx-auto px-6 mt-8">
          
          {/* Creative Description */}
          {creatorProfile?.creative_description && (
            <Card className="p-6 mb-8">
              <h2 className="text-xl font-bold text-white mb-4">About</h2>
              <div className="prose prose-invert max-w-none">
                <MarkdownBio content={creatorProfile.creative_description} />
              </div>
            </Card>
          )}
          
          {/* Products Section */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                Products by {creator.display_name || creator.username}
              </h2>
              <span className="text-white/40 text-sm">
                {creatorProfile?.total_products || 0} products
              </span>
            </div>
            
            {hasProducts ? (
              <ProductGrid
                products={products}
                variant="marketplace"
                showFilters={false}
                showSearch={false}
                showViewToggle={true}
              />
            ) : (
              <Card className="p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                  <Package size={32} className="text-white/20" />
                </div>
                <h3 className="text-white font-bold mb-2">No products yet</h3>
                <p className="text-white/40 text-sm">
                  {creator.display_name || creator.username} hasn't added any products yet. Check back soon!
                </p>
              </Card>
            )}
          </section>
          
          {/* Creator Stats */}
          <Card className="p-6 mt-8">
            <h2 className="text-xl font-bold text-white mb-4">Creator Stats</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">{creatorProfile?.total_products || 0}</div>
                <div className="text-sm text-white/40">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{creatorProfile?.total_sales || 0}</div>
                <div className="text-sm text-white/40">Sales</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">${creatorProfile?.total_earnings || 0}</div>
                <div className="text-sm text-white/40">Earnings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-400">{creatorProfile?.default_residual_pool || 30}%</div>
                <div className="text-sm text-white/40">Residual Pool</div>
              </div>
            </div>
          </Card>
          
          {/* Portfolio Link */}
          {creatorProfile?.portfolio_url && (
            <div className="mt-6 text-center">
              <a 
                href={creatorProfile.portfolio_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cyan-400 hover:underline"
              >
                Visit Portfolio
                <ArrowLeft size={14} className="rotate-180" />
              </a>
            </div>
          )}
        </div>
      </main>
    </Page>
  );
}