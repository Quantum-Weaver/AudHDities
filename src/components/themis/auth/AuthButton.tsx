// components/auth/AuthButton.tsx
'use client';

import { useAuth } from '@/hooks/core/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, LogOut } from 'lucide-react';

export default function AuthButton() {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (user) {
    return (
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white transition-colors"
        aria-label="Logout"
      >
        <LogOut size={18} />
        <span className="hidden sm:inline">Exit</span>
      </button>
    );
  }

  return (
    <Link
      href="/login"
      className="flex items-center gap-2 px-4 py-2 bg-cyan-600/20 hover:bg-cyan-600/40 border border-cyan-500/30 rounded-lg text-cyan-400 transition-colors"
    >
      <User size={18} />
      <span className="hidden sm:inline">Enter</span>
    </Link>
  );
}