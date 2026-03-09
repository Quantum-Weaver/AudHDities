'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import AuthModal from './AuthModal';
import { User, LogOut } from 'lucide-react';

export default function AuthButton() {
  const [showModal, setShowModal] = useState(false);
  const { user, signOut } = useAuth();

  if (user) {
    return (
      <button
        onClick={signOut}
        className="flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white transition-colors"
      >
        <LogOut size={18} />
        <span className="hidden sm:inline">Exit</span>
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 px-4 py-2 bg-cyan-600/20 hover:bg-cyan-600/40 border border-cyan-500/30 rounded-lg text-cyan-400 transition-colors"
      >
        <User size={18} />
        <span className="hidden sm:inline">Enter</span>
      </button>

      <AuthModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={() => window.location.reload()}
      />
    </>
  );
}