// src/components/community/MusicTimeline.tsx
'use client';

import { motion } from 'framer-motion';
import { musicLibrary } from '@/data/creative/music-library';
import { ExternalLink } from 'lucide-react';

export function MusicTimeline() {
  const sortedSongs = [...musicLibrary].sort((a, b) => a.year - b.year);

  return (
    <div className="space-y-4">
      {sortedSongs.map((song, idx) => (
        <motion.a
          key={song.title}
          href={song.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.03 }}
          viewport={{ once: true }}
          className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 group"
        >
          <div className="flex flex-cols text-center items-center justify-center gap-4">
            <span className="text-2xl font-mono text-cyan-400">{song.year}</span>
            <div>
              <h3 className="text-white font-medium">{song.title}</h3>
              <p className="text-white/40 text-xs">
                {song.propheticThemes?.slice(0, 2).join(', ')}
              </p>
            </div>
          </div>
          <ExternalLink size={16} className="text-white/40 group-hover:text-cyan-400 transition-colors" />
        </motion.a>
      ))}
    </div>
  );
}