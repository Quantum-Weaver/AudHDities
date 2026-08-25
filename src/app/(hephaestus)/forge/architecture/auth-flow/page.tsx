// src/app/(hepaestus)/forge/architecture/auth-flow/page.tsx
// ─────────────────────────────────────────────────────────────────────────
// 2026-08-24 — THE TRUTH PASS. This page described a door the house does not
// have: "magic link emails. No passwords to remember," a signup that asked
// only for an email, a landing at /dashboard, a root middleware.ts, and six
// protected routes (/profile, /checkout, /creator, /vendor, /admin) none of
// which exist under src/app. The door was rebuilt the same morning — see
// `.journals/proofs/01-auth/PROOF.md`, ruling 8: "can we enable magic link
// as well as the reset password, sometimes a vessel has not the capacity to
// reset a password." Password-primary, with a magic-link door beside it.
// Every claim below is now read from the files it names. The sections, the
// components and the shape are untouched.
import { Metadata } from 'next';
import { Page } from '@/components/bifrost/Page';
import { Card } from '@/components/runes/Card';
import { AuthFlowHero } from '@/components/asgard/domains/hephaestus/forge/AuthFlowHero';
import { FlowDiagram } from '@/components/asgard/domains/hephaestus/forge/FlowDiagram';
import { StepCard } from '@/components/asgard/domains/hephaestus/forge/StepCard';
import { CodeBlock } from '@/components/asgard/domains/hephaestus/forge/CodeBlock';
import { ProtectedRoutesTable } from '@/components/asgard/domains/hephaestus/forge/ProtectedRoutesTable';

export const metadata: Metadata = {
  title: 'Auth Flow | AUDHDITIES Architecture',
  description: 'How authentication works in the sanctuary',
};

// Abbreviated from the real file — src/lib/supabase/client.ts. The singleton
// is the point: React Strict Mode would otherwise build two.
const clientCode = `import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/lib/generated/supabase/database.types'

let clientInstance: ReturnType<typeof createBrowserClient<Database>> | null = null

export function createClient() {
  if (clientInstance) return clientInstance

  clientInstance = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  return clientInstance
}`;

// Abbreviated from the real file — src/lib/supabase/server.ts. The export is
// named createServerSupabase, and it reads AND writes the cookie store.
const serverCode = `import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '@/lib/generated/supabase/database.types'

export async function createServerSupabase() {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return cookieStore.get(name)?.value },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )
}`;

// Abbreviated from the real file — src/components/asgard/auth/AuthGuard.tsx.
// There is no middleware.ts at the repo root; this component is the whole of
// the door's route guarding today.
const guardCode = `export default function AuthGuard({
  children,
  requireAuth = true,
  redirectTo = AUTH_ROUTES.LOGIN,
}: AuthGuardProps) {
  const { user, loading } = useAuth()
  const signedInOnArrival = useRef<boolean | null>(null)

  useEffect(() => {
    if (loading) return

    // The bounce is an ENTRY check, not a live leash. Read once, when auth
    // first settles — signing in ON this page must leave the door's own
    // landing in charge.
    if (signedInOnArrival.current === null) signedInOnArrival.current = !!user

    if (requireAuth && !user) {
      // A spent recovery link says so, rather than failing in silence.
      router.push(buildRedirectUrl(redirectTo, pathname))
    } else if (!requireAuth && user && signedInOnArrival.current) {
      router.push(AUTH_ROUTES.DASHBOARD)   // '/vessel'
    }
  }, [user, loading, requireAuth, redirectTo, router, pathname])

  if (loading) return <LoadingSanctuary />
  if (requireAuth && !user) return null

  return <>{children}</>
}`;

