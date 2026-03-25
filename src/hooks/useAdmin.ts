'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from './useAuth';
import type { Database } from '@/types/supabase/database.types';

// Types from database.types.ts
type Profile = Database['public']['Tables']['profiles']['Row'];
type CreatorProfile = Database['public']['Tables']['creator_profiles']['Row'];
type VendorProfile = Database['public']['Tables']['vendor_profiles']['Row'];
type Application = Database['public']['Tables']['applications']['Row'];
type Product = Database['public']['Tables']['products']['Row'];
type ResidualPayout = Database['public']['Tables']['residual_payouts']['Row'];
type AdminLog = Database['public']['Tables']['admin_logs']['Row'];

export type ApplicationWithUser = Application & {
  user: Pick<Profile, 'id' | 'username' | 'display_name' | 'email' | 'avatar_url'> | null;
};

export type ProductWithCreator = Product & {
  creator: Pick<Profile, 'id' | 'username' | 'display_name' | 'avatar_url'> | null;
};

export type UserWithRoles = Profile & {
  creator_profile: CreatorProfile | null;
  vendor_profile: VendorProfile | null;
};

interface UseAdminReturn {
  // Status
  isAdmin: boolean;
  checkingAdmin: boolean;
  
  // User Management
  users: UserWithRoles[];
  loadingUsers: boolean;
  fetchUsers: (options?: { limit?: number; role?: string; search?: string }) => Promise<void>;
  updateUserRole: (userId: string, updates: { is_creator?: boolean; is_vendor?: boolean; is_admin?: boolean }) => Promise<boolean>;
  suspendUser: (userId: string, reason?: string) => Promise<boolean>;
  reinstateUser: (userId: string) => Promise<boolean>;
  
  // Application Management
  applications: ApplicationWithUser[];
  loadingApplications: boolean;
  fetchApplications: (status?: string) => Promise<void>;
  approveApplication: (applicationId: string, type: 'creator' | 'vendor', notes?: string) => Promise<boolean>;
  rejectApplication: (applicationId: string, reason: string) => Promise<boolean>;
  
  // Product Moderation
  products: ProductWithCreator[];
  loadingProducts: boolean;
  fetchProductsForModeration: (options?: { status?: string; search?: string }) => Promise<void>;
  moderateProduct: (productId: string, action: 'approve' | 'reject' | 'flag', notes?: string) => Promise<boolean>;
  
  // Residual Management
  pendingPayouts: ResidualPayout[];
  loadingPayouts: boolean;
  fetchPendingPayouts: () => Promise<void>;
  markPayoutsPaid: (payoutIds: string[]) => Promise<boolean>;
  
  // Transparency Logs
  addPublicNote: (action: string, publicNote: string, metadata?: Record<string, unknown>) => Promise<boolean>;
  
  // Loading states
  loading: boolean;
  error: Error | null;
}

