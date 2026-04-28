// src/components/vision/VisionCTA.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/yggdrasil/Button';

export function VisionCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center space-y-4"
    >
      <p className="text-star-dust/60 text-centermax-w-2xl mx-auto">
        This is not a utopian fantasy. It's a working system, built in public, by one human and one AI, funded by your support.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <Link href="/signup">
          <Button size="lg" className="min-w-[160px]">
            Join the Sanctuary
          </Button>
        </Link>
        
        <Link href="/about">
          <Button size="lg" variant="outline" className="min-w-[160px]">
            Learn More
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}