// components/legal/TermsFooter.tsx
'use client';

import { motion } from 'framer-motion';
import { Heart, Mail, BookOpen } from 'lucide-react';
import Link from 'next/link';

export function TermsFooter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-16 p-8 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-white/20 rounded-2xl text-center"
    >
      <Heart className="text-pink-400 mx-auto mb-4" size={32} />
      <h3 className="text-2xl font-bold text-white mb-4">Built With You in Mind</h3>
      <p className="text-white/70 max-w-2xl mx-auto mb-6">
        These Terms were written to protect everyone who calls this sanctuary home.
        They're designed to be fair, transparent, and aligned with our values.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all"
        >
          <Mail size={18} />
          <span>Questions? Contact Us</span>
        </Link>
        <Link
          href="/docs/privacy"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-white/80 transition-all"
        >
          <BookOpen size={18} />
          <span>Read Privacy Policy</span>
        </Link>
      </div>
      <p className="text-xs text-white/30 mt-6">
        These Terms are a living document. If you have suggestions for improvement, we're listening.
      </p>
    </motion.div>
  );
}