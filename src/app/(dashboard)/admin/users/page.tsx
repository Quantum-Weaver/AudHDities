// src/app/(dashboard)/admin/users/page.tsx
import { Metadata } from 'next';
import { createServerSupabase } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Page } from '@/components/layout/Page';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Search, User, Shield, Mail, Calendar, MoreVertical, Edit, Eye, UserCog } from 'lucide-react';
import Link from 'next/link';
import type { Profile } from '@/types/supabase/tables/profiles';
import { USER_TIERS, getUserPermissions } from '@/types/roles';

export const metadata: Metadata = {
  title: 'Users | Admin Dashboard',
  description: 'Manage sanctuary users',
};

// Server-side admin check
async function requireAdmin() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();
  
  if (!profile?.is_admin) redirect('/dashboard');
  
  return { supabase, currentAdmin: user };
}

// Helper to get user tier display
function getUserTierDisplay(tier: string | null) {
  const tierInfo = USER_TIERS.find(t => t.value === tier);
  if (!tierInfo) return null;
  
  return {
    label: tierInfo.label,
    color: tierInfo.color,
  };
}

// Helper to format date safely
function formatDate(dateString: string | null) {
  if (!dateString) return 'Unknown';
  try {
    return new Date(dateString).toLocaleDateString();
  } catch {
    return 'Invalid date';
  }
}

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: { q?: string; role?: string };
}) {
  const { supabase, currentAdmin } = await requireAdmin();
  const searchQuery = searchParams.q || '';
  const roleFilter = searchParams.role || 'all';
  
  // Build query
  let query = supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (searchQuery) {
    query = query.or(`username.ilike.%${searchQuery}%,display_name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%`);
  }
  
  // Role filter
  if (roleFilter === 'creator') {
    query = query.eq('is_creator', true);
  } else if (roleFilter === 'vendor') {
    query = query.eq('is_vendor', true);
  } else if (roleFilter === 'admin') {
    query = query.eq('is_admin', true);
  }
  
  const { data: users } = await query;
  
  // Fetch creator/vendor counts for each user (optional)
  const userIds = users?.map(u => u.id) || [];
  let creatorProfiles: Map<string, any> = new Map();
  let vendorProfiles: Map<string, any> = new Map();
  
  if (userIds.length > 0) {
    const { data: creators } = await supabase
      .from('creator_profiles')
      .select('*')
      .in('id', userIds);
    
    const { data: vendors } = await supabase
      .from('vendor_profiles')
      .select('*')
      .in('id', userIds);
    
    creators?.forEach(c => creatorProfiles.set(c.id, c));
    vendors?.forEach(v => vendorProfiles.set(v.id, v));
  }
  
  const roleTabs = [
    { id: 'all', label: 'All' },
    { id: 'creator', label: 'Creators' },
    { id: 'vendor', label: 'Vendors' },
    { id: 'admin', label: 'Admins' },
  ];
  
  return (
    <Page variant={1} environment="dashboard" showForeground={false} animated={true} showContinuityBeam={true}>
      <main className="min-h-screen py-12">
        <div className="container max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Users
              </h1>
              <p className="text-white/60">
                Manage the {users?.length || 0} members of the sanctuary
              </p>
            </div>
            
            {/* Search */}
            <form action="/admin/users" method="GET" className="relative">
              <input type="hidden" name="role" value={roleFilter} />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
              <Input
                name="q"
                type="text"
                placeholder="Search users..."
                defaultValue={searchQuery}
                className="pl-10 w-64"
              />
            </form>
          </div>
          
          {/* Role Tabs */}
          <div className="flex gap-4 mb-6 border-b border-white/10 pb-2">
            {roleTabs.map((tab) => (
              <Link
                key={tab.id}
                href={`/admin/users?role=${tab.id}${searchQuery ? `&q=${searchQuery}` : ''}`}
                className={`px-2 py-1 text-sm transition-colors ${
                  roleFilter === tab.id
                    ? 'text-cyan-400 border-b-2 border-cyan-400 -mb-[2px]'
                    : 'text-white/40 hover:text-white/60'
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>
          
          {/* Users Table */}
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="text-left p-4 text-white/60 text-sm font-medium">User</th>
                    <th className="text-left p-4 text-white/60 text-sm font-medium">Role</th>
                    <th className="text-left p-4 text-white/60 text-sm font-medium">Tier</th>
                    <th className="text-left p-4 text-white/60 text-sm font-medium">Joined</th>
                    <th className="text-left p-4 text-white/60 text-sm font-medium">Sovereignty</th>
                    <th className="text-left p-4 text-white/60 text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users && users.length > 0 ? (
                    users.map((user) => {
                      const tierDisplay = getUserTierDisplay(user.user_tier);
                      const creatorProfile = creatorProfiles.get(user.id);
                      const vendorProfile = vendorProfiles.get(user.id);
                      
                      return (
                        <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              {user.avatar_url ? (
                                <img src={user.avatar_url} alt="" className="w-10 h-10 rounded-full object-cover" />
                              ) : (
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                                  <User size={18} className="text-white/40" />
                                </div>
                              )}
                              <div>
                                <p className="text-white font-medium">
                                  {user.display_name || user.username || 'Anonymous'}
                                </p>
                                <p className="text-xs text-white/40">{user.email}</p>
                                {user.username && (
                                  <p className="text-xs text-cyan-400">@{user.username}</p>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex flex-wrap gap-1">
                              {user.is_admin && (
                                <Badge variant="success" size="sm" className="flex items-center gap-1">
                                  <Shield size={10} /> Admin
                                </Badge>
                              )}
                              {user.is_creator && (
                                <Badge variant="primary" size="sm">
                                  Creator
                                  {creatorProfile?.verified_badge && (
                                    <span className="ml-1 text-green-400">✓</span>
                                  )}
                                </Badge>
                              )}
                              {user.is_vendor && (
                                <Badge variant="outline" size="sm">
                                  Vendor
                                  {vendorProfile?.verified_badge && (
                                    <span className="ml-1 text-green-400">✓</span>
                                  )}
                                </Badge>
                              )}
                              {!user.is_admin && !user.is_creator && !user.is_vendor && (
                                <Badge variant="outline" size="sm">Community</Badge>
                              )}
                            </div>
                          </td>
                          <td className="p-4">
                            {tierDisplay ? (
                              <Badge variant="outline" className={`text-${tierDisplay.color}-400 border-${tierDisplay.color}-500/30`}>
                                {tierDisplay.label}
                              </Badge>
                            ) : (
                              <span className="text-white/40 text-sm">-</span>
                            )}
                          </td>
                          <td className="p-4 text-white/60 text-sm">
                            {formatDate(user.created_at)}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-1">
                              <span className="text-white font-bold">{user.sovereignty_score || 0}</span>
                              <span className="text-xs text-white/40">pts</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-1">
                              <Link href={`/profile/${user.id}`}>
                                <Button variant="ghost" size="sm" title="View Profile">
                                  <Eye size={14} />
                                </Button>
                              </Link>
                              <Link href={`/admin/users/${user.id}`}>
                                <Button variant="ghost" size="sm" title="Manage User">
                                  <UserCog size={14} />
                                </Button>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6} className="p-12 text-center text-white/40">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </Page>
  );
}