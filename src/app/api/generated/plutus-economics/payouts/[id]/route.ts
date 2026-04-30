import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { PayoutsUpdateSchema } from '@/lib/validators/generated/plutus-economics/payouts';
import { NextRequest } from 'next/server';

// Generated: 2026-04-30T15:32:13.560Z
// Table: payouts

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
      .eq('payouts_id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('payouts');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching payouts:', error);
    return errorResponse('Failed to fetch payouts', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'payouts', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const body = await request.json();
    const validated = PayoutsUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('payouts')
      .update(validated)
      .eq('payouts_id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('payouts');
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { userId, success } = await getAuthenticatedUser(request);
    if (!success) return unauthorized();
    
    const ownsRecord = await checkOwnership(userId, 'payouts', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('payouts').delete().eq('payouts_id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('payouts');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting payouts:', error);
    return errorResponse('Failed to delete payouts', 500);
  }
}
