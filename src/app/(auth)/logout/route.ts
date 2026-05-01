/* @/app/(auth)/logout/route.ts */
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    LOGOUT ROUTE                                           ║
// ║                    Zero hardcoded values                                  ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { createServerSupabase } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

import {
  AUTH_COOKIES,
  AUTH_ERRORS,
} from '@/lib/constants/components/asgard/auth/auth.constants';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    const response = NextResponse.json({ success: true }, { status: 200 });

    response.cookies.set(AUTH_COOKIES.ACCESS_TOKEN, '', {
      maxAge: -1,
      path: '/',
    });
    response.cookies.set(AUTH_COOKIES.REFRESH_TOKEN, '', {
      maxAge: -1,
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: AUTH_ERRORS.LOGOUT_FAILED },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return POST(request);
}