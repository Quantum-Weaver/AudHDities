import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { ResidualPayoutsUpdateSchema } from '@/lib/validators/generated/plutus-economics/residual_payouts';
import { NextRequest } from 'next/server';

// Generated: 2026-04-30T04:17:48.117Z
// Table: residual_payouts

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('residual_payouts')
      .select('*')
      .eq('residual_payouts_id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('residual_payouts');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching residual_payouts:', error);
    return errorResponse('Failed to fetch residual_payouts', 500);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { userId, success } = await getAuthenticatedUser(request);
    if (!success) return unauthorized();
    
    const ownsRecord = await checkOwnership(userId, 'residual_payouts', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const body = await request.json();
    const validated = ResidualPayoutsUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('residual_payouts')
      .update(validated)
      .eq('residual_payouts_id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('residual_payouts');
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating residual_payouts:', error);
    return errorResponse('Failed to update residual_payouts', 500);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { userId, success } = await getAuthenticatedUser(request);
    if (!success) return unauthorized();
    
    const ownsRecord = await checkOwnership(userId, 'residual_payouts', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('residual_payouts').delete().eq('residual_payouts_id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('residual_payouts');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting residual_payouts:', error);
    return errorResponse('Failed to delete residual_payouts', 500);
  }
}
