import AuthForm from '@/components/auth/AuthForm';
import Link from 'next/link';

export default function LogoutPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-black via-purple-950/20 to-black">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">May your travels be prosperous and lonngevity find your path.</h1>
          <p className="text-white/60">return to the loom</p>
        </div>

        <AuthForm mode="login" />

      </div>
    </main>
  );
}