// src/app/api/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    
    switch (action) {
      case 'session': {
        const { data: { session } } = await supabase.auth.getSession();
        return NextResponse.json({ session });
      }
      
      case 'user': {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          return NextResponse.json({ user: null });
        }
        
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        return NextResponse.json({ user, profile });
      }
      
      case 'check-role': {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          return NextResponse.json({ isAdmin: false, isCreator: false, isVendor: false });
        }
        
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_admin, is_creator, is_vendor')
          .eq('id', user.id)
          .single();
        
        return NextResponse.json({
          isAdmin: profile?.is_admin ?? false,
          isCreator: profile?.is_creator ?? false,
          isVendor: profile?.is_vendor ?? false,
        });
      }
      
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
    
  } catch (error) {
    console.error('Auth API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}