// src/app/(marketplace)/marketplace/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { createServerSupabase } from '@/lib/supabase/server';
import { Page } from '@/components/layout/Page';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { 
  Sparkles, 
  Palette, 
  Truck, 
  Heart, 
  ArrowRight, 
  Star, 
  Users,
  Package,
  TrendingUp,
  Music,
  BookOpen,
  Store
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'AUDHDITIES | Sovereign Sanctuary for Neurodivergent Creators',
  description: 'A sanctuary where creators thrive, value circulates, and every contribution matters forever.',
};

export default async function MarketplacePage() {
  const supabase = await createServerSupabase();
  
  // Fetch featured products (published, with preview images, limit 8)
  const { data: featuredProducts } = await supabase
    .from('products')
    .select('*')
    .eq('is_published', true)
    .eq('active', true)
    .not('preview_image', 'is', null)
    .order('created_at', { ascending: false })
    .limit(8);

  // Fetch recent products
  const { data: recentProducts } = await supabase
    .from('products')
    .select('*')
    .eq('is_published', true)
    .eq('active', true)
    .order('created_at', { ascending: false })
    .limit(12);

  // Fetch featured creators (verified creators with products)
  const { data: featuredCreators } = await supabase
    .from('profiles')
    .select(`
      id,
      username,
      display_name,
      avatar_url,
      creator_profiles!inner (
        verified_badge,
        creative_categories,
        total_products,
        total_sales
      )
    `)
    .eq('is_creator', true)
    .not('creator_profiles.verified_badge', 'is', null)
    .limit(6);

  // Fetch product categories with counts
  const { data: categoryCounts } = await supabase
    .from('products')
    .select('product_type')
    .eq('is_published', true)
    .eq('active', true);

  const categoryStats = (categoryCounts || []).reduce((acc, product) => {
    const type = product.product_type;
    if (type) {
      acc[type] = (acc[type] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const topCategories = Object.entries(categoryStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  const categoryNames: Record<string, { label: string; icon: React.ReactNode }> = {
    digital_course: { label: 'Courses', icon: <BookOpen size={16} /> },
    digital_download: { label: 'Digital', icon: <Sparkles size={16} /> },
    physical_product: { label: 'Physical', icon: <Package size={16} /> },
    clothing: { label: 'Clothing', icon: <Palette size={16} /> },
    accessory: { label: 'Accessories', icon: <Sparkles size={16} /> },
    audio: { label: 'Audio', icon: <Music size={16} /> },
    music: { label: 'Music', icon: <Music size={16} /> },
    video: { label: 'Video', icon: <Sparkles size={16} /> },
    consultation: { label: 'Consulting', icon: <Users size={16} /> },
    service: { label: 'Services', icon: <Truck size={16} /> },
    mutual_aid: { label: 'Mutual Aid', icon: <Heart size={16} /> },
    donation: { label: 'Donations', icon: <Heart size={16} /> },
  };

  const stats = [
    { label: 'Creators', value: '50+', icon: Palette, color: 'cyan' },
    { label: 'Products', value: '200+', icon: Package, color: 'purple' },
    { label: 'Contributors', value: '500+', icon: Users, color: 'pink' },
    { label: 'Value Distributed', value: '$25K+', icon: TrendingUp, color: 'green' },
  ];

  return (
    <Page 
      variant={1}
      environment="marketplace"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen">
        
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10" />
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-700" />
          
          <div className="relative z-10 container max-w-6xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <Sparkles size={14} className="text-cyan-400" />
              <span className="text-sm text-white/80">Sovereign Sanctuary</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Where Creators{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Thrive
              </span>
            </h1>
            
            <p className="text-xl text-white/70 mx-auto mb-8">
              A sanctuary where value circulates, contributions matter forever, 
              and every creator is honored.
            </p>           
            
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 border-y border-white/10">
          <div className="container max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <div key={stat.label} className="text-center">
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-${stat.color}-500/20 flex items-center justify-center`}>
                    <stat.icon className={`text-${stat.color}-400`} size={24} />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/40">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        {featuredProducts && featuredProducts.length > 0 && (
          <section className="py-20">
            <div className="container max-w-6xl mx-auto px-6">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Featured Creations
                  </h2>
                  <p className="text-white/60">
                    Hand-picked products from our community
                  </p>
                </div>
                <Link href="/products" className="text-cyan-400 hover:underline flex items-center gap-1">
                  View all <ArrowRight size={16} />
                </Link>
              </div>
              
              <ProductGrid
                products={featuredProducts}
                variant="marketplace"
                showFilters={false}
                showSearch={false}
                showViewToggle={false}
              />
            </div>
          </section>
        )}

        {/* Categories Section */}
        <section className="py-20 bg-white/5">
          <div className="container max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Browse by Category
              </h2>
              <p className="text-white/60">
                Discover creations that speak to you
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {topCategories.map(([type, count]) => {
                const category = categoryNames[type] || { label: type.replace(/_/g, ' '), icon: <Package size={16} /> };
                return (
                  <Link
                    key={type}
                    href={`/products?category=${type}`}
                    className="group bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-all hover:scale-[1.02]"
                  >
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {category.icon}
                    </div>
                    <h3 className="text-white font-medium capitalize">
                      {category.label}
                    </h3>
                    <p className="text-xs text-white/40 mt-1">{count} products</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Recent Products */}
        {recentProducts && recentProducts.length > 0 && (
          <section className="py-20">
            <div className="container max-w-6xl mx-auto px-6">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    New Arrivals
                  </h2>
                  <p className="text-white/60">
                    Fresh creations from the sanctuary
                  </p>
                </div>
                <Link href="/products" className="text-cyan-400 hover:underline flex items-center gap-1">
                  View all <ArrowRight size={16} />
                </Link>
              </div>
              
              <ProductGrid
                products={recentProducts.slice(0, 8)}
                variant="marketplace"
                showFilters={false}
                showSearch={false}
                showViewToggle={false}
              />
            </div>
          </section>
        )}

        {/* Featured Creators */}
        {featuredCreators && featuredCreators.length > 0 && (
          <section className="py-20 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5">
            <div className="container max-w-6xl mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Meet Our Creators
                </h2>
                <p className="text-white/60">
                  The hearts and minds behind the sanctuary
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {featuredCreators.map((creator) => (
                  <Link
                    key={creator.id}
                    href={`/creators/${creator.username || creator.id}`}
                    className="group bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all hover:scale-[1.02]"
                  >
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center overflow-hidden">
                      {creator.avatar_url ? (
                        <img 
                          src={creator.avatar_url} 
                          alt={creator.display_name || creator.username || 'Creator'}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Palette size={32} className="text-white/40" />
                      )}
                    </div>
                    <h3 className="text-white font-bold text-lg">
                      {creator.display_name || creator.username}
                    </h3>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      {creator.creator_profiles?.verified_badge && (
                        <span className="inline-flex items-center gap-1 text-xs text-green-400">
                          <Star size={12} /> Verified
                        </span>
                      )}
                      <span className="text-xs text-white/40">
                        {creator.creator_profiles?.total_products || 0} products
                      </span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-4 w-full group-hover:bg-cyan-500/20 group-hover:border-cyan-500/30"
                    >
                      View Profile
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className="py-20">
          <div className="container max-w-4xl mx-auto px-6 text-center">
            <Card className="p-12 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 border-white/20">
              <Heart className="text-pink-400 mx-auto mb-4" size={48} />
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Share Your Gifts?
              </h2>
              <p className="text-white/60 mx-auto mb-8">
                Join a community where your creativity is valued, 
                your contributions earn forever, and you're never alone.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/questionnaire">
                  <Button size="lg" className="gap-2">
                    Take the Acid Test <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link href="/learn">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </section>
      </main>
    </Page>
  );
}