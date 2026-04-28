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
      className="bg-gradient-to-br from-fire-base/10 via-transparent to-hearth-gold/10 border border-star-dust/10 rounded-2xl p-8 md:p-12"
    >
      <h2 className="text-2xl font-bold text-star-dust mb-4">The Bigot Tax™</h2>
      <p className="text-star-dust/80 leading-relaxed mb-4">
        If an advertiser or organization promotes hate, oppression, or exploitation, they don't get banned—they get taxed. A higher price for their ads, with the proceeds funding community programs, mental health support, and neurodivergent advocacy.
      </p>
      <p className="text-star-dust/80 leading-relaxed">
        We believe in redemption, not cancellation. But redemption has a price.
      </p>
    </motion.div>
  );
}