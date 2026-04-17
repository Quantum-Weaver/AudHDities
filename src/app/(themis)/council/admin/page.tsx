// app/(dashboard)/admin/page.tsx
import { Metadata } from 'next';
import { createServerSupabase } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import AuthGuard from '@/components/auth/AuthGuard';
import { Page } from '@/components/shared/Page';
import { Card } from '@/components/ui/Card';
import UserCard from '@/components/admin/UserCard';
import { ApplicationReview } from '@/components/admin/ApplicationReview';
import { Users, FileCheck, Package, DollarSign, Activity } from 'lucide-react';
import type { Database } from '@/types/supabase/database.types';
import type { ApplicationWithUser } from '@/types/supabase/tables/applications';

export const metadata: Metadata = {
  title: 'Admin Dashboard | AUDHDITIES',
  description: 'Manage the sanctuary',
};

type Profile = Database['public']['Tables']['profiles']['Row'];

// Helper to transform profile to UserCard format
function toUserCardFormat(profile: Profile) {
  return {
    id: profile.id,
    username: profile.username ?? '',
    display_name: profile.display_name,
    email: profile.email,
    is_creator: profile.is_creator ?? false,
    is_vendor: profile.is_vendor ?? false,
    is_admin: profile.is_admin ?? false,
    created_at: profile.created_at ?? new Date().toISOString(),
    avatar_url: profile.avatar_url ?? undefined,
  };
}

export default async function AdminPage() {
  const supabase = await createServerSupabase();
  
  // Check authentication
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login');
  }
  
  // Check if user is admin
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();
  
  if (profileError || !profile?.is_admin) {
    redirect('/dashboard');
  }
  
  // Fetch stats
  const [
    { count: totalUsers },
    { count: totalCreators },
    { count: totalVendors },
    { count: totalProducts },
    { count: pendingCreatorApps },
    { count: pendingVendorApps },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('is_creator', true),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('is_vendor', true),
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('applications').select('*', { count: 'exact', head: true }).eq('application_type', 'creator').eq('status', 'pending'),
    supabase.from('applications').select('*', { count: 'exact', head: true }).eq('application_type', 'vendor').eq('status', 'pending'),
  ]);
  
  // Fetch recent users
  const { data: recentUsers } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);
  
  // Fetch pending applications
  const { data: pendingApplications } = await supabase
    .from('applications')
    .select(`
      *,
      user:profiles!applications_user_id_fkey (
        id,
        username,
        display_name,
        email
      ),
      reviewer:profiles!applications_reviewed_by_fkey (
        id,
        username,
        display_name
      )
    `)
    .eq('status', 'pending')
    .order('created_at', { ascending: false })
    .limit(10);
  
  // Parse form_data for each application
  const parsedApplications = (pendingApplications || []).map(app => ({
    ...app,
    form_data: typeof app.form_data === 'object' 
      ? app.form_data 
      : JSON.parse(app.form_data as string || '{}'),
    user: app.user || undefined,
    reviewer: app.reviewer || undefined,
  })) as ApplicationWithUser[];
  
  // Transform users for UserCard
  const formattedUsers = (recentUsers || []).map(toUserCardFormat);
  
  const stats = [
    { label: 'Total Users', value: totalUsers || 0, icon: Users, color: 'cyan' },
    { label: 'Creators', value: totalCreators || 0, icon: Users, color: 'purple' },
    { label: 'Vendors', value: totalVendors || 0, icon: Users, color: 'pink' },
    { label: 'Products', value: totalProducts || 0, icon: Package, color: 'green' },
    { label: 'Pending Creators', value: pendingCreatorApps || 0, icon: FileCheck, color: 'yellow' },
    { label: 'Pending Vendors', value: pendingVendorApps || 0, icon: FileCheck, color: 'orange' },
  ];
  
  return (
    <AuthGuard>
      <Page 
        variant={1}
        environment="admin"
        showForeground={false}
        animated={true}
        showContinuityBeam={true}
      >
        <main className="min-h-screen py-12">
          <div className="container max-w-7xl mx-auto px-6">
            
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Admin Dashboard
              </h1>
              <p className="text-white/60">
                Manage users, applications, and platform settings
              </p>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
              {stats.map((stat) => (
                <Card key={stat.label} className="p-4 text-center">
                  <stat.icon className={`text-${stat.color}-400 mx-auto mb-2`} size={20} />
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/40">{stat.label}</p>
                </Card>
              ))}
            </div>
            
            {/* Pending Applications Section */}
            <h2 className="text-xl font-bold text-white mb-4">Pending Applications</h2>
            <div className="space-y-4 mb-12">
              {parsedApplications.length > 0 ? (
                parsedApplications.map((app) => (
                  <ApplicationReview key={app.id} application={app} />
                ))
              ) : (
                <Card className="p-12 text-center">
                  <FileCheck className="text-white/20 mx-auto mb-4" size={48} />
                  <h3 className="text-white font-bold mb-2">No pending applications</h3>
                  <p className="text-white/40 text-sm">
                    All applications have been reviewed
                  </p>
                </Card>
              )}
            </div>
            
            {/* Recent Users Section */}
            <h2 className="text-xl font-bold text-white mb-4">Recent Users</h2>
            <div className="space-y-3">
              {formattedUsers.length > 0 ? (
                formattedUsers.map((user) => (
                  <UserCard key={user.username} user={user} />
                ))
              ) : (
                <Card className="p-12 text-center">
                  <Users className="text-white/20 mx-auto mb-4" size={48} />
                  <h3 className="text-white font-bold mb-2">No users yet</h3>
                  <p className="text-white/40 text-sm">
                    Users will appear here when they join
                  </p>
                </Card>
              )}
            </div>
          </div>
        </main>
      </Page>
    </AuthGuard>
  );
}