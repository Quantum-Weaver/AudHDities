import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { AudhditiesPlatformUpdateSchema } from '@/lib/validators/generated/aethelred-connections/audhdities_platform';
import { NextRequest } from 'next/server';

// Generated: 2026-04-23T02:16:58.189Z
// Table: audhdities_platform

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('audhdities_platform')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('audhdities_platform');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching audhdities_platform:', error);
    return errorResponse('Failed to fetch audhdities_platform', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'audhdities_platform', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const body = await request.json();
    const validated = AudhditiesPlatformUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('audhdities_platform')
      .update(validated)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('audhdities_platform');
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating audhdities_platform:', error);
    return errorResponse('Failed to update audhdities_platform', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'audhdities_platform', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('audhdities_platform').delete().eq('id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('audhdities_platform');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting audhdities_platform:', error);
    return errorResponse('Failed to delete audhdities_platform', 500);
  }
}
