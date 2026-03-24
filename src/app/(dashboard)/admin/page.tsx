// src/(dashboard)/admin/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Page } from '@/components/layout/Page';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useAdmin } from '@/hooks/useAdmin';
import { useRequireRole } from '@/hooks/useRequireRole';
import { 
  Users, 
  ClipboardList, 
  Package, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Eye,
  TrendingUp,
  Shield,
  Activity
} from 'lucide-react';

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const variants: Record<string, { variant: 'success' | 'warning' | 'error' | 'info' | 'outline'; label: string }> = {
    pending: { variant: 'warning', label: 'Pending' },
    verified: { variant: 'success', label: 'Verified' },
    rejected: { variant: 'error', label: 'Rejected' },
    suspended: { variant: 'error', label: 'Suspended' },
    active: { variant: 'success', label: 'Active' },
    published: { variant: 'success', label: 'Published' },
  };
  
  const config = variants[status] || { variant: 'outline', label: status };
  
  return <Badge variant={config.variant}>{config.label}</Badge>;
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const { loading: roleLoading } = useRequireRole('admin', '/dashboard');
  
  const {
    users,
    loadingUsers,
    applications,
    loadingApplications,
    products,
    loadingProducts,
    pendingPayouts,
    loadingPayouts,
    fetchUsers,
    fetchApplications,
    fetchProductsForModeration,
    fetchPendingPayouts,
    addPublicNote,
  } = useAdmin();

  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingApplications: 0,
    pendingProducts: 0,
    pendingPayoutsTotal: 0,
    verifiedCreators: 0,
    verifiedVendors: 0,
  });

  // Fetch all data on mount
  useEffect(() => {
    const loadData = async () => {
      await fetchUsers({ limit: 5 });
      await fetchApplications('pending');
      await fetchProductsForModeration({ status: 'pending' });
      await fetchPendingPayouts();
    };
    loadData();
  }, [fetchUsers, fetchApplications, fetchProductsForModeration, fetchPendingPayouts]);

  // Calculate stats when data changes
  useEffect(() => {
    setStats({
      totalUsers: users.length,
      pendingApplications: applications.length,
      pendingProducts: products.filter(p => !p.is_published).length,
      pendingPayoutsTotal: pendingPayouts.length,
      verifiedCreators: users.filter(u => u.is_creator).length,
      verifiedVendors: users.filter(u => u.is_vendor).length,
    });
  }, [users, applications, products, pendingPayouts]);

  // Quick stats cards
  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'cyan',
      href: '/admin/users',
    },
    {
      title: 'Pending Applications',
      value: stats.pendingApplications,
      icon: ClipboardList,
      color: 'yellow',
      href: '/admin/applications',
    },
    {
      title: 'Products to Review',
      value: stats.pendingProducts,
      icon: Package,
      color: 'purple',
      href: '/admin/products',
    },
    {
      title: 'Pending Payouts',
      value: `$${stats.pendingPayoutsTotal}`,
      icon: DollarSign,
      color: 'green',
      href: '/admin/residuals',
    },
  ];

  if (roleLoading) {
    return (
        <Page 
            variant={1}
            environment="business"
            showForeground={false}
            animated={true}   
            showContinuityBeam={true}
        >
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white/60">Loading sanctuary command center...</div>
        </div>
      </Page>
    );
  }

  return (
    <Page 
        variant={1}
        environment="business"
        showForeground={false}
        animated={true}   
        showContinuityBeam={true}
    >
      <main className="min-h-screen py-12 px-6">
        <div className="container max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Sanctuary Command Center</h1>
            <p className="text-white/60">
              Governance tools for the sovereign sanctuary
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {statCards.map((stat) => (
              <Link key={stat.title} href={stat.href}>
                <Card className={`p-6 hover:border-${stat.color}-500/50 transition-all hover:scale-[1.02] cursor-pointer`}>
                  <div className="flex items-center justify-between mb-4">
                    <stat.icon className={`text-${stat.color}-400`} size={24} />
                    <span className="text-xs text-white/40">View all →</span>
                  </div>
                  <div className={`text-3xl font-bold text-white mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/60">{stat.title}</div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Left Column - Applications & Products */}
            <div className="space-y-8">
              
              {/* Recent Applications */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <ClipboardList size={18} className="text-yellow-400" />
                    Pending Applications
                  </h2>
                  <Link href="/admin/applications" className="text-sm text-cyan-400 hover:underline">
                    View all
                  </Link>
                </div>
                
                {loadingApplications ? (
                  <div className="text-center py-8 text-white/40">Loading applications...</div>
                ) : applications.length === 0 ? (
                  <div className="text-center py-8 text-white/40">
                    <CheckCircle className="mx-auto mb-2 text-green-400" size={24} />
                    No pending applications
                  </div>
                ) : (
                  <div className="space-y-3">
                    {applications.slice(0, 3).map((app) => (
                      <div key={app.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div>
                          <div className="text-white font-medium">
                            {app.user?.display_name || app.user?.username || 'Anonymous'}
                          </div>
                          <div className="text-xs text-white/40">
                            {app.application_type === 'creator' ? 'Creator' : 'Vendor'} application
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <StatusBadge status={app.status || 'pending'} />
                          <Link href={`/admin/applications/${app.id}`}>
                            <Button variant="ghost" size="sm">
                              Review
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
              
              {/* Products to Moderate */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Package size={18} className="text-purple-400" />
                    Products to Review
                  </h2>
                  <Link href="/admin/products" className="text-sm text-cyan-400 hover:underline">
                    View all
                  </Link>
                </div>
                
                {loadingProducts ? (
                  <div className="text-center py-8 text-white/40">Loading products...</div>
                ) : products.filter(p => !p.is_published).length === 0 ? (
                  <div className="text-center py-8 text-white/40">
                    <CheckCircle className="mx-auto mb-2 text-green-400" size={24} />
                    No pending products
                  </div>
                ) : (
                  <div className="space-y-3">
                    {products.filter(p => !p.is_published).slice(0, 3).map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div>
                          <div className="text-white font-medium truncate max-w-[150px]">
                            {product.title}
                          </div>
                          <div className="text-xs text-white/40">
                            by {product.creator?.display_name || product.creator?.username || 'Unknown'}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <StatusBadge status="pending" />
                          <Link href={`/admin/products/${product.id}`}>
                            <Button variant="ghost" size="sm">
                              Review
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>
            
            {/* Right Column - Payouts & Recent Users */}
            <div className="space-y-8">
              
              {/* Pending Payouts */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <DollarSign size={18} className="text-green-400" />
                    Pending Payouts
                  </h2>
                  <Link href="/admin/residuals" className="text-sm text-cyan-400 hover:underline">
                    Process
                  </Link>
                </div>
                
                {loadingPayouts ? (
                  <div className="text-center py-8 text-white/40">Loading payouts...</div>
                ) : pendingPayouts.length === 0 ? (
                  <div className="text-center py-8 text-white/40">
                    <CheckCircle className="mx-auto mb-2 text-green-400" size={24} />
                    No pending payouts
                  </div>
                ) : (
                  <div className="space-y-3">
                    {pendingPayouts.slice(0, 3).map((payout) => (
                      <div key={payout.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div>
                          <div className="text-white font-medium">
                            ${payout.amount.toFixed(2)}
                          </div>
                          <div className="text-xs text-white/40">
                            {payout.calculation_note || 'Residual payment'}
                          </div>
                        </div>
                        <StatusBadge status="pending" />
                      </div>
                    ))}
                    {pendingPayouts.length > 3 && (
                      <div className="text-center text-xs text-white/40 mt-2">
                        +{pendingPayouts.length - 3} more
                      </div>
                    )}
                  </div>
                )}
              </Card>
              
              {/* Recent Users */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Users size={18} className="text-cyan-400" />
                    Recent Users
                  </h2>
                  <Link href="/admin/users" className="text-sm text-cyan-400 hover:underline">
                    View all
                  </Link>
                </div>
                
                {loadingUsers ? (
                  <div className="text-center py-8 text-white/40">Loading users...</div>
                ) : users.length === 0 ? (
                  <div className="text-center py-8 text-white/40">No users yet</div>
                ) : (
                  <div className="space-y-3">
                    {users.slice(0, 5).map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div>
                          <div className="text-white font-medium">
                            {user.display_name || user.username || user.email}
                          </div>
                          <div className="text-xs text-white/40">
                            Joined {new Date(user.created_at || '').toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {user.is_creator && <Badge variant="success" size="sm">C</Badge>}
                          {user.is_vendor && <Badge variant="success" size="sm">V</Badge>}
                          {user.is_admin && <Badge variant="primary" size="sm">A</Badge>}
                          {user.status === 'suspended' && <Badge variant="error" size="sm">S</Badge>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="mt-8 grid md:grid-cols-4 gap-4">
            <Link href="/admin/users">
              <Button variant="outline" className="w-full justify-start">
                <Users size={16} className="mr-2" />
                Manage Users
              </Button>
            </Link>
            <Link href="/admin/applications">
              <Button variant="outline" className="w-full justify-start">
                <ClipboardList size={16} className="mr-2" />
                Review Applications
              </Button>
            </Link>
            <Link href="/admin/products">
              <Button variant="outline" className="w-full justify-start">
                <Package size={16} className="mr-2" />
                Moderate Products
              </Button>
            </Link>
            <Link href="/admin/transparency">
              <Button variant="outline" className="w-full justify-start">
                <Activity size={16} className="mr-2" />
                Transparency Log
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </Page>
  );
}