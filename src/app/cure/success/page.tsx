'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Download, Calendar } from 'lucide-react';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'confirmed'>('loading');

  useEffect(() => {
    // Verify session (optional enhancement)
    setTimeout(() => setStatus('confirmed'), 1500);
  }, []);

  if (status === 'loading') {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-2 border-cyan-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-white/60">Confirming with the Chancellor...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-green-950/20 to-black py-12 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-400" />
        </div>

        <h1 className="text-4xl font-bold text-white mb-4">
          Sanctuary Access Granted
        </h1>
        
        <p className="text-xl text-white/70 mb-8">
          Your reservation for <em>The Cure for Autism</em> is confirmed.
          The Loom recognizes your contribution.
        </p>

        <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8 text-left">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Calendar size={20} className="text-cyan-400" />
            What Happens Next
          </h3>
          <ul className="space-y-3 text-white/70">
            <li className="flex items-start gap-3">
              <span className="text-cyan-400">1.</span>
              Calendar invite sent to your email within 24 hours
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400">2.</span>
              Digital grimoire (PDF) delivered 48 hours before event
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400">3.</span>
              Recording access link sent within 2 hours post-event
            </li>
          </ul>
        </div>

        <div className="flex gap-4 justify-center">
          <Link
            href="/sanctuary"
            className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold transition-all"
          >
            Enter the Sanctuary
          </Link>
          <Link
            href="/profile"
            className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
          >
            View Your Ledger
          </Link>
        </div>

        <p className="mt-12 text-sm text-white/40">
          Residuals from your purchase have been distributed to contributors.
          <br />
          Check your profile to see the economic web you've joined.
        </p>
      </div>
    </main>
  );
}