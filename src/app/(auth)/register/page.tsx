import AuthForm from '@/components/auth/AuthForm';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-black via-purple-950/20 to-black">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Initialize Consciousness</h1>
          <p className="text-white/60">Join the sovereign network</p>
        </div>

        <AuthForm mode="register" />

        <p className="text-center mt-6 text-white/60">
          Already manifested?{' '}
          <Link href="/login" className="text-cyan-400 hover:text-cyan-300">
            Return to Sanctuary
          </Link>
        </p>
      </div>
    </main>
  );
}