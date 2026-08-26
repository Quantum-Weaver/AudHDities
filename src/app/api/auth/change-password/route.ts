// src/app/api/auth/change-password/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { z } from 'zod';

const passwordSchema = z.object({
  current_password: z.string().min(6),
  new_password: z.string().min(6),
  confirm_password: z.string().min(6),
}).refine((data) => data.new_password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"],
});

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validated = passwordSchema.safeParse(body);
    
    if (!validated.success) {
      return NextResponse.json(
        { error: 'Invalid password data', details: validated.error },
        { status: 400 }
      );
    }

    // Change password using Supabase Auth
    const { error } = await supabase.auth.updateUser({
      password: validated.data.new_password,
    });

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        return NextResponse.json(
          { error: 'Current password is incorrect' },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Password updated successfully',
    });
    
  } catch (error) {
    console.error('Password change error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}