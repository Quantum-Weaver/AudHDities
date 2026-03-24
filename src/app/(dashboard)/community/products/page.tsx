// src/app/(dashboard)/community/products/page.tsx
import { Metadata } from 'next';
import { createServerSupabase } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import AuthGuard from '@/components/auth/AuthGuard';
import { Page } from '@/components/layout/Page';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Heart, Package, Users, TrendingUp, Star, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Community Products | AUDHDITIES',
  description: 'Discover products and services from our community',
};

export default async function CommunityProductsPage() {
  const supabase = await createServerSupabase();
  
  // Check if user is logged in (optional for browsing)
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch published products from all creators and vendors
  const { data: products } = await supabase
    .from('products')
    .select(`
      *,
      profiles!products_creator_id_fkey (
        username,
        display_name,
        avatar_url
      )
    `)
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  // Fetch featured products (most popular or recently added)
  const featuredProducts = products?.slice(0, 4) || [];

  // Fetch product categories for filtering (from actual products)
  const categories = products 
    ? [...new Set(products.map(p => p.product_type).filter(Boolean))]
    : [];

  const categoryNames: Record<string, string> = {
    digital_download: 'Digital Downloads',
    digital_course: 'Courses',
    physical_product: 'Physical Products',
    clothing: 'Clothing',
    accessory: 'Accessories',
    audio: 'Audio',
    music: 'Music',
    video: 'Video',
    consultation: 'Consultations',
    service: 'Services',
    mutual_aid: 'Mutual Aid',
    donation: 'Donations',
    tip: 'Tips',
  };

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
          <div className="container max-w-7xl mx-auto">
            
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-cyan-500/10 px-4 py-2 rounded-full mb-6 border border-cyan-500/20">
                <Heart size={14} className="text-cyan-400" />
                <span className="text-sm text-cyan-400">Community Marketplace</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Discover Community Creations
              </h1>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                Explore products and services created by and for the neurodivergent community.
                Every purchase supports creators and contributors.
              </p>
            </div>

            {/* Featured Section */}
            {featuredProducts.length > 0 && (
              <section className="mb-16">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Star size={20} className="text-yellow-400" />
                    <h2 className="text-2xl font-bold text-white">Featured</h2>
                  </div>
                  <Link href="/marketplace" className="text-sm text-cyan-400 hover:underline">
                    View all →
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {featuredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      variant="marketplace"
                    />
                  ))}
                </div>
              </section>
            )}

            {/* All Products Section */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <Package size={20} className="text-purple-400" />
                <h2 className="text-2xl font-bold text-white">All Products & Services</h2>
              </div>
              
              <ProductGrid
                products={products || []}
                variant="marketplace"
                showFilters={true}
                showSearch={true}
                showViewToggle={true}
                emptyMessage="No products available yet. Be the first to create something amazing!"
              />
            </section>

            {/* Call to Action for Creators */}
            {!user && (
              <Card className="mt-12 p-8 text-center bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-cyan-500/20">
                <Sparkles className="text-cyan-400 mx-auto mb-4" size={32} />
                <h3 className="text-xl font-bold text-white mb-2">Have something to share?</h3>
                <p className="text-white/60 mb-6 max-w-md mx-auto">
                  Join our community of creators and vendors. Share your art, services, and gifts with the world.
                </p>
                <div className="flex gap-4 justify-center">
                  <Link href="/signup">
                    <Button>Sign Up to Create</Button>
                  </Link>
                  <Link href="/creator/apply">
                    <Button variant="outline">Learn About Being a Creator</Button>
                  </Link>
                </div>
              </Card>
            )}

            {/* Community Stats */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">{products?.length || 0}</div>
                <div className="text-xs text-white/40">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {products ? [...new Set(products.map(p => p.creator_id))].length : 0}
                </div>
                <div className="text-xs text-white/40">Creators</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-400">
                  {products ? products.filter(p => p.residual_pool_percent && p.residual_pool_percent > 0).length : 0}
                </div>
                <div className="text-xs text-white/40">With Residuals</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {categories.length}
                </div>
                <div className="text-xs text-white/40">Categories</div>
              </div>
            </div>

            {/* Categories Section */}
            {categories.length > 0 && (
              <div className="mt-12 pt-8 border-t border-white/10">
                <h3 className="text-lg font-bold text-white mb-4">Browse by Category</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/marketplace?category=${category}`}
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {categoryNames[category] || category.replace('_', ' ')}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </Page>
    </AuthGuard>
  );
}