export function useAdmin(): UseAdminReturn {
  const { user } = useAuth();
  const supabase = createClient();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  // User Management
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  
  // Application Management
  const [applications, setApplications] = useState<ApplicationWithUser[]>([]);
  const [loadingApplications, setLoadingApplications] = useState(false);
  
  // Product Moderation
  const [products, setProducts] = useState<ProductWithCreator[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  
  // Residual Management
  const [pendingPayouts, setPendingPayouts] = useState<ResidualPayout[]>([]);
  const [loadingPayouts, setLoadingPayouts] = useState(false);
  
  // Check admin status on mount
  useEffect(() => {
    const checkAdminStatus = async () => {
      setCheckingAdmin(true);
      
      if (!user?.id) {
        setIsAdmin(false);
        setCheckingAdmin(false);
        return;
      }
      
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single();
        
        setIsAdmin(profile?.is_admin ?? false);
      } catch {
        setIsAdmin(false);
      } finally {
        setCheckingAdmin(false);
      }
    };
    
    checkAdminStatus();
  }, [user?.id, supabase]);
  
  // Helper to check admin access
  const requireAdmin = useCallback((): boolean => {
    if (!isAdmin) {
      setError(new Error('Admin access required'));
      return false;
    }
    return true;
  }, [isAdmin]);
  
  // =====================================================
  // TRANSPARENCY LOGS (defined first for use in other functions)
  // =====================================================
  
  const addPublicNote = useCallback(async (
    action: string,
    publicNote: string,
    metadata?: Record<string, unknown>
  ): Promise<boolean> => {
    if (!user?.id) return false;
    if (!requireAdmin()) return false;
    
    try {
      const { error: insertError } = await supabase
        .from('admin_logs')
        .insert({
          admin_id: user.id,
          action,
          public_note: publicNote,
          metadata: metadata ?? null,
          created_at: new Date().toISOString(),
        });
      
      if (insertError) throw insertError;
      return true;
    } catch (err) {
      console.error('Error adding public note:', err);
      return false;
    }
  }, [user?.id, supabase, requireAdmin]);
  
  // =====================================================
  // USER MANAGEMENT
  // =====================================================
  
  const fetchUsers = useCallback(async (options?: { limit?: number; role?: string; search?: string }) => {
    if (!requireAdmin()) return;
    
    setLoadingUsers(true);
    setError(null);
    
    try {
      let query = supabase
        .from('profiles')
        .select(`
          *,
          creator_profile:creator_profiles!profiles_id_fkey1(*),
          vendor_profile:vendor_profiles!profiles_id_fkey2(*)
        `);
      
      // Filter by role
      if (options?.role === 'creator') {
        query = query.eq('is_creator', true);
      } else if (options?.role === 'vendor') {
        query = query.eq('is_vendor', true);
      } else if (options?.role === 'admin') {
        query = query.eq('is_admin', true);
      }
      
      // Search by username or email
      if (options?.search) {
        query = query.or(`username.ilike.%${options.search}%,email.ilike.%${options.search}%`);
      }
      
      // Limit
      if (options?.limit) {
        query = query.limit(options.limit);
      }
      
      const { data, error: fetchError } = await query.order('created_at', { ascending: false });
      
      if (fetchError) throw fetchError;
      
      setUsers(data as UserWithRoles[] ?? []);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch users'));
    } finally {
      setLoadingUsers(false);
    }
  }, [supabase, requireAdmin]);
  
  const updateUserRole = useCallback(async (
    userId: string,
    updates: { is_creator?: boolean; is_vendor?: boolean; is_admin?: boolean }
  ): Promise<boolean> => {
    if (!requireAdmin()) return false;
    
    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId);
      
      if (updateError) throw updateError;
      
      // Add to admin log
      const actions = [];
      if (updates.is_creator !== undefined) actions.push(`is_creator = ${updates.is_creator}`);
      if (updates.is_vendor !== undefined) actions.push(`is_vendor = ${updates.is_vendor}`);
      if (updates.is_admin !== undefined) actions.push(`is_admin = ${updates.is_admin}`);
      
      await addPublicNote(
        'user_role_updated',
        `Updated user ${userId}: ${actions.join(', ')}`,
        { userId, updates }
      );
      
      // Refresh user list
      await fetchUsers();
      
      return true;
    } catch (err) {
      console.error('Error updating user role:', err);
      setError(err instanceof Error ? err : new Error('Failed to update user role'));
      return false;
    }
  }, [supabase, requireAdmin, addPublicNote, fetchUsers]);
  
  const suspendUser = useCallback(async (userId: string, reason?: string): Promise<boolean> => {
    if (!requireAdmin()) return false;
    
    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ status: 'suspended' })
        .eq('id', userId);
      
      if (updateError) throw updateError;
      
      await addPublicNote(
        'user_suspended',
        `Suspended user ${userId}${reason ? `: ${reason}` : ''}`,
        { userId, reason }
      );
      
      await fetchUsers();
      return true;
    } catch (err) {
      console.error('Error suspending user:', err);
      return false;
    }
  }, [supabase, requireAdmin, addPublicNote, fetchUsers]);
  
  const reinstateUser = useCallback(async (userId: string): Promise<boolean> => {
    if (!requireAdmin()) return false;
    
    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ status: 'active' })
        .eq('id', userId);
      
      if (updateError) throw updateError;
      
      await addPublicNote(
        'user_reinstated',
        `Reinstated user ${userId}`,
        { userId }
      );
      
      await fetchUsers();
      return true;
    } catch (err) {
      console.error('Error reinstating user:', err);
      return false;
    }
  }, [supabase, requireAdmin, addPublicNote, fetchUsers]);
  
  // =====================================================
  // APPLICATION MANAGEMENT
  // =====================================================
  
  const fetchApplications = useCallback(async (status?: string) => {
    if (!requireAdmin()) return;
    
    setLoadingApplications(true);
    setError(null);
    
    try {
      let query = supabase
        .from('applications')
        .select(`
          *,
          user:user_id(id, username, display_name, email, avatar_url)
        `)
        .order('created_at', { ascending: false });
      
      if (status) {
        query = query.eq('status', status);
      }
      
      const { data, error: fetchError } = await query;
      
      if (fetchError) throw fetchError;
      
      setApplications(data as ApplicationWithUser[] ?? []);
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch applications'));
    } finally {
      setLoadingApplications(false);
    }
  }, [supabase, requireAdmin]);
  
  const approveApplication = useCallback(async (
    applicationId: string,
    type: 'creator' | 'vendor',
    notes?: string
  ): Promise<boolean> => {
    if (!requireAdmin()) return false;
    if (!user?.id) return false;
    
    try {
      // Get the user ID from the application
      const { data: app, error: appFetchError } = await supabase
        .from('applications')
        .select('user_id')
        .eq('id', applicationId)
        .single();
      
      if (appFetchError) throw appFetchError;
      if (!app?.user_id) throw new Error('Application has no user');
      
      // Update application status
      const { error: appError } = await supabase
        .from('applications')
        .update({
          status: 'verified',
          reviewed_at: new Date().toISOString(),
          reviewed_by: user.id,
          review_notes: notes ?? null,
        })
        .eq('id', applicationId);
      
      if (appError) throw appError;
      
      // Update user profile with creator/vendor role
      const updateField = type === 'creator' ? { is_creator: true } : { is_vendor: true };
      
      const { error: profileError } = await supabase
        .from('profiles')
        .update(updateField)
        .eq('id', app.user_id);
      
      if (profileError) throw profileError;
      
      // Create/update profile extension
      if (type === 'creator') {
        await supabase
          .from('creator_profiles')
          .upsert({
            id: app.user_id,
            verified_badge: true,
            verification_status: 'verified',
            verified_at: new Date().toISOString(),
            verified_by: user.id,
          }, { onConflict: 'id' });
      } else {
        await supabase
          .from('vendor_profiles')
          .upsert({
            id: app.user_id,
            verified_badge: true,
            verification_status: 'verified',
            verified_at: new Date().toISOString(),
            verified_by: user.id,
          }, { onConflict: 'id' });
      }
      
      await addPublicNote(
        `application_approved_${type}`,
        `Approved ${type} application for user ${app.user_id}${notes ? `: ${notes}` : ''}`,
        { applicationId, type, notes }
      );
      
      await fetchApplications();
      return true;
    } catch (err) {
      console.error('Error approving application:', err);
      setError(err instanceof Error ? err : new Error('Failed to approve application'));
      return false;
    }
  }, [user?.id, supabase, requireAdmin, addPublicNote, fetchApplications]);
  
  const rejectApplication = useCallback(async (applicationId: string, reason: string): Promise<boolean> => {
    if (!requireAdmin()) return false;
    if (!user?.id) return false;
    
    try {
      const { error: appError } = await supabase
        .from('applications')
        .update({
          status: 'rejected',
          reviewed_at: new Date().toISOString(),
          reviewed_by: user.id,
          review_notes: reason,
        })
        .eq('id', applicationId);
      
      if (appError) throw appError;
      
      await addPublicNote(
        'application_rejected',
        `Rejected application ${applicationId}: ${reason}`,
        { applicationId, reason }
      );
      
      await fetchApplications();
      return true;
    } catch (err) {
      console.error('Error rejecting application:', err);
      setError(err instanceof Error ? err : new Error('Failed to reject application'));
      return false;
    }
  }, [user?.id, supabase, requireAdmin, addPublicNote, fetchApplications]);
  
  // =====================================================
  // PRODUCT MODERATION
  // =====================================================
  
  const fetchProductsForModeration = useCallback(async (options?: { status?: string; search?: string }) => {
    if (!requireAdmin()) return;
    
    setLoadingProducts(true);
    setError(null);
    
    try {
      let query = supabase
        .from('products')
        .select(`
          *,
          creator:creator_id(id, username, display_name, avatar_url)
        `);
      
      if (options?.status === 'pending') {
        query = query.eq('is_published', false);
      } else if (options?.status === 'published') {
        query = query.eq('is_published', true);
      }
      
      if (options?.search) {
        query = query.ilike('title', `%${options.search}%`);
      }
      
      const { data, error: fetchError } = await query.order('created_at', { ascending: false });
      
      if (fetchError) throw fetchError;
      
      setProducts(data as ProductWithCreator[] ?? []);
    } catch (err) {
      console.error('Error fetching products for moderation:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch products'));
    } finally {
      setLoadingProducts(false);
    }
  }, [supabase, requireAdmin]);
  
  const moderateProduct = useCallback(async (
    productId: string,
    action: 'approve' | 'reject' | 'flag',
    notes?: string
  ): Promise<boolean> => {
    if (!requireAdmin()) return false;
    
    try {
      let updateData: Record<string, unknown> = {};
      
      if (action === 'approve') {
        updateData = { is_published: true, active: true };
      } else if (action === 'reject') {
        updateData = { is_published: false, active: false };
      } else if (action === 'flag') {
        // You'd need to add a flagged column if desired
        updateData = {};
      }
      
      const { error: updateError } = await supabase
        .from('products')
        .update(updateData)
        .eq('id', productId);
      
      if (updateError) throw updateError;
      
      await addPublicNote(
        `product_${action}`,
        `${action.charAt(0).toUpperCase() + action.slice(1)}d product ${productId}${notes ? `: ${notes}` : ''}`,
        { productId, action, notes }
      );
      
      await fetchProductsForModeration();
      return true;
    } catch (err) {
      console.error('Error moderating product:', err);
      setError(err instanceof Error ? err : new Error('Failed to moderate product'));
      return false;
    }
  }, [supabase, requireAdmin, addPublicNote, fetchProductsForModeration]);
  
  // =====================================================
  // RESIDUAL MANAGEMENT
  // =====================================================
  
  const fetchPendingPayouts = useCallback(async () => {
    if (!requireAdmin()) return;
    
    setLoadingPayouts(true);
    setError(null);
    
    try {
      const { data, error: fetchError } = await supabase
        .from('residual_payouts')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: true });
      
      if (fetchError) throw fetchError;
      
      setPendingPayouts(data ?? []);
    } catch (err) {
      console.error('Error fetching pending payouts:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch pending payouts'));
    } finally {
      setLoadingPayouts(false);
    }
  }, [supabase, requireAdmin]);
  
  const markPayoutsPaid = useCallback(async (payoutIds: string[]): Promise<boolean> => {
    if (!requireAdmin()) return false;
    
    try {
      const { error: updateError } = await supabase
        .from('residual_payouts')
        .update({
          status: 'paid',
          paid_at: new Date().toISOString(),
        })
        .in('id', payoutIds);
      
      if (updateError) throw updateError;
      
      await addPublicNote(
        'payouts_processed',
        `Processed ${payoutIds.length} residual payouts`,
        { payoutIds, count: payoutIds.length }
      );
      
      await fetchPendingPayouts();
      return true;
    } catch (err) {
      console.error('Error marking payouts as paid:', err);
      setError(err instanceof Error ? err : new Error('Failed to process payouts'));
      return false;
    }
  }, [supabase, requireAdmin, addPublicNote, fetchPendingPayouts]);
  
  return {
    // Status
    isAdmin,
    checkingAdmin,
    
    // User Management
    users,
    loadingUsers,
    fetchUsers,
    updateUserRole,
    suspendUser,
    reinstateUser,
    
    // Application Management
    applications,
    loadingApplications,
    fetchApplications,
    approveApplication,
    rejectApplication,
    
    // Product Moderation
    products,
    loadingProducts,
    fetchProductsForModeration,
    moderateProduct,
    
    // Residual Management
    pendingPayouts,
    loadingPayouts,
    fetchPendingPayouts,
    markPayoutsPaid,
    
    // Transparency
    addPublicNote,
    
    // Loading states
    loading,
    error,
  };
}