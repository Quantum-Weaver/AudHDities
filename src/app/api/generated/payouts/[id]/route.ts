// =====================================================
// API ROUTE: /api/payouts/[id]
// METHODS: GET, PUT, DELETE
// GENERATED: 2026-04-12T23:25:46.098Z
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
      .from('payouts')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return notFound('payouts');
      }
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching payouts:', error);
    return errorResponse('Failed to fetch payouts', 500);
  }
}
import { NextRequest } from 'next/server';
import { createApiSupabase } from 'src/lib/api/supabase';
import { successResponse, errorResponse, unauthorized, notFound, forbidden } from 'src/lib/api/auth';
import { getAuthenticatedUser, checkOwnership, isAdmin } from 'src/lib/api/auth';
import { PayoutsUpdateSchema } from 'src/lib/validators/payouts';

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
    const ownsRecord = await checkOwnership(userId, 'payouts', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) {
      return forbidden();
    }
    
    const body = await request.json();
    const validated = PayoutsUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('payouts')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return notFound('payouts');
      }
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating payouts:', error);
    return errorResponse('Failed to update payouts', 500);
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
    const ownsRecord = await checkOwnership(userId, 'payouts', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) {
      return forbidden();
    }
    
    const supabase = await createApiSupabase();
    const { error } = await supabase
      .from('payouts')
      .delete()
      .eq('id', id);
    
    if (error) {
      if (error.code === 'PGRST116') {
        return notFound('payouts');
      }
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting payouts:', error);
    return errorResponse('Failed to delete payouts', 500);
  }
}
