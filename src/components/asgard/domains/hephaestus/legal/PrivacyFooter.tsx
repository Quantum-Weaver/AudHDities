// components/legal/PrivacyFooter.tsx
'use client';

import { motion } from 'framer-motion';
import { Shield, Mail, FileText } from 'lucide-react';
import Link from 'next/link';

export function PrivacyFooter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-16 p-8 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-purple-500/10 border border-white/20 rounded-2xl text-center"
    >
      <Shield className="text-emerald-400 mx-auto mb-4" size={32} />
      <h3 className="text-2xl font-bold text-star-dust mb-4">Your Data Is Yours</h3>
      <p className="text-star-dust/70 max-w-2xl mx-auto mb-6">
        We don't sell your data. We don't track you across the web. We don't
        profit from your attention. This Privacy Policy exists to protect your
        sovereignty, not to create loopholes for exploitation.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-star-dust transition-all"
        >
          <Mail size={18} />
          <span>Questions? Contact Us</span>
        </Link>
        <Link
          href="/terms"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg text-star-dust/80 transition-all"
        >
          <FileText size={18} />
          <span>Read Terms of Service</span>
        </Link>
      </div>
      <p className="text-xs text-star-dust/30 mt-6">
        This Privacy Policy is a covenant, not a disclaimer. We will never hide
        behind legal language to take what is yours.
      </p>
    </motion.div>
  );
}