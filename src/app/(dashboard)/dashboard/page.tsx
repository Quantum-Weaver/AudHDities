// src/app/(dashboard)/dashboard/page.tsx
import { Metadata } from 'next';
import { createServerSupabase } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import AuthGuard from '@/components/auth/AuthGuard';
import Link from 'next/link';
import { 
  Activity, 
  DollarSign, 
  Users, 
  Package, 
  Palette, 
  Truck, 
  Shield, 
  Award,
  Sparkles,
  Compass,
  Heart,
  Star
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Dashboard | AUDHDITIES',
  description: 'Your sanctuary overview',
};

export default async function DashboardPage() {
  const supabase = await createServerSupabase();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Fetch main profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Fetch creator profile separately (fixes relationship issues)
  const { data: creator } = await supabase
    .from('creator_profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();

  // Fetch vendor profile separately (FIXED: was querying creator_profiles)
  const { data: vendor } = await supabase
    .from('vendor_profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();

  // Fetch community profile separately
  const { data: community } = await supabase
    .from('community_profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();
    
  // Fetch pending applications
  const { data: pendingApplications } = await supabase
    .from('applications')
    .select('application_type, status')
    .eq('user_id', user.id)
    .eq('status', 'pending');

  // Determine if applications are pending
  const hasPendingCreator = pendingApplications?.some(app => app.application_type === 'creator');
  const hasPendingVendor = pendingApplications?.some(app => app.application_type === 'vendor');

  // Safe stats with fallbacks
  const totalEarnings = (creator?.total_earnings || 0) + (vendor?.total_earnings || 0);
  const totalProducts = (creator?.total_products || 0) + (vendor?.total_products || 0);
  const sovereigntyScore = profile?.sovereignty_score || 0;
  const endorsements = community?.peer_endorsements || 0;

  return (
    <AuthGuard>
      <main className="min-h-screen py-20 px-6">
        <div className="container max-w-7xl mx-auto">
          
          {/* Welcome Header - Redesigned */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={20} className="text-cyan-400" />
                <span className="text-sm text-cyan-400/80">Your Sanctuary</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Welcome back, {profile?.display_name || profile?.username || 'Weaver'}
              </h1>
              <p className="text-white/60">
                Here's what's happening in your corner of the sanctuary.
              </p>
            </div>
            
            {/* Sovereignty Score Badge - Enhanced */}
            <div className="bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-500/30 rounded-2xl px-5 py-3 flex items-center gap-3 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/30 to-cyan-500/30 flex items-center justify-center">
                <Shield className="text-purple-400" size={20} />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{sovereigntyScore}</div>
                <div className="text-xs text-white/40">Sovereignty Score</div>
              </div>
            </div>
          </div>

          {/* Stats Grid - Enhanced with better visual hierarchy */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <Card className="p-5 hover:bg-white/10 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-3">
                <Activity className="text-cyan-400" size={22} />
                <span className="text-2xs text-white/20 group-hover:text-cyan-400/30 transition-colors">Score</span>
              </div>
              <p className="text-2xl font-bold text-white">{sovereigntyScore}</p>
              <p className="text-xs text-white/40 mt-1">Sovereignty Score</p>
            </Card>
            
            <Card className="p-5 hover:bg-white/10 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-3">
                <DollarSign className="text-green-400" size={22} />
                <span className="text-2xs text-white/20 group-hover:text-green-400/30 transition-colors">Earned</span>
              </div>
              <p className="text-2xl font-bold text-white">
                ${totalEarnings.toFixed(2)}
              </p>
              <p className="text-xs text-white/40 mt-1">Total Earned</p>
            </Card>
            
            <Card className="p-5 hover:bg-white/10 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-3">
                <Package className="text-purple-400" size={22} />
                <span className="text-2xs text-white/20 group-hover:text-purple-400/30 transition-colors">Products</span>
              </div>
              <p className="text-2xl font-bold text-white">{totalProducts}</p>
              <p className="text-xs text-white/40 mt-1">Products & Services</p>
            </Card>
            
            <Card className="p-5 hover:bg-white/10 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-3">
                <Heart className="text-pink-400" size={22} />
                <span className="text-2xs text-white/20 group-hover:text-pink-400/30 transition-colors">Endorsements</span>
              </div>
              <p className="text-2xl font-bold text-white">{endorsements}</p>
              <p className="text-xs text-white/40 mt-1">Community Endorsements</p>
            </Card>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            
            {/* LEFT COLUMN - CREATOR SECTION */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-l-3 border-cyan-400 pl-3">
                <Palette className="text-cyan-400" size={20} />
                <h2 className="text-xl font-bold text-white">Creator</h2>
              </div>

              {!profile?.is_creator ? (
                /* NOT A CREATOR - Show apply option */
                <Card className="p-6 border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-transparent hover:border-cyan-500/40 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                      <Palette size={24} className="text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold mb-2">Become a Creator</h3>
                      <p className="text-sm text-white/60 mb-4">
                        Share your art, music, writing, code, or ideas. 
                        Creators keep 70% of sales and earn residuals forever.
                      </p>
                    </div>
                  </div>
                  
                  {hasPendingCreator ? (
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mb-4 text-center">
                      <p className="text-yellow-400 text-sm">Your application is pending review</p>
                    </div>
                  ) : (
                    <Link href="/creator/apply">
                      <Button variant="primary" className="w-full group">
                        <span>Apply to Become a Creator</span>
                        <Sparkles size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Button>
                    </Link>
                  )}
                  
                  <Link href="/docs/guides/creator-onboarding" target="_blank" className="block text-center text-xs text-cyan-400/70 hover:text-cyan-400 mt-3 transition-colors">
                    Learn more about being a creator →
                  </Link>
                </Card>
              ) : (
                /* IS A CREATOR - Show dashboard preview */
                <Card className="p-6 border border-cyan-500/30 bg-gradient-to-br from-cyan-500/5 to-transparent">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-white font-bold">Creator Hub</h3>
                      <p className="text-xs text-white/40">Your creative dashboard</p>
                    </div>
                    {creator?.verified_badge && (
                      <Badge variant="success" className="flex items-center gap-1 px-3 py-1">
                        <Award size={12} />
                        Verified
                      </Badge>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    <div className="bg-white/5 rounded-xl p-3 text-center hover:bg-white/10 transition-colors">
                      <div className="text-xl font-bold text-white">{creator?.total_products || 0}</div>
                      <div className="text-xs text-white/40">Products</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 text-center hover:bg-white/10 transition-colors">
                      <div className="text-xl font-bold text-white">{creator?.total_sales || 0}</div>
                      <div className="text-xs text-white/40">Sales</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 text-center hover:bg-white/10 transition-colors">
                      <div className="text-xl font-bold text-white">${creator?.total_earnings || 0}</div>
                      <div className="text-xs text-white/40">Earnings</div>
                    </div>
                  </div>
                  
                  <Link href="/creator">
                    <Button variant="outline" className="w-full group">
                      Go to Creator Hub
                      <Compass size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </Card>
              )}
            </div>

            {/* RIGHT COLUMN - VENDOR SECTION */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-l-3 border-purple-400 pl-3">
                <Truck className="text-purple-400" size={20} />
                <h2 className="text-xl font-bold text-white">Vendor</h2>
              </div>

              {!profile?.is_vendor ? (
                /* NOT A VENDOR - Show apply option */
                <Card className="p-6 border border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-transparent hover:border-purple-500/40 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <Truck size={24} className="text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold mb-2">Become a Vendor</h3>
                      <p className="text-sm text-white/60 mb-4">
                        Provide logistics, shipping, venues, marketing, or other services 
                        that help creators reach their audience.
                      </p>
                    </div>
                  </div>
                  
                  {hasPendingVendor ? (
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mb-4 text-center">
                      <p className="text-yellow-400 text-sm">Your application is pending review</p>
                    </div>
                  ) : (
                    <Link href="/vendor/apply">
                      <Button variant="primary" className="w-full bg-purple-600 hover:bg-purple-500 group">
                        <span>Apply to Become a Vendor</span>
                        <Sparkles size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Button>
                    </Link>
                  )}
                  
                  <Link href="/docs/guides/vendor-onboarding" target="_blank" className="block text-center text-xs text-purple-400/70 hover:text-purple-400 mt-3 transition-colors">
                    Learn more about being a vendor →
                  </Link>
                </Card>
              ) : (
                /* IS A VENDOR - Show dashboard preview */
                <Card className="p-6 border border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-transparent">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-white font-bold">Vendor Hub</h3>
                      <p className="text-xs text-white/40">Your services dashboard</p>
                    </div>
                    {vendor?.verified_badge && (
                      <Badge variant="success" className="flex items-center gap-1 px-3 py-1">
                        <Award size={12} />
                        Verified
                      </Badge>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    <div className="bg-white/5 rounded-xl p-3 text-center hover:bg-white/10 transition-colors">
                      <div className="text-xl font-bold text-white">{vendor?.total_products || 0}</div>
                      <div className="text-xs text-white/40">Services</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 text-center hover:bg-white/10 transition-colors">
                      <div className="text-xl font-bold text-white">{vendor?.total_sales || 0}</div>
                      <div className="text-xs text-white/40">Sales</div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 text-center hover:bg-white/10 transition-colors">
                      <div className="text-xl font-bold text-white">${vendor?.total_earnings || 0}</div>
                      <div className="text-xs text-white/40">Earnings</div>
                    </div>
                  </div>
                  
                  <Link href="/vendor">
                    <Button variant="outline" className="w-full group">
                      Go to Vendor Hub
                      <Compass size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </Card>
              )}
            </div>
          </div>

          {/* COMMUNITY SECTION - Enhanced */}
          <div className="mb-12">
            <div className="flex items-center gap-2 border-l-3 border-green-400 pl-3 mb-4">
              <Heart className="text-green-400" size={20} />
              <h2 className="text-xl font-bold text-white">Community Profile</h2>
            </div>
            
            <Card className="p-6 border border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                <div className="text-center md:text-left">
                  <p className="text-xs text-white/40 mb-1">Primary House</p>
                  <p className="text-white font-medium capitalize flex items-center justify-center md:justify-start gap-1">
                    <Star size={14} className="text-cyan-400" />
                    {profile?.primary_house?.replace('_', ' ') || 'Unaffiliated'}
                  </p>
                </div>
                <div className="text-center md:text-left">
                  <p className="text-xs text-white/40 mb-1">Mentor Status</p>
                  <p className="text-white font-medium">
                    {community?.is_mentor ? '✨ Active Mentor' : 'Not a Mentor'}
                  </p>
                </div>
                <div className="text-center md:text-left">
                  <p className="text-xs text-white/40 mb-1">Mentees</p>
                  <p className="text-white font-medium">{community?.mentee_count || 0}</p>
                </div>
                <div className="text-center md:text-left">
                  <p className="text-xs text-white/40 mb-1">Neurodivergent Identity</p>
                  <p className="text-white font-medium text-sm">
                    {community?.nd_identity?.length ? community.nd_identity.join(', ') : 'Not specified'}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-center md:justify-start">
                <Link href="/community/edit">
                  <Button variant="outline" size="sm" className="group">
                    <Heart size={14} className="mr-2 group-hover:scale-110 transition-transform" />
                    Edit Community Profile
                  </Button>
                </Link>
              </div>
            </Card>
          </div>

          {/* QUICK ACTIONS - Enhanced */}
          <div>
            <h2 className="text-xl font-bold text-white mb-5">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                href="/profile/edit"
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 group text-center"
              >
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <Activity size={18} className="text-cyan-400" />
                </div>
                <h3 className="text-white font-bold mb-1 text-sm">Edit Profile</h3>
                <p className="text-xs text-white/40">Update your info</p>
              </Link>
              
              <Link
                href="/community/edit"
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 group text-center"
              >
                <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <Heart size={18} className="text-pink-400" />
                </div>
                <h3 className="text-white font-bold mb-1 text-sm">Community</h3>
                <p className="text-xs text-white/40">ND preferences</p>
              </Link>
              
              <Link
                href="/marketplace"
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 group text-center"
              >
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <Compass size={18} className="text-purple-400" />
                </div>
                <h3 className="text-white font-bold mb-1 text-sm">Explore</h3>
                <p className="text-xs text-white/40">Discover creators</p>
              </Link>
              
              <Link
                href="/learn"
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 group text-center"
              >
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <Sparkles size={18} className="text-green-400" />
                </div>
                <h3 className="text-white font-bold mb-1 text-sm">Learning</h3>
                <p className="text-xs text-white/40">Grow sovereignty</p>
              </Link>
            </div>
          </div>

          {/* Inspirational Footer */}
          <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <p className="text-xs text-white/30">
              Your sovereignty score grows with every contribution, every purchase, and every moment of connection.
              <br />
              Every step you take weaves the sanctuary stronger.
            </p>
          </div>
        </div>
      </main>
    </AuthGuard>
  );
}