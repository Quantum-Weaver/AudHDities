// =====================================================
// FILE: app/api/archivist/[id]/route.ts
// GENERATED: 2026-04-06T00:00:37.952Z
// METHODS: GET_SINGLE, PUT, DELETE
// =====================================================

// =====================================================
// GET /api/archivist/[id] - Get single archivist
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
      .from('archivist')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return notFound('archivist');
      }
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching archivist:', error);
    return errorResponse('Failed to fetch archivist', 500);
  }
}

// =====================================================
// PUT /api/archivist/[id] - Update archivist
// =====================================================

import { NextRequest } from 'next/server';
import { createApiSupabase } from '@/lib/api/supabase';
import { successResponse, errorResponse, unauthorized, notFound, forbidden } from '@/lib/api/auth';
import { getAuthenticatedUser, checkOwnership, isAdmin } from '@/lib/api/auth';
import { ArchivistInsertSchema } from '@/lib/validators/archivist';

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
    const ownsRecord = await checkOwnership(userId, 'archivist', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) {
      return forbidden();
    }
    
    const body = await request.json();
    const validated = ArchivistInsertSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('archivist')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return notFound('archivist');
      }
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.errors);
    }
    console.error('Error updating archivist:', error);
    return errorResponse('Failed to update archivist', 500);
  }
}

// =====================================================
// DELETE /api/archivist/[id] - Delete archivist
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
    const ownsRecord = await checkOwnership(userId, 'archivist', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) {
      return forbidden();
    }
    
    const supabase = await createApiSupabase();
    const { error } = await supabase
      .from('archivist')
      .delete()
      .eq('id', id);
    
    if (error) {
      if (error.code === 'PGRST116') {
        return notFound('archivist');
      }
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting archivist:', error);
    return errorResponse('Failed to delete archivist', 500);
  }
}

