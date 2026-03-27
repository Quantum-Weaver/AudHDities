// src/app/(marketplace)/vendors/[username]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createServerSupabase } from '@/lib/supabase/server';
import { Page } from '@/components/layout/Page';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Card } from '@/components/ui/Card';
import { MarkdownBio } from '@/components/profiles/MarkdownBio';
import { ArrowLeft, Package, Shield, Home, Store, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface VendorPageProps {
  params: Promise<{ username: string }> | { username: string };
}

export async function generateMetadata({ params }: VendorPageProps): Promise<Metadata> {
  const { username } = await params;
  const supabase = await createServerSupabase();
  
  const { data: vendor } = await supabase
    .from('profiles')
    .select(`
      display_name,
      username,
      vendor_profiles!vendor_profiles_id_fkey (
        business_name
      )
    `)
    .eq('username', username)
    .eq('is_vendor', true)
    .maybeSingle();
  
  if (!vendor) {
    return { title: 'Vendor Not Found' };
  }
  
  const businessName = vendor.vendor_profiles?.business_name ?? vendor.display_name ?? vendor.username ?? 'Vendor';
  
  return {
    title: `${businessName} | AUDHDITIES Vendor`,
    description: `Explore products from ${businessName}`,
  };
}

export default async function VendorPage({ params }: VendorPageProps) {
  const { username } = await params;
  const supabase = await createServerSupabase();
  
  const { data: vendor, error } = await supabase
    .from('profiles')
    .select(`
      id,
      username,
      display_name,
      avatar_url,
      bio,
      created_at,
      is_vendor,
      is_creator,
      is_admin,
      user_tier,
      sovereignty_score,
      primary_house,
      vendor_profiles!vendor_profiles_id_fkey (
        business_name,
        business_type,
        business_description,
        business_logo_url,
        verified_badge,
        verification_status,
        product_categories,
        total_products,
        total_sales,
        total_earnings
      )
    `)
    .eq('username', username)
    .eq('is_vendor', true)
    .maybeSingle();
  
  if (error || !vendor) {
    notFound();
  }
  
  // Safe access with null coalescing
  const vendorProfile = vendor.vendor_profiles;
  const vendorId = vendor.id;
  const vendorUsername = vendor.username ?? '';
  const vendorDisplayName = vendor.display_name ?? vendorUsername;
  const vendorAvatarUrl = vendor.avatar_url ?? null;
  const vendorBio = vendor.bio ?? null;
  const vendorCreatedAt = vendor.created_at ?? null;
  const vendorIsVendor = vendor.is_vendor ?? false;
  const vendorIsCreator = vendor.is_creator ?? false;
  const vendorIsAdmin = vendor.is_admin ?? false;
  const vendorUserTier = vendor.user_tier ?? 'community';
  const vendorSovereigntyScore = vendor.sovereignty_score ?? 0;
  const vendorPrimaryHouse = vendor.primary_house ?? null;
  
  // Vendor profile safe values
  const businessName = vendorProfile?.business_name ?? vendorDisplayName ?? 'Vendor';
  const businessType = vendorProfile?.business_type ?? null;
  const businessDescription = vendorProfile?.business_description ?? null;
  const businessLogoUrl = vendorProfile?.business_logo_url ?? null;
  const verifiedBadge = vendorProfile?.verified_badge ?? false;
  const verificationStatus = vendorProfile?.verification_status ?? 'pending';
  const productCategories = vendorProfile?.product_categories ?? [];
  const totalProducts = vendorProfile?.total_products ?? 0;
  const totalSales = vendorProfile?.total_sales ?? 0;
  const totalEarnings = vendorProfile?.total_earnings ?? 0;
  
  // Fetch products (will be empty array if none)
  const { data: productsData } = await supabase
    .from('products')
    .select('*')
    .eq('creator_id', vendorId)
    .eq('is_published', true)
    .eq('active', true)
    .order('created_at', { ascending: false })
    .limit(12);
  
  const products = productsData ?? [];
  const hasProducts = products.length > 0;
  
  // Helper functions with null safety
  const getHouseDisplay = (house: string | null): string | null => {
    if (!house) return null;
    return house.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };
  
  const getBusinessTypeDisplay = (type: string | null): string | null => {
    if (!type) return null;
    return type.split('_').map(word => 
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
        <div className="container max-w-7xl mx-auto px-6 pt-8">
          <Link href="/vendors" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <ArrowLeft size={16} />
            <span>Back to Vendors</span>
          </Link>
        </div>
        
        <div className="relative mt-4">


          {/* Avatar */}
          <div className="absolute -bottom-12 left-8 flex items-end gap-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-black bg-white/5">
                {vendorAvatarUrl ? (
                  <img 
                    src={vendorAvatarUrl} 
                    alt={businessName} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-white/40">
                    {businessName[0] || '?'}
                  </div>
                )}
              </div>
            </div>

            {/* Sovereignty Score Badge */}
            <div className="mb-2 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-purple-500/30">
              <Shield size={14} className="text-purple-400" />
              <span className="text-sm font-medium text-white">{vendorSovereigntyScore}</span>
              <span className="text-xs text-white/40">Sovereignty</span>
            </div>
          </div>

          {/* Profile Info Section */}
          <div className="pt-16 px-8 pb-6 border-b border-white/10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold text-white">
                    {businessName}
                  </h1>
                  {verifiedBadge && (
                    <CheckCircle size={20} className="text-green-400" />
                  )}
                </div>
                
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  {/* Username */}
                  <span className="text-white/40 text-sm">@{vendorUsername}</span>
                  
                  {/* Vendor Badge */}
                  <span className="px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs text-purple-400 flex items-center gap-1">
                    <Store size={12} />
                    Vendor
                  </span>
                  
                  {/* Business Type */}
                  {businessType && (
                    <span className="px-2 py-0.5 bg-white/10 rounded-full text-xs text-white/60">
                      {getBusinessTypeDisplay(businessType)}
                    </span>
                  )}
                  
                  {/* Primary House */}
                  {vendorPrimaryHouse && (
                    <span className="flex items-center gap-1 px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs text-purple-400">
                      <Home size={12} />
                      House of {getHouseDisplay(vendorPrimaryHouse)}
                    </span>
                  )}
                </div>
              </div>

              {/* User Tier */}
              <div className="text-right">
                <span className={`
                  px-3 py-1 rounded-full text-xs font-medium
                  ${vendorUserTier === 'community' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : ''}
                  ${vendorUserTier === 'ally' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : ''}
                  ${vendorUserTier === 'corporate' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : ''}
                `}>
                  {vendorUserTier.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container max-w-7xl mx-auto px-6 mt-8">
          {/* Business Description */}
          {businessDescription && (
            <Card className="p-6 mb-8">
              <h2 className="text-xl font-bold text-white mb-4">About Our Business</h2>
              <div className="prose prose-invert max-w-none">
                <MarkdownBio content={businessDescription} />
              </div>
            </Card>
          )}
          
          {/* Product Categories */}
          {productCategories.length > 0 && (
            <Card className="p-6 mb-8">
              <h2 className="text-xl font-bold text-white mb-4">Product Categories</h2>
              <div className="flex flex-wrap gap-2">
                {productCategories.map((category) => (
                  <span key={category} className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/70">
                    {category}
                  </span>
                ))}
              </div>
            </Card>
          )}
          
          {/* Products Section */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Products from {businessName}</h2>
              <span className="text-white/40 text-sm">{totalProducts} products</span>
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
                  {businessName} hasn't added any products yet. Check back soon!
                </p>
              </Card>
            )}
          </section>
          
          {/* Vendor Stats */}
          <Card className="p-6 mt-8">
            <h2 className="text-xl font-bold text-white mb-4">Vendor Stats</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">{totalProducts}</div>
                <div className="text-sm text-white/40">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{totalSales}</div>
                <div className="text-sm text-white/40">Sales</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">${totalEarnings.toFixed(2)}</div>
                <div className="text-sm text-white/40">Earnings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-400">{productCategories.length}</div>
                <div className="text-sm text-white/40">Categories</div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </Page>
  );
}