// lib/auth.ts
// Auth helpers for App Router (server components)
// Use this in server components and server actions

import { createServerSupabase } from '@/lib/supabase/server';
import { type User } from '@supabase/supabase-js';

export interface Session {
  user: User | null;
  profile: Profile | null;
}

export interface Profile {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  email: string;
  user_tier: 'community' | 'ally' | 'corporate' | 'council';
  sovereignty_score: number;
  is_admin: boolean;
  is_creator: boolean;
  is_vendor: boolean;
  is_quantum_weaver: boolean;
  primary_house: string | null;
  status: 'active' | 'suspended' | 'deleted';
  created_at: string;
  updated_at: string;
}

/**
 * Get the current authenticated session
 * Use this in server components and server actions
 */
export async function auth(): Promise<Session> {
  const supabase = await createServerSupabase();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { user: null, profile: null };
  }
  
  // Fetch user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('profiles_id', user.id)
    .single();
  
  return {
    user,
    profile: profile as Profile | null,
  };
}

/**
 * Get just the user (shorthand)
 */
export async function getUser(): Promise<User | null> {
  const { user } = await auth();
  return user;
}

/**
 * Get just the profile (shorthand)
 */
export async function getProfile(): Promise<Profile | null> {
  const { profile } = await auth();
  return profile;
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const { user } = await auth();
  return user !== null;
}

/**
 * Check if user is admin
 */
export async function isAdmin(): Promise<boolean> {
  const { profile } = await auth();
  return profile?.is_admin === true;
}

/**
 * Check if user is creator
 */
export async function isCreator(): Promise<boolean> {
  const { profile } = await auth();
  return profile?.is_creator === true;
}

/**
 * Check if user is vendor
 */
export async function isVendor(): Promise<boolean> {
  const { profile } = await auth();
  return profile?.is_vendor === true;
}

/**
 * Check if user is quantum weaver
 */
export async function isQuantumWeaver(): Promise<boolean> {
  const { profile } = await auth();
  return profile?.is_quantum_weaver === true;
}

/**
 * Get user's tier
 */
export async function getUserTier(): Promise<Profile['user_tier'] | null> {
  const { profile } = await auth();
  return profile?.user_tier || null;
}

/**
 * Get user's sovereignty score
 */
export async function getSovereigntyScore(): Promise<number | null> {
  const { profile } = await auth();
  return profile?.sovereignty_score || null;
}

/**
 * Require authentication (redirects if not authenticated)
 * Use in server components that require login
 */
export async function requireAuth(): Promise<Session> {
  const session = await auth();
  
  if (!session.user) {
    // Cannot redirect in server component directly,
    // throw an error that can be caught by middleware or return null
    throw new Error('Unauthorized: Please log in');
  }
  
  return session;
}

/**
 * Require admin (redirects if not admin)
 */
export async function requireAdmin(): Promise<Session> {
  const session = await auth();
  
  if (!session.user) {
    throw new Error('Unauthorized: Please log in');
  }
  
  if (!session.profile?.is_admin) {
    throw new Error('Forbidden: Admin access required');
  }
  
  return session;
}

/**
 * Require creator role
 */
export async function requireCreator(): Promise<Session> {
  const session = await auth();
  
  if (!session.user) {
    throw new Error('Unauthorized: Please log in');
  }
  
  if (!session.profile?.is_creator) {
    throw new Error('Forbidden: Creator access required');
  }
  
  return session;
}

/**
 * Require vendor role
 */
export async function requireVendor(): Promise<Session> {
  const session = await auth();
  
  if (!session.user) {
    throw new Error('Unauthorized: Please log in');
  }
  
  if (!session.profile?.is_vendor) {
    throw new Error('Forbidden: Vendor access required');
  }
  
  return session;
}