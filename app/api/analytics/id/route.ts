// =====================================================
// FILE: app/api/analytics/[id]/route.ts
// GENERATED: 2026-04-06T00:00:37.945Z
// METHODS: GET_SINGLE, PUT, DELETE
// =====================================================

// =====================================================
// GET /api/analytics/[id] - Get single analytics
// =====================================================

import { NextRequest } from 'next/server';
import { createApiSupabase } from '@/lib/api/supabase';
import { successResponse, errorResponse, notFound } from '@/lib/api/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('analytics')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return notFound('analytics');
      }
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return errorResponse('Failed to fetch analytics', 500);
  }
}

// =====================================================
// PUT /api/analytics/[id] - Update analytics
// =====================================================

import { NextRequest } from 'next/server';
import { createApiSupabase } from '@/lib/api/supabase';
import { successResponse, errorResponse, unauthorized, notFound, forbidden } from '@/lib/api/auth';
import { getAuthenticatedUser, checkOwnership, isAdmin } from '@/lib/api/auth';
import { AnalyticsInsertSchema } from '@/lib/validators/analytics';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { userId, success, error: authError, status } = await getAuthenticatedUser(request);
    if (!success) {
      return unauthorized();
    }
    
    // Check ownership or admin
    const ownsRecord = await checkOwnership(userId, 'analytics', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) {
      return forbidden();
    }
    
    const body = await request.json();
    const validated = AnalyticsInsertSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('analytics')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return notFound('analytics');
      }
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.errors);
    }
    console.error('Error updating analytics:', error);
    return errorResponse('Failed to update analytics', 500);
  }
}

// =====================================================
// DELETE /api/analytics/[id] - Delete analytics
// =====================================================

import { NextRequest } from 'next/server';
import { createApiSupabase } from '@/lib/api/supabase';
import { successResponse, errorResponse, unauthorized, notFound, forbidden } from '@/lib/api/auth';
import { getAuthenticatedUser, checkOwnership, isAdmin } from '@/lib/api/auth';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { userId, success, error: authError, status } = await getAuthenticatedUser(request);
    if (!success) {
      return unauthorized();
    }
    
    // Check ownership or admin
    const ownsRecord = await checkOwnership(userId, 'analytics', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) {
      return forbidden();
    }
    
    const supabase = await createApiSupabase();
    const { error } = await supabase
      .from('analytics')
      .delete()
      .eq('id', id);
    
    if (error) {
      if (error.code === 'PGRST116') {
        return notFound('analytics');
      }
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting analytics:', error);
    return errorResponse('Failed to delete analytics', 500);
  }
}

