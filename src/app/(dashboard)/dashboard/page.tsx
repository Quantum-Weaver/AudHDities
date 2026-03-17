import { Metadata } from 'next';
import { createServerSupabase } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import AuthGuard from '@/components/auth/AuthGuard';
import Link from 'next/link';
import { Activity, DollarSign, Users, Package } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dashboard | AUDHDITIES',
  description: 'Your sanctuary overview',
};

export default async function DashboardPage() {
  const supabase = await createServerSupabase();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return (
    <AuthGuard>
      <main className="min-h-screen py-20 px-6">
        <div className="container max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {profile?.display_name || profile?.username || 'Weaver'}
          </h1>
          <p className="text-white/60 mb-12">Your sanctuary at a glance</p>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <Activity className="text-cyan-400 mb-4" size={24} />
              <p className="text-2xl font-bold text-white">0</p>
              <p className="text-sm text-white/40">Sovereignty Score</p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <DollarSign className="text-green-400 mb-4" size={24} />
              <p className="text-2xl font-bold text-white">$0</p>
              <p className="text-sm text-white/40">Total Earned</p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <Package className="text-purple-400 mb-4" size={24} />
              <p className="text-2xl font-bold text-white">0</p>
              <p className="text-sm text-white/40">Products</p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <Users className="text-pink-400 mb-4" size={24} />
              <p className="text-2xl font-bold text-white">0</p>
              <p className="text-sm text-white/40">Followers</p>
            </div>
          </div>

          {/* Quick Actions */}
          <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/profile/edit"
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
            >
              <h3 className="text-white font-bold mb-2">Complete Your Profile</h3>
              <p className="text-sm text-white/40">Add a bio, avatar, and more</p>
            </Link>
            
            <Link
              href="/creators"
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
            >
              <h3 className="text-white font-bold mb-2">Explore Creators</h3>
              <p className="text-sm text-white/40">Discover amazing work</p>
            </Link>
            
            <Link
              href="/learn"
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
            >
              <h3 className="text-white font-bold mb-2">Start Learning</h3>
              <p className="text-sm text-white/40">Pathways to sovereignty</p>
            </Link>
          </div>
        </div>
      </main>
    </AuthGuard>
  );
}