// src/(dashboard)/admin/users/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Page } from '@/components/layout/Page';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { 
  Users, 
  Search, 
  Shield, 
  Palette, 
  Store, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  MoreVertical,
  UserCheck,
  UserX,
  Crown
} from 'lucide-react';
import { useAdmin } from '@/hooks/useAdmin';
import { useRequireRole } from '@/hooks/useRequireRole';

// Role badge component
const RoleBadge = ({ role, value }: { role: 'admin' | 'creator' | 'vendor'; value: boolean }) => {
  if (!value) return null;
  
  const config = {
    admin: { icon: Crown, label: 'Admin', color: 'purple' },
    creator: { icon: Palette, label: 'Creator', color: 'cyan' },
    vendor: { icon: Store, label: 'Vendor', color: 'green' },
  };
  
  const { icon: Icon, label, color } = config[role];
  
  return (
    <Badge variant="outline" className={`border-${color}-500/30 text-${color}-400`}>
      <Icon size={12} className="mr-1" />
      {label}
    </Badge>
  );
};

// Status badge
const StatusBadge = ({ status }: { status: string }) => {
  const variants: Record<string, { variant: 'success' | 'warning' | 'error' | 'info' | 'outline'; label: string }> = {
    active: { variant: 'success', label: 'Active' },
    suspended: { variant: 'error', label: 'Suspended' },
    deleted: { variant: 'error', label: 'Deleted' },
  };
  
  const config = variants[status] || { variant: 'outline', label: status };
  
  return <Badge variant={config.variant}>{config.label}</Badge>;
};

