/* @/app/(auth)/callback/route.ts */
// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║                    AUTH CALLBACK ROUTE                                    ║
// ║                    Zero hardcoded values                                  ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

import { createServerSupabase } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

import {
  AUTH_ROUTES,
  AUTH_ERRORS,
} from '@/lib/constants/components/asgard/auth/auth.constants';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? AUTH_ROUTES.DASHBOARD;

  if (code) {
    const supabase = await createServerSupabase();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(
    `${origin}${AUTH_ROUTES.LOGIN}?error=${AUTH_ERRORS.CALLBACK_FAILED}`
  );
}
