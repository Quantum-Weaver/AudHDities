/* src/app/(auth)/login/page.tsx */
import { Metadata } from 'next'
import Link from 'next/link'
import LoginForm from 'src/components/auth/LoginForm'
import AuthGuard from 'src/components/auth/AuthGuard'

export const metadata: Metadata = {
  title: 'Login | AUDHDITIES',
  description: 'Return to the sanctuary',
}

export default function LoginPage() {
  return (
    <AuthGuard requireAuth={false}>
      <main className="flex min-h-screen items-center justify-center p-6 bg-gradient-to-b from-black via-purple-950/20 to-black">
        <div className="w-full max-w-md">
          <LoginForm />
          <p className="mt-6 text-center text-white/60">
            New to the Sanctuary?{' '}
            <Link href="/signup" className="text-cyan-400 hover:text-cyan-300">
              Initialize consciousness
            </Link>
          </p>
        </div>
      </main>
    </AuthGuard>
  )
}