/* @/app/(auth)/signup/page.tsx */
import { Metadata } from 'next'
import Link from 'next/link'
import SignupForm from '@/components/asgard/auth/SignupForm'
import AuthGuard from '@/components/asgard/auth/AuthGuard'

export const metadata: Metadata = {
  title: 'Sign Up | AUDHDITIES',
  description: 'Join the sovereign network',
}

export default function SignupPage() {
  return (
    <AuthGuard requireAuth={false}>
      <main className="flex min-h-screen items-center justify-center p-6 bg-gradient-to-b from-black via-purple-950/20 to-black">
        <div className="w-full max-w-md">
          <SignupForm />
          <p className="mt-6 text-center text-white/60">
            Already manifested?{' '}
            <Link href="/login" className="text-cyan-400 hover:text-cyan-300">
              Return to Sanctuary
            </Link>
          </p>
        </div>
      </main>
    </AuthGuard>
  )
}