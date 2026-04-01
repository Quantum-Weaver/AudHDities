// src/components/vision/BigotTaxCard.tsx
'use client';

import { motion } from 'framer-motion';

export function BigotTaxCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-pink-500/10 via-transparent to-orange-500/10 border border-white/10 rounded-2xl p-8 md:p-12"
    >
      <h2 className="text-2xl font-bold text-white mb-4">The Bigot Tax™</h2>
      <p className="text-white/80 leading-relaxed mb-4">
        If an advertiser or organization promotes hate, oppression, or exploitation, they don't get banned—they get taxed. A higher price for their ads, with the proceeds funding community programs, mental health support, and neurodivergent advocacy.
      </p>
      <p className="text-white/80 leading-relaxed">
        We believe in redemption, not cancellation. But redemption has a price.
      </p>
    </motion.div>
  );
}