export default function AdminUsersPage() {
  const { loading: roleLoading } = useRequireRole('admin', '/dashboard');
  
  const {
    users,
    loadingUsers,
    fetchUsers,
    updateUserRole,
    suspendUser,
    reinstateUser,
  } = useAdmin();

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [actionUserId, setActionUserId] = useState<string | null>(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState<'suspend' | 'reinstate' | 'role' | null>(null);
  const [selectedRole, setSelectedRole] = useState<'creator' | 'vendor' | 'admin' | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch users on mount and when filters change
  useEffect(() => {
    const loadUsers = async () => {
      await fetchUsers({
        limit: 50,
        role: roleFilter !== 'all' ? roleFilter : undefined,
        search: searchTerm || undefined,
      });
    };
    loadUsers();
  }, [fetchUsers, roleFilter, searchTerm]);

  // Handle user suspension
  const handleSuspendUser = async (userId: string) => {
    setActionLoading(true);
    const success = await suspendUser(userId);
    if (success) {
      await fetchUsers();
    }
    setActionLoading(false);
    setShowActionModal(false);
    setActionUserId(null);
  };

  // Handle user reinstatement
  const handleReinstateUser = async (userId: string) => {
    setActionLoading(true);
    const success = await reinstateUser(userId);
    if (success) {
      await fetchUsers();
    }
    setActionLoading(false);
    setShowActionModal(false);
    setActionUserId(null);
  };

  // Handle role update
  const handleRoleUpdate = async (userId: string, role: 'creator' | 'vendor' | 'admin') => {
    setActionLoading(true);
    
    const updates: any = {};
    if (role === 'creator') updates.is_creator = true;
    if (role === 'vendor') updates.is_vendor = true;
    if (role === 'admin') updates.is_admin = true;
    
    const success = await updateUserRole(userId, updates);
    if (success) {
      await fetchUsers();
    }
    setActionLoading(false);
    setShowActionModal(false);
    setActionUserId(null);
    setSelectedRole(null);
  };

  // Open action modal
  const openActionModal = (userId: string, type: 'suspend' | 'reinstate' | 'role') => {
    setActionUserId(userId);
    setActionType(type);
    setShowActionModal(true);
  };

  if (roleLoading) {
    return (
      <Page>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white/60">Loading...</div>
        </div>
      </Page>
    );
  }

  // Get user for action modal
  const actionUser = users.find(u => u.id === actionUserId);

  return (
    <Page>
      <main className="min-h-screen py-12 px-6">
        <div className="container max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
                <Users size={28} className="text-cyan-400" />
                User Management
              </h1>
              <p className="text-white/60">
                Manage sanctuary members, roles, and access
              </p>
            </div>
          </div>

          {/* Filters */}
          <Card className="p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                  <Input
                    placeholder="Search by username or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={roleFilter === 'all' ? 'primary' : 'outline'}
                  onClick={() => setRoleFilter('all')}
                  size="sm"
                >
                  All
                </Button>
                <Button
                  variant={roleFilter === 'creator' ? 'primary' : 'outline'}
                  onClick={() => setRoleFilter('creator')}
                  size="sm"
                >
                  <Palette size={14} className="mr-1" />
                  Creators
                </Button>
                <Button
                  variant={roleFilter === 'vendor' ? 'primary' : 'outline'}
                  onClick={() => setRoleFilter('vendor')}
                  size="sm"
                >
                  <Store size={14} className="mr-1" />
                  Vendors
                </Button>
                <Button
                  variant={roleFilter === 'admin' ? 'primary' : 'outline'}
                  onClick={() => setRoleFilter('admin')}
                  size="sm"
                >
                  <Shield size={14} className="mr-1" />
                  Admins
                </Button>
              </div>
            </div>
          </Card>

          {/* Users Table */}
          <Card className="overflow-hidden">
            {loadingUsers ? (
              <div className="p-12 text-center text-white/40">Loading users...</div>
            ) : users.length === 0 ? (
              <div className="p-12 text-center text-white/40">
                <Users className="mx-auto mb-2" size={32} />
                No users found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="text-left p-4 text-white/60 text-sm font-medium">User</th>
                      <th className="text-left p-4 text-white/60 text-sm font-medium">Email</th>
                      <th className="text-left p-4 text-white/60 text-sm font-medium">Joined</th>
                      <th className="text-left p-4 text-white/60 text-sm font-medium">Roles</th>
                      <th className="text-left p-4 text-white/60 text-sm font-medium">Status</th>
                      <th className="text-left p-4 text-white/60 text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                              <span className="text-sm text-white">
                                {(user.display_name || user.username || 'U')[0].toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <div className="text-white font-medium">
                                {user.display_name || user.username || 'Anonymous'}
                              </div>
                              <div className="text-xs text-white/40">
                                ID: {user.id.slice(0, 8)}...
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-white/70">{user.email}</td>
                        <td className="p-4 text-white/70">
                          {new Date(user.created_at || '').toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          <div className="flex gap-1 flex-wrap">
                            {user.is_admin && <RoleBadge role="admin" value={true} />}
                            {user.is_creator && <RoleBadge role="creator" value={true} />}
                            {user.is_vendor && <RoleBadge role="vendor" value={true} />}
                            {!user.is_admin && !user.is_creator && !user.is_vendor && (
                              <span className="text-xs text-white/40">Community Member</span>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <StatusBadge status={user.status || 'active'} />
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            {/* Role Actions */}
                            <div className="relative group">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-white/60 hover:text-white"
                              >
                                <Shield size={16} />
                              </Button>
                              <div className="absolute right-0 top-full mt-1 bg-deep-space border border-white/10 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 min-w-[140px]">
                                <div className="p-1">
                                  <button
                                    onClick={() => openActionModal(user.id, 'role')}
                                    className="w-full text-left px-3 py-2 text-sm text-white hover:bg-white/10 rounded transition-colors"
                                  >
                                    Make Creator
                                  </button>
                                  <button
                                    onClick={() => openActionModal(user.id, 'role')}
                                    className="w-full text-left px-3 py-2 text-sm text-white hover:bg-white/10 rounded transition-colors"
                                  >
                                    Make Vendor
                                  </button>
                                  {!user.is_admin && (
                                    <button
                                      onClick={() => openActionModal(user.id, 'role')}
                                      className="w-full text-left px-3 py-2 text-sm text-purple-400 hover:bg-white/10 rounded transition-colors"
                                    >
                                      Make Admin
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            {/* Suspend/Reinstate */}
                            {user.status !== 'suspended' ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openActionModal(user.id, 'suspend')}
                                className="text-red-400/60 hover:text-red-400"
                              >
                                <UserX size={16} />
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openActionModal(user.id, 'reinstate')}
                                className="text-green-400/60 hover:text-green-400"
                              >
                                <UserCheck size={16} />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>
      </main>

      {/* Action Modal */}
      {showActionModal && actionUser && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-white mb-4">
              {actionType === 'suspend' && 'Suspend User'}
              {actionType === 'reinstate' && 'Reinstate User'}
              {actionType === 'role' && 'Assign Role'}
            </h3>
            
            <p className="text-white/70 mb-6">
              {actionType === 'suspend' && `Are you sure you want to suspend ${actionUser.display_name || actionUser.username || 'this user'}? They will lose access to the sanctuary.`}
              {actionType === 'reinstate' && `Are you sure you want to reinstate ${actionUser.display_name || actionUser.username || 'this user'}? They will regain full access.`}
              {actionType === 'role' && `Select a role to assign to ${actionUser.display_name || actionUser.username || 'this user'}:`}
            </p>
            
            {actionType === 'role' && (
              <div className="space-y-2 mb-6">
                <button
                  onClick={() => handleRoleUpdate(actionUser.id, 'creator')}
                  className="w-full p-3 text-left bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Palette size={20} className="text-cyan-400" />
                    <div>
                      <div className="text-white font-medium">Creator</div>
                      <div className="text-xs text-white/40">Can sell digital and physical creations</div>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => handleRoleUpdate(actionUser.id, 'vendor')}
                  className="w-full p-3 text-left bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Store size={20} className="text-green-400" />
                    <div>
                      <div className="text-white font-medium">Vendor</div>
                      <div className="text-xs text-white/40">Can provide services to creators</div>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => handleRoleUpdate(actionUser.id, 'admin')}
                  className="w-full p-3 text-left bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Shield size={20} className="text-purple-400" />
                    <div>
                      <div className="text-white font-medium">Admin</div>
                      <div className="text-xs text-white/40">Can manage the sanctuary</div>
                    </div>
                  </div>
                </button>
              </div>
            )}
            
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setShowActionModal(false);
                  setActionUserId(null);
                  setActionType(null);
                  setSelectedRole(null);
                }}
                disabled={actionLoading}
              >
                Cancel
              </Button>
              {actionType !== 'role' && (
                <Button
                  variant={actionType === 'suspend' ? 'destructive' : 'primary'}
                  onClick={() => {
                    if (actionType === 'suspend') handleSuspendUser(actionUser.id);
                    if (actionType === 'reinstate') handleReinstateUser(actionUser.id);
                  }}
                  disabled={actionLoading}
                >
                  {actionLoading ? 'Processing...' : actionType === 'suspend' ? 'Suspend' : 'Reinstate'}
                </Button>
              )}
            </div>
          </Card>
        </div>
      )}
    </Page>
  );
}