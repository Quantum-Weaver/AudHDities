// src/app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { productCreateSchema } from '@/lib/validators/product';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await request.json();
    
    // Use YOUR validator. That's it.
    const result = productCreateSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    
    const { data, error } = await supabase
      .from('products')
      .insert({
        ...result.data,
        creator_id: user.id,
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return NextResponse.json({ product: data });
    
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}