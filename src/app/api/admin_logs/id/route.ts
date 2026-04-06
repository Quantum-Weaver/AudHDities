// =====================================================
// FILE: app/api/admin_logs/[id]/route.ts
// GENERATED: 2026-04-06T00:38:33.405Z
// METHODS: GET_SINGLE, PUT, DELETE
// =====================================================

// =====================================================
// GET /api/admin_logs/[id] - Get single admin_logs
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
      .from('admin_logs')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return notFound('admin_logs');
      }
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching admin_logs:', error);
    return errorResponse('Failed to fetch admin_logs', 500);
  }
}

// =====================================================
// PUT /api/admin_logs/[id] - Update admin_logs
// =====================================================

import { NextRequest } from 'next/server';
import { createApiSupabase } from '@/lib/api/supabase';
import { successResponse, errorResponse, unauthorized, notFound, forbidden } from '@/lib/api/auth';
import { getAuthenticatedUser, checkOwnership, isAdmin } from '@/lib/api/auth';
import { AdminLogsInsertSchema } from '@/lib/validators/admin_logs';

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
    const ownsRecord = await checkOwnership(userId, 'admin_logs', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) {
      return forbidden();
    }
    
    const body = await request.json();
    const validated = AdminLogsInsertSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('admin_logs')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return notFound('admin_logs');
      }
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.errors);
    }
    console.error('Error updating admin_logs:', error);
    return errorResponse('Failed to update admin_logs', 500);
  }
}

// =====================================================
// DELETE /api/admin_logs/[id] - Delete admin_logs
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
    const ownsRecord = await checkOwnership(userId, 'admin_logs', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) {
      return forbidden();
    }
    
    const supabase = await createApiSupabase();
    const { error } = await supabase
      .from('admin_logs')
      .delete()
      .eq('id', id);
    
    if (error) {
      if (error.code === 'PGRST116') {
        return notFound('admin_logs');
      }
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting admin_logs:', error);
    return errorResponse('Failed to delete admin_logs', 500);
  }
}

