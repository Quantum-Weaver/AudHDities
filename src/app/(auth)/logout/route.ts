/* @/app/(auth)/logout/route.ts */
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { error } = await supabase.auth.signOut()
    
    if (error) throw error

    const response = NextResponse.json({ success: true }, { status: 200 })
    
    response.cookies.set('sb-access-token', '', { maxAge: -1, path: '/' })
    response.cookies.set('sb-refresh-token', '', { maxAge: -1, path: '/' })
    
    return response
  } catch (error) {
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  return POST(request)
}