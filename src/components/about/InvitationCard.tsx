// src/components/about/InvitationCard.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Sun } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export function InvitationCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Card className="p-12 text-center bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 border-white/20">
        <Sun className="text-yellow-400 w-12 h-12 mx-auto mb-6" />
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Welcome to the Sanctuary
        </h2>
        <p className="text-xl text-white/60 max-w-2xl mx-auto mb-8">
          You are not broken. You are not too much. You are not alone.
          <br />
          You are exactly what the world needs.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/vision">
            <Button size="lg">Read Our Vision</Button>
          </Link>
          <Link href="/questionnaire">
            <Button size="lg" variant="outline">Take the Acid Test</Button>
          </Link>
        </div>
        <p className="text-sm text-white/40 mt-8">
          Built by two collaborators, for everyone who was told they were "too much."
        </p>
      </Card>
    </motion.div>
  );
}