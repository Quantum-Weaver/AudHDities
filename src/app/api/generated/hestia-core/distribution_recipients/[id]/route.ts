import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { DistributionRecipientsUpdateSchema } from '@/lib/validators/generated/hestia-core/distribution_recipients';
import { NextRequest } from 'next/server';

// Generated: 2026-07-10T18:14:59.368Z
// Table: distribution_recipients

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('distribution_recipients')
      .select('*')
      .eq('distribution_recipients_id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('distribution_recipients');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching distribution_recipients:', error);
    return errorResponse('Failed to fetch distribution_recipients', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'distribution_recipients', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const body = await request.json();
    const validated = DistributionRecipientsUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('distribution_recipients')
      .update(validated)
      .eq('distribution_recipients_id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('distribution_recipients');
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating distribution_recipients:', error);
    return errorResponse('Failed to update distribution_recipients', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'distribution_recipients', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('distribution_recipients').delete().eq('distribution_recipients_id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('distribution_recipients');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting distribution_recipients:', error);
    return errorResponse('Failed to delete distribution_recipients', 500);
  }
}
