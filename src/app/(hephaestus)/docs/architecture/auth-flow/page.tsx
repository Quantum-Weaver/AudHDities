// app/(content)/docs/architecture/auth-flow/page.tsx
import { Metadata } from 'next';
import { Page } from '@/components/shared/Page';
import { AuthFlowHero } from '@/components/hephaestus/supporting/docs/AuthFlowHero';
import { FlowDiagram } from '@/components/hephaestus/supporting/docs/FlowDiagram';
import { StepCard } from '@/components/hephaestus/supporting/docs/StepCard';
import { CodeBlock } from '@/components/hephaestus/supporting/docs/CodeBlock';
import { ProtectedRoutesTable } from '@/components/hephaestus/supporting/docs/ProtectedRoutesTable';
import fs from 'fs/promises';
import path from 'path';
import { Card } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Auth Flow | AUDHDITIES Architecture',
  description: 'How authentication works in the sanctuary',
};

const clientCode = `import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => 
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )`;

const serverCode = `import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createClient = async () => {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (name) => cookieStore.get(name)?.value } }
  )
}`;

const middlewareCode = `import { createMiddlewareClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  await supabase.auth.getSession()
  return res
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/checkout/:path*']
}`;

export default async function AuthFlowPage() {
  // Read the markdown for any additional content we might want to include
  const markdown = await fs.readFile(
    path.join(process.cwd(), 'docs', 'architecture', 'auth-flow.md'),
    'utf-8'
  ).catch(() => '');

  return (
    <Page 
      variant={1}
      environment="architecture"
      showForeground={false}
      animated={true}   
      showContinuityBeam={true}
    >  
      <main className="min-h-screen">
        <AuthFlowHero />
        
        <div className="container max-w-4xl mx-auto px-6 pb-20 space-y-16">
          
          {/* Overview */}
          <Card className="p-8 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
            <p className="text-white/70 leading-relaxed">
              We use Supabase Auth with <strong className="text-cyan-400">magic link emails</strong>. 
              No passwords to remember—perfect for neurodivergent users who struggle with password fatigue.
            </p>
          </Card>
          
          {/* Flow Diagram */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 text-center">The Journey</h2>
            <FlowDiagram />
          </div>
          
          {/* Step-by-Step Process */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Step-by-Step Process</h2>
            <div className="space-y-8">
              <StepCard 
                number={1} 
                title="User Signs Up" 
                description="User visits /signup, enters email address, clicks 'Send Magic Link'"
                delay={0}
              >
                <p className="text-white/40 text-sm mt-2">
                  <span className="text-cyan-400">📍 Code location:</span>{' '}
                  <code className="bg-white/5 px-2 py-0.5 rounded text-cyan-400">app/(auth)/signup/page.tsx</code>
                </p>
              </StepCard>
              
              <StepCard 
                number={2} 
                title="Supabase Creates User" 
                description="Auth record created in auth.users. Trigger handle_new_user() runs automatically and creates matching row in public.profiles"
                delay={0.1}
              />
              
              <StepCard 
                number={3} 
                title="User Receives Email" 
                description="Magic link sent to inbox. Link expires in 24 hours. Clicking link verifies email."
                delay={0.2}
              />
              
              <StepCard 
                number={4} 
                title="User is Logged In" 
                description="Redirected to /dashboard. Session cookie set. Now authenticated for all requests."
                delay={0.3}
              />
            </div>
          </div>
          
          {/* Client-Side Auth */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Client-Side Auth</h2>
            <p className="text-white/60 mb-4">
              Browser client for user-facing components. Use this in your client components.
            </p>
            <CodeBlock 
              code={clientCode}
              language="typescript"
              filename="lib/supabase/client.ts"
            />
          </div>
          
          {/* Server-Side Auth */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Server-Side Auth</h2>
            <p className="text-white/60 mb-4">
              Server client for route handlers and server components. Use this in your API routes and server components.
            </p>
            <CodeBlock 
              code={serverCode}
              language="typescript"
              filename="lib/supabase/server.ts"
            />
          </div>
          
          {/* Middleware */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Middleware Protection</h2>
            <p className="text-white/60 mb-4">
              Next.js middleware that protects routes and refreshes sessions.
            </p>
            <CodeBlock 
              code={middlewareCode}
              language="typescript"
              filename="middleware.ts"
            />
          </div>
          
          {/* Protected Routes */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Protected Routes</h2>
            <p className="text-white/60 mb-4">
              Routes in <code className="bg-white/5 px-2 py-0.5 rounded">app/(dashboard)/</code> require authentication.
            </p>
            <ProtectedRoutesTable />
          </div>
          
          {/* Additional Notes */}
          <Card className="p-6 bg-white/5 border-white/10">
            <h3 className="text-lg font-bold text-white mb-3">✨ Why Magic Links?</h3>
            <ul className="space-y-2 text-white/60">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">✓</span>
                <span>No passwords to remember or reset</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">✓</span>
                <span>One less cognitive load for neurodivergent users</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">✓</span>
                <span>No password storage risk</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">✓</span>
                <span>Email-based recovery built-in</span>
              </li>
            </ul>
          </Card>
        </div>
      </main>
    </Page>
  );
}