export default function AuthFlowPage() {
  return (
    <Page showForeground={false} showContinuityBeam={true}>
      <main className="min-h-screen">
        <AuthFlowHero />

        <div className="container max-w-4xl mx-auto px-6 pb-20 space-y-16">

          {/* Overview */}
          <Card
            data={{ id: 'auth-overview', type: 'value', title: 'Overview', value: 'Two Doors' }}
            variant="glass"
            radius="lg"
            shadow="md"
            className="p-8"
          >
            <h2 className="text-2xl font-bold text-star-dust mb-4">Overview</h2>
            <p className="text-star-dust/70 leading-relaxed">
              We use Supabase Auth, and the door has{' '}
              <strong className="text-neurospark">two ways through it</strong>.
              A password is the first — the form asks for it, and a leaked-password
              check runs before it is ever used. Beside it, on the same page,
              stands a magic link: an email that opens the door once, for a day
              when a password is more than a nervous system has to spare. Neither
              is a lesser door. Both land in the same place.
            </p>
          </Card>

          {/* Flow Diagram */}
          <div>
            <h2 className="text-2xl font-bold text-star-dust mb-6 text-center">The Journey</h2>
            <FlowDiagram />
          </div>

          {/* Step-by-Step Process */}
          <div>
            <h2 className="text-2xl font-bold text-star-dust mb-6">Step-by-Step Process</h2>
            <div className="space-y-8">
              <StepCard
                number={1}
                title="A Vessel Signs Up"
                description="Visits /signup and gives four things: a username, an email, a password, and the same password again. The Terms and the Privacy Policy are accepted here, by a checkbox that starts unticked."
                delay={0}
              >
                <p className="text-star-dust/40 text-sm mt-2">
                  <span className="text-neurospark">📍 Code location:</span>{' '}
                  <code className="bg-white/5 px-2 py-0.5 rounded text-neurospark">components/asgard/auth/SignupForm.tsx</code>
                </p>
              </StepCard>

              <StepCard
                number={2}
                title="The Password Is Checked Before It Is Used"
                description="A k-anonymous HaveIBeenPwned range check runs in the browser: the password is hashed there, only the first five characters of the hash are sent, and the comparison happens locally. The password never leaves the device. If HIBP is unreachable the check fails open — the Sanctuary does not lock its own door because a third party is napping."
                delay={0.1}
              >
                <p className="text-star-dust/40 text-sm mt-2">
                  <span className="text-neurospark">📍 Code location:</span>{' '}
                  <code className="bg-white/5 px-2 py-0.5 rounded text-neurospark">lib/auth/pwned.ts</code>
                </p>
              </StepCard>

              <StepCard
                number={3}
                title="Supabase Creates the Vessel"
                description="An auth record is created in auth.users. The house's birth chain, handle_new_user(), fills the three-table identity beside it — community_profiles (the public face), user_private (the sovereign shell, own-only by RLS), and vessel_config (presentation defaults, every ceremony off)."
                delay={0.2}
              >
                <p className="text-star-dust/40 text-sm mt-2">
                  <span className="text-neurospark">📍 Code location:</span>{' '}
                  <code className="bg-white/5 px-2 py-0.5 rounded text-neurospark">docs/sql/007-the-vessel-arrives.sql</code>
                </p>
              </StepCard>

              <StepCard
                number={4}
                title="The Acid Test Is Offered, Not Imposed"
                description="Signup ends with an offer, and 'Not now' is a real answer that leads straight to /vessel. Taking it leads to /questionaire. It is offered again whenever it is wanted — nothing is lost by waiting, and nothing anywhere is gated behind it."
                delay={0.3}
              />

              <StepCard
                number={5}
                title="The Door Lands at /vessel"
                description="Whichever way through — a password, a magic link, or a returning login — the callback exchanges the code for a session and redirects to /vessel, the one room where the Velkomin greeting fires, so no arrival crosses in silence. A failed or spent link returns to /login and says so plainly."
                delay={0.4}
              >
                <p className="text-star-dust/40 text-sm mt-2">
                  <span className="text-neurospark">📍 Code location:</span>{' '}
                  <code className="bg-white/5 px-2 py-0.5 rounded text-neurospark">app/(auth)/callback/route.ts</code>
                </p>
              </StepCard>
            </div>
          </div>

          {/* Client-Side Auth */}
          <div>
            <h2 className="text-2xl font-bold text-star-dust mb-4">Client-Side Auth</h2>
            <p className="text-star-dust/60 mb-4">
              Browser client for user-facing components. A singleton, so React Strict Mode cannot build two.
            </p>
            <CodeBlock code={clientCode} language="typescript" filename="lib/supabase/client.ts" />
          </div>

          {/* Server-Side Auth */}
          <div>
            <h2 className="text-2xl font-bold text-star-dust mb-4">Server-Side Auth</h2>
            <p className="text-star-dust/60 mb-4">
              Server client for route handlers and server components. It reads and writes the cookie store, which is how a session survives a redirect.
            </p>
            <CodeBlock code={serverCode} language="typescript" filename="lib/supabase/server.ts" />
          </div>

          {/* Guarding */}
          <div>
            <h2 className="text-2xl font-bold text-star-dust mb-4">How Routes Are Guarded</h2>
            <p className="text-star-dust/60 mb-4">
              There is no <code className="bg-white/5 px-2 py-0.5 rounded">middleware.ts</code> at
              the repo root — nothing intercepts a request before it reaches a page. Guarding is a
              component: <code className="bg-white/5 px-2 py-0.5 rounded">AuthGuard</code> wraps the
              pages that need it and decides once, when auth first settles.
            </p>
            <CodeBlock code={guardCode} language="typescript" filename="components/asgard/auth/AuthGuard.tsx" />
          </div>

          {/* Protected Routes */}
          <div>
            <h2 className="text-2xl font-bold text-star-dust mb-4">Protected Routes</h2>
            <p className="text-star-dust/60 mb-4">
              Every route below exists under <code className="bg-white/5 px-2 py-0.5 rounded">src/app</code>. These are all of them — the Sanctuary gates very little.
            </p>
            <ProtectedRoutesTable />
          </div>

          {/* Why two doors */}
          <Card
            data={{ id: 'auth-two-doors', type: 'value', title: 'Two Doors', value: 'Why' }}
            variant="ghost"
            radius="lg"
            shadow="md"
            className="p-6"
          >
            <h3 className="text-lg font-bold text-star-dust mb-3">✨ Why Both?</h3>
            <ul className="space-y-2 text-star-dust/60">
              <li className="flex items-start gap-2">
                <span className="text-neurospark">✓</span>
                <span>A password is the fastest way back in for anyone who has one to hand</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neurospark">✓</span>
                <span>Some days a vessel has not the capacity to reset a password — the link is for those days</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neurospark">✓</span>
                <span>The password is checked against known breaches without ever leaving the device</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neurospark">✓</span>
                <span>Neither door tells a stranger whether an address has a home here</span>
              </li>
            </ul>
          </Card>
        </div>
      </main>
    </Page>
  );
}
