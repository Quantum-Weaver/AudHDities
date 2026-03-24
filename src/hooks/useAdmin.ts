// src/hooks/useAdmin.ts
'use client';

import { useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from './useAuth';
import type { Database } from '@/types/supabase/database.types';

// Types for admin data
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type CreatorProfile = Database['public']['Tables']['creator_profiles']['Row'];
export type VendorProfile = Database['public']['Tables']['vendor_profiles']['Row'];
export type Application = Database['public']['Tables']['applications']['Row'];
export type Product = Database['public']['Tables']['products']['Row'];
export type ResidualPayout = Database['public']['Tables']['residual_payouts']['Row'];
export type AdminLog = Database['public']['Tables']['admin_logs']['Row'];

export type ApplicationWithUser = Application & {
  user: Profile;
};

export type ProductWithCreator = Product & {
  creator: Pick<Profile, 'id' | 'username' | 'display_name' | 'avatar_url'>;
};

export type UserWithRoles = Profile & {
  creator_profile: CreatorProfile | null;
  vendor_profile: VendorProfile | null;
};

interface UseAdminReturn {
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
  addPublicNote: (action: string, publicNote: string, metadata?: Record<string, any>) => Promise<boolean>;
  
  // Loading states
  loading: boolean;
  error: Error | null;
}

export function useAdmin(): UseAdminReturn {
  const { user } = useAuth();
  const supabase = createClient();
  
  // State
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
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
  
  // Verify admin status on mount
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single();
      
      setIsAdmin(profile?.is_admin === true);
      setLoading(false);
    };
    
    checkAdminStatus();
  }, [user, supabase]);
  
  // Helper to check admin access
  const requireAdmin = () => {
    if (!isAdmin) {
      throw new Error('Admin access required');
    }
  };
  
  // =====================================================
  // USER MANAGEMENT
  // =====================================================
  
  const fetchUsers = useCallback(async (options?: { limit?: number; role?: string; search?: string }) => {
    try {
      requireAdmin();
      setLoadingUsers(true);
      
      let query = supabase
        .from('profiles')
        .select(`
          *,
          creator_profile:creator_profiles(*),
          vendor_profile:vendor_profiles(*)
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
      
      setUsers(data as UserWithRoles[]);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch users'));
    } finally {
      setLoadingUsers(false);
    }
  }, [isAdmin, supabase]);
  
  const updateUserRole = useCallback(async (
    userId: string,
    updates: { is_creator?: boolean; is_vendor?: boolean; is_admin?: boolean }
  ): Promise<boolean> => {
    try {
      requireAdmin();
      
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
  }, [isAdmin, supabase, fetchUsers]);
  
  const suspendUser = useCallback(async (userId: string, reason?: string): Promise<boolean> => {
    try {
      requireAdmin();
      
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
  }, [isAdmin, supabase, fetchUsers]);
  
  const reinstateUser = useCallback(async (userId: string): Promise<boolean> => {
    try {
      requireAdmin();
      
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
  }, [isAdmin, supabase, fetchUsers]);
  
  // =====================================================
  // APPLICATION MANAGEMENT
  // =====================================================
  
  const fetchApplications = useCallback(async (status?: string) => {
    try {
      requireAdmin();
      setLoadingApplications(true);
      
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
      
      setApplications(data as ApplicationWithUser[]);
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch applications'));
    } finally {
      setLoadingApplications(false);
    }
  }, [isAdmin, supabase]);
  
  const approveApplication = useCallback(async (
    applicationId: string,
    type: 'creator' | 'vendor',
    notes?: string
  ): Promise<boolean> => {
    try {
      requireAdmin();
      
      // Update application status
      const { error: appError } = await supabase
        .from('applications')
        .update({
          status: 'verified',
          reviewed_at: new Date().toISOString(),
          reviewed_by: user?.id,
          review_notes: notes,
        })
        .eq('id', applicationId);
      
      if (appError) throw appError;
      
      // Get the user ID from the application
      const { data: app } = await supabase
        .from('applications')
        .select('user_id')
        .eq('id', applicationId)
        .single();
      
      if (app?.user_id) {
        // Update user profile with creator/vendor role
        const updateField = type === 'creator' ? { is_creator: true } : { is_vendor: true };
        
        const { error: profileError } = await supabase
          .from('profiles')
          .update(updateField)
          .eq('id', app.user_id);
        
        if (profileError) throw profileError;
        
        // Award verification badge
        const badgeName = type === 'creator' ? 'verified_creator' : 'verified_vendor';
        await supabase.rpc('award_badge', {
          user_id: app.user_id,
          badge_name: badgeName,
        });
      }
      
      await addPublicNote(
        `application_approved_${type}`,
        `Approved ${type} application for user ${app?.user_id}${notes ? `: ${notes}` : ''}`,
        { applicationId, type, notes }
      );
      
      await fetchApplications();
      return true;
    } catch (err) {
      console.error('Error approving application:', err);
      return false;
    }
  }, [isAdmin, supabase, user, fetchApplications]);
  
  const rejectApplication = useCallback(async (applicationId: string, reason: string): Promise<boolean> => {
    try {
      requireAdmin();
      
      const { error: appError } = await supabase
        .from('applications')
        .update({
          status: 'rejected',
          reviewed_at: new Date().toISOString(),
          reviewed_by: user?.id,
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
      return false;
    }
  }, [isAdmin, supabase, user, fetchApplications]);
  
  // =====================================================
  // PRODUCT MODERATION
  // =====================================================
  
  const fetchProductsForModeration = useCallback(async (options?: { status?: string; search?: string }) => {
    try {
      requireAdmin();
      setLoadingProducts(true);
      
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
      
      setProducts(data as ProductWithCreator[]);
    } catch (err) {
      console.error('Error fetching products for moderation:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch products'));
    } finally {
      setLoadingProducts(false);
    }
  }, [isAdmin, supabase]);
  
  const moderateProduct = useCallback(async (
    productId: string,
    action: 'approve' | 'reject' | 'flag',
    notes?: string
  ): Promise<boolean> => {
    try {
      requireAdmin();
      
      let updateData: any = {};
      
      if (action === 'approve') {
        updateData = { is_published: true, active: true };
      } else if (action === 'reject') {
        updateData = { is_published: false, active: false };
      } else if (action === 'flag') {
        updateData = { flagged: true }; // You'd need to add flagged column if desired
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
      return false;
    }
  }, [isAdmin, supabase, fetchProductsForModeration]);
  
  // =====================================================
  // RESIDUAL MANAGEMENT
  // =====================================================
  
  const fetchPendingPayouts = useCallback(async () => {
    try {
      requireAdmin();
      setLoadingPayouts(true);
      
      const { data, error: fetchError } = await supabase
        .from('residual_payouts')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: true });
      
      if (fetchError) throw fetchError;
      
      setPendingPayouts(data || []);
    } catch (err) {
      console.error('Error fetching pending payouts:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch pending payouts'));
    } finally {
      setLoadingPayouts(false);
    }
  }, [isAdmin, supabase]);
  
  const markPayoutsPaid = useCallback(async (payoutIds: string[]): Promise<boolean> => {
    try {
      requireAdmin();
      
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
      return false;
    }
  }, [isAdmin, supabase, fetchPendingPayouts]);
  
  // =====================================================
  // TRANSPARENCY LOGS
  // =====================================================
  
  const addPublicNote = useCallback(async (
    action: string,
    publicNote: string,
    metadata?: Record<string, any>
  ): Promise<boolean> => {
    try {
      if (!user) return false;
      
      const { error } = await supabase
        .from('admin_logs')
        .insert({
          admin_id: user.id,
          action,
          public_note: publicNote,
          metadata,
        });
      
      if (error) throw error;
      
      return true;
    } catch (err) {
      console.error('Error adding public note:', err);
      return false;
    }
  }, [user, supabase]);
  
  return {
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