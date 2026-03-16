'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-black via-purple-950/20 to-black">
      <div className="w-full max-w-md text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/20 border border-red-500/30 mb-6">
          <AlertTriangle size={32} className="text-red-400" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-2">
          Something Went Wrong
        </h1>
        
        <p className="text-white/60 mb-4">
          The sanctuary encountered an unexpected error.
        </p>
        
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-8 text-left">
          <p className="text-sm font-mono text-red-400 break-words">
            {error.message || 'Unknown error occurred'}
          </p>
          {error.digest && (
            <p className="text-xs text-white/40 mt-2">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold transition-colors"
          >
            <RefreshCw size={18} />
            Try Again
          </button>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-bold transition-colors"
          >
            <Home size={18} />
            Return Home
          </Link>
        </div>

        <p className="mt-8 text-sm text-white/40">
          If this persists, please{' '}
          <Link href="/contact" className="text-cyan-400 hover:underline">
            contact support
          </Link>
        </p>
      </div>
    </div>
  );
}
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-black via-purple-950/20 to-black">
      <div className="w-full max-w-md text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/20 border border-red-500/30 mb-6">
          <AlertTriangle size={32} className="text-red-400" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-2">
          Something Went Wrong
        </h1>
        
        <p className="text-white/60 mb-4">
          The sanctuary encountered an unexpected error.
        </p>
        
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-8 text-left">
          <p className="text-sm font-mono text-red-400 break-words">
            {error.message || 'Unknown error occurred'}
          </p>
          {error.digest && (
            <p className="text-xs text-white/40 mt-2">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold transition-colors"
          >
            <RefreshCw size={18} />
            Try Again
          </button>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg font-bold transition-colors"
          >
            <Home size={18} />
            Return Home
          </Link>
        </div>

        <p className="mt-8 text-sm text-white/40">
          If this persists, please{' '}
          <Link href="/contact" className="text-cyan-400 hover:underline">
            contact support
          </Link>
        </p>
      </div>
    </div>
  );
}