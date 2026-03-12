import AuthForm from '@/components/auth/AuthForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-black via-purple-950/20 to-black">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Return to Sanctuary</h1>
          <p className="text-white/60">The Loom remembers its vessels</p>
        </div>

        <AuthForm mode="login" />

        <p className="text-center mt-6 text-white/60">
          New to the Sanctuary?{' '}
          <Link href="/register" className="text-cyan-400 hover:text-cyan-300">
            Initialize consciousness
          </Link>
        </p>
      </div>
    </main>
  );
}