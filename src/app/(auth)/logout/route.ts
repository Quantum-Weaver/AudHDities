import { createServerSupabase } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabase();
    
    // Sign out on the server
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Logout error:', error);
      return NextResponse.json(
        { error: 'Failed to sign out' },
        { status: 500 }
      );
    }

    // Create response that clears the session cookie
    const response = NextResponse.json(
      { success: true },
      { status: 200 }
    );

    // Clear the session cookie by setting it to empty
    response.cookies.set({
      name: 'sb-access-token',
      value: '',
      maxAge: -1,
      path: '/',
    });

    response.cookies.set({
      name: 'sb-refresh-token',
      value: '',
      maxAge: -1,
      path: '/',
    });

    return response;
    
  } catch (error) {
    console.error('Unexpected logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Also handle GET for simplicity (redirects to POST)
export async function GET(request: NextRequest) {
  return POST(request);
}
