// =====================================================
// API ROUTE: /api/hearth_keeper/[id]
// METHODS: GET, PUT, DELETE
// GENERATED: 2026-04-12T23:25:46.090Z
// SOURCE: database.types.ts
// =====================================================

import { NextRequest } from 'next/server';
import { createApiSupabase } from 'src/lib/api/supabase';
import { successResponse, errorResponse, notFound } from 'src/lib/api/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('hearth_keeper')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return notFound('hearth_keeper');
      }
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching hearth_keeper:', error);
    return errorResponse('Failed to fetch hearth_keeper', 500);
  }
}
import { NextRequest } from 'next/server';
import { createApiSupabase } from 'src/lib/api/supabase';
import { successResponse, errorResponse, unauthorized, notFound, forbidden } from 'src/lib/api/auth';
import { getAuthenticatedUser, checkOwnership, isAdmin } from 'src/lib/api/auth';
import { HearthKeeperUpdateSchema } from 'src/lib/validators/hearth_keeper';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { userId, success } = await getAuthenticatedUser(request);
    if (!success) {
      return unauthorized();
    }
    
    // Check ownership or admin
    const ownsRecord = await checkOwnership(userId, 'hearth_keeper', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) {
      return forbidden();
    }
    
    const body = await request.json();
    const validated = HearthKeeperUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('hearth_keeper')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return notFound('hearth_keeper');
      }
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating hearth_keeper:', error);
    return errorResponse('Failed to update hearth_keeper', 500);
  }
}
import { NextRequest } from 'next/server';
import { createApiSupabase } from 'src/lib/api/supabase';
import { successResponse, errorResponse, unauthorized, notFound, forbidden } from 'src/lib/api/auth';
import { getAuthenticatedUser, checkOwnership, isAdmin } from 'src/lib/api/auth';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { userId, success } = await getAuthenticatedUser(request);
    if (!success) {
      return unauthorized();
    }
    
    // Check ownership or admin
    const ownsRecord = await checkOwnership(userId, 'hearth_keeper', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) {
      return forbidden();
    }
    
    const supabase = await createApiSupabase();
    const { error } = await supabase
      .from('hearth_keeper')
      .delete()
      .eq('id', id);
    
    if (error) {
      if (error.code === 'PGRST116') {
        return notFound('hearth_keeper');
      }
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting hearth_keeper:', error);
    return errorResponse('Failed to delete hearth_keeper', 500);
  }
}
