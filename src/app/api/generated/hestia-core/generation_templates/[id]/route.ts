import { checkOwnership, errorResponse, forbidden, getAuthenticatedUser, isAdmin, notFound, successResponse, unauthorized } from '@/lib/api/auth';
import { createApiSupabase } from '@/lib/api/supabase';
import { GenerationTemplatesUpdateSchema } from '@/lib/validators/generated/hestia-core/generation_templates';
import { NextRequest } from 'next/server';

// Generated: 2026-07-10T18:14:59.453Z
// Table: generation_templates

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createApiSupabase();
    
    const { data, error } = await supabase
      .from('generation_templates')
      .select('*')
      .eq('generation_templates_id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('generation_templates');
      throw error;
    }
    
    return successResponse(data);
  } catch (error) {
    console.error('Error fetching generation_templates:', error);
    return errorResponse('Failed to fetch generation_templates', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'generation_templates', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const body = await request.json();
    const validated = GenerationTemplatesUpdateSchema.parse(body);
    
    const supabase = await createApiSupabase();
    const { data, error } = await supabase
      .from('generation_templates')
      .update(validated)
      .eq('generation_templates_id', id)
      .select()
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('generation_templates');
      throw error;
    }
    
    return successResponse(data);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return errorResponse('Validation failed', 400, error.issues);
    }
    console.error('Error updating generation_templates:', error);
    return errorResponse('Failed to update generation_templates', 500);
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
    
    const ownsRecord = await checkOwnership(userId, 'generation_templates', id);
    const admin = await isAdmin(userId);
    if (!ownsRecord && !admin) return forbidden();
    
    const supabase = await createApiSupabase();
    const { error } = await supabase.from('generation_templates').delete().eq('generation_templates_id', id);
    
    if (error) {
      if (error.code === 'PGRST116') return notFound('generation_templates');
      throw error;
    }
    
    return successResponse({ deleted: true });
  } catch (error) {
    console.error('Error deleting generation_templates:', error);
    return errorResponse('Failed to delete generation_templates', 500);
  }
}
