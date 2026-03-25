// src/(dashboard)/admin/page.tsx
import { Metadata } from 'next';
import { createServerSupabase } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Page } from '@/components/layout/Page';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';
import { 
  Users, 
  FileText, 
  Package, 
  DollarSign, 
  Eye, 
  Shield, 
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admin Dashboard | AUDHDITIES',
  description: 'Sanctuary administration',
};

// Server-side admin check function
async function requireAdmin() {
  const supabase = await createServerSupabase();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();
  
  const isAdmin = profile?.is_admin ?? false;
  
  if (!isAdmin) {
    redirect('/dashboard');
  }
  
  return { user, supabase };
}

export default async function AdminDashboardPage() {
  // Run server-side admin check
  const { supabase } = await requireAdmin();
  
  // Fetch counts for dashboard (with null handling)
  const [
    { count: pendingApplications },
    { count: totalUsers },
    { count: pendingProducts },
    { count: totalSales },
    { count: pendingPayouts }
  ] = await Promise.all([
    supabase.from('applications').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('products').select('*', { count: 'exact', head: true }).eq('is_published', false),
    supabase.from('sales').select('*', { count: 'exact', head: true }),
    supabase.from('residual_payouts').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
  ]);
  
  // Fetch recent admin logs
  const { data: recentLogs } = await supabase
    .from('admin_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);
  
  // Stats cards with safe values
  const stats = [
    { label: 'Total Users', value: totalUsers ?? 0, icon: Users, color: 'cyan', href: '/admin/users' },
    { label: 'Pending Apps', value: pendingApplications ?? 0, icon: FileText, color: 'yellow', href: '/admin/applications', badge: (pendingApplications ?? 0) > 0 },
    { label: 'Pending Products', value: pendingProducts ?? 0, icon: Package, color: 'purple', href: '/admin/products', badge: (pendingProducts ?? 0) > 0 },
    { label: 'Total Sales', value: totalSales ?? 0, icon: DollarSign, color: 'green', href: '/admin/transparency' },
    { label: 'Pending Payouts', value: pendingPayouts ?? 0, icon: TrendingUp, color: 'pink', href: '/admin/residuals', badge: (pendingPayouts ?? 0) > 0 },
  ];
  
  return (
    <Page 
      variant={1}
      environment="dashboard"
      showForeground={false}
      animated={true}
      showContinuityBeam={true}
    >
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="text-cyan-400" size={28} />
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Admin Dashboard
              </h1>
            </div>
            <p className="text-white/60">
              Manage the sanctuary
            </p>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
            {stats.map((stat) => (
              <Link key={stat.label} href={stat.href}>
                <Card className={`p-4 hover:border-${stat.color}-500/30 transition-all ${stat.badge ? `border-${stat.color}-500/30` : ''}`}>
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className={`text-${stat.color}-400`} size={20} />
                    {stat.badge && (
                      <Badge variant="outline" className="text-yellow-400 border-yellow-500/30 animate-pulse">
                        Needs attention
                      </Badge>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/40">{stat.label}</div>
                </Card>
              </Link>
            ))}
          </div>
          
          {/* Recent Admin Logs */}
          <div className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4">Recent Admin Actions</h2>
            <div className="space-y-2">
              {recentLogs && recentLogs.length > 0 ? (
                recentLogs.map((log) => (
                  <Card key={log.id} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                        <Eye size={14} className="text-white/40" />
                      </div>
                      <div>
                        <p className="text-white text-sm">{log.action}</p>
                        {log.public_note && (
                          <p className="text-white/40 text-xs">{log.public_note}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-white/30">
                      {log.created_at ? new Date(log.created_at).toLocaleDateString() : 'Unknown date'}
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-8 text-center">
                  <p className="text-white/40">No admin actions logged yet</p>
                </Card>
              )}
            </div>
          </div>
          
          {/* Quick Actions */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/admin/applications">
                <Card className="p-4 hover:border-cyan-500/30 transition-all">
                  <FileText className="text-cyan-400 mb-2" size={20} />
                  <h3 className="text-white font-bold">Review Applications</h3>
                  <p className="text-xs text-white/40">Approve or reject creators/vendors</p>
                </Card>
              </Link>
              <Link href="/admin/users">
                <Card className="p-4 hover:border-purple-500/30 transition-all">
                  <Users className="text-purple-400 mb-2" size={20} />
                  <h3 className="text-white font-bold">Manage Users</h3>
                  <p className="text-xs text-white/40">View and manage user accounts</p>
                </Card>
              </Link>
              <Link href="/admin/products">
                <Card className="p-4 hover:border-pink-500/30 transition-all">
                  <Package className="text-pink-400 mb-2" size={20} />
                  <h3 className="text-white font-bold">Moderate Products</h3>
                  <p className="text-xs text-white/40">Review pending products</p>
                </Card>
              </Link>
              <Link href="/admin/transparency">
                <Card className="p-4 hover:border-green-500/30 transition-all">
                  <Eye className="text-green-400 mb-2" size={20} />
                  <h3 className="text-white font-bold">Add Transparency Note</h3>
                  <p className="text-xs text-white/40">Log public admin actions</p>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Page>
  );
}