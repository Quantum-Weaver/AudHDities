# 🔐 Authentication Flow Documentation

**Last Updated: March 15, 2026**

## Overview

We use Supabase Auth with magic link emails. No passwords to remember—perfect for neurodivergent users who struggle with password fatigue.

## Flow Diagram

User ──► Signup Form ──► Supabase Auth ──► Email ──► Click Link ──► Logged In
│ │
└───► Profile Created (auto trigger) └───► Redirect to Dashboard
text


## Step-by-Step Process

### 1. User Signs Up
- User visits `/signup`
- Enters email address
- Clicks "Send Magic Link"

**Code location:** `app/(auth)/signup/page.tsx`

### 2. Supabase Creates User
- Auth record created in `auth.users`
- Trigger `handle_new_user()` runs automatically
- Creates matching row in `public.profiles`

### 3. User Receives Email
- Magic link sent to inbox
- Link expires in 24 hours
- Clicking link verifies email

### 4. User is Logged In
- Redirected to `/dashboard`
- Session cookie set
- Now authenticated for all requests

## Client-Side Auth

### `@/lib/supabase/client.ts`
Browser client for user-facing components:

```typescript
import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => 
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

@/lib/supabase/server.ts

Server client for route handlers and server components:
typescript

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createClient = async () => {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (name) => cookieStore.get(name)?.value } }
  )
}

@/lib/supabase/middleware.ts

For Next.js middleware protecting routes:
typescript

import { createMiddlewareClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  await supabase.auth.getSession()
  return res
}

Protected Routes

Routes in app/(dashboard)/ require authentication:
typescript

// middleware.ts
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/checkout/:path*']
}
